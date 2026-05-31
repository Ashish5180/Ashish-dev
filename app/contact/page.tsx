"use client";

import React from "react";
import WorldMap from "@/components/ui/world-map";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

export default function ContactPage() {
  const [status, setStatus] = React.useState<"idle" | "submitting" | "success" | "error">("idle");
  const [formData, setFormData] = React.useState({ name: "", email: "", message: "" });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setStatus("submitting");
    try {
      const response = await fetch("https://formspree.io/f/xykvavvj", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 overflow-hidden font-sans relative">

      {/* Background patterns to fill space */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_-100px,#ff0000,transparent)]" />
      </div>

      {/* Large Decorative Text */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full text-center pointer-events-none select-none z-0">
        <h2 className="text-[15vw] font-black text-neutral-500/[0.03] leading-none tracking-tighter uppercase whitespace-nowrap">
          Get In Touch • Get In Touch
        </h2>
      </div>

      <div className="relative z-10 w-full min-h-screen flex flex-col pt-12 pb-8 px-6">

        {/* Top Header Section */}
        <div className="container mx-auto mb-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-neutral-100 pb-4"
          >
            <div>
              <p className="text-red-500 font-bold text-xs uppercase tracking-[0.3em] mb-2 flex items-center gap-2">
                <span className="w-8 h-[2px] bg-red-500" /> Availability: Open for Projects
              </p>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter">
                Let&apos;s <span className="text-red-500 italic">Work</span> Together.
              </h1>
            </div>
            <div className="hidden md:block text-right">
              <p className="text-neutral-400 text-xs font-mono uppercase">Current Location</p>
              <p className="text-sm font-bold">New Delhi, India • 28.6139° N</p>
            </div>
          </motion.div>
        </div>

        {/* Main Content: Map & Form Split */}
        <div className="container mx-auto flex-1 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Form on the left - taking 5/12 columns */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-5 lg:pr-6"
          >
            <div className="relative py-4 group">
              {/* Decorative accent */}
              <div className="absolute -top-20 -left-20 w-64 h-64 bg-red-50/50 rounded-full blur-3xl -z-10 group-hover:bg-red-100/50 transition-colors duration-1000" />

              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-red-50/30 border border-red-100 rounded-2xl p-8 text-center space-y-4"
                >
                  <div className="w-12 h-12 bg-red-100/50 rounded-full flex items-center justify-center mx-auto text-red-600 font-bold text-xl">
                    ✓
                  </div>
                  <h3 className="font-bold text-lg text-neutral-900">Message Transmitted</h3>
                  <p className="text-sm text-neutral-500 leading-relaxed">
                    Thank you for reaching out. Your vision has been received and I will align with you shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="text-xs font-bold text-red-600 hover:text-red-700 underline uppercase tracking-wider cursor-pointer"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-6">
                  <div className="relative group/field">
                    <label className="block text-[10px] font-black text-neutral-400 uppercase tracking-[0.3em] mb-2 transition-colors group-focus-within/field:text-red-500">
                      What&apos;s your name?
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="E.g. Ashish Yaduvanshi"
                      className="w-full bg-transparent border-b border-neutral-100 py-2 text-lg font-medium focus:outline-none focus:border-red-500 transition-all placeholder:text-neutral-200"
                    />
                  </div>

                  <div className="relative group/field">
                    <label className="block text-[10px] font-black text-neutral-400 uppercase tracking-[0.3em] mb-2 transition-colors group-focus-within/field:text-red-500">
                      Your Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="hello@company.com"
                      className="w-full bg-transparent border-b border-neutral-100 py-2 text-lg font-medium focus:outline-none focus:border-red-500 transition-all placeholder:text-neutral-200"
                    />
                  </div>

                  <div className="relative group/field">
                    <label className="block text-[10px] font-black text-neutral-400 uppercase tracking-[0.3em] mb-2 transition-colors group-focus-within/field:text-red-500">
                      Tell me about your vision
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={2}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Looking to build something great..."
                      className="w-full bg-transparent border-b border-neutral-100 py-2 text-lg font-medium focus:outline-none focus:border-red-500 transition-all resize-none placeholder:text-neutral-200"
                    />
                  </div>

                  {status === "error" && (
                    <p className="text-xs font-bold text-red-500">
                      An error occurred while sending your message. Please try again.
                    </p>
                  )}

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="bg-[#8b0000] hover:bg-[#a00000] disabled:bg-neutral-300 text-white px-8 py-3 rounded-full text-sm font-bold tracking-tight transition-all flex items-center gap-2 group shadow-lg shadow-red-900/20 cursor-pointer"
                    >
                      {status === "submitting" ? "Transmitting..." : "Let's start talking"}
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>

          {/* Map on the right - taking 7/12 columns */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-7 h-full min-h-[400px] flex items-center justify-center relative group"
          >
            {/* Dynamic Background Glow */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[400px] w-[500px] bg-red-500/[0.03] blur-[100px] rounded-full animate-pulse-slow pointer-events-none" />

            <div className="w-full h-full relative flex flex-col items-center justify-center">
              {/* Remote Connectivity Header */}
              <div className="w-full max-w-xl mb-8 text-center px-4 relative z-30">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-3xl font-bold tracking-tight mb-3">
                    Remote <span className="text-red-500 italic">Connectivity</span>
                  </h3>
                  <p className="text-sm md:text-base text-neutral-500 leading-relaxed">
                    Break free from traditional boundaries. Work from anywhere, at the 
                    comfort of your own studio apartment. Perfect for Nomads and Travellers.
                  </p>
                </motion.div>
              </div>

              <motion.div 
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="w-full scale-110 relative"
              >
                {/* Scanning Line Effect */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30 z-20">
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-red-400 to-transparent absolute top-0 animate-scan" />
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-red-400 to-transparent absolute top-1/4 animate-scan-delayed" />
                </div>

                <WorldMap
                  theme="light"
                  lineColor="#ef4444"
                  dots={[
                    { start: { lat: 28.6139, lng: 77.209 }, end: { lat: 40.7128, lng: -74.006 } },
                    { start: { lat: 28.6139, lng: 77.209 }, end: { lat: 51.5074, lng: -0.1278 } },
                    { start: { lat: 28.6139, lng: 77.209 }, end: { lat: 35.6762, lng: 139.6503 } },
                    { start: { lat: 28.6139, lng: 77.209 }, end: { lat: -33.8688, lng: 151.2093 } },
                    { start: { lat: 28.6139, lng: 77.209 }, end: { lat: 1.3521, lng: 103.8198 } },
                  ]}
                />
              </motion.div>
            </div>
          </motion.div>

        </div>

        {/* Bottom Banner Section */}
        <div className="container mx-auto mt-auto pt-6 border-t border-neutral-100">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 opacity-40 hover:opacity-100 transition-all">
            <div className="flex gap-10">
              <a href="https://www.linkedin.com/in/ashishyadav001/" target="_blank" rel="noopener noreferrer" className="text-[10px] font-black uppercase tracking-[0.2em] hover:text-red-500 transition-colors no-underline">LinkedIn</a>
              <a href="https://x.com/Developer_X01" target="_blank" rel="noopener noreferrer" className="text-[10px] font-black uppercase tracking-[0.2em] hover:text-red-500 transition-colors no-underline">Twitter</a>
              <a href="https://github.com/Ashish5180" target="_blank" rel="noopener noreferrer" className="text-[10px] font-black uppercase tracking-[0.2em] hover:text-red-500 transition-colors no-underline">GitHub</a>
            </div>
            <p className="text-[10px] font-mono uppercase">Built with precision © 2024 Ashish Dev</p>
          </div>
        </div>

      </div>

      <style jsx global>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes bounce-slow-delayed {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        @keyframes scan {
          0% { top: -10%; opacity: 0; }
          50% { opacity: 0.5; }
          100% { top: 110%; opacity: 0; }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1) translateY(-50%); }
          50% { opacity: 0.6; transform: scale(1.1) translateY(-50%); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s ease-in-out infinite;
        }
        .animate-bounce-slow-delayed {
          animation: bounce-slow-delayed 5s ease-in-out infinite;
        }
        .animate-scan {
          animation: scan 4s linear infinite;
        }
        .animate-scan-delayed {
          animation: scan 4s linear infinite 2s;
        }
        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
