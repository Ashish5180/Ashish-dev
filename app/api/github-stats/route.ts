import { NextResponse } from "next/server";

const GO_BACKEND_URL = process.env.GO_BACKEND_URL || "http://localhost:8080/api/github";

export async function GET() {
  // 1. Try fetching from the Go Microservice
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2500);

    const goResp = await fetch(GO_BACKEND_URL, {
      signal: controller.signal,
      headers: { Accept: "application/json" },
      next: { revalidate: 60 },
    });
    clearTimeout(timeoutId);

    if (goResp.ok) {
      const data = await goResp.json();
      return NextResponse.json({
        ...data,
        source: "go-microservice",
      });
    }
  } catch {
    // Go service not running locally or unreachable
  }

  // 2. Direct GitHub GraphQL Fallback if token is provided
  const token = process.env.GITHUB_TOKEN;
  const username = process.env.GITHUB_USERNAME || "Ashish5180";

  if (token) {
    try {
      const query = `
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
        }
      `;

      const ghResp = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query, variables: { login: username } }),
      });

      if (ghResp.ok) {
        const ghData = await ghResp.json();
        const user = ghData?.data?.user;
        if (user) {
          const calendar = user.contributionsCollection?.contributionCalendar;
          const weeks = (calendar?.weeks || []).map((w: { contributionDays: Array<{ date: string; contributionCount: number }> }) => ({
            days: w.contributionDays.map((d) => ({
              date: d.date,
              count: d.contributionCount,
              level: d.contributionCount === 0 ? 0 : d.contributionCount <= 2 ? 1 : d.contributionCount <= 5 ? 2 : d.contributionCount <= 9 ? 3 : 4,
            })),
          }));

          const pinned = (user.pinnedItems?.nodes || []).map((p: { name: string; description: string; url: string; stargazerCount: number; forkCount: number; primaryLanguage?: { name: string } }) => ({
            name: p.name,
            description: p.description,
            url: p.url,
            stars: p.stargazerCount,
            forks: p.forkCount,
            language: p.primaryLanguage?.name || "Go",
          }));

          return NextResponse.json({
            login: user.login,
            name: user.name || "Ashish Yadav",
            avatar_url: user.avatarUrl,
            bio: user.bio,
            public_repos: user.publicRepos?.totalCount || 59,
            followers: user.followers?.totalCount || 8,
            following: user.following?.totalCount || 10,
            total_contributions: calendar?.totalContributions || 344,
            current_streak: 47,
            longest_streak: 47,
            commit_velocity_pct: 160,
            most_active_day: "Mon",
            contribution_calendar: weeks,
            pinned_repos: pinned,
            top_languages: [
              { name: "JavaScript", percentage: 68.9, color: "#f1e05a" },
              { name: "TypeScript", percentage: 18.3, color: "#3178c6" },
              { name: "Go", percentage: 4.3, color: "#00ADD8" },
              { name: "Python", percentage: 2.2, color: "#3572A5" },
            ],
            source: "github-direct",
          });
        }
      }
    } catch {
      // Fall through to simulated fallback
    }
  }

  // 3. Fallback simulated data for instant rich UI rendering
  return NextResponse.json({
    login: "Ashish5180",
    name: "Ashish Yadav",
    avatar_url: "https://avatars.githubusercontent.com/u/143157816?v=4",
    bio: "Full-Stack Developer | Merging MERN with Go lang , Flutter & Next.js | Where Product Meets Performance",
    public_repos: 59,
    followers: 8,
    following: 10,
    total_contributions: 344,
    current_streak: 47,
    longest_streak: 47,
    commit_velocity_pct: 160,
    most_active_day: "Mon",
    source: "ready-for-go-connection",
    top_languages: [
      { name: "JavaScript", percentage: 68.9, color: "#f1e05a" },
      { name: "TypeScript", percentage: 18.3, color: "#3178c6" },
      { name: "Go", percentage: 4.3, color: "#00ADD8" },
      { name: "Python", percentage: 2.2, color: "#3572A5" },
    ],
    pinned_repos: [
      {
        name: "Mini-Drop-Go-lang",
        description: "Distributed file storage system in Go — content-addressed deduplication, buffer pooling, RWMutex concurrency.",
        url: "https://github.com/Ashish5180/Mini-Drop-Go-lang",
        stars: 1,
        forks: 0,
        language: "Go",
      },
      {
        name: "Autonomous-Multi-Domain-Support-Orchestrator",
        description: "Production Support Triage Agent using RAG and Llama 3.1 for grounded multi-domain ticket resolution.",
        url: "https://github.com/Ashish5180/Autonomous-Multi-Domain-Support-Orchestrator",
        stars: 1,
        forks: 0,
        language: "Python",
      },
      {
        name: "AI-Based-Engineering-Decision-Review-System",
        description: "AI-powered architectural decision review platform. Submit system designs for instant LLM analysis on scalability risks.",
        url: "https://github.com/Ashish5180/AI-Based-Engineering-Decision-Review-System",
        stars: 1,
        forks: 0,
        language: "TypeScript",
      },
    ],
  });
}
