// src/components/Footer.tsx — Mobile responsive
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/[0.07] px-4 sm:px-6 lg:px-[5vw] py-6
      flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-center sm:text-left">
      <Link href="#hero" className="font-display text-[20px] font-black grad-text">KD.</Link>
      <p className="text-[11.5px] sm:text-[12px] text-white/25 order-last sm:order-none">
        © 2025 Karan Daiya · Jodhpur, India · Built with Next.js &amp; Framer Motion
      </p>
      <div className="flex gap-4 sm:gap-5">
        {[["About","#about"],["Projects","#projects"],["Contact","#contact"]].map(([l,h])=>(
          <Link key={h} href={h}
            className="text-[12.5px] text-white/28 hover:text-[#00f5ff] transition-colors">{l}</Link>
        ))}
      </div>
    </footer>
  );
}
