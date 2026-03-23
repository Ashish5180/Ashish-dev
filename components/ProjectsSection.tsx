"use client";

import React, { useRef, useState, useEffect } from "react";
import {
    motion,
    useInView,
    AnimatePresence,
} from "framer-motion";
import {
    Terminal,
    Chrome,
    Cpu,
    Database,
    Search,
    GitBranch,
    ArrowRight,
    Shield,
    Bot,
    Sparkles,
    Command,
    MonitorSmartphone,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════════════════════════════ */

interface TerminalLine {
    type: "prompt" | "output";
    text: string;
}

interface BrowserQuestion {
    q: string;
    options: string[];
    correct: number;
}

interface BrowserData {
    url: string;
    tabs: string[];
    questions: BrowserQuestion[];
}

interface ProjectBullet {
    icon: React.ReactNode;
    text: string;
}

interface ProjectStat {
    value: string;
    label: string;
}

interface Project {
    id: string;
    title: string;
    subtitle: string;
    stack: string[];
    icon: React.ReactNode;
    accent: string;
    accentLight: string;
    accentBorder: string;
    badge: string;
    bullets: ProjectBullet[];
    terminal?: { lines: TerminalLine[] };
    browser?: BrowserData;
    github: string;
    stats: ProjectStat[];
}

/* ═══════════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════════ */

const PROJECTS: Project[] = [
    {
        id: "ashos",
        title: "ASHOS",
        subtitle: "AI-Powered CLI Personal Operating System",
        stack: ["Go", "RAG", "SQLite", "OpenAI", "Bubble Tea"],
        icon: <Terminal size={22} />,
        accent: "#10b981",
        accentLight: "rgba(16, 185, 129, 0.08)",
        accentBorder: "rgba(16, 185, 129, 0.25)",
        badge: "PRODUCTION",
        bullets: [
            {
                icon: <Cpu size={14} />,
                text: "Event-driven CLI OS in Go with Composition Root DI — full infrastructure swap in 1 line of code.",
            },
            {
                icon: <Database size={14} />,
                text: "Full RAG pipeline: OpenAI embeddings → hybrid vector search (SQLite-vec + Cosine Similarity) → GPT response across 4+ data sources.",
            },
            {
                icon: <Command size={14} />,
                text: "4 AI productivity commands (standup, suggest, ask, reingest) with async ingestion & sync.RWMutex across 6+ modules.",
            },
        ],
        terminal: {
            lines: [
                { type: "prompt" as const, text: "ashos > standup" },
                { type: "output" as const, text: "📋 Generating standup from yesterday's activity..." },
                { type: "output" as const, text: "✓ Reviewed 3 PRs, shipped auth middleware" },
                { type: "output" as const, text: "✓ Fixed race condition in ingestion pipeline" },
                { type: "output" as const, text: "→ Today: Implement query batching for RAG" },
                { type: "prompt" as const, text: "ashos > suggest --context=current" },
                { type: "output" as const, text: "💡 Based on your recent work:" },
                { type: "output" as const, text: "  1. Add retry logic to embedding calls" },
                { type: "output" as const, text: "  2. Consider caching frequent vector lookups" },
                { type: "prompt" as const, text: "ashos > _" },
            ],
        },
        github: "#",
        stats: [
            { value: "4+", label: "Data Sources" },
            { value: "6+", label: "Modules" },
            { value: "1", label: "Line Swap" },
        ],
    },
    {
        id: "quiz-helper",
        title: "AI Quiz Helper",
        subtitle: "Chrome Extension — Real-time AI Answer Detection",
        stack: ["JS", "Claude API", "Manifest V3", "MutationObserver", "CSS Injection"],
        icon: <Chrome size={22} />,
        accent: "#6366f1",
        accentLight: "rgba(99, 102, 241, 0.08)",
        accentBorder: "rgba(99, 102, 241, 0.25)",
        badge: "EXTENSION",
        bullets: [
            {
                icon: <Search size={14} />,
                text: "Scrapes quiz DOM in real-time, sending structured HTML to Claude API for automated answer detection across dynamic platforms.",
            },
            {
                icon: <MonitorSmartphone size={14} />,
                text: "MutationObserver-based SPA detection (React/Angular/Vue) + background service worker to bypass CSP restrictions.",
            },
            {
                icon: <Shield size={14} />,
                text: "Resolved 12+ edge cases (Shadow DOM, Vision, iframe traversal, multi-select MCQs) with 1 API call per page via batching.",
            },
        ],
        browser: {
            url: "quiz-platform.com/exam/cs-201",
            tabs: ["Quiz Platform", "Study Notes"],
            questions: [
                {
                    q: "Which data structure uses LIFO?",
                    options: ["Queue", "Stack", "Array", "Tree"],
                    correct: 1,
                },
                {
                    q: "Time complexity of binary search?",
                    options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
                    correct: 1,
                },
            ],
        },
        github: "#",
        stats: [
            { value: "12+", label: "Edge Cases" },
            { value: "1", label: "API Call / Page" },
            { value: "3", label: "SPA Frameworks" },
        ],
    },
];

/* ═══════════════════════════════════════════════════════════════════
   ANIMATED HEADING
   ═══════════════════════════════════════════════════════════════════ */

function RevealText({
    children,
    delay = 0,
    className,
    style,
}: {
    children: string;
    delay?: number;
    className?: string;
    style?: React.CSSProperties;
}) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });
    const words = children.split(" ");

    return (
        <span ref={ref} className={className} style={{ display: "inline", ...style }}>
            {words.map((word, i) => (
                <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                    animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                    transition={{
                        duration: 0.6,
                        delay: delay + i * 0.05,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                    style={{ display: "inline-block", marginRight: "0.28em" }}
                >
                    {word}
                </motion.span>
            ))}
        </span>
    );
}

/* ═══════════════════════════════════════════════════════════════════
   TERMINAL WINDOW (for ASHOS)
   ═══════════════════════════════════════════════════════════════════ */

function TerminalDemo({ lines, accent }: { lines: TerminalLine[]; accent: string }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });
    const [visibleLines, setVisibleLines] = useState(0);

    useEffect(() => {
        if (!inView) return;
        const initTimer = setTimeout(() => setVisibleLines(0), 0);
        const timers: NodeJS.Timeout[] = [initTimer];
        lines.forEach((_, i) => {
            timers.push(setTimeout(() => setVisibleLines(i + 1), 400 + i * 320));
        });
        return () => timers.forEach(clearTimeout);
    }, [inView, lines]);

    return (
        <div ref={ref} style={terminalStyles.wrapper}>
            {/* Title bar */}
            <div style={terminalStyles.titleBar}>
                <div style={{ display: "flex", gap: 6 }}>
                    <span style={{ ...terminalStyles.dot, background: "#ff5f57" }} />
                    <span style={{ ...terminalStyles.dot, background: "#febc2e" }} />
                    <span style={{ ...terminalStyles.dot, background: "#28c840" }} />
                </div>
                <span style={terminalStyles.titleText}>ashos — zsh</span>
                <div style={{ width: 48 }} />
            </div>

            {/* Body */}
            <div style={terminalStyles.body}>
                {lines.slice(0, visibleLines).map((line, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{
                            fontFamily: "'Roboto Mono', 'SF Mono', monospace",
                            fontSize: 12.5,
                            lineHeight: 1.85,
                            color: line.type === "prompt" ? accent : "#a0a0a0",
                            fontWeight: line.type === "prompt" ? 600 : 400,
                        }}
                    >
                        {line.type === "prompt" && (
                            <span style={{ color: accent, marginRight: 0 }}>
                                {""}
                            </span>
                        )}
                        {line.text}
                        {i === visibleLines - 1 && line.text.endsWith("_") && (
                            <motion.span
                                animate={{ opacity: [1, 0, 1] }}
                                transition={{ duration: 1, repeat: Infinity }}
                                style={{
                                    display: "inline-block",
                                    width: 8,
                                    height: 15,
                                    background: accent,
                                    marginLeft: 2,
                                    verticalAlign: "text-bottom",
                                }}
                            />
                        )}
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

const terminalStyles: Record<string, React.CSSProperties> = {
    wrapper: {
        borderRadius: 14,
        overflow: "hidden",
        background: "#0c0c0c",
        border: "1px solid #222",
        boxShadow: "0 20px 60px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.04) inset",
    },
    titleBar: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 14px",
        background: "#1a1a1a",
        borderBottom: "1px solid #222",
    },
    dot: {
        width: 11,
        height: 11,
        borderRadius: "50%",
        display: "inline-block",
    },
    titleText: {
        fontFamily: "'Roboto Mono', monospace",
        fontSize: 11,
        color: "#555",
        letterSpacing: "0.5px",
    },
    body: {
        padding: "18px 20px",
        minHeight: 220,
    },
};

/* ═══════════════════════════════════════════════════════════════════
   BROWSER WINDOW (for Quiz Helper)
   ═══════════════════════════════════════════════════════════════════ */

function BrowserDemo({
    browser,
    accent,
}: {
    browser: BrowserData | undefined;
    accent: string;
}) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });
    const [scanning, setScanning] = useState(false);
    const [reveals, setReveals] = useState<boolean[]>([]);

    useEffect(() => {
        if (!inView || !browser) return;
        const t1 = setTimeout(() => setScanning(true), 800);
        const t2 = setTimeout(() => {
            setScanning(false);
            setReveals(browser.questions.map(() => true));
        }, 2400);
        return () => { clearTimeout(t1); clearTimeout(t2); };
    }, [inView, browser]);

    if (!browser) return null;

    return (
        <div ref={ref} style={browserStyles.wrapper}>
            {/* Browser chrome */}
            <div style={browserStyles.chrome}>
                <div style={{ display: "flex", gap: 6 }}>
                    <span style={{ ...terminalStyles.dot, background: "#ff5f57" }} />
                    <span style={{ ...terminalStyles.dot, background: "#febc2e" }} />
                    <span style={{ ...terminalStyles.dot, background: "#28c840" }} />
                </div>
                <div style={browserStyles.urlBar}>
                    <Shield size={11} color="#666" />
                    <span style={{ fontSize: 11.5, color: "#888", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        {browser.url}
                    </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <div style={browserStyles.extensionIcon}>
                        <Bot size={12} color={accent} />
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div style={browserStyles.tabBar}>
                {browser.tabs.map((tab, i) => (
                    <div
                        key={i}
                        style={{
                            ...browserStyles.tab,
                            background: i === 0 ? "#fff" : "#f0f0f0",
                            borderBottom: i === 0 ? "2px solid " + accent : "none",
                        }}
                    >
                        <span style={{ fontSize: 11, color: i === 0 ? "#333" : "#999", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 500 }}>
                            {tab}
                        </span>
                    </div>
                ))}
            </div>

            {/* Body */}
            <div style={browserStyles.body}>
                {/* Scanning overlay */}
                <AnimatePresence>
                    {scanning && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            style={browserStyles.scanOverlay}
                        >
                            <motion.div
                                animate={{ top: ["0%", "100%", "0%"] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                style={browserFunctions.scanLine(accent)}
                            />
                            <div style={browserFunctions.scanBadge(accent)}>
                                <Search size={12} />
                                <span>AI Scanning DOM...</span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Questions */}
                {browser.questions.map((q, qi) => (
                    <div key={qi} style={{ marginBottom: 18 }}>
                        <div style={{
                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                            fontSize: 13,
                            fontWeight: 600,
                            color: "#333",
                            marginBottom: 10,
                        }}>
                            Q{qi + 1}. {q.q}
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                            {q.options.map((opt, oi) => {
                                const isCorrect = oi === q.correct;
                                const revealed = reveals[qi] && isCorrect;
                                return (
                                    <motion.div
                                        key={oi}
                                        animate={revealed ? {
                                            background: [`rgba(99,102,241,0)`, `rgba(99,102,241,0.08)`, `rgba(99,102,241,0.12)`],
                                            borderColor: [accent + "00", accent + "40", accent + "80"],
                                        } : {}}
                                        transition={{ duration: 0.6, delay: qi * 0.2 }}
                                        style={{
                                            padding: "9px 14px",
                                            borderRadius: 8,
                                            border: `1.5px solid ${revealed ? accent : "#e5e5e5"}`,
                                            background: revealed ? `${accent}12` : "#fafafa",
                                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                                            fontSize: 12,
                                            color: revealed ? accent : "#666",
                                            fontWeight: revealed ? 600 : 400,
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 8,
                                            position: "relative",
                                        }}
                                    >
                                        <span style={{
                                            width: 16, height: 16, borderRadius: 4,
                                            border: `1.5px solid ${revealed ? accent : "#ddd"}`,
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            fontSize: 10, fontWeight: 700,
                                            color: revealed ? accent : "#bbb",
                                            background: revealed ? accent + "15" : "transparent",
                                            flexShrink: 0,
                                        }}>
                                            {String.fromCharCode(65 + oi)}
                                        </span>
                                        {opt}
                                        {revealed && (
                                            <motion.span
                                                initial={{ scale: 0, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                transition={{ delay: 0.3 + qi * 0.2, type: "spring", stiffness: 300 }}
                                                style={{ marginLeft: "auto" }}
                                            >
                                                <Sparkles size={13} color={accent} />
                                            </motion.span>
                                        )}
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

const browserStyles: Record<string, React.CSSProperties> = {
    wrapper: {
        borderRadius: 14,
        overflow: "hidden",
        background: "#fff",
        border: "1px solid #e0e0e0",
        boxShadow: "0 20px 60px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.02) inset",
    },
    chrome: {
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "10px 14px",
        background: "#f4f4f4",
        borderBottom: "1px solid #e5e5e5",
    },
    urlBar: {
        flex: 1,
        display: "flex",
        alignItems: "center",
        gap: 8,
        background: "#fff",
        borderRadius: 8,
        padding: "6px 12px",
        border: "1px solid #e5e5e5",
    },
    extensionIcon: {
        width: 28,
        height: 28,
        borderRadius: 6,
        background: "#fff",
        border: "1px solid #e5e5e5",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    tabBar: {
        display: "flex",
        background: "#f4f4f4",
        borderBottom: "1px solid #e5e5e5",
        paddingLeft: 14,
    },
    tab: {
        padding: "8px 18px",
        borderRadius: "8px 8px 0 0",
    },
    body: {
        padding: "20px 22px",
        minHeight: 220,
        position: "relative" as const,
    },
    scanOverlay: {
        position: "absolute" as const,
        inset: 0,
        background: "rgba(99,102,241,0.03)",
        zIndex: 5,
        borderRadius: 0,
        overflow: "hidden" as const,
    },
};

const browserFunctions = {
    scanLine: (accent: string): React.CSSProperties => ({
        position: "absolute" as const,
        left: 0,
        width: "100%",
        height: 3,
        background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
        boxShadow: `0 0 20px ${accent}40`,
    }),
    scanBadge: (accent: string): React.CSSProperties => ({
        position: "absolute" as const,
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "10px 20px",
        borderRadius: 10,
        background: "#fff",
        border: `1.5px solid ${accent}40`,
        boxShadow: `0 8px 32px ${accent}20`,
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: 12,
        fontWeight: 600,
        color: accent,
    }),
};

/* ═══════════════════════════════════════════════════════════════════
   PROJECT CARD 
   ═══════════════════════════════════════════════════════════════════ */

function ProjectCard({ project, index }: { project: Project; index: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-120px" });
    const [hovered, setHovered] = useState(false);

    const S: React.CSSProperties = { fontFamily: "'Plus Jakarta Sans', sans-serif" };

    return (
        <motion.article
            ref={ref}
            id={`project-${project.id}`}
            initial={{ opacity: 0, y: 80 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                display: "grid",
                gridTemplateColumns: index % 2 === 0 ? "1fr 1fr" : "1fr 1fr",
                gap: 0,
                background: "#fff",
                borderRadius: 20,
                border: "1.5px solid #E8E6E0",
                overflow: "hidden",
                transition: "border-color 0.4s, box-shadow 0.4s",
                borderColor: hovered ? project.accentBorder : "#E8E6E0",
                boxShadow: hovered
                    ? `0 30px 80px ${project.accent}15, 0 0 0 1px ${project.accentBorder}`
                    : "0 4px 24px rgba(0,0,0,0.04)",
            }}
        >
            {/* ── LEFT: Info ── */}
            <div
                style={{
                    padding: "44px 44px 40px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 24,
                    order: index % 2 === 0 ? 0 : 1,
                }}
            >
                {/* Badge + icon */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <motion.div
                            animate={hovered ? { rotate: [0, -10, 10, 0], scale: [1, 1.15, 1] } : {}}
                            transition={{ duration: 0.5 }}
                            style={{
                                width: 44,
                                height: 44,
                                borderRadius: 12,
                                background: project.accentLight,
                                border: `1.5px solid ${project.accentBorder}`,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: project.accent,
                            }}
                        >
                            {project.icon}
                        </motion.div>
                        <div>
                            <div style={{ ...S, fontWeight: 800, fontSize: 22, color: "#0E0E0E", letterSpacing: -0.5 }}>
                                {project.title}
                            </div>
                        </div>
                    </div>
                    <span
                        style={{
                            ...S,
                            fontSize: 9,
                            fontWeight: 700,
                            letterSpacing: 2,
                            padding: "5px 12px",
                            borderRadius: 999,
                            background: project.accentLight,
                            color: project.accent,
                            border: `1px solid ${project.accentBorder}`,
                            textTransform: "uppercase",
                        }}
                    >
                        {project.badge}
                    </span>
                </div>

                {/* Subtitle */}
                <p style={{ ...S, fontSize: 14, color: "#777", lineHeight: 1.5, margin: "-8px 0 0" }}>
                    {project.subtitle}
                </p>

                {/* Tech stack */}
                <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
                    {project.stack.map((tech) => (
                        <motion.span
                            key={tech}
                            whileHover={{ scale: 1.08, y: -2 }}
                            style={{
                                ...S,
                                fontSize: 11,
                                fontWeight: 600,
                                padding: "5px 12px",
                                borderRadius: 8,
                                background: "#0E0E0E",
                                color: "#fff",
                                letterSpacing: 0.5,
                                cursor: "default",
                            }}
                        >
                            {tech}
                        </motion.span>
                    ))}
                </div>

                {/* Bullets */}
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    {project.bullets.map((bullet, bi) => (
                        <motion.div
                            key={bi}
                            initial={{ opacity: 0, x: -20 }}
                            animate={inView ? { opacity: 1, x: 0 } : {}}
                            transition={{ delay: 0.4 + bi * 0.12, duration: 0.5 }}
                            style={{ display: "flex", gap: 12, alignItems: "flex-start" }}
                        >
                            <div
                                style={{
                                    width: 28,
                                    height: 28,
                                    borderRadius: 8,
                                    background: project.accentLight,
                                    border: `1px solid ${project.accentBorder}`,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: project.accent,
                                    flexShrink: 0,
                                    marginTop: 1,
                                }}
                            >
                                {bullet.icon}
                            </div>
                            <p style={{ ...S, fontSize: 13, lineHeight: 1.65, color: "#555", margin: 0 }}>
                                {bullet.text}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Stats */}
                <div
                    style={{
                        display: "flex",
                        gap: 0,
                        borderRadius: 12,
                        border: "1.5px solid #E8E6E0",
                        overflow: "hidden",
                        marginTop: "auto",
                    }}
                >
                    {project.stats.map((stat, si) => (
                        <motion.div
                            key={si}
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.6 + si * 0.1, duration: 0.5 }}
                            style={{
                                flex: 1,
                                textAlign: "center",
                                padding: "16px 10px",
                                borderRight: si < project.stats.length - 1 ? "1px solid #E8E6E0" : "none",
                            }}
                        >
                            <div style={{ ...S, fontWeight: 800, fontSize: 22, color: project.accent, letterSpacing: -0.5 }}>
                                {stat.value}
                            </div>
                            <div style={{ ...S, fontSize: 10, color: "#999", letterSpacing: 1.5, textTransform: "uppercase", marginTop: 2 }}>
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Link */}
                <motion.a
                    href={project.github}
                    whileHover={{ gap: 14 }}
                    style={{
                        ...S,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 8,
                        fontSize: 13,
                        fontWeight: 600,
                        color: project.accent,
                        textDecoration: "none",
                        cursor: "pointer",
                        transition: "gap 0.3s",
                    }}
                >
                    <GitBranch size={14} />
                    View on GitHub
                    <ArrowRight size={14} />
                </motion.a>
            </div>

            {/* ── RIGHT: Interactive Demo ── */}
            <div
                style={{
                    padding: "44px 44px 40px",
                    background: project.id === "ashos" ? "#0a0a0a" : "#f9f9f9",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    position: "relative",
                    overflow: "hidden",
                    order: index % 2 === 0 ? 1 : 0,
                }}
            >
                {/* Background pattern */}
                {project.id === "ashos" && (
                    <div
                        style={{
                            position: "absolute",
                            inset: 0,
                            backgroundImage: `radial-gradient(${project.accent}10 1px, transparent 1px)`,
                            backgroundSize: "20px 20px",
                            opacity: 0.5,
                        }}
                    />
                )}
                {project.id === "quiz-helper" && (
                    <div
                        style={{
                            position: "absolute",
                            inset: 0,
                            backgroundImage: `linear-gradient(${project.accent}06 1px, transparent 1px), linear-gradient(90deg, ${project.accent}06 1px, transparent 1px)`,
                            backgroundSize: "40px 40px",
                        }}
                    />
                )}

                <div style={{ position: "relative", zIndex: 1 }}>
                    {project.id === "ashos" && project.terminal && (
                        <TerminalDemo lines={project.terminal.lines} accent={project.accent} />
                    )}
                    {project.id === "quiz-helper" && project.browser && (
                        <BrowserDemo browser={project.browser} accent={project.accent} />
                    )}
                </div>

                {/* Floating accent */}
                <motion.div
                    animate={{
                        y: [0, -8, 0],
                        scale: [1, 1.05, 1],
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    style={{
                        position: "absolute",
                        bottom: 20,
                        right: 20,
                        width: 60,
                        height: 60,
                        borderRadius: "50%",
                        background: `radial-gradient(circle, ${project.accent}20, transparent)`,
                        filter: "blur(10px)",
                    }}
                />
            </div>
        </motion.article>
    );
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN SECTION
   ═══════════════════════════════════════════════════════════════════ */

export default function ProjectsSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const headerInView = useInView(headerRef, { once: true, margin: "-80px" });

    const S: React.CSSProperties = { fontFamily: "'Plus Jakarta Sans', sans-serif" };

    return (
        <section
            ref={sectionRef}
            id="projects"
            aria-label="Featured Projects"
            style={{
                background: "#FAFAF8",
                padding: "60px 0 80px",
                overflow: "hidden",
                position: "relative",
            }}
        >
            {/* Aesthetic framing lines */}
            <div className="absolute inset-y-0 left-4 md:left-10 w-px bg-neutral-200 z-20 pointer-events-none" />
            <div className="absolute inset-y-0 right-4 md:right-10 w-px bg-neutral-200 z-20 pointer-events-none" />

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&family=Roboto+Mono:wght@400;700&display=swap');
                
                @keyframes orbit-float {
                    0%, 100% { transform: translateY(0) rotate(0deg); }
                    50% { transform: translateY(-15px) rotate(3deg); }
                }

                @keyframes glow-pulse {
                    0%, 100% { opacity: 0.3; }
                    50% { opacity: 0.6; }
                }

                .project-card-wrapper {
                    transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
                }
                .project-card-wrapper:hover {
                    transform: translateY(-6px);
                }

                @media (max-width: 900px) {
                    .project-card-grid {
                        grid-template-columns: 1fr !important;
                    }
                    .project-card-wrapper article {
                        grid-template-columns: 1fr !important;
                    }
                    .project-card-wrapper article > div:first-child,
                    .project-card-wrapper article > div:last-child {
                        order: 0 !important;
                    }
                }
            `}</style>

            {/* ── SECTION HEADER ── */}
            <div
                ref={headerRef}
                style={{
                    maxWidth: 1200,
                    margin: "0 auto",
                    padding: "0 48px",
                    marginBottom: 72,
                }}
            >
                {/* Top label */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={headerInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        marginBottom: 20,
                    }}
                >
                    <div
                        style={{
                            width: 32,
                            height: 2,
                            background: "#0E0E0E",
                            borderRadius: 2,
                        }}
                    />
                    <span
                        style={{
                            ...S,
                            fontSize: 11,
                            fontWeight: 700,
                            letterSpacing: 3,
                            textTransform: "uppercase",
                            color: "#999",
                        }}
                    >
                        Featured Projects
                    </span>
                </motion.div>

                {/* Main heading */}
                <h2
                    style={{
                        ...S,
                        fontWeight: 800,
                        fontSize: "clamp(36px, 5vw, 56px)",
                        lineHeight: 1.1,
                        letterSpacing: -2,
                        color: "#0E0E0E",
                        margin: "0 0 16px",
                    }}
                >
                    <RevealText>Things I&apos;ve built</RevealText>
                    <br />
                    <span style={{ fontWeight: 300, fontStyle: "italic", color: "#888" }}>
                        <RevealText delay={0.3}>that actually work.</RevealText>
                    </span>
                </h2>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={headerInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    style={{
                        ...S,
                        fontSize: 15,
                        lineHeight: 1.7,
                        color: "#777",
                        maxWidth: 540,
                    }}
                >
                    From CLI operating systems with full RAG pipelines to browser extensions
                    that bypass CSP — each project is engineered for real-world impact.
                </motion.p>
            </div>

            {/* ── PROJECT CARDS ── */}
            <div
                className="project-card-grid"
                style={{
                    maxWidth: 1200,
                    margin: "0 auto",
                    padding: "0 48px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 32,
                }}
            >
                {PROJECTS.map((project, i) => (
                    <div key={project.id} className="project-card-wrapper">
                        <ProjectCard project={project} index={i} />
                    </div>
                ))}
            </div>

            {/* ── BOTTOM TICKER ── */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, duration: 0.6 }}
                style={{
                    maxWidth: 1200,
                    margin: "40px auto 0",
                    padding: "0 48px",
                }}
            >
                <div
                    style={{
                        borderTop: "1px solid #E8E6E0",
                        borderBottom: "1px solid #E8E6E0",
                        padding: "18px 0",
                        overflow: "hidden",
                        maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
                        WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
                    }}
                >
                    <motion.div
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                        style={{
                            display: "flex",
                            gap: 40,
                            whiteSpace: "nowrap",
                            width: "max-content",
                        }}
                    >
                        {[...Array(2)].map((_, r) => (
                            <div key={r} style={{ display: "flex", gap: 40 }}>
                                {[
                                    "Go", "RAG Pipeline", "SQLite-vec", "OpenAI Embeddings", "•",
                                    "Chrome Extension", "Manifest V3", "Claude API", "MutationObserver", "•",
                                    "Composition Root DI", "Cosine Similarity", "Shadow DOM", "•",
                                    "Bubble Tea TUI", "CSS Injection", "Question Batching", "•",
                                ].map((item, j) => (
                                    <span
                                        key={`${r}-${j}`}
                                        style={{
                                            ...S,
                                            fontSize: 10,
                                            letterSpacing: 2.5,
                                            textTransform: "uppercase",
                                            color: item === "•" ? "#ddd" : j % 3 === 0 ? "#0E0E0E" : "#bbb",
                                            fontWeight: j % 3 === 0 ? 700 : 400,
                                        }}
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>
                        ))}
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}
