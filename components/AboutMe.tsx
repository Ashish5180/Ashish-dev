"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import {
    Zap, Code2, Server, Database, GitBranch, Coffee,
    Bug, Lock, Cloud, Layers, Activity,
    ArrowRight, AlertCircle,
    RefreshCw, Terminal, Package, Wifi, Star,
    ChevronRight, PartyPopper, CalendarDays, BarChart3, MessageSquare
} from "lucide-react";
import BookingCalendar from "./BookingCalendar";
import CommitHeatmap from "./CommitHeatmap";

// ─── Types ────────────────────────────────────────────────────────────────────
type Mood = "serious" | "funny" | "flex" | "chaotic";

// ─── Data ─────────────────────────────────────────────────────────────────────
const MOODS: Record<Mood, { label: string; icon: React.ReactNode; texts: string[] }> = {
    serious: {
        label: "Serious",
        icon: <Terminal size={13} />,
        texts: [
            "I specialize in Next.js, TypeScript, Node.js, and PostgreSQL. I architect systems that handle scale gracefully — and fail even more gracefully.",
            "4 years building products from 0→1 across fintech, SaaS, and consumer apps. I care deeply about performance, DX, and clean APIs.",
            "I think in systems. Every feature I write considers the edge case, the failure mode, and the person on-call at 3am.",
        ],
    },
    funny: {
        label: "Honest",
        icon: <AlertCircle size={13} />,
        texts: [
            "I have imposter syndrome and a Stack Overflow tab open simultaneously — but somehow things keep shipping.",
            "My debugging process: stare at code for 2 hours, add one console.log, find bug instantly. Rinse. Repeat. Invoice client.",
            "My git history is either 'feat: major refactor' or 'fix: why was that even there'. No in-between. Ever.",
        ],
    },
    flex: {
        label: "Flexing",
        icon: <Zap size={13} />,
        texts: [
            "Reduced API response time by 73% on a high-traffic endpoint. The backend team bought me lunch.",
            "Shipped a feature in 2 days estimated at 2 weeks. I don't mention this in standups.",
            "Built a real-time dashboard handling 50k+ concurrent users. Still hasn't crashed. I check every morning.",
        ],
    },
    chaotic: {
        label: "Chaotic",
        icon: <RefreshCw size={13} />,
        texts: [
            "I once fixed a production bug by renaming a variable. I don't know why it worked. Nobody does. Moving on.",
            "Wrote 400 lines of elegant TypeScript, then replaced it with a 3-line regex. My soul left my body.",
            "There are exactly 2 types of code: code I wrote 6 months ago (garbage), and code I wrote today (perfect, obviously).",
        ],
    },
};

const SKILLS = [
    { name: "Next.js", icon: <Layers size={13} />, bg: "#0E0E0E", fg: "#fff" },
    { name: "TypeScript", icon: <Code2 size={13} />, bg: "#3178c6", fg: "#fff" },
    { name: "React", icon: <Activity size={13} />, bg: "#20232a", fg: "#61dafb" },
    { name: "Node.js", icon: <Server size={13} />, bg: "#2d5a27", fg: "#a3e635" },
    { name: "PostgreSQL", icon: <Database size={13} />, bg: "#336791", fg: "#fff" },
    { name: "Redis", icon: <Zap size={13} />, bg: "#8b1a1a", fg: "#fca5a5" },
    { name: "Docker", icon: <Package size={13} />, bg: "#1a3a5c", fg: "#7dd3fc" },
    { name: "GraphQL", icon: <GitBranch size={13} />, bg: "#5a0033", fg: "#f9a8d4" },
    { name: "Tailwind", icon: <Wifi size={13} />, bg: "#0c4a6e", fg: "#7dd3fc" },
    { name: "AWS", icon: <Cloud size={13} />, bg: "#7c2d12", fg: "#fdba74" },
];

const HEADLINES = [
    ["I build things", "that don't explode."],
    ["Senior Engineer.", "Junior at sleeping."],
    ["Full-stack dev.", "Half-stack human."],
    ["I write code.", "Code writes me back."],
    ["404:", "Free time not found."],
    ["Shipping features.", "Not excuses."],
];

const FACTS = [
    { dark: true, icon: <Zap size={18} />, title: "Wrote a function so clean", sub: "my senior dev just said '...ok.'" },
    { dark: false, icon: <Coffee size={18} />, title: "Powered by coffee.", sub: "Send help. Or more coffee." },
    { dark: false, icon: <Bug size={18} />, title: "I don't have bugs.", sub: "I have undocumented features." },
];

const COFFEE_MSGS = [
    "Click the bar to add coffee",
    "You are… functioning.",
    "You are awake! Progress!",
    "Entering dangerous territory",
    "MAXIMUM OVERDRIVE",
];

const TICKER_ITEMS = [
    "Next.js", "TypeScript", "React", "Node.js",
    "Built with love, shipped with caffeine",
    "PostgreSQL", "Redis", "Docker",
    "Available to hire",
    "GraphQL", "AWS", "Tailwind",
    "Zero downtime or your money back",
];

// ─── Confetti ─────────────────────────────────────────────────────────────────
interface Particle {
    x: number; y: number; vx: number; vy: number;
    w: number; h: number; color: string;
    rot: number; rotV: number; life: number;
}

function useConfetti() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particles = useRef<Particle[]>([]);
    const rafRef = useRef<number>(0);

    const tick = useCallback(function tick() {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.current = particles.current.filter((p) => {
            p.x += p.vx; p.y += p.vy; p.vy += 0.09;
            p.rot += p.rotV; p.life -= 0.009;
            if (p.life <= 0) return false;
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate((p.rot * Math.PI) / 180);
            ctx.globalAlpha = p.life;
            ctx.fillStyle = p.color;
            ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
            ctx.restore();
            return true;
        });

        if (particles.current.length > 0) {
            rafRef.current = requestAnimationFrame(tick);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }, []);

    const boom = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const colors = ["#0E0E0E", "#888", "#FAFAF8", "#333", "#555", "#aaa"];
        for (let i = 0; i < 90; i++) {
            particles.current.push({
                x: Math.random() * canvas.width,
                y: -10,
                vx: (Math.random() - 0.5) * 7,
                vy: Math.random() * 4 + 2,
                w: Math.random() * 10 + 4,
                h: Math.random() * 5 + 3,
                color: colors[Math.floor(Math.random() * colors.length)],
                rot: Math.random() * 360,
                rotV: (Math.random() - 0.5) * 9,
                life: 1,
            });
        }
        cancelAnimationFrame(rafRef.current);
        tick();
    }, [tick]);

    return { canvasRef, boom };
}

// ─── Floaty +N ────────────────────────────────────────────────────────────────
interface FloatyItem { id: number; x: number; y: number; label: string }

function Floaties({ items }: { items: FloatyItem[] }) {
    return (
        <>
            {items.map((f) => (
                <motion.div
                    key={f.id}
                    initial={{ opacity: 1, y: 0 }}
                    animate={{ opacity: 0, y: -48 }}
                    transition={{ duration: 0.75, ease: "easeOut" }}
                    style={{
                        position: "fixed", left: f.x - 10, top: f.y - 10,
                        pointerEvents: "none", zIndex: 9997,
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontWeight: 700, fontSize: 13, color: "#0E0E0E",
                    }}
                >
                    {f.label}
                </motion.div>
            ))}
        </>
    );
}

// ─── Draggable Card ───────────────────────────────────────────────────────────
function DragCard({
    dark, icon, title, sub, initX, initY, initRot,
}: {
    dark: boolean; icon: React.ReactNode; title: string; sub: string;
    initX: number; initY: number; initRot: number;
}) {
    const x = useMotionValue(initX);
    const y = useMotionValue(initY);
    return (
        <motion.div
            drag
            dragMomentum={false}
            style={{
                x, y,
                position: "absolute", width: 190,
                padding: "18px 20px", borderRadius: 14,
                background: dark ? "#0E0E0E" : "#fff",
                border: `1.5px solid ${dark ? "#0E0E0E" : "#E8E6E0"}`,
                boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
                cursor: "grab",
                userSelect: "none",
                zIndex: 1,
                rotate: initRot,
            }}
            whileDrag={{ scale: 1.05, rotate: -2, boxShadow: "0 16px 48px rgba(0,0,0,0.14)", zIndex: 20, cursor: "grabbing" }}
            whileHover={{ y: y.get() - 4 }}
        >
            <div style={{ color: dark ? "#fff" : "#0E0E0E", marginBottom: 10 }}>{icon}</div>
            <div style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600,
                fontSize: 13, lineHeight: 1.45,
                color: dark ? "#fff" : "#0E0E0E",
            }}>{title}</div>
            <div style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 11,
                color: dark ? "#555" : "#999", marginTop: 4, letterSpacing: "0.5px",
                textTransform: "uppercase",
            }}>{sub}</div>
        </motion.div>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function AboutMe() {
    const { canvasRef, boom } = useConfetti();

    // live clock
    const [clock, setClock] = useState("");
    useEffect(() => {
        const tick = () => setClock(
            new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" })
        );
        tick(); const id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, []);

    // mood
    const [mood, setMood] = useState<Mood>("serious");
    const [moodIdx, setMoodIdx] = useState(0);
    const [moodVisible, setMoodVisible] = useState(true);

    const changeMood = (m: Mood) => {
        if (m === mood) {
            setMoodVisible(false);
            setTimeout(() => { setMoodIdx((i) => (i + 1) % MOODS[m].texts.length); setMoodVisible(true); }, 160);
        } else {
            setMoodVisible(false);
            setTimeout(() => { setMood(m); setMoodIdx(0); setMoodVisible(true); }, 160);
        }
    };

    // headline scramble
    const [hlIdx, setHlIdx] = useState(0);
    const [hlVisible, setHlVisible] = useState(true);
    const scrambleHeadline = () => {
        setHlVisible(false);
        setTimeout(() => { setHlIdx((i) => (i + 1) % HEADLINES.length); setHlVisible(true); }, 150);
    };

    // skill clicker
    const [skillCounts, setSkillCounts] = useState<Record<string, number>>({});
    const [totalClicks, setTotalClicks] = useState(0);
    const [floaties, setFloaties] = useState<FloatyItem[]>([]);
    const floatyId = useRef(0);

    const clickSkill = (name: string, e: React.MouseEvent) => {
        const newCounts = { ...skillCounts, [name]: (skillCounts[name] || 0) + 1 };
        const newTotal = totalClicks + 1;
        setSkillCounts(newCounts);
        setTotalClicks(newTotal);
        const id = floatyId.current++;
        setFloaties((f) => [...f, { id, x: e.clientX, y: e.clientY, label: `+${newCounts[name]}` }]);
        setTimeout(() => setFloaties((f) => f.filter((x) => x.id !== id)), 800);
        if (newTotal === 20) boom();
    };

    const clickScoreMsg = () => {
        const msgs = ["0 clicks — try clicking a skill", "keep going...", "you love this.", "no stopping now.", "addiction unlocked.", "send help.", "ok now you're hooked."];
        return `${totalClicks} clicks — ${msgs[Math.min(Math.floor(totalClicks / 5), msgs.length - 1)]}`;
    };

    // coffee
    const [coffee, setCoffee] = useState(0);
    const handleCoffeeClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const pct = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
        const cups = Math.round(pct * 4);
        setCoffee(cups);
    };

    // secret
    const [secretOpen, setSecretOpen] = useState(false);

    const S: React.CSSProperties = { fontFamily: "'Plus Jakarta Sans', sans-serif" };

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { background: #FAFAF8; }
        ::selection { background: #0E0E0E; color: #FAFAF8; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #F0EEE8; }
        ::-webkit-scrollbar-thumb { background: #ccc; border-radius: 3px; }
        @keyframes badge-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(14,14,14,.25); }
          50% { box-shadow: 0 0 0 7px rgba(14,14,14,0); }
        }
        @keyframes ticker-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>

            {/* Confetti canvas */}
            <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9990 }} />

            {/* Floaties */}
            <Floaties items={floaties} />

            {/* Secret overlay */}
            <AnimatePresence>
                {secretOpen && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        style={{
                            position: "fixed", inset: 0, background: "#0E0E0E",
                            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                            zIndex: 9995, gap: 16, textAlign: "center", padding: "32px",
                        }}
                    >
                        <motion.div
                            initial={{ scale: 0.5, rotate: -20 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: "spring", stiffness: 200, damping: 14 }}
                        >
                            <PartyPopper size={52} color="#fff" />
                        </motion.div>
                        <h2 style={{ ...S, fontWeight: 800, fontSize: "clamp(24px,4vw,46px)", color: "#fff", lineHeight: 1.1, letterSpacing: -1.5 }}>
                            you found it!
                        </h2>
                        <p style={{ ...S, fontSize: 15, color: "#666", maxWidth: 360, lineHeight: 1.65 }}>
                            Congrats on being nosy enough to discover the secret. I respect that energy entirely. Now hire me.
                        </p>
                        <motion.button
                            whileHover={{ background: "#1a1a1a" }}
                            onClick={() => setSecretOpen(false)}
                            style={{
                                marginTop: 12, padding: "13px 30px", borderRadius: 999,
                                border: "1.5px solid #333", background: "transparent", color: "#fff",
                                ...S, fontSize: 12, letterSpacing: 2, textTransform: "uppercase",
                                cursor: "none",
                            }}
                        >
                            ok fine, go back →
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── MAIN ── */}
            <section style={{ background: "#FAFAF8", minHeight: "100vh", display: "flex", flexDirection: "column", overflow: "hidden" }}>

                {/* ── TOP BAR ── */}
                <motion.div
                    initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        padding: "20px 48px", borderBottom: "1px solid #E8E6E0",
                        flexWrap: "wrap", gap: 12,
                    }}
                >
                    <span style={{ ...S, fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "#999" }}>
                        Version 4.0 · Still shipping · No bugs (allegedly)
                    </span>
                    <div style={{
                        display: "inline-flex", alignItems: "center", gap: 7,
                        background: "#0E0E0E", color: "#fff",
                        padding: "7px 16px", borderRadius: 999,
                        fontSize: 10, letterSpacing: 1.5, ...S,
                        animation: "badge-pulse 2s ease-in-out infinite",
                    }}>
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", flexShrink: 0 }} />
                        Available to hire
                    </div>
                    <span style={{ ...S, fontSize: 11, letterSpacing: 1.5, color: "#aaa" }}>{clock}</span>
                </motion.div>

                {/* ── STAGE ── */}
                <div style={{
                    flex: 1, display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 0,
                }}>

                    {/* ════ LEFT ════ */}
                    <div style={{
                        padding: "48px 48px 40px",
                        display: "flex", flexDirection: "column", gap: 32,
                        borderRight: "1px solid #E8E6E0",
                    }}>

                        {/* Scramble Headline */}
                        <div>
                            <motion.h1
                                onClick={scrambleHeadline}

                                animate={{ opacity: hlVisible ? 1 : 0, y: hlVisible ? 0 : 8 }}
                                transition={{ duration: 0.18 }}
                                style={{
                                    ...S, fontWeight: 800,
                                    fontSize: "clamp(32px,3.8vw,52px)",
                                    lineHeight: 1.1, letterSpacing: -2,
                                    color: "#0E0E0E", cursor: "none",
                                }}
                            >
                                {HEADLINES[hlIdx][0]}<br />
                                <span style={{ fontStyle: "italic", fontWeight: 300, color: "#666" }}>
                                    {HEADLINES[hlIdx][1]}
                                </span>
                            </motion.h1>
                            <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 8 }}>
                                <RefreshCw size={10} color="#bbb" />
                                <span style={{ ...S, fontSize: 10, color: "#bbb", letterSpacing: 1.5, textTransform: "uppercase" }}>
                                    click headline to remix
                                </span>
                            </div>
                        </div>

                        {/* Mood Switcher */}
                        <div>
                            <div style={{ ...S, fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: "#999", marginBottom: 12 }}>
                                Pick a vibe, get a fact:
                            </div>
                            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
                                {(Object.keys(MOODS) as Mood[]).map((m) => (
                                    <motion.button
                                        key={m}
                                        onClick={() => changeMood(m)}

                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        style={{
                                            display: "inline-flex", alignItems: "center", gap: 7,
                                            padding: "8px 16px", borderRadius: 999,
                                            border: `1.5px solid ${mood === m ? "#0E0E0E" : "#E8E6E0"}`,
                                            background: mood === m ? "#0E0E0E" : "transparent",
                                            color: mood === m ? "#fff" : "#888",
                                            ...S, fontSize: 12, fontWeight: 600,
                                            cursor: "none", transition: "all .2s",
                                        }}
                                    >
                                        {MOODS[m].icon} {MOODS[m].label}
                                    </motion.button>
                                ))}
                            </div>
                            <motion.p
                                animate={{ opacity: moodVisible ? 1 : 0, y: moodVisible ? 0 : 6 }}
                                transition={{ duration: 0.2 }}
                                style={{
                                    ...S, fontSize: 14, lineHeight: 1.7, color: "#444",
                                    minHeight: 70,
                                }}
                            >
                                {MOODS[mood].texts[moodIdx]}
                            </motion.p>
                        </div>

                        {/* Skill Clicker */}
                        <div style={{
                            border: "1.5px solid #E8E6E0", borderRadius: 16,
                            padding: "20px 22px",
                        }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                                <Star size={12} color="#999" />
                                <span style={{ ...S, fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: "#999" }}>
                                    Click a skill. Go on. You can&apos;t stop.
                                </span>
                            </div>
                            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                                {SKILLS.map((sk) => (
                                    <motion.button
                                        key={sk.name}
                                        onClick={(e) => clickSkill(sk.name, e)}

                                        whileHover={{ translateY: -3, scale: 1.06, boxShadow: "0 8px 20px rgba(0,0,0,.1)" }}
                                        whileTap={{ scale: 0.92 }}
                                        style={{
                                            display: "inline-flex", alignItems: "center", gap: 6,
                                            padding: "8px 13px", borderRadius: 9,
                                            background: sk.bg, color: sk.fg,
                                            border: `1.5px solid ${sk.bg}`,
                                            ...S, fontSize: 12, fontWeight: 600,
                                            cursor: "none", position: "relative",
                                        }}
                                    >
                                        {sk.icon}
                                        {sk.name}
                                        <AnimatePresence>
                                            {(skillCounts[sk.name] || 0) > 0 && (
                                                <motion.span
                                                    initial={{ scale: 0, opacity: 0 }}
                                                    animate={{ scale: 1, opacity: 1 }}
                                                    style={{
                                                        position: "absolute", top: -8, right: -8,
                                                        background: "#fff", color: "#0E0E0E",
                                                        width: 18, height: 18, borderRadius: "50%",
                                                        fontSize: 9, fontWeight: 800,
                                                        display: "flex", alignItems: "center", justifyContent: "center",
                                                        border: "1.5px solid #E8E6E0",
                                                        ...S,
                                                    }}
                                                >
                                                    {skillCounts[sk.name]}
                                                </motion.span>
                                            )}
                                        </AnimatePresence>
                                    </motion.button>
                                ))}
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 14 }}>
                                <Activity size={11} color="#bbb" />
                                <span style={{ ...S, fontSize: 11, color: "#bbb" }}>{clickScoreMsg()}</span>
                            </div>
                        </div>

                    </div>

                    {/* ════ RIGHT ════ */}
                    <div style={{
                        padding: "48px 48px 40px",
                        display: "flex", flexDirection: "column", gap: 32,
                    }}>

                        {/* Draggable Cards */}
                        <div>
                            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                                <GitBranch size={12} color="#999" />
                                <span style={{ ...S, fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: "#999" }}>
                                    Fun facts (drag them around)
                                </span>
                            </div>
                            <p style={{ ...S, fontSize: 12, color: "#bbb", marginBottom: 14 }}>
                                Seriously, drag them — it&apos;s oddly satisfying
                            </p>
                            <div style={{ position: "relative", height: 210 }}>
                                {FACTS.map((f, i) => (
                                    <DragCard
                                        key={i}
                                        dark={f.dark}
                                        icon={f.icon}
                                        title={f.title}
                                        sub={f.sub}
                                        initX={[0, 175, 55][i]}
                                        initY={[0, 22, 112][i]}
                                        initRot={[-3, 2.5, -1][i]}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Coffee Meter */}
                        <div style={{ border: "1.5px solid #E8E6E0", borderRadius: 14, padding: "18px 20px" }}>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                    <Coffee size={14} color="#0E0E0E" />
                                    <span style={{ ...S, fontWeight: 600, fontSize: 13, color: "#0E0E0E" }}>Daily productivity meter</span>
                                </div>
                                <span style={{ ...S, fontSize: 11, color: "#999" }}>{coffee} cup{coffee !== 1 ? "s" : ""}</span>
                            </div>
                            <div
                                onClick={handleCoffeeClick}

                                style={{ height: 10, background: "#E8E6E0", borderRadius: 999, overflow: "hidden", cursor: "none" }}
                            >
                                <motion.div
                                    animate={{ width: `${(coffee / 4) * 100}%` }}
                                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                                    style={{ height: "100%", background: "#0E0E0E", borderRadius: 999 }}
                                />
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
                                {["Asleep", "Functioning", "Dangerous"].map((l) => (
                                    <span key={l} style={{ ...S, fontSize: 9, color: "#bbb", letterSpacing: 1, textTransform: "uppercase" }}>{l}</span>
                                ))}
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 8 }}>
                                <Zap size={11} color="#bbb" />
                                <span style={{ ...S, fontSize: 11, color: "#bbb" }}>
                                    {COFFEE_MSGS[Math.min(coffee, COFFEE_MSGS.length - 1)]}
                                </span>
                            </div>
                        </div>

                        {/* Secret Bar */}
                        <motion.button
                            onClick={() => { setSecretOpen(true); boom(); }}

                            whileHover={{ borderColor: "#0E0E0E" }}
                            style={{
                                display: "flex", alignItems: "center", gap: 14,
                                padding: "16px 20px", borderRadius: 12,
                                border: "1.5px dashed #D8D6D0", background: "transparent",
                                cursor: "none", textAlign: "left", width: "100%",
                            }}
                        >
                            <div style={{
                                width: 36, height: 36, borderRadius: 10,
                                background: "#F0EEE8", display: "flex", alignItems: "center", justifyContent: "center",
                                flexShrink: 0,
                            }}>
                                <Lock size={16} color="#0E0E0E" />
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ ...S, fontWeight: 600, fontSize: 13, color: "#0E0E0E" }}>There&apos;s a secret here.</div>
                                <div style={{ ...S, fontSize: 11, color: "#aaa", marginTop: 2 }}>Click to find it. Or don&apos;t. Your loss.</div>
                            </div>
                            <ChevronRight size={14} color="#bbb" />
                        </motion.button>

                        {/* Hire Row */}
                        <div style={{ display: "flex", gap: 10 }}>
                            <motion.a
                                href="#"

                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.97 }}
                                style={{
                                    flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                                    background: "#0E0E0E", color: "#FAFAF8",
                                    ...S, fontWeight: 700, fontSize: 14,
                                    padding: "17px 24px", borderRadius: 12,
                                    textDecoration: "none", cursor: "none",
                                    border: "2px solid #0E0E0E",
                                    transition: "background .25s, color .25s",
                                }}
                            >
                                Let&apos;s actually build something
                                <motion.span
                                    animate={{ x: [0, 5, 0] }}
                                    transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                                    style={{ display: "inline-block" }}
                                >
                                    <ArrowRight size={16} />
                                </motion.span>
                            </motion.a>
                            <motion.button
                                onClick={boom}

                                whileHover={{ rotate: 20, scale: 1.1, background: "#E8E6E0" }}
                                whileTap={{ scale: 0.9 }}
                                style={{
                                    padding: "17px 18px", borderRadius: 12,
                                    border: "1.5px solid #E8E6E0", background: "transparent",
                                    cursor: "none", display: "flex", alignItems: "center", justifyContent: "center",
                                    transition: "background .2s",
                                }}
                            >
                                <PartyPopper size={20} color="#0E0E0E" />
                            </motion.button>
                        </div>

                    </div>
                </div>

                {/* ── THE CONNECT LOUNGE ── */}
                <div style={{
                    padding: "80px 48px",
                    borderTop: "1px solid #E8E6E0",
                    background: "#F9F9F8",
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                    gap: "48px",
                    alignItems: "start"
                }}>
                    {/* Left: Branding & Intent */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "24px", maxWidth: "450px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <div style={{ width: "42px", height: "42px", borderRadius: "14px", background: "#0E0E0E", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <CalendarDays size={20} color="#fff" />
                            </div>
                            <div>
                                <h2 style={{ ...S, fontWeight: 800, fontSize: "32px", color: "#0E0E0E", letterSpacing: "-1px" }}>Let&apos;s talk shop.</h2>
                                <p style={{ ...S, fontSize: "14px", color: "#666", fontWeight: 500 }}>No boring meetings, just high-bandwidth talk.</p>
                            </div>
                        </div>
                        
                        <p style={{ ...S, fontSize: "16px", lineHeight: "1.7", color: "#444" }}>
                            I&apos;m always looking for ambitious projects, engineering deep-dives, or just chatting about the future of the web. 
                            If you have a clear vision and need help shipping it, let&apos;s connect.
                        </p>

                        <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "12px" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "16px", borderRadius: "18px", border: "1px solid #E8E6E0", background: "#fff" }}>
                                <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "#F0EEE8", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <BarChart3 size={16} color="#0E0E0E" />
                                </div>
                                <div>
                                    <h4 style={{ ...S, fontSize: "13px", fontWeight: 700, color: "#0E0E0E" }}>High Bandwidth</h4>
                                    <p style={{ ...S, fontSize: "11px", color: "#999" }}>Direct communication, no fluff.</p>
                                </div>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "16px", borderRadius: "18px", border: "1px solid #E8E6E0", background: "#fff" }}>
                                <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "#F0EEE8", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <MessageSquare size={16} color="#0E0E0E" />
                                </div>
                                <div>
                                    <h4 style={{ ...S, fontSize: "13px", fontWeight: 700, color: "#0E0E0E" }}>Technical Review</h4>
                                    <p style={{ ...S, fontSize: "11px", color: "#999" }}>Deep dive into your architecture.</p>
                                </div>
                            </div>
                        </div>

                        <div style={{ marginTop: "12px", display: "flex", gap: "12px" }}>
                             <motion.a
                                href="mailto:hello@example.com"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                style={{
                                    display: "flex", alignItems: "center", gap: "10px", padding: "14px 24px", borderRadius: "14px", background: "#0E0E0E", color: "#fff", ...S, fontWeight: 700, fontSize: "13px", textDecoration: "none"
                                }}
                            >
                                Send an Email
                                <ArrowRight size={14} />
                            </motion.a>
                            <motion.a
                                href="https://twitter.com"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                style={{
                                    display: "flex", alignItems: "center", gap: "10px", padding: "14px 24px", borderRadius: "14px", border: "1.5px solid #0E0E0E", color: "#0E0E0E", ...S, fontWeight: 700, fontSize: "13px", textDecoration: "none"
                                }}
                            >
                                Discord / X
                            </motion.a>
                        </div>
                    </div>

                    {/* Middle: Activity Stat */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                        <CommitHeatmap />
                        
                        <div style={{ padding: "24px", borderRadius: "24px", border: "1.5px solid #E8E6E0", background: "#fff", ...S }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                                <motion.div 
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 10px #22c55e" }} 
                                />
                                <span style={{ fontSize: "11px", fontWeight: 700, color: "#0E0E0E", textTransform: "uppercase", letterSpacing: "1px" }}>Current Project Status</span>
                            </div>
                            <h4 style={{ fontSize: "18px", fontWeight: 800, color: "#0E0E0E", marginBottom: "8px" }}>Building AI Agents</h4>
                            <p style={{ fontSize: "13px", color: "#666", lineHeight: "1.6" }}>
                                Experimenting with autonomous coding agents and LLM-integrated developer tools. (A bit meta, right?).
                                Currently focused on multi-agent collaboration.
                            </p>
                        </div>
                    </div>

                    {/* Right: Booking */}
                    <div>
                        <BookingCalendar />
                    </div>
                </div>
                <div style={{
                    borderTop: "1px solid #E8E6E0",
                    padding: "13px 0",
                    overflow: "hidden",
                    maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
                    WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
                }}>
                    <div style={{
                        display: "flex", gap: 40, whiteSpace: "nowrap",
                        animation: "ticker-scroll 18s linear infinite",
                    }}>
                        {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
                            <span key={i} style={{
                                ...S, fontSize: 10, letterSpacing: 2.5, textTransform: "uppercase",
                                color: i % 4 === 0 ? "#0E0E0E" : "#bbb",
                                fontWeight: i % 4 === 0 ? 700 : 400,
                                display: "inline-flex", alignItems: "center", gap: 40,
                            }}>
                                {item}
                                <span style={{ opacity: 0.25, marginLeft: 0 }}>·</span>
                            </span>
                        ))}
                    </div>
                </div>

            </section>
        </>
    );
}