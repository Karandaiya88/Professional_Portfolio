"use client";
// src/sections/Projects.tsx — Mobile: stacked cards, Desktop: timeline layout

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useRef, useState, useEffect } from "react";
import SectionWrapper from "@/components/SectionWrapper";
import SectionHeader from "@/components/SectionHeader";
import { projects, type Project } from "@/data/portfolio";

const PROJECT_HIGHLIGHTS: Record<string,{ stat:string; label:string; quote:string; reviewer:string }> = {
  aric:          { stat:"7 Days", label:"Full Build Time",   quote:"4 autonomous agents, 14+ regulatory feeds, zero human intervention. The most impressive AI system I've seen built this fast.", reviewer:"🏦 Banking AI · Enterprise" },
  "cloth-store": { stat:"0ms",   label:"Zero Dependencies", quote:"Pure HTML/CSS/JS with instant load times. WhatsApp inquiries tripled within the first month of launch.", reviewer:"🪡 Karan Cloth Store · Jodhpur" },
  jira:          { stat:"LLM",   label:"AI Powered",        quote:"Automatically evaluates Jira ticket quality using LLM analysis. Sprint planning friction reduced significantly.", reviewer:"📋 DevOps Tooling · AI" },
  "portfolio-v1":{ stat:"⚡",    label:"Vite + React",      quote:"Clean, fast portfolio with HMR development workflow. A great showcase of modern frontend tooling.", reviewer:"🚀 Frontend · React" },
  crpf:          { stat:"Gov",   label:"Government Tech",   quote:"Automated tender tracking and document processing for CRPF. Saves hours of manual work every week.", reviewer:"🏛️ Gov-Tech · Python" },
  weather:       { stat:"Live",  label:"Real-time Data",    quote:"Clean weather app with dynamic UI updates based on live conditions. Great use of vanilla JS.", reviewer:"🌦️ Web · API" },
};

const COLOR_MAP: Record<string,string> = {
  cyan:"#00f5ff", purple:"#a855f7", pink:"#f472b6"
};
const BADGE_THEME: Record<string,string> = {
  cyan:   "bg-[#00f5ff]/7 border-[#00f5ff]/18 text-[#00f5ff]",
  purple: "bg-[#a855f7]/7 border-[#a855f7]/18 text-[#a855f7]",
};

function Stars() {
  return <div className="flex gap-0.5 mb-3">
    {[1,2,3,4,5].map(i=><span key={i} className="text-[#fbbf24] text-[12px] sm:text-[13px]">★</span>)}
  </div>;
}

// ── Mobile Card (simple stacked layout) ──
function MobileProjectCard({ project }: { project:Project }) {
  const { ref, inView } = useInView({ triggerOnce:true, threshold:0.08 });
  const highlight = PROJECT_HIGHLIGHTS[project.id] ?? PROJECT_HIGHLIGHTS["weather"];
  const accentColor = COLOR_MAP[project.iconTheme] ?? "#00f5ff";

  return (
    <motion.div ref={ref}
      initial={{ opacity:0,y:24 }} animate={inView?{opacity:1,y:0}:{}}
      transition={{ duration:0.6,ease:[0.22,0.68,0,1.2] }}
      onClick={() => window.open(project.github,"_blank","noopener,noreferrer")}
      className="glass-card rounded-[18px] p-5 cursor-pointer mb-4 last:mb-0
        hover:border-white/20 transition-all duration-300 active:scale-[0.98]"
      style={{ borderColor:`${accentColor}15` }}>
      {/* Top row */}
      <div className="flex items-start gap-3 mb-3">
        <div className="w-10 h-10 rounded-[10px] flex items-center justify-center
          text-[18px] flex-shrink-0"
          style={{ background:`${accentColor}15`, border:`1px solid ${accentColor}25` }}>
          {project.icon}
        </div>
        <div className="flex-1 min-w-0">
          <span className={`inline-block px-2 py-0.5 rounded-full text-[9px]
            font-black tracking-[0.1em] uppercase mb-1 border ${BADGE_THEME[project.badgeTheme]}`}>
            {project.badge}
          </span>
          <h3 className="font-display text-[15px] font-bold leading-tight tracking-[-0.3px]">
            {project.title}
          </h3>
        </div>
      </div>

      <p className="text-[12.5px] text-white/55 leading-relaxed mb-3">{project.description}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {project.tags.slice(0,4).map(tag => (
          <span key={tag} className="px-2 py-0.5 rounded-full text-[10px] font-semibold"
            style={{ background:`${accentColor}10`, border:`1px solid ${accentColor}22`, color:accentColor }}>
            {tag}
          </span>
        ))}
      </div>

      {/* Highlight stat */}
      <div className="flex items-center justify-between pt-3 border-t border-white/[0.07]">
        <div>
          <span className="font-display text-[20px] font-black" style={{ color:accentColor }}>
            {highlight.stat}
          </span>
          <p className="text-[10px] text-white/35 font-bold tracking-wide uppercase">
            {highlight.label}
          </p>
        </div>
        <span className="text-[12px] font-bold text-white/35">GitHub →</span>
      </div>
    </motion.div>
  );
}

// ── Desktop Row (timeline layout) ──
function DesktopProjectRow({ project, index }: { project:Project; index:number }) {
  const { ref, inView } = useInView({ triggerOnce:true, threshold:0.06 });
  const highlight   = PROJECT_HIGHLIGHTS[project.id] ?? PROJECT_HIGHLIGHTS["weather"];
  const accentColor = COLOR_MAP[project.iconTheme] ?? "#00f5ff";
  const cardRef     = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my,[-1,1],[6,-6]),{stiffness:200,damping:30});
  const ry = useSpring(useTransform(mx,[-1,1],[-6,6]),{stiffness:200,damping:30});
  const handleTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current; if (!el) return;
    const r  = el.getBoundingClientRect();
    mx.set(((e.clientX-r.left)/r.width  -0.5)*2);
    my.set(((e.clientY-r.top) /r.height -0.5)*2);
  };

  return (
    <div ref={ref} className="relative grid grid-cols-[1fr_64px_1.6fr] gap-0 mb-14 last:mb-0 items-start">

      {/* Left: Highlight Card */}
      <motion.div
        initial={{ opacity:0,x:-28 }} animate={inView?{opacity:1,x:0}:{}}
        transition={{ duration:0.65,delay:0.1,ease:[0.22,0.68,0,1.2] }}
        className="glass-card card-shimmer rounded-[18px] p-5 mr-5
          hover:-translate-y-1 transition-all duration-300">
        <div className="mb-3">
          <span className="font-display text-[26px] font-black" style={{ color:accentColor }}>
            {highlight.stat}
          </span>
          <p className="text-[10px] font-bold tracking-widest uppercase text-white/35 mt-0.5">
            {highlight.label}
          </p>
        </div>
        <Stars />
        <p className="text-[12.5px] text-white/55 leading-[1.78] mb-4 italic">
          &ldquo;{highlight.quote}&rdquo;
        </p>
        <div className="flex items-center gap-2 pt-3 border-t border-white/[0.07]">
          <div className="w-7 h-7 rounded-full flex items-center justify-center text-[13px]"
            style={{ background:`${accentColor}15`, border:`1px solid ${accentColor}30` }}>
            {project.icon}
          </div>
          <p className="text-[11px] font-semibold" style={{ color:accentColor }}>
            {highlight.reviewer}
          </p>
        </div>
      </motion.div>

      {/* Center: Timeline dot */}
      <div className="flex flex-col items-center">
        {index > 0 && (
          <div className="w-px mb-2" style={{ height:"24px",
            background:`linear-gradient(to bottom,transparent,${accentColor}50)` }} />
        )}
        <motion.div
          initial={{ scale:0,opacity:0 }} animate={inView?{scale:1,opacity:1}:{}}
          transition={{ duration:0.5,delay:0.2,type:"spring",stiffness:220 }}
          className="w-11 h-11 rounded-full flex items-center justify-center text-[18px] z-10"
          style={{ background:`radial-gradient(circle,${accentColor}30,${accentColor}08)`,
            border:`2px solid ${accentColor}`,
            boxShadow:`0 0 18px ${accentColor}50,0 0 36px ${accentColor}18` }}>
          {project.icon}
        </motion.div>
        {index < projects.length-1 && (
          <div className="w-px mt-2" style={{ flex:1,minHeight:"40px",
            background:`linear-gradient(to bottom,${accentColor}50,transparent)` }} />
        )}
      </div>

      {/* Right: Project Card */}
      <motion.div ref={cardRef}
        style={{ rotateX:rx,rotateY:ry,transformStyle:"preserve-3d",perspective:800,
          borderColor:`${accentColor}18` }}
        onMouseMove={handleTilt}
        onMouseLeave={() => { mx.set(0); my.set(0); }}
        initial={{ opacity:0,x:28 }} animate={inView?{opacity:1,x:0}:{}}
        transition={{ duration:0.65,delay:0.15,ease:[0.22,0.68,0,1.2] }}
        onClick={() => window.open(project.github,"_blank","noopener,noreferrer")}
        className="pl-5 glass-card card-shimmer rounded-[20px] p-6 cursor-pointer group
          hover:-translate-y-2 transition-all duration-300
          hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
        <span className={`inline-block px-2.5 py-0.5 rounded-full text-[9.5px]
          font-black tracking-[0.1em] uppercase mb-3 border ${BADGE_THEME[project.badgeTheme]}`}>
          {project.badge}
        </span>
        <h3 className="font-display text-[20px] font-bold tracking-[-0.5px] leading-tight mb-4"
          style={{ transform:"translateZ(10px)" }}>
          {project.title}
        </h3>
        <p className="text-[13px] text-white/55 leading-[1.78] mb-5">{project.description}</p>
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tags.map(tag => (
            <span key={tag} className="px-2 py-0.5 rounded-full text-[10.5px] font-semibold"
              style={{ background:`${accentColor}10`, border:`1px solid ${accentColor}25`, color:accentColor }}>
              {tag}
            </span>
          ))}
        </div>
        <div className="flex gap-5 items-center pt-4 border-t border-white/[0.07]">
          <span className="inline-flex items-center gap-1.5 text-[12px] font-bold
            text-white/35 group-hover:text-white transition-colors">
            View on GitHub
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </span>
          {project.demo && (
            <button onClick={e => { e.stopPropagation(); window.open(project.demo,"_blank","noopener,noreferrer"); }}
              className="inline-flex items-center gap-1.5 text-[12px] font-bold
                bg-transparent border-none cursor-pointer p-0 transition-colors"
              style={{ color:accentColor }}>
              Live Demo
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
              </svg>
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}

// ── Hook to detect mobile ──
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

export default function Projects() {
  const isMobile = useIsMobile();
  return (
    <SectionWrapper id="projects" alt>
      <SectionHeader eyebrow="Projects" heading="Things I've Built"
        sub="Real projects shipped in public — from AI agentic systems to local business digitalization." />
      <div className="mt-10 sm:mt-14">
        {projects.map((p,i) =>
          isMobile
            ? <MobileProjectCard key={p.id} project={p} />
            : <DesktopProjectRow key={p.id} project={p} index={i} />
        )}
      </div>
    </SectionWrapper>
  );
}
