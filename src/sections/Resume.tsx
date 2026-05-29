"use client";
// src/sections/Resume.tsx — Image 1 style: Timeline + testimonial cards + download

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import SectionWrapper from "@/components/SectionWrapper";
import SectionHeader from "@/components/SectionHeader";
import { personal } from "@/data/portfolio";

// ── Data ──
const TIMELINE = [
  {
    period:  "2025 — Present",
    role:    "Full-Stack Developer & AI Engineer",
    company: "Freelance · Jodhpur, India",
    color:   "#00f5ff",
    icon:    "⚡",
    responsibilities: [
      "Built ARIC — autonomous AI compliance platform for banks with 4 specialized agents",
      "Delivered full-stack apps using Next.js 14, FastAPI, Docker, and Groq/Llama-3.3-70b",
      "Shipped production-grade projects from 0 to deploy in 7 days",
    ],
    testimonial: {
      stars:   5,
      quote:   "Built in 7 days what most teams take months to deliver. Karan's agentic ARIC system is production-ready, scalable, and truly autonomous. Exceptional speed and quality.",
      author:  "Banking Tech",
      handle:  "AI Compliance Project",
    },
  },
  {
    period:  "2024 — 2025",
    role:    "Frontend Developer",
    company: "Karan Cloth Store · Jodhpur",
    color:   "#a855f7",
    icon:    "🪡",
    responsibilities: [
      "Led full digitalization of a legacy premium menswear brand",
      "Built high-performance, SEO-optimized landing page with WhatsApp conversion CTAs",
      "Achieved instant load times with zero-dependency HTML/CSS/JS",
    ],
    testimonial: {
      stars:   5,
      quote:   "Karan transformed our traditional business into a digital brand. Our WhatsApp inquiries increased dramatically after the website launch. Truly outstanding work.",
      author:  "Karan Cloth Store",
      handle:  "Premium Menswear · Jodhpur",
    },
  },
  {
    period:  "2023 — 2024",
    role:    "Open Source Builder",
    company: "GitHub · #BuildInPublic",
    color:   "#f472b6",
    icon:    "🚀",
    responsibilities: [
      "Shipped 9+ public repositories including Jira Ticket Evaluator & CRPF Tender System",
      "Earned GitHub Pull Shark and Quickdraw achievements",
      "Contributed to AI tooling and government-tech automation projects",
    ],
    testimonial: {
      stars:   5,
      quote:   "Karan's open-source contributions demonstrate deep technical expertise. His Jira Ticket Evaluator solved a real pain point for our engineering backlog management.",
      author:  "Open Source Community",
      handle:  "#BuildInPublic · GitHub",
    },
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5 mb-3">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="text-[#fbbf24] text-[14px]">★</span>
      ))}
    </div>
  );
}

type TimelineExperience = (typeof TIMELINE)[number];

function TimelineItem({ exp, index }: { exp: TimelineExperience; index: number }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div ref={ref} className="relative grid grid-cols-[1fr_60px_1fr] gap-0 mb-16 last:mb-0 items-start">

      {/* ── Left: Testimonial Card ── */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 0.68, 0, 1.2] }}
        className="glass-card card-shimmer rounded-[18px] p-5 mr-6
          hover:border-white/18 hover:-translate-y-1 transition-all duration-300"
      >
        <Stars count={exp.testimonial.stars} />
        <p className="text-[13px] text-white/60 leading-[1.8] mb-4 italic">
          &ldquo;{exp.testimonial.quote}&rdquo;
        </p>
        <div className="flex items-center gap-2 pt-3 border-t border-white/[0.07]">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-[16px]"
            style={{ background: `${exp.color}20`, border: `1px solid ${exp.color}40` }}>
            {exp.icon}
          </div>
          <div>
            <p className="text-[12px] font-bold" style={{ color: exp.color }}>
              {exp.testimonial.author}
            </p>
            <p className="text-[10.5px] text-white/35">{exp.testimonial.handle}</p>
          </div>
        </div>
      </motion.div>

      {/* ── Center: Timeline dot + line ── */}
      <div className="flex flex-col items-center relative">
        {/* Line top */}
        {index > 0 && (
          <div className="w-px flex-1 mb-2" style={{ background: `linear-gradient(to bottom, transparent, ${exp.color}60)`, minHeight: "20px" }} />
        )}
        {/* Icon circle */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-12 h-12 rounded-full flex items-center justify-center
            text-[20px] flex-shrink-0 z-10 relative"
          style={{
            background: `radial-gradient(circle, ${exp.color}30, ${exp.color}10)`,
            border: `2px solid ${exp.color}`,
            boxShadow: `0 0 20px ${exp.color}60, 0 0 40px ${exp.color}20`,
          }}
        >
          {exp.icon}
        </motion.div>
        {/* Line bottom */}
        {index < TIMELINE.length - 1 && (
          <div className="w-px flex-1 mt-2" style={{ background: `linear-gradient(to bottom, ${exp.color}60, transparent)`, minHeight: "40px" }} />
        )}
      </div>

      {/* ── Right: Experience Details ── */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 0.68, 0, 1.2] }}
        className="pl-6"
      >
        {/* Period badge */}
        <span className="inline-block px-2.5 py-0.5 rounded-full text-[9.5px]
          font-black tracking-widest uppercase mb-3"
          style={{ background: `${exp.color}15`, border: `1px solid ${exp.color}30`, color: exp.color }}>
          {exp.period}
        </span>

        {/* Role */}
        <h3 className="font-display text-[22px] font-bold tracking-[-0.5px] leading-tight mb-1">
          {exp.role}
        </h3>
        <p className="text-[13px] font-semibold mb-5" style={{ color: exp.color }}>
          {exp.company}
        </p>

        {/* Responsibilities label */}
        <p className="text-[10.5px] font-black tracking-[0.1em] uppercase
          text-white/35 italic mb-3">
          Responsibilities
        </p>

        {/* Bullet points */}
        <ul className="flex flex-col gap-2">
          {exp.responsibilities.map((r, ri) => (
            <li key={ri} className="flex items-start gap-2.5 text-[13px] text-white/55 leading-relaxed">
              <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                style={{ background: exp.color, boxShadow: `0 0 6px ${exp.color}` }} />
              {r}
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}

export default function Resume() {
  const { ref: dlRef, inView: dlIn } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <SectionWrapper id="resume">
      <SectionHeader
        eyebrow="Resume"
        heading="Professional Experience"
        sub="My career journey — from open source to AI-powered enterprise systems."
      />

      {/* ── Timeline (Image 1 style) ── */}
      <div className="mt-14 relative">
        {TIMELINE.map((exp, i) => (
          <TimelineItem key={i} exp={exp} index={i} />
        ))}
      </div>

      {/* ── Download Resume Card ── */}
      <motion.div
        ref={dlRef}
        initial={{ opacity: 0, y: 20 }}
        animate={dlIn ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 0.68, 0, 1.2] }}
        className="mt-16 glass-card glow-border-anim rounded-[22px] p-8
          flex items-center justify-between gap-6 flex-wrap"
      >
        <div>
          <h3 className="font-display text-[22px] font-black tracking-[-1px] mb-2">
            Download Full Resume
          </h3>
          <p className="text-white/50 text-[13.5px] max-w-md leading-relaxed">
            Complete overview of experience, skills, projects, and certifications. PDF format, ready to share.
          </p>
          <div className="flex gap-3 mt-5 flex-wrap">
            <a href={personal.resumeUrl} download
              className="px-6 py-2.5 bg-gradient-to-r from-[#00f5ff] to-[#7c3aed]
                rounded-full text-[#020010] text-[13.5px] font-black
                hover:-translate-y-0.5 transition-all duration-200
                shadow-[0_0_25px_rgba(0,245,255,0.18)]
                hover:shadow-[0_0_45px_rgba(0,245,255,0.38)]">
              ⬇ Download PDF
            </a>
            <a href="#contact"
              className="px-6 py-2.5 bg-white/[0.04] border border-white/[0.09]
                rounded-full text-white text-[13.5px] font-semibold
                hover:bg-white/[0.08] hover:border-[#00f5ff]/30 hover:text-[#00f5ff]
                transition-all duration-200">
              Request via Email
            </a>
          </div>
        </div>
        <div className="w-[80px] h-[96px] bg-[#00f5ff]/7 border border-[#00f5ff]/18
          rounded-[12px] flex flex-col items-center justify-center gap-2 flex-shrink-0">
          <span className="text-[28px]">📄</span>
          <span className="font-mono text-[9px] text-[#00f5ff] tracking-widest">PDF</span>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
