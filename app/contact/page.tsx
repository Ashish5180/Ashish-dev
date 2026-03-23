'use client';

import React, { useState } from 'react';
import { Globe3DDemo } from "@/components/Globe";
import { typeSound } from "@/lib/sounds";
import { motion, AnimatePresence } from "framer-motion";


const ContactField = ({ label, children }: { label: string, children: React.ReactNode }) => (
  <div className="flex flex-col gap-1.5 w-full">
    <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-400 ml-1">
      {label}
    </label>
    {children}
  </div>
);

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    typeSound.playNotify();
    setShowToast(true);
    console.log('Sending message:', formData);
    
    // Clear form
    setFormData({ name: '', email: '', subject: '', message: '' });
    
    // Hide toast after 4s
    setTimeout(() => setShowToast(false), 4000);
  };

  return (
    <main className="min-h-screen bg-white relative pt-32 pb-16 overflow-hidden flex flex-col items-center">
      
      {/* Premium Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            className="fixed top-12 left-1/2 -translate-x-1/2 z-[100] w-full max-w-sm px-4"
          >
            <div className="bg-neutral-900 border border-neutral-800 text-white rounded-2xl p-4 shadow-2xl flex items-center gap-4">
              <div className="h-10 w-10 flex-shrink-0 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.6666 5L7.49992 14.1667L3.33325 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="flex flex-col">
                <p className="text-sm font-bold">Transmission Successful</p>
                <p className="text-[11px] text-neutral-400 font-medium">Your message has been encrypted and sent to my digital hub.</p>
              </div>
              <button 
                onClick={() => setShowToast(false)}
                className="ml-auto text-neutral-500 hover:text-white transition-colors p-1"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.5 4.5L4.5 13.5M4.5 4.5L13.5 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>


      {/* Blueprint Aesthetic Lines */}
      <div className="absolute inset-y-0 left-10 w-px bg-neutral-100 hidden md:block" />
      <div className="absolute inset-y-0 right-10 w-px bg-neutral-100 hidden md:block" />
      <div className="absolute top-0 left-0 w-full h-px bg-neutral-100 mt-20" />

      <div className="max-w-7xl mx-auto px-6 md:px-20 relative z-10 w-full">

        {/* Main Side-by-Side Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">

          {/* Left: Globe & Intro */}
          <div className="flex flex-col">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-6xl md:text-7xl font-black tracking-tight mb-6 text-neutral-900 leading-none">
                LETS <br /> CONNECT.
              </h1>
              <p className="text-neutral-500 text-lg leading-relaxed max-w-sm mb-12">
                Building the future of digital experiences. Drop a message to start our collaboration.
              </p>
            </motion.div>

            <div className="h-[350px] w-full relative">
              <div className="absolute inset-0 z-0 scale-100 lg:scale-110 -translate-x-8 -translate-y-12">
                <Globe3DDemo />
              </div>
            </div>

          </div>

          {/* Right: Proper Form Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full bg-neutral-50/50 p-8 md:p-12 rounded-[2rem] border border-neutral-100"
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-7">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-7 w-full">
                <ContactField label="Full Name">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full bg-transparent border-b border-neutral-200 py-3 focus:border-neutral-900 outline-none transition-all duration-300 placeholder:text-neutral-300 text-sm"
                    required
                    value={formData.name}
                    onKeyDown={() => typeSound.play()}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </ContactField>

                <ContactField label="Work Email">
                  <input
                    type="email"
                    placeholder="hello@example.com"
                    className="w-full bg-transparent border-b border-neutral-200 py-3 focus:border-neutral-900 outline-none transition-all duration-300 placeholder:text-neutral-300 text-sm"
                    required
                    value={formData.email}
                    onKeyDown={() => typeSound.play()}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </ContactField>
              </div>

              <ContactField label="Project Type">
                <input
                  type="text"
                  placeholder="E.g. Web App, AI Integration"
                  className="w-full bg-transparent border-b border-neutral-200 py-3 focus:border-neutral-900 outline-none transition-all duration-300 placeholder:text-neutral-300 text-sm"
                  required
                  value={formData.subject}
                  onKeyDown={() => typeSound.play()}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                />
              </ContactField>

              <ContactField label="Message Brief">
                <textarea
                  rows={4}
                  placeholder="Describe your vision..."
                  className="w-full bg-transparent border-b border-neutral-200 py-3 focus:border-neutral-900 outline-none transition-all duration-300 resize-none placeholder:text-neutral-300 text-sm"
                  required
                  value={formData.message}
                  onKeyDown={() => typeSound.play()}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </ContactField>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full py-4 mt-4 bg-neutral-900 text-white font-bold uppercase tracking-widest text-[10px] rounded-lg shadow-xl shadow-neutral-950/20 active:bg-neutral-800 transition-colors"
              >
                Initiate Connection
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Boundary Bottom Line */}
      <div className="w-full h-px bg-neutral-50 mt-12" />
    </main>
  );
}
