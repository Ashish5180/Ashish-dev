"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import type { MapUserNode } from "@/components/ui/world-map";
import connectionsData from "@/data/world-map.json";
import { UniversalLoader } from "@/components/ui/universal-loader";
import {
  Mail,
  Copy,
  Check,
  Send,
  ArrowUpRight,
} from "lucide-react";

const WorldMap = dynamic(() => import("@/components/ui/world-map"), {
  ssr: false,
  loading: () => (
    <div className="w-full aspect-[2/1] rounded-2xl bg-[#0a0e1a] flex items-center justify-center border border-[#f0f0f5]/[0.04]">
      <UniversalLoader size="md" label="Rendering Vector Projections..." />
    </div>
  ),
});

function LinkedInIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.2a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z" />
    </svg>
  );
}

function CodolioIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
      <line x1="14" y1="4" x2="10" y2="20" />
    </svg>
  );
}

function LeetCodeIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.247 2.198 5.876 2.164 8.08-.076l3.968-4.032a1.385 1.385 0 1 0-1.96-1.96l-3.968 4.032a3.02 3.02 0 0 1-4.242.04l-4.32-4.234a3.178 3.178 0 0 1-.954-2.186 3.118 3.118 0 0 1 .425-2.028 3.13 3.13 0 0 1 1.05-1.127l3.92-4.197 5.334-5.714A1.373 1.373 0 0 0 13.483 0zm4.278 9.53a1.385 1.385 0 0 0-1.385 1.385v5.085a1.385 1.385 0 1 0 2.77 0v-5.085a1.385 1.385 0 0 0-1.385-1.385z" />
    </svg>
  );
}

const originNode = connectionsData.find((c) => c.isOrigin) ?? connectionsData[0];

// Dynamic flight lines radiating from New Delhi to all global engineering hubs
const MAP_DOTS = connectionsData
  .filter((c) => !c.isOrigin)
  .map((c) => ({
    start: { lat: originNode.lat, lng: originNode.lng, label: originNode.city },
    end: { lat: c.lat, lng: c.lng, label: c.city },
  }));

export interface ContactConnectivitySectionProps {
  className?: string;
}

export function ContactConnectivitySection({
  className = "",
}: ContactConnectivitySectionProps) {
  const [copied, setCopied] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const emailAddress = "ashish.devv2026@gmail.com";
  const phoneNumber = "+91 875-008-4388";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(phoneNumber);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  return (
    <section
      id="contact"
      aria-label="Global Connectivity & Contact"
      className={`relative z-20 w-full border-t border-[#f0f0f5]/[0.08] bg-transparent px-4 py-20 text-[#f0f0f5] sm:px-8 sm:py-32 lg:px-12 scroll-mt-20 ${className}`}
    >
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="flex flex-col items-start justify-between gap-6 border-b border-[#f0f0f5]/[0.06] pb-10 md:flex-row md:items-end">
          <div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-[-0.035em] text-[#f0f0f5]">
              Let’s Build Great Software Together
            </h2>

            <p className="mt-3 max-w-2xl text-base text-[#8b92a8] leading-relaxed">
              Available immediately for internships and full-time Software Engineering roles (Remote or On-site).
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-[#0e1526]/80 px-3.5 py-1.5 font-mono text-xs text-[#8b92a8]">
            <span className="h-2 w-2 rounded-full bg-sky-400 animate-pulse" />
            <span>Active Across Global Timezones</span>
          </div>
        </div>

        {/* Global Visualization Canvas */}
        <div className="mt-10 overflow-hidden rounded-3xl border border-[#f0f0f5]/[0.08] bg-[#0e1526]/80 p-4 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.6)] backdrop-blur-2xl sm:p-6 lg:p-8">
          {/* World Map Header & Connections Telemetry Strip */}
          <div className="mb-6 flex flex-col justify-between gap-4 border-b border-[#f0f0f5]/[0.06] pb-5 sm:flex-row sm:items-center">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-sky-400 animate-pulse" />
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-sky-400">
                  Friends &amp; Fellow Builders
                </span>
              </div>
              <h3 className="mt-1 font-display text-xl sm:text-2xl font-bold text-[#f0f0f5]">
                The Tech Fam &amp; Friends I Build With
              </h3>
              <p className="mt-1 font-mono text-xs text-[#8b92a8]">
                Hover on any profile to meet the brilliant engineers, analysts, and creators in my corner.
              </p>
            </div>

            {/* Collaborator Avatars Preview Stack */}
            <div className="flex items-center gap-3 self-start sm:self-center">
              <div className="flex -space-x-2 overflow-hidden py-1">
                {connectionsData.map((node) => (
                  <div
                    key={node.id}
                    className="relative inline-block h-7 w-7 rounded-full overflow-hidden shadow-xs transition-transform hover:scale-125 hover:z-20 cursor-pointer"
                    title={`${node.title} (${node.city})`}
                  >
                    <Image
                      src={node.image}
                      alt={node.title}
                      fill
                      sizes="28px"
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                ))}
              </div>
              <span className="font-mono text-xs font-semibold text-sky-300 bg-sky-400/10 px-2.5 py-0.5 rounded-full border border-sky-400/20 shrink-0">
                {connectionsData.length} Amazing Friends
              </span>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center">
            <div className="w-full">
              <WorldMap dots={MAP_DOTS} nodes={connectionsData as MapUserNode[]} lineColor="#ffffff" />
            </div>
          </div>
        </div>

        {/* Contact Me & Collaboration Action Cards */}
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Availability & Direct Contact Card (7 Cols) */}
          <div className="flex flex-col justify-between rounded-3xl border border-[#f0f0f5]/[0.08] bg-[#0c1220]/90 p-6 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.6)] backdrop-blur-2xl sm:p-8 lg:col-span-7">
            <div>
              {/* Active Availability Badge (Cohesive Dark/Sky Palette) */}
              <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/25 bg-sky-400/10 px-3 py-1 text-xs font-mono text-sky-300">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-sky-400" />
                </span>
                <span className="text-[#f0f0f5] font-medium">Available for SDE Roles</span>
                <span className="text-sky-400/40">·</span>
                <span className="text-sky-300 font-semibold">Immediate Joiner</span>
              </div>

              {/* Minimal Headline & Clean Lead */}
              <h3 className="mt-4 font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#f0f0f5]">
                Let’s build something impactful together.
              </h3>
              <p className="mt-2.5 text-sm sm:text-[15px] leading-relaxed text-[#a3a9b8]">
                Open for full-time Software Engineer positions across backend, full-stack, and AI systems. Have an opportunity or want to collaborate? Reach out directly.
              </p>

              {/* Fast-Track Collaboration Timeline */}
              <div className="mt-6 border-t border-[#f0f0f5]/[0.06] pt-5">
                <div className="flex items-center justify-between mb-3.5">
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[#8b92a8]">
                    Collaboration Timeline
                  </span>
                  <span className="font-mono text-[11px] text-sky-300 flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-sky-400 animate-pulse" />
                    <span>Fast-Track Onboarding</span>
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {/* Step 1: Hot Pink Accent */}
                  <div className="group rounded-2xl border border-[#ff2d7b]/20 bg-[#ff2d7b]/[0.03] p-3.5 backdrop-blur-md transition-all hover:border-[#ff2d7b]/40 hover:bg-[#ff2d7b]/[0.06]">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-[#ff2d7b]">01</span>
                      <span className="font-mono text-[10px] text-[#ff2d7b] bg-[#ff2d7b]/10 px-2 py-0.5 rounded-md border border-[#ff2d7b]/20 font-medium">
                        &lt;2h SLA
                      </span>
                    </div>
                    <h4 className="mt-2 font-display text-sm font-bold text-[#f0f0f5]">
                      First Contact
                    </h4>
                    <p className="mt-1 font-mono text-[11px] text-[#8b92a8] leading-relaxed">
                      Drop an email or call. Fast async intro and role alignment.
                    </p>
                  </div>

                  {/* Step 2: Monochromatic Slate / White */}
                  <div className="group rounded-2xl border border-white/[0.08] bg-[#080d17]/70 p-3.5 backdrop-blur-md transition-all hover:border-white/20 hover:bg-[#0c1220]">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-[#f0f0f5]">02</span>
                      <span className="font-mono text-[10px] text-[#8b92a8] bg-white/[0.05] px-2 py-0.5 rounded-md border border-white/10 font-medium">
                        Deep Dive
                      </span>
                    </div>
                    <h4 className="mt-2 font-display text-sm font-bold text-[#f0f0f5]">
                      Technical Sync
                    </h4>
                    <p className="mt-1 font-mono text-[11px] text-[#8b92a8] leading-relaxed">
                      System design discussion, stack fit, and live code walkthrough.
                    </p>
                  </div>

                  {/* Step 3: Electric Sky */}
                  <div className="group rounded-2xl border border-sky-400/25 bg-sky-400/[0.04] p-3.5 backdrop-blur-md transition-all hover:border-sky-400/40 hover:bg-sky-400/[0.08]">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-sky-300">03</span>
                      <span className="font-mono text-[10px] text-sky-200 bg-sky-400/15 px-2 py-0.5 rounded-md border border-sky-400/30 font-medium">
                        Day 1 Ready
                      </span>
                    </div>
                    <h4 className="mt-2 font-display text-sm font-bold text-[#f0f0f5]">
                      Ship to Prod
                    </h4>
                    <p className="mt-1 font-mono text-[11px] text-[#8b92a8] leading-relaxed">
                      Zero lead time. Immediate start building production systems.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Email & Phone Contact Block */}
            <div className="mt-8 border-t border-[#f0f0f5]/[0.06] pt-6 space-y-3">
              {/* Email Row */}
              <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
                <div className="flex flex-1 items-center justify-between gap-2 rounded-xl border border-[#f0f0f5]/[0.08] bg-[#111827] px-3.5 py-2.5 min-w-0">
                  <div className="flex items-center gap-2 font-mono text-xs text-[#f0f0f5] min-w-0">
                    <Mail className="h-4 w-4 text-[#8b92a8] shrink-0" />
                    <span className="truncate">{emailAddress}</span>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="flex items-center gap-1 rounded-lg border border-[#f0f0f5]/[0.1] bg-[#0a0e1a] px-2.5 py-1 font-mono text-xs text-[#8b92a8] transition-colors hover:border-[#ff2d7b]/40 hover:text-[#ff2d7b] cursor-pointer shrink-0"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-sky-400" />
                        <span className="text-sky-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5 text-[#5a6380]" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                <a
                  href={`mailto:${emailAddress}?subject=Software%20Engineer%20Role%20Inquiry%20-%20Ashish%20Yadav`}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#ff2d7b] px-5 py-2.5 font-mono text-xs font-semibold text-white shadow-[0_8px_24px_rgba(255,45,123,0.3)] transition-all hover:bg-[#e6256e] active:scale-[0.98] sm:w-auto"
                >
                  <span>Send Email</span>
                  <Send className="h-3.5 w-3.5" />
                </a>
              </div>

              {/* Phone Row */}
              <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
                <div className="flex flex-1 items-center justify-between gap-2 rounded-xl border border-[#f0f0f5]/[0.08] bg-[#111827] px-3.5 py-2.5 min-w-0">
                  <div className="flex items-center gap-2 font-mono text-xs text-[#f0f0f5] min-w-0">
                    <span className="text-sky-400 font-mono text-xs shrink-0">TEL:</span>
                    <span className="truncate">{phoneNumber}</span>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyPhone}
                    className="flex items-center gap-1 rounded-lg border border-[#f0f0f5]/[0.1] bg-[#0a0e1a] px-2.5 py-1 font-mono text-xs text-[#8b92a8] transition-colors hover:border-[#ff2d7b]/40 hover:text-[#ff2d7b] cursor-pointer shrink-0"
                  >
                    {copiedPhone ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-sky-400" />
                        <span className="text-sky-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5 text-[#5a6380]" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                <a
                  href={`tel:${phoneNumber.replace(/\s+/g, "")}`}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#f0f0f5]/[0.1] bg-[#111827] px-5 py-2.5 font-mono text-xs font-medium text-[#f0f0f5] transition-colors hover:border-[#f0f0f5]/[0.2] hover:bg-[#1a233a] sm:w-auto"
                >
                  <span>Call Directly</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-[#8b92a8]" />
                </a>
              </div>
            </div>
          </div>

          {/* Social Profiles & Developer Links (5 Cols) */}
          <div className="flex flex-col justify-between rounded-3xl border border-[#f0f0f5]/[0.08] bg-[#0e1526]/80 p-6 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.6)] backdrop-blur-2xl sm:p-8 lg:col-span-5">
            <div>
              <h4 className="font-display text-base font-bold text-[#f0f0f5]">
                Direct Profiles &amp; Verification
              </h4>
              <p className="mt-1 text-xs text-[#8b92a8]">
                Explore coding history, production apps, and verified problem-solving track record.
              </p>

              <div className="mt-5 space-y-2.5">
                {/* LinkedIn Link */}
                <a
                  href="https://www.linkedin.com/in/ashishyadav001/"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between rounded-2xl border border-[#f0f0f5]/[0.06] bg-[#0a0e1a]/80 p-3.5 transition-all hover:border-[#ff2d7b]/40 hover:bg-[#0a0e1a]"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#f0f0f5]/[0.08] bg-[#111827] text-sky-400">
                      <LinkedInIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="text-sm font-medium text-[#f0f0f5] block group-hover:text-[#ff2d7b] transition-colors">
                        LinkedIn
                      </span>
                      <span className="font-mono text-xs text-[#5a6380]">
                        ashishyadav001
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-[#5a6380] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#ff2d7b]" />
                </a>

                {/* GitHub Link */}
                <a
                  href="https://github.com/Ashish5180"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between rounded-2xl border border-[#f0f0f5]/[0.06] bg-[#0a0e1a]/80 p-3.5 transition-all hover:border-[#ff2d7b]/40 hover:bg-[#0a0e1a]"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#f0f0f5]/[0.08] bg-[#111827] text-[#f0f0f5]">
                      <svg
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                        <path d="M9 18c-4.51 2-5-2-7-2" />
                      </svg>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-[#f0f0f5] block group-hover:text-[#ff2d7b] transition-colors">
                        GitHub
                      </span>
                      <span className="font-mono text-xs text-[#5a6380]">
                        @Ashish5180 · Production Repos
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-[#5a6380] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#ff2d7b]" />
                </a>

                {/* LeetCode Link */}
                <a
                  href="https://leetcode.com/u/Developer-AshishYadav/"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between rounded-2xl border border-[#f0f0f5]/[0.06] bg-[#0a0e1a]/80 p-3.5 transition-all hover:border-[#ff2d7b]/40 hover:bg-[#0a0e1a]"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#f0f0f5]/[0.08] bg-[#111827] text-sky-400">
                      <LeetCodeIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="text-sm font-medium text-[#f0f0f5] block group-hover:text-[#ff2d7b] transition-colors">
                        LeetCode Profile
                      </span>
                      <span className="font-mono text-xs text-[#5a6380]">
                        Developer-AshishYadav · Algorithms &amp; DSA
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-[#5a6380] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#ff2d7b]" />
                </a>

                {/* Codolio Link */}
                <a
                  href="https://codolio.com/profile/SleepyOwl"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between rounded-2xl border border-[#f0f0f5]/[0.06] bg-[#0a0e1a]/80 p-3.5 transition-all hover:border-[#ff2d7b]/40 hover:bg-[#0a0e1a]"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#f0f0f5]/[0.08] bg-[#111827] text-sky-400">
                      <CodolioIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="text-sm font-medium text-[#f0f0f5] block group-hover:text-[#ff2d7b] transition-colors">
                        Codolio Profile
                      </span>
                      <span className="font-mono text-xs text-[#5a6380]">
                        430+ Problems Solved · Competitive Streak
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-[#5a6380] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#ff2d7b]" />
                </a>

                {/* Resume PDF Link */}
                <a
                  href="/Ashish_Yadav_Resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between rounded-2xl border border-[#ff2d7b]/30 bg-[#162035] p-3.5 transition-all hover:border-[#ff2d7b]/60 hover:bg-[#1a2540]"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#ff2d7b]/30 bg-[#ff2d7b]/10 text-[#ff2d7b]">
                      <ArrowUpRight className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="text-sm font-bold text-white block group-hover:text-[#ff2d7b] transition-colors">
                        Resume PDF
                      </span>
                      <span className="font-mono text-xs text-[#8b92a8]">
                        Download Updated Curriculum Vitae
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-[#ff2d7b] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </div>

            {/* Footer Sign-off */}
            <div className="mt-8 border-t border-[#f0f0f5]/[0.06] pt-4 text-center">
              <span className="font-mono text-[11px] text-[#5a6380]">
                Designed &amp; Engineered by Ashish Yadav · Software Engineer (Backend · Full-Stack · AI)
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactConnectivitySection;
