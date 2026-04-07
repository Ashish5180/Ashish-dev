export interface ProjectData {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  stack: string;
  description: string;
  highlights: string[];
  accent: string;
}

export const PROJECTS: ProjectData[] = [
  {
    id: "ashos",
    num: "01",
    title: "ASHOS",
    subtitle: "CLI Operating System — Go",
    stack: "Go · Cobra · Bubble Tea · SQLite + sqlite-vec · OpenAI · Ollama · Slack API",
    description: "A terminal-native productivity OS built with production architecture principles — not a script, not a wrapper.",
    highlights: [
      "Task module with full CRUD, sequential ID generation, and SQLite-backed ACID persistence; consistent read performance under 10ms",
      "Focus session tracker running as a background goroutine with minute-level stdout updates, SIGINT/SIGTERM handling, and full session history written to disk",
      "AI reasoning layer using RAG — local vector index via sqlite-vec, MD5 deduplication, 10-turn dialogue memory, and automatic fallback between OpenAI and local Ollama models",
      "Terminal dashboard built on Bubble Tea (Elm-style architecture) with a 5-second refresh cycle across task and system panels",
      "Sprint module lets you close work cycles interactively, write a review summary, and archive everything into the AI brain for future recall",
      "Slack connector auto-posts on task completion and focus session end — removes the need to manually update any channel",
    ],
    accent: "#c0392b",
  },
  {
    id: "archguard",
    num: "02",
    title: "ArchGuard",
    subtitle: "Architectural Decision Review — Go + Next.js",
    stack: "Next.js 15 · Go 1.24 · MongoDB · OpenAI GPT-4o · Vanilla CSS",
    description: "Catches structural design problems before implementation — the kind that cost 3x–8x more to fix after code is already written.",
    highlights: [
      "Accepts plain-language or structured architectural proposals and returns tiered risk classification (High / Medium / Low) with scalability and maintainability observations in under 2 seconds",
      "Pattern reference library covering 10+ established approaches — CQRS, Event Sourcing, Hexagonal Architecture — each with AI-generated guidance tailored to the submitted tech stack",
      "Go 1.24 backend holds sub-50ms p95 response time under parallel review requests; MongoDB stores decision history as schema-flexible documents",
      "Persistent decision log lets teams compare current architectural health against past choices — useful for spotting drift before it compounds",
    ],
    accent: "#111",
  },
  {
    id: "ai-docs",
    num: "03",
    title: "AI Docs Extension",
    subtitle: "Local Inference Tool — Chrome Extension",
    stack: "JavaScript · Local LLM · Manifest V3 · HTML Parser",
    description: "Cuts the documentation round-trip to under 200ms — no browser tab, no cloud request, no data leaving the machine.",
    highlights: [
      "Parses live HTML documentation pages and surfaces relevant content inline on hover, without triggering a full page reload",
      "Runs entirely through a local inference layer — no API keys in transit, no usage logs, no third-party calls",
      "Targets the specific friction of context-switching mid-development; developer stays in the editor rather than switching to browser, searching, scanning, and switching back",
    ],
    accent: "#2c3e50",
  },
];
