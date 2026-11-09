"use client";

import React from "react";
import { ChromaticImage } from "@/components/ui/chromatic-image";
import { ArrowUpRight, Clock, Tag } from "lucide-react";

export interface EssayCardProps {
  id: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  coverSrc: string;
  synopsis: string;
  tags: string[];
  onRead: () => void;
}

export function EssayCard({
  title,
  category,
  readTime,
  date,
  coverSrc,
  synopsis,
  tags,
  onRead,
}: EssayCardProps) {
  return (
    <article className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-stone-200/90 bg-white shadow-[0_2px_16px_-4px_rgba(0,0,0,0.04)] transition-all duration-200 hover:-translate-y-1 hover:border-stone-400/80 hover:shadow-[0_12px_32px_-6px_rgba(0,0,0,0.07)]">
      <div>
        {/* Chromatic Thumbnail */}
        <div className="relative h-48 w-full overflow-hidden bg-stone-900 border-b border-stone-100">
          <ChromaticImage
            src={coverSrc}
            alt={title}
            className="h-full w-full cursor-crosshair"
            zoom={0.14}
            displacement={0.04}
            chromaticShift={0.012}
            tilt={0.15}
          />
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-center justify-between text-xs font-mono text-stone-500">
            <span className="flex items-center gap-1.5 font-medium text-stone-700">
              <Tag className="h-3 w-3 text-amber-600" />
              {category}
            </span>
            <span className="flex items-center gap-1 text-[11px] text-stone-400">
              <Clock className="h-3 w-3" />
              {readTime}
            </span>
          </div>

          <h3 className="mt-3 font-display text-xl font-bold tracking-tight text-stone-900 leading-snug group-hover:text-amber-700 transition-colors">
            {title}
          </h3>

          <p className="mt-3 text-sm leading-relaxed text-stone-600 line-clamp-3">
            {synopsis}
          </p>

          {/* Tags */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-stone-200/80 bg-stone-50 px-2 py-0.5 font-mono text-[10px] text-stone-600"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-stone-100 px-6 py-4 bg-stone-50/50">
        <span className="font-mono text-xs text-stone-400">{date}</span>

        <button
          onClick={onRead}
          className="inline-flex items-center gap-1 text-xs font-semibold text-stone-800 group-hover:text-amber-700 transition-colors cursor-pointer"
        >
          <span>Read Essay</span>
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </button>
      </div>
    </article>
  );
}

