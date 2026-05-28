// ─── src/data/portfolio.ts ────────────────────────────────────────────────────
// All real personal data extracted from GitHub & LinkedIn profiles

export const personal = {
  name: "Karan Daiya",
  role: "Full-Stack Developer & AI Engineer",
  tagline:
    "Building intelligent, agentic systems that bridge AI and beautiful software engineering.",
  location: "Jodhpur, Rajasthan, India",
  timezone: "IST (UTC+5:30)",
  available: true,
  github: "https://github.com/Karandaiya88",
  linkedin: "https://www.linkedin.com/in/karan-d88/",
  instagram: "https://www.instagram.com/exclusive.karan/",
  email: "karandaiya88@example.com", 
  resumeUrl: "https://drive.google.com/file/d/18Z0KL-wahTQy6tkDbRbJ4WDXJlWnjTSY/view?usp=drive_link",   
};

export const stats = [
  { value: "9+",   label: "GitHub Repos" },
  { value: "4",    label: "AI Agents Built" },
  { value: "7",    label: "Days to Ship ARIC" },
  { value: "14+",  label: "Regulatory Feeds" },
  { value: "100%", label: "Open Source" },
];

export const bio = [
  "I'm <strong>Karan Daiya</strong> — a Full-Stack Developer and AI Engineer from Jodhpur, Rajasthan. I build at the intersection of elegant product design and powerful AI systems, from autonomous agentic platforms to premium local business digitalization.",
  "My flagship project <em>ARIC</em> is a fully autonomous AI compliance platform for banks — powered by 4 specialized agents and Groq/Llama-3.3-70b — built and shipped end-to-end in just <strong>7 days</strong>. That's the pace I operate at.",
  "Beyond enterprise AI, I build for real people — like creating the digital presence for <em>Karan Cloth Store</em>, a legacy premium menswear brand in Jodhpur. I believe every business deserves world-class technology, regardless of size.",
  "I'm a <strong>Pull Shark</strong> and <strong>Quickdraw</strong> GitHub achiever, a <em>#BuildInPublic</em> advocate, and passionate about open source. 9 public repos and counting.",
];

// ─── Skill Categories ─────────────────────────────────────────────────────────
export interface SkillCategory {
  icon: string;
  title: string;
  theme: "cyan" | "purple" | "green" | "pink";
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    icon: "⚡",
    title: "Frontend",
    theme: "cyan",
    skills: ["Next.js 14", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "HTML5", "CSS3", "Vanilla JS", "Three.js / R3F"],
  },
  {
    icon: "🛠",
    title: "Backend",
    theme: "purple",
    skills: ["FastAPI", "Python 3.10+", "Pydantic", "SQLAlchemy", "REST APIs", "WebSockets", "Uvicorn"],
  },
  {
    icon: "🤖",
    title: "AI / ML",
    theme: "green",
    skills: ["Groq API", "Llama 3.3-70b", "AI Agents", "LLM Orchestration", "RAG Systems", "Prompt Engineering", "Agentic Pipelines"],
  },
  {
    icon: "🗄",
    title: "Database & DevOps",
    theme: "pink",
    skills: ["PostgreSQL", "SQLite", "Docker", "Docker Compose", "GitHub Actions", "Vercel", "Git"],
  },
];

export const proficiencyBars = [
  { name: "Python / FastAPI",  pct: 92 },
  { name: "Next.js / React",   pct: 90 },
  { name: "TypeScript",        pct: 88 },
  { name: "Tailwind CSS",      pct: 85 },
  { name: "AI Agent Design",   pct: 87 },
  { name: "Docker / DevOps",   pct: 80 },
  { name: "SQL / Databases",   pct: 78 },
  { name: "Three.js / 3D",     pct: 70 },
];

// ─── Projects ─────────────────────────────────────────────────────────────────
export interface Project {
  id: string;
  title: string;
  description: string;
  badge: string;
  badgeTheme: "cyan" | "purple";
  icon: string;
  iconTheme: "cyan" | "purple" | "pink";
  tags: string[];
  github: string;
  demo?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: "aric",
    featured: true,
    title: "ARIC — Agentic Regulatory Intelligence & Compliance",
    description:
      "Fully autonomous AI compliance platform for banks. Monitors 14+ global regulatory feeds (Basel, Fed, EBA, DORA, FinCEN), generates Measurable Action Points (MAPs), routes them to correct bank departments, and autonomously validates completion — zero human intervention. 4 specialized agents. One-command Docker deployment. Built in 7 days.",
    badge: "Featured · AI Agentic System",
    badgeTheme: "cyan",
    icon: "🤖",
    iconTheme: "cyan",
    tags: ["Next.js 14", "FastAPI", "Python", "Groq/Llama-3.3-70b", "TypeScript", "Docker", "SQLAlchemy", "Recharts"],
    github: "https://github.com/Karandaiya88/aric-compliance-platform",
    demo: "https://aric-compliance-platform.vercel.app",
  },
  {
    id: "cloth-store",
    title: "Karan Cloth Store — Premium Menswear",
    description:
      "High-performance dark-luxury landing page for a legacy premium tailoring business in Jodhpur. Local SEO optimization, WhatsApp conversion CTAs, mobile-first design, and zero-dependency HTML/CSS/JS for instant load times.",
    badge: "Web · Local SEO",
    badgeTheme: "purple",
    icon: "🪡",
    iconTheme: "purple",
    tags: ["HTML5", "CSS3", "Vanilla JS", "Local SEO", "WhatsApp API"],
    github: "https://github.com/Karandaiya88/karan-cloth-store-official",
  },
  {
    id: "jira",
    title: "Jira Ticket Evaluator",
    description:
      "AI-powered tool that automatically evaluates and scores Jira tickets for quality, completeness, and clarity via LLM-based analysis. Reduces sprint planning friction for engineering teams.",
    badge: "AI · DevOps Tooling",
    badgeTheme: "cyan",
    icon: "📋",
    iconTheme: "pink",
    tags: ["Python", "AI/LLM", "Jira API", "Automation"],
    github: "https://github.com/Karandaiya88/jira-ticket-evaluator",
  },
  {
    id: "portfolio-v1",
    title: "Developer Portfolio v1",
    description:
      "React + Vite portfolio with tech stack display, project demos, and contact section. Built with fast HMR and modern frontend tooling.",
    badge: "Frontend · React",
    badgeTheme: "cyan",
    icon: "🚀",
    iconTheme: "cyan",
    tags: ["React", "Vite", "JavaScript", "CSS"],
    github: "https://github.com/Karandaiya88/Portfolio",
  },
  {
    id: "crpf",
    title: "CRPF Tender System",
    description:
      "Government tender management and automation system for CRPF. Automates tender tracking, document processing, and notification pipelines with Python backend.",
    badge: "Gov-Tech · Python",
    badgeTheme: "purple",
    icon: "🏛️",
    iconTheme: "purple",
    tags: ["Python", "Automation", "Gov-Tech"],
    github: "https://github.com/Karandaiya88/CRPF-Tender-",
  },
  {
    id: "weather",
    title: "Weather App",
    description:
      "Real-time weather app with location-based forecasts and dynamic UI updates based on weather conditions. Clean, minimal interface built with vanilla web tech.",
    badge: "Web · API Integration",
    badgeTheme: "purple",
    icon: "🌦️",
    iconTheme: "pink",
    tags: ["HTML", "CSS", "JavaScript", "Weather API"],
    github: "https://github.com/Karandaiya88/Weather-App",
  },
];

// ─── Certifications ───────────────────────────────────────────────────────────
export interface Cert {
  issuer: string;
  name: string;
  date: string;
  badgeLabel: string;
  badgeTheme?: "green" | "cyan";
}

export const certifications: Cert[] = [
  { issuer: "Coursera / DeepLearning.AI", name: "Python for Everybody Specialization", date: "Completed 2024", badgeLabel: "✓ Verified" },
  { issuer: "Coursera / Meta", name: "Frontend Developer Professional Certificate", date: "Completed 2024", badgeLabel: "✓ Verified" },
  { issuer: "Groq / LLM Engineering", name: "Building Agentic AI Systems with Groq & Llama", date: "Completed 2025", badgeLabel: "✓ Applied" },
  { issuer: "Docker", name: "Docker & Containerization Fundamentals", date: "Completed 2025", badgeLabel: "✓ Verified" },
  { issuer: "freeCodeCamp", name: "Responsive Web Design Certification", date: "Completed 2023", badgeLabel: "✓ Verified" },
  { issuer: "GitHub", name: "Pull Shark & Quickdraw Achiever", date: "Earned 2024", badgeLabel: "🦈 Achievement", badgeTheme: "cyan" },
];

// ─── FAQ ──────────────────────────────────────────────────────────────────────
export interface FAQItem {
  q: string;
  a: string;
}

export const faqs: FAQItem[] = [
  {
    q: "Are you available for freelance or full-time work?",
    a: "Yes — actively open to both. Comfortable working remotely globally or on-site within India. I specialise in full-stack web, AI/agentic systems, and rapid product shipping.",
  },
  {
    q: "What is ARIC and how does it work?",
    a: "ARIC is an autonomous AI compliance system for banks with 4 agents: Monitor (watches 14+ regulatory feeds), Parser (generates MAPs via Groq/Llama-3.3-70b), Assigner (routes MAPs to correct departments), and Validator (verifies completion autonomously). Zero human intervention.",
  },
  {
    q: "What tech stack do you prefer for new projects?",
    a: "Next.js 14 + TypeScript frontend, Tailwind CSS + Framer Motion for UI, FastAPI + Python for AI/data backends, PostgreSQL for production databases, Docker for containerisation, and Vercel for deployment.",
  },
  {
    q: "How quickly can you deliver a project?",
    a: "ARIC — a full AI platform with 4 agents, FastAPI backend, Next.js dashboard, and Docker deployment — was shipped in 7 days. Standard landing pages: 3–5 days. I always ship fast without sacrificing quality.",
  },
  {
    q: "Do you work with international clients?",
    a: "Absolutely. All communication in English, comfortable with async collaboration across timezones. Open to international freelance, contract, and full-time remote roles globally.",
  },
  {
    q: "What makes you different from other developers?",
    a: "I combine beautiful frontend craft with deep AI/backend engineering — most devs do one well. I ship extremely fast, build in public on GitHub, and care about real-world impact.",
  },
  {
    q: "What are your rates and pricing?",
    a: "Pricing depends on scope, timeline, and complexity. Open to hourly, milestone-based, or fixed-price contracts. Reach out with project details and I'll send a transparent proposal within 24 hours.",
  },
];

// ─── Experience (for Resume) ──────────────────────────────────────────────────
export const experience = [
  {
    period: "2025 — Present",
    title: "Full-Stack Developer & AI Engineer",
    company: "Freelance · Jodhpur, India",
    color: "cyan" as const,
  },
  {
    period: "2024 — 2025",
    title: "Frontend Developer",
    company: "Karan Cloth Store · Jodhpur",
    color: "purple" as const,
  },
  {
    period: "2023 — 2024",
    title: "Open Source Builder",
    company: "GitHub #BuildInPublic",
    color: "pink" as const,
  },
];
