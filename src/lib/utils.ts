import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export const THEME = {
  cyan:   { pill: "bg-[#00f5ff]/8 border-[#00f5ff]/22 text-[#00f5ff]",   icon: "bg-[#00f5ff]/10 border-[#00f5ff]/20",   badge: "bg-[#00f5ff]/7 border-[#00f5ff]/18 text-[#00f5ff]"   },
  purple: { pill: "bg-[#a855f7]/8 border-[#a855f7]/22 text-[#a855f7]",   icon: "bg-[#7c3aed]/14 border-[#a855f7]/22",   badge: "bg-[#a855f7]/7 border-[#a855f7]/18 text-[#a855f7]"   },
  green:  { pill: "bg-[#34d399]/8 border-[#34d399]/22 text-[#34d399]",   icon: "bg-[#34d399]/10 border-[#34d399]/20",   badge: "bg-[#34d399]/8 border-[#34d399]/20 text-[#34d399]"   },
  pink:   { pill: "bg-[#f472b6]/8 border-[#f472b6]/22 text-[#f472b6]",   icon: "bg-[#f472b6]/10 border-[#f472b6]/20",   badge: "bg-[#f472b6]/7 border-[#f472b6]/18 text-[#f472b6]"   },
} as const;
