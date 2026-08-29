"use client";

import React, { useState, Suspense } from "react";
import WorldMap from "@/components/ui/world-map";
import { Globe3D, GlobeMarker } from "@/components/ui/3d-globe";
import { motion } from "motion/react";
import {
  Mail,
  Copy,
  Check,
  Globe,
  MapPin,
  Clock,
  Send,
  ArrowUpRight,
  Radio,
  Compass,
} from "lucide-react";

function LinkedInIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.2a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z" />
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

const SAMPLE_MARKERS: GlobeMarker[] = [
  {
    lat: 28.6139,
    lng: 77.209,
    src: "https://assets.aceternity.com/avatars/6.webp",
    label: "New Delhi (Base)",
  },
  {
    lat: 37.7749,
    lng: -122.4194,
    src: "https://assets.aceternity.com/avatars/1.webp",
    label: "San Francisco",
  },
  {
    lat: 51.5074,
    lng: -0.1278,
    src: "https://assets.aceternity.com/avatars/2.webp",
    label: "London",
  },
  {
    lat: 35.6762,
    lng: 139.6503,
    src: "https://assets.aceternity.com/avatars/3.webp",
    label: "Tokyo",
  },
  {
    lat: 1.3521,
    lng: 103.8198,
    src: "https://assets.aceternity.com/avatars/12.webp",
    label: "Singapore",
  },
  {
    lat: 25.2048,
    lng: 55.2708,
    src: "https://assets.aceternity.com/avatars/10.webp",
    label: "Dubai",
  },
  {
    lat: 38.7223,
    lng: -9.1393,
    src: "https://assets.aceternity.com/avatars/5.webp",
    label: "Lisbon",
  },
];

const MAP_DOTS = [
  {
    start: { lat: 28.6139, lng: 77.209, label: "New Delhi" },
    end: { lat: 37.7749, lng: -122.4194, label: "San Francisco" },
  },
  {
    start: { lat: 28.6139, lng: 77.209, label: "New Delhi" },
    end: { lat: 51.5074, lng: -0.1278, label: "London" },
  },
  {
    start: { lat: 28.6139, lng: 77.209, label: "New Delhi" },
    end: { lat: 35.6762, lng: 139.6503, label: "Tokyo" },
  },
  {
    start: { lat: 28.6139, lng: 77.209, label: "New Delhi" },
    end: { lat: 1.3521, lng: 103.8198, label: "Singapore" },
  },
  {
    start: { lat: 51.5074, lng: -0.1278, label: "London" },
    end: { lat: 38.7223, lng: -9.1393, label: "Lisbon" },
  },
  {
    start: { lat: 37.7749, lng: -122.4194, label: "San Francisco" },
    end: { lat: -22.9068, lng: -43.1729, label: "Rio de Janeiro" },
  },
];

export function ContactConnectivitySection() {
  const [viewMode, setViewMode] = useState<"map" | "3d">("map");
  const [copied, setCopied] = useState(false);
  const emailAddress = "contact@ashish.dev";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="contact"
      aria-label="Global Connectivity and Contact"
      className="relative z-20 w-full border-t border-slate-200 bg-slate-50/70 px-4 py-24 text-slate-900 sm:px-6 lg:px-8 scroll-mt-16"
    >
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="mb-12 flex flex-col items-start justify-between gap-6 border-b border-slate-200 pb-6 md:flex-row md:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-700 shadow-2xs">
              <Globe className="h-3.5 w-3.5 text-blue-600" />
              <span>Global Reach &amp; Collaboration</span>
            </div>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Remote{" "}
              <span className="text-slate-400">
                {"Connectivity".split("").map((word, idx) => (
                  <motion.span
                    key={idx}
                    className="inline-block"
                    initial={{ x: -8, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: idx * 0.03 }}
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
            </h2>
            <p className="mt-1 max-w-2xl text-sm text-slate-600">
              Distributed asynchronous collaboration across timezones. Available
              for engineering teams worldwide.
            </p>
          </div>

          {/* View Toggle Tabs */}
          <div className="flex items-center gap-1 rounded-xl border border-slate-200 bg-white p-1 shadow-2xs">
            <button
              type="button"
              onClick={() => setViewMode("map")}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all duration-200 ${viewMode === "map"
                  ? "bg-slate-900 text-white shadow-xs"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
            >
              <Compass className="h-3.5 w-3.5" />
              <span>2D Flight Grid</span>
            </button>

            <button
              type="button"
              onClick={() => setViewMode("3d")}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all duration-200 ${viewMode === "3d"
                  ? "bg-slate-900 text-white shadow-xs"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
            >
              <Globe className="h-3.5 w-3.5" />
              <span>Interactive 3D Earth</span>
            </button>
          </div>
        </div>

        {/* Global Visualization Canvas */}
        <div className="relative overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-4 shadow-sm sm:p-6 lg:p-8">
          <div className="flex flex-col items-center justify-center">
            {viewMode === "map" ? (
              <div className="w-full">
                <WorldMap dots={MAP_DOTS} lineColor="#2563eb" />
              </div>
            ) : (
              <div className="relative h-[480px] w-full overflow-hidden rounded-2xl bg-slate-950 flex items-center justify-center">
                <Suspense
                  fallback={
                    <div className="flex items-center gap-2 text-sm text-slate-400 font-mono">
                      <Radio className="h-4 w-4 animate-spin text-blue-400" />
                      <span>Initializing 3D Orbit Mesh...</span>
                    </div>
                  }
                >
                  <Globe3D
                    markers={SAMPLE_MARKERS}
                    config={{
                      atmosphereColor: "#38bdf8",
                      atmosphereIntensity: 18,
                      bumpScale: 5,
                      autoRotateSpeed: 0.4,
                    }}
                  />
                </Suspense>
              </div>
            )}
          </div>
        </div>

        {/* ========================================================= */}
        {/* Contact Me & Collaboration Action Cards */}
        {/* ========================================================= */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Availability & Info Card (7 Cols) */}
          <div className="flex flex-col justify-between rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm sm:p-8 lg:col-span-7">
            <div>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 font-mono">
                  Currently Open for Opportunities
                </span>
              </div>

              <h3 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Let’s Build High-Impact Systems Together
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Whether you need a scalable Go/AWS backend, high-throughput
                distributed queue architecture, or grounded production AI
                pipelines — I’m ready to contribute immediately.
              </p>

              {/* Status Points */}
              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 text-xs">
                <div className="flex items-center gap-2.5 rounded-xl border border-slate-100 bg-slate-50/80 p-3">
                  <Clock className="h-4 w-4 text-blue-600 shrink-0" />
                  <div>
                    <span className="font-semibold text-slate-900 block">
                      Timezone Flexibility
                    </span>
                    <span className="text-slate-500">
                      IST (UTC+5:30) · Overlaps US &amp; EU
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 rounded-xl border border-slate-100 bg-slate-50/80 p-3">
                  <MapPin className="h-4 w-4 text-emerald-600 shrink-0" />
                  <div>
                    <span className="font-semibold text-slate-900 block">
                      Work Preferences
                    </span>
                    <span className="text-slate-500">
                      Remote · SDE / FDE / Backend
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Email Copy + Direct Message Action */}
            <div className="mt-8 border-t border-slate-100 pt-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                {/* 1-Click Copy Email Input */}
                <div className="flex flex-1 items-center justify-between rounded-xl border border-slate-200 bg-slate-50/80 px-3.5 py-2.5 shadow-2xs">
                  <div className="flex items-center gap-2 text-xs font-mono font-medium text-slate-700">
                    <Mail className="h-4 w-4 text-slate-400" />
                    <span>{emailAddress}</span>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="flex items-center gap-1 rounded-lg bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 shadow-2xs transition-colors hover:bg-slate-100 hover:text-black"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5 text-slate-400" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Direct Send Mail CTA */}
                <a
                  href={`mailto:${emailAddress}?subject=Engineering%20Role%20Inquiry%20-%20Ashish%20Yadav`}
                  className="flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-xs font-semibold text-white shadow-sm transition-all hover:bg-slate-800 active:scale-98 sm:w-auto"
                >
                  <span>Send Email</span>
                  <Send className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Social Profiles & Developer Links (5 Cols) */}
          <div className="flex flex-col justify-between rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm sm:p-8 lg:col-span-5">
            <div>
              <h4 className="text-base font-bold text-slate-900">
                Connect Directly
              </h4>
              <p className="mt-1 text-xs text-slate-500">
                Explore coding history, professional experience, and profiles.
              </p>

              <div className="mt-5 space-y-2.5">
                {/* LinkedIn Link */}
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50/50 p-4 transition-all hover:border-slate-300 hover:bg-white hover:shadow-xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <LinkedInIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="text-sm font-bold text-slate-900 block">
                        LinkedIn
                      </span>
                      <span className="text-xs text-slate-500">
                        Professional Network
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-blue-600" />
                </a>

                {/* GitHub Link */}
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50/50 p-4 transition-all hover:border-slate-300 hover:bg-white hover:shadow-xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-900">
                      <svg
                        className="h-5 w-5"
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
                    </div>
                    <div>
                      <span className="text-sm font-bold text-slate-900 block">
                        GitHub
                      </span>
                      <span className="text-xs text-slate-500">
                        Repositories &amp; Code
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-slate-900" />
                </a>

                {/* Codolio Link */}
                <a
                  href="https://codolio.com/profile/SleepyOwl"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50/50 p-4 transition-all hover:border-slate-300 hover:bg-white hover:shadow-xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-blue-600">
                      <CodolioIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="text-sm font-bold text-slate-900 block">
                        Codolio Profile
                      </span>
                      <span className="text-xs text-slate-500">
                        300+ Solved · 47-Day Streak
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-blue-600" />
                </a>
              </div>
            </div>

            {/* Footer Sign-off */}
            <div className="mt-6 text-center border-t border-slate-100 pt-4">
              <span className="text-[11px] font-mono text-slate-400">
                Designed &amp; Engineered by Ashish Yadav · 2026
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactConnectivitySection;
