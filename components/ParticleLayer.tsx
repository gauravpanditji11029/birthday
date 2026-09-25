"use client";

import React, { useEffect, useRef } from "react";

interface ParticleLayerProps {
  petalCount?: number;
  starCount?: number;
}

export function ParticleLayer({
  petalCount = 28,
  starCount = 45,
}: ParticleLayerProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const isMobile = width < 768;
    const actualPetalCount = isMobile ? Math.floor(petalCount * 0.4) : petalCount;
    const actualStarCount = isMobile ? Math.floor(starCount * 0.45) : starCount;

    let mouseX = width / 2;
    let mouseY = height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    // Petal class
    interface Petal {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      rotation: number;
      rotationSpeed: number;
      flip: number;
      flipSpeed: number;
      color: string;
      alpha: number;
    }

    const colors = [
      "rgba(249, 168, 212,", // blush pink
      "rgba(236, 72, 153,",  // soft rose
      "rgba(167, 139, 250,", // soft lavender
      "rgba(255, 247, 237,", // warm cream
    ];

    const petals: Petal[] = Array.from({ length: actualPetalCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: 7 + Math.random() * 9,
      speedX: (Math.random() - 0.5) * 0.8 + 0.3,
      speedY: 0.6 + Math.random() * 1.2,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.02,
      flip: Math.random() * Math.PI,
      flipSpeed: 0.015 + Math.random() * 0.02,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 0.35 + Math.random() * 0.45,
    }));

    // Star/Stardust class
    interface Star {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      size: number;
      alpha: number;
      pulseSpeed: number;
      pulseOffset: number;
      hue: number;
    }

    const stars: Star[] = Array.from({ length: actualStarCount }, () => {
      const x = Math.random() * width;
      const y = Math.random() * height;
      return {
        x,
        y,
        baseX: x,
        baseY: y,
        size: 0.8 + Math.random() * 1.8,
        alpha: 0.2 + Math.random() * 0.6,
        pulseSpeed: 0.02 + Math.random() * 0.03,
        pulseOffset: Math.random() * Math.PI * 2,
        hue: Math.random() > 0.5 ? 270 : 330, // purple or pink
      };
    });

    let time = 0;

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      // Render stars
      for (const star of stars) {
        const pulse = Math.sin(time * star.pulseSpeed * 60 + star.pulseOffset);
        const currentAlpha = Math.max(0.1, star.alpha + pulse * 0.3);

        ctx.save();
        ctx.fillStyle = `hsla(${star.hue}, 80%, 85%, ${currentAlpha})`;
        ctx.shadowColor = `hsla(${star.hue}, 80%, 75%, ${currentAlpha * 0.8})`;
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * (0.8 + pulse * 0.2), 0, Math.PI * 2);
        ctx.fill();

        // Cross glint for larger stars
        if (star.size > 1.6 && pulse > 0.4) {
          ctx.strokeStyle = `hsla(${star.hue}, 90%, 95%, ${currentAlpha * 0.7})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(star.x - star.size * 2, star.y);
          ctx.lineTo(star.x + star.size * 2, star.y);
          ctx.moveTo(star.x, star.y - star.size * 2);
          ctx.lineTo(star.x, star.y + star.size * 2);
          ctx.stroke();
        }

        ctx.restore();
      }

      // Render petals
      for (const p of petals) {
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(time + p.y * 0.01) * 0.4;
        p.rotation += p.rotationSpeed;
        p.flip += p.flipSpeed;

        // Subtle reaction to mouse
        const dx = p.x - mouseX;
        const dy = p.y - mouseY;
        const dist = Math.hypot(dx, dy);
        if (dist < 120 && dist > 0) {
          p.x += (dx / dist) * 1.5;
          p.y += (dy / dist) * 1.5;
        }

        // Wrap around boundaries
        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x > width + 20) p.x = -20;
        if (p.x < -20) p.x = width + 20;

        // Draw curved organic petal
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        const scaleX = Math.cos(p.flip);
        ctx.scale(scaleX, 1);

        ctx.fillStyle = `${p.color} ${p.alpha})`;
        ctx.shadowColor = `${p.color} 0.3)`;
        ctx.shadowBlur = 8;

        ctx.beginPath();
        ctx.moveTo(0, -p.size);
        ctx.bezierCurveTo(
          p.size * 0.8,
          -p.size * 0.5,
          p.size * 0.8,
          p.size * 0.5,
          0,
          p.size
        );
        ctx.bezierCurveTo(
          -p.size * 0.8,
          p.size * 0.5,
          -p.size * 0.8,
          -p.size * 0.5,
          0,
          -p.size
        );
        ctx.closePath();
        ctx.fill();

        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, [petalCount, starCount]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-20 w-full h-full"
      aria-hidden="true"
    />
  );
}
