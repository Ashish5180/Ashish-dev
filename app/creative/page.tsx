"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  Wind,
  Clapperboard,
  Eye,
  Compass,
  Menu,
  X,
  FileText,
  ArrowUpRight,
} from "lucide-react";
import { FallingLeaves } from "@/components/ui/falling-leaves";
import { ChromaticImage } from "@/components/ui/chromatic-image";
import { SootSpriteEyeTracker } from "@/components/creative/soot-sprite-eye-tracker";

function GithubIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedInIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

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

const CREATIVE_NAV_LINKS = [
  { label: "Screening Reel", href: "#reel" },
  { label: "Visual Principles", href: "#influences" },
];

export default function CreativePage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [breezeActive, setBreezeActive] = useState(false);
  const [isAvatarHovered, setIsAvatarHovered] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      <header
        className={`sticky top-0 z-40 w-full px-4 sm:px-6 lg:px-8 transition-[padding] duration-200 ${
          scrolled ? "pt-2 sm:pt-2.5" : "pt-3 sm:pt-4"
        }`}
      >
        <nav
          aria-label="Creative Atelier Navigation"
          className={`mx-auto flex max-w-6xl items-center justify-between rounded-2xl border px-3 sm:px-4 py-2 sm:py-2.5 transition-all duration-200 backdrop-blur-md ${
            scrolled
              ? "border-stone-300/90 bg-[#faf8f5]/95 shadow-[0_8px_24px_rgba(0,0,0,0.06)]"
              : "border-stone-200/90 bg-[#faf8f5]/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)]"
          }`}
        >
          {/* Brand Profile Picture with Simple Borderless Zoom Lens & Return Link */}
          <div
            className="relative"
            onMouseEnter={() => setIsAvatarHovered(true)}
            onMouseLeave={() => setIsAvatarHovered(false)}
          >
            <div className="flex items-center gap-2 sm:gap-2.5">
              {/* Profile Avatar Housing */}
              <div className="relative h-7 w-7 sm:h-8 sm:w-8 shrink-0 overflow-hidden rounded-full border border-stone-300/80 bg-stone-100 shadow-2xs transition-all duration-300 group-hover:scale-105">
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
                title="Return to Systems Engineering Portfolio"
              >
                <div className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-md border border-stone-200 bg-white shadow-2xs transition-all duration-150 group-hover:border-stone-400 group-hover:-translate-x-0.5">
                  <ArrowLeft className="h-3 w-3 text-stone-700" />
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-semibold text-stone-900">Portfolio</span>
                  <span className="text-stone-300 hidden sm:inline">/</span>
                  <span className="text-stone-500 hidden sm:inline">Software</span>
                </div>
              </Link>
            </div>

            {/* Desktop-only Borderless Zoom Lens */}
            <AnimatePresence>
              {isAvatarHovered && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.85, y: -4 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.85, y: -4 }}
                  transition={{ type: "spring", stiffness: 450, damping: 28 }}
                  className="pointer-events-none absolute top-11 left-0 z-50 hidden sm:block"
                >
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

          {/* Center Navigation Links (Desktop & Tablet) */}
          <div className="hidden md:flex items-center gap-1 rounded-xl border border-stone-200/80 bg-stone-100/60 p-1">
            {CREATIVE_NAV_LINKS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="rounded-lg px-3 py-1 font-mono text-xs font-medium text-stone-600 hover:bg-white hover:text-stone-900 hover:shadow-2xs transition-all"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Desktop Right Action Controls */}
          <div className="hidden md:flex items-center gap-2">
            {/* Interactive Autumn Breeze Button */}
            <button
              onClick={triggerBreeze}
              className={`group inline-flex items-center gap-2 rounded-xl border px-3 py-1.5 text-xs font-mono transition-all cursor-pointer ${
                breezeActive
                  ? "border-amber-400 bg-amber-50 text-amber-900 shadow-xs"
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

            {/* GitHub Profile */}
            <a
              href="https://github.com/Ashish5180"
              target="_blank"
              rel="noreferrer"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-stone-200 bg-white text-stone-600 hover:border-stone-300 hover:text-stone-900 transition-colors shadow-2xs"
              title="GitHub (@Ashish5180)"
              aria-label="GitHub Profile"
            >
              <GithubIcon className="h-3.5 w-3.5" />
            </a>

            {/* LinkedIn Profile */}
            <a
              href="https://www.linkedin.com/in/ashishyadav001/"
              target="_blank"
              rel="noreferrer"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-stone-200 bg-white text-stone-600 hover:border-stone-300 hover:text-stone-900 transition-colors shadow-2xs"
              title="LinkedIn"
              aria-label="LinkedIn Profile"
            >
              <LinkedInIcon className="h-3.5 w-3.5" />
            </a>

            {/* Hot-Pink Resume Button */}
            <a
              href="/Ashish_Yadav_Resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#ff2d7b] px-3.5 py-1.5 font-mono text-xs font-semibold text-white shadow-[0_2px_12px_rgba(255,45,123,0.3)] hover:bg-[#e6256e] active:scale-[0.98] transition-all cursor-pointer"
              title="Download Ashish's Resume (PDF)"
            >
              <FileText className="h-3.5 w-3.5" />
              <span>Resume</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-white/80" />
            </a>
          </div>

          {/* Mobile Right Actions: Quick Breeze Button + Hamburger Toggle */}
          <div className="flex items-center gap-1.5 md:hidden">
            <button
              onClick={triggerBreeze}
              className={`group inline-flex items-center gap-1.5 rounded-xl border px-2.5 py-1.5 text-xs font-mono transition-all cursor-pointer ${
                breezeActive
                  ? "border-amber-400 bg-amber-50 text-amber-900 shadow-xs"
                  : "border-stone-200 bg-white text-stone-700 hover:border-stone-300 hover:text-stone-900 shadow-2xs"
              }`}
              title="Trigger autumn breeze across falling leaves"
              aria-label="Trigger autumn breeze"
            >
              <Wind
                className={`h-3.5 w-3.5 text-amber-700 transition-transform duration-300 ${
                  breezeActive ? "rotate-45" : "group-hover:rotate-12"
                }`}
              />
              <span className="font-medium text-[11px]">
                {breezeActive ? "Breeze" : "Breeze"}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-8 w-8 items-center justify-center rounded-xl border border-stone-200 bg-white text-stone-800 shadow-2xs cursor-pointer hover:bg-stone-50 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="mx-auto mt-2 max-w-6xl overflow-hidden rounded-2xl border border-stone-200/90 bg-[#faf8f5]/95 p-3.5 shadow-[0_16px_40px_rgba(0,0,0,0.08)] backdrop-blur-xl md:hidden"
            >
              <div className="flex flex-col gap-1.5">
                {/* Drawer Header Badge */}
                <div className="flex items-center justify-between pb-2 mb-1 border-b border-stone-200/80 px-2 font-mono text-[11px] text-stone-500">
                  <span className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                    <span className="font-medium text-stone-800">Cinema &amp; Visual Reel</span>
                  </span>
                  <span className="text-stone-400">Ashish Yadav</span>
                </div>

                {/* Back to Systems Portfolio Link */}
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 rounded-xl bg-white px-3.5 py-2.5 text-xs font-mono font-medium text-stone-800 border border-stone-200 shadow-2xs hover:bg-stone-50 transition-colors"
                >
                  <ArrowLeft className="h-3.5 w-3.5 text-stone-600" />
                  <span>Return to Systems Portfolio</span>
                </Link>

                {/* Section Jump Links */}
                {CREATIVE_NAV_LINKS.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between rounded-xl px-3.5 py-2 text-xs font-medium text-stone-700 hover:bg-stone-100/70 transition-colors"
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-stone-400" />
                  </a>
                ))}

                {/* Mobile Resume CTA & Socials */}
                <div className="pt-2 mt-1 border-t border-stone-200/80 flex flex-col gap-2">
                  <a
                    href="/Ashish_Yadav_Resume.pdf"
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 rounded-xl bg-[#ff2d7b] px-4 py-2.5 font-mono text-xs font-semibold text-white shadow-[0_2px_12px_rgba(255,45,123,0.3)] hover:bg-[#e6256e] active:scale-[0.98] transition-all"
                  >
                    <FileText className="h-3.5 w-3.5" />
                    <span>View Resume (PDF)</span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-white/80" />
                  </a>

                  {/* Social links row */}
                  <div className="flex items-center justify-between pt-1 text-xs font-mono text-stone-500 px-2">
                    <span>Connect:</span>
                    <div className="flex items-center gap-3">
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
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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
        <section id="reel" className="mt-12 sm:mt-16 scroll-mt-24">
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
        <section id="influences" className="mt-16 sm:mt-20 scroll-mt-24">
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
