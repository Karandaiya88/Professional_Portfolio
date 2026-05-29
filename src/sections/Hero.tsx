"use client";
// src/sections/Hero.tsx
// Option A: Photo + 3D Sphere both
// Image 2 (black suit) used for Hero — matches dark theme perfectly

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
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

// ── Hero Visual: Photo + Sphere combo ──
function HeroVisual() {
  const ref  = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateX = useSpring(useTransform(rawY, [-1, 1], [10, -10]), { stiffness: 180, damping: 28 });
  const rotateY = useSpring(useTransform(rawX, [-1, 1], [-10, 10]), { stiffness: 180, damping: 28 });

  const handleMouse = (e: React.MouseEvent) => {
    const el = ref.current; if (!el) return;
    const r  = el.getBoundingClientRect();
    rawX.set(((e.clientX - r.left) / r.width  - 0.5) * 2);
    rawY.set(((e.clientY - r.top)  / r.height - 0.5) * 2);
  };

  const BADGES = [
    { label: "FastAPI",  top: "12%", left: "2%",   right: "auto", delay: "0s"   },
    { label: "Next.js",  top: "75%", left: "2%",   right: "auto", delay: "0.6s" },
    { label: "Groq AI",  top: "12%", left: "auto", right: "2%",   delay: "1.1s" },
    { label: "Docker",   top: "75%", left: "auto", right: "2%",   delay: "1.6s" },
    { label: "Python",   top: "44%", left: "1%",   right: "auto", delay: "0.3s" },
    { label: "Llama 3",  top: "44%", left: "auto", right: "1%",   delay: "0.9s" },
  ];

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={() => { rawX.set(0); rawY.set(0); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 900 }}
      className="relative w-full h-[560px] flex items-center justify-center float-y"
    >
      {/* ── Background: Grid + Glow ── */}
      <div className="absolute inset-0 rounded-[28px] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(124,58,237,0.22)_0%,rgba(0,245,255,0.06)_45%,transparent_70%)]" />
        <div className="hero-grid-bg opacity-40" />
      </div>

      {/* ── 3D Sphere behind photo ── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ transform: "translateZ(-20px)" }}>
        {/* Orbit rings */}
        {[
          { cls: "ring-orbit-a", w: "340px", h: "340px", bc: "rgba(0,245,255,0.1)"  },
          { cls: "ring-orbit-b", w: "420px", h: "240px", bc: "rgba(168,85,247,0.1)" },
          { cls: "ring-orbit-c", w: "480px", h: "480px", bc: "rgba(124,58,237,0.07)"},
        ].map((r, i) => (
          <div key={i} className={`absolute rounded-full border ${r.cls}`}
            style={{ width: r.w, height: r.h, borderColor: r.bc,
              top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />
        ))}

        {/* Glowing orb behind */}
        <div className="absolute w-[260px] h-[260px] rounded-full"
          style={{
            background: "radial-gradient(circle,rgba(0,245,255,0.15) 0%,rgba(124,58,237,0.1) 50%,transparent 70%)",
            filter: "blur(30px)",
          }} />
      </div>

      {/* ── Photo Frame ── */}
      <div className="relative z-10" style={{ transform: "translateZ(30px)" }}>
        {/* Rotating holo border */}
        <div className="absolute inset-[-4px] rounded-full"
          style={{
            background: "linear-gradient(135deg,#00f5ff,#a855f7,#f472b6,#00f5ff)",
            backgroundSize: "300% 300%",
            animation: "holoShift 5s ease infinite, avatarRing 8s linear infinite",
            padding: "3px",
          }} />

        {/* Outer glow ring */}
        <div className="absolute inset-[-12px] rounded-full border border-[#00f5ff]/20
          animate-ping" style={{ animationDuration: "3s" }} />

        {/* Photo container */}
        <div className="relative w-[300px] h-[300px] rounded-full overflow-hidden border-[3px]
          border-[#030014]"
          style={{ boxShadow: "0 0 60px rgba(0,245,255,0.3), 0 0 120px rgba(124,58,237,0.2)" }}
        >
          <Image
            src="/images/karan-hero.png"
            alt="Karan Daiya"
            fill
            className="object-cover object-top"
            priority
          />
          {/* Subtle dark overlay at bottom for blend */}
          <div className="absolute bottom-0 left-0 right-0 h-16
            bg-gradient-to-t from-[#030014]/60 to-transparent" />
        </div>

        {/* Status badge on photo */}
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2
          flex items-center gap-1.5 px-3 py-1.5 rounded-full
          bg-[#030014]/90 border border-[#34d399]/30 backdrop-blur-md whitespace-nowrap">
          <span className="w-2 h-2 rounded-full bg-[#34d399] animate-blink" />
          <span className="text-[11px] font-bold text-[#34d399] tracking-wide">
            Open to Work
          </span>
        </div>
      </div>

      {/* ── Floating tech badges ── */}
      {BADGES.map((b, i) => (
        <div key={i}
          className="absolute px-2.5 py-1 text-[10px] font-bold rounded-full z-20
            bg-white/[0.07] border border-white/[0.14] text-white/65 backdrop-blur-sm"
          style={{
            top: b.top, left: b.left, right: b.right,
            animation: `floatY ${3.2 + i * 0.35}s ease-in-out infinite`,
            animationDelay: b.delay,
          }}>
          {b.label}
        </div>
      ))}

      {/* ── Particles ── */}
      {[
        { size: 5, color: "#00f5ff", top: "20%", left: "75%", dur: "3.2s" },
        { size: 3, color: "#a855f7", top: "65%", left: "8%",  dur: "4.8s", delay: "-1.2s" },
        { size: 4, color: "#f472b6", top: "80%", left: "60%", dur: "5.1s", delay: "-0.6s" },
        { size: 3, color: "#34d399", top: "18%", left: "18%", dur: "4.1s", delay: "-1.7s" },
      ].map((p, i) => (
        <div key={i} className="absolute rounded-full pointer-events-none"
          style={{ width: p.size, height: p.size, background: p.color,
            top: p.top, left: p.left,
            animation: `particleFloat ${p.dur} linear infinite`,
            animationDelay: p.delay ?? "0s",
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
          }} />
      ))}
    </motion.div>
  );
}

// ── Animation variants ──
const container = { hidden: {}, visible: { transition: { staggerChildren: 0.11 } } };
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

          {/* Social links */}
          <motion.div variants={item} className="flex gap-3 mt-7">
            {[
              { href: "https://github.com/Karandaiya88",            label: "GH" },
              { href: "https://www.linkedin.com/in/karan-d88/",     label: "LI" },
              { href: "https://www.instagram.com/exclusive.karan/", label: "IG" },
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

        {/* ── Right: Photo + 3D Visual ── */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 0.68, 0, 1.2] }}>
          <HeroVisual />
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
