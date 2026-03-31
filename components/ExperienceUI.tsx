"use client";

import React from "react";
import { motion } from "framer-motion";
import { calsans } from "@/fonts/calsans";
import { cn } from "@/lib/utils";
import { ExperienceTimeline } from "./ExperienceTimeline";
import { EXPERIENCE_STATS, TECH_STACK } from "@/lib/experience-data";

export function ExperienceUI() {
  return (
    <div className="bg-[#FAFAF8] min-h-screen text-neutral-900 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      
      {/* Minimalist Header Context */}
      <header className="relative z-20 pt-20 pb-12 px-6 max-w-4xl mx-auto flex flex-col items-start space-y-6">
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 px-3 py-1 rounded-full bg-white border border-neutral-200 text-neutral-400 font-black text-[9px] uppercase tracking-[0.3em] shadow-sm shadow-neutral-100"
        >
          <div className="w-1 h-1 rounded-full bg-emerald-500" />
          Career Ledger
        </motion.div>
        
        <h1 className={cn("text-5xl md:text-6xl font-black tracking-tight text-neutral-900 leading-none", calsans.className)}>
          Professional <span className="text-emerald-600">Evolution.</span>
        </h1>
        
        <p className="max-w-xl text-neutral-400 font-medium text-base leading-relaxed">
          Chronological tracing of full-stack engineering, automation, and AI-driven growth.
        </p>
      </header>

      {/* The Tracing Beam Experience Vertical Flow */}
      <main className="relative z-10">
        <ExperienceTimeline />
      </main>

      {/* Global Mastery & Metrics Section */}
      <section className="relative z-20 pb-20 px-6 max-w-4xl mx-auto space-y-16 mt-[-40px]">
        
        {/* Quantitative Results */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-10 border-t border-neutral-50 pt-16">
            {EXPERIENCE_STATS.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="space-y-2"
              >
                <div className="text-[9px] font-black uppercase tracking-[0.2em] text-neutral-300">{stat.label}</div>
                <div className="text-3xl md:text-4xl font-black text-neutral-900 tracking-tighter tabular-nums">
                  {stat.value}
                </div>
              </motion.div>
            ))}
        </div>

        {/* Technical Ecosystem */}
        <div className="space-y-6 pt-10 border-t border-neutral-50">
           <div className="flex items-center gap-4">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-900">
                 Mastered Ecosystem
              </span>
           </div>
           <div className="flex flex-wrap gap-x-6 gap-y-3">
              {TECH_STACK.map((tech, i) => (
                <motion.span 
                  key={i}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                  className="text-neutral-300 font-bold text-xs tracking-tight lowercase flex items-center gap-2"
                >
                  <div className="w-1 h-1 rounded-full bg-emerald-500/20" />
                  {tech}
                </motion.span>
              ))}
           </div>
        </div>

        {/* Closing Professional Marker */}
        <div className="pt-12 text-center flex flex-col items-center space-y-4">
           <div className="w-px h-12 bg-gradient-to-b from-emerald-500/30 to-transparent" />
           <p className="text-[9px] font-black uppercase tracking-[0.5em] text-neutral-300 italic">
              Tracing Professional Evolution // 2024-Present
           </p>
        </div>
      </section>

    </div>
  );
}
