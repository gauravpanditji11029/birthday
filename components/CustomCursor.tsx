"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export function CustomCursor() {
  const [isPointerFine, setIsPointerFine] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [velocity, setVelocity] = useState(0);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for gooey lag
  const springConfig = { damping: 24, stiffness: 220, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const trail1Config = { damping: 20, stiffness: 140, mass: 0.8 };
  const trail1X = useSpring(mouseX, trail1Config);
  const trail1Y = useSpring(mouseY, trail1Config);

  const trail2Config = { damping: 18, stiffness: 90, mass: 1.1 };
  const trail2X = useSpring(mouseX, trail2Config);
  const trail2Y = useSpring(mouseY, trail2Config);

  useEffect(() => {
    // Only enable on desktop pointer devices
    const mq = window.matchMedia("(pointer: fine)");
    setIsPointerFine(mq.matches);

    let lastX = 0;
    let lastY = 0;
    let lastTime = performance.now();

    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      const dt = Math.max(1, now - lastTime);
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      const currentSpeed = Math.hypot(dx, dy) / dt;

      setVelocity((prev) => prev * 0.8 + currentSpeed * 0.2);

      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      lastX = e.clientX;
      lastY = e.clientY;
      lastTime = now;
    };

    const handlePointerOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      if (
        target.closest("button") ||
        target.closest("a") ||
        target.hasAttribute("data-cursor-interactive")
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handlePointerOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handlePointerOver);
    };
  }, [mouseX, mouseY]);

  if (!isPointerFine) return null;

  const stretch = Math.min(velocity * 8, 30);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden mix-blend-screen">
      {/* SVG gooey filter definition */}
      <svg className="hidden">
        <defs>
          <filter id="gooey-cursor-filter">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="gooey"
            />
            <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
          </filter>
        </defs>
      </svg>

      <div style={{ filter: "url(#gooey-cursor-filter)" }}>
        {/* Third trailing blob */}
        <motion.div
          style={{
            x: trail2X,
            y: trail2Y,
            translateX: "-50%",
            translateY: "-50%",
          }}
          animate={{
            scale: isHovered ? 1.4 : 1,
            opacity: Math.min(0.6, 0.25 + stretch * 0.02),
          }}
          transition={{ duration: 0.2 }}
          className="absolute w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500/40 to-pink-500/50 blur-[2px]"
        />

        {/* Second trailing blob */}
        <motion.div
          style={{
            x: trail1X,
            y: trail1Y,
            translateX: "-50%",
            translateY: "-50%",
          }}
          animate={{
            scale: isHovered ? 1.6 : 1.1,
            opacity: 0.45,
          }}
          transition={{ duration: 0.2 }}
          className="absolute w-6 h-6 rounded-full bg-gradient-to-r from-pink-400/60 to-purple-400/50 blur-[1px]"
        />

        {/* Main lead cursor */}
        <motion.div
          style={{
            x: smoothX,
            y: smoothY,
            translateX: "-50%",
            translateY: "-50%",
          }}
          animate={{
            scale: isHovered ? 2.2 : 1,
            borderColor: isHovered ? "rgba(249, 168, 212, 0.8)" : "rgba(167, 139, 250, 0.6)",
          }}
          transition={{ duration: 0.2 }}
          className="absolute w-5 h-5 rounded-full bg-gradient-to-br from-pink-300 via-purple-300 to-white shadow-[0_0_15px_rgba(249,168,212,0.6)]"
        />
      </div>

      {/* Tiny sharp center spark */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="absolute w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_#ffffff]"
      />
    </div>
  );
}
