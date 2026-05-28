# Karan Daiya — Portfolio (Next.js 14)

Premium, dark-themed 3D portfolio built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, and **React Three Fiber**.

---

## 🚀 Quick Start

### 1. Install dependencies

```bash
npm install
# or
yarn install
```

### 2. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for production

```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx       # Root layout + metadata
│   ├── page.tsx         # Main page — assembles all sections
│   └── globals.css      # Global styles + Tailwind
│
├── components/
│   ├── Navbar.tsx        # Fixed nav with active section tracking
│   ├── AmbientOrbs.tsx   # Animated background glows
│   ├── SectionWrapper.tsx # Scroll-reveal animated section container
│   ├── SectionHeader.tsx  # Reusable eyebrow + heading
│   └── Footer.tsx
│
├── sections/             # 9 portfolio sections
│   ├── Hero.tsx          # 3D canvas + hero content
│   ├── About.tsx         # Bio + quick profile card
│   ├── Skills.tsx        # Skill categories + animated bars
│   ├── Projects.tsx      # Interactive glassmorphic project cards
│   ├── Certifications.tsx
│   ├── Resume.tsx        # Download + preview
│   ├── FAQ.tsx           # Accordion FAQ
│   ├── Social.tsx        # GitHub card + social links
│   └── Contact.tsx       # Form with toast notification
│
├── data/
│   └── portfolio.ts      # ← All your personal data here
│
└── lib/
    └── utils.ts          # cn() helper + theme constants
```

---

## ⚙️ Personalization

Open `src/data/portfolio.ts` and update:

```ts
export const personal = {
  email: "karan@example.com",  // 🔁 Your real email
  resumeUrl: "/resume.pdf",    // 🔁 Add resume PDF to /public/
  // ... rest of your info
};
```

Add your `resume.pdf` to the `/public` folder.

---

## 🌐 Deploy to Vercel

```bash
npm install -g vercel
vercel
```

Or push to GitHub and import at [vercel.com](https://vercel.com).

---

## 🔮 Activate React Three Fiber (3D Sphere)

The 3D canvas is already scaffolded with a CSS placeholder. To activate:

```bash
npm install @react-three/fiber @react-three/drei three
```

Then open `src/sections/Hero.tsx`, uncomment the R3F imports and `<Canvas>` block, and remove `<HeroCanvasPlaceholder />`.

---

## 📦 Libraries Used

| Library | Purpose |
|---|---|
| `next` 14 | Framework (App Router, SSR, routing) |
| `framer-motion` | Smooth animations (fade, stagger, accordion) |
| `@react-three/fiber` | 3D canvas (install separately) |
| `@react-three/drei` | 3D helpers (OrbitControls, Float, etc.) |
| `three` | Three.js core |
| `tailwindcss` | Utility-first CSS |
| `typescript` | Type safety |
| `react-intersection-observer` | Scroll-triggered animations |
| `clsx` | Conditional class merging |

---

## 📝 Contact Form

The form currently has a simulated 800ms delay. To connect a real email service:

- **Resend** (recommended): `npm install resend` → create `src/app/api/contact/route.ts`
- **EmailJS**: client-side, no backend needed
- **Formspree**: just change the form action URL

---

## 🎨 Design System

- **Background**: `#030014` (Deep Obsidian Black)
- **Accent 1**: `#00f5ff` (Neon Cyan)
- **Accent 2**: `#a855f7` (Electric Purple)
- **Glass**: `rgba(255,255,255,0.04)` + `backdrop-blur-[14px]`
- **Fonts**: Syne (display) · Space Grotesk (body) · JetBrains Mono (code)
