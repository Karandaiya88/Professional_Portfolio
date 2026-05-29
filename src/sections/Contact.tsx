"use client";
// src/sections/Contact.tsx — Image 2 (black suit) shown alongside contact form

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import SectionWrapper from "@/components/SectionWrapper";
import SectionHeader from "@/components/SectionHeader";

const INQUIRY_TYPES = [
  "Full-time Job Offer","Freelance Project","Collaboration",
  "Open Source","General Question",
];
const INTERESTS = [
  { label: "AI/Agentic Systems", t: "cyan"   },
  { label: "Full-Stack SaaS",    t: "purple" },
  { label: "Fintech / RegTech",  t: "green"  },
  { label: "Frontend Eng.",      t: "pink"   },
];
const PILL: Record<string, string> = {
  cyan:   "bg-[#00f5ff]/8 border-[#00f5ff]/22 text-[#00f5ff]",
  purple: "bg-[#a855f7]/8 border-[#a855f7]/22 text-[#a855f7]",
  green:  "bg-[#34d399]/8 border-[#34d399]/22 text-[#34d399]",
  pink:   "bg-[#f472b6]/8 border-[#f472b6]/22 text-[#f472b6]",
};
const INPUT = `w-full px-4 py-3 bg-white/[0.04] border border-white/[0.1] rounded-[12px]
  text-white font-body text-[13.5px] placeholder-white/25 outline-none
  transition-all duration-250
  focus:border-[#00f5ff]/40 focus:bg-[#00f5ff]/[0.04]
  focus:shadow-[0_0_0_3px_rgba(0,245,255,0.07)]`;

export default function Contact() {
  const [sent, setSent]       = useState(false);
  const [loading, setLoading] = useState(false);
  const formRef               = useRef<HTMLFormElement>(null);
  const { ref, inView }       = useInView({ triggerOnce: true, threshold: 0.08 });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    setSent(true); setLoading(false);
    formRef.current?.reset();
    setTimeout(() => setSent(false), 5000);
  }

  return (
    <SectionWrapper id="contact" alt>
      <SectionHeader eyebrow="Contact"
        heading={<>Let&apos;s Build Something <span className="grad-text">Extraordinary</span></>} />

      <div ref={ref} className="grid grid-cols-2 gap-12 mt-12 items-start">

        {/* ── Left: Form ── */}
        <motion.form ref={formRef} onSubmit={submit}
          initial={{ opacity: 0, y: 22 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 0.68, 0, 1.2] }}
          className="glass-card rounded-[22px] p-7 flex flex-col gap-4">

          {/* Info top */}
          <div className="mb-2">
            <h3 className="font-display text-[20px] font-black tracking-[-1px] mb-2">
              Get In Touch
            </h3>
            <p className="text-white/50 text-[13px] leading-relaxed">
              Based in Jodhpur — working globally. Response within 24 hours.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-black tracking-[0.1em] uppercase
                text-white/30 mb-1.5">Name</label>
              <input type="text" placeholder="Your full name" required className={INPUT} />
            </div>
            <div>
              <label className="block text-[10px] font-black tracking-[0.1em] uppercase
                text-white/30 mb-1.5">Email</label>
              <input type="email" placeholder="your@email.com" required className={INPUT} />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black tracking-[0.1em] uppercase
              text-white/30 mb-1.5">Inquiry Type</label>
            <select className={`${INPUT} cursor-pointer`}>
              <option value="" style={{ background: "#0d0b1e" }}>Select type...</option>
              {INQUIRY_TYPES.map(t => (
                <option key={t} value={t} style={{ background: "#0d0b1e" }}>{t}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-black tracking-[0.1em] uppercase
              text-white/30 mb-1.5">Subject</label>
            <input type="text" placeholder="What's this about?" className={INPUT} />
          </div>

          <div>
            <label className="block text-[10px] font-black tracking-[0.1em] uppercase
              text-white/30 mb-1.5">Message</label>
            <textarea rows={4} placeholder="Tell me about your project or idea..."
              className={`${INPUT} resize-none`} />
          </div>

          {/* Interest chips */}
          <div className="p-3 bg-[#00f5ff]/[0.04] border border-[#00f5ff]/12 rounded-[12px]">
            <p className="text-[9.5px] font-black text-[#00f5ff] tracking-widest uppercase mb-2">
              Currently interested in:
            </p>
            <div className="flex flex-wrap gap-1.5">
              {INTERESTS.map(({ label, t }) => (
                <span key={label} className={`px-2 py-0.5 rounded-full text-[10.5px]
                  font-semibold border ${PILL[t]}`}>{label}</span>
              ))}
            </div>
          </div>

          <button type="submit" disabled={loading}
            className="w-full py-3.5 bg-gradient-to-r from-[#00f5ff] to-[#7c3aed]
              rounded-[12px] text-[#020010] text-[15px] font-black tracking-wide
              hover:-translate-y-0.5 hover:shadow-[0_0_55px_rgba(0,245,255,0.4)]
              disabled:opacity-60 disabled:cursor-not-allowed
              transition-all duration-200 shadow-[0_0_32px_rgba(0,245,255,0.22)]">
            {loading ? "Sending..." : "Send Message →"}
          </button>
        </motion.form>

        {/* ── Right: Photo (Image 2 - black suit) ── */}
        <motion.div
          initial={{ opacity: 0, x: 28 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 0.68, 0, 1.2] }}
          className="flex flex-col gap-5"
        >
          {/* Photo card */}
          <div className="relative rounded-[22px] overflow-hidden glass-card float-y"
            style={{ height: "420px" }}>
            <Image
              src="/images/karan-hero.png"
              alt="Karan Daiya"
              fill
              className="object-cover object-top"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t
              from-[#030014] via-[#030014]/30 to-transparent" />

            {/* Cyan glow border */}
            <div className="absolute inset-0 rounded-[22px]"
              style={{ boxShadow: "inset 0 0 0 1px rgba(0,245,255,0.15), 0 0 60px rgba(0,245,255,0.08)" }} />

            {/* Bottom info */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <p className="font-display text-[22px] font-black tracking-[-0.5px] mb-0.5">
                Karan Daiya
              </p>
              <p className="text-[12.5px] text-white/50 mb-3">
                Full-Stack Developer & AI Engineer
              </p>
              {/* Contact info */}
              <div className="flex flex-col gap-1.5">
                {[
                  { icon: "📍", text: "Jodhpur, Rajasthan, India" },
                  { icon: "⚡", text: "Response within 24 hours"  },
                  { icon: "🌍", text: "Open to remote & on-site"  },
                ].map(({ icon, text }) => (
                  <div key={text} className="flex items-center gap-2 text-[12px] text-white/55">
                    <span>{icon}</span>{text}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Social links */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "GitHub",    href: "https://github.com/Karandaiya88",             icon: "⌨️" },
              { label: "LinkedIn",  href: "https://www.linkedin.com/in/karan-d88/",      icon: "💼" },
              { label: "Instagram", href: "https://www.instagram.com/exclusive.karan/",  icon: "📸" },
            ].map(({ label, href, icon }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                className="flex flex-col items-center gap-1.5 py-3 glass-card rounded-[14px]
                  hover:border-[#00f5ff]/22 hover:-translate-y-1 transition-all duration-200">
                <span className="text-[20px]">{icon}</span>
                <span className="text-[11px] font-bold text-white/50">{label}</span>
              </a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {sent && (
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 60 }}
            transition={{ duration: 0.45, ease: [0.22, 0.68, 0, 1.2] }}
            className="fixed bottom-8 right-8 px-5 py-3.5 bg-[#00f5ff]/9
              border border-[#00f5ff]/28 rounded-[14px] text-[#00f5ff]
              text-[13px] font-bold backdrop-blur-xl z-50
              shadow-[0_0_30px_rgba(0,245,255,0.2)]">
            ✓ Message sent! I&apos;ll get back to you soon.
          </motion.div>
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
}
