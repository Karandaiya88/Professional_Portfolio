"use client";
// src/sections/FAQ.tsx — Framer Motion AnimatePresence accordion

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import SectionWrapper from "@/components/SectionWrapper";
import SectionHeader from "@/components/SectionHeader";
import { faqs } from "@/data/portfolio";

function FAQItem({ q, a, index }: { q:string; a:string; index:number }) {
  const [open, setOpen] = useState(false);
  const { ref, inView } = useInView({ triggerOnce:true, threshold:0.1 });

  return (
    <motion.div ref={ref}
      initial={{ opacity:0,y:16 }} animate={inView?{opacity:1,y:0}:{}}
      transition={{ duration:0.55,delay:index*0.07,ease:[0.22,0.68,0,1.2] }}
      className={`rounded-[16px] overflow-hidden transition-all duration-250
        ${open ? "glass-card border-[#00f5ff]/22 shadow-[0_0_30px_rgba(0,245,255,0.06)]"
                : "glass-card hover:border-white/14"}`}>
      <button onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4
          text-left cursor-pointer group" aria-expanded={open}>
        <span className={`text-[14px] font-semibold transition-colors duration-200
          ${open ? "text-[#00f5ff]" : "text-white group-hover:text-[#00f5ff]"}`}>
          {q}
        </span>
        <motion.span animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration:0.3 }}
          className={`w-[22px] h-[22px] rounded-full border flex-shrink-0 flex
            items-center justify-center text-[12px] transition-colors duration-300
            ${open ? "bg-[#00f5ff] border-[#00f5ff] text-[#020010]"
                   : "border-white/[0.14] text-white/40"}`}>
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div key="ans"
            initial={{ height:0, opacity:0 }} animate={{ height:"auto", opacity:1 }}
            exit={{ height:0, opacity:0 }}
            transition={{ duration:0.38, ease:[0.22,0.68,0,1.2] }}
            className="overflow-hidden">
            <p className="px-5 pb-5 text-[13.5px] text-white/55 leading-[1.85]">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  return (
    <SectionWrapper id="faq" alt>
      <SectionHeader eyebrow="FAQ" heading="Frequently Asked Questions" />
      <div className="flex flex-col gap-3 mt-10 max-w-[760px]">
        {faqs.map((f,i) => <FAQItem key={i} q={f.q} a={f.a} index={i} />)}
      </div>
    </SectionWrapper>
  );
}