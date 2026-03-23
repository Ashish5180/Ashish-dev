'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Image from 'next/image';

interface Tool {
   name: string;
   path: string;
   category: string;
   val: string;
}

const TOOLS: Tool[] = [
   { name: 'MacBook Pro', path: '/mac.webp', category: 'Computing', val: '01' },
   { name: 'iPhone 15 Pro', path: '/iphone.webp', category: 'Mobile', val: '02' },
   { name: 'Apple Watch', path: '/iwatch.webp', category: 'Wearables', val: '03' },
   { name: 'Mechanical Keyboard', path: '/keyboard.jpg', category: 'Input', val: '04' },
   { name: 'Magic Mouse', path: '/mouse.webp', category: 'Input', val: '05' },
   { name: 'Studio Setup', path: '/hero-screen.png', category: 'Workspace', val: '06' },
];

export default function MyToolsPage() {
   const containerRef = useRef<HTMLDivElement>(null);

   // vertical scroll progress
   const { scrollYProgress } = useScroll({
      target: containerRef,
   });

   // Calculate horizontal movement for the gallery
   // Each item is approx 400px wide + gap. 
   const xTransform = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);
   const smoothXTransform = useSpring(xTransform, { stiffness: 60, damping: 20 });

   // Opacity & Scale for the intro text as we scroll
   const infoOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
   const infoScale = useTransform(scrollYProgress, [0, 0.1], [1, 0.9]);

   return (
      <main ref={containerRef} className="bg-neutral-950 text-white h-[400vh] selection:bg-indigo-600">

         {/* PERSISTENT ELEMENTS */}
         <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {/* Dynamic Grid */}
            <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:6rem_6rem]" />

            {/* Structural Border Lines */}
            <div className="absolute top-20 bottom-20 left-10 w-px bg-white/5" />
            <div className="absolute top-20 bottom-20 right-10 w-px bg-white/5" />
            <div className="absolute top-20 left-10 right-10 h-px bg-white/5" />
            <div className="absolute bottom-20 left-10 right-10 h-px bg-white/5" />

            {/* Ambient Glows */}
            <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-indigo-500/10 blur-[150px] rounded-full animate-pulse" />
            <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] bg-sky-500/10 blur-[150px] rounded-full animate-pulse [animation-delay:2s]" />
         </div>

         {/* STICKY CONTAINER */}
         <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">

            {/* Intro Header */}
            <motion.div
               style={{ opacity: infoOpacity, scale: infoScale }}
               className="absolute top-[15%] left-[10%] z-20 max-w-2xl px-6"
            >
               <span className="text-indigo-500 font-black tracking-[0.5em] text-[10px] uppercase mb-4 block">Hardware Synthesis 2.0</span>
               <h1 className="text-8xl md:text-[10rem] font-black tracking-tighter leading-[0.8] mb-8 uppercase mix-blend-difference">
                  Tools <br /> <span className="text-neutral-400">Inventory.</span>
               </h1>
               <p className="text-neutral-500 text-lg leading-relaxed max-w-sm">
                  A high-frequency development environment optimized for ultra-performance execution.
               </p>
               <div className="mt-8 flex items-center gap-4">
                  <div className="h-0.5 w-12 bg-indigo-600" />
                  <span className="text-[10px] font-black tracking-widest text-neutral-600 uppercase">Scroll to explores vault</span>
               </div>
            </motion.div>

            {/* HORIZONTAL GALLERY */}
            <motion.div
               style={{ x: smoothXTransform }}
               className="flex gap-16 px-[10%] items-center"
            >
               {TOOLS.map((tool, index) => (
                  <ToolPan key={index} tool={tool} index={index} />
               ))}

               {/* FINAL SECTION (Integrated into horizontal scroll) */}
               <div className="min-w-[80vw] h-full flex flex-col items-center justify-center relative translate-y-[-5%] px-20">
                  <motion.div
                     initial={{ opacity: 0 }}
                     whileInView={{ opacity: 1 }}
                     className="text-center"
                  >
                     <h2 className="text-7xl md:text-[8rem] font-black tracking-tighter leading-none mb-10 uppercase">
                        Crafted with <br /> <span className="text-indigo-600">Precision.</span>
                     </h2>
                     <div className="flex flex-wrap justify-center gap-8 text-[11px] font-black uppercase tracking-[0.4em] text-neutral-500">
                        <div className="flex flex-col items-center gap-2">
                           <span className="text-white">Next.js 15</span>
                           <span className="h-1 w-1 rounded-full bg-indigo-500" />
                        </div>
                        <div className="flex flex-col items-center gap-2">
                           <span className="text-white">TypeScript</span>
                           <span className="h-1 w-1 rounded-full bg-indigo-500" />
                        </div>
                        <div className="flex flex-col items-center gap-2">
                           <span className="text-white">Framer Motion</span>
                           <span className="h-1 w-1 rounded-full bg-indigo-500" />
                        </div>
                        <div className="flex flex-col items-center gap-2">
                           <span className="text-white">Aceternity UI</span>
                           <span className="h-1 w-1 rounded-full bg-indigo-500" />
                        </div>
                     </div>
                  </motion.div>
               </div>
            </motion.div>

            {/* BOTTOM METADATA (Persistent) */}
            <div className="fixed bottom-[10%] left-[10%] right-[10%] flex justify-between items-end z-20 pointer-events-none">
               <div className="flex flex-col gap-1">
                  <span className="text-neutral-700 text-[10px] font-black uppercase tracking-[0.2em]">Environment Type</span>
                  <span className="text-neutral-300 text-[11px] font-bold">PRODUCTION_v2.0</span>
               </div>
               <div className="flex flex-col items-end gap-1">
                  <span className="text-neutral-700 text-[10px] font-black uppercase tracking-[0.2em]">Deployment System</span>
                  <span className="text-neutral-300 text-[11px] font-bold tracking-widest uppercase">Tokyo / Asia-Pacific</span>
               </div>
            </div>
         </div>
      </main>
   );
}

function ToolPan({ tool, index }: { tool: Tool, index: number }) {
   return (
      <motion.div
         initial={{ opacity: 0, scale: 0.9 }}
         whileInView={{ opacity: 1, scale: 1 }}
         transition={{ duration: 0.8, delay: index * 0.1 }}
         viewport={{ once: true }}
         className="min-w-[450px] h-[550px] relative group"
      >
         {/* Glass Frame */}
         <div className="absolute -inset-4 bg-white/[0.02] border border-white/5 rounded-[4rem] group-hover:bg-white/[0.04] transition-all duration-700 backdrop-blur-[2px]" />

         {/* Content Container */}
         <div className="relative w-full h-full rounded-[3.5rem] overflow-hidden border border-white/10 flex flex-col justify-end p-10 bg-neutral-900 group-hover:border-indigo-500/50 transition-colors duration-700">

            <div className="absolute inset-0 grayscale group-hover:grayscale-0 scale-100 group-hover:scale-110 transition-all duration-1000 opacity-40 group-hover:opacity-70 overflow-hidden">
               <Image src={tool.path} alt={tool.name} fill className="object-cover" />
            </div>

            {/* Gradient Overlay */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-transparent pointer-events-none" />

            {/* Content */}
            <div className="relative z-10 flex flex-col">
               <div className="flex items-center gap-3 mb-4">
                  <span className="px-2 py-1 rounded bg-indigo-600/20 text-indigo-500 text-[8px] font-black uppercase tracking-widest">{tool.category}</span>
                  <div className="h-px flex-1 bg-white/10 group-hover:bg-indigo-500/30 transition-colors" />
               </div>
               <h3 className="text-4xl font-black tracking-tighter uppercase mb-2 group-hover:translate-x-2 transition-transform duration-500">
                  {tool.name}
               </h3>
               <span className="text-neutral-500 font-bold text-[10px] tracking-[0.4em]">SPECIFICATION CODE: {tool.val}</span>
            </div>

            {/* Floating ID Tag */}
            <div className="absolute top-10 right-10 flex flex-col items-end opacity-20 group-hover:opacity-100 transition-opacity duration-700">
               <span className="text-[12px] font-black tracking-widest text-white">{tool.val}</span>
               <div className="w-8 h-px bg-white mt-1 group-hover:w-12 transition-all" />
            </div>
         </div>
      </motion.div>
   );
}
