"use client";

import { useEffect, useRef } from "react";

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const stars: { x: number; y: number; r: number; speed: number; opacity: number; twinkle: number }[] = [];

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function init() {
      stars.length = 0;
      for (let i = 0; i < 160; i++) {
        stars.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          r: Math.random() * 1.2 + 0.2,
          speed: Math.random() * 0.12 + 0.02,
          opacity: Math.random() * 0.6 + 0.2,
          twinkle: Math.random() * Math.PI * 2,
        });
      }
    }

    let t = 0;
    function draw() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.008;

      for (const s of stars) {
        s.twinkle += s.speed * 0.5;
        const op = s.opacity * (0.6 + 0.4 * Math.sin(s.twinkle));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180, 170, 255, ${op})`;
        ctx.fill();

        // slow drift
        s.y -= s.speed * 0.3;
        if (s.y < -2) {
          s.y = canvas.height + 2;
          s.x = Math.random() * canvas.width;
        }
      }

      // subtle moving nebula blobs
      const blobs = [
        { x: canvas.width * 0.2 + Math.sin(t * 0.4) * 40, y: canvas.height * 0.3 + Math.cos(t * 0.3) * 30, r: 220, color: "rgba(124,58,237,0.04)" },
        { x: canvas.width * 0.75 + Math.cos(t * 0.35) * 50, y: canvas.height * 0.6 + Math.sin(t * 0.25) * 40, r: 280, color: "rgba(168,85,247,0.035)" },
        { x: canvas.width * 0.5 + Math.sin(t * 0.2) * 60, y: canvas.height * 0.8 + Math.cos(t * 0.4) * 20, r: 200, color: "rgba(99,102,241,0.03)" },
      ];

      for (const b of blobs) {
        const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
        grad.addColorStop(0, b.color);
        grad.addColorStop(1, "rgba(0,0,0,0)");
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    }

    resize();
    init();
    draw();

    window.addEventListener("resize", () => { resize(); init(); });
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", () => { resize(); init(); });
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.85 }}
    />
  );
}
