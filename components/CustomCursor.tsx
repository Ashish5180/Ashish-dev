"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    const ringX = useSpring(mouseX, { stiffness: 80, damping: 18 });
    const ringY = useSpring(mouseY, { stiffness: 80, damping: 18 });

    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const isInteractive =
                target.closest('button') ||
                target.closest('a') ||
                target.closest('input') ||
                target.closest('textarea') ||
                target.getAttribute('role') === 'button' ||
                window.getComputedStyle(target).cursor === 'pointer';

            setIsHovering(!!isInteractive);
        };

        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseover", handleMouseOver);
        document.addEventListener("mouseleave", handleMouseLeave);
        document.addEventListener("mouseenter", handleMouseEnter);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseover", handleMouseOver);
            document.removeEventListener("mouseleave", handleMouseLeave);
            document.removeEventListener("mouseenter", handleMouseEnter);
        };
    }, [mouseX, mouseY, isVisible]);

    if (!isVisible) return null;

    return (
        <>
            <style>{`
        * { cursor: none !important; }
        @media (hover: none) and (pointer: coarse) {
          * { cursor: auto !important; }
          .custom-cursor-container { display: none !important; }
        }
      `}</style>
            <div className="custom-cursor-container" style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 99999 }}>
                {/* Inner Dot */}
                <motion.div
                    style={{
                        x: mouseX,
                        y: mouseY,
                        translateX: "-50%",
                        translateY: "-50%",
                        position: "fixed",
                        width: isHovering ? 44 : 8,
                        height: isHovering ? 44 : 8,
                        borderRadius: "50%",
                        background: isHovering ? "rgba(14, 14, 14, 0.1)" : "#0E0E0E",
                        border: isHovering ? "1.5px solid #0E0E0E" : "none",
                        mixBlendMode: "difference", // Using difference to ensure visibility on all backgrounds
                        transition: "width .2s, height .2s, background .2s, border .2s",
                    }}
                />
                {/* Outer Ring */}
                <motion.div
                    style={{
                        x: ringX,
                        y: ringY,
                        translateX: "-50%",
                        translateY: "-50%",
                        position: "fixed",
                        width: 36,
                        height: 36,
                        borderRadius: "50%",
                        border: "1px solid rgba(14, 14, 14, 0.3)",
                        opacity: isHovering ? 0 : 0.5,
                        mixBlendMode: "difference",
                        transition: "opacity .2s",
                    }}
                />
            </div>
        </>
    );
}
