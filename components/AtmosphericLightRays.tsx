"use client";

import React, { useEffect, useRef } from "react";

interface LightRaysProps {
  color?: string; // lavender, blush, warm cream
  intensity?: number;
  interactive?: boolean;
}

export function AtmosphericLightRays({
  color = "rgba(167, 139, 250, 0.12)",
  intensity = 0.15,
  interactive = true,
}: LightRaysProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouseX = width * 0.5;
    let mouseY = height * 0.2;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      targetMouseX = e.clientX;
      targetMouseY = e.clientY * 0.5;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    // Ray configuration
    const rayCount = 14;
    const rays: {
      angle: number;
      width: number;
      speed: number;
      alpha: number;
      length: number;
    }[] = [];

    for (let i = 0; i < rayCount; i++) {
      rays.push({
        angle: (i / rayCount) * Math.PI * 0.9 - Math.PI * 0.45,
        width: 0.08 + Math.random() * 0.12,
        speed: (Math.random() - 0.5) * 0.003,
        alpha: 0.2 + Math.random() * 0.5,
        length: 0.9 + Math.random() * 0.4,
      });
    }

    let time = 0;

    const render = () => {
      time += 0.015;
      // Smooth mouse follow
      mouseX += (targetMouseX - mouseX) * 0.03;
      mouseY += (targetMouseY - mouseY) * 0.03;

      ctx.clearRect(0, 0, width, height);

      // Light source origin
      const originX = mouseX;
      const originY = -50 + Math.sin(time * 0.5) * 20;

      // Soft ambient source glow
      const radialGradient = ctx.createRadialGradient(
        originX,
        originY,
        10,
        originX,
        originY,
        width * 0.6
      );
      radialGradient.addColorStop(0, "rgba(249, 168, 212, 0.18)");
      radialGradient.addColorStop(0.3, "rgba(167, 139, 250, 0.1)");
      radialGradient.addColorStop(0.7, "rgba(124, 58, 237, 0.03)");
      radialGradient.addColorStop(1, "rgba(5, 5, 10, 0)");

      ctx.fillStyle = radialGradient;
      ctx.fillRect(0, 0, width, height);

      // Draw volumetric rays
      ctx.save();
      ctx.globalCompositeOperation = "screen";

      rays.forEach((ray, i) => {
        ray.angle += ray.speed;
        const currentAngle = ray.angle + Math.sin(time + i) * 0.04;
        const currentAlpha =
          ray.alpha * (0.6 + Math.sin(time * 2 + i * 1.5) * 0.4) * intensity;

        const maxDist = Math.max(width, height) * 1.4 * ray.length;
        const endX1 =
          originX + Math.sin(currentAngle - ray.width) * maxDist;
        const endY1 =
          originY + Math.cos(currentAngle - ray.width) * maxDist;
        const endX2 =
          originX + Math.sin(currentAngle + ray.width) * maxDist;
        const endY2 =
          originY + Math.cos(currentAngle + ray.width) * maxDist;

        const rayGrad = ctx.createLinearGradient(
          originX,
          originY,
          originX + Math.sin(currentAngle) * maxDist * 0.7,
          originY + Math.cos(currentAngle) * maxDist * 0.7
        );

        // Soft pastel palette: soft lavender & blush pink
        if (i % 2 === 0) {
          rayGrad.addColorStop(0, `rgba(249, 168, 212, ${currentAlpha})`);
          rayGrad.addColorStop(0.4, `rgba(167, 139, 250, ${currentAlpha * 0.6})`);
          rayGrad.addColorStop(1, "rgba(167, 139, 250, 0)");
        } else {
          rayGrad.addColorStop(0, `rgba(255, 247, 237, ${currentAlpha * 0.9})`);
          rayGrad.addColorStop(0.4, `rgba(236, 72, 153, ${currentAlpha * 0.5})`);
          rayGrad.addColorStop(1, "rgba(124, 58, 237, 0)");
        }

        ctx.beginPath();
        ctx.moveTo(originX, originY);
        ctx.lineTo(endX1, endY1);
        ctx.lineTo(endX2, endY2);
        ctx.closePath();

        ctx.fillStyle = rayGrad;
        ctx.fill();
      });

      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [intensity, interactive]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-10 w-full h-full opacity-70 transition-opacity duration-1000"
      aria-hidden="true"
    />
  );
}
