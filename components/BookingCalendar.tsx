"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ChevronLeft, ChevronRight, Clock, Video,
    Calendar as CalendarIcon, CheckCircle2,
    Sparkles, ArrowRight, X
} from "lucide-react";
import { toast } from "sonner";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const TIME_SLOTS = [
    "10:00 AM", "11:00 AM", "01:30 PM", "03:00 PM", "05:00 PM"
];

const s = {
    font: "'Plus Jakarta Sans', sans-serif",
};

export default function BookingCalendar() {
    const [view, setView] = useState<"calendar" | "time" | "confirm" | "success">("calendar");
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [isBooking, setIsBooking] = useState(false);

    // Calendar logic
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();

    const calendarDays = useMemo(() => {
        const firstDay = new Date(year, month, 1).getDay();
        const daysCount = new Date(year, month + 1, 0).getDate();
        const days = [];
        // Fill empty slots for previous month
        for (let i = 0; i < firstDay; i++) {
            days.push(null);
        }
        // Current month days
        for (let i = 1; i <= daysCount; i++) {
            days.push(i);
        }
        return days;
    }, [year, month]);

    const handlePrevMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1));
    };

    const isToday = (day: number) => {
        const today = new Date();
        return (
            day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear()
        );
    };

    const isPast = (day: number) => {
        const d = new Date(year, month, day);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return d < today;
    };

    const handleSelectDate = (day: number) => {
        if (isPast(day)) return;
        const selected = new Date(year, month, day);
        setSelectedDate(selected);
        setView("time");
    };

    const handleBooking = async () => {
        setIsBooking(true);
        // Simulate API call
        await new Promise(r => setTimeout(r, 1500));
        setIsBooking(false);
        setView("success");
        toast.success("Call booked! Check your email.");
    };

    const reset = () => {
        setView("calendar");
        setSelectedDate(null);
        setSelectedTime(null);
    };

    return (
        <div className="bc-container" style={{
            ...s,
            background: "#fff",
            border: "1.5px solid #E8E6E0",
            borderRadius: 24,
            padding: "24px",
            position: "relative",
            minHeight: "420px",
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 10px 40px rgba(0,0,0,0.04)",
            overflow: "hidden"
        }}>
            <style>{`
                @media (max-width: 768px) {
                    .bc-container {
                        padding: 18px !important;
                        border-radius: 20px !important;
                        min-height: 380px !important;
                    }
                    .bc-day-cell { height: 32px !important; }
                    .bc-day-btn { width: 28px !important; height: 28px !important; font-size: 11px !important; }
                }
                @media (max-width: 480px) {
                    .bc-container {
                        padding: 14px !important;
                        border-radius: 16px !important;
                        min-height: 360px !important;
                    }
                    .bc-day-cell { height: 30px !important; }
                    .bc-day-btn { width: 26px !important; height: 26px !important; font-size: 10px !important; border-radius: 8px !important; }
                    .bc-intro-row { padding: 10px !important; }
                }
            `}</style>
            {/* Background Accent */}
            <div style={{
                position: "absolute",
                top: "-50px",
                right: "-50px",
                width: "150px",
                height: "150px",
                background: "radial-gradient(circle, rgba(0,0,0,0.03) 0%, transparent 70%)",
                borderRadius: "50%",
                pointerEvents: "none"
            }} />

            <AnimatePresence mode="wait">
                {view === "calendar" && (
                    <motion.div
                        key="calendar"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
                            <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#0E0E0E" }}>
                                {MONTHS[month]} {year}
                            </h3>
                            <div style={{ display: "flex", gap: "8px" }}>
                                <motion.button
                                    whileHover={{ background: "#F0EEE8" }}
                                    onClick={handlePrevMonth}
                                    style={{ padding: "6px", borderRadius: "8px", border: "1px solid #E8E6E0", background: "transparent", cursor: "pointer" }}
                                >
                                    <ChevronLeft size={16} />
                                </motion.button>
                                <motion.button
                                    whileHover={{ background: "#F0EEE8" }}
                                    onClick={handleNextMonth}
                                    style={{ padding: "6px", borderRadius: "8px", border: "1px solid #E8E6E0", background: "transparent", cursor: "pointer" }}
                                >
                                    <ChevronRight size={16} />
                                </motion.button>
                            </div>
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "4px", textAlign: "center", marginBottom: "8px" }}>
                            {DAYS.map(d => (
                                <span key={d} style={{ fontSize: "10px", fontWeight: 600, color: "#999", textTransform: "uppercase", letterSpacing: "1px" }}>
                                    {d[0]}
                                </span>
                            ))}
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "4px" }}>
                            {calendarDays.map((day, i) => (
                                <div key={i} className="bc-day-cell" style={{ height: "36px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    {day && (
                                        <motion.button
                                            className="bc-day-btn"
                                            whileHover={!isPast(day) ? { scale: 1.1, background: "#0E0E0E", color: "#fff" } : {}}
                                            whileTap={!isPast(day) ? { scale: 0.95 } : {}}
                                            onClick={() => handleSelectDate(day)}
                                            disabled={isPast(day)}
                                            style={{
                                                width: "32px",
                                                height: "32px",
                                                borderRadius: "10px",
                                                fontSize: "12px",
                                                fontWeight: 600,
                                                background: isToday(day) ? "#F0EEE8" : "transparent",
                                                color: isPast(day) ? "#ccc" : isToday(day) ? "#0E0E0E" : "#555",
                                                border: "none",
                                                cursor: isPast(day) ? "not-allowed" : "pointer",
                                                transition: "background 0.2s, color 0.2s"
                                            }}
                                        >
                                            {day}
                                        </motion.button>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="bc-intro-row" style={{ marginTop: "24px", display: "flex", alignItems: "center", gap: "10px", padding: "12px", background: "#f9f9f9", borderRadius: "12px" }}>
                            <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "#0E0E0E", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                <Sparkles size={14} color="#fff" />
                            </div>
                            <div>
                                <p style={{ fontSize: "11px", fontWeight: 700, color: "#0E0E0E" }}>Free Intro Call</p>
                                <p style={{ fontSize: "10px", color: "#888" }}>15-min discovery session</p>
                            </div>
                        </div>
                    </motion.div>
                )}

                {view === "time" && (
                    <motion.div
                        key="time"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
                            <button onClick={() => setView("calendar")} style={{ background: "transparent", border: "none", cursor: "pointer", padding: "4px" }}>
                                <ChevronLeft size={18} />
                            </button>
                            <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#0E0E0E" }}>
                                {selectedDate?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </h3>
                        </div>

                        <p style={{ fontSize: "12px", color: "#666", marginBottom: "16px" }}>Select a time that works for you:</p>

                        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                            {TIME_SLOTS.map(time => (
                                <motion.button
                                    key={time}
                                    whileHover={{ scale: 1.02, background: "#0E0E0E", color: "#fff" }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => {
                                        setSelectedTime(time);
                                        setView("confirm");
                                    }}
                                    style={{
                                        padding: "14px",
                                        borderRadius: "14px",
                                        border: "1.5px solid #E8E6E0",
                                        background: "transparent",
                                        textAlign: "left",
                                        fontSize: "13px",
                                        fontWeight: 600,
                                        color: "#0E0E0E",
                                        cursor: "pointer",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between"
                                    }}
                                >
                                    {time}
                                    <Clock size={14} opacity={0.4} />
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                )}

                {view === "confirm" && (
                    <motion.div
                        key="confirm"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                        style={{ display: "flex", flexDirection: "column", height: "100%" }}
                    >
                        <div style={{ marginBottom: "24px" }}>
                            <button onClick={() => setView("time")} style={{ background: "transparent", border: "none", cursor: "pointer", padding: "4px", marginBottom: "12px" }}>
                                <ChevronLeft size={18} />
                            </button>
                            <h3 style={{ fontSize: "18px", fontWeight: 800, color: "#0E0E0E", letterSpacing: "-0.5px" }}>
                                Confirmation
                            </h3>
                        </div>

                        <div style={{ background: "#F9F9F8", padding: "20px", borderRadius: "18px", marginBottom: "24px", border: "1px solid #E8E6E0" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                                <div style={{ width: "40px", height: "40px", borderRadius: "12px", background: "#0E0E0E", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <Video size={20} color="#fff" />
                                </div>
                                <div>
                                    <p style={{ fontSize: "14px", fontWeight: 700, color: "#0E0E0E" }}>Intro Call</p>
                                    <p style={{ fontSize: "12px", color: "#666" }}>Google Meet · 15 min</p>
                                </div>
                            </div>

                            <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13px", color: "#444", fontWeight: 500 }}>
                                <CalendarIcon size={14} />
                                {selectedDate?.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13px", color: "#444", fontWeight: 500, marginTop: "8px" }}>
                                <Clock size={14} />
                                {selectedTime}
                            </div>
                        </div>

                        <div style={{ marginTop: "auto" }}>
                            <motion.button
                                whileHover={{ scale: 1.02, background: "#000" }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleBooking}
                                disabled={isBooking}
                                style={{
                                    width: "100%",
                                    padding: "16px",
                                    borderRadius: "14px",
                                    background: "#0E0E0E",
                                    color: "#fff",
                                    fontWeight: 700,
                                    fontSize: "14px",
                                    border: "none",
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: "8px"
                                }}
                            >
                                {isBooking ? (
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                    >
                                        <Sparkles size={18} />
                                    </motion.div>
                                ) : (
                                    <>
                                        Confirm Booking
                                        <ArrowRight size={18} />
                                    </>
                                )}
                            </motion.button>
                        </div>
                    </motion.div>
                )}

                {view === "success" && (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "350px", textAlign: "center" }}
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", damping: 12 }}
                            style={{ width: "64px", height: "64px", borderRadius: "50%", background: "#22c55e", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}
                        >
                            <CheckCircle2 size={32} color="#fff" />
                        </motion.div>
                        <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#0E0E0E", marginBottom: "12px" }}>You&apos;re all set!</h3>
                        <p style={{ fontSize: "14px", color: "#666", maxWidth: "240px", lineHeight: "1.6" }}>
                            Check your inbox for the calendar invite and meeting link.
                        </p>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            onClick={reset}
                            style={{ marginTop: "24px", color: "#999", border: "none", background: "transparent", fontSize: "12px", fontWeight: 600, cursor: "pointer", textDecoration: "underline" }}
                        >
                            Make another booking
                        </motion.button>

                        <motion.button
                            onClick={reset}
                            style={{
                                position: "absolute", top: "16px", right: "16px", padding: "8px", borderRadius: "50%", background: "#f0f0f0", border: "none", cursor: "pointer"
                            }}
                        >
                            <X size={16} color="#666" />
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
