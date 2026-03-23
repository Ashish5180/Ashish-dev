"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GitCommit, Star, Code2 } from "lucide-react";

export default function CommitHeatmap() {
    // Generate 56 boxes (8 weeks * 7 days)
    const weeks = Array.from({ length: 14 }, (_, i) => i);
    const days = Array.from({ length: 7 }, (_, i) => i);

    const [levelsData, setLevelsData] = useState<number[]>([]);

    useEffect(() => {
        // Generate random levels only on the client after initial render
        const timer = setTimeout(() => {
            const data = Array.from({ length: 14 * 7 }, () => Math.floor(Math.random() * 5));
            setLevelsData(data);
        }, 10);
        return () => clearTimeout(timer);
    }, []);

    const getColor = (level: number) => {
        switch (level) {
            case 0: return "#F5F5F0";
            case 1: return "#DFDFD6";
            case 2: return "#CACABF";
            case 3: return "#555";
            case 4: return "#0E0E0E";
            default: return "#F5F5F0";
        }
    };

    return (
        <div style={{
            background: "#fff",
            border: "1.5px solid #E8E6E0",
            borderRadius: 24,
            padding: "24px",
            boxShadow: "0 10px 40px rgba(0,0,0,0.04)",
            fontFamily: "'Plus Jakarta Sans', sans-serif"
        }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "#F0EEE8", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <GitCommit size={16} color="#0E0E0E" />
                    </div>
                    <div>
                        <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#0E0E0E" }}>Activity Graph</h3>
                        <p style={{ fontSize: "10px", color: "#999", textTransform: "uppercase", letterSpacing: "1px" }}>Last 14 weeks</p>
                    </div>
                </div>
                <div style={{ display: "flex", gap: "12px" }}>
                    <div style={{ textAlign: "right" }}>
                        <span style={{ fontSize: "14px", fontWeight: 800, color: "#0E0E0E" }}>1,248</span>
                        <p style={{ fontSize: "9px", color: "#999", fontWeight: 600 }}>CONTRIBUTIONS</p>
                    </div>
                </div>
            </div>

            <div style={{ display: "flex", gap: "3px", overflowX: "auto", paddingBottom: "10px", msOverflowStyle: "none", scrollbarWidth: "none", minHeight: "102px" }}>
                {weeks.map(w => (
                    <div key={w} style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                        {days.map(d => {
                            const index = w * 7 + d;
                            const level = levelsData[index] ?? 0;
                            return (
                                <motion.div
                                    key={d}
                                    whileHover={{ scale: 1.2, zIndex: 10 }}
                                    style={{
                                        width: "12px",
                                        height: "12px",
                                        borderRadius: "3px",
                                        background: getColor(level),
                                        cursor: "pointer",
                                    }}
                                />
                            );
                        })}
                    </div>
                ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginTop: "16px" }}>
                <div style={{ padding: "12px", borderRadius: "16px", border: "1px solid #F0EEE8", background: "#fbfbfa" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                        <Star size={12} color="#f59e0b" fill="#f59e0b" />
                        <span style={{ fontSize: "10px", fontWeight: 700, color: "#0E0E0E" }}>Top Contributor</span>
                    </div>
                    <p style={{ fontSize: "12px", color: "#555", fontWeight: 500 }}>32 Open Source projects</p>
                </div>
                <div style={{ padding: "12px", borderRadius: "16px", border: "1px solid #F0EEE8", background: "#fbfbfa" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                        <Code2 size={12} color="#3b82f6" />
                        <span style={{ fontSize: "10px", fontWeight: 700, color: "#0E0E0E" }}>Most Used</span>
                    </div>
                    <p style={{ fontSize: "12px", color: "#555", fontWeight: 500 }}>TypeScript · 89%</p>
                </div>
            </div>
        </div>
    );
}
