"use client";

import React, { useState, useEffect } from "react";
import {
  Activity,
  Server,
  Zap,
  Play,
  Pause,
  Terminal,
  Radio,
  TrendingUp,
} from "lucide-react";

type LogEntry = {
  id: string;
  timestamp: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  path: string;
  status: number;
  durationMs: number;
  traceId: string;
};

const INITIAL_LOGS: LogEntry[] = [
  {
    id: "1",
    timestamp: "12:04:18.421",
    method: "POST",
    path: "/api/v1/jobs/schedule",
    status: 201,
    durationMs: 14.2,
    traceId: "tr-9a1f2b",
  },
  {
    id: "2",
    timestamp: "12:04:18.110",
    method: "GET",
    path: "/api/v1/analytics/telemetry",
    status: 200,
    durationMs: 3.8,
    traceId: "tr-7c4e8d",
  },
  {
    id: "3",
    timestamp: "12:04:17.892",
    method: "POST",
    path: "/api/v1/ai/grounded-chat",
    status: 200,
    durationMs: 142.6,
    traceId: "tr-3b6a9c",
  },
  {
    id: "4",
    timestamp: "12:04:17.514",
    method: "GET",
    path: "/api/v1/domains/50/status",
    status: 200,
    durationMs: 8.1,
    traceId: "tr-1d8f4e",
  },
  {
    id: "5",
    timestamp: "12:04:17.102",
    method: "POST",
    path: "/api/v1/queue/bulk-add",
    status: 200,
    durationMs: 22.4,
    traceId: "tr-5e2c7a",
  },
];

const AVAILABLE_PATHS = [
  { method: "POST" as const, path: "/api/v1/jobs/schedule", baseMs: 12 },
  { method: "GET" as const, path: "/api/v1/analytics/telemetry", baseMs: 4 },
  { method: "POST" as const, path: "/api/v1/ai/grounded-chat", baseMs: 135 },
  { method: "GET" as const, path: "/api/v1/domains/50/status", baseMs: 7 },
  { method: "POST" as const, path: "/api/v1/queue/bulk-add", baseMs: 24 },
  { method: "GET" as const, path: "/api/v1/redis/ratelimit", baseMs: 1.2 },
];

export function BackendTelemetrySection() {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isSpikeActive, setIsSpikeActive] = useState<boolean>(false);

  // Real-time metric states
  const [rps, setRps] = useState<number>(2450);
  const [latencyP50, setLatencyP50] = useState<number>(18);
  const [latencyP95, setLatencyP95] = useState<number>(44);
  const [latencyP99, setLatencyP99] = useState<number>(118);
  const [cacheHitRatio, setCacheHitRatio] = useState<number>(94.6);
  const [logs, setLogs] = useState<LogEntry[]>(INITIAL_LOGS);

  // 24-point sparkline historical data for throughput and latency
  const [rpsHistory, setRpsHistory] = useState<number[]>([
    2200, 2300, 2400, 2450, 2380, 2510, 2480, 2520, 2400, 2490, 2450, 2530,
    2480, 2460, 2510, 2490, 2530, 2480, 2450, 2520, 2490, 2530, 2480, 2450,
  ]);

  const [latencyHistory, setLatencyHistory] = useState<number[]>([
    42, 44, 41, 45, 43, 46, 44, 42, 45, 43, 44, 46, 42, 43, 45, 44, 43, 45,
    44, 42, 43, 45, 44, 44,
  ]);

  // Live simulation tick
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      const spikeMultiplier = isSpikeActive ? 3.8 : 1.0;
      const targetRps = Math.round(
        (2400 + Math.sin(Date.now() / 2500) * 220) * spikeMultiplier
      );
      const targetP50 = Math.round(16 + Math.random() * 4);
      const targetP95 = Math.round(
        (40 + Math.random() * 8) * (isSpikeActive ? 1.4 : 1.0)
      );
      const targetP99 = Math.round(
        (110 + Math.random() * 16) * (isSpikeActive ? 1.6 : 1.0)
      );

      setRps(targetRps);
      setLatencyP50(targetP50);
      setLatencyP95(targetP95);
      setLatencyP99(targetP99);
      setCacheHitRatio(
        Number((94.2 + Math.sin(Date.now() / 5000) * 0.8).toFixed(1))
      );

      // Shift graph histories
      setRpsHistory((prev) => [...prev.slice(1), targetRps]);
      setLatencyHistory((prev) => [...prev.slice(1), targetP95]);

      // Generate new log
      const randomPathObj =
        AVAILABLE_PATHS[Math.floor(Math.random() * AVAILABLE_PATHS.length)];
      const now = new Date();
      const timeStr = `${now.toTimeString().split(" ")[0]}.${Math.floor(
        now.getMilliseconds()
      )
        .toString()
        .padStart(3, "0")}`;

      const newLog: LogEntry = {
        id: Math.random().toString(36).substring(2, 9),
        timestamp: timeStr,
        method: randomPathObj.method,
        path: randomPathObj.path,
        status: isSpikeActive && Math.random() > 0.9 ? 429 : 200,
        durationMs: Number(
          (
            randomPathObj.baseMs +
            (Math.random() * 4 - 2) * (isSpikeActive ? 2 : 1)
          ).toFixed(1)
        ),
        traceId: `tr-${Math.random().toString(36).substring(2, 8)}`,
      };

      setLogs((prev) => [newLog, ...prev.slice(0, 5)]);
    }, 1200);

    return () => clearInterval(interval);
  }, [isPlaying, isSpikeActive]);

  // SVG Graph Coordinate Generators
  const generateSvgPath = (data: number[], height: number, width: number) => {
    if (data.length < 2) return "";
    const min = Math.min(...data) * 0.9;
    const max = Math.max(...data) * 1.1 || 1;
    const stepX = width / (data.length - 1);

    const points = data.map((val, idx) => {
      const x = idx * stepX;
      const y = height - ((val - min) / (max - min)) * (height - 16) - 8;
      return `${x},${y}`;
    });

    return `M ${points.join(" L ")}`;
  };

  const generateSvgArea = (data: number[], height: number, width: number) => {
    const linePath = generateSvgPath(data, height, width);
    if (!linePath) return "";
    return `${linePath} L ${width},${height} L 0comma${height} Z`.replace(
      "0comma",
      "0,"
    );
  };

  return (
    <section
      id="telemetry"
      aria-label="Live Backend Observatory & Telemetry"
      className="relative z-20 w-full border-t border-slate-200 bg-white px-4 py-24 text-slate-900 sm:px-6 lg:px-8 scroll-mt-16"
    >
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="mb-12 flex flex-col items-start justify-between gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-700 shadow-2xs">
              <Activity className="h-3.5 w-3.5 text-emerald-600 animate-pulse" />
              <span>Systems Telemetry &amp; Observatory</span>
            </div>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Live Backend Performance
            </h2>
            <p className="mt-1 max-w-2xl text-sm text-slate-600">
              Real-time telemetry stream simulator ready for direct hookup to Go
              microservices and AWS cloud metrics.
            </p>
          </div>

          {/* Interactive Simulation Controls */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setIsSpikeActive(!isSpikeActive)}
              className={`flex items-center gap-1.5 rounded-xl border px-3.5 py-2 text-xs font-semibold shadow-2xs transition-all duration-200 ${
                isSpikeActive
                  ? "border-amber-400 bg-amber-50 text-amber-800"
                  : "border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 hover:bg-slate-100"
              }`}
            >
              <Zap
                className={`h-3.5 w-3.5 ${
                  isSpikeActive ? "text-amber-600 fill-amber-500" : "text-slate-400"
                }`}
              />
              <span>{isSpikeActive ? "Spike Active (10K RPS)" : "Simulate Traffic Spike"}</span>
            </button>

            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-2xs transition-all hover:bg-slate-100"
            >
              {isPlaying ? (
                <>
                  <Pause className="h-3.5 w-3.5 text-slate-500" />
                  <span>Pause Stream</span>
                </>
              ) : (
                <>
                  <Play className="h-3.5 w-3.5 text-emerald-600 fill-emerald-500" />
                  <span>Resume</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* TOP KPI COUNTER ROW (4 High-Impact Metrics) */}
        {/* ========================================================= */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {/* RPS Counter */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-5 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">
                Throughput
              </span>
              <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 font-mono">
                <Radio className="h-3 w-3 animate-ping" />
                Live
              </span>
            </div>
            <div className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 font-mono">
              {rps.toLocaleString()}{" "}
              <span className="text-sm font-semibold text-slate-500 font-sans">
                req/s
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-500">
              Distributed ingestion rate
            </p>
          </div>

          {/* P95 Latency */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-5 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">
                P95 Latency
              </span>
              <span className="rounded-md bg-slate-200/70 px-1.5 py-0.5 text-[10px] font-bold text-slate-700 font-mono">
                Sub-50ms Target
              </span>
            </div>
            <div className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 font-mono">
              {latencyP95}{" "}
              <span className="text-sm font-semibold text-slate-500 font-sans">
                ms
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-500">
              P50: {latencyP50}ms · P99: {latencyP99}ms
            </p>
          </div>

          {/* Cache Hit Ratio */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-5 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">
                Redis L1/L2 Cache
              </span>
              <span className="text-[11px] font-bold text-blue-600 font-mono">
                O(1) Hits
              </span>
            </div>
            <div className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 font-mono">
              {cacheHitRatio}%
            </div>
            <p className="mt-1 text-xs text-slate-500">
              Token-bucket rate limiter hits
            </p>
          </div>

          {/* Error Rate */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-5 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">
                Success Rate
              </span>
              <span className="text-[11px] font-bold text-emerald-600 font-mono">
                HTTP 2xx
              </span>
            </div>
            <div className="mt-2 text-3xl font-extrabold tracking-tight text-emerald-700 font-mono">
              99.98%
            </div>
            <p className="mt-1 text-xs text-slate-500">
              Zero unhandled 5xx exceptions
            </p>
          </div>
        </div>

        {/* ========================================================= */}
        {/* REAL-TIME CHARTS (Latency Curve & Throughput Curve) */}
        {/* ========================================================= */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Chart 1: Throughput Curve (RPS) */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-blue-600" />
                <h4 className="text-sm font-bold text-slate-900">
                  Throughput Velocity (req/s)
                </h4>
              </div>
              <span className="text-xs font-mono font-semibold text-blue-600">
                {rps} req/s
              </span>
            </div>

            {/* SVG Live Area Sparkline */}
            <div className="relative mt-4 h-40 w-full overflow-hidden rounded-xl bg-slate-50 p-2">
              <svg
                viewBox="0 0 400 120"
                className="h-full w-full overflow-visible"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient
                    id="rpsGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#2563eb" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#2563eb" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path
                  d={generateSvgArea(rpsHistory, 120, 400)}
                  fill="url(#rpsGradient)"
                />
                <path
                  d={generateSvgPath(rpsHistory, 120, 400)}
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div className="mt-3 flex items-center justify-between text-xs text-slate-500 font-mono">
              <span>-30s</span>
              <span>-15s</span>
              <span className="font-semibold text-slate-900">Now</span>
            </div>
          </div>

          {/* Chart 2: P95 Latency Curve */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-emerald-600" />
                <h4 className="text-sm font-bold text-slate-900">
                  P95 Latency Profile (ms)
                </h4>
              </div>
              <span className="text-xs font-mono font-semibold text-emerald-700">
                {latencyP95} ms
              </span>
            </div>

            {/* SVG Live Area Sparkline */}
            <div className="relative mt-4 h-40 w-full overflow-hidden rounded-xl bg-slate-50 p-2">
              <svg
                viewBox="0 0 400 120"
                className="h-full w-full overflow-visible"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient
                    id="latencyGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#059669" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#059669" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path
                  d={generateSvgArea(latencyHistory, 120, 400)}
                  fill="url(#latencyGradient)"
                />
                <path
                  d={generateSvgPath(latencyHistory, 120, 400)}
                  fill="none"
                  stroke="#059669"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div className="mt-3 flex items-center justify-between text-xs text-slate-500 font-mono">
              <span>-30s</span>
              <span>-15s</span>
              <span className="font-semibold text-slate-900">Now</span>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* BOTTOM ROW: Microservices Health & Real-time Request Stream */}
        {/* ========================================================= */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Microservices Topology & Node Latencies (5 Cols) */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h4 className="flex items-center gap-2 text-sm font-bold text-slate-900">
                <Server className="h-4 w-4 text-slate-500" />
                <span>Service Mesh Health</span>
              </h4>
              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700 border border-emerald-200">
                5 Nodes Healthy
              </span>
            </div>

            <div className="mt-4 divide-y divide-slate-100">
              {[
                { name: "Go API Gateway", type: "Edge Ingress", latency: "4ms", status: "Operational" },
                { name: "Redis Cache Cluster", type: "Token Bucket L1/L2", latency: "1.2ms", status: "Operational" },
                { name: "BullMQ Distributed Workers", type: "64 Concurrency", latency: "14ms", status: "Operational" },
                { name: "PostgreSQL State Engine", type: "UNNEST Batch Store", latency: "18ms", status: "Operational" },
                { name: "AI RAG Vector Engine", type: "SQLite-vec / Embeddings", latency: "142ms", status: "Operational" },
              ].map((svc) => (
                <div
                  key={svc.name}
                  className="flex items-center justify-between py-3 text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    <div>
                      <div className="font-semibold text-slate-900">
                        {svc.name}
                      </div>
                      <div className="text-[10px] text-slate-500">
                        {svc.type}
                      </div>
                    </div>
                  </div>
                  <span className="rounded-md bg-slate-100 px-2 py-1 font-mono font-medium text-slate-700">
                    {svc.latency}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Real-time Distributed Request Trace Stream (7 Cols) */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-7">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <Terminal className="h-4 w-4 text-slate-500" />
                <h4 className="text-sm font-bold text-slate-900">
                  Live Request Stream &amp; Traces
                </h4>
              </div>
              <span className="text-[11px] font-mono text-slate-500">
                SSE Stream Active
              </span>
            </div>

            {/* Trace Table */}
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-slate-100 text-[10px] uppercase tracking-wider text-slate-400">
                    <th className="pb-2">Time</th>
                    <th className="pb-2">Method</th>
                    <th className="pb-2">Path</th>
                    <th className="pb-2">Status</th>
                    <th className="pb-2 text-right">Latency</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {logs.map((log) => (
                    <tr
                      key={log.id}
                      className="transition-colors hover:bg-slate-50"
                    >
                      <td className="py-2.5 text-slate-500">{log.timestamp}</td>
                      <td className="py-2.5">
                        <span
                          className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${
                            log.method === "POST"
                              ? "bg-blue-50 text-blue-700"
                              : "bg-emerald-50 text-emerald-700"
                          }`}
                        >
                          {log.method}
                        </span>
                      </td>
                      <td className="py-2.5 font-sans font-medium text-slate-800 truncate max-w-[180px]">
                        {log.path}
                      </td>
                      <td className="py-2.5">
                        <span
                          className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${
                            log.status === 429
                              ? "bg-amber-100 text-amber-800"
                              : "bg-emerald-100 text-emerald-800"
                          }`}
                        >
                          {log.status}
                        </span>
                      </td>
                      <td className="py-2.5 text-right text-slate-900 font-bold">
                        {log.durationMs}ms
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BackendTelemetrySection;
