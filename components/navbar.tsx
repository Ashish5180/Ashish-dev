"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ArrowUpRight, FileText } from "lucide-react";

export interface NavbarProps {
  className?: string;
}

function GithubIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function CodolioIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C7.58 2 4 5.58 4 10c0 2.5 1.15 4.73 2.95 6.2-.28.87-.95 2.05-1.95 2.8 1.95.2 3.82-.67 4.95-1.74.67.22 1.39.34 2.05.34 4.42 0 8-3.58 8-8s-3.58-8-8-8zm-3 9.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm6 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
    </svg>
  );
}

function LinkedInIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.2a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z" />
    </svg>
  );
}

function LeetCodeIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.247 2.198 5.876 2.164 8.08-.076l3.968-4.032a1.385 1.385 0 1 0-1.96-1.96l-3.968 4.032a3.02 3.02 0 0 1-4.242.04l-4.32-4.234a3.178 3.178 0 0 1-.954-2.186 3.118 3.118 0 0 1 .425-2.028 3.13 3.13 0 0 1 1.05-1.127l3.92-4.197 5.334-5.714A1.373 1.373 0 0 0 13.483 0zm4.278 9.53a1.385 1.385 0 0 0-1.385 1.385v5.085a1.385 1.385 0 1 0 2.77 0v-5.085a1.385 1.385 0 0 0-1.385-1.385z" />
    </svg>
  );
}

export function Navbar({ className = "" }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [isAvatarHovered, setIsAvatarHovered] = useState(false);

  const navLinks = [
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 px-4 sm:px-6 lg:px-8 transition-[padding] duration-300 ${
        scrolled ? "pt-2.5" : "pt-4"
      } ${className}`}
    >
      <nav
        aria-label="Main Navigation"
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-300 ${
          scrolled
            ? "border border-[#f0f0f5]/[0.08] bg-[#0c1220]/90 shadow-[0_12px_36px_-8px_rgba(0,0,0,0.6)] backdrop-blur-xl"
            : "border border-transparent bg-transparent"
        }`}
      >
        {/* Brand / Profile Picture with Simple Borderless Zoom Lens */}
        <div
          className="relative"
          onMouseEnter={() => setIsAvatarHovered(true)}
          onMouseLeave={() => setIsAvatarHovered(false)}
        >
          <Link href="/" className="group flex items-center gap-3">
            {/* Avatar Housing */}
            <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full border border-white/10 bg-[#111827] shadow-xs transition-all duration-300 group-hover:border-white/30 group-hover:scale-105">
              <Image
                src="/images/my.png"
                alt="Ashish Yadav"
                fill
                sizes="36px"
                priority
                className="object-cover object-[50%_38%] transition-transform duration-300 ease-out group-hover:scale-115"
              />
            </div>

            <div className="flex flex-col">
              <span className="font-display text-sm font-bold tracking-tight text-[#f0f0f5] leading-tight">
                Ashish Yadav
              </span>
              <span className="text-[11px] font-mono text-[#8b92a8] leading-tight">
                Software Engineer
              </span>
            </div>
          </Link>

          {/* =========================================================================
              CLEAN BORDERLESS ZOOM LENS (NO TEXT, NO PINK, PURE IMAGE ZOOM)
             ========================================================================= */}
          <AnimatePresence>
            {isAvatarHovered && (
              <motion.div
                initial={{ opacity: 0, scale: 0.85, y: -4 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.85, y: -4 }}
                transition={{ type: "spring", stiffness: 450, damping: 28 }}
                className="pointer-events-none absolute top-12 left-0 z-50"
              >
                {/* Borderless Circular Magnifying Lens */}
                <div className="relative h-32 w-32 overflow-hidden rounded-full border-0 bg-[#0c1220] shadow-[0_20px_50px_rgba(0,0,0,0.75)]">
                  <Image
                    src="/images/my.png"
                    alt="Ashish Yadav Zoom Lens"
                    fill
                    sizes="128px"
                    className="object-cover object-[50%_38%] scale-[1.7] transition-transform duration-200"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Center Nav Links (Desktop) */}
        <div
          className="hidden items-center gap-1 rounded-xl border border-[#f0f0f5]/[0.05] bg-[#0e1526]/50 p-1 md:flex"
          onMouseLeave={() => setHoveredNav(null)}
        >
          {navLinks.map((item) => {
            const isHovered = hoveredNav === item.label;
            return (
              <a
                key={item.label}
                href={item.href}
                onMouseEnter={() => setHoveredNav(item.label)}
                className="relative rounded-lg px-4 py-1.5 text-xs font-medium text-[#8b92a8] transition-colors duration-150 hover:text-[#f0f0f5]"
              >
                {isHovered && (
                  <motion.span
                    layoutId="nav-hover-pill"
                    className="absolute inset-0 rounded-lg bg-[#f0f0f5]/[0.08] -z-10"
                    transition={{
                      type: "spring",
                      stiffness: 450,
                      damping: 32,
                    }}
                  />
                )}
                <span>{item.label}</span>
              </a>
            );
          })}
        </div>

        {/* Right Actions: Creative Side, GitHub & High-Contrast Resume CTA */}
        <div className="hidden items-center gap-2.5 md:flex">
          {/* Creative Studio Atelier Link */}
          <Link
            href="/creative"
            className="group inline-flex items-center gap-2 rounded-lg border border-[#f0f0f5]/[0.08] bg-[#111827]/80 px-3 py-1.5 font-mono text-xs font-medium text-[#c4c8d4] transition-all duration-150 hover:border-amber-400/40 hover:bg-[#162035] hover:text-[#f0f0f5] active:scale-[0.98]"
            title="Read Ashish's essays, mental models & creative code"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400 transition-transform duration-150 group-hover:scale-125" />
            <span className="font-sans font-medium text-[#e4e4e7] group-hover:text-white">Creative Side</span>
            <span className="font-mono text-[10px] text-[#71717a] group-hover:text-[#a1a1aa]">/atelier</span>
            <ArrowUpRight className="h-3 w-3 text-[#71717a] transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
          </Link>

          {/* GitHub Icon Link */}
          <a
            href="https://github.com/Ashish5180"
            target="_blank"
            rel="noreferrer"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#f0f0f5]/[0.08] bg-[#111827]/80 text-[#8b92a8] hover:border-[#f0f0f5]/[0.2] hover:text-[#f0f0f5] transition-colors"
            title="GitHub (@Ashish5180)"
            aria-label="GitHub Profile"
          >
            <GithubIcon className="h-3.5 w-3.5" />
          </a>

          {/* LinkedIn Icon Link */}
          <a
            href="https://www.linkedin.com/in/ashishyadav001/"
            target="_blank"
            rel="noreferrer"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#f0f0f5]/[0.08] bg-[#111827]/80 text-[#8b92a8] hover:border-[#f0f0f5]/[0.2] hover:text-[#f0f0f5] transition-colors"
            title="LinkedIn (ashishyadav001)"
            aria-label="LinkedIn Profile"
          >
            <LinkedInIcon className="h-3.5 w-3.5" />
          </a>

          {/* Hot-Pink Resume Button */}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#ff2d7b] px-3.5 py-1.5 font-mono text-xs font-semibold text-white shadow-[0_2px_12px_rgba(255,45,123,0.3)] hover:bg-[#e6256e] active:scale-[0.98] transition-all cursor-pointer"
          >
            <FileText className="h-3.5 w-3.5" />
            <span>Resume</span>
            <ArrowUpRight className="h-3.5 w-3.5 text-white/80" />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#f0f0f5]/[0.08] bg-[#111827] text-[#f0f0f5] md:hidden cursor-pointer"
          aria-label="Toggle navigation"
        >
          {mobileMenuOpen ? (
            <X className="h-4 w-4" />
          ) : (
            <Menu className="h-4 w-4" />
          )}
        </button>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="mx-auto mt-2 max-w-6xl overflow-hidden rounded-2xl border border-[#f0f0f5]/[0.08] bg-[#0c1220]/95 p-4 shadow-[0_16px_40px_rgba(0,0,0,0.6)] backdrop-blur-2xl md:hidden"
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-lg px-3.5 py-2 text-sm font-medium text-[#8b92a8] transition-colors hover:bg-[#f0f0f5]/[0.05] hover:text-[#f0f0f5]"
                >
                  {item.label}
                </a>
              ))}

              {/* Mobile Creative Side Link */}
              <Link
                href="/creative"
                onClick={() => setMobileMenuOpen(false)}
                className="group flex items-center justify-between rounded-xl border border-[#f0f0f5]/[0.08] bg-[#111827] p-3 text-xs font-medium text-[#f0f0f5] transition-colors hover:border-[#f0f0f5]/[0.18] hover:bg-[#162035]"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-2 w-2 rounded-full bg-amber-400" />
                  <div className="flex flex-col text-left">
                    <span className="font-medium text-[#f0f0f5]">My Creative Side</span>
                    <span className="text-[11px] font-mono text-[#8b92a8]">Cinema, animation &amp; visual storytelling</span>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-[#8b92a8] transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
              </Link>

              <div className="my-2 border-t border-[#f0f0f5]/[0.06]" />

              {/* Profiles Row */}
              <div className="grid grid-cols-4 gap-1.5">
                <a
                  href="https://github.com/Ashish5180"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-1 rounded-lg border border-[#f0f0f5]/[0.08] bg-[#111827] py-2 text-[11px] font-medium text-[#8b92a8] hover:text-white"
                >
                  <GithubIcon className="h-3 w-3" />
                  <span>GitHub</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/ashishyadav001/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-1 rounded-lg border border-[#f0f0f5]/[0.08] bg-[#111827] py-2 text-[11px] font-medium text-[#8b92a8] hover:text-white"
                >
                  <LinkedInIcon className="h-3 w-3" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href="https://leetcode.com/u/Developer-AshishYadav/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-1 rounded-lg border border-[#f0f0f5]/[0.08] bg-[#111827] py-2 text-[11px] font-medium text-[#8b92a8] hover:text-white"
                >
                  <LeetCodeIcon className="h-3 w-3" />
                  <span>LeetCode</span>
                </a>
                <a
                  href="https://codolio.com/profile/SleepyOwl"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-1 rounded-lg border border-[#f0f0f5]/[0.08] bg-[#111827] py-2 text-[11px] font-medium text-[#8b92a8] hover:text-white"
                >
                  <CodolioIcon className="h-3 w-3" />
                  <span>Codolio</span>
                </a>
              </div>

              {/* Mobile Resume CTA */}
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-[#ff2d7b] py-2.5 font-mono text-xs font-semibold text-white shadow-[0_2px_12px_rgba(255,45,123,0.3)] hover:bg-[#e6256e] active:scale-[0.98] transition-all"
              >
                <FileText className="h-4 w-4" />
                <span>Download Resume</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
