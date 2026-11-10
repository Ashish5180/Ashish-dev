"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, FileText, ArrowUpRight } from "lucide-react";
import { HeroSystemCockpit } from "@/components/hero-system-cockpit";

export interface HeroSectionProps {
  className?: string;
}

export function HeroSection({ className = "" }: HeroSectionProps) {
  return (
    <section
      aria-label="Hero"
      className={`relative min-h-screen w-full overflow-hidden bg-transparent ${className}`}
    >
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-between px-4 pt-24 pb-10 sm:px-8 sm:pt-36 sm:pb-12 lg:px-12">
        {/* Main Grid: Left Stance + Right Workbench */}
        <div className="my-auto grid grid-cols-1 items-center gap-10 py-6 lg:grid-cols-12 lg:gap-14">
          {/* Left Column: Authoritative Technical Narrative */}
          <div className="flex flex-col lg:col-span-6 xl:col-span-6">
            {/* Minimal Status Eyebrow Badge */}
            <div className="mb-4 inline-flex items-center gap-2 self-start rounded-full border border-white/[0.08] bg-[#0c1220]/80 px-3 py-1 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-sky-400" />
              </span>
              <span className="font-mono text-xs text-[#8b92a8]">
                Software Engineer <span className="text-[#5a6380]">·</span> <span className="text-[#f0f0f5]">Backend, Full-Stack &amp; AI</span>
              </span>
            </div>

            {/* Main Name */}
            <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem] font-bold leading-[0.96] tracking-[-0.035em] text-[#f0f0f5] break-words">
              Ashish Yadav
            </h1>

            {/* Technical Thesis Headline with subtle editorial italic flair */}
            <p className="mt-4 font-display text-xl sm:text-2xl md:text-3xl font-normal leading-[1.3] tracking-[-0.02em] text-[#a3a9b8]">
              Engineering <span className="italic font-serif text-white font-medium">high-throughput</span> cloud backends, <span className="italic font-serif text-white font-medium">scalable</span> full-stack platforms, and <span className="italic font-serif text-white font-medium">resilient</span> production AI systems.
            </p>

            {/* Crisp, Grounded Technical Scope */}
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-[#8b92a8]">
              I build end-to-end software designed for real-world traffic. Experienced across Go, Python, TypeScript (Next.js/React), Flutter, and AWS — from architecting serverless backends serving <strong className="font-medium text-[#f0f0f5]">100K+ active users</strong> at <span className="font-mono text-xs text-sky-300 bg-sky-400/10 px-1.5 py-0.5 rounded border border-sky-400/20">&lt;200ms p95 latency</span> to shipping 18 mobile apps with <strong className="font-medium text-[#f0f0f5]">250K+ downloads</strong> (4.9★) and autonomous AI agent infrastructure.
            </p>

            {/* 3-Second Recruiter Fast-Scan Cards (Minimal, Cohesive Palette, No Yellow/Purple) */}
            <div className="mt-7 grid grid-cols-3 gap-2 sm:gap-2.5 max-w-xl">
              <div className="group rounded-xl border border-white/[0.08] bg-[#0c1220]/70 p-2.5 sm:p-3.5 backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-white/20 hover:bg-[#0e1628]">
                <span className="block font-mono text-[9px] sm:text-[10px] tracking-wider uppercase text-[#8b92a8] truncate">
                  Scale <span className="text-[#5a6380]">/</span> <em className="italic font-serif lowercase text-sky-300">users</em>
                </span>
                <div className="mt-1 flex items-baseline gap-1">
                  <span className="font-display text-lg sm:text-2xl font-bold tracking-tight text-[#f0f0f5]">100K</span>
                  <span className="font-mono text-xs font-semibold text-sky-400">+</span>
                </div>
                <span className="mt-0.5 block font-mono text-[9px] sm:text-[10px] text-[#5a6380] truncate">Active Daily Users</span>
              </div>

              <div className="group rounded-xl border border-white/[0.08] bg-[#0c1220]/70 p-2.5 sm:p-3.5 backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-white/20 hover:bg-[#0e1628]">
                <span className="block font-mono text-[9px] sm:text-[10px] tracking-wider uppercase text-[#8b92a8] truncate">
                  Mobile <span className="text-[#5a6380]">/</span> <em className="italic font-serif lowercase text-sky-300">apps</em>
                </span>
                <div className="mt-1 flex items-baseline gap-1">
                  <span className="font-display text-lg sm:text-2xl font-bold tracking-tight text-[#f0f0f5]">250K</span>
                  <span className="font-mono text-xs font-semibold text-white/70">+</span>
                </div>
                <span className="mt-0.5 block font-mono text-[9px] sm:text-[10px] text-[#5a6380] truncate">4.9★ (18 Apps Shipped)</span>
              </div>

              <div className="group rounded-xl border border-white/[0.08] bg-[#0c1220]/70 p-2.5 sm:p-3.5 backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-white/20 hover:bg-[#0e1628]">
                <span className="block font-mono text-[9px] sm:text-[10px] tracking-wider uppercase text-[#8b92a8] truncate">
                  Latency <span className="text-[#5a6380]">/</span> <em className="italic font-serif lowercase text-sky-300">target</em>
                </span>
                <div className="mt-1 flex items-baseline gap-1">
                  <span className="font-mono text-xs sm:text-sm text-sky-400 font-bold">&lt;</span>
                  <span className="font-display text-lg sm:text-2xl font-bold tracking-tight text-[#f0f0f5]">200</span>
                  <span className="font-mono text-xs text-sky-400">ms</span>
                </div>
                <span className="mt-0.5 block font-mono text-[9px] sm:text-[10px] text-[#5a6380] truncate">p95 Production Target</span>
              </div>
            </div>

            {/* Primary Actions */}
            <div className="mt-8 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4">
              <a
                href="/Ashish_Yadav_Resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex h-11 sm:h-12 items-center justify-center gap-2 rounded-xl bg-[#ff2d7b] px-5 sm:px-6 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(255,45,123,0.3)] transition-all duration-150 hover:bg-[#e6256e] hover:shadow-[0_12px_32px_rgba(255,45,123,0.45)] active:scale-[0.98] w-full sm:w-auto"
              >
                <FileText className="h-4 w-4" />
                <span>View Resume</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-1" />
              </a>

              <a
                href="#projects"
                className="inline-flex h-11 sm:h-12 items-center justify-center gap-2 rounded-xl border border-white/10 bg-[#111827]/80 px-4 sm:px-5 text-sm font-medium text-[#f0f0f5] backdrop-blur-md transition-colors duration-150 hover:border-white/25 hover:bg-[#1a233a] w-full sm:w-auto"
              >
                <span>Explore Projects</span>
                <ArrowUpRight className="h-4 w-4 text-[#8b92a8]" />
              </a>

              <Link
                href="/creative"
                className="group inline-flex h-11 sm:h-12 items-center justify-center gap-2.5 rounded-xl border border-white/10 bg-[#111827]/80 px-4 sm:px-5 text-sm font-medium text-[#f0f0f5] backdrop-blur-md transition-all duration-150 hover:border-white/25 hover:bg-[#162035] active:scale-[0.98] w-full sm:w-auto"
                title="Read Ashish's creative essays, cinema frames & visual storytelling"
              >
                <span className="flex h-2 w-2 rounded-full bg-sky-400 transition-transform duration-150 group-hover:scale-125" />
                <span>My <span className="italic font-serif text-white">Creative</span> Side</span>
                <span className="font-mono text-xs text-[#8b92a8] group-hover:text-[#a3a9b8]">/atelier</span>
                <ArrowUpRight className="h-4 w-4 text-[#8b92a8] transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
              </Link>
            </div>
          </div>

          {/* Right Column: Live Go Systems Workbench */}
          <div className="w-full lg:col-span-6 xl:col-span-6">
            <HeroSystemCockpit />
          </div>
        </div>

        {/* Bottom Recruiter Quick-Scan HUD Bar */}
        <div className="mt-12 sm:mt-8 border-t border-[#f0f0f5]/[0.06] pt-5">
          <div className="flex flex-wrap items-center justify-between gap-y-3 font-mono text-xs text-[#8b92a8]">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
              <span>Production Scale: <strong className="text-[#f0f0f5]">100K+ Active Users</strong></span>
              <span className="text-[#5a6380] hidden sm:inline">·</span>
              <span className="hidden sm:inline">App Downloads: <strong className="text-[#f0f0f5]">250K+ (4.9★ Rating)</strong></span>
            </div>

            <div className="flex items-center gap-2">
              <span>API Latency: <strong className="text-sky-300">&lt;200ms p95 SLA</strong></span>
              <span className="text-[#5a6380] hidden sm:inline">·</span>
              <span className="hidden sm:inline">Mobile Ecosystem: <strong className="text-[#f0f0f5]">18 Production Apps</strong></span>
              <span className="text-[#5a6380] hidden sm:inline">·</span>
              <span className="hidden sm:inline">Competitive Coding: <strong className="text-[#f0f0f5]">430+ Solved</strong></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
