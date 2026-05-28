/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/sections/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#030014",
        cyan: "#00f5ff",
        purple: "#7c3aed",
        "purple-l": "#a855f7",
        pink: "#f472b6",
        green: "#34d399",
      },
      fontFamily: {
        display: ["var(--font-syne)", "sans-serif"],
        body: ["var(--font-space)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        "grad-main": "linear-gradient(135deg, #00f5ff 0%, #a855f7 55%, #f472b6 100%)",
        "grad-btn": "linear-gradient(135deg, #00f5ff, #7c3aed)",
      },
      animation: {
        "spin-slow": "spin 9s linear infinite",
        "ring-a": "ringOrbit 11s linear infinite",
        "ring-b": "ringOrbit 17s linear infinite reverse",
        "ring-c": "ringOrbit 23s linear infinite",
        blink: "blink 2s ease-in-out infinite",
        "float-orb": "floatOrb 14s ease-in-out infinite alternate",
        "particle": "particleFloat 3.5s linear infinite",
      },
      keyframes: {
        ringOrbit: {
          to: { transform: "translate(-50%, -50%) rotate(360deg)" },
        },
        blink: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.2 },
        },
        floatOrb: {
          from: { transform: "translate(0,0) scale(1)" },
          to: { transform: "translate(35px,25px) scale(1.08)" },
        },
        particleFloat: {
          "0%": { opacity: 0.8, transform: "translateY(0) scale(1)" },
          "100%": { opacity: 0, transform: "translateY(-280px) scale(0.3)" },
        },
      },
    },
  },
  plugins: [],
};
