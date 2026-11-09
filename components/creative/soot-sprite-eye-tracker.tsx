"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

const FUNNY_MESSAGES = [
  "Blink blink! I'm tracking your cursor!",
  "Have you watched Spirited Away today? 🚂",
  "Backend code is serious. This page is NOT.",
  "10,000 goroutines couldn't catch this mouse!",
  "Why is centering a div the hardest boss fight?",
  "Miyazaki spends 6 months drawing a cloud. Respect.",
  "Squeak! Pet me again!",
  "Take a break, drink some tea, watch anime.",
];

export function SootSpriteEyeTracker() {
  const [pupilOffset, setPupilOffset] = useState({ x: 0, y: 0 });
  const [messageIndex, setMessageIndex] = useState(0);
  const [showMessage, setShowMessage] = useState(true);
  const [isBouncing, setIsBouncing] = useState(false);
  const spriteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const sprite = spriteRef.current;
      if (!sprite) return;
      const rect = sprite.getBoundingClientRect();
      const spriteCenterX = rect.left + rect.width / 2;
      const spriteCenterY = rect.top + rect.height / 2;

      const dx = e.clientX - spriteCenterX;
      const dy = e.clientY - spriteCenterY;
      const angle = Math.atan2(dy, dx);
      const distance = Math.min(Math.sqrt(dx * dx + dy * dy), 400);
      const maxOffset = 4.5;
      const power = (distance / 400) * maxOffset;

      setPupilOffset({
        x: Math.cos(angle) * power,
        y: Math.sin(angle) * power,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleClick = () => {
    setIsBouncing(true);
    setMessageIndex((prev) => (prev + 1) % FUNNY_MESSAGES.length);
    setShowMessage(true);
    setTimeout(() => setIsBouncing(false), 500);
  };

  return (
    <div className="relative inline-flex flex-col items-center select-none">
      {/* Speech bubble */}
      <AnimatePresence mode="wait">
        {showMessage && (
          <motion.div
            key={messageIndex}
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="mb-2.5 max-w-[240px] rounded-2xl border border-stone-200 bg-white px-3.5 py-2 text-center text-xs font-medium text-stone-800 shadow-[0_4px_16px_rgba(0,0,0,0.06)]"
          >
            <span>{FUNNY_MESSAGES[messageIndex]}</span>
            {/* Little speech tail */}
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 h-3 w-3 rotate-45 border-r border-b border-stone-200 bg-white" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* The Fluffy Soot Sprite Mascot */}
      <motion.div
        ref={spriteRef}
        onClick={handleClick}
        animate={
          isBouncing
            ? {
                y: [-4, -18, 0],
                rotate: [-8, 8, 0],
                scale: [1, 1.15, 1],
              }
            : {
                y: [0, -4, 0],
              }
        }
        transition={
          isBouncing
            ? { duration: 0.45, ease: "easeOut" }
            : { duration: 3, repeat: Infinity, ease: "easeInOut" }
        }
        className="group relative h-20 w-20 cursor-pointer"
        title="Click me!"
      >
        {/* Soft shadow */}
        <div className="absolute -bottom-1 left-2 right-2 h-3 rounded-full bg-stone-300/60 blur-xs transition-transform group-hover:scale-90" />

        {/* Fluffy SVG Mascot Body */}
        <svg
          viewBox="0 0 100 100"
          className="h-full w-full drop-shadow-md transition-transform group-hover:scale-105"
        >
          {/* Fuzzy spiky soot silhouette */}
          <path
            d="M 50 10 
               C 62 11, 74 16, 82 25 
               C 91 35, 93 48, 89 60 
               C 85 73, 76 83, 64 88 
               C 50 93, 37 90, 26 84 
               C 15 76, 9 64, 10 50 
               C 11 36, 19 24, 30 16 
               C 36 12, 43 10, 50 10 Z"
            fill="#1c1917"
          />
          {/* Fuzz fur details */}
          <circle cx="50" cy="50" r="38" fill="#1c1917" />
          <circle cx="28" cy="28" r="6" fill="#1c1917" />
          <circle cx="72" cy="28" r="6" fill="#1c1917" />
          <circle cx="82" cy="52" r="6" fill="#1c1917" />
          <circle cx="18" cy="52" r="6" fill="#1c1917" />
          <circle cx="28" cy="74" r="6" fill="#1c1917" />
          <circle cx="72" cy="74" r="6" fill="#1c1917" />

          {/* Left Eye (Big cartoon white sclera) */}
          <circle cx="38" cy="46" r="13" fill="#ffffff" stroke="#e7e5e4" strokeWidth="1" />
          {/* Right Eye */}
          <circle cx="62" cy="46" r="13" fill="#ffffff" stroke="#e7e5e4" strokeWidth="1" />

          {/* Left Pupil (Tracks cursor!) */}
          <circle
            cx={38 + pupilOffset.x}
            cy={46 + pupilOffset.y}
            r="6"
            fill="#09090b"
          />
          {/* Left Eye Light Reflection */}
          <circle
            cx={36 + pupilOffset.x * 0.7}
            cy={43 + pupilOffset.y * 0.7}
            r="2"
            fill="#ffffff"
          />

          {/* Right Pupil (Tracks cursor!) */}
          <circle
            cx={62 + pupilOffset.x}
            cy={46 + pupilOffset.y}
            r="6"
            fill="#09090b"
          />
          {/* Right Eye Light Reflection */}
          <circle
            cx={60 + pupilOffset.x * 0.7}
            cy={43 + pupilOffset.y * 0.7}
            r="2"
            fill="#ffffff"
          />

          {/* Little rosy cheeks */}
          <circle cx="26" cy="58" r="5" fill="#f43f5e" opacity="0.35" />
          <circle cx="74" cy="58" r="5" fill="#f43f5e" opacity="0.35" />
        </svg>
      </motion.div>

      <span className="mt-1.5 font-mono text-[10px] text-stone-400">
        (Tap the sprite)
      </span>
    </div>
  );
}

