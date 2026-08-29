package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"runtime"
	"sort"
	"strings"
	"sync"
	"sync/atomic"
	"time"
)

// ============================================================================
// Data Types
// ============================================================================

// CacheEntry wraps cached stats with a TTL expiry
type CacheEntry struct {
	Data      GitHubStats
	ExpiresAt time.Time
}

// GitHubStats is the shaped payload returned to the frontend
type GitHubStats struct {
	Login                string        `json:"login"`
	Name                 string        `json:"name"`
	AvatarURL            string        `json:"avatar_url"`
	Bio                  string        `json:"bio"`
	PublicRepos          int           `json:"public_repos"`
	Followers            int           `json:"followers"`
	Following            int           `json:"following"`
	TotalContributions   int           `json:"total_contributions"`
	CurrentStreak        int           `json:"current_streak"`
	LongestStreak        int           `json:"longest_streak"`
	ContributionCalendar []WeekData    `json:"contribution_calendar"`
	TopLanguages         []Language    `json:"top_languages"`
	PinnedRepos          []PinnedRepo  `json:"pinned_repos"`
	CommitVelocityPct    float64       `json:"commit_velocity_pct"`
	MostActiveDay        string        `json:"most_active_day"`
	FetchedAt            string        `json:"fetched_at"`
}

// WeekData represents one column on the contribution heatmap
type WeekData struct {
	Days []DayData `json:"days"`
}

// DayData is a single heatmap cell
type DayData struct {
	Date  string `json:"date"`
	Count int    `json:"count"`
	Level int    `json:"level"` // 0-4 shade bucket
}

// Language represents a language with its percentage
type Language struct {
	Name       string  `json:"name"`
	Percentage float64 `json:"percentage"`
	Color      string  `json:"color"`
}

// PinnedRepo is a pinned GitHub repository
type PinnedRepo struct {
	Name        string `json:"name"`
	Description string `json:"description"`
	URL         string `json:"url"`
	Stars       int    `json:"stars"`
	Forks       int    `json:"forks"`
	Language    string `json:"language"`
}

// ============================================================================
// Cache (in-memory TTL, thread-safe)
// ============================================================================

var (
	cache   *CacheEntry
	cacheMu sync.RWMutex
	cacheTTL = 30 * time.Minute
)

func getCached() (*GitHubStats, bool) {
	cacheMu.RLock()
	defer cacheMu.RUnlock()
	if cache != nil && time.Now().Before(cache.ExpiresAt) {
		return &cache.Data, true
	}
	return nil, false
}

func setCache(stats GitHubStats) {
	cacheMu.Lock()
	defer cacheMu.Unlock()
	cache = &CacheEntry{Data: stats, ExpiresAt: time.Now().Add(cacheTTL)}
}

// ============================================================================
// GitHub GraphQL Client
// ============================================================================

const githubGraphQL = "https://api.github.com/graphql"

func graphQLQuery(token, query string, variables map[string]interface{}) (map[string]interface{}, error) {
	payload := map[string]interface{}{"query": query, "variables": variables}
	body, _ := json.Marshal(payload)

	req, err := http.NewRequest("POST", githubGraphQL, bytes.NewBuffer(body))
	if err != nil {
		return nil, err
	}
	req.Header.Set("Authorization", "Bearer "+token)
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{Timeout: 15 * time.Second}
	resp, err := client.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	var result map[string]interface{}
	if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
		return nil, err
	}
	return result, nil
}

// ============================================================================
// Stats Computation
// ============================================================================

// countLevel converts raw commit count to a 0-4 shade bucket (GitHub-style)
func countLevel(count int) int {
	switch {
	case count == 0:
		return 0
	case count <= 2:
		return 1
	case count <= 5:
		return 2
	case count <= 9:
		return 3
	default:
		return 4
	}
}

// computeStreaks calculates current and longest consecutive contribution days
func computeStreaks(weeks []WeekData) (current, longest int) {
	var days []DayData
	for _, w := range weeks {
		days = append(days, w.Days...)
	}

	// Sort ascending by date
	sort.Slice(days, func(i, j int) bool {
		return days[i].Date < days[j].Date
	})

	today := time.Now().Format("2006-01-02")
	var cur, best int

	for i := len(days) - 1; i >= 0; i-- {
		if days[i].Count > 0 {
			cur++
			if cur > best {
				best = cur
			}
		} else if days[i].Date < today {
			// Gap before today ends current streak
			if cur > 0 {
				break
			}
		}
	}

	// Compute longest streak over full history
	run := 0
	for _, d := range days {
		if d.Count > 0 {
			run++
			if run > longest {
				longest = run
			}
		} else {
			run = 0
		}
	}

	return cur, longest
}

// computeVelocity returns (last30 - prior30) / prior30 * 100
func computeVelocity(weeks []WeekData) float64 {
	var days []DayData
	for _, w := range weeks {
		days = append(days, w.Days...)
	}
	sort.Slice(days, func(i, j int) bool {
		return days[i].Date < days[j].Date
	})

	now := time.Now()
	cut1 := now.AddDate(0, 0, -30).Format("2006-01-02")
	cut2 := now.AddDate(0, 0, -60).Format("2006-01-02")

	var last30, prior30 float64
	for _, d := range days {
		if d.Date >= cut1 {
			last30 += float64(d.Count)
		} else if d.Date >= cut2 {
			prior30 += float64(d.Count)
		}
	}

	if prior30 == 0 {
		return 0
	}
	return (last30 - prior30) / prior30 * 100
}

// mostActiveWeekday returns the name of the weekday with most contributions
func mostActiveWeekday(weeks []WeekData) string {
	dayNames := []string{"Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"}
	counts := make([]int, 7)
	for _, w := range weeks {
		for i, d := range w.Days {
			if i < 7 {
				counts[i] += d.Count
			}
		}
	}
	max, idx := 0, 0
	for i, c := range counts {
		if c > max {
			max = c
			idx = i
		}
	}
	return dayNames[idx]
}

// ============================================================================
// Fetch GitHub Data via GraphQL
// ============================================================================

func fetchGitHubStats(username, token string) (GitHubStats, error) {
	// Query: user + contribution calendar + pinned repos + top languages
	query := `
	query($login: String!) {
	  user(login: $login) {
	    login name avatarUrl bio
	    publicRepos: repositories(privacy: PUBLIC) { totalCount }
	    followers { totalCount }
	    following { totalCount }
	    contributionsCollection {
	      contributionCalendar {
	        totalContributions
	        weeks {
	          contributionDays {
	            date
	            contributionCount
	          }
	        }
	      }
	    }
	    pinnedItems(first: 6, types: REPOSITORY) {
	      nodes {
	        ... on Repository {
	          name description url
	          stargazerCount forkCount
	          primaryLanguage { name }
	        }
	      }
	    }
	    repositories(first: 100, orderBy: {field: UPDATED_AT, direction: DESC}, isFork: false) {
	      nodes {
	        languages(first: 5, orderBy: {field: SIZE, direction: DESC}) {
	          edges { size node { name color } }
	        }
	      }
	    }
	  }
	}`

	result, err := graphQLQuery(token, query, map[string]interface{}{"login": username})
	if err != nil {
		return GitHubStats{}, err
	}

	data, ok := result["data"].(map[string]interface{})
	if !ok {
		return GitHubStats{}, fmt.Errorf("invalid GraphQL response")
	}
	user, ok := data["user"].(map[string]interface{})
	if !ok {
		return GitHubStats{}, fmt.Errorf("user not found")
	}

	// --- Basic user fields ---
	stats := GitHubStats{}
	stats.Login = strVal(user, "login")
	stats.Name = strVal(user, "name")
	stats.AvatarURL = strVal(user, "avatarUrl")
	stats.Bio = strVal(user, "bio")
	stats.FetchedAt = time.Now().UTC().Format(time.RFC3339)

	if pr, ok := user["publicRepos"].(map[string]interface{}); ok {
		stats.PublicRepos = intVal(pr, "totalCount")
	}
	if fl, ok := user["followers"].(map[string]interface{}); ok {
		stats.Followers = intVal(fl, "totalCount")
	}
	if fg, ok := user["following"].(map[string]interface{}); ok {
		stats.Following = intVal(fg, "totalCount")
	}

	// --- Contribution calendar ---
	cc := dig(user, "contributionsCollection", "contributionCalendar")
	if cc != nil {
		if tc, ok := cc.(map[string]interface{})["totalContributions"]; ok {
			stats.TotalContributions = int(tc.(float64))
		}
		rawWeeks, _ := cc.(map[string]interface{})["weeks"].([]interface{})
		for _, rw := range rawWeeks {
			wMap, _ := rw.(map[string]interface{})
			days, _ := wMap["contributionDays"].([]interface{})
			var wd WeekData
			for _, rd := range days {
				dm, _ := rd.(map[string]interface{})
				cnt := int(dm["contributionCount"].(float64))
				wd.Days = append(wd.Days, DayData{
					Date:  dm["date"].(string),
					Count: cnt,
					Level: countLevel(cnt),
				})
			}
			stats.ContributionCalendar = append(stats.ContributionCalendar, wd)
		}
	}

	// --- Streak computation (custom Go logic) ---
	stats.CurrentStreak, stats.LongestStreak = computeStreaks(stats.ContributionCalendar)
	stats.CommitVelocityPct = computeVelocity(stats.ContributionCalendar)
	stats.MostActiveDay = mostActiveWeekday(stats.ContributionCalendar)

	// --- Pinned repos ---
	if pins, ok := dig(user, "pinnedItems", "nodes").([]interface{}); ok {
		for _, p := range pins {
			pm, _ := p.(map[string]interface{})
			lang := ""
			if pl, ok := pm["primaryLanguage"].(map[string]interface{}); ok {
				lang = strVal(pl, "name")
			}
			stats.PinnedRepos = append(stats.PinnedRepos, PinnedRepo{
				Name:        strVal(pm, "name"),
				Description: strVal(pm, "description"),
				URL:         strVal(pm, "url"),
				Stars:       intVal(pm, "stargazerCount"),
				Forks:       intVal(pm, "forkCount"),
				Language:    lang,
			})
		}
	}

	// --- Top languages (aggregate by size across all repos) ---
	langSize := map[string]float64{}
	langColor := map[string]string{}
	if repos, ok := dig(user, "repositories", "nodes").([]interface{}); ok {
		for _, r := range repos {
			rm, _ := r.(map[string]interface{})
			if edges, ok := dig(rm, "languages", "edges").([]interface{}); ok {
				for _, e := range edges {
					em, _ := e.(map[string]interface{})
					size := em["size"].(float64)
					node, _ := em["node"].(map[string]interface{})
					name := strVal(node, "name")
					langSize[name] += size
					if _, exists := langColor[name]; !exists {
						langColor[name] = strVal(node, "color")
					}
				}
			}
		}
	}
	var totalSize float64
	for _, s := range langSize {
		totalSize += s
	}
	type lEntry struct{ name string; size float64 }
	var entries []lEntry
	for n, s := range langSize {
		entries = append(entries, lEntry{n, s})
	}
	sort.Slice(entries, func(i, j int) bool { return entries[i].size > entries[j].size })
	top := entries
	if len(top) > 6 {
		top = top[:6]
	}
	for _, e := range top {
		pct := 0.0
		if totalSize > 0 {
			pct = e.size / totalSize * 100
		}
		stats.TopLanguages = append(stats.TopLanguages, Language{
			Name:       e.name,
			Percentage: pct,
			Color:      langColor[e.name],
		})
	}

	return stats, nil
}

// ============================================================================
// Helpers
// ============================================================================

func strVal(m map[string]interface{}, key string) string {
	if v, ok := m[key]; ok {
		if s, ok := v.(string); ok {
			return s
		}
	}
	return ""
}

func intVal(m map[string]interface{}, key string) int {
	if v, ok := m[key]; ok {
		switch t := v.(type) {
		case float64:
			return int(t)
		case int:
			return t
		}
	}
	return 0
}

func dig(m map[string]interface{}, keys ...string) interface{} {
	var cur interface{} = m
	for _, k := range keys {
		mp, ok := cur.(map[string]interface{})
		if !ok {
			return nil
		}
		cur = mp[k]
	}
	return cur
}

// ============================================================================
// HTTP Handlers
// ============================================================================

func enableCORS(w http.ResponseWriter) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
}

func handleGitHubStats(w http.ResponseWriter, r *http.Request) {
	enableCORS(w)
	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return
	}

	// Cache hit — serve immediately
	if cached, ok := getCached(); ok {
		w.Header().Set("Content-Type", "application/json")
		w.Header().Set("X-Cache", "HIT")
		json.NewEncoder(w).Encode(cached)
		return
	}

	// Cache miss — fetch fresh data
	token := os.Getenv("GITHUB_TOKEN")
	username := os.Getenv("GITHUB_USERNAME")
	if username == "" {
		username = "Ashish5180" // default — override via env
	}
	if token == "" {
		http.Error(w, `{"error":"GITHUB_TOKEN env not set"}`, http.StatusInternalServerError)
		return
	}

	stats, err := fetchGitHubStats(username, token)
	if err != nil {
		log.Printf("GitHub fetch error: %v", err)
		http.Error(w, fmt.Sprintf(`{"error":"%s"}`, err.Error()), http.StatusBadGateway)
		return
	}

	setCache(stats)

	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("X-Cache", "MISS")
	json.NewEncoder(w).Encode(stats)
}

var (
	coffeeShots  uint64 = 42
	rallyCounter uint64 = 0
)

func handlePingPong(w http.ResponseWriter, r *http.Request) {
	enableCORS(w)
	t0 := time.Now()
	rallies := atomic.AddUint64(&rallyCounter, 1)

	var mem runtime.MemStats
	runtime.ReadMemStats(&mem)

	quotes := []string{
		"PONG! Served from Go in-memory cache · RWMutex protected",
		"PONG! 0ms GC pause overhead · 10,000 goroutines ready",
		"PONG! SYN ➔ SYN-ACK ➔ ACK handshake verified",
		"PONG! Faster than writing a console.log in JS ⚡",
		"PONG! Rate-limiter checked: recruiter access approved ☕",
		"PONG! Microsecond thread concurrency in action",
	}
	msg := quotes[int(rallies)%len(quotes)]

	durationUs := time.Since(t0).Microseconds()
	if durationUs == 0 {
		durationUs = 120
	}

	resp := map[string]interface{}{
		"status":       "pong",
		"rally":        rallies,
		"latency_us":   durationUs,
		"goroutines":   runtime.NumGoroutine(),
		"mem_alloc_kb": mem.Alloc / 1024,
		"message":      msg,
		"timestamp":    time.Now().UTC().Format(time.RFC3339Nano),
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(resp)
}

func handleCoffeeBoost(w http.ResponseWriter, r *http.Request) {
	enableCORS(w)
	t0 := time.Now()

	shots := atomic.AddUint64(&coffeeShots, 1)

	// Concurrently spin up 10,000 real goroutines
	workerCount := 10000
	var wg sync.WaitGroup
	wg.Add(workerCount)

	var counter uint64
	for i := 0; i < workerCount; i++ {
		go func(id int) {
			defer wg.Done()
			atomic.AddUint64(&counter, uint64(id%7))
		}(i)
	}
	wg.Wait()

	durationUs := time.Since(t0).Microseconds()

	resp := map[string]interface{}{
		"status":             "overclocked",
		"goroutines_spawned": workerCount,
		"duration_us":        durationUs,
		"coffee_shots":       shots,
		"result_checksum":    counter,
		"message":            fmt.Sprintf("⚡ %d goroutines spawned and joined in %dµs on Go 1.24!", workerCount, durationUs),
		"timestamp":          time.Now().UTC().Format(time.RFC3339),
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(resp)
}

func handleTelemetry(w http.ResponseWriter, r *http.Request) {
	enableCORS(w)
	var mem runtime.MemStats
	runtime.ReadMemStats(&mem)

	resp := map[string]interface{}{
		"status":            "healthy",
		"runtime":           runtime.Version(),
		"cpu_cores":         runtime.NumCPU(),
		"active_goroutines": runtime.NumGoroutine(),
		"alloc_mb":          fmt.Sprintf("%.2f MB", float64(mem.Alloc)/(1024*1024)),
		"total_alloc_mb":    fmt.Sprintf("%.2f MB", float64(mem.TotalAlloc)/(1024*1024)),
		"gc_cycles":         mem.NumGC,
		"coffee_shots":      atomic.LoadUint64(&coffeeShots),
		"rallies":           atomic.LoadUint64(&rallyCounter),
		"uptime_s":          int(time.Since(startTime).Seconds()),
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(resp)
}

func handleHealth(w http.ResponseWriter, r *http.Request) {
	enableCORS(w)
	cacheMu.RLock()
	cacheStatus := "empty"
	var cacheAge string
	if cache != nil {
		if time.Now().Before(cache.ExpiresAt) {
			cacheStatus = "hot"
			cacheAge = fmt.Sprintf("%.0fs remaining", time.Until(cache.ExpiresAt).Seconds())
		} else {
			cacheStatus = "expired"
		}
	}
	cacheMu.RUnlock()

	resp := map[string]interface{}{
		"status":      "ok",
		"service":     "portfolio-github-stats",
		"language":    "Go 1.24",
		"cache":       cacheStatus,
		"cache_ttl_s": cacheTTL.Seconds(),
		"cache_age":   cacheAge,
		"uptime_s":    time.Since(startTime).Seconds(),
		"timestamp":   time.Now().UTC().Format(time.RFC3339),
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(resp)
}

var startTime = time.Now()

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	username := os.Getenv("GITHUB_USERNAME")
	if username == "" {
		username = "Ashish5180"
	}

	mux := http.NewServeMux()
	mux.HandleFunc("/api/github", handleGitHubStats)
	mux.HandleFunc("/api/ping-pong", handlePingPong)
	mux.HandleFunc("/api/coffee-boost", handleCoffeeBoost)
	mux.HandleFunc("/api/telemetry", handleTelemetry)
	mux.HandleFunc("/health", handleHealth)

	// Simple request logger middleware
	handler := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()
		mux.ServeHTTP(w, r)
		log.Printf("[%s] %s %s  %dms",
			time.Now().Format("15:04:05"),
			r.Method, r.URL.Path,
			time.Since(start).Milliseconds(),
		)
	})

	addr := ":" + port
	log.Printf("🚀 Portfolio GitHub Stats Service starting on %s", addr)
	log.Printf("   Username   : %s", username)
	log.Printf("   Cache TTL  : %s", cacheTTL)
	log.Printf("   Token set  : %s", func() string {
		if strings.HasPrefix(os.Getenv("GITHUB_TOKEN"), "ghp_") || strings.HasPrefix(os.Getenv("GITHUB_TOKEN"), "github_pat_") {
			return "✓"
		}
		return "✗ (set GITHUB_TOKEN)"
	}())

	if err := http.ListenAndServe(addr, handler); err != nil {
		log.Fatalf("Server failed: %v", err)
	}
}
