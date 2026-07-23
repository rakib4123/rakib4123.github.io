"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  type: "circle" | "square" | "plus" | "ring";
  opacity: number;
  rotation: number;
  rotationSpeed: number;
}

function createParticle(width: number, height: number): Particle {
  const types: Particle["type"][] = ["circle", "square", "plus", "ring"];
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    size: Math.random() * 6 + 3,
    speedX: (Math.random() - 0.5) * 0.4,
    speedY: Math.random() * -0.8 - 0.3,
    type: types[Math.floor(Math.random() * types.length)],
    opacity: Math.random() * 0.25 + 0.08,
    rotation: Math.random() * Math.PI * 2,
    rotationSpeed: (Math.random() - 0.5) * 0.02,
  };
}

export default function AntigravityBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Particle[] = [];
    const mouse = { x: -1000, y: -1000 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const count = Math.min(Math.floor(window.innerWidth / 18), 60);
      for (let i = 0; i < count; i++) {
        particles.push(createParticle(canvas.width, canvas.height));
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    resize();

    let frameId: number;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        // Mouse repel
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 140) {
          const force = (140 - dist) / 140;
          p.x -= (dx / dist) * force * 4;
          p.y -= (dy / dist) * force * 4;
        }

        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;

        if (p.y < -60) {
          p.y = canvas.height + 60;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < -60) p.x = canvas.width + 60;
        if (p.x > canvas.width + 60) p.x = -60;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.opacity;

        // Teal/cyan color family
        ctx.strokeStyle = "#06b6d4";
        ctx.fillStyle = "#06b6d4";
        ctx.lineWidth = 1.5;

        if (p.type === "circle") {
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.type === "ring") {
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.stroke();
        } else if (p.type === "square") {
          ctx.strokeRect(-p.size, -p.size, p.size * 2, p.size * 2);
        } else {
          ctx.beginPath();
          ctx.moveTo(-p.size, 0);
          ctx.lineTo(p.size, 0);
          ctx.moveTo(0, -p.size);
          ctx.lineTo(0, p.size);
          ctx.stroke();
        }
        ctx.restore();
      }

      frameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none"
    />
  );
}
