"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence, Variants } from "framer-motion";

/* ─────────────────────────────────────────
   HeroSection2 — Premium Light Mobile Hero
   Editorial magazine-style layout with 3 images
   in a creative asymmetric mosaic grid
───────────────────────────────────────── */

const IMAGES = [
    { src: "/img1.jpeg", alt: "Ashish Yaduvanshi — Portrait 1", caption: "Building Products" },
    { src: "/img3.jpeg", alt: "Ashish Yaduvanshi — Portrait 2", caption: "Engineering Systems" },
    { src: "/img4.jpeg", alt: "Ashish Yaduvanshi — Portrait 3", caption: "Solving Problems" },
] as const;

const STATS = [
    { num: "3+", label: "Years Experience" },
    { num: "12+", label: "Products Shipped" },
    { num: "8", label: "Core Technologies" },
] as const;

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
    const [activeImg, setActiveImg] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const stylesInjected = useRef(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoaded(true), 0);
        return () => clearTimeout(timer);
    }, []);

    /* ── Auto-rotate images ── */
    const startAutoRotate = useCallback(() => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            setActiveImg((prev) => (prev + 1) % IMAGES.length);
        }, 5000);
    }, []);

    useEffect(() => {
        startAutoRotate();
        return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
    }, [startAutoRotate]);

    const selectImage = (i: number) => {
        setActiveImg(i);
        startAutoRotate();
    };

    /* ── Inject keyframes ── */
    useEffect(() => {
        if (stylesInjected.current) return;
        stylesInjected.current = true;
        const style = document.createElement("style");
        style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=League+Spartan:wght@100;300;400;500;600;700;900&family=Inter:wght@300;400;500;600&display=swap');

      @keyframes h2m-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
      @keyframes h2m-pulse { 0%,100%{opacity:.5} 50%{opacity:1} }
      @keyframes h2m-line-draw { from{width:0} to{width:100%} }
      @keyframes h2m-shimmer {
        0%{background-position:-200% 0}
        100%{background-position:200% 0}
      }

      .h2m-cta-solid {
        position: relative;
        overflow: hidden;
        transition: all .4s cubic-bezier(.4,0,.2,1);
      }
      .h2m-cta-solid::after {
        content: '';
        position: absolute;
        top: 0; left: -100%; width: 100%; height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,.2), transparent);
        transition: left .6s;
      }
      .h2m-cta-solid:hover::after { left: 100%; }
      .h2m-cta-solid:hover {
        transform: translateY(-3px);
        box-shadow: 0 12px 40px rgba(220,38,38,.3);
      }
      .h2m-cta-outline {
        transition: all .4s cubic-bezier(.4,0,.2,1);
      }
      .h2m-cta-outline:hover {
        border-color: #dc2626 !important;
        color: #dc2626 !important;
        transform: translateY(-3px);
        box-shadow: 0 8px 30px rgba(220,38,38,.1);
      }
      .h2m-social:hover {
        color: #dc2626 !important;
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
        border-color: rgba(220,38,38,.2) !important;
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

    const font = "'League Spartan', sans-serif";
    const fontBody = "'Inter', sans-serif";

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
                fontFamily: font,
                width: "100%",
                minHeight: "100vh",
                background: "#faf9f7",
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
                    backgroundImage: `
            radial-gradient(circle at 20% 20%, rgba(220,38,38,.03) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(220,38,38,.02) 0%, transparent 50%)
          `,
                    pointerEvents: "none",
                }}
            />
            {/* Very faint dot grid */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: "radial-gradient(circle, rgba(0,0,0,.03) 1px, transparent 1px)",
                    backgroundSize: "24px 24px",
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
                            borderRadius: 8,
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
                            Engineer
                        </span>
                    </div>
                </div>

                {/* Right side — availability + clock */}
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                        <div style={{
                            width: 5, height: 5, borderRadius: "50%", background: "#22c55e",
                            boxShadow: "0 0 6px rgba(34,197,94,.4)", animation: "h2m-pulse 2s ease-in-out infinite",
                        }} />
                        <span style={{ fontSize: 8, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "#888" }}>
                            Available
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
                    <span style={{ width: 24, height: 1.5, background: "#dc2626", display: "inline-block", borderRadius: 1 }} />
                    <span style={{ fontSize: 9, fontWeight: 600, letterSpacing: ".24em", textTransform: "uppercase", color: "#999" }}>
                        Software Development Engineer
                    </span>
                </motion.div>

                {/* ── NAME — Editorial Typography ── */}
                <motion.div variants={fadeUp} style={{ marginTop: -6 }}>
                    {/* ASHISH — bold with accent underline */}
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
                                letterSpacing: "-.04em",
                                textTransform: "uppercase",
                                color: "#1a1a1a",
                            }}
                        >
                            Ashish
                        </span>
                    </motion.div>

                    {/* YADU — Large stroke outline effect */}
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
                                letterSpacing: "-.04em",
                                textTransform: "uppercase",
                                color: "transparent",
                                WebkitTextStroke: "1.5px #dc2626",
                            }}
                        >
                            Yadu
                        </span>
                    </motion.div>

                    {/* VANSHI — solid with red accent */}
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
                                letterSpacing: "-.04em",
                                textTransform: "uppercase",
                                color: "#1a1a1a",
                            }}
                        >
                            vanshi
                        </span>
                        {/* Red accent dot */}
                        <motion.span
                            initial={{ scale: 0 }}
                            animate={isLoaded ? { scale: 1 } : {}}
                            transition={{ duration: 0.5, delay: 0.8, type: "spring", stiffness: 300 }}
                            style={{
                                display: "inline-block",
                                width: 10,
                                height: 10,
                                borderRadius: "50%",
                                background: "#dc2626",
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
                        fontSize: 14,
                        fontWeight: 400,
                        lineHeight: 1.7,
                        color: "#777",
                        maxWidth: 380,
                        marginTop: -4,
                    }}
                >
                    Crafting{" "}
                    <strong style={{ color: "#1a1a1a", fontWeight: 600 }}>AI-powered platforms</strong>,
                    cloud-native systems &amp; mobile applications that{" "}
                    <span style={{ color: "#dc2626", fontWeight: 500 }}>
                        solve real problems at scale
                    </span>.
                </motion.p>

                {/* ═══════════════════════════════════════
            IMAGE GALLERY — Asymmetric Mosaic
        ═══════════════════════════════════════ */}
                <motion.div variants={fadeScale} style={{ position: "relative" }}>
                    {/* Main large image */}
                    <div
                        style={{
                            position: "relative",
                            width: "100%",
                            aspectRatio: "4/5",
                            maxHeight: "52vh",
                            borderRadius: 18,
                            overflow: "hidden",
                            background: "#eee",
                        }}
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeImg}
                                initial={{ opacity: 0, scale: 1.04 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.96 }}
                                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
                                style={{ position: "absolute", inset: 0 }}
                            >
                                <Image
                                    src={IMAGES[activeImg].src}
                                    alt={IMAGES[activeImg].alt}
                                    fill
                                    style={{ objectFit: "cover", objectPosition: "top center" }}
                                    priority
                                />
                            </motion.div>
                        </AnimatePresence>

                        {/* Gradient overlays — top & bottom */}
                        <div style={{
                            position: "absolute", inset: 0, pointerEvents: "none", zIndex: 2,
                            background: "linear-gradient(180deg, rgba(250,249,247,.3) 0%, transparent 25%, transparent 65%, rgba(250,249,247,.7) 100%)",
                        }} />

                        {/* Caption overlay */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeImg}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.4 }}
                                style={{
                                    position: "absolute",
                                    bottom: 18,
                                    left: 18,
                                    zIndex: 3,
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 8,
                                }}
                            >
                                <span style={{
                                    fontSize: 9,
                                    fontWeight: 600,
                                    letterSpacing: ".15em",
                                    textTransform: "uppercase",
                                    color: "#1a1a1a",
                                    background: "rgba(255,255,255,.85)",
                                    backdropFilter: "blur(8px)",
                                    padding: "6px 14px",
                                    borderRadius: 6,
                                }}>
                                    {IMAGES[activeImg].caption}
                                </span>
                            </motion.div>
                        </AnimatePresence>

                        {/* Slide counter — top right */}
                        <div style={{
                            position: "absolute", top: 18, right: 18, zIndex: 3,
                            background: "rgba(255,255,255,.85)", backdropFilter: "blur(8px)",
                            padding: "6px 12px", borderRadius: 6,
                            display: "flex", alignItems: "baseline", gap: 3,
                        }}>
                            <span style={{ fontSize: 18, fontWeight: 900, color: "#1a1a1a", letterSpacing: "-.02em" }}>
                                0{activeImg + 1}
                            </span>
                            <span style={{ fontSize: 10, fontWeight: 400, color: "#aaa" }}>
                                / 0{IMAGES.length}
                            </span>
                        </div>
                    </div>

                    {/* ── Thumbnail strip ── */}
                    <div style={{
                        display: "flex",
                        gap: 10,
                        marginTop: 12,
                    }}>
                        {IMAGES.map((img, i) => (
                            <button
                                key={i}
                                onClick={() => selectImage(i)}
                                className="h2m-thumb"
                                style={{
                                    flex: 1,
                                    aspectRatio: "1",
                                    borderRadius: 12,
                                    overflow: "hidden",
                                    position: "relative",
                                    border: i === activeImg ? "2.5px solid #dc2626" : "2.5px solid transparent",
                                    cursor: "pointer",
                                    padding: 0,
                                    background: "#eee",
                                    boxShadow: i === activeImg ? "0 4px 16px rgba(220,38,38,.15)" : "0 2px 8px rgba(0,0,0,.06)",
                                    opacity: i === activeImg ? 1 : 0.6,
                                }}
                            >
                                <Image
                                    src={img.src}
                                    alt={img.alt}
                                    fill
                                    style={{ objectFit: "cover", objectPosition: "top center" }}
                                />
                                {/* Active indicator bar */}
                                {i === activeImg && (
                                    <motion.div
                                        layoutId="activeThumb"
                                        style={{
                                            position: "absolute",
                                            bottom: 0,
                                            left: 0,
                                            right: 0,
                                            height: 3,
                                            background: "#dc2626",
                                            zIndex: 2,
                                        }}
                                    />
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Progress bar */}
                    <div style={{
                        marginTop: 8,
                        height: 2,
                        background: "rgba(0,0,0,.04)",
                        borderRadius: 2,
                        overflow: "hidden",
                    }}>
                        <motion.div
                            key={activeImg}
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 5, ease: "linear" }}
                            style={{
                                height: "100%",
                                background: "linear-gradient(90deg, #dc2626, #ef4444)",
                                borderRadius: 2,
                            }}
                        />
                    </div>
                </motion.div>

                {/* ── CTA Buttons ── */}
                <motion.div variants={fadeUp} style={{ display: "flex", gap: 10 }}>
                    <button
                        className="h2m-cta-solid"
                        style={{
                            fontFamily: font,
                            fontSize: 10,
                            fontWeight: 700,
                            letterSpacing: ".18em",
                            textTransform: "uppercase",
                            background: "#1a1a1a",
                            color: "#fff",
                            border: "none",
                            padding: "16px 24px",
                            borderRadius: 12,
                            cursor: "pointer",
                            flex: 1,
                            textAlign: "center",
                        }}
                    >
                        Get in Touch →
                    </button>
                    <button
                        className="h2m-cta-outline"
                        style={{
                            fontFamily: font,
                            fontSize: 10,
                            fontWeight: 700,
                            letterSpacing: ".18em",
                            textTransform: "uppercase",
                            background: "transparent",
                            color: "#666",
                            border: "1.5px solid #ddd",
                            padding: "16px 24px",
                            borderRadius: 12,
                            cursor: "pointer",
                            flex: 1,
                            textAlign: "center",
                        }}
                    >
                        ↓ Resume
                    </button>
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
                                fontSize: 26,
                                fontWeight: 900,
                                letterSpacing: "-.02em",
                                color: "#dc2626",
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
                        background: "linear-gradient(135deg, #dc2626, #ef4444)",
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
                            href="#"
                            className="h2m-social"
                            style={{
                                fontSize: 9,
                                fontWeight: 700,
                                letterSpacing: ".18em",
                                textTransform: "uppercase",
                                color: "#bbb",
                                textDecoration: "none",
                                fontFamily: font,
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
                            background: "#dc2626",
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
