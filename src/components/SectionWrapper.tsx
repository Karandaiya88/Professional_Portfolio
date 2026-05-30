"use client";
// src/components/SectionWrapper.tsx — Mobile responsive padding

import { useRef, useEffect, ReactNode } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

interface Props {
  id: string;
  children: ReactNode;
  className?: string;
  alt?: boolean;
}

export default function SectionWrapper({ id, children, className="", alt=false }: Props) {
  const ref      = useRef<HTMLElement>(null);
  const inView   = useInView(ref, { once:true, margin:"-60px" });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [inView, controls]);

  return (
    <motion.section id={id} ref={ref}
      initial="hidden" animate={controls}
      variants={{
        hidden:  { opacity:0, y:36 },
        visible: { opacity:1, y:0, transition:{ duration:0.75, ease:[0.22,0.68,0,1.2] } },
      }}
      className={`relative z-10 ${alt ? "bg-white/[0.012]" : ""} ${className}`}>
      {/* Mobile: px-4 py-16, Tablet: px-6 py-20, Desktop: px-[5vw] py-28 */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-[5vw] py-16 sm:py-20 lg:py-28">
        {children}
      </div>
    </motion.section>
  );
}
