"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChromaticImage } from "@/components/ui/chromatic-image";
import { X, Clock, Calendar, Share2, Check } from "lucide-react";

export interface EssayArticleData {
  id: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  coverSrc: string;
  synopsis: string;
  content: {
    intro: string;
    sections: {
      heading: string;
      paragraphs: string[];
      codeSnippet?: string;
    }[];
    conclusion: string;
  };
}

export interface EssayReaderModalProps {
  article: EssayArticleData | null;
  onClose: () => void;
}

export function EssayReaderModal({ article, onClose }: EssayReaderModalProps) {
  const [copied, setCopied] = React.useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (article) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [article, onClose]);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <AnimatePresence>
      {article && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
            className="relative z-10 flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-stone-200 bg-[#fdfbf7] shadow-2xl"
          >
            {/* Sticky Reader Header */}
            <header className="sticky top-0 z-20 flex items-center justify-between border-b border-stone-200/80 bg-[#fdfbf7]/90 px-6 py-4 backdrop-blur-md">
              <div className="flex items-center gap-3 text-xs font-mono text-stone-500">
                <span className="font-semibold text-stone-900">{article.category}</span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {article.readTime}
                </span>
                <span>·</span>
                <span className="hidden sm:flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {article.date}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleShare}
                  className="flex h-8 items-center gap-1.5 rounded-lg border border-stone-200 bg-white px-2.5 text-xs font-mono text-stone-600 hover:bg-stone-50 transition-colors shadow-sm cursor-pointer"
                  title="Copy link to clipboard"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Share2 className="h-3.5 w-3.5" />}
                  <span>{copied ? "Copied" : "Share"}</span>
                </button>

                <button
                  onClick={onClose}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-stone-200 bg-white text-stone-600 hover:bg-stone-100 hover:text-stone-900 transition-colors shadow-sm cursor-pointer"
                  aria-label="Close article"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </header>

            {/* Scrollable Article Body */}
            <div className="overflow-y-auto px-6 py-8 sm:px-12 sm:py-12">
              {/* Header Title */}
              <div className="max-w-2xl">
                <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-950 leading-[1.1]">
                  {article.title}
                </h1>
                <p className="mt-4 text-lg text-stone-600 leading-relaxed font-normal">
                  {article.synopsis}
                </p>
              </div>

              {/* Cover Artwork */}
              <div className="mt-8 overflow-hidden rounded-2xl border border-stone-200 bg-stone-950">
                <ChromaticImage
                  src={article.coverSrc}
                  alt={article.title}
                  className="h-64 sm:h-80 w-full"
                  zoom={0.12}
                  displacement={0.03}
                  chromaticShift={0.012}
                  tilt={0.15}
                />
              </div>

              {/* Article Content */}
              <div className="mt-10 max-w-2xl text-[16px] leading-relaxed text-stone-700">
                <p className="text-lg leading-relaxed text-stone-800 font-medium">
                  {article.content.intro}
                </p>

                {article.content.sections.map((sec, idx) => (
                  <section key={idx} className="mt-10">
                    <h2 className="font-display text-2xl font-bold tracking-tight text-stone-900">
                      {sec.heading}
                    </h2>
                    {sec.paragraphs.map((p, pIdx) => (
                      <p key={pIdx} className="mt-4 text-stone-600 leading-relaxed">
                        {p}
                      </p>
                    ))}
                    {sec.codeSnippet && (
                      <div className="mt-6 overflow-hidden rounded-xl border border-stone-800 bg-[#0c1220] p-4 text-xs font-mono text-[#f0f0f5]">
                        <div className="mb-2 text-[10px] text-stone-400 uppercase tracking-wider">
                          Go 1.24 Architecture
                        </div>
                        <pre className="overflow-x-auto leading-relaxed">
                          <code>{sec.codeSnippet}</code>
                        </pre>
                      </div>
                    )}
                  </section>
                ))}

                {/* Conclusion Callout */}
                <div className="mt-12 rounded-2xl border border-stone-200 bg-stone-50 p-6 text-sm text-stone-700">
                  <h3 className="font-semibold text-stone-900 mb-2 font-display">
                    Key Architectural Takeaway
                  </h3>
                  <p className="leading-relaxed">
                    {article.content.conclusion}
                  </p>
                </div>

                {/* Author Signoff */}
                <div className="mt-12 border-t border-stone-200 pt-6 flex items-center justify-between text-xs font-mono text-stone-500">
                  <div>
                    <span className="text-stone-900 font-medium">Ashish Yadav</span>
                    <span className="block text-[11px] text-stone-400">Distributed Systems Engineer</span>
                  </div>
                  <span>Published in The Creative Atelier</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

