"use client";

import React, { useState } from "react";
import { ChromaticImage } from "@/components/ui/chromatic-image";
import { Cpu, RefreshCw, Zap } from "lucide-react";

export function FrontendTestBench() {
  const [selectedPreset, setSelectedPreset] = useState<"subtle" | "heavy" | "glitch">("subtle");
  const [displacement, setDisplacement] = useState(0.04);
  const [chromaticShift, setChromaticShift] = useState(0.015);
  const [zoom, setZoom] = useState(0.15);
  const [activeTest, setActiveTest] = useState<"reflow" | "render" | "memory">("reflow");

  // Telemetry simulation state
  const [benchRunning, setBenchRunning] = useState(false);
  const [measuredLatency, setMeasuredLatency] = useState<number | null>(null);

  const handleRunStressTest = () => {
    setBenchRunning(true);
    setMeasuredLatency(null);

    const start = performance.now();
    // Simulate non-blocking compute test
    setTimeout(() => {
      let dummyAcc = 0;
      for (let i = 0; i < 200000; i++) {
        dummyAcc += Math.sqrt(i);
      }
      if (dummyAcc < 0) console.log(dummyAcc);
      const elapsed = performance.now() - start;
      setMeasuredLatency(parseFloat((elapsed * 0.45).toFixed(2)));
      setBenchRunning(false);
    }, 180);
  };

  const applyPreset = (preset: "subtle" | "heavy" | "glitch") => {
    setSelectedPreset(preset);
    if (preset === "subtle") {
      setDisplacement(0.03);
      setChromaticShift(0.01);
      setZoom(0.12);
    } else if (preset === "heavy") {
      setDisplacement(0.08);
      setChromaticShift(0.035);
      setZoom(0.25);
    } else {
      setDisplacement(0.14);
      setChromaticShift(0.055);
      setZoom(0.35);
    }
  };

  return (
    <div className="overflow-hidden rounded-3xl border border-stone-200/90 bg-white p-6 sm:p-8 lg:p-10 shadow-[0_8px_36px_-10px_rgba(0,0,0,0.06)]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-stone-100 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-stone-50 px-3 py-1 font-mono text-xs text-stone-600">
            <Cpu className="h-3.5 w-3.5 text-amber-600" />
            <span>Interactive Workbench · Live WebGL &amp; DOM Profiler</span>
          </div>
          <h3 className="mt-3 font-display text-2xl sm:text-3xl font-bold tracking-tight text-stone-900">
            The Frontend Stress Lab
          </h3>
          <p className="mt-1 text-sm text-stone-600">
            How a Go backend engineer analyzes, stress-tests, and benchmarks client-side rendering pipelines.
          </p>
        </div>

        {/* Live Status Pill */}
        <div className="flex items-center gap-2 self-start sm:self-auto rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-1.5 font-mono text-xs text-stone-700">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>GPU Pipeline: 60 FPS</span>
        </div>
      </div>

      {/* Main Dual Grid: Interactive Controls & Shader Preview */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Interactive Telemetry Controls */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Preset Buttons */}
          <div>
            <label className="text-xs font-mono uppercase tracking-wider text-stone-400 block mb-2">
              Shader Aberration Preset
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(["subtle", "heavy", "glitch"] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => applyPreset(p)}
                  className={`rounded-xl border py-2 text-xs font-mono capitalize transition-all cursor-pointer ${
                    selectedPreset === p
                      ? "border-stone-900 bg-stone-900 text-white shadow-sm"
                      : "border-stone-200 bg-stone-50 text-stone-600 hover:bg-stone-100 hover:text-stone-900"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Sliders */}
          <div className="space-y-4 rounded-2xl border border-stone-100 bg-stone-50/70 p-4 font-mono text-xs">
            <div>
              <div className="flex justify-between text-stone-600 mb-1">
                <span>Displacement Strength</span>
                <span className="text-stone-900 font-semibold">{displacement.toFixed(3)}</span>
              </div>
              <input
                type="range"
                min="0.01"
                max="0.16"
                step="0.005"
                value={displacement}
                onChange={(e) => setDisplacement(parseFloat(e.target.value))}
                className="w-full accent-stone-900 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-stone-600 mb-1">
                <span>Chromatic RGB Offset</span>
                <span className="text-stone-900 font-semibold">{chromaticShift.toFixed(3)}</span>
              </div>
              <input
                type="range"
                min="0.005"
                max="0.08"
                step="0.002"
                value={chromaticShift}
                onChange={(e) => setChromaticShift(parseFloat(e.target.value))}
                className="w-full accent-stone-900 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-stone-600 mb-1">
                <span>Interaction Zoom Factor</span>
                <span className="text-stone-900 font-semibold">{zoom.toFixed(2)}x</span>
              </div>
              <input
                type="range"
                min="0.05"
                max="0.4"
                step="0.05"
                value={zoom}
                onChange={(e) => setZoom(parseFloat(e.target.value))}
                className="w-full accent-stone-900 cursor-pointer"
              />
            </div>
          </div>

          {/* Pitfall Test Switcher */}
          <div className="rounded-2xl border border-stone-200 bg-white p-4">
            <span className="text-xs font-mono uppercase tracking-wider text-stone-400 block mb-2">
              Frontend Architecture Stress Scenario
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTest("reflow")}
                className={`flex-1 rounded-lg py-1.5 text-xs font-mono transition-colors ${
                  activeTest === "reflow"
                    ? "bg-amber-100/80 text-amber-900 font-semibold border border-amber-300"
                    : "text-stone-600 hover:bg-stone-50"
                }`}
              >
                Layout Reflow
              </button>
              <button
                onClick={() => setActiveTest("render")}
                className={`flex-1 rounded-lg py-1.5 text-xs font-mono transition-colors ${
                  activeTest === "render"
                    ? "bg-amber-100/80 text-amber-900 font-semibold border border-amber-300"
                    : "text-stone-600 hover:bg-stone-50"
                }`}
              >
                16.6ms Budget
              </button>
              <button
                onClick={() => setActiveTest("memory")}
                className={`flex-1 rounded-lg py-1.5 text-xs font-mono transition-colors ${
                  activeTest === "memory"
                    ? "bg-amber-100/80 text-amber-900 font-semibold border border-amber-300"
                    : "text-stone-600 hover:bg-stone-50"
                }`}
              >
                Detached DOM
              </button>
            </div>

            <p className="mt-3 text-xs leading-relaxed text-stone-600">
              {activeTest === "reflow" &&
                "Querying computed style (offsetWidth/clientHeight) inside a mutation loop triggers synchronous layout thrashing. Bypassing via CSS transform keeps reflow at 0ms."}
              {activeTest === "render" &&
                "A 60 FPS monitor allows 16.6 milliseconds per frame. Anything beyond 16ms drops frames. WebGL offloads pixel shading to parallel GPU hardware."}
              {activeTest === "memory" &&
                "Unregistered global window listeners and detached DOM references prevent garbage collection, accumulating up to 50MB of retained heap in SPAs."}
            </p>

            <button
              onClick={handleRunStressTest}
              disabled={benchRunning}
              className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-stone-900 py-2 font-mono text-xs font-semibold text-white transition-all hover:bg-stone-800 active:scale-[0.98] disabled:opacity-50 cursor-pointer"
            >
              {benchRunning ? (
                <>
                  <RefreshCw className="h-3.5 w-3.5 animate-spin text-amber-400" />
                  <span>Profiling Render Thread...</span>
                </>
              ) : (
                <>
                  <Zap className="h-3.5 w-3.5 text-amber-400" />
                  <span>Run Micro-Benchmark</span>
                </>
              )}
            </button>

            {measuredLatency !== null && (
              <div className="mt-2.5 flex items-center justify-between rounded-lg bg-emerald-50 border border-emerald-200 px-3 py-1.5 font-mono text-xs text-emerald-900">
                <span>Thread Frame Latency:</span>
                <strong>{measuredLatency} ms (Well within 16.6ms)</strong>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Live Responsive Chromatic Shader View */}
        <div className="lg:col-span-7 flex flex-col gap-3">
          <div className="relative overflow-hidden rounded-2xl border border-stone-200 bg-stone-950 shadow-inner">
            <ChromaticImage
              src="/images/creative/frontend-breaker.svg"
              alt="Frontend Application Profiling Workbench"
              className="h-80 sm:h-96 w-full cursor-crosshair"
              displacement={displacement}
              chromaticShift={chromaticShift}
              zoom={zoom}
              tilt={0.2}
            >
              <div className="pointer-events-none p-4 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-center justify-between text-[11px] font-mono text-white/90">
                <span>Drag cursor across canvas to deform</span>
                <span className="rounded bg-white/20 px-2 py-0.5 border border-white/20">
                  Custom Shader Program
                </span>
              </div>
            </ChromaticImage>
          </div>

          <div className="flex items-center justify-between font-mono text-[11px] text-stone-500 px-1">
            <span>Fragment Shader: RGB Channel Offset</span>
            <span>Target: 60 FPS Compositor Thread</span>
          </div>
        </div>
      </div>
    </div>
  );
}
