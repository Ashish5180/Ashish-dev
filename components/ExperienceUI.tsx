"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";

const CircularGallery = dynamic(() => import("@/components/CircularGallery"), { ssr: false });
import { EXPERIENCES, EXPERIENCE_STATS, TECH_STACK } from "@/lib/experience-data";
import { PROJECTS } from "@/lib/projects-data";
import {
  ExternalLink,
  ChevronRight,
  MapPin,
  Calendar,
  Plus,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════════════
   CSS
   ═══════════════════════════════════════════════════════════════════ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&display=swap');

.xp * { box-sizing: border-box; }

/* ── GALLERY HERO ── */
.xp-gallery-hero {
  width: 100%;
  position: relative;
  background: linear-gradient(135deg, #f8f6f3 0%, #ede9e3 50%, #f5f2ee 100%);
  overflow: hidden;
}
.xp-gallery-container {
  width: 100%;
  height: 520px;
  position: relative;
}
@media (max-width: 768px) {
  .xp-gallery-container { height: 400px; }
}
.xp-glass-card {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 20px;
  padding: clamp(24px, 3vw, 40px);
  max-width: 420px;
  width: 90%;
  text-align: center;
  pointer-events: none;
  box-shadow: 0 8px 32px rgba(0,0,0,.06), inset 0 1px 0 rgba(255,255,255,.4);
}
@media (max-width: 768px) {
  .xp-glass-card {
    max-width: 320px;
    padding: 20px;
    border-radius: 16px;
  }
}
.xp-glass-tag {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(192, 57, 43, 0.1);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(192, 57, 43, 0.15);
  padding: 5px 14px;
  border-radius: 20px;
  margin-bottom: 16px;
}
.xp-scroll-hint {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(255,255,255,.6);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(0,0,0,.06);
  padding: 8px 20px;
  border-radius: 24px;
}

/* ── EXPERIENCE CARDS ── */
.xp-exp-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0;
  width: 100%;
}
.xp-exp-card {
  width: 100%;
  border-bottom: 1px solid rgba(0,0,0,.06);
  position: relative;
  overflow: hidden;
}
.xp-exp-inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  min-height: 0;
}
/* Alternate: even cards swap column order */
.xp-exp-card:nth-child(even) .xp-exp-inner {
  direction: rtl;
}
.xp-exp-card:nth-child(even) .xp-exp-inner > * {
  direction: ltr;
}
.xp-exp-card:nth-child(even) .xp-exp-left .xp-corner-accent {
  left: auto; right: 0;
}
@media (max-width: 768px) {
  .xp-exp-inner { grid-template-columns: 1fr; }
  .xp-exp-card:nth-child(even) .xp-exp-inner { direction: ltr; }
}
.xp-exp-left {
  background: #111;
  color: #fff;
  padding: clamp(28px, 3.5vw, 44px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
}
.xp-exp-right {
  background: #fafaf8;
  padding: clamp(28px, 3.5vw, 44px);
}
.xp-badge-current {
  background: #c0392b; color: #fff;
  font-family: 'Outfit', sans-serif;
  font-size: 8px; font-weight: 800;
  letter-spacing: .2em; text-transform: uppercase;
  padding: 5px 14px; border-radius: 4px;
  display: inline-block;
}
.xp-badge-other {
  background: rgba(255,255,255,.08); color: rgba(255,255,255,.5);
  font-family: 'Outfit', sans-serif;
  font-size: 8px; font-weight: 800;
  letter-spacing: .2em; text-transform: uppercase;
  padding: 5px 14px; border-radius: 4px;
  display: inline-block;
}
.xp-highlight-row {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 10px 0;
  border-bottom: 1px solid rgba(0,0,0,.04);
}
.xp-highlight-row:last-child { border-bottom: none; }

/* ── PROJECTS ── */
.xp-proj {
  border-bottom: 1px solid rgba(0,0,0,.06);
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.xp-proj::before {
  content: '';
  position: absolute; inset: 0;
  background: linear-gradient(135deg, rgba(192,57,43,.015), rgba(0,0,0,.01));
  transform: scaleY(0); transform-origin: bottom;
  transition: transform .5s cubic-bezier(.25,.8,.25,1);
}
.xp-proj:hover::before { transform: scaleY(1); }
.xp-proj-num {
  font-family: 'Outfit', sans-serif;
  font-size: clamp(48px, 7vw, 80px);
  font-weight: 900;
  letter-spacing: -.06em;
  line-height: 1;
  color: rgba(0,0,0,.04);
  transition: color .4s;
  user-select: none;
  flex-shrink: 0;
}
.xp-proj:hover .xp-proj-num { color: rgba(192,57,43,.08); }
.xp-proj-title {
  font-family: 'Outfit', sans-serif;
  font-size: clamp(22px, 3.5vw, 36px);
  font-weight: 800;
  letter-spacing: -.03em;
  color: #111;
  transition: transform .4s;
  margin: 0;
}
.xp-proj:hover .xp-proj-title { transform: translateX(6px); }
.xp-proj-detail-grid {
  display: grid;
  grid-template-columns: 1fr 260px;
  gap: 40px;
}
@media (max-width: 768px) {
  .xp-proj-detail-grid { grid-template-columns: 1fr; gap: 24px; }
}

/* ── TECH MARQUEE ── */
@keyframes xp-marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
.xp-marquee-track {
  display: flex; gap: 12px;
  animation: xp-marquee 30s linear infinite;
  width: max-content;
}
.xp-marquee-track:hover { animation-play-state: paused; }
`;

/* ═══════════════════════════════════════════════════════════════════
   GALLERY DATA
   ═══════════════════════════════════════════════════════════════════ */
const GALLERY_ITEMS = [
  { image: "/img1.jpeg", text: "Always Shipping" },
  { image: "/img2.jpeg", text: "The Vision" },
  { image: "/img3.jpeg", text: "Built Different" },
  { image: "/img4.jpeg", text: "Never Settle" },
  { image: "/img2.jpeg", text: "Scale Minded" },
  { image: "/img3.jpeg", text: "Problem Solver" },
  { image: "/img1.jpeg", text: "Full Stack" },
  { image: "/img4.jpeg", text: "Ship Fast" },
];

const THOUGHTS = [
  { text: "Code is craft.\nI treat every system like architecture.", accent: "10+ production apps shipped" },
  { text: "I don’t build to learn.\nI learn to build what matters.", accent: "20,000+ users served" },
  { text: "From factory ERPs\nto AI companions —\nI solve real problems.", accent: "40 min saved per order" },
  { text: "Speed without quality\nis just noise.\nI deliver both.", accent: "95+ Lighthouse score" },
];

/* ═══════════════════════════════════════════════════════════════════
   SECTION 1 — CIRCULAR GALLERY HERO
   3D WebGL gallery with glassmorphism overlay thoughts
   ═══════════════════════════════════════════════════════════════════ */
function GalleryHero() {
  const [thoughtIdx, setThoughtIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setThoughtIdx(p => (p + 1) % THOUGHTS.length), 4500);
    return () => clearInterval(t);
  }, []);

  const thought = THOUGHTS[thoughtIdx];

  return (
    <section className="xp-gallery-hero">
      {/* Subtle dot pattern */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.03, pointerEvents: "none",
        backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }} />

      {/* CircularGallery */}
      <div className="xp-gallery-container">
        <CircularGallery
          items={GALLERY_ITEMS}
          bend={1}
          textColor="#888888"
          borderRadius={0.05}
          scrollSpeed={2}
          scrollEase={0.05}
        />

        {/* Glassmorphism overlay card */}
        <div className="xp-glass-card">
          {/* Tag */}
          <div className="xp-glass-tag">
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#c0392b" }} />
            <span style={{
              fontFamily: "'Outfit', sans-serif", fontSize: 9, fontWeight: 800,
              letterSpacing: ".2em", textTransform: "uppercase", color: "#c0392b",
            }}>
              Why I&apos;m Built Different
            </span>
          </div>

          {/* Animated thought */}
          <AnimatePresence mode="wait">
            <motion.div
              key={thoughtIdx}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45, ease: [0.25, 0.8, 0.25, 1] }}
            >
              <p style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "clamp(18px, 2.5vw, 24px)",
                fontWeight: 800,
                letterSpacing: "-.02em",
                color: "#1a1a1a",
                lineHeight: 1.35,
                margin: "0 0 14px",
                whiteSpace: "pre-line",
              }}>
                {thought.text}
              </p>
              <span style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: 11, fontWeight: 700,
                letterSpacing: ".1em", textTransform: "uppercase",
                color: "#c0392b",
              }}>
                {thought.accent}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="xp-scroll-hint">
        <span style={{
          fontFamily: "'Outfit', sans-serif", fontSize: 9, fontWeight: 700,
          letterSpacing: ".15em", textTransform: "uppercase", color: "#999",
        }}>
          Drag to explore
        </span>
        <svg width="16" height="10" viewBox="0 0 16 10" fill="none" style={{ opacity: 0.4 }}>
          <path d="M1 1L8 8L15 1" stroke="#999" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   COUNTER
   ═══════════════════════════════════════════════════════════════════ */
function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, { once: true });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf: number;
    const dur = 1400;
    const t0 = performance.now();
    const ease = (t: number) => 1 - Math.pow(1 - t, 4);
    const tick = (now: number) => {
      const p = Math.min((now - t0) / dur, 1);
      setVal(Math.round(ease(p) * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target]);

  return <span ref={ref}>{val}{suffix}</span>;
}

/* ═══════════════════════════════════════════════════════════════════
   SECTION 2 — EXPERIENCE
   Split card: Black left panel (company info) + white right (highlights)
   Black, white, red only
   ═══════════════════════════════════════════════════════════════════ */
function ExperienceCard({ exp, index }: { exp: typeof EXPERIENCES[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [showAll, setShowAll] = useState(false);
  const visibleHighlights = showAll ? exp.highlights : exp.highlights.slice(0, 4);

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="xp-exp-card"
    >
      <div className="xp-exp-inner">
        {/* LEFT — Black panel */}
        <div className="xp-exp-left">
          {/* Decorative corner accent */}
          <div className="xp-corner-accent" style={{
            position: "absolute", top: 0, left: 0, width: 60, height: 3,
            background: "#c0392b",
          }} />

          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
            <span className={exp.badge === "Current Role" ? "xp-badge-current" : "xp-badge-other"}>
              {exp.badge}
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: 4, color: "rgba(255,255,255,.3)" }}>
              <Calendar size={10} />
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 10 }}>{exp.duration}</span>
            </div>
          </div>

          <h3 style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "clamp(32px, 5vw, 48px)",
            fontWeight: 900, letterSpacing: "-.04em",
            color: "#fff", lineHeight: 1.05,
            margin: "0 0 4px",
          }}>
            {exp.company}
            <span style={{ color: "#c0392b" }}>.</span>
          </h3>

          <p style={{
            fontFamily: "'Outfit', sans-serif", fontSize: 11, fontWeight: 600,
            letterSpacing: ".08em", textTransform: "uppercase",
            color: "rgba(255,255,255,.35)", margin: "0 0 4px",
          }}>
            {exp.role} — {exp.type}
          </p>

          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 4, color: "rgba(255,255,255,.25)" }}>
              <MapPin size={10} />
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 10 }}>{exp.location}</span>
            </div>
            {exp.website && (
              <a href={exp.website} target="_blank" rel="noopener noreferrer" style={{
                display: "inline-flex", alignItems: "center", gap: 4,
                fontFamily: "'Outfit', sans-serif", fontSize: 9, fontWeight: 700,
                letterSpacing: ".1em", textTransform: "uppercase",
                color: "#c0392b", textDecoration: "none",
              }}>
                <ExternalLink size={9} /> Website
              </a>
            )}
          </div>

          <p style={{
            fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 400,
            color: "rgba(255,255,255,.45)", lineHeight: 1.7, margin: 0,
            maxWidth: 420,
          }}>
            {exp.tagline}
          </p>

          {/* Active status */}
          <div style={{
            display: "flex", alignItems: "center", gap: 8, marginTop: 18,
            paddingTop: 14, borderTop: "1px solid rgba(255,255,255,.06)",
          }}>
            <div style={{
              width: 6, height: 6, borderRadius: "50%",
              background: exp.badge === "Current Role" ? "#2ecc71" : "rgba(255,255,255,.15)",
              boxShadow: exp.badge === "Current Role" ? "0 0 10px rgba(46,204,113,.5)" : "none",
            }} />
            <span style={{
              fontFamily: "'Outfit', sans-serif", fontSize: 9, fontWeight: 700,
              letterSpacing: ".12em", textTransform: "uppercase",
              color: exp.badge === "Current Role" ? "#2ecc71" : "rgba(255,255,255,.2)",
            }}>
              {exp.badge === "Current Role" ? "Currently Active" : "Completed"}
            </span>
          </div>
        </div>

        {/* RIGHT — White panel with highlights */}
        <div className="xp-exp-right">
          <div style={{
            fontFamily: "'Outfit', sans-serif", fontSize: 9, fontWeight: 800,
            letterSpacing: ".2em", textTransform: "uppercase", color: "#ccc",
            marginBottom: 14,
          }}>
            Key Contributions · {exp.highlights.length}
          </div>

          {visibleHighlights.map((h, hi) => (
            <div key={hi} className="xp-highlight-row">
              {/* Red dot */}
              <div style={{
                width: 6, height: 6, borderRadius: "50%", marginTop: 7, flexShrink: 0,
                background: hi === 0 ? "#c0392b" : "rgba(0,0,0,.1)",
                boxShadow: hi === 0 ? "0 0 6px rgba(192,57,43,.3)" : "none",
              }} />

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  fontFamily: "'Outfit', sans-serif", fontSize: 13, fontWeight: 700,
                  color: "#1a1a1a", lineHeight: 1.3, marginBottom: 4,
                }}>
                  {h.title}
                </div>
                <div style={{
                  fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 400,
                  color: "#888", lineHeight: 1.6, marginBottom: 8,
                }}>
                  {h.detail}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                  {h.tags.map((tag, ti) => (
                    <span key={ti} style={{
                      fontFamily: "'Outfit', sans-serif", fontSize: 9, fontWeight: 700,
                      color: "#c0392b", background: "rgba(192,57,43,.04)",
                      border: "1px solid rgba(192,57,43,.08)",
                      padding: "3px 8px", borderRadius: 4,
                      letterSpacing: ".04em",
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {exp.highlights.length > 4 && (
            <button
              onClick={() => setShowAll(!showAll)}
              style={{
                display: "flex", alignItems: "center", gap: 6, marginTop: 12,
                fontFamily: "'Outfit', sans-serif", fontSize: 10, fontWeight: 700,
                letterSpacing: ".1em", textTransform: "uppercase",
                color: "#c0392b", border: "none", background: "none",
                cursor: "pointer", padding: "8px 0",
              }}
            >
              <ChevronRight size={10} style={{ transform: showAll ? "rotate(90deg)" : "none", transition: "transform .2s" }} />
              {showAll ? "Show Less" : `+ ${exp.highlights.length - 4} More`}
            </button>
          )}
        </div>
      </div>
    </motion.article>
  );
}

function ExperienceSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-40px" });

  return (
    <section style={{ background: "#FAFAF8", padding: "clamp(40px, 5vw, 64px) 0 0" }}>
      {/* Header */}
      <div ref={ref} style={{ padding: "0 clamp(24px, 5vw, 64px)", marginBottom: 28 }}>
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}
        >
          <div style={{ width: 32, height: 2, background: "#c0392b" }} />
          <span style={{
            fontFamily: "'Outfit', sans-serif", fontSize: 10, fontWeight: 700,
            letterSpacing: ".25em", textTransform: "uppercase", color: "#bbb",
          }}>
            Where I&apos;ve Made Impact
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.08 }}
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "clamp(36px, 6vw, 56px)",
            fontWeight: 900, letterSpacing: "-.04em",
            color: "#111", lineHeight: 1.05, margin: "0 0 12px",
          }}
        >
          Professional<br />
          <span style={{ color: "#c0392b" }}>Experience</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.16 }}
          style={{
            fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 400,
            lineHeight: 1.7, color: "#999", maxWidth: 480, margin: 0,
          }}
        >
          Production systems. Real users. Measurable outcomes. Every role is a case study.
        </motion.p>
      </div>

      {/* Experience cards — full width split design */}
      <div className="xp-exp-grid">
        {EXPERIENCES.map((exp, i) => (
          <ExperienceCard key={exp.id} exp={exp} index={i} />
        ))}
      </div>

      {/* Stats strip */}
      <div ref={statsRef} style={{ padding: "32px clamp(24px, 5vw, 64px) 0" }}>
        <div style={{
          display: "flex", flexWrap: "wrap",
          background: "#111", borderRadius: 16,
          overflow: "hidden",
        }}>
          {EXPERIENCE_STATS.map((stat, i) => {
            const numMatch = stat.value.match(/(\d+)/);
            const numericVal = numMatch ? parseInt(numMatch[1]) : 0;
            const prefix = stat.value.match(/^[<>]/) ? stat.value[0] : "";
            const suffix = stat.value.replace(/^[<>]?\d+/, "");
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                style={{
                  flex: "1 1 120px", padding: "28px 16px", textAlign: "center",
                  borderRight: i < EXPERIENCE_STATS.length - 1 ? "1px solid rgba(255,255,255,.06)" : "none",
                }}
              >
                <div style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "clamp(24px, 3vw, 34px)",
                  fontWeight: 900, letterSpacing: "-.03em",
                  color: "#c0392b", lineHeight: 1,
                }}>
                  {prefix}<Counter target={numericVal} suffix={suffix} />
                </div>
                <div style={{
                  fontFamily: "'Inter', sans-serif", fontSize: 9, fontWeight: 600,
                  letterSpacing: ".12em", textTransform: "uppercase",
                  color: "rgba(255,255,255,.3)", marginTop: 6,
                }}>
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SECTION 3 — PROJECTS
   Full-width accordion panels with giant numbers
   ═══════════════════════════════════════════════════════════════════ */
function ProjectPanel({ project, index }: { project: typeof PROJECTS[0]; index: number }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="xp-proj"
      onClick={() => setOpen(!open)}
    >
      <div style={{ position: "relative", zIndex: 1, padding: "clamp(24px, 3.5vw, 44px) clamp(24px, 5vw, 64px)" }}>
        {/* Main row */}
        <div style={{ display: "flex", alignItems: "center", gap: "clamp(16px, 3vw, 36px)" }}>
          <span className="xp-proj-num">{project.num}</span>

          <div style={{ flex: 1, minWidth: 0 }}>
            <h3 className="xp-proj-title">{project.title}</h3>
            <span style={{
              fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 400, color: "#999",
            }}>
              {project.subtitle}
            </span>
          </div>

          {/* Toggle button */}
          <div style={{
            width: 40, height: 40, borderRadius: "50%",
            border: `1.5px solid ${open ? "#c0392b" : "rgba(0,0,0,.1)"}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all .4s", background: open ? "#c0392b" : "transparent",
            flexShrink: 0,
          }}>
            <motion.div animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.3 }}>
              <Plus size={16} color={open ? "#fff" : "#999"} strokeWidth={2} />
            </motion.div>
          </div>
        </div>

        {/* Expanded */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.25, 0.8, 0.25, 1] }}
              style={{ overflow: "hidden" }}
              onClick={e => e.stopPropagation()}
            >
              <div style={{ paddingTop: 28, paddingLeft: "clamp(0px, 5vw, 80px)" }}>
                {/* Description */}
                <p style={{
                  fontFamily: "'Inter', sans-serif", fontSize: 15, lineHeight: 1.8,
                  color: "#555", maxWidth: 650, margin: "0 0 28px",
                }}>
                  {project.description}
                </p>

                <div className="xp-proj-detail-grid">
                  {/* Highlights */}
                  <div>
                    <div style={{
                      fontFamily: "'Outfit', sans-serif", fontSize: 9, fontWeight: 800,
                      letterSpacing: ".18em", textTransform: "uppercase", color: "#ccc",
                      marginBottom: 16,
                    }}>
                      Engineering Details
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                      {project.highlights.map((h, hi) => (
                        <motion.div
                          key={hi}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.15 + hi * 0.06 }}
                          style={{
                            display: "flex", alignItems: "flex-start", gap: 10,
                          }}
                        >
                          <div style={{
                            width: 5, height: 5, borderRadius: "50%", marginTop: 7, flexShrink: 0,
                            background: hi === 0 ? "#c0392b" : "rgba(0,0,0,.1)",
                          }} />
                          <span style={{
                            fontFamily: "'Inter', sans-serif", fontSize: 12.5,
                            color: "#555", lineHeight: 1.6,
                          }}>
                            {h}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Stack */}
                  <div>
                    <div style={{
                      fontFamily: "'Outfit', sans-serif", fontSize: 9, fontWeight: 800,
                      letterSpacing: ".18em", textTransform: "uppercase", color: "#ccc",
                      marginBottom: 16,
                    }}>
                      Tech Stack
                    </div>
                    <div style={{
                      fontFamily: "'Outfit', sans-serif", fontSize: 12, fontWeight: 600,
                      color: "#777", lineHeight: 1.8,
                      padding: "14px 18px", borderRadius: 10,
                      background: "rgba(0,0,0,.02)", border: "1px solid rgba(0,0,0,.04)",
                    }}>
                      {project.stack}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function ProjectsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section style={{ background: "#FAFAF8", padding: "clamp(40px, 5vw, 64px) 0 0" }}>
      <div ref={ref} style={{ padding: "0 clamp(24px, 5vw, 64px)", marginBottom: 28 }}>
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}
        >
          <div style={{ width: 32, height: 2, background: "#111" }} />
          <span style={{
            fontFamily: "'Outfit', sans-serif", fontSize: 10, fontWeight: 700,
            letterSpacing: ".25em", textTransform: "uppercase", color: "#bbb",
          }}>
            Side Projects
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.08 }}
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "clamp(36px, 6vw, 56px)",
            fontWeight: 900, letterSpacing: "-.04em",
            color: "#111", lineHeight: 1.05, margin: "0 0 12px",
          }}
        >
          Built to<br />
          <span style={{ color: "#c0392b" }}>prove the point.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.16 }}
          style={{
            fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 400,
            lineHeight: 1.7, color: "#999", maxWidth: 480, margin: 0,
          }}
        >
          Production-grade architecture. Not tutorials, not clones — systems built to ship.
        </motion.p>
      </div>

      {/* Project count header */}
      <div style={{
        padding: "0 clamp(24px, 5vw, 64px)", display: "flex", justifyContent: "space-between",
        borderBottom: "1px solid rgba(0,0,0,.06)", paddingBottom: 14,
      }}>
        <span style={{
          fontFamily: "'Outfit', sans-serif", fontSize: 9, fontWeight: 700,
          letterSpacing: ".2em", textTransform: "uppercase", color: "#ccc",
        }}>Project</span>
        <span style={{
          fontFamily: "'Outfit', sans-serif", fontSize: 9, fontWeight: 700,
          letterSpacing: ".2em", textTransform: "uppercase", color: "#ccc",
        }}>{PROJECTS.length} Total</span>
      </div>

      {PROJECTS.map((p, i) => (
        <ProjectPanel key={p.id} project={p} index={i} />
      ))}
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SECTION 4 — TECH MARQUEE
   ═══════════════════════════════════════════════════════════════════ */
function TechMarquee() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const doubled = [...TECH_STACK, ...TECH_STACK];

  return (
    <section ref={ref} style={{ background: "#FAFAF8", padding: "clamp(40px, 5vw, 64px) 0 56px", overflow: "hidden" }}>
      <div style={{ padding: "0 clamp(24px, 5vw, 64px)", marginBottom: 24 }}>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}
        >
          <div style={{ width: 32, height: 2, background: "#111" }} />
          <span style={{
            fontFamily: "'Outfit', sans-serif", fontSize: 10, fontWeight: 700,
            letterSpacing: ".22em", textTransform: "uppercase", color: "#111",
          }}>
            Tech Arsenal
          </span>
        </motion.div>
      </div>

      <div style={{ overflow: "hidden", padding: "16px 0" }}>
        <div className="xp-marquee-track">
          {doubled.map((tech, i) => (
            <span key={i} style={{
              fontFamily: "'Outfit', sans-serif", fontSize: 13, fontWeight: 600,
              color: "#888", padding: "10px 22px", borderRadius: 10,
              background: "#fff", border: "1px solid rgba(0,0,0,.06)",
              whiteSpace: "nowrap", transition: "all .3s", cursor: "default", flexShrink: 0,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = "#111";
              e.currentTarget.style.color = "#fff";
              e.currentTarget.style.borderColor = "#111";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "#fff";
              e.currentTarget.style.color = "#888";
              e.currentTarget.style.borderColor = "rgba(0,0,0,.06)";
              e.currentTarget.style.transform = "none";
            }}>
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* End */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 56 }}>
        <div style={{ width: 1, height: 40, background: "linear-gradient(180deg, rgba(192,57,43,.12), transparent)" }} />
        <span style={{
          fontFamily: "'Outfit', sans-serif", fontSize: 8, fontWeight: 700,
          letterSpacing: ".4em", textTransform: "uppercase", color: "#ccc", marginTop: 12,
        }}>
          Always Shipping
        </span>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN EXPORT
   ═══════════════════════════════════════════════════════════════════ */
export function ExperienceUI() {
  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="xp" style={{ background: "#FAFAF8", minHeight: "100vh" }}>
      <style>{CSS}</style>

      {/* Scroll progress */}
      <motion.div style={{
        position: "fixed", top: 0, left: 0, height: 2,
        width: progressWidth,
        background: "linear-gradient(90deg, #c0392b, #e74c3c)",
        zIndex: 100,
      }} />

      <GalleryHero />
      <ExperienceSection />
      <ProjectsSection />
      <TechMarquee />
    </div>
  );
}
