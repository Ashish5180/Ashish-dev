"use client";

import React, { useState } from "react";
import {
  FolderGit2,
  CheckCircle2,
  Cpu,
  Mail,
  MessageSquare,
  HardDrive,
  Terminal,
  ArrowUpRight,
} from "lucide-react";

export type Project = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  techStack: string[];
  highlights: string[];
  metrics?: {
    label: string;
    value: string;
  }[];
  github?: string;
  live?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    id: "reachinbox",
    title: "ReachInbox",
    subtitle: "Distributed Email Job Scheduler & Analytics Platform",
    description:
      "Full-stack distributed email infrastructure for scheduling, throttling, dispatching, monitoring, and recovering high-volume outreach campaigns.",
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Redis",
      "BullMQ",
    ],
    highlights: [
      "Built a zero-cron distributed scheduler using BullMQ delayed queues backed by Redis ZSETs, with PostgreSQL as the persistent job state machine.",
      "Designed atomic O(1) Redis Lua token-bucket rate limiting with adaptive cooldowns for SMTP 429/503 failures.",
      "Optimized 5,000-lead campaign ingestion using PostgreSQL UNNEST and BullMQ addBulk(), reducing thousands of network operations to 2 calls.",
      "Implemented SHA-256 idempotency, dead-letter queue recovery, retry handling, multi-sender isolation, and restart-safe job persistence.",
      "Built a real-time dashboard with SSE telemetry, delivery analytics, heatmaps, authentication, and live job controls.",
    ],
    metrics: [
      {
        label: "Batch scheduling",
        value: "315ms",
      },
      {
        label: "Campaign size",
        value: "5K leads",
      },
      {
        label: "Rate limiter",
        value: "O(1)",
      },
    ],
    github: "#",
    live: "#",
    featured: true,
  },

  {
    id: "whatsapp-router",
    title: "WhatsApp Signal Router",
    subtitle: "AI-Powered Multimodal Notification Router",
    description:
      "Multimodal AI system that analyzes incoming WhatsApp messages and intelligently decides whether to notify, digest, or mute them.",
    techStack: [
      "Python",
      "Gemini",
      "Faster-Whisper",
      "LLM",
      "OCR",
      "ASR",
      "Rule Engine",
    ],
    highlights: [
      "Built an end-to-end multimodal pipeline handling text, images, and voice notes using Gemini Vision OCR and local Faster-Whisper transcription.",
      "Combined deterministic safety rules with LLM reasoning for messages involving OTPs, money, links, urgency, and unknown senders.",
      "Implemented a confidence-weighted safety fallback that applies conservative routing when the model is uncertain.",
      "Created adaptive personalization using historical interaction signals to calculate a 0.00–1.00 sender and group trust score.",
      "Added intelligent digest clustering that groups low-priority messages and generates concise summaries.",
    ],
    metrics: [
      {
        label: "Action accuracy",
        value: "86.7%",
      },
      {
        label: "Mute precision",
        value: "100%",
      },
      {
        label: "Routing modes",
        value: "3",
      },
    ],
    github: "#",
    featured: true,
  },

  {
    id: "mini-dropbox",
    title: "Mini-Dropbox",
    subtitle: "Distributed File Storage System",
    description:
      "Go-based distributed file-storage system with master-node coordination, content-addressed storage, deduplication, and cross-node retrieval.",
    techStack: [
      "Go",
      "REST API",
      "Distributed Systems",
      "Concurrency",
      "Caching",
      "sync.Pool",
    ],
    highlights: [
      "Engineered distributed file storage in Go with master-node coordination and cross-node retrieval.",
      "Implemented content-addressed storage and deduplication using MD5-based file identity.",
      "Designed concurrent-safe storage operations using RWMutex across storage nodes under load.",
      "Optimized memory and retrieval performance using sync.Pool buffer reuse and an in-memory existence cache.",
    ],
    metrics: [
      {
        label: "Throughput",
        value: "2,000 req/s",
      },
      {
        label: "Performance",
        value: "4×",
      },
      {
        label: "Memory reduction",
        value: "43%",
      },
      {
        label: "Retrieval time",
        value: "−55%",
      },
    ],
    github: "#",
  },

  {
    id: "ashos",
    title: "ASHOS",
    subtitle: "AI-Powered CLI Personal OS",
    description:
      "Event-driven Go CLI combining RAG, hybrid vector search, modular infrastructure, and AI-powered productivity workflows.",
    techStack: [
      "Go",
      "OpenAI",
      "RAG",
      "SQLite",
      "SQLite-vec",
      "Vector Search",
    ],
    highlights: [
      "Built an event-driven CLI OS in Go using dependency injection and interface-driven storage.",
      "Implemented a RAG engine from scratch using OpenAI embeddings, SQLite-vec, custom cosine similarity, and GPT synthesis.",
      "Integrated 4+ data sources through an asynchronous ingestion pipeline.",
      "Exposed 4 AI productivity commands while enforcing concurrent access safety across 6+ modules.",
    ],
    metrics: [
      {
        label: "Data sources",
        value: "4+",
      },
      {
        label: "AI commands",
        value: "4",
      },
      {
        label: "Concurrent modules",
        value: "6+",
      },
    ],
    github: "#",
  },
];

function getProjectIcon(id: string) {
  switch (id) {
    case "reachinbox":
      return <Mail className="h-6 w-6 text-blue-600" />;
    case "whatsapp-router":
      return <MessageSquare className="h-6 w-6 text-emerald-600" />;
    case "mini-dropbox":
      return <HardDrive className="h-6 w-6 text-amber-600" />;
    case "ashos":
      return <Terminal className="h-6 w-6 text-indigo-600" />;
    default:
      return <Cpu className="h-6 w-6 text-slate-700" />;
  }
}

export interface ProjectsSectionProps {
  data?: Project[];
  className?: string;
}

export function ProjectsSection({
  data = projects,
  className = "",
}: ProjectsSectionProps) {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filteredProjects = data.filter((project) => {
    if (activeFilter === "featured") return project.featured;
    if (activeFilter === "go") return project.techStack.includes("Go");
    if (activeFilter === "ai")
      return (
        project.techStack.includes("AI / RAG") ||
        project.techStack.includes("LLM") ||
        project.techStack.includes("OpenAI") ||
        project.techStack.includes("Gemini")
      );
    return true;
  });

  return (
    <section
      id="projects"
      aria-label="Featured Projects"
      className={`relative z-20 w-full border-t border-slate-200 bg-slate-50/60 px-4 py-24 text-slate-900 sm:px-6 lg:px-8 scroll-mt-16 ${className}`}
    >
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="mb-12 flex flex-col items-start justify-between gap-6 border-b border-slate-200 pb-6 md:flex-row md:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-700 shadow-xs">
              <FolderGit2 className="h-3.5 w-3.5 text-blue-600" />
              <span>Selected Work</span>
            </div>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Systems &amp; Production Projects
            </h2>
            <p className="mt-1 max-w-2xl text-sm text-slate-600">
              Distributed schedulers, multimodal notification routers,
              content-addressed storage, and custom RAG engines built for scale.
            </p>
          </div>

          {/* Interactive Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 rounded-xl border border-slate-200 bg-white p-1 shadow-xs">
            {[
              { id: "all", label: "All Projects" },
              { id: "featured", label: "Featured" },
              { id: "go", label: "Go & Systems" },
              { id: "ai", label: "AI & RAG" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveFilter(tab.id)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all duration-200 ${
                  activeFilter === tab.id
                    ? "bg-slate-900 text-white shadow-xs"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className="group relative flex flex-col justify-between rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg sm:p-8"
            >
              <div>
                {/* Header Row: Icon + Badges + Links */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 shadow-2xs transition-transform duration-300 group-hover:scale-105">
                      {getProjectIcon(project.id)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-bold tracking-tight text-slate-900">
                          {project.title}
                        </h3>
                        {project.featured && (
                          <span className="rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-700">
                            Featured
                          </span>
                        )}
                      </div>
                      <p className="text-xs font-medium text-slate-500">
                        {project.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Actions Links */}
                  <div className="flex items-center gap-1.5">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition-colors hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950"
                        title="GitHub Repository"
                      >
                        <svg
                          className="h-4 w-4"
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
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noreferrer"
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition-colors hover:border-slate-300 hover:bg-slate-50 hover:text-blue-600"
                        title="Live Demo"
                      >
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="mt-5 text-sm font-normal leading-relaxed text-slate-700">
                  {project.description}
                </p>

                {/* Performance Metrics Bar (if available) */}
                {project.metrics && project.metrics.length > 0 && (
                  <div className="mt-5 grid grid-cols-3 gap-2.5 rounded-2xl border border-slate-100 bg-slate-50/80 p-3 text-center">
                    {project.metrics.map((metric, idx) => (
                      <div key={idx} className="flex flex-col items-center">
                        <span className="text-base font-extrabold tracking-tight text-slate-900 font-mono sm:text-lg">
                          {metric.value}
                        </span>
                        <span className="text-[10px] font-medium text-slate-500">
                          {metric.label}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Engineering Highlights */}
                <div className="mt-5 space-y-2 border-t border-slate-100 pt-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 font-mono">
                    Key Implementations
                  </span>
                  <div className="space-y-2 pt-1">
                    {project.highlights.slice(0, 3).map((highlight, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 text-xs font-normal leading-relaxed text-slate-700"
                      >
                        <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-slate-100 text-emerald-700 font-bold">
                          <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                        </div>
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tech Stack Chips (Bottom) */}
              <div className="mt-6 border-t border-slate-100 pt-4">
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-[11px] font-medium text-slate-700 shadow-2xs transition-colors hover:border-slate-300 hover:bg-white"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProjectsSection;
