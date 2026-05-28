// src/components/Footer.tsx
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/[0.07] px-[5vw] py-6
      flex flex-wrap items-center justify-between gap-4">
      <Link href="#hero" className="font-display text-[20px] font-black grad-text">
        KD.
      </Link>
      <p className="text-[12px] text-white/30">
        © 2025 Karan Daiya · Jodhpur, India · Built with Next.js, Three.js &amp; Framer Motion
      </p>
      <div className="flex gap-5">
        {[
          { label: "About",    href: "#about" },
          { label: "Projects", href: "#projects" },
          { label: "Contact",  href: "#contact" },
        ].map(({ label, href }) => (
          <Link
            key={href}
            href={href}
            className="text-[12.5px] text-white/30 hover:text-[#00f5ff] transition-colors"
          >
            {label}
          </Link>
        ))}
      </div>
    </footer>
  );
}
