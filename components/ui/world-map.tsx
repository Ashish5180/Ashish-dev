"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import DottedMap from "dotted-map";
import { useTheme } from "next-themes";

export interface MapUserNode {
  id: string;
  lat: number;
  lng: number;
  name: string;
  role: string;
  city: string;
  country: string;
  avatar: string;
  headline?: string;
  isOrigin?: boolean;
  status?: string;
  latency?: string;
}

export interface MapProps {
  dots?: Array<{
    start: { lat: number; lng: number; label?: string };
    end: { lat: number; lng: number; label?: string };
  }>;
  lineColor?: string;
  nodes?: MapUserNode[];
}

export default function WorldMap({
  dots = [],
  lineColor = "#ffffff",
  nodes = [],
}: MapProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [activeNode, setActiveNode] = useState<MapUserNode | null>(null);
  const map = new DottedMap({ height: 100, grid: "diagonal" });

  let currentTheme = "dark";
  try {
    const themeContext = useTheme();
    if (themeContext?.theme) {
      currentTheme = themeContext.theme;
    }
  } catch {
    currentTheme = "dark";
  }

  const svgMap = map.getSVG({
    radius: 0.22,
    color: currentTheme === "dark" ? "#FFFFFF35" : "#00000030",
    shape: "circle",
    backgroundColor: currentTheme === "dark" ? "black" : "white",
  });

  const projectPoint = (lat: number, lng: number) => {
    const x = (lng + 180) * (800 / 360);
    const y = (90 - lat) * (400 / 180);
    return { x, y };
  };

  const createCurvedPath = (
    start: { x: number; y: number },
    end: { x: number; y: number }
  ) => {
    const midX = (start.x + end.x) / 2;
    const midY = Math.min(start.y, end.y) - 50;
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
  };

  const getTooltipAlignment = (pct: number) => {
    if (pct < 22) return "left-0 -translate-x-2";
    if (pct > 78) return "right-0 translate-x-2";
    return "left-1/2 -translate-x-1/2";
  };

  return (
    <div className="w-full aspect-[2/1] bg-[#070b16] rounded-2xl relative font-sans overflow-visible border border-[#f0f0f5]/[0.06] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]">
      {/* Background SVG Map Texture */}
      <Image
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        className="h-full w-full [mask-image:linear-gradient(to_bottom,transparent,white_10%,white_90%,transparent)] pointer-events-none select-none opacity-85"
        alt="world map"
        height={495}
        width={1056}
        draggable={false}
        unoptimized
      />

      {/* SVG Arc Routes Layer */}
      <svg
        ref={svgRef}
        viewBox="0 0 800 400"
        className="w-full h-full absolute inset-0 pointer-events-none select-none z-10"
      >
        <defs>
          <linearGradient id="flight-path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.3" />
          </linearGradient>

          <filter id="glow-route" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {dots.map((dot, i) => {
          const startPoint = projectPoint(dot.start.lat, dot.start.lng);
          const endPoint = projectPoint(dot.end.lat, dot.end.lng);
          return (
            <g key={`path-group-${i}`}>
              {/* Subtle dotted baseline path */}
              <path
                d={createCurvedPath(startPoint, endPoint)}
                fill="none"
                stroke={lineColor}
                strokeOpacity="0.25"
                strokeWidth="1"
                strokeDasharray="4 4"
              />

              {/* Animated high-speed continuous pulse beam */}
              <motion.path
                d={createCurvedPath(startPoint, endPoint)}
                fill="none"
                stroke="url(#flight-path-gradient)"
                strokeWidth="2"
                filter="url(#glow-route)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: [0, 1, 1, 0],
                  opacity: [0.1, 1, 1, 0.1],
                }}
                transition={{
                  duration: 3.5,
                  delay: 0.3 * i,
                  repeat: Infinity,
                  repeatDelay: 0.5,
                  ease: "easeInOut",
                }}
              />
            </g>
          );
        })}
      </svg>

      {/* Interactive Global Collaborator PFP Pins Layer */}
      <div className="absolute inset-0 z-20 pointer-events-auto">
        {nodes.map((node) => {
          const { x, y } = projectPoint(node.lat, node.lng);
          const leftPct = (x / 800) * 100;
          const topPct = (y / 400) * 100;
          const isHovered = activeNode?.id === node.id;

          return (
            <div
              key={node.id}
              style={{
                left: `${leftPct}%`,
                top: `${topPct}%`,
              }}
              className="absolute -translate-x-1/2 -translate-y-1/2 group"
              onMouseEnter={() => setActiveNode(node)}
              onMouseLeave={() => setActiveNode(null)}
              onClick={() => setActiveNode(isHovered ? null : node)}
            >
              {/* Frameless Avatar Pin */}
              <div className="relative flex flex-col items-center">
                {/* Resting Frameless Circular Avatar */}
                <div
                  className={`relative overflow-hidden rounded-full cursor-pointer transition-transform duration-200 ease-out shadow-[0_4px_16px_rgba(0,0,0,0.7)] ${
                    node.isOrigin
                      ? "h-8 w-8 sm:h-9 sm:w-9 group-hover:scale-115"
                      : "h-7 w-7 sm:h-8 sm:w-8 group-hover:scale-115"
                  }`}
                  title={`${node.name} (${node.city})`}
                >
                  <Image
                    src={node.avatar}
                    alt={node.name}
                    fill
                    sizes="36px"
                    className="object-cover"
                    unoptimized
                  />
                </div>

                {/* =========================================================================
                    PFP ZOOM + SDE TITLE & FRIEND HEADLINE
                   ========================================================================= */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.88, y: 4 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.88, y: 4 }}
                      transition={{ type: "spring", stiffness: 450, damping: 28 }}
                      className={`pointer-events-none absolute bottom-full mb-3 z-50 w-64 sm:w-72 ${getTooltipAlignment(leftPct)}`}
                    >
                      <div className="rounded-2xl border border-white/15 bg-[#0c1220]/95 p-3.5 shadow-[0_20px_50px_rgba(0,0,0,0.85)] backdrop-blur-xl">
                        <div className="flex items-center gap-3">
                          {/* Zoomed PFP Lens */}
                          <div className="relative h-14 w-14 sm:h-16 sm:w-16 shrink-0 overflow-hidden rounded-full border border-white/20 bg-[#111827] shadow-[0_4px_16px_rgba(0,0,0,0.6)]">
                            <Image
                              src={node.avatar}
                              alt={`${node.name} Zoomed Avatar`}
                              fill
                              sizes="64px"
                              className="object-cover scale-[1.35] transition-transform duration-200"
                              unoptimized
                            />
                          </div>

                          {/* Friend Name, SDE Title & Location */}
                          <div className="flex flex-col min-w-0">
                            <span className="font-display text-sm font-bold text-white truncate tracking-tight">
                              {node.name}
                            </span>
                            <span className="font-mono text-[11px] font-medium text-sky-300 truncate">
                              {node.role}
                            </span>
                            <span className="font-mono text-[10px] text-[#8b92a8] truncate">
                              {node.city}, {node.country}
                            </span>
                          </div>
                        </div>

                        {/* Short Headline about him or her */}
                        {node.headline && (
                          <div className="mt-2.5 border-t border-white/[0.08] pt-2">
                            <p className="text-[11.5px] leading-relaxed text-[#c2c8d6]">
                              {node.headline}
                            </p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
