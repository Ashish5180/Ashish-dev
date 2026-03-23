'use client';

import React from 'react';
import ProjectsSection from "@/components/ProjectsSection";
import DeploymentPipeline from "@/components/DeploymentPipeline";
import { motion } from "framer-motion";

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-white pb-20 selection:bg-indigo-100 selection:text-indigo-600 overflow-x-hidden">
      
      {/* Dynamic Structural Hero - No MacBook Scroll */}
      <section className="relative h-[55vh] flex flex-col items-center justify-center pt-24 px-6 overflow-hidden">
        
        {/* Background Blueprint Aesthetics */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]">
           <div className="absolute inset-0 bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:4rem_4rem]" />
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-black rounded-full" />
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-black rounded-full opacity-50" />
        </div>

        {/* Ambient Pulsing Lights */}
        <div className="absolute top-[20%] right-[15%] w-[500px] h-[500px] bg-indigo-50 blur-[150px] rounded-full animate-pulse z-0" />
        <div className="absolute bottom-[20%] left-[15%] w-[500px] h-[500px] bg-sky-50 blur-[150px] rounded-full animate-pulse [animation-delay:2s] z-0" />

        <div className="relative z-10 text-center">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="px-4 py-1.5 rounded-full bg-neutral-50 border border-neutral-100 text-neutral-400 font-black tracking-[0.5em] text-[10px] uppercase mb-5 inline-block"
            >
              Development Portfolio v2.0
            </motion.span>
            
            <motion.h1 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-7xl md:text-[8rem] font-black tracking-tighter leading-[0.8] mb-6 uppercase text-neutral-900"
            >
              Digital <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-200 via-neutral-400 to-neutral-200">Architecture.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="max-w-xl mx-auto text-neutral-500 font-medium text-lg leading-relaxed"
            >
              A synthesis of technical precision and artistic direction. <br className="hidden md:block"/> Engineered for high-frequency execution.
            </motion.p>
        </div>

        {/* Floating ID Tag (Persistence branding) */}
        <div className="absolute bottom-8 right-10 flex flex-col items-end opacity-20 hidden md:flex">
           <span className="text-[14px] font-black tracking-widest text-neutral-900 uppercase">SYS_PRJ_449</span>
           <div className="w-12 h-px bg-neutral-900 mt-2" />
        </div>
      </section>

      <ProjectsSection />

      {/* Infrastructure Section (Deployment Pipeline) */}
      <section className="max-w-7xl mx-auto px-6 mt-12 relative">
         <div className="flex flex-col items-center mb-10 relative z-10">
            <motion.span 
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               className="text-indigo-600 font-black tracking-[0.4em] text-[10px] uppercase mb-4"
            >
               Automated Infrastructure
            </motion.span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-neutral-900 uppercase text-center leading-[0.9]">
               Production <br /> <span className="text-neutral-100">Workflow.</span>
            </h2>
         </div>
         
         <div className="relative group p-1 bg-white border border-neutral-100 rounded-[3rem] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.06)]">
            <div className="bg-neutral-50 rounded-[2.8rem] overflow-hidden p-8 border border-neutral-100/50">
               <DeploymentPipeline />
            </div>
         </div>
      </section>



    </main>
  );
}
