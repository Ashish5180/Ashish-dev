"use client";

import { useEffect, useRef, useState } from "react";

/* ──────────────────────────────────────────
   CONSTELLATION
───────────────────────────────────────────── */
const SKILLS = ["Next.js", "Flutter", "AWS", "OpenAI", "Firebase", "TypeScript", "Docker", "n8n"];
const CX = 150;
const CY = 150;
const RADII = [68, 96, 118];

function Constellation() {
    const svgRef = useRef<SVGSVGElement>(null);
    const animRef = useRef<number>(0);

    useEffect(() => {
        const svg = svgRef.current;
        if (!svg) return;
        const ns = "http://www.w3.org/2000/svg";
        while (svg.firstChild) svg.removeChild(svg.firstChild);

        // Rings
        RADII.forEach((r, i) => {
            const c = document.createElementNS(ns, "circle");
            c.setAttribute("cx", String(CX));
            c.setAttribute("cy", String(CY));
            c.setAttribute("r", String(r));
            c.setAttribute("fill", "none");
            c.setAttribute("stroke-width", "1");
            c.setAttribute("stroke", `rgba(0,0,0,${(0.05 - i * 0.01).toFixed(2)})`);
            if (i === 1) c.setAttribute("stroke-dasharray", "3 6");
            svg.appendChild(c);
        });

        // Nodes
        SKILLS.forEach((skill, i) => {
            const angle = (i / SKILLS.length) * Math.PI * 2 - Math.PI / 2;
            const ri = RADII[i % 3];
            const x = CX + ri * Math.cos(angle);
            const y = CY + ri * Math.sin(angle);

            const line = document.createElementNS(ns, "line");
            line.setAttribute("x1", String(CX)); line.setAttribute("y1", String(CY));
            line.setAttribute("x2", String(x)); line.setAttribute("y2", String(y));
            line.setAttribute("stroke", "rgba(0,0,0,.06)");
            line.setAttribute("stroke-width", "1");
            svg.appendChild(line);

            const dot = document.createElementNS(ns, "circle");
            dot.setAttribute("cx", String(x)); dot.setAttribute("cy", String(y));
            dot.setAttribute("r", "4");
            dot.setAttribute("fill", "#0a0a0a");
            dot.setAttribute("opacity", ".22");
            svg.appendChild(dot);

            const txt = document.createElementNS(ns, "text");
            const lx = CX + (ri + 16) * Math.cos(angle);
            const ly = CY + (ri + 16) * Math.sin(angle);
            txt.setAttribute("x", String(lx)); txt.setAttribute("y", String(ly));
            txt.setAttribute("text-anchor", "middle");
            txt.setAttribute("dominant-baseline", "middle");
            txt.setAttribute("font-family", "Inter,sans-serif");
            txt.setAttribute("font-size", "8");
            txt.setAttribute("font-weight", "500");
            txt.setAttribute("letter-spacing", "1.2");
            txt.setAttribute("fill", "rgba(0,0,0,.28)");
            txt.textContent = skill.toUpperCase();
            svg.appendChild(txt);
        });

        // Spin
        let rot = 0;
        const spin = () => {
            rot += 0.1;
            svg.style.transform = `rotate(${rot}deg)`;
            animRef.current = requestAnimationFrame(spin);
        };
        animRef.current = requestAnimationFrame(spin);
        return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
    }, []);

    return (
        <svg
            ref={svgRef}
            viewBox="0 0 300 300"
            style={{ width: "100%", height: "100%", overflow: "visible" }}
        />
    );
}

/* ─────────────────────────────────────────────
   MARQUEE
───────────────────────────────────────────── */
const STACK = [
    "Next.js", "Flutter", "AWS Lambda", "OpenAI API",
    "Firebase", "DynamoDB", "BigQuery", "PostgreSQL", "n8n", "TypeScript",
];

function Marquee() {
    const items = [...STACK, ...STACK];
    return (
        <div style={{
            borderTop: "1px solid rgba(0,0,0,.07)",
            borderBottom: "1px solid rgba(0,0,0,.07)",
            overflow: "hidden", padding: "10px 0",
            position: "relative", zIndex: 20,
        }}>
            <style>{`@keyframes hero-mqs{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
            <div style={{ display: "flex", width: "max-content", animation: "hero-mqs 22s linear infinite" }}>
                {items.map((item, i) => (
                    <span key={i} style={{
                        fontSize: "9.5px", fontWeight: 500,
                        letterSpacing: ".2em", textTransform: "uppercase",
                        color: "rgba(0,0,0,.2)", padding: "0 20px", whiteSpace: "nowrap",
                    }}>
                        {item}
                        {i < items.length - 1 && (
                            <span style={{ color: "rgba(0,0,0,.1)", marginLeft: "20px" }}>·</span>
                        )}
                    </span>
                ))}
            </div>
        </div>
    );
}

/* ─────────────────────────────────────────────
   HERO SECTION
───────────────────────────────────────────── */
export default function HeroSection() {
    const rootRef = useRef<HTMLElement>(null);
    const consRef = useRef<HTMLDivElement>(null);
    const curRef = useRef<HTMLDivElement>(null);
    const hw0Ref = useRef<HTMLSpanElement>(null);
    const hw1Ref = useRef<HTMLSpanElement>(null);
    const bn0Ref = useRef<HTMLSpanElement>(null);
    const bn1Ref = useRef<HTMLSpanElement>(null);
    const [curBig, setCurBig] = useState(false);

    useEffect(() => {
        const root = rootRef.current;
        if (!root) return;
        const onMove = (e: MouseEvent) => {
            const r = root.getBoundingClientRect();
            const x = e.clientX - r.left, y = e.clientY - r.top;
            if (curRef.current) {
                curRef.current.style.left = x + "px";
                curRef.current.style.top = y + "px";
            }
            const dx = x / r.width - 0.5, dy = y / r.height - 0.5;
            if (consRef.current)
                consRef.current.style.transform = `translate(${dx * 10}px,${dy * 7}px)`;
            [hw0Ref, hw1Ref, bn0Ref, bn1Ref].forEach((ref, i) => {
                if (ref.current)
                    ref.current.style.transform = `translateY(0) translateX(${dx * (i + 1) * 3}px)`;
            });
        };
        root.addEventListener("mousemove", onMove);
        return () => root.removeEventListener("mousemove", onMove);
    }, []);

    const headStyle: React.CSSProperties = {
        display: "block",
        fontFamily: "'Inter', sans-serif",
        fontSize: "clamp(76px, 12.5vw, 142px)",
        fontWeight: 900, color: "#0a0a0a",
        letterSpacing: "-.04em", textTransform: "uppercase",
        lineHeight: 1, transition: "transform .1s linear",
    };

    const nameStyle: React.CSSProperties = {
        display: "block",
        fontFamily: "'Inter', sans-serif",
        fontSize: "clamp(42px, 7vw, 88px)",
        fontWeight: 900, color: "#0a0a0a",
        letterSpacing: "-.04em", textTransform: "uppercase",
        lineHeight: 0.88, transition: "transform .1s linear",
    };

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;900&display=swap');

        .h-hw1{animation:h-rise .95s cubic-bezier(.16,1,.3,1) forwards;transform:translateY(110%)}
        .h-hw2{animation:h-rise .95s cubic-bezier(.16,1,.3,1) .08s forwards;transform:translateY(110%)}
        .h-bn1{animation:h-rise .95s cubic-bezier(.16,1,.3,1) .55s forwards;transform:translateY(110%)}
        .h-bn2{animation:h-rise .95s cubic-bezier(.16,1,.3,1) .63s forwards;transform:translateY(110%)}
        @keyframes h-rise{to{transform:translateY(0)}}

        .h-fin {opacity:0;animation:h-fin .5s ease forwards}
        .h-fin:nth-child(2){animation-delay:.07s}
        .h-fin:nth-child(3){animation-delay:.14s}
        .h-fin:nth-child(4){animation-delay:.21s}
        @keyframes h-fin{from{opacity:0;transform:translateY(-5px)}to{opacity:1;transform:none}}

        .h-fup {opacity:0;animation:h-fup .6s ease .65s forwards}
        .h-cons{opacity:0;animation:h-fin .9s ease .4s forwards}
        .h-mq  {opacity:0;animation:h-fup .5s ease .5s forwards}
        @keyframes h-fup{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}

        .h-btnf{background:#0a0a0a;color:#e9e7e2;border:1.5px solid #0a0a0a}
        .h-btnf:hover{background:#2a2a2a!important}
        .h-btno{background:transparent;color:#888;border:1.5px solid rgba(0,0,0,.2)}
        .h-btno:hover{border-color:#0a0a0a!important;color:#0a0a0a!important}

        @media(max-width:640px){
          .h-root{cursor:auto!important}
          .h-cur{display:none!important}
          .h-top{grid-template-columns:1fr 1fr!important}
          .h-hide{display:none!important}
          .h-cons{width:180px!important;height:180px!important;top:60px!important;right:-10px!important}
          .h-bottom{flex-direction:column!important;align-items:flex-start!important;gap:12px!important;padding-bottom:24px!important}
          .h-br{text-align:left!important;margin-right:0!important}
          .h-btns{padding-left:0!important}
        }
      `}</style>

            <section
                ref={rootRef}
                className="h-root"
                style={{
                    background: "#e9e7e2",
                    minHeight: "100vh",
                    position: "relative",
                    overflow: "hidden",
                    fontFamily: "'Inter', sans-serif",
                    cursor: "none",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                {/* Cursor */}
                <div
                    ref={curRef}
                    className="h-cur"
                    style={{
                        position: "absolute", pointerEvents: "none", zIndex: 999,
                        borderRadius: "50%",
                        background: curBig ? "rgba(10,10,14,.1)" : "#0a0a0a",
                        transform: "translate(-50%,-50%)",
                        width: curBig ? 46 : 8,
                        height: curBig ? 46 : 8,
                        transition: "width .4s cubic-bezier(.16,1,.3,1), height .4s cubic-bezier(.16,1,.3,1), background .3s",
                    }}
                />

                {/* Top nav */}
                <div
                    className="h-top"
                    style={{
                        display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr",
                        padding: "22px 32px 18px",
                        borderBottom: "1px solid rgba(0,0,0,.08)",
                        position: "relative", zIndex: 30,
                    }}
                >
                    {[
                        { main: "Ashish Yaduvanshi", sub: null, right: false, hide: false },
                        { main: "Currently at", sub: "ASOasis Tech", right: false, hide: false },
                        { main: "India", sub: "Full Stack · AI · Mobile", right: false, hide: true },
                        { main: "Work,\u00a0 Contact", sub: null, right: true, hide: false },
                    ].map((item, i) => (
                        <div
                            key={i}
                            className={`h-fin${item.hide ? " h-hide" : ""}`}
                            style={{
                                fontSize: 11, fontWeight: 400, color: "#0a0a0a",
                                lineHeight: 1.5, textAlign: item.right ? "right" : "left",
                            }}
                        >
                            {item.main}
                            {item.sub && (
                                <span style={{ display: "block", color: "#888", fontSize: 10, marginTop: 1 }}>
                                    {item.sub}
                                </span>
                            )}
                        </div>
                    ))}
                </div>

                {/* Mid */}
                <div style={{ flex: 1, position: "relative", padding: "0 32px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>

                    {/* Headline */}
                    <div style={{ paddingTop: 14, position: "relative", zIndex: 5 }}>
                        <div style={{ overflow: "hidden", lineHeight: .87 }}>
                            <span ref={hw0Ref} className="h-hw1" style={headStyle}>Full Stack</span>
                        </div>
                        <div style={{ overflow: "hidden", lineHeight: .87 }}>
                            <span ref={hw1Ref} className="h-hw2" style={headStyle}>Engineer.</span>
                        </div>
                    </div>

                    {/* Middle Strategic Focus Card (Out-of-the-box addition) */}
                    <div className="h-fup" style={{
                        position: "relative",
                        zIndex: 20,
                        maxWidth: "400px",
                        marginTop: "auto",
                        marginBottom: "auto",
                    }}>
                        {/* Background Architecture Visual (The Requested 'Some Visual') */}
                        <div style={{ position: "absolute", top: "-40px", left: "-60px", width: "400px", height: "400px", zIndex: -1, opacity: 0.04, pointerEvents: "none" }}>
                            <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="100" cy="100" r="80" stroke="black" strokeWidth="0.5" strokeDasharray="2 2" />
                                <circle cx="100" cy="100" r="40" stroke="black" strokeWidth="0.5" />
                                <path d="M100 20V180M20 100H180" stroke="black" strokeWidth="0.2" />
                                <rect x="80" y="80" width="40" height="40" stroke="black" strokeWidth="0.5" />
                                <circle cx="100" cy="20" r="2" fill="black" />
                                <circle cx="100" cy="180" r="2" fill="black" />
                                <circle cx="20" cy="100" r="2" fill="black" />
                                <circle cx="180" cy="100" r="2" fill="black" />
                                <path d="M60 60L140 140M140 60L60 140" stroke="black" strokeWidth="0.2" />
                            </svg>
                        </div>

                        <div style={{
                            background: "rgba(255,255,255,0.4)",
                            backdropFilter: "blur(20px)",
                            border: "1px solid rgba(0,0,0,0.05)",
                            padding: "32px",
                            borderRadius: "2px",
                            boxShadow: "0 20px 40px rgba(0,0,0,0.02)",
                            display: "flex",
                            flexDirection: "column",
                            gap: "16px"
                        }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                <div style={{ width: 10, height: 10, background: "#0a0a0a", borderRadius: "50%" }} />
                                <span style={{ fontSize: 10, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.2em", color: "#0a0a0a" }}>Strategic Focus</span>
                            </div>
                            <p style={{ fontSize: 13, fontWeight: 400, color: "#444", lineHeight: 1.6, letterSpacing: "-0.01em" }}>
                                Architecting high-throughput systems and AI platforms with a focus on <span style={{ color: "#0a0a0a", fontWeight: 600 }}>industrial-grade scalability</span> and operational intelligence.
                            </p>
                            <div style={{ display: "flex", gap: "12px", paddingTop: 10 }}>
                                {["AI Eng", "Cloud Native", "Product Tech"].map(tag => (
                                    <span key={tag} style={{ fontSize: 9, fontWeight: 700, color: "#888", borderBottom: "1.5px solid rgba(0,0,0,0.05)", paddingBottom: 4, textTransform: "uppercase", letterSpacing: "0.1em" }}>{tag}</span>
                                ))}
                            </div>
                        </div>

                        {/* Decorative background lines for "furnishing" */}
                        <div style={{ position: "absolute", top: "50%", left: "-60px", width: "40px", height: 1, borderTop: "1px dashed rgba(0,0,0,0.1)", zIndex: -1 }} />
                        <div style={{ position: "absolute", top: "50%", right: "-60px", width: "100vw", height: 1, borderTop: "1px solid rgba(0,0,0,0.03)", zIndex: -1 }} />
                    </div>

                    {/* Constellation — bigger, lower, more left */}
                    <div
                        ref={consRef}
                        className="h-cons"
                        style={{
                            position: "absolute",
                            top: 90,          /* shifted down */
                            right: -30,       /* shifted left */
                            width: "clamp(280px, 38%, 380px)",   /* bigger */
                            height: "clamp(280px, 38%, 380px)",
                            zIndex: 10,
                        }}
                    >
                        <Constellation />
                        <div style={{
                            position: "absolute", inset: 0,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            pointerEvents: "none",
                        }}>
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
                                <span style={{
                                    fontSize: 42,          /* bigger number */
                                    fontWeight: 900, color: "#0a0a0a",
                                    letterSpacing: "-.04em", lineHeight: 1,
                                }}>3+</span>
                                <span style={{
                                    fontSize: 10, fontWeight: 500,
                                    letterSpacing: ".18em", textTransform: "uppercase", color: "#aaa",
                                }}>yrs exp</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Marquee */}
                <div className="h-mq"><Marquee /></div>

                {/* Bottom */}
                <div
                    className="h-bottom"
                    style={{
                        padding: "18px 32px 28px",
                        display: "flex", alignItems: "flex-end",
                        justifyContent: "space-between",
                        zIndex: 20, position: "relative", gap: 20,
                    }}
                >
                    {/* Left */}
                    <div className="h-fup" style={{ display: "flex", flexDirection: "column", gap: 18, flexShrink: 0 }}>
                        <div style={{ display: "flex", gap: 18, alignItems: "flex-start" }}>
                            <span style={{ fontSize: 22, fontWeight: 300, color: "#0a0a0a", paddingTop: 2, flexShrink: 0, lineHeight: 1 }}>↓</span>
                            <div style={{ fontSize: 10.5, fontWeight: 500, letterSpacing: ".06em", textTransform: "uppercase", color: "#0a0a0a", lineHeight: 1.8 }}>
                                I build AI platforms,<br />
                                mobile apps and<br />
                                scalable systems.
                            </div>
                        </div>
                        <div className="h-btns" style={{ display: "flex", gap: 8, paddingLeft: 40 }}>
                            {[
                                { label: "Get in Touch", cls: "h-btnf" },
                                { label: "↓ Download CV", cls: "h-btno" },
                            ].map(btn => (
                                <button
                                    key={btn.label}
                                    className={btn.cls}
                                    onMouseEnter={() => setCurBig(true)}
                                    onMouseLeave={() => setCurBig(false)}
                                    style={{
                                        fontFamily: "'Inter',sans-serif",
                                        fontSize: 10, fontWeight: 600,
                                        letterSpacing: ".1em", textTransform: "uppercase",
                                        padding: "11px 20px", borderRadius: 2, cursor: "pointer",
                                        transition: "all .2s",
                                    }}
                                >
                                    {btn.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right — big name */}
                    <div className="h-br" style={{ flex: 1, textAlign: "right", overflow: "hidden", marginRight: -32 }}>
                        <div style={{ overflow: "hidden", lineHeight: .87 }}>
                            <span ref={bn0Ref} className="h-bn1" style={nameStyle}>ASHISH</span>
                        </div>
                        <div style={{ overflow: "hidden", lineHeight: .87 }}>
                            <span ref={bn1Ref} className="h-bn2" style={nameStyle}>YADUVANSHI</span>
                        </div>
                    </div>
                </div>

            </section>
        </>
    );
}