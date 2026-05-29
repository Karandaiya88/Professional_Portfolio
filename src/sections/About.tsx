"use client";
// src/sections/About.tsx — Image 1 (blue shirt) for about + Image 2 in contact

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import SectionWrapper from "@/components/SectionWrapper";
import SectionHeader from "@/components/SectionHeader";

const TECH_MARQUEE = [
  "Next.js","FastAPI","Python","TypeScript","Docker","Groq AI","Llama 3.3","React",
  "Tailwind CSS","PostgreSQL","SQLAlchemy","Framer Motion","Three.js","Pydantic","Vercel",
  "Next.js","FastAPI","Python","TypeScript","Docker","Groq AI","Llama 3.3","React",
  "Tailwind CSS","PostgreSQL","SQLAlchemy","Framer Motion","Three.js","Pydantic","Vercel",
];

const EXP_TIMELINE = [
  { period:"2025–Present", role:"Full-Stack Dev & AI Engineer", place:"Freelance · Jodhpur", color:"#00f5ff" },
  { period:"2024–2025",    role:"Frontend Developer",           place:"Karan Cloth Store",   color:"#a855f7" },
  { period:"2023–2024",    role:"Open Source Builder",          place:"GitHub #BuildInPublic",color:"#f472b6" },
];

export default function About() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 });

  // 3D tilt for photo card
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-1, 1], [10, -10]), { stiffness: 200, damping: 28 });
  const ry = useSpring(useTransform(mx, [-1, 1], [-10, 10]), { stiffness: 200, damping: 28 });
  const handleTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width  - 0.5) * 2);
    my.set(((e.clientY - r.top)  / r.height - 0.5) * 2);
  };

  return (
    <SectionWrapper id="about">
      <SectionHeader eyebrow="About Me"
        heading={<>Jodhpur-based builder,<br />globally minded.</>} />

      <div ref={ref} className="grid grid-cols-[1.2fr_0.8fr] gap-16 mt-12">

        {/* ── Left: Bio + Timeline ── */}
        <div>
          <motion.div initial={{ opacity: 0, y: 22 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 0.68, 0, 1.2] }}>
            {[
              <>I&apos;m <strong className="text-white font-bold">Karan Daiya</strong> — a Full-Stack Developer and AI Engineer from Jodhpur, Rajasthan. I build at the intersection of elegant product design and powerful AI systems.</>,
              <>My flagship project <em className="text-[#00f5ff] not-italic font-semibold">ARIC</em> is a fully autonomous AI compliance platform for banks — powered by 4 specialized agents and Groq/Llama-3.3-70b — shipped in <strong className="text-white">7 days</strong>.</>,
              <>I also build for real people — like <em className="text-[#00f5ff] not-italic font-semibold">Karan Cloth Store</em>, a legacy premium menswear brand in Jodhpur. Every business deserves world-class technology.</>,
              <>I&apos;m a <strong className="text-white">Pull Shark</strong> &amp; <strong className="text-white">Quickdraw</strong> GitHub achiever, <em className="text-[#00f5ff] not-italic">#BuildInPublic</em> advocate, and open source contributor. 9+ public repos and counting.</>,
            ].map((p, i) => (
              <p key={i} className="text-white/55 text-[14.5px] leading-[1.88] mb-5">{p}</p>
            ))}
          </motion.div>

          {/* Timeline */}
          <motion.div initial={{ opacity: 0, y: 18 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.18, ease: [0.22, 0.68, 0, 1.2] }}
            className="mt-8 relative pl-7">
            <div className="timeline-line" />
            {EXP_TIMELINE.map((exp, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, x: -14 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.25 + i * 0.1 }}
                className="relative mb-7 last:mb-0">
                <div className="timeline-dot" style={{ background: exp.color, boxShadow: `0 0 14px ${exp.color}` }} />
                <p className="text-[10px] font-black tracking-[0.1em] uppercase mb-0.5"
                  style={{ color: exp.color }}>{exp.period}</p>
                <p className="text-[15px] font-bold text-white leading-snug">{exp.role}</p>
                <p className="text-[12.5px] text-white/40 mt-0.5">{exp.place}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ── Right: Photo Card (Image 1 - blue shirt) ── */}
        <div className="flex flex-col gap-5">
          <motion.div
            style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d", perspective: 800, height: "380px" }}
            onMouseMove={handleTilt}
            onMouseLeave={() => { mx.set(0); my.set(0); }}
            initial={{ opacity: 0, x: 22 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 0.68, 0, 1.2] }}
            className="relative rounded-[22px] overflow-hidden glass-card"
          >
            {/* Photo */}
            <Image
              src="/images/karan-about.png"
              alt="Karan Daiya"
              fill
              className="object-cover object-top"
            />

            {/* Gradient overlay bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-32
              bg-gradient-to-t from-[#030014] via-[#030014]/70 to-transparent" />

            {/* Name overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <p className="font-display text-[20px] font-black tracking-[-0.5px]">
                Karan Daiya
              </p>
              <p className="text-[12px] text-white/50 font-mono">
                Full-Stack Dev & AI Engineer
              </p>
              {/* Available badge */}
              <div className="flex items-center gap-1.5 mt-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#34d399] animate-blink" />
                <span className="text-[11px] font-bold text-[#34d399]">Open to Work</span>
              </div>
            </div>

            {/* Holo border */}
            <div className="absolute inset-0 rounded-[22px] border border-white/[0.09]
              pointer-events-none" />
          </motion.div>

          {/* Achievement badges */}
          <motion.div initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 0.68, 0, 1.2] }}
            className="flex gap-2 flex-wrap">
            {["🦈 Pull Shark", "⚡ Quickdraw", "#BuildInPublic"].map((a) => (
              <span key={a} className="px-3 py-1.5 rounded-full text-[10.5px] font-bold
                bg-[#34d399]/8 border border-[#34d399]/20 text-[#34d399]">{a}</span>
            ))}
          </motion.div>

          {/* Quick profile */}
          <motion.div initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 0.68, 0, 1.2] }}
            className="glass-card rounded-[16px] p-4">
            {[
              { k: "Location",     v: "Jodhpur, Rajasthan", c: "" },
              { k: "Experience",  v: "2+ Years",            c: "" },
              { k: "GitHub",      v: "@Karandaiya88",       c: "text-[#00f5ff]" },
              { k: "Work Mode",   v: "Remote & On-site",    c: "" },
            ].map(({ k, v, c }) => (
              <div key={k} className="flex justify-between py-2 border-b border-white/[0.06]
                last:border-none text-[12.5px]">
                <span className="text-white/35">{k}</span>
                <span className={`font-semibold text-white ${c}`}>{v}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Marquee tech strip ── */}
      <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-16 -mx-[5vw] py-4 border-t border-b border-white/[0.06]
          bg-white/[0.012] overflow-hidden">
        <div className="flex marquee-track gap-0">
          {TECH_MARQUEE.map((t, i) => (
            <span key={i} className="flex-shrink-0 px-5 text-[12px] font-semibold text-white/35
              border-r border-white/[0.07] last:border-none tracking-wide whitespace-nowrap">
              {t}
            </span>
          ))}
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
