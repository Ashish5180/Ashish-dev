"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GitCommit, Star, Code2, Flame, TrendingUp } from "lucide-react";

// ─── CONFIG ───────────────────────────────────────────────────────────────────
const GITHUB_USERNAME = "Ashish5180";
const GITHUB_TOKEN = "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";
// ─────────────────────────────────────────────────────────────────────────────

interface ContribDay {
    date: string;
    contributionCount: number;
    weekday: number;
}

interface Week {
    contributionDays: ContribDay[];
}

interface HeatmapData {
    totalContributions: number;
    weeks: Week[];
    topLanguage: string;
    publicRepos: number;
    longestStreak: number;
    currentStreak: number;
    busiest: { date: string; count: number };
}

const GQL_CONTRIBS = `
query($username: String!) {
  user(login: $username) {
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays { date contributionCount weekday }
        }
      }
    }
    repositories(first: 100, ownerAffiliations: OWNER, isFork: false, orderBy: {field: UPDATED_AT, direction: DESC}) {
      nodes {
        primaryLanguage { name }
        stargazerCount
      }
      totalCount
    }
  }
}`;

function computeStreaks(weeks: Week[]) {
    const days = weeks.flatMap(w => w.contributionDays).sort((a, b) => a.date.localeCompare(b.date));
    let longest = 0, current = 0, streak = 0;
    let busiest = { date: "", count: 0 };

    for (const d of days) {
        if (d.contributionCount > busiest.count) busiest = { date: d.date, count: d.contributionCount };
        if (d.contributionCount > 0) {
            streak++;
            if (streak > longest) longest = streak;
        } else {
            streak = 0;
        }
    }

    for (let i = days.length - 1; i >= 0; i--) {
        if (days[i].contributionCount > 0) current++;
        else break;
    }

    return { longest, current, busiest };
}

function getColor(count: number, max: number): string {
    if (count === 0) return "#F5F5F0";
    const t = Math.min(count / Math.max(max * 0.55, 1), 1);
    if (t < 0.2) return "#DFDFD6";
    if (t < 0.45) return "#CACABF";
    if (t < 0.72) return "#555";
    return "#0E0E0E";
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function CountUp({ to, duration = 1200 }: { to: number; duration?: number }) {
    const [val, setVal] = useState(0);
    useEffect(() => {
        let start: number | null = null;
        const step = (ts: number) => {
            if (!start) start = ts;
            const p = Math.min((ts - start) / duration, 1);
            setVal(Math.floor(p * to));
            if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, [to, duration]);
    return <>{val.toLocaleString()}</>;
}

export default function CommitHeatmap() {
    const [data, setData] = useState<HeatmapData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [tooltip, setTooltip] = useState<{ x: number; y: number; text: string } | null>(null);
    const [hovered, setHovered] = useState<string | null>(null);

    useEffect(() => {
        fetch("https://api.github.com/graphql", {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${GITHUB_TOKEN}` },
            body: JSON.stringify({ query: GQL_CONTRIBS, variables: { username: GITHUB_USERNAME } }),
        })
            .then(r => r.json())
            .then(json => {
                const user = json?.data?.user;
                if (!user) throw new Error("User not found or token expired.");

                const cal = user.contributionsCollection.contributionCalendar;
                const repos = user.repositories.nodes as { primaryLanguage: { name: string } | null; stargazerCount: number }[];

                const langCount: Record<string, number> = {};
                repos.forEach(r => {
                    if (r.primaryLanguage?.name)
                        langCount[r.primaryLanguage.name] = (langCount[r.primaryLanguage.name] || 0) + 1;
                });
                const topLang = Object.entries(langCount).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "TypeScript";
                const topPct = repos.length ? Math.round((langCount[topLang] / repos.length) * 100) : 0;

                const { longest, current, busiest } = computeStreaks(cal.weeks);

                setData({
                    totalContributions: cal.totalContributions,
                    weeks: cal.weeks,
                    topLanguage: `${topLang} · ${topPct}%`,
                    publicRepos: user.repositories.totalCount,
                    longestStreak: longest,
                    currentStreak: current,
                    busiest,
                });
            })
            .catch(e => setError(e.message ?? "Failed to load"))
            .finally(() => setLoading(false));
    }, []);

    const CELL = 12, GAP = 3, STEP = CELL + GAP;

    // ── Skeleton ──────────────────────────────────────────────────────────────
    if (loading) {
        return (
            <div style={{ background: "#fff", border: "1.5px solid #E8E6E0", borderRadius: 24, padding: 24, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                <style>{`@keyframes shimmer{0%{background-position:-400px 0}100%{background-position:400px 0}}`}</style>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: "#F0EEE8" }} />
                    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                        <div style={{ width: 110, height: 11, borderRadius: 4, background: "linear-gradient(90deg,#f0eee8 25%,#e5e3dc 50%,#f0eee8 75%)", backgroundSize: "400px 100%", animation: "shimmer 1.4s infinite" }} />
                        <div style={{ width: 72, height: 9, borderRadius: 4, background: "linear-gradient(90deg,#f0eee8 25%,#e5e3dc 50%,#f0eee8 75%)", backgroundSize: "400px 100%", animation: "shimmer 1.4s infinite 0.2s" }} />
                    </div>
                </div>
                <div style={{ display: "flex", gap: GAP, flexWrap: "nowrap", overflowX: "hidden", minHeight: 102 }}>
                    {Array.from({ length: 52 }).map((_, wi) => (
                        <div key={wi} style={{ display: "flex", flexDirection: "column", gap: GAP }}>
                            {Array.from({ length: 7 }).map((_, di) => (
                                <div key={di} style={{
                                    width: CELL, height: CELL, borderRadius: 3, flexShrink: 0,
                                    background: "linear-gradient(90deg,#f0eee8 25%,#e5e3dc 50%,#f0eee8 75%)",
                                    backgroundSize: "400px 100%",
                                    animation: `shimmer 1.4s infinite ${(wi * 0.03).toFixed(2)}s`,
                                }} />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    // ── Error ─────────────────────────────────────────────────────────────────
    if (error || !data) {
        return (
            <div style={{ background: "#fff", border: "1.5px dashed #E8E6E0", borderRadius: 24, padding: 24, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                <p style={{ fontSize: 12, color: "#aaa" }}>{error ?? "No data available."}</p>
            </div>
        );
    }

    // ── Month labels ──────────────────────────────────────────────────────────
    const monthLabels: { label: string; col: number }[] = [];
    data.weeks.forEach((week, wi) => {
        const first = week.contributionDays[0];
        if (!first) return;
        const d = new Date(first.date);
        if (d.getDate() <= 7) {
            if (!monthLabels.length || monthLabels[monthLabels.length - 1].label !== MONTHS[d.getMonth()]) {
                monthLabels.push({ label: MONTHS[d.getMonth()], col: wi });
            }
        }
    });

    const maxCount = Math.max(...data.weeks.flatMap(w => w.contributionDays.map(d => d.contributionCount)), 1);
    const allDays = data.weeks.flatMap(w => w.contributionDays);
    const activeDays = allDays.filter(d => d.contributionCount > 0).length;

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{
                background: "#fff",
                border: "1.5px solid #E8E6E0",
                borderRadius: 24,
                padding: "24px",
                boxShadow: "0 10px 40px rgba(0,0,0,0.04)",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                position: "relative",
            }}
        >
            {/* ── Header ── */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: "#F0EEE8", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <GitCommit size={16} color="#0E0E0E" />
                    </div>
                    <div>
                        <h3 style={{ fontSize: 14, fontWeight: 700, color: "#0E0E0E", margin: 0 }}>Activity Graph</h3>
                        <p style={{ fontSize: 10, color: "#999", textTransform: "uppercase", letterSpacing: 1, margin: 0 }}>Last 52 weeks</p>
                    </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <motion.div
                        animate={{ scale: [1, 1.4, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e" }}
                    />
                    <div style={{ textAlign: "right" }}>
                        <span style={{ fontSize: 14, fontWeight: 800, color: "#0E0E0E", display: "block" }}>
                            <CountUp to={data.totalContributions} />
                        </span>
                        <p style={{ fontSize: 9, color: "#999", fontWeight: 600, margin: 0, letterSpacing: 1 }}>CONTRIBUTIONS</p>
                    </div>
                </div>
            </div>

            {/* ── Heatmap Grid ── */}
            <div style={{ overflowX: "auto", paddingBottom: 6, msOverflowStyle: "none", scrollbarWidth: "none" }}>
                <div style={{ position: "relative", display: "inline-block" }}>

                    {/* Month labels */}
                    <div style={{ display: "flex", marginBottom: 5, marginLeft: 26 }}>
                        {data.weeks.map((_, wi) => {
                            const lbl = monthLabels.find(m => m.col === wi);
                            return (
                                <div key={wi} style={{ width: STEP, flexShrink: 0, fontSize: 9, color: "#bbb", letterSpacing: 0.3 }}>
                                    {lbl?.label ?? ""}
                                </div>
                            );
                        })}
                    </div>

                    <div style={{ display: "flex" }}>
                        {/* Day labels */}
                        <div style={{ display: "flex", flexDirection: "column", gap: GAP, marginRight: 4 }}>
                            {DAYS.map((d, i) => (
                                <div key={d} style={{
                                    width: 20, height: CELL, fontSize: 9, color: "#bbb",
                                    display: "flex", alignItems: "center", justifyContent: "flex-end",
                                    paddingRight: 3,
                                    visibility: i % 2 !== 0 ? "visible" : "hidden",
                                }}>
                                    {d}
                                </div>
                            ))}
                        </div>

                        {/* Cells */}
                        <div style={{ display: "flex", gap: GAP }}>
                            {data.weeks.map((week, wi) => (
                                <motion.div
                                    key={wi}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.25, delay: wi * 0.015, ease: "easeOut" }}
                                    style={{ display: "flex", flexDirection: "column", gap: GAP }}
                                >
                                    {wi === 0 && (week.contributionDays[0]?.weekday ?? 0) > 0 &&
                                        Array.from({ length: week.contributionDays[0].weekday }).map((_, pi) => (
                                            <div key={`pad-${pi}`} style={{ width: CELL, height: CELL }} />
                                        ))
                                    }
                                    {week.contributionDays.map((day) => (
                                        <motion.div
                                            key={day.date}
                                            onMouseEnter={(e) => {
                                                setHovered(day.date);
                                                const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
                                                setTooltip({
                                                    x: rect.left + rect.width / 2,
                                                    y: rect.top - 10,
                                                    text: day.contributionCount === 0
                                                        ? `No contributions · ${new Date(day.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}`
                                                        : `${day.contributionCount} commit${day.contributionCount !== 1 ? "s" : ""} · ${new Date(day.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`,
                                                });
                                            }}
                                            onMouseLeave={() => { setHovered(null); setTooltip(null); }}
                                            animate={{
                                                scale: hovered === day.date ? 1.5 : 1,
                                                opacity: hovered && hovered !== day.date ? 0.45 : 1,
                                            }}
                                            transition={{ duration: 0.1 }}
                                            style={{
                                                width: CELL, height: CELL, borderRadius: 3,
                                                background: getColor(day.contributionCount, maxCount),
                                                cursor: "default", flexShrink: 0,
                                            }}
                                        />
                                    ))}
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Legend */}
                    <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 10, justifyContent: "flex-end" }}>
                        <span style={{ fontSize: 9, color: "#bbb", marginRight: 2 }}>Less</span>
                        {["#F5F5F0", "#DFDFD6", "#CACABF", "#555", "#0E0E0E"].map(c => (
                            <div key={c} style={{ width: CELL, height: CELL, borderRadius: 3, background: c }} />
                        ))}
                        <span style={{ fontSize: 9, color: "#bbb", marginLeft: 2 }}>More</span>
                    </div>
                </div>
            </div>

            {/* ── Stats Cards ── */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 16 }}>

                <motion.div
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}
                    style={{ padding: "13px 14px", borderRadius: 16, border: "1px solid #F0EEE8", background: "#fbfbfa" }}
                >
                    <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 5 }}>
                        <Flame size={12} color="#f59e0b" />
                        <span style={{ fontSize: 10, fontWeight: 700, color: "#0E0E0E" }}>Longest Streak</span>
                    </div>
                    <p style={{ fontSize: 13, color: "#555", fontWeight: 700, margin: 0 }}>
                        <CountUp to={data.longestStreak} duration={900} /> days
                    </p>
                    <p style={{ fontSize: 10, color: "#bbb", margin: "3px 0 0", fontWeight: 500 }}>
                        Current: {data.currentStreak}d
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }}
                    style={{ padding: "13px 14px", borderRadius: 16, border: "1px solid #F0EEE8", background: "#fbfbfa" }}
                >
                    <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 5 }}>
                        <Code2 size={12} color="#3b82f6" />
                        <span style={{ fontSize: 10, fontWeight: 700, color: "#0E0E0E" }}>Most Used</span>
                    </div>
                    <p style={{ fontSize: 13, color: "#555", fontWeight: 700, margin: 0 }}>{data.topLanguage}</p>
                    <p style={{ fontSize: 10, color: "#bbb", margin: "3px 0 0", fontWeight: 500 }}>
                        across {data.publicRepos} repos
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.72 }}
                    style={{ padding: "13px 14px", borderRadius: 16, border: "1px solid #F0EEE8", background: "#fbfbfa" }}
                >
                    <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 5 }}>
                        <TrendingUp size={12} color="#22c55e" />
                        <span style={{ fontSize: 10, fontWeight: 700, color: "#0E0E0E" }}>Active Days</span>
                    </div>
                    <p style={{ fontSize: 13, color: "#555", fontWeight: 700, margin: 0 }}>
                        <CountUp to={activeDays} duration={1000} /> days
                    </p>
                    <p style={{ fontSize: 10, color: "#bbb", margin: "3px 0 0", fontWeight: 500 }}>
                        {Math.round((activeDays / allDays.length) * 100)}% of the year
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.78 }}
                    style={{ padding: "13px 14px", borderRadius: 16, border: "1px solid #F0EEE8", background: "#fbfbfa" }}
                >
                    <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 5 }}>
                        <Star size={12} color="#f59e0b" fill="#f59e0b" />
                        <span style={{ fontSize: 10, fontWeight: 700, color: "#0E0E0E" }}>Best Day</span>
                    </div>
                    <p style={{ fontSize: 13, color: "#555", fontWeight: 700, margin: 0 }}>
                        <CountUp to={data.busiest.count} duration={800} /> commits
                    </p>
                    <p style={{ fontSize: 10, color: "#bbb", margin: "3px 0 0", fontWeight: 500 }}>
                        {data.busiest.date
                            ? new Date(data.busiest.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })
                            : "—"}
                    </p>
                </motion.div>
            </div>

            {/* Footer */}
            <div style={{ marginTop: 14, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: 10, color: "#ccc" }}>@{GITHUB_USERNAME}</span>
                <a
                    href={`https://github.com/${GITHUB_USERNAME}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: 10, color: "#bbb", textDecoration: "none", letterSpacing: 1, textTransform: "uppercase" }}
                >
                    View Profile →
                </a>
            </div>

            {/* Tooltip */}
            <AnimatePresence>
                {tooltip && (
                    <motion.div
                        initial={{ opacity: 0, y: 4, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.1 }}
                        style={{
                            position: "fixed",
                            left: tooltip.x, top: tooltip.y,
                            transform: "translate(-50%, -100%)",
                            background: "#0E0E0E", color: "#fff",
                            padding: "7px 12px", borderRadius: 9,
                            fontSize: 11, fontFamily: "'Plus Jakarta Sans', sans-serif",
                            whiteSpace: "nowrap", pointerEvents: "none",
                            zIndex: 9999,
                            boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
                        }}
                    >
                        {tooltip.text}
                        <div style={{
                            position: "absolute", bottom: -4, left: "50%",
                            transform: "translateX(-50%) rotate(45deg)",
                            width: 8, height: 8, background: "#0E0E0E",
                        }} />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}