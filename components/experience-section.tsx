"use client";

import React from "react";
import {
  Briefcase,
  Calendar,
  MapPin,
  Building2,
  CheckCircle2,
} from "lucide-react";

export type Experience = {
  id: string;
  company: string;
  role: string;
  location: string;
  period: string;
  type?: string;
  description: string;
  techStack: string[];
  highlights: string[];
  metrics?: {
    value: string;
    label: string;
  }[];
};

export const experiences: Experience[] = [
  {
    id: "asoasis-tech",
    company: "ASOasis Tech",
    role: "Software Developer Intern",
    location: "Remote",
    period: "Aug 2025 — Present",
    type: "Internship",

    description:
      "Building production-grade backend, AI, cloud, and workflow automation systems across FinTech, SaaS, and AI products.",

    techStack: [
      "Go",
      "AWS Lambda",
      "DynamoDB",
      "S3",
      "EventBridge",
      "SQS",
      "BigQuery",
      "Redis",
      "MySQL",
      "Gorse",
      "React",
      "Next.js",
      "AI / RAG",
    ],

    highlights: [
      "Architected a serverless Go backend spanning 50+ product domains on DynamoDB, enforcing zero-Scan reads and 15+ shared rate limiters for scalable production workloads.",

      "Shipped a real-time AI chat backend for a 100K+ download consumer app with sub-200ms latency, combining Gorse recommendations, Redis, MySQL, and a sigmoid-based matching model across 5 engagement signals.",

      "Built 6+ grounded-generation AI features including adaptive mock interviews, resume tailoring, and promotion packets, enforcing server-verified citations and blocking unsupported AI output before persistence.",

      "Delivered a multi-tenant workflow automation platform using EventBridge scheduling and 2–8 concurrent workers, alongside a BigQuery analytics backend that reduced repeat query volume by ~95% through 5-minute TTL caching.",

      "Hardened production systems with SSRF protection, no-egress sandboxing, PII-minimized logging, and GDPR export/erasure workflows, while tracing and fixing a live rate-limit bypass using signed-header trust verification.",
    ],

    metrics: [
      {
        value: "50+",
        label: "Product domains",
      },
      {
        value: "100K+",
        label: "App downloads",
      },
      {
        value: "<200ms",
        label: "AI backend latency",
      },
      {
        value: "6+",
        label: "Grounded AI features",
      },
      {
        value: "~95%",
        label: "Repeat query reduction",
      },
    ],
  },
];

export interface ExperienceSectionProps {
  data?: Experience[];
  className?: string;
}

export function ExperienceSection({
  data = experiences,
  className = "",
}: ExperienceSectionProps) {
  return (
    <section
      id="experience"
      aria-label="Work Experience"
      className={`relative z-20 w-full border-t border-slate-200 bg-white px-4 py-24 text-slate-900 sm:px-6 lg:px-8 scroll-mt-16 ${className}`}
    >
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="mb-14 flex flex-col items-start justify-between gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-700 shadow-xs">
              <Briefcase className="h-3.5 w-3.5 text-blue-600" />
              <span>Career History</span>
            </div>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Production Experience &amp; Impact
            </h2>
            <p className="mt-1 max-w-2xl text-sm text-slate-600">
              Architecting resilient serverless backends, high-throughput cloud
              infrastructure, and production AI systems at scale.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Currently Shipping at ASOasis Tech</span>
          </div>
        </div>

        {/* Experience Timeline Cards */}
        <div className="flex flex-col gap-10">
          {data.map((exp) => (
            <article
              key={exp.id}
              className="relative overflow-hidden rounded-3xl border border-slate-200/90 bg-slate-50/50 p-6 shadow-sm transition-all duration-300 hover:border-slate-300 hover:shadow-md sm:p-8 lg:p-10"
            >
              {/* Top Row: Role, Company & Period Info */}
              <div className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-6 md:flex-row md:items-center">
                <div className="flex items-start gap-4">
                  {/* Company Monogram Icon */}
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-slate-300 bg-white text-slate-900 shadow-xs font-bold font-mono text-lg">
                    {exp.company
                      .split(" ")
                      .map((w) => w[0])
                      .join("")
                      .slice(0, 2)}
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2.5">
                      <h3 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                        {exp.role}
                      </h3>
                      {exp.type && (
                        <span className="rounded-full border border-blue-200 bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-700">
                          {exp.type}
                        </span>
                      )}
                    </div>

                    <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm font-medium text-slate-600">
                      <span className="flex items-center gap-1.5 font-semibold text-slate-900">
                        <Building2 className="h-4 w-4 text-slate-400" />
                        {exp.company}
                      </span>
                      <span className="flex items-center gap-1.5 text-slate-500">
                        <MapPin className="h-3.5 w-3.5 text-slate-400" />
                        {exp.location}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Period Badge */}
                <div className="flex items-center gap-2 self-start rounded-xl border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-700 shadow-xs font-mono md:self-center">
                  <Calendar className="h-3.5 w-3.5 text-slate-400" />
                  <span>{exp.period}</span>
                </div>
              </div>

              {/* Description Statement */}
              <p className="mt-6 text-base font-medium text-slate-800 leading-relaxed">
                {exp.description}
              </p>

              {/* Impact Metrics Row (5 Cards) */}
              {exp.metrics && exp.metrics.length > 0 && (
                <div className="mt-8">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono">
                    Key Performance Metrics
                  </span>
                  <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                    {exp.metrics.map((metric, idx) => (
                      <div
                        key={idx}
                        className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-2xs transition-all hover:border-slate-300"
                      >
                        <span className="text-2xl font-extrabold tracking-tight text-slate-900 font-mono sm:text-3xl">
                          {metric.value}
                        </span>
                        <span className="mt-1 text-xs font-medium text-slate-600">
                          {metric.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Engineering Highlights */}
              <div className="mt-8">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono">
                  Engineering Scope &amp; Deliverables
                </span>

                <div className="mt-3 space-y-3">
                  {exp.highlights.map((highlight, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3.5 rounded-xl border border-slate-200/70 bg-white p-4 text-sm text-slate-700 leading-relaxed shadow-2xs transition-colors hover:border-slate-300"
                    >
                      <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-700">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                      </div>
                      <p className="flex-1 font-normal text-slate-800">{highlight}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack Chips Bar */}
              <div className="mt-8 border-t border-slate-200 pt-6">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono">
                  Technologies &amp; Architecture
                </span>
                <div className="mt-3 flex flex-wrap gap-2">
                  {exp.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-lg border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-800 shadow-2xs transition-colors hover:border-slate-400 hover:bg-slate-50"
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

export default ExperienceSection;
