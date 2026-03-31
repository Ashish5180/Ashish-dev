'use client';

import React, { useRef } from 'react';
import ProjectsSection from "@/components/ProjectsSection";
import DeploymentPipeline from "@/components/DeploymentPipeline";
import { motion, useInView } from "framer-motion";

function RevealText({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const text = typeof children === 'string' ? children : '';
  const words = text.split(" ");

  return (
    <span ref={ref} style={{ display: "inline-block" }}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{
            duration: 0.8,
            delay: delay + i * 0.05,
            ease: [0.215, 0.61, 0.355, 1],
          }}
          style={{ display: "inline-block", marginRight: "0.25em" }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

export default function ProjectsPage() {
  const workflowRef = useRef(null);
  const workflowInView = useInView(workflowRef, { once: true, margin: "-100px" });

  return (
    <main className="min-h-screen bg-[#FAFAF8] pb-20 selection:bg-indigo-100 selection:text-indigo-600 overflow-x-hidden">
      <ProjectsSection />

      {/* Infrastructure Section (Deployment Pipeline) */}
      <section 
        ref={workflowRef}
        className="relative py-24 overflow-hidden"
        style={{ background: "#FAFAF8" }}
      >
        {/* Aesthetic framing lines (consistent with ProjectsSection) */}
        <div className="absolute inset-y-0 left-4 md:left-10 w-px bg-neutral-200 z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-4 md:right-10 w-px bg-neutral-200 z-20 pointer-events-none" />

        {/* Premium Background Auras */}
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, 30, 0],
            y: [0, -20, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 -left-20 w-96 h-96 bg-indigo-200/20 rounded-full blur-[100px] pointer-events-none" 
        />
        <motion.div 
          animate={{ 
            scale: [1.1, 1, 1.1],
            opacity: [0.15, 0.35, 0.15],
            x: [0, -40, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-blue-100/30 rounded-full blur-[120px] pointer-events-none" 
        />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center mb-16 text-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={workflowInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-10 h-px bg-indigo-600" />
              <span className="text-indigo-600 font-bold tracking-[0.3em] text-[11px] uppercase">
                Automated Infrastructure
              </span>
              <div className="w-10 h-px bg-indigo-600" />
            </motion.div>

            <h2 className="text-5xl md:text-7xl font-black tracking-tight text-neutral-900 uppercase leading-[0.9] mb-6">
              <RevealText>Production</RevealText> <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-800 to-neutral-500">
                <RevealText delay={0.2}>Workflow.</RevealText>
              </span>
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={workflowInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-neutral-500 max-w-xl text-lg font-medium leading-relaxed"
            >
              Building and deploying with a robust CI/CD pipeline that ensures 
              reliability and performance across every environment.
            </motion.p>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.98, y: 40 }}
            animate={workflowInView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl mx-auto"
          >
            <div className="relative group p-[2px] bg-gradient-to-b from-white to-neutral-200/50 rounded-[3.5rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.08)] transition-all duration-500 hover:shadow-[0_60px_120px_-20px_rgba(79,70,229,0.15)]">
              <div className="bg-white/90 backdrop-blur-xl rounded-[3.4rem] overflow-hidden p-6 md:p-14 border border-white relative">
                {/* Decorative dots in the corners */}
                <div className="absolute top-10 left-10 w-2 h-2 rounded-full bg-neutral-200/50" />
                <div className="absolute top-10 right-10 w-2 h-2 rounded-full bg-neutral-200/50" />
                <div className="absolute bottom-10 left-10 w-2 h-2 rounded-full bg-neutral-200/50" />
                <div className="absolute bottom-10 right-10 w-2 h-2 rounded-full bg-neutral-200/50" />
                
                <DeploymentPipeline />
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
