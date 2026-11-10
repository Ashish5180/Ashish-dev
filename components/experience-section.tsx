"use client";

import React, { useState } from "react";
import { Cpu, Smartphone, Cloud, Bot, ShieldCheck, Layers } from "lucide-react";

export interface EngineeringDeliverable {
  id: string;
  number: string;
  title: string;
  systemTag: string;
  metric: string;
  tech: string[];
  whatIBuilt: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const DELIVERABLES: EngineeringDeliverable[] = [
  {
    id: "100k-backend",
    number: "01",
    title: "100K+ Active Users — Scalable Backend & Recommendation Engine",
    systemTag: "Go Microservices & Recommendation Engine",
    metric: "100K+ Users · <200ms SLA",
    tech: ["Go", "AWS Lambda", "Redis", "MySQL", "Gorse", "FNV-32a Hashing"],
    whatIBuilt:
      "Built a serverless Go backend serving 100K+ active users with <200ms real-time AI chat, a Redis/MySQL recommendation engine (Gorse), and consistent hashing (FNV-32a) for model routing.",
    icon: Cpu,
  },
  {
    id: "250k-apps",
    number: "02",
    title: "250K+ Downloads (4.9★) — 18 Production Mobile Apps",
    systemTag: "Cross-Platform Mobile Ecosystem",
    metric: "250K+ Downloads · 4.9★",
    tech: ["Flutter", "Google Play IAP", "App Store IAP", "Firebase FCM", "OIDC", "PubSub", "JWS"],
    whatIBuilt:
      "Developed and launched 18 Flutter apps on the Play Store (including IntimateAI at 100K+ downloads & 4.9★ across 1.84K reviews). Implemented secure in-app purchases (OIDC/PubSub & JWS) and timezone-based push notifications.",
    icon: Smartphone,
  },
  {
    id: "95-cost-reduction",
    number: "03",
    title: "~95% Cost & Query Reduction — Multi-Domain Cloud Architecture",
    systemTag: "Cloud Architecture & Rate Limiting",
    metric: "~95% Query Reduction",
    tech: ["AWS DynamoDB", "BigQuery", "API Rate Limiting", "CI/CD", "TTL Caching"],
    whatIBuilt:
      "Engineered a 50+ domain serverless backend enforcing a strict zero-Scan DynamoDB policy, 15+ shared rate limiters, and a 5-minute TTL caching layer that reduced repeat BigQuery queries by ~95%.",
    icon: Cloud,
  },
  {
    id: "ai-tooling-rag",
    number: "04",
    title: "40% → 100% Accuracy — AI Developer Tooling & GenAI Pipelines",
    systemTag: "GenAI Infrastructure & Developer Tools",
    metric: "100% Patch Accuracy · -80% API Cost",
    tech: ["TypeScript", "LLMs", "Vector Embeddings", "RAG", "VS Code Extension"],
    whatIBuilt:
      "Built a fault-tolerant code-diff pipeline for a VS Code AI extension that improved patch accuracy from 40% to 100% while cutting LLM API costs by ~80%. Shipped 6+ grounded AI features and an AI hiring platform with 80% better match precision.",
    icon: Bot,
  },
  {
    id: "zero-downtime",
    number: "05",
    title: "Zero Downtime — API Security & Production Reliability",
    systemTag: "API Security & Concurrency Defense",
    metric: "Zero Downtime · 80% Coverage",
    tech: ["SSRF Protection", "Signed Headers", "GitHub Actions CI/CD", "Automated Testing"],
    whatIBuilt:
      "Secured background workers against SSRF attacks, fixed a live concurrency rate-limit bug using cryptographic signed headers, and maintained automated CI/CD pipelines with 80% test coverage.",
    icon: ShieldCheck,
  },
];

const TECH_STACK_CATEGORIES = [
  {
    category: "Languages",
    badge: "Core Fundamentals",
    skills: ["Go (Golang)", "Python", "TypeScript / JavaScript", "Dart", "SQL"],
  },
  {
    category: "Backend & Cloud",
    badge: "Scalable Infrastructure",
    skills: [
      "AWS (Lambda, Step Functions, EventBridge, DynamoDB, S3)",
      "FastAPI",
      "Node.js",
      "REST APIs",
      "WebSockets & SSE",
      "Docker",
      "GitHub Actions CI/CD",
    ],
  },
  {
    category: "Frontend & Mobile",
    badge: "Modern Interfaces",
    skills: [
      "Next.js 16",
      "React 19",
      "Tailwind CSS",
      "Flutter (iOS & Android)",
      "React Flow",
    ],
  },
  {
    category: "Databases & Caching",
    badge: "Data Persistence",
    skills: ["PostgreSQL", "Redis", "MySQL", "DynamoDB", "SQLite", "BigQuery"],
  },
  {
    category: "AI & Machine Learning",
    badge: "Production Intelligence",
    skills: [
      "LLM Orchestration",
      "AI Agents",
      "RAG & Vector Search",
      "Google Gemini / OpenAI APIs",
      "LoRA Fine-Tuning (MLX)",
      "Faster-Whisper STT",
    ],
  },
];

export function ExperienceSection({ className = "" }: { className?: string }) {
  const [activeDeliverableId, setActiveDeliverableId] = useState<string>(DELIVERABLES[0].id);

  const activeDeliverable =
    DELIVERABLES.find((d) => d.id === activeDeliverableId) || DELIVERABLES[0];

  return (
    <section
      id="experience"
      aria-label="Work Experience"
      className={`relative z-20 w-full border-t border-[#f0f0f5]/[0.08] bg-transparent px-4 py-20 text-[#f0f0f5] sm:px-8 sm:py-32 lg:px-12 scroll-mt-20 ${className}`}
    >
      <div className="mx-auto max-w-6xl">
        {/* Section Heading */}
        <div className="flex flex-col items-start justify-between gap-6 border-b border-[#f0f0f5]/[0.06] pb-10 sm:flex-row sm:items-end">
          <div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-[-0.035em] text-[#f0f0f5]">
              Work Experience
            </h2>
            <p className="mt-3 max-w-2xl text-base text-[#8b92a8] leading-relaxed">
              Building and shipping production backends, full-stack apps, and AI products for real users.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-[#8b92a8]">
            <span className="h-2 w-2 rounded-full bg-sky-400" />
            <span>Active Production Role · Remote</span>
          </div>
        </div>

        {/* Company & Role Card */}
        <div className="mt-10 rounded-2xl border border-[#f0f0f5]/[0.08] bg-[#0c1220]/80 p-5 sm:p-8 backdrop-blur-xl">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center border-b border-[#f0f0f5]/[0.06] pb-6">
            <div>
              <div className="flex flex-wrap items-baseline gap-3">
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#f0f0f5]">
                  ASOasis Tech
                </h3>
                <span className="text-xs font-mono text-sky-400 rounded-md bg-sky-400/10 px-2 py-0.5 border border-sky-400/20">
                  Remote
                </span>
              </div>
              <p className="mt-1 font-mono text-sm font-semibold text-[#ff2d7b]">
                Software Developer Intern (Backend, Full-Stack &amp; AI)
              </p>
            </div>

            <div className="font-mono text-xs text-[#8b92a8]">
              Aug 2025 — Present
            </div>
          </div>

          <p className="mt-5 text-sm sm:text-base leading-relaxed text-[#a3a9b8]">
            Owned end-to-end product engineering across cloud backends, mobile apps, and AI pipelines serving 100K+ active users and 250K+ total downloads.
          </p>
        </div>

        {/* 5 Key Deliverables: Split View */}
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left Column: Deliverable List */}
          <div className="lg:col-span-5 space-y-2.5">
            <div className="font-mono text-xs uppercase tracking-wider text-[#5a6380] mb-3 flex items-center justify-between">
              <span>5 Key Deliverables</span>
              <span>100K+ Scale</span>
            </div>

            {DELIVERABLES.map((deliv) => {
              const isActive = deliv.id === activeDeliverableId;
              const IconComp = deliv.icon;

              return (
                <button
                  key={deliv.id}
                  type="button"
                  onClick={() => setActiveDeliverableId(deliv.id)}
                  className={`w-full text-left p-4 rounded-xl transition-all cursor-pointer border ${
                    isActive
                      ? "border-[#ff2d7b]/50 bg-[#111a2e] text-[#f0f0f5] shadow-[0_4px_20px_rgba(255,45,123,0.15)]"
                      : "border-[#f0f0f5]/[0.05] bg-[#0e1526]/40 text-[#8b92a8] hover:bg-[#0e1526]/80 hover:text-[#f0f0f5]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#ff2d7b]">
                      {deliv.number}
                    </span>
                    <span className="font-mono text-[11px] text-sky-300 font-medium">
                      {deliv.metric}
                    </span>
                  </div>

                  <h4 className="mt-2 text-sm font-semibold text-[#f0f0f5] leading-snug">
                    {deliv.title}
                  </h4>

                  <div className="mt-2 flex items-center gap-1.5 text-xs text-[#5a6380]">
                    <IconComp className="h-3.5 w-3.5 text-[#8b92a8]" />
                    <span>{deliv.systemTag}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Detailed Architecture Showcase */}
          <div className="lg:col-span-7 rounded-2xl border border-[#f0f0f5]/[0.08] bg-[#0c1220]/90 p-5 sm:p-8 backdrop-blur-xl flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4 border-b border-[#f0f0f5]/[0.06] pb-4">
                <div className="min-w-0 flex-1">
                  <span className="font-mono text-xs font-semibold text-[#ff2d7b]">
                    Deliverable {activeDeliverable.number} · {activeDeliverable.systemTag}
                  </span>
                  <h4 className="mt-1 font-display text-xl sm:text-2xl font-bold text-[#f0f0f5] break-words">
                    {activeDeliverable.title}
                  </h4>
                </div>
                <span className="self-start sm:self-auto rounded-lg border border-sky-400/30 bg-sky-400/10 px-3 py-1 font-mono text-xs font-semibold text-sky-300 shrink-0 max-w-full">
                  {activeDeliverable.metric}
                </span>
              </div>

              {/* What I Built */}
              <div className="mt-6">
                <span className="font-mono text-xs font-semibold text-[#8b92a8] uppercase tracking-wider block mb-2">
                  What I Built &amp; Shipped:
                </span>
                <p className="text-base sm:text-[17px] text-[#f0f0f5] leading-relaxed font-normal bg-[#111827]/60 p-5 rounded-xl border border-[#f0f0f5]/[0.06]">
                  {activeDeliverable.whatIBuilt}
                </p>
              </div>

              {/* Verified Production Impact */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="rounded-xl border border-[#f0f0f5]/[0.06] bg-[#0e1526]/50 p-4">
                  <span className="font-mono text-[11px] text-[#5a6380] block">
                    Execution Status
                  </span>
                  <span className="mt-1 font-mono text-sm font-semibold text-sky-300 flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-sky-400" />
                    Live in Production
                  </span>
                </div>
                <div className="rounded-xl border border-[#f0f0f5]/[0.06] bg-[#0e1526]/50 p-4">
                  <span className="font-mono text-[11px] text-[#5a6380] block">
                    Target Impact
                  </span>
                  <span className="mt-1 font-mono text-sm font-semibold text-[#f0f0f5]">
                    {activeDeliverable.metric}
                  </span>
                </div>
              </div>
            </div>

            {/* Tech Stack Chips */}
            <div className="mt-8 border-t border-[#f0f0f5]/[0.06] pt-5">
              <span className="font-mono text-xs text-[#5a6380] block mb-2.5">
                Technologies Used:
              </span>
              <div className="flex flex-wrap gap-2">
                {activeDeliverable.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-lg border border-[#f0f0f5]/[0.1] bg-[#111827] px-3 py-1 font-mono text-xs text-[#f0f0f5] hover:border-[#ff2d7b]/40 transition-colors"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            SECTION 4: TECHNICAL SKILLS & STACK (ALL-IN-ONE MARKET KEYWORDS)
           ========================================================================= */}
        <div id="skills" className="mt-24 border-t border-[#f0f0f5]/[0.08] pt-16 scroll-mt-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <div className="flex items-center gap-2">
                <Layers className="h-5 w-5 text-[#ff2d7b]" />
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#f0f0f5]">
                  Technical Skills &amp; Stack
                </h3>
              </div>
              <p className="mt-2 text-sm text-[#8b92a8]">
                All-in-one market stack verified across production backends, cloud infrastructure, full-stack web, and AI systems.
              </p>
            </div>
            <span className="font-mono text-xs text-[#5a6380]">
              5 Core Engineering Domains
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {TECH_STACK_CATEGORIES.map((cat) => (
              <div
                key={cat.category}
                className="rounded-2xl border border-[#f0f0f5]/[0.08] bg-[#0c1220]/75 p-6 backdrop-blur-md hover:border-[#f0f0f5]/[0.16] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#f0f0f5]/[0.06]">
                    <h4 className="font-display text-base font-bold text-[#f0f0f5]">
                      {cat.category}
                    </h4>
                    <span className="font-mono text-[10px] text-sky-300 rounded bg-sky-400/10 px-2 py-0.5 border border-sky-400/20">
                      {cat.badge}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {cat.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-md border border-[#f0f0f5]/[0.06] bg-[#111827]/80 px-2.5 py-1 font-mono text-xs text-[#f0f0f5] hover:text-[#ff2d7b] hover:border-[#ff2d7b]/30 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ExperienceSection;
