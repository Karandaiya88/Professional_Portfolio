"use client";
// src/sections/About.tsx — Mobile Responsive

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
  const { ref, inView } = useInView({ triggerOnce:true, threshold:0.08 });

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my,[-1,1],[10,-10]),{stiffness:200,damping:28});
  const ry = useSpring(useTransform(mx,[-1,1],[-10,10]),{stiffness:200,damping:28});
  const handleTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX-r.left)/r.width  -0.5)*2);
    my.set(((e.clientY-r.top) /r.height -0.5)*2);
  };

  return (
    <SectionWrapper id="about">
      <SectionHeader eyebrow="About Me"
        heading={<>Jodhpur-based builder,<br className="hidden sm:block" />globally minded.</>} />

      <div ref={ref} className="flex flex-col lg:grid lg:grid-cols-[1.2fr_0.8fr] gap-10 lg:gap-16 mt-10">

        {/* ── Left: Bio + Timeline ── */}
        <div>
          <motion.div initial={{ opacity:0,y:22 }} animate={inView?{opacity:1,y:0}:{}}
            transition={{ duration:0.7,ease:[0.22,0.68,0,1.2] }}>
            {[
              <>I&apos;m <strong className="text-white font-bold">Karan Daiya</strong> — a Full-Stack Developer and AI Engineer from Jodhpur, Rajasthan. I build at the intersection of elegant product design and powerful AI systems.</>,
              <>My flagship project <em className="text-[#00f5ff] not-italic font-semibold">ARIC</em> is a fully autonomous AI compliance platform for banks — 4 agents, Groq/Llama-3.3-70b — shipped in <strong className="text-white">7 days</strong>.</>,
              <>I also build for real people — like <em className="text-[#00f5ff] not-italic font-semibold">Karan Cloth Store</em>, a legacy premium menswear brand. Every business deserves world-class technology.</>,
              <>I&apos;m a <strong className="text-white">Pull Shark</strong> &amp; <strong className="text-white">Quickdraw</strong> GitHub achiever, <em className="text-[#00f5ff] not-italic">#BuildInPublic</em> advocate. 9+ public repos and counting.</>,
            ].map((p,i) => (
              <p key={i} className="text-white/55 text-[13.5px] sm:text-[14.5px] leading-[1.88] mb-4 sm:mb-5">{p}</p>
            ))}
          </motion.div>

          {/* Timeline */}
          <motion.div initial={{ opacity:0,y:18 }} animate={inView?{opacity:1,y:0}:{}}
            transition={{ duration:0.7,delay:0.18,ease:[0.22,0.68,0,1.2] }}
            className="mt-6 sm:mt-8 relative pl-6 sm:pl-7">
            <div className="timeline-line" />
            {EXP_TIMELINE.map((exp,i) => (
              <motion.div key={i}
                initial={{ opacity:0,x:-14 }}
                animate={inView?{opacity:1,x:0}:{}}
                transition={{ duration:0.55,delay:0.25+i*0.1 }}
                className="relative mb-6 sm:mb-7 last:mb-0">
                <div className="timeline-dot" style={{ background:exp.color,boxShadow:`0 0 14px ${exp.color}` }} />
                <p className="text-[10px] font-black tracking-[0.1em] uppercase mb-0.5"
                  style={{ color:exp.color }}>{exp.period}</p>
                <p className="text-[14px] sm:text-[15px] font-bold text-white leading-snug">{exp.role}</p>
                <p className="text-[12px] sm:text-[12.5px] text-white/40 mt-0.5">{exp.place}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ── Right: Photo Card ── */}
        <div className="flex flex-col gap-4 sm:gap-5">
          <motion.div
            style={{ rotateX:rx, rotateY:ry, transformStyle:"preserve-3d", perspective:800, height:"300px" }}
            onMouseMove={handleTilt}
            onMouseLeave={() => { mx.set(0); my.set(0); }}
            initial={{ opacity:0,x:22 }} animate={inView?{opacity:1,x:0}:{} }
            transition={{ duration:0.7,delay:0.12,ease:[0.22,0.68,0,1.2] }}
            className="relative rounded-[22px] overflow-hidden glass-card"
          >
            <Image src="/images/karan-about.png" alt="Karan Daiya"
              fill className="object-cover object-top" />
            <div className="absolute bottom-0 left-0 right-0 h-28
              bg-gradient-to-t from-[#030014] via-[#030014]/70 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
              <p className="font-display text-[18px] sm:text-[20px] font-black tracking-[-0.5px]">
                Karan Daiya</p>
              <p className="text-[11.5px] sm:text-[12px] text-white/50 font-mono">
                Full-Stack Dev & AI Engineer</p>
              <div className="flex items-center gap-1.5 mt-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#34d399] animate-blink" />
                <span className="text-[10.5px] sm:text-[11px] font-bold text-[#34d399]">Open to Work</span>
              </div>
            </div>
            <div className="absolute inset-0 rounded-[22px] border border-white/[0.09] pointer-events-none" />
          </motion.div>

          {/* Badges */}
          <motion.div initial={{ opacity:0,y:14 }} animate={inView?{opacity:1,y:0}:{}}
            transition={{ duration:0.6,delay:0.25 }}
            className="flex gap-2 flex-wrap">
            {["🦈 Pull Shark","⚡ Quickdraw","#BuildInPublic"].map(a => (
              <span key={a} className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full
                text-[10px] sm:text-[10.5px] font-bold
                bg-[#34d399]/8 border border-[#34d399]/20 text-[#34d399]">{a}</span>
            ))}
          </motion.div>

          {/* Quick profile */}
          <motion.div initial={{ opacity:0,y:14 }} animate={inView?{opacity:1,y:0}:{}}
            transition={{ duration:0.6,delay:0.3 }}
            className="glass-card rounded-[16px] p-4">
            {[
              { k:"Location",   v:"Jodhpur, Rajasthan", c:"" },
              { k:"Experience", v:"2+ Years",           c:"" },
              { k:"GitHub",     v:"@Karandaiya88",      c:"text-[#00f5ff]" },
              { k:"Work Mode",  v:"Remote & On-site",   c:"" },
            ].map(({ k,v,c }) => (
              <div key={k} className="flex justify-between py-2 border-b border-white/[0.06]
                last:border-none text-[12px] sm:text-[12.5px]">
                <span className="text-white/35">{k}</span>
                <span className={`font-semibold text-white ${c}`}>{v}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Marquee */}
      <motion.div initial={{ opacity:0 }} animate={inView?{opacity:1}:{}}
        transition={{ duration:0.8,delay:0.4 }}
        className="mt-12 sm:mt-16 -mx-4 sm:-mx-6 lg:-mx-[5vw] py-3 sm:py-4
          border-t border-b border-white/[0.06] bg-white/[0.012] overflow-hidden">
        <div className="flex marquee-track gap-0">
          {TECH_MARQUEE.map((t,i) => (
            <span key={i} className="flex-shrink-0 px-4 sm:px-5 text-[11px] sm:text-[12px]
              font-semibold text-white/35 border-r border-white/[0.07] last:border-none
              tracking-wide whitespace-nowrap">
              {t}
            </span>
          ))}
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
