"use client";
import React from "react";
import { calsans } from "@/fonts/calsans";
import { EXPERIENCES } from "@/lib/experience-data";
import { TracingBeam } from "./ui/tracing-beam";
import { cn } from "@/lib/utils";
import { 
  Zap, 
  Terminal, 
  Layers, 
  Cpu, 
  Command, 
  CheckCircle2,
  ExternalLink,
  Activity
} from "lucide-react";
import { motion } from "framer-motion";

export function ExperienceTimeline() {
    return (
        <TracingBeam className="px-6">
            <div className="max-w-[850px] mx-auto antialiased pt-4 pb-12 relative">
                <div className="relative z-10 space-y-16">
                    {EXPERIENCES.map((exp, index) => (
                        <motion.div 
                            key={`exp-${exp.id}`} 
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.05 }}
                            viewport={{ once: true }}
                            className="relative group px-1 rounded-xl transition-all duration-700"
                        >
                            {/* Modern Node Context */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-3">
                                   <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)] animate-pulse" />
                                   <span className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400">
                                      {exp.duration} // {exp.location}
                                   </span>
                                   <div className="h-px bg-neutral-100 flex-1" />
                                   {exp.website && (
                                       <a 
                                           href={exp.website} 
                                           target="_blank" 
                                           rel="noopener noreferrer"
                                           className="flex items-center gap-2 px-3 py-1 rounded bg-neutral-900 border border-neutral-800 hover:bg-emerald-600 hover:border-emerald-500 transition-all group/link shadow-lg shadow-neutral-200"
                                       >
                                          <ExternalLink size={10} className="text-white group-hover/link:animate-pulse" />
                                          <span className="text-[8.5px] font-black uppercase tracking-[0.25em] text-white">Visit Company Website</span>
                                       </a>
                                   )}
                                </div>

                                <div className="space-y-6">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                       <div className="space-y-1">
                                          <h2 className={cn("text-3xl md:text-5xl font-black text-neutral-900 tracking-tight leading-none group-hover:text-emerald-600 transition-colors duration-500", calsans.className)}>
                                             {exp.company}
                                          </h2>
                                          <div className="flex items-center gap-3">
                                             <p className="text-emerald-600 font-bold text-[10px] uppercase tracking-widest">{exp.role} — {exp.type}</p>
                                          </div>
                                       </div>
                                       
                                       <div className="flex gap-2">
                                          <div className="w-10 h-10 rounded-lg border border-neutral-100 flex items-center justify-center text-neutral-400 group-hover:border-emerald-100 group-hover:text-emerald-400 transition-all duration-500">
                                             <Terminal size={14} strokeWidth={2.5} />
                                          </div>
                                          <div className="w-10 h-10 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-white shadow-xl group-hover:shadow-emerald-900/10 transition-all duration-500">
                                             <Command size={14} strokeWidth={2.5} />
                                          </div>
                                       </div>
                                    </div>
                                    
                                    <div className="space-y-8">
                                       {exp.highlights.map((item, hIdx) => (
                                          <div key={hIdx} className="relative pl-8 border-l border-neutral-100 py-1 hover:border-emerald-100 transition-colors">
                                             <div className="absolute -left-[5px] top-3 w-2 h-2 rounded-full bg-neutral-200 border-2 border-white group-hover:bg-emerald-500 group-hover:border-emerald-50 transition-all" />
                                             <h4 className="text-[15px] font-black text-neutral-900 mb-2 flex items-center gap-2">
                                                {item.title}
                                                {hIdx === 0 && <span className="text-[8px] bg-emerald-50 text-emerald-600 px-1.5 py-0.5 rounded uppercase font-black shadow-sm ring-1 ring-emerald-200/50">Top Impact</span>}
                                             </h4>
                                             <p className="text-[14px] text-neutral-500 font-medium leading-relaxed mb-4 max-w-2xl">
                                                {item.description}
                                              </p>
                                             <div className="flex flex-wrap gap-2">
                                                {item.metrics.map((m, mIdx) => (
                                                   <span key={mIdx} className="text-[10px] font-black text-emerald-600 flex items-center gap-1 bg-emerald-50/50 px-2 py-0.5 rounded-sm border border-emerald-100/50">
                                                      <CheckCircle2 size={8} strokeWidth={3} /> {m}
                                                   </span>
                                                ))}
                                                {item.tags.map((tag, tIdx) => (
                                                   <span key={tIdx} className="text-[10px] font-black text-neutral-400 uppercase tracking-widest px-2 py-0.5 bg-neutral-50 border border-neutral-100 rounded-sm">
                                                      {tag}
                                                   </span>
                                                ))}
                                             </div>
                                          </div>
                                       ))}
                                    </div>

                                    <div className="flex flex-wrap gap-6 pt-8 mt-8 border-t border-neutral-100/50">
                                       <div className="flex items-center gap-2 group/stat">
                                          <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover/stat:bg-emerald-500 group-hover/stat:text-white transition-all">
                                             <Zap size={14} strokeWidth={3} />
                                          </div>
                                          <div className="flex flex-col">
                                             <span className="text-[8px] font-black uppercase tracking-[0.2em] text-neutral-300">Status</span>
                                             <span className="text-[10px] font-black uppercase tracking-widest text-neutral-600">Deployed</span>
                                          </div>
                                       </div>
                                       <div className="flex items-center gap-2 group/stat">
                                          <div className="w-10 h-10 rounded-xl bg-zinc-50 flex items-center justify-center text-neutral-600 group-hover/stat:bg-neutral-900 group-hover/stat:text-white transition-all">
                                             <Cpu size={14} strokeWidth={3} />
                                          </div>
                                          <div className="flex flex-col">
                                             <span className="text-[8px] font-black uppercase tracking-[0.2em] text-neutral-300">Infrastructure</span>
                                             <span className="text-[10px] font-black uppercase tracking-widest text-neutral-600">Automated</span>
                                          </div>
                                       </div>
                                       <div className="flex items-center gap-2 group/stat">
                                          <div className="w-10 h-10 rounded-xl bg-zinc-50 flex items-center justify-center text-neutral-600 group-hover/stat:bg-neutral-900 group-hover/stat:text-white transition-all">
                                             <Layers size={14} strokeWidth={3} />
                                          </div>
                                          <div className="flex flex-col">
                                             <span className="text-[8px] font-black uppercase tracking-[0.2em] text-neutral-300">Scalability</span>
                                             <span className="text-[10px] font-black uppercase tracking-widest text-neutral-600">Micro-arch</span>
                                          </div>
                                       </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </TracingBeam>
    );
}

