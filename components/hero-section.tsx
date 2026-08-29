"use client";

import React, { useState } from "react";
import { CloudShader } from "@/components/ui/cloud-shader";
import {
  ArrowRight,
  FileText,
  Compass,
  Layers,
  DownloadCloud,
  Zap,
  Palette,
} from "lucide-react";

export interface HeroSectionProps {
  className?: string;
}

const PRESETS = [
  {
    id: "azure",
    label: "Azure Noon",
    skyTopColor: "#1d4ed8",
    skyBottomColor: "#93c5fd",
    cloudColor: "#ffffff",
    speed: 1,
    count: 6,
  },
  {
    id: "midnight",
    label: "Cosmic Deep",
    skyTopColor: "#0f172a",
    skyBottomColor: "#334155",
    cloudColor: "#94a3b8",
    speed: 0.6,
    count: 4,
  },
];

const TECH_STACK = [
  "GO",
  "AWS",
  "REACT",
  "NEXT.JS",
  "DISTRIBUTED SYSTEMS",
  "AI",
];

export function HeroSection({ className = "" }: HeroSectionProps) {
  const [activePreset, setActivePreset] = useState(PRESETS[0]);

  return (
    <section
      aria-label="Hero Section"
      className={`relative min-h-screen w-full overflow-hidden bg-slate-950 text-white ${className}`}
    >
      {/* CloudShader Background Canvas */}
      <CloudShader
        className="fixed inset-0 h-screen w-screen"
        speed={activePreset.speed}
        count={activePreset.count}
        skyTopColor={activePreset.skyTopColor}
        skyBottomColor={activePreset.skyBottomColor}
        cloudColor={activePreset.cloudColor}
      />

      {/* Atmospheric Contrast Overlay */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-gradient-to-b from-black/35 via-black/15 to-black/60" />

      {/* Hero Foreground Content */}
      <div className="relative z-10 flex min-h-screen flex-col justify-between px-4 pt-28 pb-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center text-center">
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-950/40 px-4 py-1.5 text-xs font-semibold tracking-wider uppercase text-sky-200 shadow-[0_4px_16px_0_rgba(0,0,0,0.2)] backdrop-blur-md transition-all hover:bg-sky-900/40 sm:text-xs">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-sky-400"></span>
            </span>
            <span>Full-Stack Engineer · Go · AI · Distributed Systems</span>
          </div>

          {/* Headline */}
          <h1 className="mt-6 max-w-3xl text-balance text-4xl font-extrabold tracking-tight text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.45)] sm:text-6xl md:text-7xl">
            I’m Ashish Yadav.
            <br />
            <span className="bg-gradient-to-r from-white via-sky-100 to-sky-300 bg-clip-text text-transparent">
              I Build Fast Systems for
            </span>
            <br />
            <span>Problems That Don’t Stay Small.</span>
          </h1>

          {/* Subheadline */}
          <p className="mt-6 max-w-2xl text-pretty text-base font-normal leading-relaxed text-sky-100/90 drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)] sm:text-lg md:text-xl">
            I’m a Full-Stack Engineer focused on Go, distributed systems, cloud
            infrastructure, and production AI. I’ve architected systems across 50+
            product domains and shipped AI infrastructure for a 100K+ download
            app with sub-200ms backend latency.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex w-full flex-col items-center justify-center gap-3.5 sm:w-auto sm:flex-row">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="group flex h-12 w-full items-center justify-center gap-2.5 rounded-xl bg-white px-7 text-base font-semibold text-slate-900 shadow-[0_8px_24px_rgba(255,255,255,0.3)] transition-all duration-300 hover:scale-[1.02] hover:bg-sky-50 hover:shadow-[0_12px_32px_rgba(255,255,255,0.45)] active:scale-95 sm:w-auto"
            >
              <FileText className="h-4 w-4" />
              <span>View Resume</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>

            <a
              href="#projects"
              className="group flex h-12 w-full items-center justify-center gap-2.5 rounded-xl border border-white/30 bg-white/10 px-7 text-base font-medium text-white shadow-[0_8px_24px_rgba(0,0,0,0.15)] backdrop-blur-xl transition-all duration-300 hover:border-white/50 hover:bg-white/20 active:scale-95 sm:w-auto"
            >
              <Compass className="h-4 w-4 text-sky-200 transition-transform group-hover:scale-110" />
              <span>Explore My Work</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>

          {/* Atmosphere Theme Switcher (Subtle Frosted Pill) */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 rounded-2xl border border-white/20 bg-black/25 p-1.5 shadow-[0_8px_32px_0_rgba(0,0,0,0.25)] backdrop-blur-xl">
            <span className="flex items-center gap-1.5 px-3 text-xs font-semibold uppercase tracking-wider text-sky-200/80">
              <Palette className="h-3.5 w-3.5" />
              Theme:
            </span>
            {PRESETS.map((preset) => {
              const isActive = activePreset.id === preset.id;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => setActivePreset(preset)}
                  className={`flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-medium transition-all duration-200 ${isActive
                      ? "border border-white/40 bg-white/30 text-white shadow-md backdrop-blur-lg"
                      : "text-white/70 hover:bg-white/10 hover:text-white"
                    }`}
                >
                  <span
                    className="h-2.5 w-2.5 rounded-full border border-white/50 shadow-sm"
                    style={{ backgroundColor: preset.skyBottomColor }}
                  />
                  {preset.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ========================================================= */}
        {/* Bottom Section: Stat Cards + Tech Stack Ticker Bar */}
        {/* ========================================================= */}
        <div className="mx-auto mt-10 w-full max-w-4xl space-y-4">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {/* Stat 1 */}
            <div className="group flex flex-col items-center justify-center rounded-2xl border border-white/20 bg-white/10 p-5 text-center shadow-[0_8px_24px_rgba(0,0,0,0.15)] backdrop-blur-xl transition-all duration-300 hover:border-white/40 hover:bg-white/15 dark:border-white/10 dark:bg-black/30">
              <div className="flex items-center gap-2">
                <Layers className="h-5 w-5 text-sky-300" />
                <span className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                  50+
                </span>
              </div>
              <span className="mt-1 text-sm font-medium text-sky-100/90">
                Product Domains
              </span>
            </div>

            {/* Stat 2 */}
            <div className="group flex flex-col items-center justify-center rounded-2xl border border-white/20 bg-white/10 p-5 text-center shadow-[0_8px_24px_rgba(0,0,0,0.15)] backdrop-blur-xl transition-all duration-300 hover:border-white/40 hover:bg-white/15 dark:border-white/10 dark:bg-black/30">
              <div className="flex items-center gap-2">
                <DownloadCloud className="h-5 w-5 text-amber-300" />
                <span className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                  100K+
                </span>
              </div>
              <span className="mt-1 text-sm font-medium text-sky-100/90">
                App Downloads
              </span>
            </div>

            {/* Stat 3 */}
            <div className="group flex flex-col items-center justify-center rounded-2xl border border-white/20 bg-white/10 p-5 text-center shadow-[0_8px_24px_rgba(0,0,0,0.15)] backdrop-blur-xl transition-all duration-300 hover:border-white/40 hover:bg-white/15 dark:border-white/10 dark:bg-black/30">
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-emerald-300" />
                <span className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                  &lt;200ms
                </span>
              </div>
              <span className="mt-1 text-sm font-medium text-sky-100/90">
                AI Backend Latency
              </span>
            </div>
          </div>

          {/* Tech Stack Ticker Pill Bar */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 rounded-2xl border border-white/15 bg-white/5 px-6 py-3 text-center text-xs font-semibold tracking-wider text-sky-200/90 shadow-inner backdrop-blur-md sm:text-sm">
            {TECH_STACK.map((tech, index) => (
              <React.Fragment key={tech}>
                <span className="transition-colors hover:text-white">{tech}</span>
                {index < TECH_STACK.length - 1 && (
                  <span className="text-white/30">•</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
