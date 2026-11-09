"use client";

import React from "react";
import { UniversalLoader } from "@/components/ui/universal-loader";

/**
 * ShimmerSkeletonBox — High-performance GPU-composited skeleton block.
 */
export function SkeletonBox({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      className={`animate-skeleton-shimmer rounded-xl border border-[#f0f0f5]/[0.05] bg-[#0c1220]/70 ${className}`}
    />
  );
}

/**
 * ExperienceSkeleton — Exact match for ExperienceSection dimensions to guarantee CLS = 0.
 */
export function ExperienceSkeleton() {
  return (
    <section
      aria-label="Loading Work Experience"
      className="relative z-20 w-full border-t border-[#f0f0f5]/[0.08] bg-transparent px-6 py-24 text-[#f0f0f5] sm:px-8 sm:py-32 lg:px-12 min-h-[1100px]"
    >
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="flex flex-col items-start justify-between gap-6 border-b border-[#f0f0f5]/[0.06] pb-10 md:flex-row md:items-end">
          <div className="space-y-3">
            <SkeletonBox className="h-4 w-36" />
            <SkeletonBox className="h-10 w-72 sm:w-96" />
            <SkeletonBox className="h-4 w-60 sm:w-80" />
          </div>
          <SkeletonBox className="h-6 w-44 rounded-full" />
        </div>

        {/* Company Card Header */}
        <div className="mt-10 rounded-2xl border border-[#f0f0f5]/[0.08] bg-[#0c1220]/80 p-6 sm:p-8 backdrop-blur-xl space-y-4">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center border-b border-[#f0f0f5]/[0.06] pb-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <SkeletonBox className="h-8 w-44" />
                <SkeletonBox className="h-6 w-20 rounded-md" />
              </div>
              <SkeletonBox className="h-5 w-64" />
            </div>
            <SkeletonBox className="h-6 w-36" />
          </div>
          <SkeletonBox className="h-4 w-full max-w-2xl" />
        </div>

        {/* 2-Column Deliverable Switcher */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Left: 5 Deliverable Buttons */}
          <div className="lg:col-span-5 space-y-2.5">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="rounded-xl border border-[#f0f0f5]/[0.05] bg-[#0e1526]/50 p-4 space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <SkeletonBox className="h-4 w-8" />
                  <SkeletonBox className="h-4 w-28" />
                </div>
                <SkeletonBox className="h-5 w-4/5" />
                <SkeletonBox className="h-3 w-1/3" />
              </div>
            ))}
          </div>

          {/* Right: Architecture Showcase Card */}
          <div className="lg:col-span-7 rounded-2xl border border-[#f0f0f5]/[0.08] bg-[#0c1220]/90 p-6 sm:p-8 backdrop-blur-xl flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#f0f0f5]/[0.06] pb-4">
                <div className="space-y-2">
                  <SkeletonBox className="h-4 w-32" />
                  <SkeletonBox className="h-7 w-64 sm:w-80" />
                </div>
                <SkeletonBox className="h-8 w-28 rounded-lg" />
              </div>

              <div className="space-y-2">
                <SkeletonBox className="h-3 w-36" />
                <SkeletonBox className="h-28 w-full rounded-xl" />
              </div>
            </div>

            <div className="flex items-center justify-center py-6">
              <UniversalLoader size="sm" label="Synchronizing Execution Pipeline..." />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * ProjectsSkeleton — Exact match for ProjectsSection layout to guarantee CLS = 0.
 */
export function ProjectsSkeleton() {
  return (
    <section
      aria-label="Loading Featured Projects"
      className="relative z-20 w-full border-t border-[#f0f0f5]/[0.08] bg-transparent px-6 py-24 text-[#f0f0f5] sm:px-8 sm:py-32 lg:px-12 min-h-[950px]"
    >
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-6 border-b border-[#f0f0f5]/[0.06] pb-10 md:flex-row md:items-end">
          <div className="space-y-3">
            <SkeletonBox className="h-4 w-40" />
            <SkeletonBox className="h-10 w-72 sm:w-96" />
            <SkeletonBox className="h-4 w-60 sm:w-80" />
          </div>
          <SkeletonBox className="h-6 w-32 rounded-full" />
        </div>

        {/* Filter Pills */}
        <div className="mt-8 flex flex-wrap gap-2">
          {[1, 2, 3, 4].map((i) => (
            <SkeletonBox key={i} className="h-9 w-28 rounded-xl" />
          ))}
        </div>

        {/* Project Cards Grid */}
        <div className="mt-8 space-y-6">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="rounded-3xl border border-[#f0f0f5]/[0.08] bg-[#0e1526]/80 p-6 sm:p-8 backdrop-blur-2xl space-y-6"
            >
              <div className="flex flex-col justify-between gap-4 border-b border-[#f0f0f5]/[0.06] pb-6 sm:flex-row sm:items-center">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <SkeletonBox className="h-7 w-56" />
                    <SkeletonBox className="h-5 w-16 rounded" />
                  </div>
                  <SkeletonBox className="h-4 w-40" />
                </div>
                <div className="flex items-center gap-3">
                  <SkeletonBox className="h-8 w-24 rounded-lg" />
                  <SkeletonBox className="h-8 w-20 rounded-lg" />
                </div>
              </div>

              <SkeletonBox className="h-14 w-full" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                {[1, 2, 3, 4].map((j) => (
                  <SkeletonBox key={j} className="h-20 w-full rounded-xl" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * ContactSkeleton — Matches ContactConnectivitySection layout to guarantee CLS = 0.
 */
export function ContactSkeleton() {
  return (
    <section
      aria-label="Loading Contact Section"
      className="relative z-20 w-full border-t border-[#f0f0f5]/[0.08] bg-transparent px-6 py-24 text-[#f0f0f5] sm:px-8 sm:py-32 lg:px-12 min-h-[800px]"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-start justify-between gap-6 border-b border-[#f0f0f5]/[0.06] pb-10 md:flex-row md:items-end">
          <div className="space-y-3">
            <SkeletonBox className="h-10 w-72 sm:w-96" />
            <SkeletonBox className="h-4 w-60 sm:w-80" />
          </div>
          <div className="flex gap-2">
            <SkeletonBox className="h-8 w-28 rounded-lg" />
            <SkeletonBox className="h-8 w-36 rounded-lg" />
          </div>
        </div>

        {/* Global Visualization Canvas Placeholder */}
        <div className="mt-10 overflow-hidden rounded-3xl border border-[#f0f0f5]/[0.08] bg-[#0e1526]/80 p-8 flex flex-col items-center justify-center min-h-[380px]">
          <UniversalLoader
            size="lg"
            label="Connecting Telemetry Grid"
            sublabel="Establishing low-latency WebSocket connection to global edge nodes..."
          />
        </div>

        {/* Action Cards */}
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
          <SkeletonBox className="h-72 lg:col-span-7 rounded-3xl" />
          <SkeletonBox className="h-72 lg:col-span-5 rounded-3xl" />
        </div>
      </div>
    </section>
  );
}

