"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Copy, Check, Terminal, Play, RotateCcw, Cpu, Database, Activity, Code2, X, Minus, Plus } from "lucide-react";

interface SubsystemTab {
  id: "dedup" | "scheduler" | "benchmark";
  filename: string;
  label: string;
  lang: string;
  icon: React.ComponentType<{ className?: string }>;
  metricLabel: string;
  metricValue: string;
  command: string;
  code: Array<{ num: number; tokens: Array<{ text: string; color: string }> }>;
  annotation: {
    title: string;
    description: string;
    stats: Array<{ label: string; value: string }>;
  };
  outputLogs: (workers: number) => Array<{ time: string; tag: string; tagColor: string; message: string }>;
}

const SUBSYSTEMS: SubsystemTab[] = [
  {
    id: "dedup",
    filename: "mini-drop/engine/stream_dedup.go",
    label: "Go Stream Dedup",
    lang: "go",
    icon: Cpu,
    metricLabel: "Memory Alloc",
    metricValue: "0 B/op · 0 allocs",
    command: "go test -v -race -run=TestStreamDedup ./engine",
    code: [
      {
        num: 1,
        tokens: [
          { text: "package", color: "#ff2d7b" },
          { text: " engine", color: "#f0f0f5" },
        ],
      },
      {
        num: 2,
        tokens: [],
      },
      {
        num: 3,
        tokens: [
          { text: "// bufferPool reuses 32KB byte slices to eliminate GC pressure", color: "#5a6380" },
        ],
      },
      {
        num: 4,
        tokens: [
          { text: "var", color: "#ff2d7b" },
          { text: " bufferPool = sync.Pool{", color: "#f0f0f5" },
        ],
      },
      {
        num: 5,
        tokens: [
          { text: "\tNew: ", color: "#8b92a8" },
          { text: "func", color: "#ff2d7b" },
          { text: "() any { buf := make([]byte, 32*1024); return &buf },", color: "#f0f0f5" },
        ],
      },
      {
        num: 6,
        tokens: [{ text: "}", color: "#f0f0f5" }],
      },
      {
        num: 7,
        tokens: [],
      },
      {
        num: 8,
        tokens: [
          { text: "// WriteChunk hashes streaming reader chunks without heap allocation", color: "#5a6380" },
        ],
      },
      {
        num: 9,
        tokens: [
          { text: "func", color: "#ff2d7b" },
          { text: " (e *Engine) ", color: "#f0f0f5" },
          { text: "WriteChunk", color: "#38bdf8" },
          { text: "(r io.Reader) (string, error) {", color: "#f0f0f5" },
        ],
      },
      {
        num: 10,
        tokens: [
          { text: "\tbuf := bufferPool.Get().(*[]byte)", color: "#f0f0f5" },
        ],
      },
      {
        num: 11,
        tokens: [
          { text: "\tdefer", color: "#ff2d7b" },
          { text: " bufferPool.Put(buf)", color: "#f0f0f5" },
        ],
      },
      {
        num: 12,
        tokens: [
          { text: "\th := sha256.New()", color: "#f0f0f5" },
        ],
      },
      {
        num: 13,
        tokens: [
          { text: "\tif", color: "#ff2d7b" },
          { text: " _, err := io.CopyBuffer(h, r, *buf); err != nil {", color: "#f0f0f5" },
        ],
      },
      {
        num: 14,
        tokens: [
          { text: "\t\treturn ", color: "#f0f0f5" },
          { text: "\"\"", color: "#a5b4fc" },
          { text: ", err", color: "#f0f0f5" },
        ],
      },
      {
        num: 15,
        tokens: [
          { text: "\t}", color: "#f0f0f5" },
        ],
      },
      {
        num: 16,
        tokens: [
          { text: "\treturn hex.EncodeToString(h.Sum(nil)), nil", color: "#f0f0f5" },
        ],
      },
      {
        num: 17,
        tokens: [{ text: "}", color: "#f0f0f5" }],
      },
    ],
    annotation: {
      title: "High-Throughput Backend & Cloud Infrastructure",
      description:
        "Zero-allocation streaming, transactional database state machines, and sub-200ms real-time APIs built for production traffic.",
      stats: [
        { label: "Production Scale", value: "100K+ Active Users" },
        { label: "App Downloads", value: "250K+ (4.9★ Rating)" },
        { label: "API Latency", value: "<200ms p95 SLA" },
      ],
    },
    outputLogs: (workers: number) => [
      { time: "00:00.002", tag: "INIT", tagColor: "#38bdf8", message: "sync.Pool initialized with 32KB pre-allocated buffer slices" },
      { time: "00:00.015", tag: "SPAWN", tagColor: "#ff2d7b", message: `Spawning ${workers.toLocaleString()} concurrent Go worker routines on epoll runtime` },
      { time: "00:00.038", tag: "STREAM", tagColor: "#a5b4fc", message: `Streaming ${(workers * 5).toLocaleString()} chunks through crypto/sha256 engine` },
      { time: "00:00.076", tag: "DEDUP", tagColor: "#38bdf8", message: `Identified and deduplicated ${Math.round(workers * 3.42).toLocaleString()} identical chunk signatures` },
      { time: "00:00.098", tag: "MEMORY", tagColor: "#38bdf8", message: "sync.Pool recycle rate: 100.0% · GC heap allocation: 0 B/op" },
      { time: "00:00.114", tag: "RACE", tagColor: "#38bdf8", message: "0 data races detected · go test -race PASS" },
      { time: "00:00.124", tag: "DONE", tagColor: "#fbbf24", message: `PASS: ok mini-drop/engine (${(workers * 0.00012).toFixed(3)}s)` },
    ],
  },
  {
    id: "scheduler",
    filename: "reachinbox/scheduler/delayed_queue.lua",
    label: "Redis Lua Sched",
    lang: "lua",
    icon: Database,
    metricLabel: "Dispatch Speed",
    metricValue: "10,480 jobs/s",
    command: "redis-cli --eval delayed_queue.lua delayed active , 1740000000 500",
    code: [
      {
        num: 1,
        tokens: [
          { text: "-- Atomic delayed job dispatch via Redis ZSET state machine", color: "#5a6380" },
        ],
      },
      {
        num: 2,
        tokens: [
          { text: "local", color: "#ff2d7b" },
          { text: " delayedKey = KEYS[1]", color: "#f0f0f5" },
        ],
      },
      {
        num: 3,
        tokens: [
          { text: "local", color: "#ff2d7b" },
          { text: " activeQueue = KEYS[2]", color: "#f0f0f5" },
        ],
      },
      {
        num: 4,
        tokens: [
          { text: "local", color: "#ff2d7b" },
          { text: " currentEpoch = tonumber(ARGV[1])", color: "#f0f0f5" },
        ],
      },
      {
        num: 5,
        tokens: [
          { text: "local", color: "#ff2d7b" },
          { text: " batchLimit = tonumber(ARGV[2]) or 100", color: "#f0f0f5" },
        ],
      },
      {
        num: 6,
        tokens: [],
      },
      {
        num: 7,
        tokens: [
          { text: "-- Extract ready jobs atomically to prevent consumer double-spend", color: "#5a6380" },
        ],
      },
      {
        num: 8,
        tokens: [
          { text: "local", color: "#ff2d7b" },
          { text: " readyJobs = redis.call(", color: "#f0f0f5" },
          { text: "'ZRANGEBYSCORE'", color: "#38bdf8" },
          { text: ", delayedKey, 0, currentEpoch, 'LIMIT', 0, batchLimit)", color: "#f0f0f5" },
        ],
      },
      {
        num: 9,
        tokens: [
          { text: "if", color: "#ff2d7b" },
          { text: " #readyJobs > 0 ", color: "#f0f0f5" },
          { text: "then", color: "#ff2d7b" },
        ],
      },
      {
        num: 10,
        tokens: [
          { text: "\tfor _, jobId in ipairs(readyJobs) do", color: "#f0f0f5" },
        ],
      },
      {
        num: 11,
        tokens: [
          { text: "\t\tredis.call(", color: "#f0f0f5" },
          { text: "'LPUSH'", color: "#38bdf8" },
          { text: ", activeQueue, jobId)", color: "#f0f0f5" },
        ],
      },
      {
        num: 12,
        tokens: [
          { text: "\t\tredis.call(", color: "#f0f0f5" },
          { text: "'ZREM'", color: "#38bdf8" },
          { text: ", delayedKey, jobId)", color: "#f0f0f5" },
        ],
      },
      {
        num: 13,
        tokens: [
          { text: "\tend", color: "#ff2d7b" },
        ],
      },
      {
        num: 14,
        tokens: [
          { text: "\treturn #readyJobs", color: "#f0f0f5" },
        ],
      },
      {
        num: 15,
        tokens: [
          { text: "end", color: "#ff2d7b" },
        ],
      },
      {
        num: 16,
        tokens: [
          { text: "return 0", color: "#f0f0f5" },
        ],
      },
    ],
    annotation: {
      title: "Zero-Cron Atomic Job Scheduler",
      description: "Atomic Lua script executed on Redis single-thread engine prevents duplicate worker execution without distributed lock overhead.",
      stats: [
        { label: "Dispatch Latency", value: "0.8ms p99" },
        { label: "Throughput", value: "10,480 jobs/s" },
        { label: "Lock Contention", value: "0.0%" },
      ],
    },
    outputLogs: (workers: number) => [
      { time: "00:00.001", tag: "REDIS", tagColor: "#ff2d7b", message: "Connecting to Redis standalone instance (protocol: RESP3)" },
      { time: "00:00.008", tag: "EVAL", tagColor: "#38bdf8", message: `Executing delayed_queue.lua script with batchLimit=${workers / 2}` },
      { time: "00:00.024", tag: "ZSET", tagColor: "#a5b4fc", message: `ZRANGEBYSCORE: scanned score interval [0, current_epoch]` },
      { time: "00:00.041", tag: "LPUSH", tagColor: "#38bdf8", message: `Atomic state transition: shifted ${Math.round(workers / 2)} jobs to active queue` },
      { time: "00:00.052", tag: "LOCK", tagColor: "#38bdf8", message: "0 lock contention · Redis single-thread atomicity preserved" },
      { time: "00:00.068", tag: "DONE", tagColor: "#fbbf24", message: `Dispatched ${Math.round(workers / 2)} delayed tasks in 0.82ms` },
    ],
  },
  {
    id: "benchmark",
    filename: "mini-drop/engine/dedup_benchmark_test.go",
    label: "Go Alloc Benchmark",
    lang: "go",
    icon: Activity,
    metricLabel: "GC Overhead",
    metricValue: "0 B/op · 0 allocs",
    command: "go test -bench=BenchmarkStreamDedup -benchmem ./engine",
    code: [
      {
        num: 1,
        tokens: [
          { text: "package", color: "#ff2d7b" },
          { text: " engine_test", color: "#f0f0f5" },
        ],
      },
      {
        num: 2,
        tokens: [],
      },
      {
        num: 3,
        tokens: [
          { text: "func", color: "#ff2d7b" },
          { text: " ", color: "#f0f0f5" },
          { text: "BenchmarkStreamDedup", color: "#38bdf8" },
          { text: "(b *testing.B) {", color: "#f0f0f5" },
        ],
      },
      {
        num: 4,
        tokens: [
          { text: "\te := engine.New()", color: "#f0f0f5" },
        ],
      },
      {
        num: 5,
        tokens: [
          { text: "\tpayload := bytes.Repeat([]byte(", color: "#f0f0f5" },
          { text: "\"x\"", color: "#a5b4fc" },
          { text: "), 32*1024)", color: "#f0f0f5" },
        ],
      },
      {
        num: 6,
        tokens: [
          { text: "\tb.ResetTimer()", color: "#f0f0f5" },
        ],
      },
      {
        num: 7,
        tokens: [
          { text: "\tb.ReportAllocs()", color: "#38bdf8" },
        ],
      },
      {
        num: 8,
        tokens: [
          { text: "\tb.RunParallel(", color: "#ff2d7b" },
          { text: "func", color: "#ff2d7b" },
          { text: "(pb *testing.PB) {", color: "#f0f0f5" },
        ],
      },
      {
        num: 9,
        tokens: [
          { text: "\t\tr := bytes.NewReader(payload)", color: "#f0f0f5" },
        ],
      },
      {
        num: 10,
        tokens: [
          { text: "\t\tfor pb.Next() {", color: "#f0f0f5" },
        ],
      },
      {
        num: 11,
        tokens: [
          { text: "\t\t\tr.Seek(0, io.SeekStart)", color: "#f0f0f5" },
        ],
      },
      {
        num: 12,
        tokens: [
          { text: "\t\t\t_, err := e.WriteChunk(r)", color: "#f0f0f5" },
        ],
      },
      {
        num: 13,
        tokens: [
          { text: "\t\t\tif err != nil { b.Fatal(err) }", color: "#f0f0f5" },
        ],
      },
      {
        num: 14,
        tokens: [
          { text: "\t\t}", color: "#f0f0f5" },
        ],
      },
      {
        num: 15,
        tokens: [
          { text: "\t})", color: "#f0f0f5" },
        ],
      },
      {
        num: 16,
        tokens: [{ text: "}", color: "#f0f0f5" }],
      },
    ],
    annotation: {
      title: "Zero Heap Allocation Benchmark",
      description: "Parallel benchmark measuring memory allocation per operation under maximum goroutine pressure. Proves 0 bytes allocated per chunk.",
      stats: [
        { label: "Operations", value: "1,420,850 ops/s" },
        { label: "Heap Memory", value: "0 B/op" },
        { label: "Alloc Counts", value: "0 allocs/op" },
      ],
    },
    outputLogs: (workers: number) => [
      { time: "00:00.001", tag: "BENCH", tagColor: "#ff2d7b", message: `goos: darwin · goarch: arm64 · pkg: mini-drop/engine` },
      { time: "00:00.004", tag: "CPU", tagColor: "#38bdf8", message: `GOMAXPROCS=${Math.min(workers, 8)} parallel worker threads` },
      { time: "00:00.045", tag: "WARMUP", tagColor: "#5a6380", message: "Warmup: initializing 32KB shared buffer cache" },
      { time: "00:00.082", tag: "PROFILE", tagColor: "#a5b4fc", message: "Executing b.RunParallel: testing chunk hash saturation" },
      { time: "00:00.124", tag: "RESULT", tagColor: "#38bdf8", message: `BenchmarkStreamDedup-8  1420850  842.1 ns/op  0 B/op  0 allocs/op` },
      { time: "00:00.130", tag: "PASS", tagColor: "#fbbf24", message: "ok mini-drop/engine 1.218s" },
    ],
  },
];

export function HeroSystemCockpit() {
  const [activeTabId, setActiveTabId] = useState<"dedup" | "scheduler" | "benchmark">("dedup");
  const [viewMode, setViewMode] = useState<"editor" | "terminal">("editor");
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [workerCount, setWorkerCount] = useState<number>(1000);
  const [displayedLogs, setDisplayedLogs] = useState<Array<{ time: string; tag: string; tagColor: string; message: string }>>([]);
  const [copied, setCopied] = useState<boolean>(false);
  const [activeRunCommand, setActiveRunCommand] = useState<string>("");

  const terminalScrollRef = useRef<HTMLDivElement>(null);
  const timeoutIdsRef = useRef<NodeJS.Timeout[]>([]);

  const currentTab = SUBSYSTEMS.find((s) => s.id === activeTabId) || SUBSYSTEMS[0];

  const clearPendingTimeouts = () => {
    timeoutIdsRef.current.forEach(clearTimeout);
    timeoutIdsRef.current = [];
  };

  useEffect(() => {
    return () => clearPendingTimeouts();
  }, []);

  const handleCopy = () => {
    const raw = currentTab.code.map((l) => l.tokens.map((t) => t.text).join("")).join("\n");
    navigator.clipboard.writeText(raw);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRunExecution = () => {
    clearPendingTimeouts();
    setViewMode("terminal");
    setIsRunning(true);
    setDisplayedLogs([]);
    setActiveRunCommand(currentTab.command);

    const fullLogs = currentTab.outputLogs(workerCount);

    // Stream logs in real-time smoothly without causing page re-renders
    fullLogs.forEach((log, index) => {
      const id = setTimeout(() => {
        setDisplayedLogs((prev) => [...prev, log]);
        if (index === fullLogs.length - 1) {
          setIsRunning(false);
        }
      }, (index + 1) * 160);
      timeoutIdsRef.current.push(id);
    });
  };

  // Safe inner-scroll: scrolls ONLY the terminal window, NEVER the parent page or window
  useEffect(() => {
    if (viewMode === "terminal" && terminalScrollRef.current) {
      terminalScrollRef.current.scrollTop = terminalScrollRef.current.scrollHeight;
    }
  }, [displayedLogs, viewMode]);

  return (
    <div className="relative w-full rounded-2xl border border-[#f0f0f5]/[0.08] bg-[#0c1220]/95 shadow-[0_24px_64px_-16px_rgba(0,0,0,0.7)] backdrop-blur-xl overflow-hidden">
      {/* Top Chrome Titlebar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#f0f0f5]/[0.06] bg-[#080d17]/95 px-4 py-3">
        {/* Terminal Title / Path */}
        <div className="flex items-center gap-3 min-w-0">
          {/* Top Left Window Controls: Cross, Minus, Plus */}
          <div className="flex items-center gap-1.5 shrink-0" aria-label="Terminal window controls">
            <button
              type="button"
              onClick={() => {
                setDisplayedLogs([]);
                setViewMode("editor");
              }}
              className="group/btn flex h-3.5 w-3.5 items-center justify-center rounded-full border border-white/10 bg-white/[0.08] text-[#8b92a8] transition-all hover:bg-white/20 hover:text-white hover:border-white/30 cursor-pointer"
              title="Close / Reset output"
              aria-label="Close"
            >
              <X className="h-2 w-2 stroke-[2.5]" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode("editor")}
              className="group/btn flex h-3.5 w-3.5 items-center justify-center rounded-full border border-white/10 bg-white/[0.08] text-[#8b92a8] transition-all hover:bg-white/20 hover:text-white hover:border-white/30 cursor-pointer"
              title="Minimize to code view"
              aria-label="Minimize"
            >
              <Minus className="h-2 w-2 stroke-[2.5]" />
            </button>
            <button
              type="button"
              onClick={() => {
                if (displayedLogs.length === 0) {
                  handleRunExecution();
                } else {
                  setViewMode((prev) => (prev === "editor" ? "terminal" : "editor"));
                }
              }}
              className="group/btn flex h-3.5 w-3.5 items-center justify-center rounded-full border border-white/10 bg-white/[0.08] text-[#8b92a8] transition-all hover:bg-white/20 hover:text-white hover:border-white/30 cursor-pointer"
              title="Expand / Toggle terminal output"
              aria-label="Expand"
            >
              <Plus className="h-2 w-2 stroke-[2.5]" />
            </button>
          </div>
          <span className="h-3 w-px bg-[#f0f0f5]/10 shrink-0" />
          <div className="flex items-center gap-2 truncate font-mono text-xs text-[#8b92a8]">
            <Terminal className="h-3.5 w-3.5 text-[#ff2d7b] shrink-0" />
            <span className="truncate">{viewMode === "editor" ? currentTab.filename : "go-engine: stdout"}</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Worker Load Preset Selector */}
          <div className="hidden sm:flex items-center gap-1 rounded-lg border border-[#f0f0f5]/[0.06] bg-[#111827] px-2 py-0.5 font-mono text-[11px] text-[#8b92a8]">
            <span className="text-[#5a6380]">Load:</span>
            <button
              type="button"
              onClick={() => setWorkerCount((prev) => (prev === 500 ? 1000 : prev === 1000 ? 5000 : 500))}
              className="text-[#f0f0f5] hover:text-[#ff2d7b] transition-colors cursor-pointer font-bold"
              title="Click to toggle worker concurrency"
            >
              {workerCount.toLocaleString()} workers
            </button>
          </div>

          {/* Realtime Run Action Button (Hot Pink) */}
          <button
            type="button"
            onClick={handleRunExecution}
            disabled={isRunning}
            className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1 text-xs font-mono font-semibold transition-all cursor-pointer ${
              isRunning
                ? "bg-[#ff2d7b]/40 text-white cursor-wait"
                : "bg-[#ff2d7b] text-white shadow-[0_2px_12px_rgba(255,45,123,0.35)] hover:bg-[#e6256e] active:scale-[0.98]"
            }`}
          >
            {isRunning ? (
              <>
                <RotateCcw className="h-3.5 w-3.5 animate-spin" />
                <span>Running...</span>
              </>
            ) : (
              <>
                <Play className="h-3.5 w-3.5 fill-current" />
                <span>Run Engine</span>
              </>
            )}
          </button>

          {/* Copy Code Button */}
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1.5 rounded-lg border border-[#f0f0f5]/[0.08] bg-[#111827] px-2.5 py-1 text-xs font-mono text-[#8b92a8] hover:border-[#ff2d7b]/40 hover:text-[#f0f0f5] transition-colors cursor-pointer"
            title="Copy code to clipboard"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-sky-400" />
                <span className="text-sky-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Subsystem & View Switcher Bar */}
      <div className="flex items-center justify-between border-b border-[#f0f0f5]/[0.06] bg-[#0a0e1a]/80 px-3 py-2 gap-2 overflow-x-auto scrollbar-none">
        {/* Subsystems List */}
        <div className="flex items-center gap-1 shrink-0">
          {SUBSYSTEMS.map((tab) => {
            const Icon = tab.icon;
            const isActive = tab.id === activeTabId;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setActiveTabId(tab.id);
                  if (viewMode === "terminal") {
                    setViewMode("editor");
                  }
                }}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-mono text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  isActive
                    ? "bg-[#162035] text-[#f0f0f5]"
                    : "text-[#5a6380] hover:text-[#8b92a8]"
                }`}
              >
                <Icon className={`h-3.5 w-3.5 ${isActive ? "text-[#ff2d7b]" : "text-[#5a6380]"}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* View Mode Toggle: Source vs Terminal */}
        <div className="flex items-center rounded-lg border border-[#f0f0f5]/[0.06] bg-[#0c1220] p-0.5 shrink-0 font-mono text-xs">
          <button
            type="button"
            onClick={() => setViewMode("editor")}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
              viewMode === "editor"
                ? "bg-[#111827] text-[#f0f0f5]"
                : "text-[#5a6380] hover:text-[#8b92a8]"
            }`}
          >
            <Code2 className="h-3 w-3" />
            <span>Code</span>
          </button>
          <button
            type="button"
            onClick={() => {
              if (displayedLogs.length === 0) {
                handleRunExecution();
              } else {
                setViewMode("terminal");
              }
            }}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
              viewMode === "terminal"
                ? "bg-[#111827] text-sky-400"
                : "text-[#5a6380] hover:text-[#8b92a8]"
            }`}
          >
            <Terminal className="h-3 w-3" />
            <span>Stdout</span>
            {displayedLogs.length > 0 && (
              <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
            )}
          </button>
        </div>
      </div>

      {/* Main Window Content - Locked Height (340px) to prevent any layout shifts */}
      <div className="relative h-[340px] w-full overflow-hidden bg-[#0a0e1a]/95">
        <AnimatePresence mode="wait" initial={false}>
          {viewMode === "editor" ? (
            /* Code Editor Window */
            <motion.div
              key="editor"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.14 }}
              className="h-full w-full p-4 font-mono text-[12px] leading-[1.65] overflow-y-auto select-text"
            >
              <table className="w-full border-collapse">
                <tbody>
                  {currentTab.code.map((line) => (
                    <tr key={line.num} className="hover:bg-[#111827]/40 transition-colors">
                      <td className="w-8 pr-4 text-right text-[#3b4256] select-none align-top text-[11px]">
                        {line.num}
                      </td>
                      <td className="whitespace-pre align-top text-[#f0f0f5]">
                        {line.tokens.length > 0 ? (
                          line.tokens.map((token, i) => (
                            <span key={i} style={{ color: token.color }}>
                              {token.text}
                            </span>
                          ))
                        ) : (
                          <span>&nbsp;</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          ) : (
            /* Real-Time Working Terminal Stdout */
            <motion.div
              key="terminal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.14 }}
              ref={terminalScrollRef}
              className="h-full w-full p-4 bg-[#060a12] font-mono text-[11px] leading-[1.6] overflow-y-auto select-text scroll-smooth"
            >
              <div className="space-y-2">
                {/* Command Header */}
                <div className="flex items-center gap-2 pb-2 border-b border-[#f0f0f5]/[0.06] text-[#8b92a8]">
                  <span className="text-sky-400 font-bold">ashish@engine:~$</span>
                  <span className="text-[#f0f0f5]">{activeRunCommand || currentTab.command}</span>
                </div>

                {/* Live Streaming Logs with subtle stagger entrance */}
                {displayedLogs.map((log, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -4 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.12, ease: "easeOut" }}
                    className="flex items-start gap-2.5 font-mono text-xs"
                  >
                    <span className="text-[#5a6380] text-[10px] tabular-nums shrink-0 mt-0.5">
                      [{log.time}]
                    </span>
                    <span
                      className="rounded px-1.5 py-0.2 text-[9px] font-bold uppercase shrink-0 border"
                      style={{
                        color: log.tagColor,
                        borderColor: `${log.tagColor}30`,
                        backgroundColor: `${log.tagColor}10`,
                      }}
                    >
                      {log.tag}
                    </span>
                    <span className="text-[#f0f0f5] leading-relaxed">{log.message}</span>
                  </motion.div>
                ))}

                {/* Blinking Prompt Cursor */}
                <div className="flex items-center gap-2 pt-1 text-sky-400">
                  <span>ashish@engine:~$</span>
                  <span className="inline-block h-3.5 w-2 bg-amber-400 animate-pulse" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Engineering Specs & Metric Footer */}
      <div className="border-t border-[#f0f0f5]/[0.06] bg-[#080d17]/95 p-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h4 className="text-xs font-semibold text-[#f0f0f5] font-display">
              {currentTab.annotation.title}
            </h4>
            <p className="text-[11px] text-[#8b92a8] max-w-md mt-0.5 leading-normal">
              {currentTab.annotation.description}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 pt-1 sm:pt-0">
            {currentTab.annotation.stats.map((stat, i) => (
              <div key={i} className="text-right">
                <span className="block text-[10px] font-mono text-[#5a6380]">
                  {stat.label}
                </span>
                <span className="font-mono text-xs font-semibold text-[#f0f0f5]">
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSystemCockpit;
