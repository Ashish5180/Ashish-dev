"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface UniversalLoaderProps {
  size?: "sm" | "md" | "lg" | "xl";
  label?: string;
  sublabel?: string;
  className?: string;
}

const SIZE_MAP = {
  sm: {
    container: "h-6 w-6",
    ringOuter: "h-6 w-6",
    ringInner: "h-4 w-4",
    coreDot: "h-1.5 w-1.5",
    textClass: "text-[10px]",
  },
  md: {
    container: "h-10 w-10",
    ringOuter: "h-10 w-10",
    ringInner: "h-7 w-7",
    coreDot: "h-2 w-2",
    textClass: "text-xs",
  },
  lg: {
    container: "h-16 w-16",
    ringOuter: "h-16 w-16",
    ringInner: "h-11 w-11",
    coreDot: "h-3 w-3",
    textClass: "text-xs",
  },
  xl: {
    container: "h-24 w-24",
    ringOuter: "h-24 w-24",
    ringInner: "h-16 w-16",
    coreDot: "h-4 w-4",
    textClass: "text-sm",
  },
};

/**
 * UniversalLoader — A high-precision orbital gyroscope loader.
 * Designed with craft: rotating calibration ticks, sky-blue arc, warm amber core.
 */
export function UniversalLoader({
  size = "md",
  label,
  sublabel,
  className,
}: UniversalLoaderProps) {
  const currentSize = SIZE_MAP[size];

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 select-none",
        className
      )}
      role="status"
      aria-label={label || "Loading"}
    >
      <div className={cn("relative flex items-center justify-center", currentSize.container)}>
        {/* Outer Orbital Ring with calibrated dashes (Clockwise) */}
        <svg
          className={cn("absolute inset-0 animate-[spin_6s_linear_infinite]", currentSize.ringOuter)}
          viewBox="0 0 100 100"
          fill="none"
        >
          <circle
            cx="50"
            cy="50"
            r="46"
            stroke="rgba(240, 240, 245, 0.08)"
            strokeWidth="3"
          />
          <circle
            cx="50"
            cy="50"
            r="46"
            stroke="#38bdf8"
            strokeWidth="3"
            strokeDasharray="24 16 8 16"
            strokeLinecap="round"
          />
          {/* Micro calibration notches */}
          <line x1="50" y1="2" x2="50" y2="8" stroke="rgba(240, 240, 245, 0.3)" strokeWidth="2" />
          <line x1="50" y1="92" x2="50" y2="98" stroke="rgba(240, 240, 245, 0.3)" strokeWidth="2" />
          <line x1="2" y1="50" x2="8" y2="50" stroke="rgba(240, 240, 245, 0.3)" strokeWidth="2" />
          <line x1="92" y1="50" x2="98" y2="50" stroke="rgba(240, 240, 245, 0.3)" strokeWidth="2" />
        </svg>

        {/* Counter-Rotating Inner Gyroscope Arc */}
        <svg
          className={cn("absolute animate-[spin_3s_linear_infinite_reverse]", currentSize.ringInner)}
          viewBox="0 0 100 100"
          fill="none"
        >
          <circle
            cx="50"
            cy="50"
            r="38"
            stroke="#fbbf24"
            strokeWidth="3.5"
            strokeDasharray="45 80"
            strokeLinecap="round"
          />
        </svg>

        {/* Center Quantum Dot */}
        <div
          className={cn(
            "rounded-full bg-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.7)] animate-pulse",
            currentSize.coreDot
          )}
        />
      </div>

      {label && (
        <div className="flex flex-col items-center text-center">
          <span
            className={cn(
              "font-mono font-medium tracking-widest uppercase text-[#f0f0f5]",
              currentSize.textClass
            )}
          >
            {label}
          </span>
          {sublabel && (
            <span className="font-mono text-[11px] text-[#5a6380] mt-0.5 tracking-wider">
              {sublabel}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export default UniversalLoader;

