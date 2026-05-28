"use client";
// src/sections/Contact.tsx — Premium form with floating labels + AnimatePresence toast

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import SectionWrapper from "@/components/SectionWrapper";
import SectionHeader from "@/components/SectionHeader";

const INQUIRY_TYPES = [
  "Full-time Job Offer","Freelance Project","Collaboration",
  "Open Source","General Question",
];
const INTERESTS = [
  { label:"AI/Agentic Systems", t:"cyan"   },
  { label:"Full-Stack SaaS",    t:"purple" },
  { label:"Fintech / RegTech",  t:"green"  },
  { label:"Frontend Eng.",      t:"pink"   },
];
const PILL: Record<string,string> = {
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
  const { ref, inView }       = useInView({ triggerOnce:true, threshold:0.08 });

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

      <div ref={ref} className="grid grid-cols-2 gap-20 mt-12 items-start">

        {/* ── Left info ── */}
        <motion.div initial={{ opacity:0,y:22 }} animate={inView?{opacity:1,y:0}:{}}
          transition={{ duration:0.7,ease:[0.22,0.68,0,1.2] }}>
          <h3 className="font-display text-[24px] font-black tracking-[-1px] mb-3">
            Get In Touch
          </h3>
          <p className="text-white/55 text-[14px] leading-relaxed mb-7">
            Open to full-time roles, freelance contracts, and interesting collaborations.
            Based in Jodhpur — working globally. I respond within 24 hours.
          </p>
          <div className="flex flex-col gap-3 mb-8">
            {[
              { icon:"📍", text:"Jodhpur, Rajasthan, India" },
              { icon:"⏱",  text:"Response time: < 24 hours" },
              { icon:"🌍", text:"Open to remote & on-site"  },
              { icon:"💻", text:"Full-stack · AI/ML · Frontend" },
            ].map(({ icon,text }) => (
              <div key={text} className="flex items-center gap-3 text-[13.5px] text-white/55">
                <span className="w-8 h-8 rounded-[9px] bg-white/[0.05] border border-white/[0.08]
                  flex items-center justify-center text-[15px] flex-shrink-0">{icon}</span>
                {text}
              </div>
            ))}
          </div>
          {/* Interest chips */}
          <div className="p-4 bg-[#00f5ff]/[0.04] border border-[#00f5ff]/14 rounded-[16px]">
            <p className="text-[10.5px] font-black text-[#00f5ff] tracking-widest uppercase mb-3">
              Currently interested in:
            </p>
            <div className="flex flex-wrap gap-2">
              {INTERESTS.map(({ label,t }) => (
                <span key={label} className={`px-2.5 py-1 rounded-full text-[11px]
                  font-semibold border ${PILL[t]}`}>{label}</span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── Form ── */}
        <motion.form ref={formRef} onSubmit={submit}
          initial={{ opacity:0,y:22 }} animate={inView?{opacity:1,y:0}:{}}
          transition={{ duration:0.7,delay:0.12,ease:[0.22,0.68,0,1.2] }}
          className="glass-card rounded-[22px] p-7 flex flex-col gap-4">
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
              <option value="" style={{ background:"#0d0b1e" }}>Select type...</option>
              {INQUIRY_TYPES.map(t => <option key={t} value={t} style={{ background:"#0d0b1e" }}>{t}</option>)}
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
          <button type="submit" disabled={loading}
            className="w-full py-3.5 bg-gradient-to-r from-[#00f5ff] to-[#7c3aed]
              rounded-[12px] text-[#020010] text-[15px] font-black tracking-wide
              hover:-translate-y-0.5 hover:shadow-[0_0_55px_rgba(0,245,255,0.4)]
              disabled:opacity-60 disabled:cursor-not-allowed
              transition-all duration-200 shadow-[0_0_32px_rgba(0,245,255,0.22)]">
            {loading ? "Sending..." : "Send Message →"}
          </button>
        </motion.form>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {sent && (
          <motion.div
            initial={{ opacity:0,y:60 }} animate={{ opacity:1,y:0 }} exit={{ opacity:0,y:60 }}
            transition={{ duration:0.45,ease:[0.22,0.68,0,1.2] }}
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