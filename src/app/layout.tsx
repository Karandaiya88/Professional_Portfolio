import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Karan Daiya — Full-Stack Developer & AI Engineer",
  description:
    "Portfolio of Karan Daiya, a Full-Stack Developer and AI Engineer from Jodhpur, India. Builder of ARIC — autonomous AI compliance platform for banks.",
  keywords: [
    "Karan Daiya",
    "Full-Stack Developer",
    "AI Engineer",
    "Next.js",
    "FastAPI",
    "Jodhpur",
    "ARIC",
    "Portfolio",
  ],
  authors: [{ name: "Karan Daiya" }],
  openGraph: {
    title: "Karan Daiya — Full-Stack Developer & AI Engineer",
    description:
      "Building intelligent, agentic systems that bridge AI and beautiful software engineering.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
