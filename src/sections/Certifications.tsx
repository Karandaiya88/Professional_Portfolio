"use client";
// src/sections/Certifications.tsx — animated top-line reveal on hover

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import SectionWrapper from "@/components/SectionWrapper";
import SectionHeader from "@/components/SectionHeader";
import { certifications } from "@/data/portfolio";

export default function Certifications() {
  const { ref, inView } = useInView({ triggerOnce:true, threshold:0.1 });
  return (
    <SectionWrapper id="certifications">
      <SectionHeader eyebrow="Certifications" heading="Credentials & Learning"
        sub="Continuous learning is core to how I work — from web fundamentals to LLM engineering." />
      <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
        {certifications.map((cert,i) => (
          <motion.div key={i}
            initial={{ opacity:0,y:22 }} animate={inView?{opacity:1,y:0}:{}}
            transition={{ duration:0.6,delay:i*0.1,ease:[0.22,0.68,0,1.2] }}
            className="relative glass-card card-shimmer rounded-[18px] p-5 overflow-hidden
              hover:border-[#00f5ff]/22 hover:-translate-y-1.5
              transition-all duration-300 group">
            <div className="absolute top-0 left-0 right-0 h-[2px]
              bg-gradient-to-r from-[#00f5ff] to-[#a855f7]
              opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <p className="text-[9.5px] font-black tracking-[0.1em] uppercase text-[#00f5ff] mb-1.5">
              {cert.issuer}</p>
            <h3 className="font-display text-[15px] font-bold tracking-[-0.3px] leading-[1.3] mb-1.5">
              {cert.name}</h3>
            <p className="text-[11.5px] text-white/30 font-mono">{cert.date}</p>
            <span className={`inline-block mt-3 px-2.5 py-0.5 rounded-full text-[9.5px] font-bold
              ${cert.badgeTheme==="cyan"
                ? "bg-[#00f5ff]/8 border border-[#00f5ff]/20 text-[#00f5ff]"
                : "bg-[#34d399]/8 border border-[#34d399]/20 text-[#34d399]"}`}>
              {cert.badgeLabel}
            </span>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
