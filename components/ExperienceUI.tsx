"use client";
import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useSpring
} from "framer-motion";
import { calsans } from "@/fonts/calsans";
import { EXPERIENCES } from "@/lib/experience-data";
import {
  MapPin,
  Calendar,
  Zap,
  Sparkles,
  MoveRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Experience3D } from "./Experience3D";

export function ExperienceUI() {
  const [index, setIndex] = useState(0);

  // Sync for 3D background morphing
  const progressValue = index / (EXPERIENCES.length - 1 || 1);
  const progress = useMotionValue(progressValue);
  const smoothProgress = useSpring(progress, { stiffness: 100, damping: 30 });

  const next = () => {
    const nextIdx = (index + 1) % EXPERIENCES.length;
    setIndex(nextIdx);
    progress.set(nextIdx / (EXPERIENCES.length - 1 || 1));
  };

  const prev = () => {
    const prevIdx = (index - 1 + EXPERIENCES.length) % EXPERIENCES.length;
    setIndex(prevIdx);
    progress.set(prevIdx / (EXPERIENCES.length - 1 || 1));
  };

  return (
    <div className="bg-[#FAF9F6] text-[#121212] w-full h-screen relative overflow-hidden flex flex-col items-center pt-24 pb-12">
      {/* Immersive 3D Experiencepersistence */}
      <Experience3D progress={smoothProgress} />

      {/* Chapter Marker - Repositioned Lower to Avoid Nav Overlap */}
      <header className="absolute top-28 left-12 z-40 hidden md:block">
        <div className="flex items-center gap-4 text-blue-600 font-bold uppercase tracking-[0.4em] text-[8px] opacity-30">
          Architectural // Ledger
        </div>
      </header>

      {/* The 3D Shuffle Narrative Deck - Constrained Height with Proper Clearance */}
      <div className="relative z-10 w-full max-w-[1300px] mx-auto px-6 h-[calc(100vh-240px)] flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
            className="w-full h-full flex items-center justify-center"
          >
            <ExperienceCard exp={EXPERIENCES[index]} idx={index} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* High-End Industrial Navigation - Optimized Bottom Spacing */}
      <footer className="absolute bottom-6 left-0 w-full px-12 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between border-t border-neutral-200/40 pt-6">
          <div className="space-y-3">
            <div className="text-[9px] font-black uppercase tracking-[0.4em] text-neutral-300">Milestone.0{index + 1}</div>
            <div className="flex gap-1.5">
              {EXPERIENCES.map((_, i) => (
                <div
                  key={i}
                  className={cn("h-1 rounded-full transition-all duration-500",
                    i === index ? "w-10 bg-blue-600" : "w-3 bg-neutral-200")}
                />
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={prev}
              className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-neutral-400 hover:text-blue-600 transition-colors"
            >
              <div className="w-10 h-10 rounded-full border border-neutral-200 flex items-center justify-center group-hover:border-blue-600 group-active:scale-90 transition-all">
                <MoveRight size={16} className="rotate-180" />
              </div>
            </button>
            <button
              onClick={next}
              className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-neutral-400 hover:text-blue-600 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-[#121212] flex items-center justify-center group-hover:bg-blue-600 group-active:scale-90 transition-all">
                <MoveRight size={16} className="text-white" />
              </div>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

interface ExperienceHighlight {
  title: string;
  description: string;
  metrics: string[];
  tags: string[];
}

interface Experience {
  id: number;
  company: string;
  role: string;
  type: string;
  duration: string;
  location: string;
  badge: string;
  tagline: string;
  highlights: ExperienceHighlight[];
}

function ExperienceCard({ exp, idx }: { exp: Experience, idx: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [3, -3]));
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-3, 3]));

  function onMouseMove(event: React.MouseEvent) {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left) / rect.width - 0.5);
    y.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  return (
    <motion.div
      style={{ rotateX, rotateY }}
      onMouseMove={onMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); rotateX.set(0); rotateY.set(0); }}
      className="w-full h-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center p-6 md:p-8 lg:p-12 rounded-[52px] bg-white/40 border border-white shadow-[0_40px_100px_rgba(0,0,0,0.02)] backdrop-blur-3xl relative overflow-hidden perspective-2000"
    >
      {/* Editorial Watermark - Tuned Down */}
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 -z-10 text-[200px] md:text-[350px] font-black text-neutral-200/10 italic leading-none select-none">
        0{idx + 1}
      </div>

      {/* Identity Context - Scaled for Absolute Fit */}
      <div className="lg:col-span-12 xl:col-span-5 space-y-6">
        <div className="flex items-center gap-4 text-blue-600 font-bold uppercase tracking-[0.4em] text-[7px] opacity-60">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
          Core Chapter
        </div>

        <div className="space-y-4">
          <h2 className={cn("text-4xl md:text-[58px] font-black tracking-[-0.04em] leading-[0.85] text-[#121212] whitespace-pre-wrap max-w-sm xl:max-w-md", calsans.className)}>
            {exp.company}
          </h2>
          <div className="flex items-center gap-4 text-lg md:text-[20px] font-black text-blue-600 tracking-tight italic uppercase">
            {exp.role}
            <Sparkles size={14} className="text-blue-400 group-hover:scale-125 transition-transform" />
          </div>
        </div>

        <div className="p-6 md:p-8 rounded-[40px] bg-neutral-900/[0.03] border border-neutral-900/5 space-y-4 shadow-sm shadow-blue-900/5">
          <p className="text-neutral-500 text-base md:text-lg font-light italic leading-relaxed">
            &ldquo;{exp.tagline}&rdquo;
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-[8px] md:text-[9px] font-black tracking-[0.2em] text-neutral-400 uppercase">
            <span className="flex items-center gap-2 pr-6 border-r border-neutral-100"><MapPin size={12} /> {exp.location}</span>
            <span className="flex items-center gap-2"><Calendar size={12} /> {exp.duration}</span>
          </div>
        </div>
      </div>

      {/* Highlights Section - Streamlined for Absolute Vertical Fit */}
      <div className="lg:col-span-12 xl:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4 h-fit">
        {exp.highlights.slice(0, 4).map((item: ExperienceHighlight, hIdx: number) => (
          <motion.div
            key={hIdx}
            whileHover={{ y: -3, scale: 1.01 }}
            className="p-4 md:p-5 rounded-[28px] bg-white border border-white shadow-sm hover:shadow-xl hover:border-blue-50 transition-all group/item min-h-[110px] flex flex-col justify-between overflow-hidden"
          >
            <div>
              <h3 className="text-[14px] font-black tracking-tight text-[#1A1A1A] mb-1.5 group-hover/item:text-blue-600 transition-colors">
                {item.title}
              </h3>
              <p className="text-[10px] text-neutral-400 font-light leading-relaxed mb-3">
                {item.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pt-3 border-t border-neutral-50/50">
              {item.metrics.slice(0, 1).map((m: string, mIdx: number) => (
                <div key={mIdx} className="px-3 py-1.5 rounded-full bg-[#121212] text-[7px] font-black text-white flex items-center gap-2 shadow-md">
                  <Zap size={6} className="fill-blue-500 text-blue-500" />
                  {m}
                </div>
              ))}
              {item.tags.slice(0, 2).map((tag: string) => (
                <span key={tag} className="px-2 py-1.5 rounded-full bg-neutral-50 text-[7px] font-black text-neutral-300 uppercase border border-neutral-100/30">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
