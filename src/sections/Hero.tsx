"use client";
// src/sections/Hero.tsx — Premium 3D Hero with typewriter + 3D tilt canvas + floating shapes

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { stats } from "@/data/portfolio";

// ── Typewriter Hook ──
function useTypewriter(words: string[], speed = 80, pause = 1800) {
  const [display, setDisplay] = useState("");
  const [wi, setWi]           = useState(0);
  const [ci, setCi]           = useState(0);
  const [del, setDel]         = useState(false);

  useEffect(() => {
    const word  = words[wi];
    const delay = del ? speed / 2 : speed;
    const t = setTimeout(() => {
      if (!del && ci < word.length) {
        setDisplay(word.slice(0, ci + 1)); setCi(ci + 1);
      } else if (!del && ci === word.length) {
        setTimeout(() => setDel(true), pause);
      } else if (del && ci > 0) {
        setDisplay(word.slice(0, ci - 1)); setCi(ci - 1);
      } else {
        setDel(false); setWi((wi + 1) % words.length);
      }
    }, delay);
    return () => clearTimeout(t);
  }, [ci, del, wi, words, speed, pause]);

  return display;
}

// ── 3D Canvas with Tilt ──
function HeroCanvas() {
  const ref  = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateX = useSpring(useTransform(rawY, [-1, 1], [14, -14]), { stiffness: 200, damping: 28 });
  const rotateY = useSpring(useTransform(rawX, [-1, 1], [-14, 14]), { stiffness: 200, damping: 28 });

  const handleMouse = (e: React.MouseEvent) => {
    const el = ref.current; if (!el) return;
    const r  = el.getBoundingClientRect();
    rawX.set(((e.clientX - r.left) / r.width  - 0.5) * 2);
    rawY.set(((e.clientY - r.top)  / r.height - 0.5) * 2);
  };

  const PARTICLES = [
    { size: 6, color: "#00f5ff", top: "12%", left: "76%", dur: "3.1s" },
    { size: 3, color: "#a855f7", top: "68%", left: "8%",  dur: "4.7s", delay: "-1.3s" },
    { size: 5, color: "#00f5ff", top: "42%", left: "50%", dur: "3.6s", delay: "-2s"   },
    { size: 3, color: "#f472b6", top: "78%", left: "60%", dur: "5.2s", delay: "-0.7s" },
    { size: 4, color: "#a855f7", top: "22%", left: "16%", dur: "4.0s", delay: "-1.8s" },
    { size: 2, color: "#34d399", top: "55%", left: "88%", dur: "3.8s", delay: "-0.4s" },
    { size: 3, color: "#f472b6", top: "35%", left: "30%", dur: "4.4s", delay: "-2.5s" },
  ];

  const BADGES = [
    { label: "FastAPI",  top: "14%", left: "4%",    right: "auto", delay: "0s"   },
    { label: "Next.js",  top: "72%", left: "3%",    right: "auto", delay: "0.5s" },
    { label: "Groq AI",  top: "14%", left: "auto",  right: "4%",   delay: "1s"   },
    { label: "Docker",   top: "72%", left: "auto",  right: "3%",   delay: "1.5s" },
  ];

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={() => { rawX.set(0); rawY.set(0); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 900 }}
      className="relative w-full h-[500px] rounded-[28px] border border-white/[0.09]
        bg-white/[0.03] backdrop-blur-xl overflow-hidden flex items-center justify-center
        float-y"
    >
      {/* Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(124,58,237,0.25)_0%,rgba(0,245,255,0.07)_45%,transparent_70%)]" />
      {/* Grid */}
      <div className="hero-grid-bg" />
      {/* Corners */}
      {["top-3.5 left-3.5 border-t border-l","top-3.5 right-3.5 border-t border-r",
        "bottom-3.5 left-3.5 border-b border-l","bottom-3.5 right-3.5 border-b border-r"]
        .map((cls, i) => <div key={i} className={`absolute w-5 h-5 ${cls} border-[#00f5ff]/40`} />)}

      {/* Sphere + Rings */}
      <div className="relative w-[220px] h-[220px] flex items-center justify-center"
        style={{ transform: "translateZ(30px)" }}>
        {[
          { cls: "ring-orbit-a", w: "300px", h: "300px", bc: "rgba(0,245,255,0.16)"  },
          { cls: "ring-orbit-b", w: "380px", h: "220px", bc: "rgba(168,85,247,0.16)" },
          { cls: "ring-orbit-c", w: "430px", h: "430px", bc: "rgba(124,58,237,0.1)"  },
        ].map((r, i) => (
          <div key={i} className={`absolute rounded-full border ${r.cls}`}
            style={{ width: r.w, height: r.h, borderColor: r.bc,
              top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />
        ))}

        {/* Sphere */}
        <div className="sphere-spin w-[220px] h-[220px] rounded-full relative flex-shrink-0"
          style={{
            background: "radial-gradient(circle at 30% 30%,rgba(0,245,255,0.95) 0%,rgba(124,58,237,0.88) 36%,rgba(168,85,247,0.68) 60%,rgba(3,0,22,0.96) 100%)",
            boxShadow: "0 0 80px rgba(0,245,255,0.3),0 0 160px rgba(124,58,237,0.18),inset -28px -28px 55px rgba(0,0,0,0.46),inset 24px 24px 48px rgba(0,245,255,0.12)",
          }}>
          <div className="absolute top-[17%] left-[17%] w-[30%] h-[16%] bg-white/20 rounded-full blur-[7px] -rotate-[30deg]" />
          <div className="absolute top-[40%] left-[10%] w-[15%] h-[8%] bg-white/10 rounded-full blur-[4px]" />
        </div>

        {/* Particles */}
        {PARTICLES.map((p, i) => (
          <div key={i} className="absolute rounded-full"
            style={{ width: p.size, height: p.size, background: p.color,
              top: p.top, left: p.left,
              animation: `particleFloat ${p.dur} linear infinite`,
              animationDelay: p.delay ?? "0s",
              boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
            }} />
        ))}
      </div>

      {/* Floating tech badges */}
      {BADGES.map((b, i) => (
        <div key={i}
          className="absolute px-2.5 py-1 text-[10px] font-bold rounded-full
            bg-white/[0.06] border border-white/[0.12] text-white/60 backdrop-blur-sm"
          style={{
            top: b.top, left: b.left, right: b.right,
            animation: `floatY ${3 + i * 0.4}s ease-in-out infinite`,
            animationDelay: b.delay,
          }}>
          {b.label}
        </div>
      ))}

      {/* R3F label */}
      <p className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-[9px]
        tracking-widest uppercase text-[#00f5ff]/36 whitespace-nowrap select-none">
        {"// <Canvas> — React Three Fiber mount point"}
      </p>
    </motion.div>
  );
}

// ── Animation variants ──
const container = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.11 } },
};
const item = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 0.68, 0, 1.2] } },
};

export default function Hero() {
  const typed = useTypewriter(["AI Engineer", "Full-Stack Dev", "Agent Builder", "Open Source ♥"]);

  return (
    <section id="hero" className="relative z-10 min-h-screen px-[5vw] pt-32 pb-20">
      <div className="max-w-[1280px] mx-auto grid grid-cols-2 gap-16 items-center">

        {/* ── Left: Content ── */}
        <motion.div variants={container} initial="hidden" animate="visible">

          {/* Available badge */}
          <motion.div variants={item}
            className="inline-flex items-center gap-2 mb-6 px-4 py-1.5
              bg-[#00f5ff]/7 border border-[#00f5ff]/22 rounded-full
              text-[10px] font-black tracking-[0.12em] uppercase text-[#00f5ff]">
            <span className="relative flex h-2 w-2">
              <span className="ping-ring opacity-60" />
              <span className="relative w-2 h-2 rounded-full bg-[#00f5ff]" />
            </span>
            Available for Opportunities
          </motion.div>

          {/* Name */}
          <motion.h1 variants={item}
            className="font-display font-black leading-[1.0] tracking-[-3px] mb-2"
            style={{ fontSize: "clamp(50px,5.8vw,78px)" }}>
            Karan<br />
            <span className="grad-text">Daiya</span>
          </motion.h1>

          {/* Typewriter */}
          <motion.p variants={item}
            className="font-display font-semibold text-white/55 mb-5 tracking-[-0.5px] h-8"
            style={{ fontSize: "clamp(16px,2vw,22px)" }}>
            <span className="text-[#a855f7] font-bold typewriter-cursor">{typed}</span>
          </motion.p>

          {/* Description */}
          <motion.p variants={item}
            className="text-white/55 text-[14.5px] leading-[1.9] max-w-[500px] mb-10">
            Building intelligent, agentic systems that bridge AI and beautiful software
            engineering. From autonomous compliance platforms — to digitalizing legacy
            businesses in Jodhpur. I ship production-grade products, fast.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={item} className="flex gap-4 flex-wrap">
            <Link href="#projects"
              className="px-8 py-3.5 bg-gradient-to-r from-[#00f5ff] to-[#7c3aed]
                rounded-full text-[#020010] text-[14px] font-black tracking-wide
                hover:-translate-y-1 transition-all duration-200 inline-block
                shadow-[0_0_35px_rgba(0,245,255,0.22)]
                hover:shadow-[0_0_65px_rgba(0,245,255,0.45)]">
              View My Work ↓
            </Link>
            <Link href="#contact"
              className="px-8 py-3.5 bg-white/[0.04] border border-white/[0.09]
                rounded-full text-white text-[14px] font-semibold backdrop-blur-md
                inline-block hover:bg-white/[0.08] hover:border-[#00f5ff]/30
                hover:text-[#00f5ff] hover:-translate-y-1 transition-all duration-200">
              Get In Touch
            </Link>
          </motion.div>

          {/* Social quick links */}
          <motion.div variants={item} className="flex gap-3 mt-7">
            {[
              { href: "https://github.com/Karandaiya88",             label: "GH" },
              { href: "https://www.linkedin.com/in/karan-d88/",      label: "LI" },
              { href: "https://www.instagram.com/exclusive.karan/",  label: "IG" },
            ].map(({ href, label }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/[0.05] border border-white/[0.1]
                  flex items-center justify-center text-[11px] font-black text-white/40
                  hover:bg-[#00f5ff]/12 hover:border-[#00f5ff]/28 hover:text-[#00f5ff]
                  transition-all duration-200">
                {label}
              </a>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Right: 3D Canvas ── */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 0.68, 0, 1.2] }}>
          <HeroCanvas />
        </motion.div>
      </div>

      {/* ── Stats Bar ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 0.68, 0, 1.2] }}
        className="max-w-[1280px] mx-auto mt-16 rounded-[20px] glass-card glow-border-anim grid"
        style={{ gridTemplateColumns: `repeat(${stats.length}, 1fr)` }}>
        {stats.map((s, i) => (
          <div key={i}
            className={`py-5 text-center ${i < stats.length - 1 ? "border-r border-white/[0.07]" : ""}`}>
            <div className="font-display text-[30px] font-black grad-text leading-none mb-1">
              {s.value}
            </div>
            <div className="text-[10px] font-semibold text-white/45 tracking-widest uppercase">
              {s.label}
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
