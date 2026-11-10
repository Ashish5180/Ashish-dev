"use client";

import React, { useState } from "react";
import { ArrowUpRight, Cpu, Bot, Rocket, ShieldAlert } from "lucide-react";

export interface ProjectData {
  id: string;
  title: string;
  categoryTag: string;
  category: "all" | "ai" | "devops" | "backend";
  summary: string;
  architecture: {
    heading: string;
    detail: string;
  }[];
  keyMetric: {
    label: string;
    value: string;
  };
  techStack: string[];
  githubUrl: string;
  icon: React.ComponentType<{ className?: string }>;
  isFlagship?: boolean;
}

function GithubIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export const PROJECTS: ProjectData[] = [
  {
    id: "agentos",
    title: "AgentOS — Autonomous AI Agent Platform",
    categoryTag: "Full-Stack & Cloud AI · Go + Next.js + AWS",
    category: "ai",
    summary:
      "A full-stack platform to run, schedule, and monitor autonomous AI agents safely in the cloud with human approval gates for sensitive actions.",
    architecture: [
      {
        heading: "Serverless Workflow Engine",
        detail:
          "Uses AWS Step Functions (waitForTaskToken) to pause AI agents whenever they request sensitive permissions and resume instantly after human approval.",
      },
      {
        heading: "Reliable Database Transactions",
        detail:
          "Implements the Transactional Outbox pattern in PostgreSQL (pgx/v5) with optimistic locking so no task events are ever lost.",
      },
      {
        heading: "Instant Cache Updates",
        detail:
          "Caches agent permissions and long-term user memory in Redis with instant write-through invalidation.",
      },
      {
        heading: "Live Mission Control UI",
        detail:
          "Next.js 16 and React 19 dashboard with real-time step receipts, cron scheduling via EventBridge, and one-click approvals.",
      },
    ],
    keyMetric: {
      label: "Governance",
      value: "Human-in-the-Loop Safe",
    },
    techStack: ["Go", "Next.js 16", "AWS Step Functions", "PostgreSQL", "Redis", "AWS CDK"],
    githubUrl: "https://github.com/Ashish5180",
    icon: Bot,
    isFlagship: true,
  },
  {
    id: "release-flight-control",
    title: "Release Flight Control — Staged Deployment & Rollback System",
    categoryTag: "Backend & DevOps Control Plane · Go + Next.js",
    category: "devops",
    summary:
      "A deployment management platform that rolls out app updates in safe stages (1% → 5% → 25% → 100%), monitors live error metrics, and triggers automatic rollbacks when bugs happen.",
    architecture: [
      {
        heading: "Automated Metric Guardrails",
        detail:
          "Background Go workers continuously monitor live app health metrics and flag releases if success rates drop below threshold.",
      },
      {
        heading: "Dynamic Feature Flag Control",
        detail:
          "Integrates with Firebase Remote Config via clean adapter interfaces to update rollout percentages or revert versions instantly.",
      },
      {
        heading: "Live Dashboard Streaming",
        detail:
          "Streams real-time deployment status and immutable audit logs to the Next.js frontend using Server-Sent Events (SSE).",
      },
      {
        heading: "Safe Concurrency",
        detail:
          "Built with Go goroutines, channels, sync.RWMutex, and graceful OS signal shutdown (SIGINT/SIGTERM).",
      },
    ],
    keyMetric: {
      label: "Automation",
      value: "Real-Time Auto-Rollback",
    },
    techStack: ["Go", "Next.js", "PostgreSQL", "Server-Sent Events (SSE)", "Firebase", "TypeScript"],
    githubUrl: "https://github.com/Ashish5180",
    icon: Rocket,
    isFlagship: true,
  },
  {
    id: "sketchtalk",
    title: "SketchTalk — Voice-to-Architecture Whiteboard",
    categoryTag: "Full-Stack AI Product · FastAPI + Gemini + React",
    category: "ai",
    summary:
      "An interactive AI whiteboard where engineers speak system architectures out loud and watch validated diagrams build and update live on canvas.",
    architecture: [
      {
        heading: "Hybrid Voice Pipeline",
        detail:
          "Combines Web Speech captions, faster-whisper audio streaming, and RapidFuzz phonetic correction to fix spoken tech jargon (\"post gress\" → PostgreSQL).",
      },
      {
        heading: "Zero-Latency Rule Engine",
        detail:
          "Executes common voice commands (\"add Redis\", \"replace RabbitMQ with Kafka\") in <1ms via deterministic rules, calling Google Gemini only for complex sentences.",
      },
      {
        heading: "Hallucination Guardrails",
        detail:
          "Strict Pydantic semantic validator blocks broken connections, self-loops, and invalid graph edits (0% unsafe mutations).",
      },
      {
        heading: "Interactive Studio UI",
        detail:
          "Built with Next.js 16 and React Flow v12 featuring smart node placement, O(1) undo/redo, and Mermaid/JSON export.",
      },
    ],
    keyMetric: {
      label: "Latency",
      value: "<1ms Fast-Path Edits",
    },
    techStack: ["Python (FastAPI)", "Google Gemini", "Next.js 16", "React Flow", "Faster-Whisper", "WebSockets"],
    githubUrl: "https://github.com/Ashish5180",
    icon: Cpu,
    isFlagship: false,
  },
  {
    id: "fault-injection-storage",
    title: "Distributed Fault-Injection Testing Engine & Mini-Dropbox",
    categoryTag: "Core Backend & Reliability · Python + Go",
    category: "backend",
    summary:
      "High-performance backend testing and storage systems: a deterministic fault-injection engine for microservices and a concurrent file storage server in Go.",
    architecture: [
      {
        heading: "Distributed Bug Detection",
        detail:
          "Simulates network drops, delays, and race conditions across 4 microservices, catching 15/15 concurrency bugs with 0 false alarms across 5,000 workflows (178k events/sec).",
      },
      {
        heading: "Root-Cause Trace Slicer",
        detail:
          "Automatically shrinks 40-event crash logs down to the exact 5 causal events that caused the failure, with 100% reproducible SHA-256 replay.",
      },
      {
        heading: "High-Speed File Storage (Mini-Dropbox)",
        detail:
          "Built a content-addressed storage engine in Go using sync.Pool 32KB buffers, boosting concurrent throughput 4x to 2,000 req/s and cutting RAM usage by 43%.",
      },
      {
        heading: "AI Eval & Fine-Tuning Suite (AgentGym)",
        detail:
          "Created 3 sandboxed AI testing environments backed by 106 passing unit tests and ran local LoRA fine-tuning on Apple Silicon (mlx-lm).",
      },
    ],
    keyMetric: {
      label: "Throughput",
      value: "2,000 req/s (4x Gain)",
    },
    techStack: ["Go", "Python 3.12", "SQLite", "Hypothesis Fuzzing", "Pytest", "sync.Pool"],
    githubUrl: "https://github.com/Ashish5180",
    icon: ShieldAlert,
    isFlagship: false,
  },
];

export function ProjectsSection({ className = "" }: { className?: string }) {
  const [activeFilter, setActiveFilter] = useState<"all" | "ai" | "devops" | "backend">("all");

  const filteredProjects =
    activeFilter === "all"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeFilter);

  return (
    <section
      id="projects"
      aria-label="Featured Engineering Projects"
      className={`relative z-20 w-full border-t border-[#f0f0f5]/[0.08] bg-transparent px-4 py-20 text-[#f0f0f5] sm:px-8 sm:py-32 lg:px-12 scroll-mt-20 ${className}`}
    >
      <div className="mx-auto max-w-6xl">
        {/* Section Heading */}
        <div className="flex flex-col items-start justify-between gap-6 border-b border-[#f0f0f5]/[0.06] pb-10 md:flex-row md:items-end">
          <div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-[-0.035em] text-[#f0f0f5]">
              Featured Engineering Projects
            </h2>
            <p className="mt-3 max-w-2xl text-base text-[#8b92a8] leading-relaxed">
              Full-stack platforms, AI agent systems, and distributed backends built from scratch.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 rounded-xl border border-[#f0f0f5]/[0.08] bg-[#0c1220] p-1 font-mono text-xs">
            {[
              { id: "all", label: "All Projects" },
              { id: "ai", label: "Full-Stack & AI" },
              { id: "devops", label: "DevOps & Control" },
              { id: "backend", label: "Backend & Systems" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveFilter(tab.id as typeof activeFilter)}
                className={`rounded-lg px-3 py-1.5 font-medium transition-colors cursor-pointer ${
                  activeFilter === tab.id
                    ? "bg-[#ff2d7b] text-white shadow-[0_2px_12px_rgba(255,45,123,0.3)]"
                    : "text-[#8b92a8] hover:text-[#f0f0f5]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Cards Layout */}
        <div className="mt-12 space-y-8">
          {filteredProjects.map((project) => {
            const Icon = project.icon;
            return (
              <article
                key={project.id}
                className={`rounded-2xl border transition-all p-5 sm:p-8 ${
                  project.isFlagship
                    ? "border-[#f0f0f5]/[0.1] bg-[#0c1220]/90 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.6)]"
                    : "border-[#f0f0f5]/[0.06] bg-[#0a0e1a]/60 hover:border-[#f0f0f5]/[0.12]"
                }`}
              >
                {/* Title & Metadata Row */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#f0f0f5]/[0.06] pb-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#f0f0f5]/[0.08] bg-[#111827] text-[#f0f0f5]">
                      <Icon className="h-5 w-5 text-[#ff2d7b]" />
                    </div>

                    <div>
                      <div className="flex items-center gap-2.5">
                        <h3 className="font-display text-2xl font-bold tracking-tight text-[#f0f0f5]">
                          {project.title}
                        </h3>
                        {project.isFlagship && (
                          <span className="rounded border border-[#ff2d7b]/40 bg-[#ff2d7b]/10 px-2 py-0.5 font-mono text-[10px] font-semibold text-[#ff2d7b]">
                            Flagship
                          </span>
                        )}
                      </div>
                      <p className="font-mono text-xs text-[#8b92a8] mt-0.5">
                        {project.categoryTag}
                      </p>
                    </div>
                  </div>

                  {/* Actions & Metrics */}
                  <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto pt-1 sm:pt-0">
                    <div className="text-left sm:text-right">
                      <span className="block font-mono text-[10px] text-[#5a6380] uppercase tracking-wider">
                        {project.keyMetric.label}
                      </span>
                      <span className="font-mono text-xs font-semibold text-sky-300">
                        {project.keyMetric.value}
                      </span>
                    </div>

                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-[#f0f0f5]/[0.08] bg-[#111827] px-3 py-1.5 font-mono text-xs text-[#f0f0f5] hover:border-[#ff2d7b]/50 hover:text-[#ff2d7b] transition-colors shrink-0"
                      aria-label={`View ${project.title} on GitHub`}
                    >
                      <GithubIcon className="h-3.5 w-3.5" />
                      <span>Code</span>
                      <ArrowUpRight className="h-3.5 w-3.5 text-[#5a6380]" />
                    </a>
                  </div>
                </div>

                {/* Summary Description */}
                <p className="mt-5 text-base leading-relaxed text-[#f0f0f5]">
                  {project.summary}
                </p>

                {/* Key Features / Architectural Mechanics Grid */}
                <div className="mt-6 space-y-2.5 border-t border-[#f0f0f5]/[0.06] pt-5">
                  <div className="font-mono text-xs text-[#5a6380] uppercase tracking-wider mb-2">
                    Key Features &amp; Architecture
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs leading-relaxed text-[#8b92a8]">
                    {project.architecture.map((item, i) => (
                      <div
                        key={i}
                        className="flex flex-col gap-1 rounded-xl border border-[#f0f0f5]/[0.04] bg-[#111827]/40 p-4"
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[#ff2d7b] font-bold text-xs">
                            0{i + 1}
                          </span>
                          <span className="font-semibold text-[#f0f0f5]">
                            {item.heading}
                          </span>
                        </div>
                        <p className="text-[#a3a9b8] leading-relaxed pl-6">
                          {item.detail}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Footprint Tags */}
                <div className="mt-6 flex flex-wrap items-center gap-1.5 pt-2 border-t border-[#f0f0f5]/[0.04]">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-[#f0f0f5]/[0.06] bg-[#0c1220] px-2.5 py-1 font-mono text-xs text-[#8b92a8]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ProjectsSection;
