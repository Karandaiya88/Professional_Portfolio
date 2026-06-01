"use client";
// src/sections/Contact.tsx — Fully Working with Resend API

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import SectionWrapper from "@/components/SectionWrapper";
import SectionHeader from "@/components/SectionHeader";

const INQUIRY_TYPES = [
  "Full-time Job Offer",
  "Freelance Project",
  "Collaboration",
  "Open Source",
  "General Question",
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

const INPUT = `w-full px-4 py-3 bg-white/[0.04] border border-white/[0.1]
  rounded-[12px] text-white font-body text-[13.5px] placeholder-white/25
  outline-none transition-all duration-250
  focus:border-[#00f5ff]/40 focus:bg-[#00f5ff]/[0.04]
  focus:shadow-[0_0_0_3px_rgba(0,245,255,0.07)]`;

// ── Toast types ──
type ToastType = "success" | "error" | "loading" | null;

export default function Contact() {
  // Form fields
  const [name,        setName]        = useState("");
  const [email,       setEmail]       = useState("");
  const [inquiryType, setInquiryType] = useState("");
  const [subject,     setSubject]     = useState("");
  const [message,     setMessage]     = useState("");

  // UI state
  const [loading,   setLoading]   = useState(false);
  const [toast,     setToast]     = useState<ToastType>(null);
  const [toastMsg,  setToastMsg]  = useState("");

  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 });

  // ── Show toast helper ──
  const showToast = (type: ToastType, msg: string, duration = 5000) => {
    setToast(type);
    setToastMsg(msg);
    if (type !== "loading") {
      setTimeout(() => setToast(null), duration);
    }
  };

  // ── Form Submit ──
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!name.trim() || !email.trim() || !message.trim()) {
      showToast("error", "⚠️ Name, email aur message required hain!");
      return;
    }

    // Email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast("error", "⚠️ Valid email address daalo!");
      return;
    }

    setLoading(true);
    showToast("loading", "📤 Message bheja ja raha hai...");

    try {
      const res = await fetch("/api/contact", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, inquiryType, subject, message }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        showToast("success", "✅ Message bhej diya! Main jald reply karunga 🚀");
        // Reset form
        setName(""); setEmail(""); setInquiryType("");
        setSubject(""); setMessage("");
      } else {
        showToast("error", `❌ ${data.error ?? "Kuch galat hua, dobara try karo."}`);
      }
    } catch {
      showToast("error", "❌ Network error. Internet check karo aur dobara try karo.");
    } finally {
      setLoading(false);
    }
  };

  // Toast styles
  const toastStyles: Record<string, string> = {
    success: "bg-[#34d399]/10 border-[#34d399]/30 text-[#34d399] shadow-[0_0_30px_rgba(52,211,153,0.15)]",
    error:   "bg-[#f472b6]/10 border-[#f472b6]/30 text-[#f472b6] shadow-[0_0_30px_rgba(244,114,182,0.15)]",
    loading: "bg-[#00f5ff]/9  border-[#00f5ff]/28 text-[#00f5ff]  shadow-[0_0_30px_rgba(0,245,255,0.15)]",
  };

  return (
    <SectionWrapper id="contact" alt>
      <SectionHeader
        eyebrow="Contact"
        heading={<>Let&apos;s Build Something <span className="grad-text">Extraordinary</span></>}
      />

      <div ref={ref}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mt-12 items-start">

        {/* ── Left: Working Form ── */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 22 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 0.68, 0, 1.2] }}
          className="glass-card rounded-[22px] p-6 sm:p-7 flex flex-col gap-4"
        >
          {/* Form header */}
          <div className="mb-1">
            <h3 className="font-display text-[20px] sm:text-[22px] font-black
              tracking-[-1px] mb-1.5">
              Get In Touch
            </h3>
            <p className="text-white/50 text-[13px] leading-relaxed">
              Based in Jodhpur — working globally. Response within 24 hours.
            </p>
          </div>

          {/* Name + Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-black tracking-[0.1em]
                uppercase text-white/30 mb-1.5">
                Name <span className="text-[#f472b6]">*</span>
              </label>
              <input
                type="text"
                placeholder="Tumhara naam"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                className={INPUT}
              />
            </div>
            <div>
              <label className="block text-[10px] font-black tracking-[0.1em]
                uppercase text-white/30 mb-1.5">
                Email <span className="text-[#f472b6]">*</span>
              </label>
              <input
                type="email"
                placeholder="tumhara@email.com"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className={INPUT}
              />
            </div>
          </div>

          {/* Inquiry Type */}
          <div>
            <label className="block text-[10px] font-black tracking-[0.1em]
              uppercase text-white/30 mb-1.5">
              Inquiry Type
            </label>
            <select
              value={inquiryType}
              onChange={e => setInquiryType(e.target.value)}
              className={`${INPUT} cursor-pointer`}
            >
              <option value="" style={{ background: "#0d0b1e" }}>
                Select karo...
              </option>
              {INQUIRY_TYPES.map(t => (
                <option key={t} value={t} style={{ background: "#0d0b1e" }}>{t}</option>
              ))}
            </select>
          </div>

          {/* Subject */}
          <div>
            <label className="block text-[10px] font-black tracking-[0.1em]
              uppercase text-white/30 mb-1.5">
              Subject
            </label>
            <input
              type="text"
              placeholder="Kya baat karni hai?"
              value={subject}
              onChange={e => setSubject(e.target.value)}
              className={INPUT}
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-[10px] font-black tracking-[0.1em]
              uppercase text-white/30 mb-1.5">
              Message <span className="text-[#f472b6]">*</span>
            </label>
            <textarea
              rows={4}
              placeholder="Apna project, idea ya opportunity batao..."
              required
              value={message}
              onChange={e => setMessage(e.target.value)}
              className={`${INPUT} resize-none`}
            />
          </div>

          {/* Interest chips */}
          <div className="p-3 bg-[#00f5ff]/[0.04] border border-[#00f5ff]/12 rounded-[12px]">
            <p className="text-[9.5px] font-black text-[#00f5ff] tracking-widest
              uppercase mb-2">
              Currently interested in:
            </p>
            <div className="flex flex-wrap gap-1.5">
              {INTERESTS.map(({ label, t }) => (
                <span key={label}
                  className={`px-2 py-0.5 rounded-full text-[10.5px]
                    font-semibold border ${PILL[t]}`}>
                  {label}
                </span>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3.5 rounded-[12px] text-[15px] font-black
              tracking-wide transition-all duration-200
              ${loading
                ? "bg-white/10 text-white/40 cursor-not-allowed border border-white/10"
                : "bg-gradient-to-r from-[#00f5ff] to-[#7c3aed] text-[#020010] cursor-pointer hover:-translate-y-0.5 hover:shadow-[0_0_55px_rgba(0,245,255,0.4)] shadow-[0_0_32px_rgba(0,245,255,0.22)]"
              }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white
                  rounded-full animate-spin" />
                Bheja ja raha hai...
              </span>
            ) : (
              "Send Message →"
            )}
          </button>

          {/* Form note */}
          <p className="text-[11px] text-white/25 text-center">
            * Required fields. Main 24 ghante mein reply karunga.
          </p>
        </motion.form>

        {/* ── Right: Photo + Info ── */}
        <motion.div
          initial={{ opacity: 0, x: 28 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 0.68, 0, 1.2] }}
          className="flex flex-col gap-5"
        >
          {/* Photo card */}
          <div className="relative rounded-[22px] overflow-hidden glass-card float-y"
            style={{ height: "380px" }}>
            <Image
              src="/images/karan-hero.png"
              alt="Karan Daiya"
              fill
              className="object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t
              from-[#030014] via-[#030014]/30 to-transparent" />
            <div className="absolute inset-0 rounded-[22px]"
              style={{ boxShadow: "inset 0 0 0 1px rgba(0,245,255,0.15)" }} />

            {/* Info overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
              <p className="font-display text-[20px] sm:text-[22px] font-black
                tracking-[-0.5px] mb-0.5">
                Karan Daiya
              </p>
              <p className="text-[12px] text-white/50 mb-4">
                Full-Stack Developer & AI Engineer
              </p>
              <div className="flex flex-col gap-1.5">
                {[
                  { icon: "📍", text: "Jodhpur, Rajasthan, India" },
                  { icon: "⚡", text: "Response within 24 hours"  },
                  { icon: "🌍", text: "Open to remote & on-site"  },
                ].map(({ icon, text }) => (
                  <div key={text}
                    className="flex items-center gap-2 text-[12px] sm:text-[12.5px] text-white/55">
                    <span>{icon}</span>{text}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Social links */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "GitHub",    href: "https://github.com/Karandaiya88",            icon: "⌨️" },
              { label: "LinkedIn",  href: "https://www.linkedin.com/in/karan-d88/",     icon: "💼" },
              { label: "Instagram", href: "https://www.instagram.com/exclusive.karan/", icon: "📸" },
            ].map(({ label, href, icon }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                className="flex flex-col items-center gap-1.5 py-3 glass-card
                  rounded-[14px] hover:border-[#00f5ff]/22 hover:-translate-y-1
                  transition-all duration-200 text-center">
                <span className="text-[20px]">{icon}</span>
                <span className="text-[11px] font-bold text-white/50">{label}</span>
              </a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Toast Notification ── */}
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast}
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            animate={{ opacity: 1, y: 0,  scale: 1 }}
            exit={{ opacity: 0, y: 60, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.22, 0.68, 0, 1.2] }}
            className={`fixed bottom-6 right-4 sm:bottom-8 sm:right-8 z-50
              px-4 sm:px-5 py-3 sm:py-3.5 rounded-[14px] text-[13px] font-bold
              backdrop-blur-xl border max-w-[90vw] sm:max-w-sm
              ${toastStyles[toast]}`}
          >
            {toastMsg}
          </motion.div>
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
}
