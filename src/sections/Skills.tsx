"use client";
// src/sections/Skills.tsx — Mobile Responsive

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";
import SectionWrapper from "@/components/SectionWrapper";
import SectionHeader from "@/components/SectionHeader";
import { skillCategories, proficiencyBars } from "@/data/portfolio";

const ROLE_SKILLS = [
  { icon:"⚡", label:"Frontend\nDev",    color:"#00f5ff", glow:"rgba(0,245,255,0.25)"   },
  { icon:"🤖", label:"AI\nEngineer",     color:"#a855f7", glow:"rgba(168,85,247,0.25)"  },
  { icon:"🛠",  label:"Backend\nDev",    color:"#34d399", glow:"rgba(52,211,153,0.25)"  },
  { icon:"🗄",  label:"Database\nEng.",  color:"#f472b6", glow:"rgba(244,114,182,0.25)" },
  { icon:"🚀",  label:"DevOps\nEng.",    color:"#fbbf24", glow:"rgba(251,191,36,0.25)"  },
];
const PILL_THEME: Record<string,string> = {
  cyan:   "bg-[#00f5ff]/8 border border-[#00f5ff]/22 text-[#00f5ff]",
  purple: "bg-[#a855f7]/8 border border-[#a855f7]/22 text-[#a855f7]",
  green:  "bg-[#34d399]/8 border border-[#34d399]/22 text-[#34d399]",
  pink:   "bg-[#f472b6]/8 border border-[#f472b6]/22 text-[#f472b6]",
};

function CounterNumber({ value, inView }: { value:number; inView:boolean }) {
  const [d, setD] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let s = 0; const step = value/30;
    const id = setInterval(() => {
      s += step;
      if (s >= value) { setD(value); clearInterval(id); }
      else setD(Math.round(s));
    }, 35);
    return () => clearInterval(id);
  }, [inView, value]);
  return <>{d}</>;
}

export default function Skills() {
  const { ref:roleRef, inView:roleIn } = useInView({ triggerOnce:true, threshold:0.1 });
  const { ref:catRef,  inView:catIn  } = useInView({ triggerOnce:true, threshold:0.1 });
  const { ref:barRef,  inView:barIn  } = useInView({ triggerOnce:true, threshold:0.2 });

  return (
    <SectionWrapper id="skills" alt>
      <SectionHeader eyebrow="Skills" heading="My Technical Arsenal"
        sub="Full-spectrum engineering — from pixel-perfect frontends to autonomous AI agents." />

      {/* Oval Role Cards */}
      <div ref={roleRef}
        className="flex justify-center gap-3 sm:gap-5 mt-10 flex-wrap">
        {ROLE_SKILLS.map((role,i) => (
          <motion.div key={i}
            initial={{ opacity:0,y:30,scale:0.85 }}
            animate={roleIn?{opacity:1,y:0,scale:1}:{}}
            transition={{ duration:0.6,delay:i*0.1,ease:[0.22,0.68,0,1.2] }}
            whileHover={{ y:-8,scale:1.05 }}
            className="flex flex-col items-center gap-2 sm:gap-3 cursor-default"
            style={{ animation:roleIn?`floatY ${3.5+i*0.3}s ease-in-out infinite`:"none",
              animationDelay:`${i*0.4}s` }}>
            <div className="w-[80px] h-[105px] sm:w-[100px] sm:h-[130px] lg:w-[110px] lg:h-[140px]
              rounded-[50px] flex items-center justify-center border relative overflow-hidden
              transition-all duration-300"
              style={{ background:`radial-gradient(circle at 50% 30%,${role.glow},rgba(255,255,255,0.03) 70%)`,
                borderColor:`${role.color}30`,
                boxShadow:`0 0 30px ${role.glow},inset 0 1px 0 rgba(255,255,255,0.08)` }}>
              <div className="absolute inset-0 rounded-[50px]"
                style={{ background:`radial-gradient(circle at 50% 0%,${role.color}15,transparent 65%)` }} />
              <span className="text-[30px] sm:text-[36px] lg:text-[40px] relative z-10">{role.icon}</span>
            </div>
            <p className="text-[11px] sm:text-[12.5px] font-bold text-center text-white/70
              leading-tight whitespace-pre-line">
              {role.label}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="my-10 sm:my-14 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Skill Category Cards — 1 col mobile, 2 col desktop */}
      <div ref={catRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {skillCategories.map((cat,i) => (
          <motion.div key={cat.title}
            initial={{ opacity:0,y:22 }} animate={catIn?{opacity:1,y:0}:{}}
            transition={{ duration:0.6,delay:i*0.1,ease:[0.22,0.68,0,1.2] }}
            className="glass-card card-shimmer rounded-[18px] sm:rounded-[20px] p-4 sm:p-5
              transition-all duration-300 hover:border-white/18">
            <h3 className="font-display text-[13px] sm:text-[14px] font-bold mb-3 sm:mb-4
              flex items-center gap-2">
              <span>{cat.icon}</span> {cat.title}
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {cat.skills.map(skill => (
                <span key={skill}
                  className={`px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full
                    text-[10.5px] sm:text-[11px] font-semibold
                    hover:-translate-y-0.5 transition-transform duration-150 cursor-default
                    ${PILL_THEME[cat.theme]}`}>
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Proficiency Bars — 1 col mobile, 2 col desktop */}
      <div ref={barRef} className="mt-10 sm:mt-14">
        <p className="inline-flex items-center gap-2 text-[10.5px] font-black
          tracking-[0.14em] uppercase text-[#00f5ff] mb-5 sm:mb-7
          before:content-[''] before:w-7 before:h-px before:bg-[#00f5ff]">
          Proficiency Levels
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12">
          {[proficiencyBars.slice(0,4), proficiencyBars.slice(4)].map((col,ci) => (
            <div key={ci}>
              {col.map((bar,bi) => (
                <motion.div key={bar.name}
                  initial={{ opacity:0,x:-12 }} animate={barIn?{opacity:1,x:0}:{}}
                  transition={{ duration:0.5,delay:bi*0.09 }}
                  className="mb-4 sm:mb-5">
                  <div className="flex justify-between mb-1.5">
                    <span className="text-[12.5px] sm:text-[13px] font-semibold">{bar.name}</span>
                    <span className="text-[11.5px] sm:text-[12px] font-black text-[#00f5ff] font-mono">
                      <CounterNumber value={bar.pct} inView={barIn} />%
                    </span>
                  </div>
                  <div className="h-[5px] bg-white/[0.07] rounded-full overflow-hidden relative">
                    <motion.div className="h-full rounded-full"
                      style={{ background:"linear-gradient(90deg,#00f5ff,#a855f7)",
                        boxShadow:"0 0 10px rgba(0,245,255,0.4)" }}
                      initial={{ width:0 }}
                      animate={barIn?{ width:`${bar.pct}%` }:{ width:0 }}
                      transition={{ duration:1.4,delay:bi*0.1,ease:[0.22,0.68,0,1.2] }} />
                    <motion.div
                      className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5
                        rounded-full bg-[#00f5ff] shadow-[0_0_8px_#00f5ff]"
                      initial={{ left:"0%",opacity:0 }}
                      animate={barIn?{ left:`${bar.pct-1}%`,opacity:1 }:{ left:"0%",opacity:0 }}
                      transition={{ duration:1.4,delay:bi*0.1,ease:[0.22,0.68,0,1.2] }} />
                  </div>
                </motion.div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
