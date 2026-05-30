"use client";
// src/components/Navbar.tsx — Mobile hamburger menu

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const NAV_ITEMS = [
  { label:"About",    href:"#about"          },
  { label:"Skills",   href:"#skills"         },
  { label:"Projects", href:"#projects"       },
  { label:"Certs",    href:"#certifications" },
  { label:"Resume",   href:"#resume"         },
  { label:"FAQ",      href:"#faq"            },
  { label:"Links",    href:"#social"         },
  { label:"Contact",  href:"#contact"        },
];
const SECTION_IDS = ["hero","about","skills","projects","certifications","resume","faq","social","contact"];

export default function Navbar() {
  const [scrolled,   setScrolled]   = useState(false);
  const [active,     setActive]     = useState("hero");
  const [progress,   setProgress]   = useState(0);
  const [menuOpen,   setMenuOpen]   = useState(false);

  useEffect(() => {
    // Spotlight
    const spot = document.createElement("div");
    spot.className = "spotlight";
    document.body.appendChild(spot);
    const move = (e: MouseEvent) => {
      spot.style.left = e.clientX + "px";
      spot.style.top  = e.clientY + "px";
    };
    window.addEventListener("mousemove", move);

    const onScroll = () => {
      const sy   = window.scrollY;
      setScrolled(sy > 60);
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docH > 0 ? (sy / docH) * 100 : 0);
      let cur = "hero";
      SECTION_IDS.forEach(id => {
        const el = document.getElementById(id);
        if (el && sy >= el.offsetTop - 140) cur = id;
      });
      setActive(cur);
    };

    window.addEventListener("scroll", onScroll, { passive:true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", move);
      document.body.removeChild(spot);
    };
  }, []);

  // Close menu on nav click
  const handleNavClick = () => setMenuOpen(false);

  return (
    <>
      {/* Scroll progress */}
      <div id="scroll-progress" style={{ width:`${progress}%` }} />

      <motion.header
        initial={{ y:-80, opacity:0 }}
        animate={{ y:0,   opacity:1 }}
        transition={{ duration:0.7, ease:[0.22,0.68,0,1.2] }}
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between
          px-4 sm:px-6 lg:px-[5vw] py-3 border-b border-white/[0.07]
          transition-all duration-300
          ${scrolled ? "bg-[#030014]/93 backdrop-blur-2xl" : "bg-[#030014]/70 backdrop-blur-xl"}`}
      >
        {/* Logo */}
        <Link href="#hero" className="font-display text-[22px] font-black grad-text leading-none">
          KD.
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-0.5">
          {NAV_ITEMS.map(({ label, href }) => {
            const isActive = active === href.slice(1);
            return (
              <Link key={href} href={href}
                className={`relative px-3 py-1.5 text-[12.5px] font-medium tracking-wide
                  transition-colors duration-200 group rounded-md
                  ${isActive ? "text-[#00f5ff]" : "text-white/50 hover:text-white"}`}>
                {label}
                <span className={`absolute bottom-0 left-3 right-3 h-[1.5px] rounded-full
                  bg-gradient-to-r from-[#00f5ff] to-[#a855f7] transition-transform
                  duration-250 origin-left
                  ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
              </Link>
            );
          })}
          <a href="https://github.com/Karandaiya88" target="_blank" rel="noopener noreferrer"
            className="ml-3 px-4 py-1.5 text-[11.5px] font-black tracking-widest uppercase
              text-[#00f5ff] bg-[#00f5ff]/10 border border-[#00f5ff]/28 rounded-full
              hover:bg-[#00f5ff]/20 transition-all duration-200">
            GitHub ↗
          </a>
        </nav>

        {/* Right: Available dot + Hamburger */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 text-[11px] font-bold
            text-[#34d399] tracking-widest uppercase">
            <span className="relative flex h-2 w-2">
              <span className="ping-ring" />
              <span className="relative w-2 h-2 rounded-full bg-[#34d399]" />
            </span>
            Available
          </div>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5
              rounded-lg bg-white/[0.05] border border-white/[0.1] transition-all duration-200"
            aria-label="Toggle menu"
          >
            <motion.span animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 7 : 0 }}
              className="w-4 h-[1.5px] bg-white rounded-full block origin-center" />
            <motion.span animate={{ opacity: menuOpen ? 0 : 1 }}
              className="w-4 h-[1.5px] bg-white rounded-full block" />
            <motion.span animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -7 : 0 }}
              className="w-4 h-[1.5px] bg-white rounded-full block origin-center" />
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity:0, y:-10 }}
            animate={{ opacity:1, y:0 }}
            exit={{ opacity:0, y:-10 }}
            transition={{ duration:0.25, ease:[0.22,0.68,0,1.2] }}
            className="fixed top-[57px] left-0 right-0 z-40 lg:hidden
              bg-[#030014]/96 backdrop-blur-2xl border-b border-white/[0.07]
              px-4 py-4"
          >
            <div className="flex flex-col gap-1 max-w-sm mx-auto">
              {NAV_ITEMS.map(({ label, href }) => (
                <Link key={href} href={href} onClick={handleNavClick}
                  className={`px-4 py-3 rounded-[12px] text-[14px] font-semibold
                    transition-all duration-200
                    ${active === href.slice(1)
                      ? "bg-[#00f5ff]/10 text-[#00f5ff] border border-[#00f5ff]/20"
                      : "text-white/60 hover:text-white hover:bg-white/[0.05]"}`}>
                  {label}
                </Link>
              ))}
              <a href="https://github.com/Karandaiya88" target="_blank" rel="noopener noreferrer"
                onClick={handleNavClick}
                className="mt-2 px-4 py-3 rounded-[12px] text-[14px] font-black
                  text-center text-[#00f5ff] bg-[#00f5ff]/10 border border-[#00f5ff]/28">
                GitHub ↗
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
