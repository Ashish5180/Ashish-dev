"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";

/* ─────────────────────────────────────────
   HeroSection2 — Premium Light Mobile Hero
   Editorial magazine-style layout with 3 images
   in a creative asymmetric mosaic grid
───────────────────────────────────────── */



const STATS = [
    { num: "2+", label: "Years Experience" },
    { num: "12+", label: "Products Shipped" },
    { num: "8", label: "Core Technologies" },
] as const;

const SOCIAL_LINKS = {
    LinkedIn: "https://www.linkedin.com/in/ashishyadav001/",
    GitHub: "https://github.com/Ashish5180",
    Twitter: "https://x.com/Developer_X01",
} as const;

/* ── Live IST clock ── */
function useClock() {
    const [time, setTime] = useState("--:--:--");
    useEffect(() => {
        const tick = () => {
            const now = new Date(
                new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
            );
            const h = String(now.getHours()).padStart(2, "0");
            const m = String(now.getMinutes()).padStart(2, "0");
            const s = String(now.getSeconds()).padStart(2, "0");
            setTime(`${h}:${m}:${s}`);
        };
        tick();
        const id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, []);
    return time;
}

/* ── Animated counter ── */
function AnimatedCounter({ target }: { target: string }) {
    const numPart = parseInt(target.replace(/\D/g, "")) || 0;
    const textSuffix = target.replace(/\d/g, "");
    const [count, setCount] = useState(0);
    const [started, setStarted] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setStarted(true), 800);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (!started) return;
        let frame: number;
        const duration = 2000;
        const start = performance.now();
        const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(eased * numPart));
            if (progress < 1) frame = requestAnimationFrame(animate);
        };
        frame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(frame);
    }, [numPart, started]);

    return <>{count}{textSuffix}</>;
}

export default function HeroSection2() {
    const time = useClock();
    const [isLoaded, setIsLoaded] = useState(false);
    const stylesInjected = useRef(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoaded(true), 0);
        return () => clearTimeout(timer);
    }, []);

    /* ── Inject keyframes ── */
    useEffect(() => {
        if (stylesInjected.current) return;
        stylesInjected.current = true;
        const style = document.createElement("style");
        style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@700;900&family=Inter:wght@300;400;500;600&family=Outfit:wght@700;900&display=swap');

      @keyframes h2m-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
      @keyframes h2m-pulse { 0%,100%{opacity:.5} 50%{opacity:1} }

      .h2m-cta-solid {
        position: relative;
        overflow: hidden;
        transition: all .4s cubic-bezier(.4,0,.2,1);
      }
      .h2m-cta-solid:hover {
        transform: translateY(-3px);
        background: #000 !important;
        box-shadow: 0 12px 40px rgba(0,0,0,0.2);
      }
      .h2m-cta-outline {
        transition: all .4s cubic-bezier(.4,0,.2,1);
      }
      .h2m-cta-outline:hover {
        border-color: #000 !important;
        color: #000 !important;
        transform: translateY(-3px);
      }
      .h2m-social:hover {
        color: #000 !important;
        transform: translateY(-2px);
      }
      .h2m-social {
        transition: all .3s ease;
      }
      .h2m-stat-card {
        transition: all .35s cubic-bezier(.4,0,.2,1);
      }
      .h2m-stat-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 12px 36px rgba(0,0,0,.08);
      }
      .h2m-thumb {
        transition: all .35s cubic-bezier(.4,0,.2,1);
      }
      .h2m-thumb:hover {
        transform: scale(1.06);
        box-shadow: 0 8px 24px rgba(0,0,0,.12);
      }
    `;
        document.head.appendChild(style);
    }, []);

    const fontHeader = "'Cinzel', serif";
    const fontBody = "'Inter', sans-serif";
    const fontUI = "'Outfit', sans-serif";

    /* ── Motion config ── */
    const stagger: Variants = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
    };
    const fadeUp: Variants = {
        hidden: { opacity: 0, y: 24 },
        show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as const } },
    };
    const fadeScale: Variants = {
        hidden: { opacity: 0, scale: 0.94 },
        show: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
    };

    return (
        <section
            style={{
                fontFamily: fontUI,
                width: "100%",
                minHeight: "100vh",
                background: "#ffffff",
                position: "relative",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
            }}
        >
            {/* ── Subtle background texture ── */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.02) 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                    pointerEvents: "none",
                }}
            />

            {/* ═══════════════════════════════════════
          TOP BAR
      ═══════════════════════════════════════ */}
            <motion.div
                initial={{ opacity: 0, y: -16 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.05 }}
                style={{
                    position: "relative",
                    zIndex: 20,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "18px 22px 14px",
                }}
            >
                {/* Logo */}
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div
                        style={{
                            width: 28,
                            height: 28,
                            borderRadius: 6,
                            background: "#1a1a1a",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <span style={{ fontSize: 11, fontWeight: 900, color: "#fff", letterSpacing: ".04em" }}>AY</span>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <span style={{ fontSize: 10, fontWeight: 700, color: "#1a1a1a", letterSpacing: ".12em", textTransform: "uppercase", lineHeight: 1 }}>
                            Ashish
                        </span>
                        <span style={{ fontSize: 8, fontWeight: 500, color: "#999", letterSpacing: ".1em", textTransform: "uppercase", lineHeight: 1.4 }}>
                            Systems Engineer & Backend Architect
                        </span>
                    </div>
                </div>

                {/* Right side — availability + clock */}
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                        <div style={{
                            width: 5, height: 5, borderRadius: "50%", background: "#1a1a1a",
                            animation: "h2m-pulse 2s ease-in-out infinite",
                        }} />
                        <span style={{ fontSize: 8, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "#888" }}>
                            Status: Online
                        </span>
                    </div>
                    <div style={{ width: 1, height: 14, background: "#e5e5e5" }} />
                    <span style={{ fontSize: 11, fontWeight: 600, color: "#1a1a1a", fontVariantNumeric: "tabular-nums", letterSpacing: ".04em" }}>
                        {time}
                    </span>
                </div>
            </motion.div>

            {/* Divider line */}
            <motion.div
                initial={{ scaleX: 0 }}
                animate={isLoaded ? { scaleX: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
                style={{
                    height: 1,
                    background: "linear-gradient(90deg, transparent, rgba(0,0,0,.06), transparent)",
                    transformOrigin: "left",
                    margin: "0 22px",
                }}
            />

            {/* ═══════════════════════════════════════
          MAIN CONTENT
      ═══════════════════════════════════════ */}
            <motion.div
                variants={stagger}
                initial="hidden"
                animate={isLoaded ? "show" : "hidden"}
                style={{
                    position: "relative",
                    zIndex: 10,
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    padding: "24px 22px 20px",
                    gap: 22,
                }}
            >
                {/* ── Title label ── */}
                <motion.div variants={fadeUp} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ width: 24, height: 1.5, background: "#1a1a1a", display: "inline-block", borderRadius: 1 }} />
                    <span style={{ fontSize: 9, fontWeight: 600, letterSpacing: ".24em", textTransform: "uppercase", color: "#999" }}>
                        Creative Technologist
                    </span>
                </motion.div>

                {/* ── NAME — Editorial Typography ── */}
                <motion.div variants={fadeUp} style={{ marginTop: -6 }}>
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={isLoaded ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] as const }}
                    >
                        <span
                            style={{
                                display: "block",
                                fontSize: "clamp(54px, 15vw, 88px)",
                                fontWeight: 900,
                                lineHeight: 0.9,
                                letterSpacing: "-.02em",
                                textTransform: "uppercase",
                                color: "#1a1a1a",
                                fontFamily: fontHeader
                            }}
                        >
                            Ashish
                        </span>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={isLoaded ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.38, ease: [0.16, 1, 0.3, 1] as const }}
                    >
                        <span
                            style={{
                                display: "block",
                                fontSize: "clamp(54px, 15vw, 88px)",
                                fontWeight: 900,
                                lineHeight: 0.9,
                                letterSpacing: "-.02em",
                                textTransform: "uppercase",
                                color: "transparent",
                                WebkitTextStroke: "1px #1a1a1a",
                                fontFamily: fontHeader
                            }}
                        >
                            Yadu
                        </span>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={isLoaded ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
                        style={{ display: "flex", alignItems: "baseline", gap: 12 }}
                    >
                        <span
                            style={{
                                display: "block",
                                fontSize: "clamp(54px, 15vw, 88px)",
                                fontWeight: 900,
                                lineHeight: 0.9,
                                letterSpacing: "-.02em",
                                textTransform: "uppercase",
                                color: "#1a1a1a",
                                fontFamily: fontHeader
                            }}
                        >
                            vanshi
                        </span>
                        <motion.span
                            initial={{ scale: 0 }}
                            animate={isLoaded ? { scale: 1 } : {}}
                            transition={{ duration: 0.5, delay: 0.8, type: "spring", stiffness: 300 }}
                            style={{
                                display: "inline-block",
                                width: 10,
                                height: 10,
                                borderRadius: "50%",
                                background: "#1a1a1a",
                                flexShrink: 0,
                            }}
                        />
                    </motion.div>
                </motion.div>

                {/* ── Descriptive tagline ── */}
                <motion.p
                    variants={fadeUp}
                    style={{
                        fontFamily: fontBody,
                        fontSize: 16,
                        fontWeight: 400,
                        lineHeight: 1.7,
                        color: "#666",
                        maxWidth: 380,
                        marginTop: -4,
                    }}
                >
                    Architecting high-throughput platforms and serverless cloud systems. Focused on absolute structural integrity, optimizing performance bottlenecks, and delivering seamless experiences at scale.
                </motion.p>

                <motion.div variants={fadeScale} style={{ position: "relative", marginLeft: -22, marginRight: -22 }}>
                    <div
                        style={{
                            position: "relative",
                            width: "100%",
                            aspectRatio: "4/5",
                            maxHeight: "54vh",
                            overflow: "hidden",
                        }}
                    >
                        <Image
                            src="/img4.jpeg"
                            alt="Ashish Yaduvanshi"
                            fill
                            sizes="(max-width: 640px) 100vw, 640px"
                            style={{ objectFit: "cover" }}
                            priority
                        />
                    </div>
                </motion.div>

                <motion.div variants={fadeUp} style={{ display: "flex", gap: 10 }}>
                    <button
                        onClick={() => {
                            document.getElementById("booking-calendar-section")?.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="h2m-cta-solid"
                        style={{
                            fontFamily: fontUI,
                            fontSize: 10,
                            fontWeight: 700,
                            letterSpacing: ".18em",
                            textTransform: "uppercase",
                            background: "#1a1a1a",
                            color: "#fff",
                            border: "none",
                            padding: "12px 20px",
                            borderRadius: 12,
                            cursor: "pointer",
                            flex: 1,
                            textAlign: "center",
                        }}
                    >
                        Get in Touch →
                    </button>
                    <a
                        href="/Ashish.pdf"
                        download
                        className="h2m-cta-outline"
                        style={{
                            display: "inline-block",
                            fontFamily: fontUI,
                            fontSize: 10,
                            fontWeight: 700,
                            letterSpacing: ".18em",
                            textTransform: "uppercase",
                            background: "transparent",
                            color: "#1a1a1a",
                            border: "1.5px solid #1a1a1a",
                            padding: "12px 20px",
                            borderRadius: 12,
                            cursor: "pointer",
                            flex: 1,
                            textAlign: "center",
                            textDecoration: "none"
                        }}
                    >
                        ↓ Download CV
                    </a>
                </motion.div>

                {/* ── Stats row ── */}
                <motion.div
                    variants={fadeUp}
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                        gap: 8,
                    }}
                >
                    {STATS.map((st) => (
                        <div
                            key={st.label}
                            className="h2m-stat-card"
                            style={{
                                padding: "16px 10px",
                                borderRadius: 14,
                                textAlign: "center",
                                background: "#fff",
                                border: "1px solid rgba(0,0,0,.06)",
                                boxShadow: "0 2px 12px rgba(0,0,0,.03)",
                            }}
                        >
                            <div style={{
                                fontSize: 30,
                                fontWeight: 900,
                                letterSpacing: "-.02em",
                                color: "#1a1a1a",
                                lineHeight: 1,
                            }}>
                                <AnimatedCounter target={st.num} />
                            </div>
                            <div style={{
                                fontFamily: fontBody,
                                fontSize: 8,
                                fontWeight: 500,
                                letterSpacing: ".14em",
                                textTransform: "uppercase",
                                color: "#aaa",
                                marginTop: 5,
                            }}>
                                {st.label}
                            </div>
                        </div>
                    ))}
                </motion.div>

                {/* ── Currently at ── */}
                <motion.div
                    variants={fadeUp}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        padding: "14px 18px",
                        background: "#fff",
                        borderRadius: 12,
                        border: "1px solid rgba(0,0,0,.05)",
                        boxShadow: "0 2px 12px rgba(0,0,0,.02)",
                    }}
                >
                    <div style={{
                        width: 36,
                        height: 36,
                        borderRadius: 10,
                        background: "#1a1a1a",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                    }}>
                        <span style={{ fontSize: 14, color: "#fff" }}>◆</span>
                    </div>
                    <div>
                        <div style={{
                            fontSize: 8,
                            fontWeight: 600,
                            letterSpacing: ".14em",
                            textTransform: "uppercase",
                            color: "#aaa",
                            marginBottom: 2,
                        }}>
                            Currently at
                        </div>
                        <div style={{
                            fontSize: 13,
                            fontWeight: 700,
                            color: "#1a1a1a",
                            letterSpacing: "-.01em",
                        }}>
                            ASOasis Tech
                        </div>
                    </div>
                    <div style={{ marginLeft: "auto" }}>
                        <span style={{
                            fontSize: 8,
                            fontWeight: 600,
                            letterSpacing: ".1em",
                            textTransform: "uppercase",
                            color: "#22c55e",
                            background: "rgba(34,197,94,.08)",
                            padding: "4px 10px",
                            borderRadius: 6,
                        }}>
                            Active
                        </span>
                    </div>
                </motion.div>

                {/* ── Social links ── */}
                <motion.div
                    variants={fadeUp}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 20,
                        paddingTop: 4,
                    }}
                >
                    <span style={{ flex: 1, height: 1, background: "linear-gradient(90deg, transparent, rgba(0,0,0,.06))" }} />
                    {["LinkedIn", "GitHub", "Twitter"].map((s) => (
                        <a
                            key={s}
                            href={SOCIAL_LINKS[s as keyof typeof SOCIAL_LINKS]}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="h2m-social"
                            style={{
                                fontSize: 9,
                                fontWeight: 700,
                                letterSpacing: ".18em",
                                textTransform: "uppercase",
                                color: "#bbb",
                                textDecoration: "none",
                                fontFamily: fontUI,
                            }}
                        >
                            {s}
                        </a>
                    ))}
                    <span style={{ flex: 1, height: 1, background: "linear-gradient(90deg, rgba(0,0,0,.06), transparent)" }} />
                </motion.div>

                {/* ── Scroll indicator ── */}
                <motion.div
                    variants={fadeUp}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 6,
                        paddingBottom: 8,
                        paddingTop: 2,
                    }}
                >
                    <motion.div
                        animate={{ y: [0, 5, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        style={{
                            width: 18,
                            height: 28,
                            borderRadius: 9,
                            border: "1.5px solid rgba(0,0,0,.12)",
                            display: "flex",
                            alignItems: "flex-start",
                            justifyContent: "center",
                            paddingTop: 5,
                        }}
                    >
                        <div style={{
                            width: 2.5,
                            height: 7,
                            borderRadius: 2,
                            background: "#1a1a1a",
                        }} />
                    </motion.div>
                    <span style={{
                        fontSize: 7,
                        fontWeight: 500,
                        letterSpacing: ".22em",
                        textTransform: "uppercase",
                        color: "#ccc",
                    }}>
                        Scroll
                    </span>
                </motion.div>
            </motion.div>
        </section>
    );
}
