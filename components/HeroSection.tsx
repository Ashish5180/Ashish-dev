"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

/* ─────────────────────────────────────────
   Add to your global CSS or next/head:
   @import url('https://fonts.googleapis.com/css2?family=League+Spartan:wght@100;300;400;700;900&display=swap');
───────────────────────────────────────── */

const SOCIALS = ["LinkedIn", "GitHub", "Twitter"] as const;

const SOCIAL_LINKS = {
    LinkedIn: "https://www.linkedin.com/in/ashishyadav001/",
    GitHub: "https://github.com/Ashish5180",
    Twitter: "https://x.com/Developer_X01",
} as const;

const STATS = [
    { num: "2+", label: "Years Exp." },
    { num: "12+", label: "Products" },
    { num: "8", label: "Technologies" },
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



/* ── Split Panel Hero (Desktop) ── */
function HeroSectionDesktop() {
    const time = useClock();

    /* ── inline keyframes injected once ── */
    const stylesInjected = useRef(false);
    useEffect(() => {
        if (stylesInjected.current) return;
        stylesInjected.current = true;
        const style = document.createElement("style");
        style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=League+Spartan:wght@100;300;400;700;900&family=Inter:wght@300;400;500;600&display=swap');

      @keyframes hs-up   { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:none; } }
      @keyframes hs-slam { from { opacity:0; transform:translateY(60px); } to { opacity:1; transform:none; } }
      @keyframes hs-img  { from { opacity:0; transform:translateX(-50%) scale(.97); } to { opacity:1; transform:translateX(-50%) scale(1); } }
      @keyframes hs-bob  { from { transform:translateY(-2px); } to { transform:translateY(2px); } }
      @keyframes hs-blink{ 0%,100%{opacity:1;} 50%{opacity:.15;} }

      .hs-delay-0  { animation-delay:.05s; }
      .hs-delay-1  { animation-delay:.15s; }
      .hs-delay-2  { animation-delay:.25s; }
      .hs-delay-3  { animation-delay:.35s; }
      .hs-delay-4  { animation-delay:.45s; }
      .hs-delay-5  { animation-delay:.55s; }
      .hs-delay-6  { animation-delay:.65s; }
      .hs-delay-7  { animation-delay:.75s; }
      .hs-delay-8  { animation-delay:.85s; }
      .hs-delay-9  { animation-delay:1.0s; }

      .hs-fade-up  { opacity:0; animation: hs-up   .6s ease forwards; }
      .hs-slam     { opacity:0; animation: hs-slam .8s cubic-bezier(.16,1,.3,1) forwards; }
      .hs-img-in   { opacity:0; animation: hs-img  .9s cubic-bezier(.16,1,.3,1) .2s forwards; }
      .hs-bob      { animation: hs-bob .9s ease-in-out infinite alternate; }

      .hs-btn-solid:hover { background:#ddd !important; }
      .hs-btn-ghost:hover { color:#fff !important; border-color:#555 !important; }
      .hs-soc:hover       { color:#aaa !important; }
      .hs-learn:hover     { opacity:.5; }

      /* ── Tablet & below (≤1224px) — premium stacked layout, no portrait ── */
      @media (max-width: 1224px) {
        .hs-section {
          grid-template-columns: 1fr !important;
          grid-template-rows: auto auto !important;
          min-height: auto !important;
        }

        /* ── Portrait hidden ── */
        .hs-portrait {
          display: none !important;
        }

        /* ── Left panel: full-width dark hero header ── */
        .hs-left-panel {
          padding: 100px 48px 56px !important;
          min-height: auto !important;
          align-items: center !important;
          text-align: center !important;
        }
        .hs-left-panel p {
          max-width: 440px !important;
          margin-left: auto !important;
          margin-right: auto !important;
        }
        .hs-cta-buttons {
          justify-content: center !important;
        }
        .hs-socials-vertical {
          display: none !important;
        }

        /* ── Right panel: premium centered card feel ── */
        .hs-right-panel {
          padding: 48px 48px 56px !important;
          gap: 36px !important;
          align-items: center !important;
          text-align: center !important;
          background: linear-gradient(175deg, #f5f5f3 0%, #eaeae6 100%) !important;
          border-top: 3px solid #dc2626 !important;
        }
        .hs-clock-bar {
          margin-left: 0 !important;
          max-width: 400px !important;
          width: 100% !important;
        }
        .hs-right-desc {
          margin-left: auto !important;
          margin-right: auto !important;
          max-width: 440px !important;
        }
        .hs-learn {
          margin-left: 0 !important;
        }
      }

      /* ── Mobile (≤640px) — tighter premium mobile ── */
      @media (max-width: 640px) {
        .hs-left-panel {
          padding: 88px 24px 40px !important;
        }
        .hs-right-panel {
          padding: 36px 24px 44px !important;
          gap: 28px !important;
        }
        .hs-cta-buttons {
          flex-direction: column !important;
          gap: 10px !important;
          width: 100% !important;
          max-width: 320px !important;
          margin-left: auto !important;
          margin-right: auto !important;
        }
        .hs-cta-buttons button {
          width: 100% !important;
          text-align: center !important;
          display: flex !important;
          justify-content: center !important;
        }
        .hs-clock-bar {
          margin-left: 0 !important;
        }
        .hs-right-desc {
          margin-left: auto !important;
          margin-right: auto !important;
          max-width: 100% !important;
        }
        .hs-learn {
          margin-left: 0 !important;
        }
      }
    `;
        document.head.appendChild(style);
    }, []);

    /* ── shared style tokens ── */
    const font = "'League Spartan', sans-serif";
    const fontBody = "'Inter', sans-serif";
    const gridPattern = (dark: boolean): React.CSSProperties => ({
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        backgroundImage: `
      repeating-linear-gradient(0deg,transparent,transparent 39px,${dark ? "rgba(255,255,255,.03)" : "rgba(0,0,0,.025)"} 40px),
      repeating-linear-gradient(90deg,transparent,transparent 39px,${dark ? "rgba(255,255,255,.03)" : "rgba(0,0,0,.025)"} 40px)
    `,
    });

    return (
        <section
            className="hs-section"
            style={{
                fontFamily: font,
                width: "100%",
                minHeight: "100vh",
                display: "grid",
                gridTemplateColumns: "50% 50%",
                position: "relative",
                overflow: "hidden",
            }}
        >

            {/* ══ LEFT DARK PANEL ══ */}
            <div
                className="hs-left-panel"
                style={{
                    background: "#080808",
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    padding: "64px 60px 64px 80px",
                    overflow: "hidden",
                }}
            >
                <div style={gridPattern(true)} />

                {/* Over-label */}
                <div
                    className="hs-fade-up hs-delay-0"
                    style={{
                        fontSize: 10,
                        fontWeight: 700,
                        letterSpacing: ".28em",
                        textTransform: "uppercase",
                        color: "#666",
                        marginBottom: 18,
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                    }}
                >
                    <div style={{
                        width: 24, height: 24, background: "#dc2626", borderRadius: 4,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        boxShadow: "0 0 10px rgba(220,38,38,0.3)"
                    }}>
                        <span style={{ fontSize: 9, fontWeight: 900, color: "#fff" }}>AY</span>
                    </div>
                    AY · SYSTEMS ENGINEER & BACKEND ARCHITECT · INDIA
                </div>

                {/* Main headline */}
                <div className="hs-slam hs-delay-1" style={{ marginTop: -8 }}>
                    <div style={{ overflow: "hidden" }}>
                        <span
                            style={{
                                display: "block",
                                fontSize: "clamp(52px, 8.5vw, 108px)",
                                fontWeight: 900,
                                lineHeight: 0.9,
                                letterSpacing: "-.03em",
                                textTransform: "uppercase",
                                color: "#fff",
                            }}
                        >
                            ASHISH
                        </span>
                    </div>
                    <div style={{ overflow: "hidden" }}>
                        <span
                            style={{
                                display: "block",
                                fontSize: "clamp(52px, 8.5vw, 108px)",
                                fontWeight: 900,
                                lineHeight: 0.9,
                                letterSpacing: "-.03em",
                                textTransform: "uppercase",
                                color: "transparent",
                                WebkitTextStroke: "1px rgba(255,255,255,0.2)",
                            }}
                        >
                            YADU
                        </span>
                    </div>
                    <div style={{ overflow: "hidden" }}>
                        <span
                            style={{
                                display: "block",
                                fontSize: "clamp(52px, 8.5vw, 108px)",
                                fontWeight: 900,
                                lineHeight: 0.9,
                                letterSpacing: "-.03em",
                                textTransform: "uppercase",
                                color: "#fff",
                            }}
                        >
                            VANSHI
                        </span>
                    </div>
                </div>

                {/* Description */}
                <p
                    className="hs-fade-up hs-delay-4"
                    style={{
                        fontFamily: fontBody,
                        fontSize: 17,
                        fontWeight: 300,
                        lineHeight: 1.8,
                        color: "#999",
                        maxWidth: 430,
                        marginTop: 16,
                    }}
                >
                    Architecting performant, resilient distributed systems. From serverless backends to AI integration — engineering production-grade applications built for scale.
                </p>
                {/* CTA buttons */}
                <div
                    className="hs-fade-up hs-delay-5 hs-cta-buttons"
                    style={{ display: "flex", gap: 16, marginTop: 40 }}
                >
                    <button
                        onClick={() => {
                            document.getElementById("booking-calendar-section")?.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="hs-btn-solid"
                        style={{
                            fontFamily: font,
                            fontSize: 10,
                            fontWeight: 700,
                            letterSpacing: ".2em",
                            textTransform: "uppercase",
                            background: "#fff",
                            color: "#111",
                            border: "none",
                            padding: "14px 28px",
                            cursor: "pointer",
                            transition: "background .2s",
                        }}
                    >
                        Get in Touch →
                    </button>
                    <a
                        href="/Ashish.pdf"
                        download
                        className="hs-btn-ghost"
                        style={{
                            display: "inline-block",
                            fontFamily: font,
                            fontSize: 10,
                            fontWeight: 700,
                            letterSpacing: ".2em",
                            textTransform: "uppercase",
                            background: "transparent",
                            color: "#555",
                            border: "1px solid #2a2a2a",
                            padding: "14px 28px",
                            cursor: "pointer",
                            transition: "all .2s",
                            textDecoration: "none",
                            textAlign: "center"
                        }}
                    >
                        ↓ Download CV
                    </a>
                </div>

                {/* Vertical socials */}
                <div
                    className="hs-fade-up hs-delay-7 hs-socials-vertical"
                    style={{
                        position: "absolute",
                        bottom: 48,
                        right: -28,
                        display: "flex",
                        flexDirection: "column",
                        gap: 16,
                        transform: "rotate(90deg)",
                        transformOrigin: "bottom right",
                    }}
                >
                    {SOCIALS.map((s) => (
                        <a
                            key={s}
                            href={SOCIAL_LINKS[s]}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hs-soc"
                            style={{
                                fontSize: 8,
                                fontWeight: 700,
                                letterSpacing: ".22em",
                                textTransform: "uppercase",
                                color: "#333",
                                textDecoration: "none",
                                cursor: "pointer",
                                fontFamily: font,
                                transition: "color .2s",
                            }}
                        >
                            {s}
                        </a>
                    ))}
                </div>
            </div>

            {/* ══ CENTER PORTRAIT — bleeds over both panels ══ */}
            <div
                className="hs-img-in hs-portrait"
                style={{
                    position: "absolute",
                    left: "50%",
                    transform: "translateX(-50%)",
                    top: 40,
                    bottom: -20,
                    width: "clamp(340px, 40%, 520px)",
                    zIndex: 20,
                }}
            >
                <Image
                    src="/my.png"
                    alt="Ashish Yaduvanshi"
                    fill
                    style={{ objectFit: "cover" }}
                    priority
                />
            </div>

            {/* ══ RIGHT LIGHT PANEL ══ */}
            <div
                className="hs-right-panel"
                style={{
                    background: "#FAFAF8",
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    gap: "48px",
                    padding: "64px 80px 64px 40%",
                    overflow: "hidden",
                }}
            >
                <div style={gridPattern(false)} />

                {/* Top: clock + status */}
                <div>
                    {/* Live clock bar */}
                    <div
                        className="hs-fade-up hs-delay-3 hs-clock-bar"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            borderBottom: "1px solid #E8E6E0",
                            paddingBottom: 16,
                            marginBottom: 20,
                        }}
                    >
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#DC2626", animation: "hs-blink 2s infinite" }} />
                            <span
                                style={{
                                    fontSize: 9,
                                    fontWeight: 600,
                                    letterSpacing: ".15em",
                                    textTransform: "uppercase",
                                    color: "#888",
                                    fontFamily: fontBody,
                                }}
                            >
                                New Delhi · IST
                            </span>
                        </div>
                        <span
                            style={{
                                fontSize: 13,
                                fontWeight: 700,
                                letterSpacing: ".08em",
                                color: "#0E0E0E",
                                fontVariantNumeric: "tabular-nums",
                                fontFamily: fontBody,
                            }}
                        >
                            {time}
                        </span>
                    </div>
                </div>

                {/* Mid: heading + description */}
                <div className="hs-fade-up hs-delay-5">
                    <div
                        style={{
                            fontSize: 9,
                            fontWeight: 700,
                            letterSpacing: ".25em",
                            textTransform: "uppercase",
                            color: "#999",
                            marginBottom: 12,
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                        }}
                    >
                        <span
                            style={{
                                display: "inline-block",
                                width: 16,
                                height: 2,
                                background: "#DC2626",
                            }}
                        />
                        ENGINEERING SYSTEMS AT ASOASIS TECH
                    </div>

                    <h2
                        style={{
                            fontSize: "clamp(32px, 4.5vw, 54px)",
                            fontWeight: 900,
                            lineHeight: 1.05,
                            letterSpacing: "-.03em",
                            textTransform: "uppercase",
                            marginBottom: 18,
                            fontFamily: font,
                        }}
                    >
                        <span style={{ display: "block", color: "#0E0E0E" }}>Orchestrating</span>
                        <span style={{ display: "block", color: "#0E0E0E" }}>High-Throughput</span>
                        <span style={{ display: "block", color: "#DC2626" }}>Architectures.</span>
                    </h2>

                    <p
                        className="hs-right-desc"
                        style={{
                            fontFamily: fontBody,
                            fontSize: 17,
                            fontWeight: 400,
                            lineHeight: 1.85,
                            color: "#555",
                            maxWidth: "480px",
                            marginTop: 18,
                        }}
                    >
                        Specializing in resilient distributed architectures. I design event-driven serverless flows, integrate cognitive AI services, and optimize database layers for over 100K+ active users.
                    </p>

                    <motion.button
                        onClick={() => {
                            document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
                        }}
                        whileHover="hover"
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 8,
                            fontSize: 12,
                            fontWeight: 700,
                            letterSpacing: ".2em",
                            textTransform: "uppercase",
                            color: "#0E0E0E",
                            background: "none",
                            border: "none",
                            padding: "0 0 4px 0",
                            borderBottom: "2px solid #DC2626",
                            cursor: "pointer",
                            fontFamily: font,
                            marginTop: 24,
                        }}
                    >
                        View My Work
                        <motion.span
                            variants={{
                                hover: { x: 5 }
                            }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            style={{ display: "inline-flex" }}
                        >
                            <ArrowRight size={13} color="#DC2626" />
                        </motion.span>
                    </motion.button>
                </div>

                {/* Bottom stats */}
                <div
                    className="hs-fade-up hs-delay-6"
                    style={{
                        display: "flex",
                        gap: 20,
                        borderTop: "1px solid #E8E6E0",
                        paddingTop: 28,
                        marginTop: "auto",
                    }}
                >
                    {STATS.map((st, i) => (
                        <div
                            key={st.label}
                            style={{
                                flex: 1,
                                borderRight: i < STATS.length - 1 ? "1px solid #E8E6E0" : "none",
                                paddingRight: i < STATS.length - 1 ? 16 : 0,
                            }}
                        >
                            <div
                                style={{
                                    fontSize: 38,
                                    fontWeight: 900,
                                    letterSpacing: "-.04em",
                                    color: "#0E0E0E",
                                    lineHeight: 1,
                                    fontFamily: font,
                                }}
                            >
                                {st.num}
                            </div>
                            <div
                                style={{
                                    fontSize: 10,
                                    fontWeight: 600,
                                    letterSpacing: ".12em",
                                    textTransform: "uppercase",
                                    color: "#888",
                                    marginTop: 6,
                                    fontFamily: fontBody,
                                }}
                            >
                                {st.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ── SWITCHER COMPONENT ── */
import HeroSectionMobile from "./HeroSection2";

export default function HeroSection() {
    const [isMobile, setIsMobile] = useState<boolean | null>(null);

    useEffect(() => {
        const checkSize = () => {
            setIsMobile(window.innerWidth < 1224);
        };
        checkSize();
        window.addEventListener("resize", checkSize);
        return () => window.removeEventListener("resize", checkSize);
    }, []);

    // Prevent hydration mismatch by returning null or a placeholder until client-side check
    if (isMobile === null) return <div style={{ minHeight: "100vh", background: "#111" }} />;

    return isMobile ? <HeroSectionMobile /> : <HeroSectionDesktop />;
}