"use client";

import React from "react";
import { ChromaticImage } from "@/components/ui/chromatic-image";
import { ArrowRight, BookOpen, Clock, Tag } from "lucide-react";

export interface FeaturedDispatchProps {
  onReadClick: () => void;
}

export function FeaturedDispatch({ onReadClick }: FeaturedDispatchProps) {
  return (
    <article className="group relative overflow-hidden rounded-3xl border border-stone-200/90 bg-white shadow-[0_4px_24px_-6px_rgba(0,0,0,0.04)] transition-all duration-300 hover:border-stone-400/80 hover:shadow-[0_16px_48px_-12px_rgba(0,0,0,0.08)]">
      {/* Interactive WebGL Chromatic Cover */}
      <div className="relative w-full overflow-hidden border-b border-stone-100 bg-stone-950">
        <ChromaticImage
          src="/images/creative/microservices.svg"
          alt="The Modular Monolith Architecture Blueprint"
          className="h-64 sm:h-80 md:h-96 w-full cursor-crosshair"
          zoom={0.12}
          displacement={0.035}
          chromaticShift={0.015}
          tilt={0.18}
        >
          <div className="pointer-events-none p-5 sm:p-6 bg-gradient-to-t from-black/80 via-black/30 to-transparent">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 backdrop-blur-md px-3 py-1 font-mono text-[11px] font-medium text-white border border-white/20 shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
              Interactive WebGL Shader Cover · Drag Cursor
            </span>
          </div>
        </ChromaticImage>
      </div>

      {/* Editorial Content Block */}
      <div className="p-6 sm:p-8 lg:p-10">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-stone-500">
          <div className="flex items-center gap-2">
            <Tag className="h-3.5 w-3.5 text-amber-600" />
            <span className="font-semibold text-stone-900">Systems Architecture</span>
            <span>·</span>
            <span>Flagship Dispatch</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              8 min read
            </span>
            <span>·</span>
            <span>November 2026</span>
          </div>
        </div>

        <h2 className="mt-4 font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-stone-950 leading-[1.15] group-hover:text-amber-800 transition-colors">
          Why I Stopped Over-Engineering Microservices
        </h2>

        <p className="mt-4 text-base sm:text-lg leading-relaxed text-stone-600 font-normal">
          Every early-stage team dreams of looking like Netflix with 14 fragmented microservices. Here is an honest postmortem on why a single well-indexed database with clean transactional boundaries and Go worker pools handles 50,000 requests/sec with a fraction of the network overhead, mental grief, and AWS invoice.
        </p>

        {/* Takeaway Specs */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 border-y border-stone-100 py-4 font-mono text-xs">
          <div>
            <span className="text-stone-400 block">Baseline Latency</span>
            <strong className="text-stone-900 text-sm">850µs vs 32ms mesh</strong>
          </div>
          <div>
            <span className="text-stone-400 block">Concurrency Model</span>
            <strong className="text-stone-900 text-sm">Go Worker Pools</strong>
          </div>
          <div>
            <span className="text-stone-400 block">Persistence</span>
            <strong className="text-stone-900 text-sm">Zero-Scan Postgres</strong>
          </div>
        </div>

        {/* Read CTA Action */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={onReadClick}
            className="group/btn inline-flex items-center gap-2 rounded-xl bg-stone-950 px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition-all hover:bg-stone-800 active:scale-[0.98] cursor-pointer"
          >
            <BookOpen className="h-3.5 w-3.5 text-amber-400" />
            <span>Read Full Dispatch</span>
            <ArrowRight className="h-3.5 w-3.5 text-stone-400 transition-transform duration-150 group-hover/btn:translate-x-1 group-hover/btn:text-white" />
          </button>

          <span className="text-xs font-mono text-stone-400">
            Author: Ashish Yadav · Systems &amp; Go
          </span>
        </div>
      </div>
    </article>
  );
}

