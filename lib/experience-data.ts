export const EXPERIENCES = [
  {
    id: 1,
    company: "Asoasis",
    website: "https://asoasis.tech/",
    role: "Full-Stack Developer",
    type: "Full-Time",
    duration: "Aug 2025 – Present",
    location: "Remote",
    badge: "Current Role",
    tagline: "Shipped 10+ client-facing applications collectively serving 20,000+ registered users across AI, automation, and data tooling.",
    highlights: [
      {
        title: "Aistro AI — Biometric Analysis Engine",
        detail: "Palm and forehead detection with LLM-generated astrological reports; cut turnaround from 30-minute manual consultation to under 90 seconds",
        tags: ["Flutter", "AWS Lambda", "AI Vision"],
      },
      {
        title: "Intimate AI — AI Companion App",
        detail: "Swipe-based discovery, natural dialogue engine, purchasable in-app items; onboarded first 1,000 users within month one without paid acquisition",
        tags: ["Generative AI", "IAP", "Flutter"],
      },
      {
        title: "InsightX Dashboard — Internal Ops Hub",
        detail: "Pulls AWS billing, Google Ads performance, GCP table data, and Firebase metrics into one interface — replaced 4 separate tools",
        tags: ["BigQuery", "Firebase", "Google Analytics"],
      },
      {
        title: "Content Era — Automated Pipeline",
        detail: "OpenAI + Kie AI to generate captions, hashtags, and post images, then schedule and publish directly to Instagram with zero manual steps",
        tags: ["OpenAI", "Automation", "n8n"],
      },
      {
        title: "Scan.io — Reddit Extraction Tool",
        detail: "Topic-based extraction with adjustable time windows (1h to 30d); returns structured, filterable results instead of raw feed scrolling",
        tags: ["Reddit API", "Data Pipeline"],
      },
      {
        title: "Custom Trading Interface (B2B)",
        detail: "Live currency/stock panels, hand-built charting widget with drawing tools and tab persistence, currency heatmaps using EMA-200 overlays",
        tags: ["TradingView", "WebSocket", "React"],
      },
      {
        title: "5+ Marketing Pages",
        detail: "Across client verticals, all indexed at asoasis.tech, with sub-2s load time as a baseline requirement on every build",
        tags: ["Next.js", "SEO", "Vercel"],
      },
    ],
  },
  {
    id: 2,
    company: "Swipe It",
    website: "https://www.swipeit.in/",
    role: "Full Stack Developer",
    type: "Freelance",
    duration: "Jun 2025 – Jul 2025",
    location: "Remote",
    badge: "AI Platform",
    tagline: "Achieved 95+ Lighthouse performance score. Built candidate-matching logic that surfaces relevant profiles without keyword dependency.",
    highlights: [
      {
        title: "Swipe-Card Recruitment Interface",
        detail: "React and TailwindCSS layout verified across 12 device sizes with no breakpoints failing",
        tags: ["React", "TailwindCSS", "Responsive"],
      },
      {
        title: "Supabase Real-Time Backend",
        detail: "Database schema built for horizontal scaling from day one with full real-time sync",
        tags: ["Supabase", "PostgreSQL", "Real-time"],
      },
      {
        title: "Vector Embedding Search",
        detail: "Recruiters find semantically matched candidates — not just title-matched ones",
        tags: ["Vector DB", "Semantic Search", "AI"],
      },
      {
        title: "Personalized Candidate APIs",
        detail: "REST APIs serving personalized candidate queues based on role context and prior recruiter behavior",
        tags: ["REST API", "Personalization"],
      },
    ],
  },
  {
    id: 3,
    company: "Elastomech",
    website: "https://www.elastomech.in/",
    role: "Backend Developer",
    type: "Part-Time",
    duration: "Nov 2024 – Mar 2025",
    location: "On-Site",
    badge: "Industry ERP",
    tagline: "Replaced a fully manual order-entry workflow for a factory producing aircraft wheels, industrial tyres, and speed reducers.",
    highlights: [
      {
        title: "Email-to-Production Pipeline",
        detail: "Incoming client emails translate directly into production entries — raw material stock deducts automatically per order based on pre-loaded formulas",
        tags: ["Pipeline Automation", "Email Parsing"],
      },
      {
        title: "Compound Formula Engine",
        detail: "Covering 15+ SKUs, each with exact rubber-to-chemical ratios; removed the need for floor workers to calculate material requirements manually",
        tags: ["Formula Engine", "Manufacturing"],
      },
      {
        title: "3-Screen → 1-Form Collapse",
        detail: "Collapsed a 3-screen manual entry process into a single form submission, cutting per-order admin time by 35–40 minutes",
        tags: ["UX", "Workflow Optimization"],
      },
    ],
  },
];

export const EXPERIENCE_STATS = [
  { label: "Apps Shipped", value: "10+" },
  { label: "Registered Users", value: "20K+" },
  { label: "Lighthouse Score", value: "95+" },
  { label: "Admin Time Saved", value: "40min" },
  { label: "SKU Formulas", value: "15+" },
  { label: "Load Time", value: "<2s" },
];

export const TECH_STACK = [
  "Next.js", "React", "Flutter", "Go", "Node.js",
  "AWS Lambda", "DynamoDB", "Supabase", "Firebase", "BigQuery",
  "OpenAI API", "Vector Embeddings", "SQLite", "MongoDB",
  "TailwindCSS", "Vercel", "n8n", "Figma",
];
