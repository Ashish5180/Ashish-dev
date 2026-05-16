'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Wand2, Sparkles, Ghost, Star, Zap } from 'lucide-react';
import Image from 'next/image';

export const PotterWorld: React.FC = () => {
  return (
    <section className="bg-[#faf9f6] py-24 px-[5%] overflow-hidden relative font-sans">
      {/* Subtle Background Textures */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="mb-20">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-[#740001] font-bold uppercase tracking-[0.4em] text-[0.75rem] block mb-6 flex items-center gap-4 font-outfit"
          >
            <span className="w-12 h-[1px] bg-[#740001]"></span>
            The Wizarding World
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-[#1a1a1a] text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] uppercase mb-8 font-outfit"
          >
            Magic <span className="text-transparent" style={{ WebkitTextStroke: '1.5px #d3a625' }}>Meets</span> <br />
            The Code.
          </motion.h2>
        </div>

        {/* Featured Video Section - Truly Frameless */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative w-full aspect-video md:aspect-[21/9] rounded-[3.5rem] overflow-hidden bg-black mb-16 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] group"
        >
          {/* Background Blurred Video for Seamless Frame */}
          <video
            src="/video.MP4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover blur-3xl opacity-30 scale-110"
          />

          {/* Centered Video - No internal padding, fills the container height */}
          <video
            src="/video.MP4"
            autoPlay
            loop
            muted
            playsInline
            className="relative z-10 w-full h-full object-contain"
          />

          <div className="absolute inset-0 z-20 pointer-events-none flex items-end p-8 md:p-12 bg-gradient-to-t from-black/40 to-transparent">
            <div className="bg-white/10 backdrop-blur-2xl p-6 md:p-10 rounded-[2.5rem] border border-white/20 shadow-2xl">
              <span className="text-[#d3a625] font-black uppercase tracking-[0.4em] text-[0.6rem] mb-2 block">Magical Archive</span>
              <h3 className="text-white text-2xl md:text-5xl font-black uppercase font-outfit tracking-tighter leading-none">The Wizarding <br /> Motion</h3>
            </div>
          </div>
          <div className="absolute top-8 right-8 z-30 p-5 rounded-full bg-white/10 backdrop-blur-2xl border border-white/20 text-[#d3a625] shadow-lg">
            <Star size={28} className="animate-pulse" />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Daily Prophet - Left Column (Floating Paper Style) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-4 p-0 rounded-[3.5rem] bg-[#fdfaf3] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] relative overflow-hidden group"
          >
            <div className="p-10">
              <div className="border-b-[3px] border-[#333] pb-6 mb-8 text-center">
                <h4 className="font-serif text-4xl font-black uppercase tracking-tighter text-[#333]">The Daily Developer</h4>
                <div className="flex justify-between text-[0.7rem] font-black mt-3 uppercase text-[#333] tracking-widest">
                  <span>Special Edition</span>
                  <span>Vol. 9 3/4</span>
                  <span>5 Sickles</span>
                </div>
              </div>

              <div className="space-y-8">
                <div className="bg-[#333] text-[#fdfaf3] p-3 text-center transform -rotate-1 shadow-lg">
                  <span className="text-[0.65rem] font-black uppercase tracking-[0.2em]">Wizardry Discovered!</span>
                </div>
                <h5 className="text-3xl font-black leading-[1.1] text-[#333] font-outfit uppercase italic">Ashish Spotted Using &apos;Git-Magic&apos;!</h5>
                <p className="text-[0.95rem] leading-relaxed text-[#444] font-medium font-inter opacity-80">
                  The Ministry reports that Ashish was seen performing complex incantations, resulting in a 50% reduction in server latency.
                </p>
              </div>

              <div className="mt-12 pt-8 border-t border-[#333]/10 flex items-center gap-6">
                <div className="w-20 h-20 rounded-2xl bg-[#333] flex items-center justify-center text-white shadow-xl rotate-3">
                  <Ghost size={40} />
                </div>
                <div>
                  <span className="text-[0.7rem] font-black uppercase text-[#333]/40 block tracking-widest">Wanted:</span>
                  <span className="text-sm font-bold italic text-[#333] block">Seekers for React Quidditch.</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Images & Philosophy - Right Column */}
          <div className="lg:col-span-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Horizontal Image 1 - harry.jpeg (Frameless) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative w-full aspect-[4/5] rounded-[3.5rem] overflow-hidden bg-[#f0ede4] shadow-2xl group"
              >
                <Image
                  src="/harry.jpeg"
                  alt="Harry Potter Theme"
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#740001]/60 to-transparent flex items-end p-8">
                  <span className="px-5 py-2 rounded-full bg-white/10 backdrop-blur-md text-white text-[0.7rem] font-black uppercase tracking-widest border border-white/20">The Seeker</span>
                </div>
              </motion.div>

              {/* Horizontal Image 2 - Harry Potter.jpeg (Frameless) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="relative w-full aspect-[4/5] rounded-[3.5rem] overflow-hidden bg-[#f0ede4] shadow-2xl group"
              >
                <Image
                  src="/Harry Potter.jpeg"
                  alt="Harry Potter World"
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#d3a625]/60 to-transparent flex items-end p-8">
                  <span className="px-5 py-2 rounded-full bg-white/10 backdrop-blur-md text-white text-[0.7rem] font-black uppercase tracking-widest border border-white/20">The Archive</span>
                </div>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-10 rounded-[3.5rem] bg-white shadow-[0_20px_40px_-10px_rgba(0,0,0,0.05)] hover:translate-y-[-5px] transition-all duration-500"
              >
                <div className="w-16 h-16 rounded-2xl bg-[#740001]/5 flex items-center justify-center text-[#740001] mb-8">
                  <Wand2 size={32} />
                </div>
                <h3 className="text-2xl font-black text-[#1a1a1a] mb-4 uppercase font-outfit tracking-tight">Mischief Managed</h3>
                <p className="text-gray-500 text-[0.95rem] leading-relaxed font-inter">
                  Approach every bug with the curiosity of a Marauder. Life is about exploring the untracked paths.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="p-10 rounded-[3.5rem] bg-white shadow-[0_20px_40px_-10px_rgba(0,0,0,0.05)] hover:translate-y-[-5px] transition-all duration-500"
              >
                <div className="w-16 h-16 rounded-2xl bg-[#d3a625]/5 flex items-center justify-center text-[#d3a625] mb-8">
                  <Sparkles size={32} />
                </div>
                <h3 className="text-2xl font-black text-[#1a1a1a] mb-4 uppercase font-outfit tracking-tight">Expecto Patronum</h3>
                <p className="text-gray-500 text-[0.95rem] leading-relaxed font-inter">
                  When the screen gets dark, find your light. My passions outside code are the &apos;Patronus&apos; that keeps me grounded.
                </p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Closing Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-24 text-center"
        >
          <p className="text-[#333] font-serif italic text-3xl md:text-4xl max-w-4xl mx-auto leading-snug">
            &quot;I am not that person who just hears music and watches movies—I am here to roam, do silly things, and enjoy my raw life.&quot;
          </p>
          <div className="mt-12 flex justify-center gap-4">
            <div className="w-3 h-3 rounded-full bg-[#d3a625] animate-bounce" style={{ animationDelay: '0s' }} />
            <div className="w-3 h-3 rounded-full bg-[#740001] animate-bounce" style={{ animationDelay: '0.1s' }} />
            <div className="w-3 h-3 rounded-full bg-[#333] animate-bounce" style={{ animationDelay: '0.2s' }} />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PotterWorld;

