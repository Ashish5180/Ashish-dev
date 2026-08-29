"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Cloud, Menu, X } from "lucide-react";

export interface NavbarProps {
  className?: string;
}

function GithubIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function CodolioIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
      <line x1="14" y1="4" x2="10" y2="20" />
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

export function Navbar({ className = "" }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);

  const navLinks = [
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Skills & About", href: "#skills" },
    { label: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 inset-x-0 z-50 px-4 pt-3 sm:px-6 lg:px-8 pointer-events-auto transition-all duration-300 ${
        scrolled ? "pt-2" : "pt-4"
      } ${className}`}
    >
      <nav
        aria-label="Main Navigation"
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-4 py-2.5 sm:py-3 transition-all duration-300 relative overflow-hidden ${
          scrolled
            ? "border border-white/70 bg-white/75 shadow-[0_12px_40px_rgba(0,0,0,0.08)] backdrop-blur-2xl backdrop-saturate-180"
            : "border border-slate-200/80 bg-white/65 shadow-[0_8px_30px_rgba(0,0,0,0.04)] backdrop-blur-xl backdrop-saturate-150"
        }`}
      >
        {/* Subtle iridescent glass reflection highlight line */}
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/90 to-transparent pointer-events-none" />

        {/* Brand Logo & Live Status Beacon */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 transition-transform duration-200 hover:scale-105"
        >
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200/90 bg-white/90 shadow-2xs transition-all duration-300 group-hover:border-slate-300 group-hover:shadow-xs">
            <Cloud className="h-5 w-5 text-slate-900 transition-transform duration-300 group-hover:scale-110" />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-600 border border-white"></span>
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-tight text-slate-900 leading-tight">
              Ashish Yadav
            </span>
            <span className="text-[10px] font-mono text-emerald-700 font-semibold leading-tight">
              Open to Roles
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links with Sliding Magnetic Glass Pill */}
        <div
          className="hidden items-center gap-1 rounded-xl p-1 md:flex"
          onMouseLeave={() => setHoveredNav(null)}
        >
          {navLinks.map((item) => {
            const isHovered = hoveredNav === item.label;
            return (
              <a
                key={item.label}
                href={item.href}
                onMouseEnter={() => setHoveredNav(item.label)}
                className="relative rounded-lg px-3.5 py-1.5 text-xs font-semibold text-slate-700 transition-colors duration-200 hover:text-slate-950"
              >
                {isHovered && (
                  <motion.span
                    layoutId="nav-hover-pill"
                    className="absolute inset-0 rounded-lg bg-slate-100/90 border border-slate-200/70 shadow-2xs -z-10"
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 30,
                    }}
                  />
                )}
                <span>{item.label}</span>
              </a>
            );
          })}
        </div>

        {/* Action Buttons (Glass Social Profile Badges) */}
        <div className="hidden items-center gap-2 md:flex">
          {/* GitHub Button */}
          <motion.a
            href="https://github.com/Ashish5180"
            target="_blank"
            rel="noreferrer"
            whileHover={{ y: -2, scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-1.5 rounded-xl border border-slate-200/90 bg-white/90 px-3 py-1.5 text-xs font-semibold text-slate-800 shadow-2xs backdrop-blur-md transition-all duration-200 hover:border-slate-400 hover:bg-white hover:text-black hover:shadow-xs"
          >
            <GithubIcon className="h-3.5 w-3.5 text-slate-900" />
            <span>GitHub</span>
          </motion.a>

          {/* Codolio Button */}
          <motion.a
            href="https://codolio.com"
            target="_blank"
            rel="noreferrer"
            whileHover={{ y: -2, scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-1.5 rounded-xl border border-slate-200/90 bg-white/90 px-3 py-1.5 text-xs font-semibold text-slate-800 shadow-2xs backdrop-blur-md transition-all duration-200 hover:border-slate-400 hover:bg-white hover:text-blue-600 hover:shadow-xs"
          >
            <CodolioIcon className="h-3.5 w-3.5 text-blue-600" />
            <span>Codolio</span>
          </motion.a>

          {/* LinkedIn Button */}
          <motion.a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            whileHover={{ y: -2, scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-1.5 rounded-xl border border-slate-200/90 bg-white/90 px-3 py-1.5 text-xs font-semibold text-slate-800 shadow-2xs backdrop-blur-md transition-all duration-200 hover:border-slate-400 hover:bg-white hover:text-blue-600 hover:shadow-xs"
          >
            <LinkedInIcon className="h-3.5 w-3.5 text-blue-600" />
            <span>LinkedIn</span>
          </motion.a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200/90 bg-white/90 text-slate-900 shadow-2xs backdrop-blur-md md:hidden transition-transform active:scale-95"
          aria-label="Toggle navigation"
        >
          {mobileMenuOpen ? <X className="h-4.5 w-4.5" /> : <Menu className="h-4.5 w-4.5" />}
        </button>
      </nav>

      {/* Mobile Glass Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.96 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="mx-auto mt-2 max-w-6xl overflow-hidden rounded-2xl border border-white/80 bg-white/85 p-4 shadow-[0_16px_40px_rgba(0,0,0,0.12)] backdrop-blur-2xl backdrop-saturate-180 md:hidden"
          >
            <div className="flex flex-col gap-1.5">
              {navLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-800 transition-colors hover:bg-slate-100 hover:text-black"
                >
                  {item.label}
                </a>
              ))}
              <hr className="my-2 border-slate-200/60" />
              <div className="grid grid-cols-3 gap-2 pt-1">
                <a
                  href="https://github.com/Ashish5180"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white/90 py-2 text-xs font-semibold text-slate-900 shadow-2xs"
                >
                  <GithubIcon className="h-3.5 w-3.5" />
                  <span>GitHub</span>
                </a>
                <a
                  href="https://codolio.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white/90 py-2 text-xs font-semibold text-slate-900 shadow-2xs"
                >
                  <CodolioIcon className="h-3.5 w-3.5 text-blue-600" />
                  <span>Codolio</span>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white/90 py-2 text-xs font-semibold text-slate-900 shadow-2xs"
                >
                  <LinkedInIcon className="h-3.5 w-3.5 text-blue-600" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default Navbar;
