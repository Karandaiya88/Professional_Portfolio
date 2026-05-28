// src/components/SectionHeader.tsx

interface Props {
  eyebrow: string;
  heading: string | React.ReactNode;
  sub?: string;
  center?: boolean;
}

export default function SectionHeader({ eyebrow, heading, sub, center = false }: Props) {
  return (
    <div className={center ? "text-center" : ""}>
      <p
        className={`inline-flex items-center gap-2 text-[10.5px] font-black tracking-[0.14em]
          uppercase text-[#00f5ff] mb-3
          before:content-[''] before:w-7 before:h-px before:bg-[#00f5ff]
          ${center ? "justify-center" : ""}`}
      >
        {eyebrow}
      </p>
      <h2
        className="font-display text-[clamp(32px,4.2vw,52px)] font-black
          tracking-[-2.5px] leading-[1.08] mb-4"
      >
        {heading}
      </h2>
      {sub && <p className="text-white/55 text-[14.5px] max-w-xl leading-relaxed">{sub}</p>}
    </div>
  );
}
