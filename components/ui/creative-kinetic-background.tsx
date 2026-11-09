"use client";

import React, { useEffect, useRef } from "react";

export function CreativeKineticBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;
    let step = 0;

    let mouseX = -1000;
    let mouseY = -1000;
    let targetMouseX = -1000;
    let targetMouseY = -1000;

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
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Grid spacing & film marker parameters
    const gridSize = 48;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse lerp
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      step += 0.008;

      ctx.save();

      // Draw subtle kinetic grid nodes
      const cols = Math.ceil(width / gridSize);
      const rows = Math.ceil(height / gridSize);

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * gridSize;
          const y = j * gridSize;

          // Distance to cursor
          const dx = x - mouseX;
          const dy = y - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Subtle organic wave deflection
          const wave =
            Math.sin(i * 0.2 + step) * 2 +
            Math.cos(j * 0.2 + step * 0.8) * 2;

          let finalX = x;
          let finalY = y + wave;

          // Repulsion on mouse proximity
          if (dist < 180) {
            const force = (1 - dist / 180) * 12;
            const angle = Math.atan2(dy, dx);
            finalX += Math.cos(angle) * force;
            finalY += Math.sin(angle) * force;
          }

          // Draw small architectural plus marks / camera crosshairs at intersections
          if ((i + j) % 4 === 0) {
            ctx.strokeStyle = "rgba(168, 162, 158, 0.22)"; // stone-400 at 22%
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(finalX - 3, finalY);
            ctx.lineTo(finalX + 3, finalY);
            ctx.moveTo(finalX, finalY - 3);
            ctx.lineTo(finalX, finalY + 3);
            ctx.stroke();
          } else if ((i + j) % 2 === 0) {
            // Subtle micro dots
            ctx.fillStyle = "rgba(214, 211, 209, 0.35)"; // stone-300 at 35%
            ctx.beginPath();
            ctx.arc(finalX, finalY, 0.75, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      // Floating cinematic film frame guides (drifting slowly across background)
      const frameY = (Math.sin(step * 0.5) * 30 + height * 0.35) % height;
      ctx.strokeStyle = "rgba(245, 158, 11, 0.12)"; // subtle amber guide
      ctx.lineWidth = 1;
      ctx.setLineDash([8, 16]);
      ctx.beginPath();
      ctx.moveTo(0, frameY);
      ctx.lineTo(width, frameY);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
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

export default CreativeKineticBackground;

