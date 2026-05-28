"use client";
// src/components/SectionWrapper.tsx

import { useRef, useEffect, ReactNode } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

interface Props {
  id: string;
  children: ReactNode;
  className?: string;
  alt?: boolean; // alternate background
}

export default function SectionWrapper({ id, children, className = "", alt = false }: Props) {
  const ref      = useRef<HTMLElement>(null);
  const inView   = useInView(ref, { once: true, margin: "-80px" });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [inView, controls]);

  return (
    <motion.section
      id={id}
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden:  { opacity: 0, y: 32 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 0.68, 0, 1.2] } },
      }}
      className={`relative z-10 ${alt ? "bg-white/[0.012]" : ""} ${className}`}
    >
      <div className="max-w-[1200px] mx-auto px-[5vw] py-28">
        {children}
      </div>
    </motion.section>
  );
}
