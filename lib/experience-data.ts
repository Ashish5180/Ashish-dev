export const EXPERIENCE_SECTION = {
  heading: "Work Experience",
  subtitle: "Building Scalable Products That Drive Real Results",
  description:
    "From AI-powered platforms to enterprise ERPs — I architect full-stack solutions that ship fast, scale smart, and solve real business problems.",
};

export const EXPERIENCES = [
  {
    id: 1,
    company: "ASOasis Tech",
    role: "Full Stack Developer",
    type: "Full-Time",
    duration: "Aug 2025 – Present",
    location: "Remote",
    badge: "Current Role",
    tagline: "Architecting AI-Powered Products at Scale",
    highlights: [
      {
        title: "AI-Powered Job Platform",
        description:
          "Architected a scalable candidate management system and LinkedIn-style networking module using Next.js and AWS Lambda. Integrated OpenAI APIs for intelligent career matching and implemented optimized DynamoDB indexing for low-latency pagination and lightning-fast search.",
        metrics: ["50ms avg query response", "OpenAI-powered matching", "AWS Lambda serverless"],
        tags: ["Next.js", "AWS Lambda", "DynamoDB", "OpenAI API"],
      },
      {
        title: "Aistro AI — Cross-Platform AI Astrology App",
        description:
          "Developed a cross-platform AI Astrology suite using Flutter. Built a serverless backend on AWS Lambda to process image-based analysis (Palm & Forehead reading) and leveraged Firebase for real-time data sync and secure user authentication.",
        metrics: ["iOS + Android", "Real-time sync", "Image AI analysis"],
        tags: ["Flutter", "AWS Lambda", "Firebase", "AI Vision"],
      },
      {
        title: "Intimate AI & Monetization Engine",
        description:
          "Engineered a persona-based AI chat platform featuring dynamic Generative AI image creation. Integrated In-App Purchases (IAP), a virtual gifting system, and Google AdMob reward-based ads — creating a multi-stream revenue engine from day one.",
        metrics: ["3 revenue streams", "IAP + AdMob + Gifting", "Generative AI visuals"],
        tags: ["Generative AI", "IAP", "Google AdMob", "Monetization"],
      },
      {
        title: "Trading & Analytics Infrastructure",
        description:
          "Built a custom Financial Charting Widget (TradingView-style) from scratch with multi-currency payment gateways. Engineered InsightX — a centralized BI dashboard — by pipelining data from Firebase and Google Analytics into BigQuery for deep funnel and event coincidence analysis.",
        metrics: ["Multi-currency payments", "BigQuery pipelines", "Real-time BI insights"],
        tags: ["TradingView", "BigQuery", "Firebase", "Google Analytics"],
      },
      {
        title: "Automation & Workflow Intelligence",
        description:
          "Streamlined market research operations by designing n8n automation workflows to monitor and audit Reddit trends in real time — reducing manual content analysis time by over 70% and delivering actionable insights faster than ever.",
        metrics: ["70%+ time saved", "Automated trend audits", "n8n workflows"],
        tags: ["n8n", "Automation", "Reddit API", "Workflow Design"],
      },
    ],
  },
  {
    id: 2,
    company: "Elastomech Rubber Industry",
    role: "Backend Developer",
    type: "Part-Time",
    duration: "Nov 2024 – Mar 2025",
    location: "On-Site",
    badge: "Industry ERP",
    tagline: "Precision Backend Engineering for Industrial Operations",
    highlights: [
      {
        title: "Custom Inventory ERP Architecture",
        description:
          "Designed and deployed a custom backend system for multi-stage inventory management, handling complex raw material mapping for high-precision industrial products including aircraft-grade components.",
        metrics: ["Multi-stage inventory", "100% data accuracy", "Aircraft-grade precision"],
        tags: ["ERP", "Inventory Management", "Backend Architecture"],
      },
      {
        title: "Dynamic Formula Engine",
        description:
          "Built an admin-controlled logic engine to automate raw material allocation through intelligent 'formula bins' — ensuring precise consumption tracking and real-time stock reconciliation across production cycles.",
        metrics: ["Admin-controlled logic", "Real-time reconciliation", "Zero allocation errors"],
        tags: ["Formula Engine", "Automation", "Stock Management"],
      },
      {
        title: "Automated Order-to-Production Pipeline",
        description:
          "Engineered a fully automated order-to-production pipeline that parses incoming email data to trigger instant inventory deductions — cutting manual entry errors by 90% and dramatically optimizing factory floor workflows.",
        metrics: ["90% fewer manual errors", "Email-triggered automation", "Instant deductions"],
        tags: ["Pipeline Automation", "Email Parsing", "Factory Workflow"],
      },
      {
        title: "High-Performance Data Models",
        description:
          "Implemented high-throughput data models designed to handle large-volume stock cycles at industrial scale — guaranteeing 100% data integrity between production, warehousing, and reporting layers.",
        metrics: ["100% data integrity", "Large-volume stock cycles", "Production-warehouse sync"],
        tags: ["Data Modeling", "Scalability", "Warehouse Management"],
      },
    ],
  },
  {
    id: 3,
    company: "Freelance",
    role: "Full Stack Developer",
    type: "Freelance",
    duration: "Jun 2025 – Jul 2025",
    location: "Remote",
    badge: "Freelance",
    tagline: "End-to-End Product Delivery for Diverse Clients",
    highlights: [
      {
        title: "Swipe It — AI Job Matching Platform",
        description:
          "Engineered an AI-driven job matching platform utilizing Vector Embeddings and semantic search to intelligently connect candidates with their most optimized roles — making job discovery smarter, faster, and more accurate.",
        metrics: ["Vector embeddings", "Semantic search", "AI-optimized matching"],
        tags: ["Vector DB", "Semantic Search", "AI", "Next.js"],
      },
      {
        title: "SaaS No-Code Form Builder",
        description:
          "Developed a zero-friction, No-Code Form Builder empowering users to generate fully custom forms and deploy them into any external website via a simple embeddable code snippet — no dev skills required.",
        metrics: ["No-code builder", "Embeddable widget", "SaaS model"],
        tags: ["SaaS", "No-Code", "Embeddable Widget", "React"],
      },
      {
        title: "AI-Integrated Personal & Professional Dashboards",
        description:
          "Built bespoke personal and professional dashboards featuring real-time data visualization and deep Generative AI integrations — giving users intelligent, at-a-glance insights into what matters most.",
        metrics: ["Real-time visualization", "Generative AI", "Custom dashboards"],
        tags: ["Dashboard", "Data Viz", "Generative AI", "React"],
      },
      {
        title: "High-Conversion Landing Pages",
        description:
          "Designed and deployed responsive, SEO-optimized landing pages for a Travel Agency and a Manpower Firm — engineered specifically for lead generation performance with fast load times and conversion-first layouts.",
        metrics: ["SEO-optimized", "Lead generation focused", "Mobile-first responsive"],
        tags: ["Landing Page", "SEO", "Conversion Optimization", "Vercel"],
      },
      {
        title: "Full Product Lifecycle Management",
        description:
          "Managed end-to-end delivery for diverse client projects — from initial UI/UX wireframing in Figma through to production deployment on Vercel and AWS — acting as the single point of accountability for every product shipped.",
        metrics: ["Figma to production", "Vercel + AWS deployment", "Full ownership"],
        tags: ["Figma", "Vercel", "AWS", "Project Management"],
      },
    ],
  },
];

export const EXPERIENCE_STATS = [
  { label: "Manual Errors Reduced", value: "90%", icon: "Zap" },
  { label: "Time Saved via Automation", value: "70%+", icon: "Cpu" },
  { label: "Data Integrity Guaranteed", value: "100%", icon: "ShieldCheck" },
  { label: "Revenue Streams Built", value: "3+", icon: "Coins" },
  { label: "Platforms Delivered", value: "10+", icon: "Rocket" },
  { label: "Cloud & AI Tools Mastered", value: "15+", icon: "Cloud" },
];

export const TECH_STACK = [
  "Next.js", "Flutter", "React", "Node.js",
  "AWS Lambda", "DynamoDB", "Firebase", "BigQuery",
  "OpenAI API", "Vector Embeddings", "n8n", "Figma",
  "Google AdMob", "TradingView", "Vercel", "Python",
];
