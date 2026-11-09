"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import type { MapUserNode } from "@/components/ui/world-map";
import { UniversalLoader } from "@/components/ui/universal-loader";
import {
  Mail,
  Copy,
  Check,
  MapPin,
  Clock,
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

// Well-spaced global hubs spanning distinct continents for maximum spatial clarity
const COLLABORATOR_NODES: MapUserNode[] = [
  {
    id: "sf",
    lat: 37.7749,
    lng: -122.4194,
    name: "Alex Chen",
    role: "Staff AI Infra SDE",
    headline: "Scaling distributed GPU clusters and high-throughput LLM inference backbones.",
    city: "San Francisco",
    country: "USA",
    avatar: "https://assets.aceternity.com/avatars/1.webp",
    status: "Active Node",
    latency: "142ms",
  },
  {
    id: "nyc",
    lat: 40.7128,
    lng: -74.006,
    name: "Marcus Vance",
    role: "Senior Platform SDE",
    headline: "Engineering transactional event streams and fault-tolerant Kafka infrastructure.",
    city: "New York",
    country: "USA",
    avatar: "https://assets.aceternity.com/avatars/4.webp",
    status: "Active Node",
    latency: "128ms",
  },
  {
    id: "saopaulo",
    lat: -23.5505,
    lng: -46.6333,
    name: "Beatriz Silva",
    role: "Cloud Systems & DevOps SDE",
    headline: "Architecting multi-region Kubernetes mesh networks with zero-downtime rollouts.",
    city: "São Paulo",
    country: "Brazil",
    avatar: "https://assets.aceternity.com/avatars/6.webp",
    status: "Active Node",
    latency: "165ms",
  },
  {
    id: "london",
    lat: 51.5074,
    lng: -0.1278,
    name: "Sophia Bennett",
    role: "Distributed Systems SDE",
    headline: "Building consensus-driven microservices with Raft state machines and gRPC.",
    city: "London",
    country: "UK",
    avatar: "https://assets.aceternity.com/avatars/2.webp",
    status: "Active Node",
    latency: "96ms",
  },
  {
    id: "capetown",
    lat: -33.9249,
    lng: 18.4241,
    name: "Kagiso Ndlovu",
    role: "Core Performance & SRE",
    headline: "Hardening production uptime, kernel-level eBPF tracing, and sub-millisecond p99 tuning.",
    city: "Cape Town",
    country: "South Africa",
    avatar: "https://assets.aceternity.com/avatars/7.webp",
    status: "Active Node",
    latency: "155ms",
  },
  {
    id: "delhi",
    lat: 28.6139,
    lng: 77.209,
    name: "Ashish Yadav (Me)",
    role: "Software Engineer (Backend · Full-Stack · AI)",
    headline: "Building zero-allocation Go backends, serverless AWS platforms, and reliable AI systems.",
    city: "New Delhi",
    country: "India",
    avatar: "/images/my.png",
    isOrigin: true,
    status: "Origin Base",
    latency: "<5ms local",
  },
  {
    id: "singapore",
    lat: 1.3521,
    lng: 103.8198,
    name: "Liam Tan",
    role: "Full-Stack Tech Lead SDE",
    headline: "Shipping reactive Next.js 16 platforms with real-time SSE telemetry & WebSockets.",
    city: "Singapore",
    country: "Singapore",
    avatar: "https://assets.aceternity.com/avatars/12.webp",
    status: "Active Node",
    latency: "68ms",
  },
  {
    id: "tokyo",
    lat: 35.6762,
    lng: 139.6503,
    name: "Kenji Sato",
    role: "High-Throughput Go SDE",
    headline: "Crafting zero-allocation streaming engines, memory-efficient parsers, and Redis caching.",
    city: "Tokyo",
    country: "Japan",
    avatar: "https://assets.aceternity.com/avatars/3.webp",
    status: "Active Node",
    latency: "115ms",
  },
  {
    id: "sydney",
    lat: -33.8688,
    lng: 151.2093,
    name: "Chloe Mitchell",
    role: "Backend Infrastructure SDE",
    headline: "Designing serverless cloud workflows with AWS Step Functions and DynamoDB state machines.",
    city: "Sydney",
    country: "Australia",
    avatar: "https://assets.aceternity.com/avatars/5.webp",
    status: "Active Node",
    latency: "135ms",
  },
];

// White flight lines radiating from New Delhi to all global engineering hubs
const MAP_DOTS = [
  {
    start: { lat: 28.6139, lng: 77.209, label: "New Delhi" },
    end: { lat: 37.7749, lng: -122.4194, label: "San Francisco" },
  },
  {
    start: { lat: 28.6139, lng: 77.209, label: "New Delhi" },
    end: { lat: 40.7128, lng: -74.006, label: "New York" },
  },
  {
    start: { lat: 28.6139, lng: 77.209, label: "New Delhi" },
    end: { lat: -23.5505, lng: -46.6333, label: "São Paulo" },
  },
  {
    start: { lat: 28.6139, lng: 77.209, label: "New Delhi" },
    end: { lat: 51.5074, lng: -0.1278, label: "London" },
  },
  {
    start: { lat: 28.6139, lng: 77.209, label: "New Delhi" },
    end: { lat: -33.9249, lng: 18.4241, label: "Cape Town" },
  },
  {
    start: { lat: 28.6139, lng: 77.209, label: "New Delhi" },
    end: { lat: 1.3521, lng: 103.8198, label: "Singapore" },
  },
  {
    start: { lat: 28.6139, lng: 77.209, label: "New Delhi" },
    end: { lat: 35.6762, lng: 139.6503, label: "Tokyo" },
  },
  {
    start: { lat: 28.6139, lng: 77.209, label: "New Delhi" },
    end: { lat: -33.8688, lng: 151.2093, label: "Sydney" },
  },
];

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
      className={`relative z-20 w-full border-t border-[#f0f0f5]/[0.08] bg-transparent px-6 py-24 text-[#f0f0f5] sm:px-8 sm:py-32 lg:px-12 scroll-mt-20 ${className}`}
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
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Active Across Global Timezones</span>
          </div>
        </div>

        {/* Global Visualization Canvas */}
        <div className="mt-10 overflow-hidden rounded-3xl border border-[#f0f0f5]/[0.08] bg-[#0e1526]/80 p-4 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.6)] backdrop-blur-2xl sm:p-6 lg:p-8">
          {/* World Map Header & Connections Telemetry Strip */}
          <div className="mb-6 flex flex-col justify-between gap-4 border-b border-[#f0f0f5]/[0.06] pb-5 sm:flex-row sm:items-center">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-sky-400">
                  Global Engineering Network
                </span>
              </div>
              <h3 className="mt-1 font-display text-xl sm:text-2xl font-bold text-[#f0f0f5]">
                Connections All Over the World
              </h3>
              <p className="mt-1 font-mono text-xs text-[#8b92a8]">
                Hover collaborator PFPs across 9 global technology hubs spanning 6 continents.
              </p>
            </div>

            {/* Collaborator Avatars Preview Stack */}
            <div className="flex items-center gap-3 self-start sm:self-center">
              <div className="flex -space-x-2 overflow-hidden py-1">
                {COLLABORATOR_NODES.map((node) => (
                  <div
                    key={node.id}
                    className="relative inline-block h-7 w-7 rounded-full overflow-hidden shadow-xs transition-transform hover:scale-125 hover:z-20 cursor-pointer"
                    title={`${node.name} (${node.city})`}
                  >
                    <Image
                      src={node.avatar}
                      alt={node.name}
                      fill
                      sizes="28px"
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                ))}
              </div>
              <span className="font-mono text-xs font-medium text-amber-400 shrink-0">
                9 Active Hubs
              </span>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center">
            <div className="w-full">
              <WorldMap dots={MAP_DOTS} nodes={COLLABORATOR_NODES} lineColor="#ffffff" />
            </div>
          </div>
        </div>

        {/* Contact Me & Collaboration Action Cards */}
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Availability & Info Card (7 Cols) */}
          <div className="flex flex-col justify-between rounded-3xl border border-[#f0f0f5]/[0.08] bg-[#0e1526]/80 p-6 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.6)] backdrop-blur-2xl sm:p-8 lg:col-span-7">
            <div>
              <h3 className="font-display text-2xl font-bold tracking-tight text-[#f0f0f5] sm:text-3xl">
                Let’s Build Great Software Together
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#8b92a8]">
                Available immediately for internships and full-time Software Engineering roles (Remote or On-site). Experienced across scalable Cloud Backends, Full-Stack Web/Mobile Apps, and Production AI Systems.
              </p>

              {/* Status Points */}
              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 text-xs">
                <div className="flex items-center gap-3 rounded-xl border border-[#f0f0f5]/[0.06] bg-[#0a0e1a]/80 p-3.5">
                  <Clock className="h-4 w-4 text-[#ff2d7b] shrink-0" />
                  <div>
                    <span className="font-medium text-[#f0f0f5] block">
                      Timezone Flexibility
                    </span>
                    <span className="font-mono text-[11px] text-[#5a6380]">
                      IST (UTC+5:30) · Overlaps US, EU &amp; APAC
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-xl border border-[#f0f0f5]/[0.06] bg-[#0a0e1a]/80 p-3.5">
                  <MapPin className="h-4 w-4 text-sky-400 shrink-0" />
                  <div>
                    <span className="font-medium text-[#f0f0f5] block">
                      Availability
                    </span>
                    <span className="font-mono text-[11px] text-[#5a6380]">
                      Remote or On-site · Immediate Start
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Email & Phone Contact Block */}
            <div className="mt-8 border-t border-[#f0f0f5]/[0.06] pt-6 space-y-3">
              {/* Email Row */}
              <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
                <div className="flex flex-1 items-center justify-between rounded-xl border border-[#f0f0f5]/[0.08] bg-[#111827] px-3.5 py-2.5">
                  <div className="flex items-center gap-2 font-mono text-xs text-[#f0f0f5]">
                    <Mail className="h-4 w-4 text-[#8b92a8]" />
                    <span>{emailAddress}</span>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="flex items-center gap-1 rounded-lg border border-[#f0f0f5]/[0.1] bg-[#0a0e1a] px-2.5 py-1 font-mono text-xs text-[#8b92a8] transition-colors hover:border-[#ff2d7b]/40 hover:text-[#ff2d7b] cursor-pointer"
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
                <div className="flex flex-1 items-center justify-between rounded-xl border border-[#f0f0f5]/[0.08] bg-[#111827] px-3.5 py-2.5">
                  <div className="flex items-center gap-2 font-mono text-xs text-[#f0f0f5]">
                    <span className="text-sky-400 font-mono text-xs">TEL:</span>
                    <span>{phoneNumber}</span>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyPhone}
                    className="flex items-center gap-1 rounded-lg border border-[#f0f0f5]/[0.1] bg-[#0a0e1a] px-2.5 py-1 font-mono text-xs text-[#8b92a8] transition-colors hover:border-[#ff2d7b]/40 hover:text-[#ff2d7b] cursor-pointer"
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
                  href="/resume.pdf"
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
