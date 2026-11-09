"use client";

import React, { useEffect, useRef } from "react";

interface Leaf {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  windDrift: number;
  rotation: number;
  rotationSpeed: number;
  flip: number;
  flipSpeed: number;
  oscillationPhase: number;
  oscillationSpeed: number;
  color: string;
  opacity: number;
}

const MAPLE_COLORS = [
  "rgba(194, 65, 12, ",   // terracotta / burnt orange
  "rgba(217, 119, 6, ",   // warm autumn amber
  "rgba(225, 29, 72, ",   // scarlet maple
  "rgba(180, 83, 9, ",    // golden bronze
  "rgba(234, 88, 12, ",   // autumn crimson
  "rgba(146, 64, 14, ",   // rust brown
];

// Stylized realistic 5-lobed maple leaf SVG path
const MAPLE_SVG_PATH =
  "M0,-24 C2,-17 6,-13 8,-9 C14,-15 18,-17 22,-17 C20,-11 17,-6 18,-3 C24,-6 28,-6 32,-5 C28,1 22,5 18,7 C25,9 30,13 32,17 C26,18 20,16 15,15 C18,20 21,25 23,29 C17,25 12,20 8,16 C7,23 5,29 4,35 L-4,35 C-5,29 -7,23 -8,16 C-12,20 -17,25 -23,29 C-21,25 -18,20 -15,15 C-20,16 -26,18 -32,17 C-30,13 -25,9 -18,7 C-22,5 -28,1 -32,-5 C-28,-6 -24,-6 -18,-3 C-17,-6 -20,-11 -22,-17 C-18,-17 -14,-15 -8,-9 C-6,-13 -2,-17 0,-24 Z";

export function FallingLeaves() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;

    let mouseX = -1000;
    let mouseY = -1000;

    // Use Path2D for high-speed hardware-accelerated rendering
    let leafPath: Path2D | null = null;
    try {
      leafPath = new Path2D(MAPLE_SVG_PATH);
    } catch {
      leafPath = null;
    }

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    let gustForce = 0;
    const handleGust = () => {
      gustForce = 5.5;
    };
    window.addEventListener("leaf-gust", handleGust);

    // Generate responsive number of maple leaves based on viewport width
    const leafCount = Math.max(16, Math.min(36, Math.floor(width / 45)));

    const createLeaf = (initialRandomY = false): Leaf => {
      const baseColor = MAPLE_COLORS[Math.floor(Math.random() * MAPLE_COLORS.length)];
      const opacity = 0.35 + Math.random() * 0.45;

      return {
        x: Math.random() * width,
        y: initialRandomY ? Math.random() * height : -40 - Math.random() * 80,
        size: 14 + Math.random() * 18,
        speedY: 0.75 + Math.random() * 1.25,
        speedX: -0.3 + Math.random() * 0.6,
        windDrift: 0.3 + Math.random() * 0.4,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        flip: Math.random() * Math.PI * 2,
        flipSpeed: 0.015 + Math.random() * 0.025,
        oscillationPhase: Math.random() * Math.PI * 2,
        oscillationSpeed: 0.015 + Math.random() * 0.02,
        color: `${baseColor}${opacity.toFixed(2)})`,
        opacity,
      };
    };

    const leaves: Leaf[] = Array.from({ length: leafCount }, () => createLeaf(true));

    let globalWind = 0;
    let step = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      step += 0.01;
      // Gentle natural autumn wind oscillation with gust boost
      if (gustForce > 0.04) {
        gustForce *= 0.96;
      } else {
        gustForce = 0;
      }
      globalWind = Math.sin(step * 0.4) * 0.5 + 0.3 + gustForce;

      for (let i = 0; i < leaves.length; i++) {
        const leaf = leaves[i];

        // Natural sway physics
        leaf.oscillationPhase += leaf.oscillationSpeed;
        const sway = Math.sin(leaf.oscillationPhase) * 1.2;

        leaf.y += leaf.speedY + gustForce * 0.35;
        leaf.x += leaf.speedX + globalWind + sway;

        leaf.rotation += leaf.rotationSpeed + (gustForce > 0 ? 0.03 : 0);
        leaf.flip += leaf.flipSpeed + (gustForce > 0 ? 0.02 : 0);

        // Interaction with cursor wind gust
        const dx = leaf.x - mouseX;
        const dy = leaf.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 140) {
          const force = (1 - dist / 140) * 4;
          const angle = Math.atan2(dy, dx);
          leaf.x += Math.cos(angle) * force;
          leaf.y += Math.sin(angle) * force;
          leaf.rotation += 0.04;
        }

        // Recycle leaf when it falls below bottom or drifts off sides
        if (leaf.y > height + 50 || leaf.x < -60 || leaf.x > width + 60) {
          leaves[i] = createLeaf(false);
          continue;
        }

        // Render individual tumbling leaf
        ctx.save();
        ctx.translate(leaf.x, leaf.y);
        ctx.rotate(leaf.rotation);

        // 3D tumbling flip effect
        const flipScale = Math.cos(leaf.flip);
        const scale = leaf.size / 30;
        ctx.scale(scale, scale * flipScale);

        ctx.fillStyle = leaf.color;

        if (leafPath) {
          ctx.fill(leafPath);
        } else {
          // Fallback geometric maple silhouette if Path2D unavailable
          ctx.beginPath();
          ctx.moveTo(0, -20);
          ctx.lineTo(8, -8);
          ctx.lineTo(20, -12);
          ctx.lineTo(14, 4);
          ctx.lineTo(24, 16);
          ctx.lineTo(8, 14);
          ctx.lineTo(4, 28);
          ctx.lineTo(-4, 28);
          ctx.lineTo(-8, 14);
          ctx.lineTo(-24, 16);
          ctx.lineTo(-14, 4);
          ctx.lineTo(-20, -12);
          ctx.lineTo(-8, -8);
          ctx.closePath();
          ctx.fill();
        }

        // Delicate central leaf vein line
        ctx.strokeStyle = "rgba(255, 255, 255, 0.22)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, -22);
        ctx.lineTo(0, 32);
        ctx.stroke();

        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("leaf-gust", handleGust);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
    />
  );
}

export default FallingLeaves;

