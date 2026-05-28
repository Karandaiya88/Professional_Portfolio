"use client";
// src/components/AmbientOrbs.tsx — Layered ambient + scroll-reactive orbs + starfield

import { useEffect, useRef } from "react";

function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const STARS = Array.from({ length: 160 }, () => ({
      x:     Math.random() * window.innerWidth,
      y:     Math.random() * window.innerHeight,
      r:     Math.random() * 1.2 + 0.2,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.008 + 0.004,
    }));

    let t = 0;
    let raf: number;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      STARS.forEach((s) => {
        const alpha = 0.15 + 0.5 * Math.sin(s.phase + t * s.speed);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(240,240,255,${alpha})`;
        ctx.fill();
      });
      t++;
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-60" />;
}

export default function AmbientOrbs() {
  return (
    <>
      <Starfield />
      {/* Purple — top left */}
      <div className="animate-float-orb" style={{
        position:"fixed", width:560, height:560, borderRadius:"50%",
        top:-180, left:-180,
        background:"radial-gradient(circle,rgba(124,58,237,0.32),transparent 70%)",
        filter:"blur(110px)", zIndex:0, pointerEvents:"none",
      }}/>
      {/* Cyan — right */}
      <div style={{
        position:"fixed", width:440, height:440, borderRadius:"50%",
        top:"25vh", right:-120,
        background:"radial-gradient(circle,rgba(0,245,255,0.18),transparent 70%)",
        filter:"blur(100px)", zIndex:0, pointerEvents:"none",
        animation:"floatOrb 12s ease-in-out infinite alternate-reverse",
      }}/>
      {/* Purple-light — bottom center */}
      <div style={{
        position:"fixed", width:380, height:380, borderRadius:"50%",
        bottom:"8vh", left:"20%",
        background:"radial-gradient(circle,rgba(168,85,247,0.22),transparent 70%)",
        filter:"blur(95px)", zIndex:0, pointerEvents:"none",
        animation:"floatOrb 16s ease-in-out infinite alternate",
        animationDelay:"-9s",
      }}/>
      {/* Pink — bottom right */}
      <div style={{
        position:"fixed", width:300, height:300, borderRadius:"50%",
        bottom:"18vh", right:"10%",
        background:"radial-gradient(circle,rgba(244,114,182,0.14),transparent 70%)",
        filter:"blur(85px)", zIndex:0, pointerEvents:"none",
        animation:"floatOrb 13s ease-in-out infinite alternate-reverse",
        animationDelay:"-5s",
      }}/>
    </>
  );
}