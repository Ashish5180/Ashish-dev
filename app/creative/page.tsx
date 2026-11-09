"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  Wind,
  Clapperboard,
  Eye,
  Compass,
} from "lucide-react";
import { FallingLeaves } from "@/components/ui/falling-leaves";
import { ChromaticImage } from "@/components/ui/chromatic-image";
import { SootSpriteEyeTracker } from "@/components/creative/soot-sprite-eye-tracker";

interface FilmStudy {
  id: string;
  number: string;
  title: string;
  originalTitle?: string;
  director: string;
  studio: string;
  year: string;
  tag: string;
  src: string;
  oneLiner: string;
  quote: string;
  visualLesson: string;
  palette: { name: string; hex: string }[];
}

const FEATURED_STUDIES: FilmStudy[] = [
  {
    id: "ghibli",
    number: "01",
    title: "Spirited Away",
    originalTitle: "千と千尋の神隠し",
    director: "Hayao Miyazaki",
    studio: "Studio Ghibli",
    year: "2001",
    tag: "The Art of 'Ma' & Silence",
    src: "/images/creative/polaroid-ghibli.svg",
    oneLiner: "The flooded sea train sequence: six minutes of quiet contemplation with zero dialogue.",
    quote: "If you just have non-stop action, you become numb. What you need is the intentional stillness.",
    visualLesson:
      "Miyazaki treats silence as an active narrative material. In a world full of rapid-fire stimulation, courage in art is having the confidence to leave room for the audience to breathe.",
    palette: [
      { name: "Shallow Sea", hex: "#0284c7" },
      { name: "Twilight Peach", hex: "#fed7aa" },
      { name: "Train Rust", hex: "#c2410c" },
      { name: "Lantern Gold", hex: "#fde047" },
    ],
  },
  {
    id: "spider-verse",
    number: "02",
    title: "Into the Spider-Verse",
    director: "Bob Persichetti & Peter Ramsey",
    studio: "Sony Pictures Imageworks",
    year: "2018",
    tag: "Variable 12 FPS & Halftone Art",
    src: "/images/creative/polaroid-spiderverse.svg",
    oneLiner: "Combining traditional Ben-Day printmaking dots with kinetic 3D graffiti culture.",
    quote: "It's a leap of faith. That's all it is.",
    visualLesson:
      "Miles begins animated 'on the twos' (12 FPS), feeling awkward and clumsy. Only when he makes his leap of faith does his motion graduate into fluid 24 FPS. Frame rate as character evolution.",
    palette: [
      { name: "Spray Magenta", hex: "#e11d48" },
      { name: "Halftone Cyan", hex: "#06b6d4" },
      { name: "Warning Gold", hex: "#fbbf24" },
      { name: "Ink Black", hex: "#020617" },
    ],
  },
  {
    id: "interstellar",
    number: "03",
    title: "Interstellar",
    director: "Christopher Nolan",
    studio: "Syncopy / Paramount",
    year: "2014",
    tag: "70mm IMAX Scale & The Void",
    src: "/images/creative/polaroid-interstellar.svg",
    oneLiner: "The sublime terror of human insignificance against Gargantua's golden accretion disk.",
    quote: "We used to look up at the sky and wonder at our place in the stars.",
    visualLesson:
      "Nolan cuts all audio to absolute silence for exterior space shots. Cutting Hans Zimmer's thunderous pipe organ to dead zero gives cinema infinite dynamic range.",
    palette: [
      { name: "Accretion Gold", hex: "#f59e0b" },
      { name: "Event Horizon", hex: "#000000" },
      { name: "Cosmic Amber", hex: "#d97706" },
      { name: "Photon White", hex: "#ffffff" },
    ],
  },
  {
    id: "shinkai",
    number: "04",
    title: "Your Name",
    originalTitle: "君の名は。",
    director: "Makoto Shinkai",
    studio: "CoMix Wave Films",
    year: "2016",
    tag: "The Magic Hour & Emotional Light",
    src: "/images/creative/polaroid-shinkai.svg",
    oneLiner: "Kataware-doki twilight: when the boundary between two worlds momentarily blurs.",
    quote: "Treasure the experience. Dreams fade away after you wake up.",
    visualLesson:
      "The sky is not background scenery—it is the emotional heartbeat. Ultraviolet gradients, falling meteor dust, and electric train wires turn ordinary transit into poetic longing.",
    palette: [
      { name: "Twilight Violet", hex: "#312e81" },
      { name: "Sunset Crimson", hex: "#831843" },
      { name: "Solar Orange", hex: "#ea580c" },
      { name: "Comet Cyan", hex: "#67e8f9" },
    ],
  },
];

const TASTE_PILLARS = [
  {
    title: "Cinematography & Scale",
    creators: "Christopher Nolan · Denis Villeneuve",
    insight:
      "Anamorphic 2.39:1 framing, one-point perspective, and architectural symmetry that makes every frame feel deliberate.",
  },
  {
    title: "Traditional Cel Animation",
    creators: "Hayao Miyazaki · Isao Takahata",
    insight:
      "Hand-drawn watercolor backgrounds and clouds that carry physical weight, moisture, and shifting wind currents.",
  },
  {
    title: "Kinetic & Pop-Art Craft",
    creators: "Sony Imageworks · Fortiche (Arcane)",
    insight:
      "Breaking standard 3D photorealism with oil paint textures, comic misregistrations, and deliberate frame drops.",
  },
  {
    title: "Emotional Color Grading",
    creators: "Makoto Shinkai · Wong Kar-wai",
    insight:
      "Using color temperature—warm amber twilights and melancholic blues—to communicate mood before dialogue begins.",
  },
];

export default function CreativePage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [breezeActive, setBreezeActive] = useState(false);
  const [isAvatarHovered, setIsAvatarHovered] = useState(false);

  const activeStudy = FEATURED_STUDIES[activeIndex];

  const triggerBreeze = () => {
    setBreezeActive(true);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("leaf-gust"));
    }
    setTimeout(() => setBreezeActive(false), 1200);
  };

  return (
    <main className="relative min-h-screen bg-[#faf8f5] text-[#1c1917] selection:bg-amber-600/20 selection:text-stone-900 font-sans antialiased overflow-x-hidden">
      {/* Full-Screen Falling Autumn Maple Leaves Canvas */}
      <FallingLeaves />

      {/* Top Floating Atelier Bar */}
      <header className="sticky top-0 z-40 w-full px-4 sm:px-6 lg:px-8 pt-3 sm:pt-4">
        <nav
          aria-label="Creative Atelier Navigation"
          className="mx-auto flex max-w-6xl items-center justify-between rounded-2xl border border-stone-200/90 bg-[#faf8f5]/90 px-4 py-2.5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] backdrop-blur-md"
        >
          {/* Brand Profile Picture with Simple Borderless Zoom Lens & Return Link */}
          <div
            className="relative"
            onMouseEnter={() => setIsAvatarHovered(true)}
            onMouseLeave={() => setIsAvatarHovered(false)}
          >
            <div className="flex items-center gap-2.5">
              {/* Profile Avatar Housing */}
              <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full border border-stone-300/80 bg-stone-100 shadow-2xs transition-all duration-300 group-hover:scale-105">
                <Image
                  src="/images/my.png"
                  alt="Ashish Yadav"
                  fill
                  sizes="32px"
                  priority
                  className="object-cover object-[50%_38%] transition-transform duration-300 ease-out group-hover:scale-115"
                />
              </div>

              {/* Back to Systems Engineering Portfolio */}
              <Link
                href="/"
                className="group flex items-center gap-1.5 text-xs font-mono font-medium text-stone-600 hover:text-stone-900 transition-colors"
              >
                <div className="flex h-6 w-6 items-center justify-center rounded-md border border-stone-200 bg-white shadow-2xs transition-all duration-150 group-hover:border-stone-400 group-hover:-translate-x-0.5">
                  <ArrowLeft className="h-3 w-3 text-stone-700" />
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-semibold text-stone-900">Portfolio</span>
                  <span className="text-stone-300">/</span>
                  <span className="text-stone-500">Software</span>
                </div>
              </Link>
            </div>

            {/* =========================================================================
                CLEAN BORDERLESS ZOOM LENS (NO TEXT, NO PINK, PURE IMAGE ZOOM)
               ========================================================================= */}
            <AnimatePresence>
              {isAvatarHovered && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.85, y: -4 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.85, y: -4 }}
                  transition={{ type: "spring", stiffness: 450, damping: 28 }}
                  className="pointer-events-none absolute top-11 left-0 z-50"
                >
                  {/* Borderless Circular Magnifying Lens */}
                  <div className="relative h-32 w-32 overflow-hidden rounded-full border-0 bg-[#0c1220] shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
                    <Image
                      src="/images/my.png"
                      alt="Ashish Yadav Zoom Lens"
                      fill
                      sizes="128px"
                      className="object-cover object-[50%_38%] scale-[1.7] transition-transform duration-200"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Center Atelier Label */}
          <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-stone-500">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
            <span className="text-stone-900 font-medium">Cinema &amp; Visual Reel</span>
            <span className="text-stone-300">·</span>
            <span className="text-stone-500">Ashish Yadav</span>
          </div>

          {/* Interactive Wind Trigger */}
          <button
            onClick={triggerBreeze}
            className={`group inline-flex items-center gap-2 rounded-xl border px-3 py-1.5 text-xs font-mono transition-all cursor-pointer ${
              breezeActive
                ? "border-amber-400 bg-amber-50 text-amber-900"
                : "border-stone-200 bg-white text-stone-700 hover:border-stone-300 hover:text-stone-900 shadow-2xs"
            }`}
            title="Trigger autumn breeze across falling leaves"
          >
            <Wind
              className={`h-3.5 w-3.5 text-amber-700 transition-transform duration-300 ${
                breezeActive ? "rotate-45" : "group-hover:rotate-12"
              }`}
            />
            <span className="font-medium">
              {breezeActive ? "Breeze Active" : "Autumn Breeze"}
            </span>
          </button>
        </nav>
      </header>

      {/* Main Container */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 pt-8 pb-24 sm:px-8 sm:pt-12">
        {/* =========================================================================
            HERO: INSTANT 3-SECOND UNDERSTANDING FOR RECRUITERS
           ========================================================================= */}
        <section className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-10 border-b border-stone-200/80">
          <div className="max-w-2xl">
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-stone-950 leading-[1.12]">
              Frames, Cinema &amp; Visual Storytelling
            </h1>

            <p className="mt-3.5 text-base sm:text-lg font-normal leading-relaxed text-stone-600">
              Outside of building systems, I study cinematography, Japanese cel animation, and the psychology of color. Here is how I see the visual world.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-2.5 text-xs font-mono text-stone-500">
              <span className="rounded-md border border-stone-200 bg-white/90 px-2.5 py-1 text-stone-700 font-medium">
                35mm &amp; IMAX Composition
              </span>
              <span>·</span>
              <span className="rounded-md border border-stone-200 bg-white/90 px-2.5 py-1 text-stone-700 font-medium">
                Ghibli Cel Aesthetics
              </span>
              <span>·</span>
              <span className="rounded-md border border-stone-200 bg-white/90 px-2.5 py-1 text-stone-700 font-medium">
                Color Theory
              </span>
            </div>
          </div>

          {/* Interactive Cartoon Mascot */}
          <div className="shrink-0 self-center md:self-auto">
            <SootSpriteEyeTracker />
          </div>
        </section>

        {/* =========================================================================
            THE 35mm CINEMA LIGHTBOX (OUT-OF-THE-BOX EYE CATCHER)
           ========================================================================= */}
        <section className="mt-12 sm:mt-16">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Clapperboard className="h-4 w-4 text-amber-600" />
              <h2 className="font-display text-xl font-bold tracking-tight text-stone-900">
                Interactive Screening Reel
              </h2>
            </div>
            <span className="font-mono text-xs text-stone-400">
              Select any frame below
            </span>
          </div>

          {/* Master Viewfinder Box */}
          <div className="overflow-hidden rounded-3xl border border-stone-200/90 bg-white shadow-[0_8px_32px_-8px_rgba(0,0,0,0.06)]">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              {/* Left Column: Widescreen Viewport with Chromatic Aberration */}
              <div className="lg:col-span-7 relative min-h-[300px] sm:min-h-[420px] bg-stone-950 overflow-hidden border-b lg:border-b-0 lg:border-r border-stone-100">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStudy.id}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="h-full w-full min-h-[300px] sm:min-h-[420px]"
                  >
                    <ChromaticImage
                      src={activeStudy.src}
                      alt={activeStudy.title}
                      className="h-full w-full cursor-crosshair min-h-[300px] sm:min-h-[420px]"
                      zoom={0.12}
                      displacement={0.035}
                      chromaticShift={0.015}
                      tilt={0.15}
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Subtitle pill overlay on photo bottom */}
                <div className="pointer-events-none absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between rounded-xl bg-black/60 px-4 py-2 text-xs font-mono text-white/90 backdrop-blur-md border border-white/10">
                  <span className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-amber-400" />
                    {activeStudy.director} · {activeStudy.year}
                  </span>
                  <span className="text-[11px] text-stone-300">
                    Hover for Chromatic Lens
                  </span>
                </div>
              </div>

              {/* Right Column: Frame Commentary & Lighting Palette */}
              <div className="lg:col-span-5 p-6 sm:p-8 lg:p-9 flex flex-col justify-between bg-white">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStudy.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                  >
                    {/* Header info */}
                    <div className="flex items-center justify-between text-xs font-mono text-stone-500 pb-3 border-b border-stone-100">
                      <span className="font-bold text-amber-700">
                        {activeStudy.studio}
                      </span>
                      <span className="rounded-full bg-stone-100 px-2.5 py-0.5 text-stone-600">
                        Frame {activeStudy.number} of 04
                      </span>
                    </div>

                    <h3 className="mt-4 font-display text-2xl sm:text-3xl font-bold tracking-tight text-stone-950">
                      {activeStudy.title}
                    </h3>

                    {/* Pull Quote */}
                    <div className="mt-4 rounded-xl border border-stone-100 bg-[#faf8f5] p-3.5 italic text-xs sm:text-sm text-stone-700 leading-relaxed">
                      &quot;{activeStudy.quote}&quot;
                    </div>

                    {/* Visual Breakdown */}
                    <p className="mt-4 text-xs sm:text-sm text-stone-600 leading-relaxed">
                      {activeStudy.visualLesson}
                    </p>
                  </motion.div>
                </AnimatePresence>

                {/* Palette Swatches */}
                <div className="mt-6 pt-5 border-t border-stone-100">
                  <span className="text-[11px] font-mono text-stone-400 block mb-2">
                    Signature Color Harmony:
                  </span>
                  <div className="grid grid-cols-4 gap-2">
                    {activeStudy.palette.map((swatch) => (
                      <div
                        key={swatch.name}
                        className="flex flex-col items-center gap-1"
                      >
                        <div
                          className="h-8 w-full rounded-lg border border-black/10 shadow-xs transition-transform hover:scale-105"
                          style={{ backgroundColor: swatch.hex }}
                        />
                        <span className="font-mono text-[9px] text-stone-500 truncate w-full text-center">
                          {swatch.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* =========================================================================
              THE 35mm SPROCKET FILMSTRIP SELECTOR (OUT-OF-THE-BOX INTERACTIVE ELEMENT)
             ========================================================================= */}
          <div className="mt-8 rounded-2xl border border-stone-300 bg-stone-900 p-3 sm:p-4 shadow-md">
            {/* Top Filmstrip Sprockets */}
            <div className="flex justify-between px-2 pb-2.5 border-b border-stone-800">
              {Array.from({ length: 18 }).map((_, i) => (
                <div
                  key={i}
                  className="h-2.5 w-4 rounded-xs bg-stone-950 border border-stone-800"
                />
              ))}
            </div>

            {/* Film Frames Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-3">
              {FEATURED_STUDIES.map((study, idx) => {
                const isSelected = activeIndex === idx;

                return (
                  <button
                    key={study.id}
                    onClick={() => setActiveIndex(idx)}
                    className={`group relative flex flex-col items-start overflow-hidden rounded-xl border p-2.5 text-left transition-all cursor-pointer ${
                      isSelected
                        ? "border-amber-400 bg-stone-800/90 shadow-md ring-2 ring-amber-400/30"
                        : "border-stone-800 bg-stone-950/70 hover:border-stone-600 hover:bg-stone-800/50"
                    }`}
                  >
                    {/* Thumbnail preview */}
                    <div className="relative aspect-16/10 w-full overflow-hidden rounded-lg bg-stone-950 border border-stone-800">
                      <Image
                        src={study.src}
                        alt={study.title}
                        fill
                        sizes="(max-width: 640px) 50vw, 25vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      {isSelected && (
                        <div className="absolute inset-0 bg-amber-500/10 border-2 border-amber-400 rounded-lg pointer-events-none" />
                      )}
                    </div>

                    {/* Frame text */}
                    <div className="mt-2 w-full">
                      <div className="flex items-center justify-between text-[10px] font-mono text-stone-400">
                        <span>{study.number}</span>
                        <span className="text-amber-400">{study.year}</span>
                      </div>
                      <h4
                        className={`font-display text-xs font-bold truncate mt-0.5 ${
                          isSelected ? "text-white" : "text-stone-300 group-hover:text-white"
                        }`}
                      >
                        {study.title}
                      </h4>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Bottom Filmstrip Sprockets */}
            <div className="flex justify-between px-2 pt-2.5 border-t border-stone-800">
              {Array.from({ length: 18 }).map((_, i) => (
                <div
                  key={i}
                  className="h-2.5 w-4 rounded-xs bg-stone-950 border border-stone-800"
                />
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: CREATIVE TASTE AT A GLANCE (RECRUITER SCAN IN 3-4 SECONDS)
           ========================================================================= */}
        <section className="mt-16 sm:mt-20">
          <div className="flex items-center gap-2 mb-6">
            <Compass className="h-4 w-4 text-amber-600" />
            <h2 className="font-display text-xl font-bold tracking-tight text-stone-900">
              Visual Principles &amp; Influences
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            {TASTE_PILLARS.map((pillar) => (
              <div
                key={pillar.title}
                className="rounded-2xl border border-stone-200/90 bg-white p-5 sm:p-6 shadow-xs hover:border-stone-300 transition-colors"
              >
                <div className="flex items-center justify-between text-xs font-mono text-stone-500 mb-2">
                  <span className="font-semibold text-amber-800">
                    {pillar.creators}
                  </span>
                  <Eye className="h-3.5 w-3.5 text-stone-400" />
                </div>

                <h3 className="font-display text-base font-bold text-stone-950">
                  {pillar.title}
                </h3>

                <p className="mt-2 text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                  {pillar.insight}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Minimal Footer */}
        <footer className="mt-20 border-t border-stone-200/80 pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-stone-900 text-[11px] font-mono font-bold text-white shadow-xs">
                AY
              </span>
              <p className="text-xs text-stone-500 font-mono">
                Ashish Yadav · Cinema Studies, Cel Animation &amp; Visual Arts
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono text-stone-600">
              <Link
                href="/"
                className="font-semibold text-stone-900 hover:text-amber-800 transition-colors flex items-center gap-1"
              >
                <span>← Back to Systems Portfolio</span>
              </Link>
              <span>·</span>
              <a
                href="https://github.com/Ashish5180"
                target="_blank"
                rel="noreferrer"
                className="hover:text-stone-900 transition-colors"
              >
                GitHub
              </a>
              <span>·</span>
              <a
                href="https://www.linkedin.com/in/ashishyadav001/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-stone-900 transition-colors"
              >
                LinkedIn
              </a>
              <span>·</span>
              <a
                href="https://leetcode.com/u/Developer-AshishYadav/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-stone-900 transition-colors"
              >
                LeetCode
              </a>
              <span>·</span>
              <a
                href="https://codolio.com/profile/SleepyOwl"
                target="_blank"
                rel="noreferrer"
                className="hover:text-stone-900 transition-colors"
              >
                Codolio
              </a>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
