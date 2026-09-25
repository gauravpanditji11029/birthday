"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Sparkles, Eye } from "lucide-react";

export function GooeyRevealSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isInside, setIsInside] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [touchPos, setTouchPos] = useState({ x: 50, y: 50 }); // percentage

  const mouseX = useMotionValue(250);
  const mouseY = useMotionValue(250);

  // Smooth spring for liquid portal lag
  const springX = useSpring(mouseX, { damping: 28, stiffness: 180 });
  const springY = useSpring(mouseY, { damping: 28, stiffness: 180 });

  const [portalPos, setPortalPos] = useState({ x: 250, y: 250 });

  useEffect(() => {
    setIsTouchDevice(window.matchMedia("(pointer: coarse)").matches);

    const unsubscribeX = springX.on("change", (v) => {
      setPortalPos((prev) => ({ ...prev, x: v }));
    });
    const unsubscribeY = springY.on("change", (v) => {
      setPortalPos((prev) => ({ ...prev, y: v }));
    });

    return () => {
      unsubscribeX();
      unsubscribeY();
    };
  }, [springX, springY]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseX.set(x);
    mouseY.set(y);
    if (!isInside) setIsInside(true);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const touch = e.touches[0];
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((touch.clientX - rect.left) / rect.width) * 100;
    const y = ((touch.clientY - rect.top) / rect.height) * 100;
    setTouchPos({ x: Math.max(10, Math.min(90, x)), y: Math.max(10, Math.min(90, y)) });
    setIsInside(true);
  };

  // Mask clip-path radius
  const portalRadius = isInside ? 160 : 0;
  const clipPathValue = isTouchDevice
    ? `circle(140px at ${touchPos.x}% ${touchPos.y}%)`
    : `circle(${portalRadius}px at ${portalPos.x}px ${portalPos.y}px)`;

  return (
    <section className="relative w-full py-28 px-6 sm:px-12 flex flex-col items-center justify-center bg-[#05050A] overflow-hidden select-none">
      {/* Title */}
      <div className="text-center max-w-xl mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-pink-400/30 bg-pink-500/10 text-pink-200 text-xs uppercase tracking-[0.25em] mb-4">
          <Sparkles className="w-3.5 h-3.5 text-pink-300" />
          <span>Interactive Starlight Lens</span>
        </div>
        <h3 className="font-serif-editorial text-4xl sm:text-5xl font-light text-white">
          The Secret Wish Portal
        </h3>
        <p className="text-white/60 text-xs sm:text-sm mt-3 font-light">
          {isTouchDevice
            ? "Touch and drag your finger across the canvas to illuminate Fatima's secret birthday dream."
            : "Hover and glide your cursor over the canvas to open a magical starlight aperture."}
        </p>
      </div>

      {/* Main Interactive Stage Container */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsInside(true)}
        onMouseLeave={() => setIsInside(false)}
        onTouchMove={handleTouchMove}
        onTouchStart={() => setIsInside(true)}
        className="relative w-full max-w-4xl h-[480px] sm:h-[540px] rounded-3xl overflow-hidden border border-purple-500/25 shadow-[0_15px_60px_rgba(0,0,0,0.8)] cursor-none"
      >
        {/* ========================================================
            LAYER 1: NORMAL VIEW (Dreamy editorial cosmos & typography)
            ======================================================== */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#090914] via-[#0e0c1f] to-[#090914] flex flex-col items-center justify-center p-8 text-center">
          {/* Subtle geometric astral ring */}
          <div className="absolute w-[360px] h-[360px] rounded-full border border-purple-400/15 animate-spin" style={{ animationDuration: "50s" }} />
          <div className="absolute w-[280px] h-[280px] rounded-full border border-pink-400/10 animate-spin" style={{ animationDuration: "35s", animationDirection: "reverse" }} />

          <div className="relative z-10 flex flex-col items-center max-w-md">
            <span className="font-serif-editorial italic text-3xl sm:text-4xl text-purple-200/60 font-light">
              &ldquo;Some magic only reveals itself
            </span>
            <span className="font-serif-editorial text-2xl sm:text-3xl text-pink-200/80 font-light mt-1">
              when you look a little closer.&rdquo;
            </span>

            <div className="mt-8 flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-white/50 text-xs">
              <Eye className="w-3.5 h-3.5 text-pink-300" />
              <span>{isTouchDevice ? "Drag to reveal" : "Move cursor here"}</span>
            </div>
          </div>
        </div>

        {/* ========================================================
            LAYER 2: SECRET PORTAL (Clipped to organic liquid circle)
            ======================================================== */}
        <div
          style={{
            clipPath: clipPathValue,
            WebkitClipPath: clipPathValue,
            transition: isInside ? "none" : "clip-path 0.5s ease-out",
          }}
          className="absolute inset-0 z-20 pointer-events-none bg-[#05050A]"
        >
          {/* Secret artwork of Fatima holding starlight */}
          <Image
            src="/images/fatima/secret_portal.jpg"
            alt="Fatima making a wish with glowing starlight"
            fill
            sizes="(max-width: 768px) 100vw, 900px"
            className="object-cover object-center filter saturate-125 brightness-110"
          />

          {/* Vignette & secret birthday glow */}
          <div className="absolute inset-0 bg-gradient-to-t from-purple-950/70 via-transparent to-pink-950/40" />

          {/* Hidden heartfelt badge inside the portal */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-5 py-2 rounded-full bg-black/60 backdrop-blur-xl border border-pink-400/50 text-center whitespace-nowrap shadow-[0_0_20px_rgba(249,168,212,0.5)]">
            <p className="font-serif-editorial text-sm sm:text-base text-pink-200">
              ✦ Fatima • Holding all the wishes of the world ✦
            </p>
          </div>
        </div>

        {/* Organic trailing gooey ring following cursor */}
        {isInside && !isTouchDevice && (
          <motion.div
            style={{
              left: portalPos.x,
              top: portalPos.y,
              transform: "translate(-50%, -50%)",
            }}
            className="absolute z-30 pointer-events-none w-[320px] h-[320px] rounded-full border border-pink-300/60 shadow-[0_0_40px_rgba(249,168,212,0.4)]"
          />
        )}
      </div>
    </section>
  );
}
