'use client';

import React from 'react';
import ProjectsSection from "@/components/ProjectsSection";
import DeploymentPipeline from "@/components/DeploymentPipeline";
import { motion } from "framer-motion";

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-white pb-20 selection:bg-indigo-100 selection:text-indigo-600 overflow-x-hidden">
      


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
