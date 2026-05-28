"use client";
// src/sections/About.tsx — Premium design with avatar, timeline, marquee tech strip

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import SectionWrapper from "@/components/SectionWrapper";
import SectionHeader from "@/components/SectionHeader";

const TECH_MARQUEE = [
  "Next.js","FastAPI","Python","TypeScript","Docker","Groq AI","Llama 3.3","React",
  "Tailwind CSS","PostgreSQL","SQLAlchemy","Framer Motion","Three.js","Pydantic","Vercel",
  "Next.js","FastAPI","Python","TypeScript","Docker","Groq AI","Llama 3.3","React",
  "Tailwind CSS","PostgreSQL","SQLAlchemy","Framer Motion","Three.js","Pydantic","Vercel",
];

const EXP_TIMELINE = [
  { period:"2025–Present", role:"Full-Stack Dev & AI Engineer", place:"Freelance · Jodhpur",  color:"#00f5ff" },
  { period:"2024–2025",    role:"Frontend Developer",           place:"Karan Cloth Store",     color:"#a855f7" },
  { period:"2023–2024",    role:"Open Source Builder",          place:"GitHub #BuildInPublic", color:"#f472b6" },
];

export default function About() {
  const { ref, inView } = useInView({ triggerOnce:true, threshold:0.08 });

  // 3D tilt for avatar card
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my,[-1,1],[12,-12]),{ stiffness:200,damping:28 });
  const ry = useSpring(useTransform(mx,[-1,1],[-12,12]),{ stiffness:200,damping:28 });
  const handleTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX-r.left)/r.width  -0.5)*2);
    my.set(((e.clientY-r.top) /r.height -0.5)*2);
  };

  return (
    <SectionWrapper id="about">
      <SectionHeader eyebrow="About Me" heading={<>Jodhpur-based builder,<br/>globally minded.</>} />

      <div ref={ref} className="grid grid-cols-[1.15fr_0.85fr] gap-20 mt-12">

        {/* ── Left: Bio + Timeline ── */}
        <div>
          <motion.div initial={{ opacity:0,y:22 }} animate={inView?{opacity:1,y:0}:{}}
            transition={{ duration:0.7, ease:[0.22,0.68,0,1.2] }}>
            {[
              <>I'm <strong className="text-white font-bold">Karan Daiya</strong> — a Full-Stack Developer and AI Engineer from Jodhpur, Rajasthan. I build at the intersection of elegant product design and powerful AI systems.</>,
              <>My flagship project <em className="text-[#00f5ff] not-italic font-semibold">ARIC</em> is a fully autonomous AI compliance platform for banks — 4 specialized agents, Groq/Llama-3.3-70b — shipped in <strong className="text-white">7 days</strong>.</>,
              <>I also build for real people — like <em className="text-[#00f5ff] not-italic font-semibold">Karan Cloth Store</em>, a legacy premium menswear brand. Every business deserves world-class technology.</>,
              <>I'm a <strong className="text-white">Pull Shark</strong> &amp; <strong className="text-white">Quickdraw</strong> GitHub achiever, <em className="text-[#00f5ff] not-italic">#BuildInPublic</em> advocate, and open source contributor. 9+ public repos and counting.</>,
            ].map((p,i) => (
              <p key={i} className="text-white/55 text-[14.5px] leading-[1.88] mb-5">{p}</p>
            ))}
          </motion.div>

          {/* Timeline */}
          <motion.div initial={{ opacity:0,y:18 }} animate={inView?{opacity:1,y:0}:{}}
            transition={{ duration:0.7,delay:0.18, ease:[0.22,0.68,0,1.2] }}
            className="mt-8 relative pl-7">
            <div className="timeline-line" />
            {EXP_TIMELINE.map((exp,i) => (
              <motion.div key={i} initial={{ opacity:0,x:-14 }}
                animate={inView?{opacity:1,x:0}:{}}
                transition={{ duration:0.55,delay:0.25+i*0.1 }}
                className="relative mb-7 last:mb-0">
                <div className="timeline-dot" style={{ background:exp.color,
                  boxShadow:`0 0 14px ${exp.color}` }} />
                <p className="text-[10px] font-black tracking-[0.1em] uppercase mb-0.5"
                  style={{ color:exp.color }}>{exp.period}</p>
                <p className="text-[15px] font-bold text-white leading-snug">{exp.role}</p>
                <p className="text-[12.5px] text-white/40 mt-0.5">{exp.place}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ── Right: 3D Avatar Card + Profile ── */}
        <div className="flex flex-col gap-5">
          {/* Avatar card with 3D tilt */}
          <motion.div
            style={{ rotateX:rx, rotateY:ry, transformStyle:"preserve-3d", perspective:800 }}
            onMouseMove={handleTilt}
            onMouseLeave={() => { mx.set(0); my.set(0); }}
            initial={{ opacity:0,x:22 }} animate={inView?{opacity:1,x:0}:{}}
            transition={{ duration:0.7,delay:0.12, ease:[0.22,0.68,0,1.2] }}
            className="glass-card rounded-[22px] p-6 holo-border card-shimmer"
          >
            {/* Avatar ring */}
            <div className="flex items-center gap-4 mb-5">
              <div className="relative w-16 h-16 flex-shrink-0">
                <div className="avatar-ring absolute inset-[-4px] rounded-full border-2 border-[#00f5ff]/50" />
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#00f5ff] to-[#7c3aed]
                  flex items-center justify-center font-display text-[22px] font-black text-[#020010]">
                  KD
                </div>
              </div>
              <div>
                <p className="font-display text-[18px] font-black tracking-[-0.4px]">Karan Daiya</p>
                <p className="text-[12px] text-white/40 font-mono">@Karandaiya88</p>
                <p className="text-[11px] text-[#34d399] font-semibold mt-0.5 flex items-center gap-1.5">
                  <span className="animate-blink w-1.5 h-1.5 rounded-full bg-[#34d399]" />
                  Open to Work
                </p>
              </div>
            </div>

            {/* Profile rows */}
            <div className="flex flex-col gap-0">
              {[
                { k:"Location",   v:"Jodhpur, Rajasthan",  c:"" },
                { k:"Timezone",   v:"IST (UTC+5:30)",       c:"" },
                { k:"Experience", v:"2+ Years",             c:"" },
                { k:"Repos",      v:"9+ Public",            c:"" },
                { k:"GitHub",     v:"@Karandaiya88",        c:"text-[#00f5ff]" },
                { k:"LinkedIn",   v:"karan-d88",            c:"text-[#a855f7]" },
                { k:"Work Mode",  v:"Remote & On-site",     c:"" },
              ].map(({ k,v,c }) => (
                <div key={k} className="flex justify-between py-2 border-b border-white/[0.06]
                  last:border-none text-[12.5px]">
                  <span className="text-white/35">{k}</span>
                  <span className={`font-semibold text-white ${c}`}>{v}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Achievement badges */}
          <motion.div initial={{ opacity:0,y:14 }} animate={inView?{opacity:1,y:0}:{}}
            transition={{ duration:0.6,delay:0.25, ease:[0.22,0.68,0,1.2] }}
            className="flex gap-2 flex-wrap">
            {["🦈 Pull Shark","⚡ Quickdraw","#BuildInPublic"].map((a) => (
              <span key={a} className="px-3 py-1.5 rounded-full text-[10.5px] font-bold
                bg-[#34d399]/8 border border-[#34d399]/20 text-[#34d399]">{a}</span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Marquee tech strip ── */}
      <motion.div initial={{ opacity:0 }} animate={inView?{opacity:1}:{}}
        transition={{ duration:0.8,delay:0.4 }}
        className="mt-16 -mx-[5vw] px-0 py-4 border-t border-b border-white/[0.06]
          bg-white/[0.012] overflow-hidden">
        <div className="flex marquee-track gap-0">
          {TECH_MARQUEE.map((t,i) => (
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