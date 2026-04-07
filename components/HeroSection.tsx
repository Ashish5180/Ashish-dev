"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/* ─────────────────────────────────────────
   Add to your global CSS or next/head:
   @import url('https://fonts.googleapis.com/css2?family=League+Spartan:wght@100;300;400;700;900&display=swap');
───────────────────────────────────────── */

const SOCIALS = ["LinkedIn", "GitHub", "Twitter"] as const;

const STATS = [
    { num: "3+", label: "Years Exp." },
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
      @import url('https://fonts.googleapis.com/css2?family=League+Spartan:wght@100;300;400;700;900&display=swap');

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
                    background: "#111",
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
                        fontWeight: 400,
                        letterSpacing: ".28em",
                        textTransform: "uppercase",
                        color: "#aaa",
                        marginBottom: 18,
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                    }}
                >
                    <span style={{ display: "inline-block", width: 24, height: 1, background: "#555" }} />
                    Full Stack Engineer · India
                </div>

                {/* Main headline */}
                <div className="hs-slam hs-delay-1" style={{ marginTop: -8 }}>
                    <div style={{ overflow: "hidden" }}>
                        <span
                            style={{
                                display: "block",
                                fontSize: "clamp(52px, 8.5vw, 108px)",
                                fontWeight: 900,
                                lineHeight: 0.88,
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
                                lineHeight: 0.88,
                                letterSpacing: "-.03em",
                                textTransform: "uppercase",
                                color: "transparent",
                                WebkitTextStroke: "1.5px rgba(255,255,255,.2)",
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
                                lineHeight: 0.88,
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
                        marginTop: 28,
                        fontSize: 14,
                        fontWeight: 300,
                        lineHeight: 1.7,
                        color: "#888",
                        maxWidth: 360,
                    }}
                >
                    Building{" "}
                    <strong style={{ color: "#fff", fontWeight: 700 }}>AI platforms</strong>,
                    mobile apps &amp; cloud systems — where architecture meets product thinking.
                </p>
                {/* CTA buttons */}
                <div
                    className="hs-fade-up hs-delay-5 hs-cta-buttons"
                    style={{ display: "flex", gap: 12, marginTop: 32 }}
                >
                    <button
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
                    <button
                        className="hs-btn-ghost"
                        style={{
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
                        }}
                    >
                        ↓ Download CV
                    </button>
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
                        <button
                            key={s}
                            className="hs-soc"
                            style={{
                                fontSize: 8,
                                fontWeight: 700,
                                letterSpacing: ".22em",
                                textTransform: "uppercase",
                                color: "#333",
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                                fontFamily: font,
                                transition: "color .2s",
                            }}
                        >
                            {s}
                        </button>
                    ))}
                </div>
            </div>

            {/* ══ CENTER PORTRAIT — bleeds over both panels ══ */}
            <div
                className="hs-img-in hs-portrait"
                style={{
                    position: "absolute",
                    left: "54%",
                    transform: "translateX(-50%)",
                    top: 40,
                    bottom: -20,
                    width: "clamp(340px, 40%, 520px)",
                    zIndex: 20,
                }}
            >

                <Image
                    src="/img2.png"
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
                    background: "#f2f2f0",
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    gap: "48px",
                    padding: "64px 40px 64px 52%",
                    overflow: "hidden",
                }}
            >
                <div style={gridPattern(false)} />

                {/* Top: clock + slide number */}
                <div>
                    {/* Live clock bar */}
                    <div
                        className="hs-fade-up hs-delay-3 hs-clock-bar"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            borderBottom: "1px solid rgba(0,0,0,.08)",
                            paddingBottom: 16,
                            marginBottom: 20,
                            marginLeft: -20,
                        }}
                    >
                        <span
                            style={{
                                fontSize: 9,
                                fontWeight: 400,
                                letterSpacing: ".14em",
                                textTransform: "uppercase",
                                color: "#aaa",
                            }}
                        >
                            New Delhi · IST
                        </span>
                        <span
                            style={{
                                fontSize: 13,
                                fontWeight: 700,
                                letterSpacing: ".08em",
                                color: "#111",
                                fontVariantNumeric: "tabular-nums",
                            }}
                        >
                            {time}
                        </span>
                    </div>

                    {/* Slide number */}
                    <div
                        className="hs-fade-up hs-delay-2"
                        style={{
                            fontSize: "clamp(80px, 11vw, 130px)",
                            fontWeight: 900,
                            letterSpacing: "-.04em",
                            color: "#111",
                            lineHeight: 1,
                        }}
                    >
                        01
                        <sup
                            style={{
                                fontSize: 18,
                                fontWeight: 300,
                                letterSpacing: ".05em",
                                color: "#aaa",
                                verticalAlign: "super",
                                marginLeft: 2,
                            }}
                        >
                            /04
                        </sup>
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
                            color: "#aaa",
                            marginBottom: 10,
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                        }}
                    >
                        <span
                            style={{
                                display: "inline-block",
                                width: 16,
                                height: 1.5,
                                background: "#111",
                            }}
                        />
                        Currently at ASOasis Tech
                    </div>

                    <h2
                        style={{
                            fontSize: "clamp(28px, 4vw, 44px)",
                            fontWeight: 900,
                            lineHeight: 1.05,
                            letterSpacing: "-.02em",
                            textTransform: "uppercase",
                            marginBottom: 18,
                        }}
                    >
                        <span style={{ display: "block", color: "#dc2626" }}>Architecting</span>
                        <span style={{ display: "block", color: "#e53e3e" }}>Intelligent</span>
                        <span style={{ display: "block", color: "#b91c1c" }}>Systems</span>
                    </h2>

                    <p
                        className="hs-right-desc"
                        style={{
                            fontSize: 15,
                            fontWeight: 300,
                            lineHeight: 1.75,
                            color: "#555",
                            maxWidth: 260,
                            marginLeft: -20,
                        }}
                    >
                        3+ years engineering{" "}
                        <strong style={{ color: "#111", fontWeight: 700 }}>
                            high-throughput platforms
                        </strong>
                        , serverless cloud systems, and AI-powered products trusted by real
                        users at scale.
                    </p>

                    <button
                        className="hs-learn"
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 8,
                            fontSize: 9.5,
                            fontWeight: 700,
                            letterSpacing: ".2em",
                            textTransform: "uppercase",
                            color: "#111",
                            background: "none",
                            border: "none",
                            borderBottom: "1.5px solid #111",
                            paddingBottom: 4,
                            marginLeft: -20,
                            cursor: "pointer",
                            fontFamily: font,
                            marginTop: 24,
                            transition: "opacity .2s",
                        }}
                    >
                        View My Work →
                    </button>
                </div>

                {/* Bottom stats */}
                <div
                    className="hs-fade-up hs-delay-6"
                    style={{
                        display: "flex",
                        gap: 0,
                        borderTop: "1px solid rgba(0,0,0,.1)",
                        paddingTop: 24,
                    }}
                >
                    {STATS.map((st, i) => (
                        <div
                            key={st.label}
                            style={{
                                flex: 1,
                                borderRight: i < STATS.length - 1 ? "1px solid rgba(0,0,0,.08)" : "none",
                                paddingRight: i < STATS.length - 1 ? 20 : 0,
                                marginRight: i < STATS.length - 1 ? 20 : 0,
                            }}
                        >
                            <div
                                style={{
                                    fontSize: 36,
                                    fontWeight: 900,
                                    letterSpacing: "-.03em",
                                    color: "#dc2626",
                                    lineHeight: 1,
                                }}
                            >
                                {st.num}
                            </div>
                            <div
                                style={{
                                    fontSize: 8.5,
                                    fontWeight: 400,
                                    letterSpacing: ".16em",
                                    textTransform: "uppercase",
                                    color: "#aaa",
                                    marginTop: 3,
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