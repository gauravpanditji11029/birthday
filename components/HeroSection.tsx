"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Sparkles, Heart } from "lucide-react";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax transforms:
  // "HAPPY" moves slightly upward, "BIRTHDAY" moves slightly downward
  const happyY = useTransform(scrollYProgress, [0, 0.5, 1], [40, -15, -45]);
  const birthdayY = useTransform(scrollYProgress, [0, 0.5, 1], [-25, 15, 45]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1.04, 1.12]);
  const imageY = useTransform(scrollYProgress, [0, 1], [-30, 50]);
  const bgTextY = useTransform(scrollYProgress, [0, 1], [-40, 70]);
  const ribbonRotate = useTransform(scrollYProgress, [0, 1], [-6, 10]);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full min-h-screen py-24 sm:py-32 flex flex-col justify-center items-center overflow-hidden bg-gradient-to-b from-[#05050A] via-[#090916] to-[#05050A]"
    >
      {/* Background huge soft circular light pulsing very subtly */}
      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.18, 0.28, 0.18],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] sm:w-[580px] md:w-[780px] h-[380px] sm:h-[580px] md:h-[780px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(167,139,250,0.22)_0%,rgba(249,168,212,0.15)_40%,transparent_75%)] blur-3xl pointer-events-none z-0"
      />

      {/* Background ghost editorial typography */}
      <motion.div
        style={{ y: bgTextY }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none w-full text-center z-0 opacity-15 overflow-hidden"
      >
        <span className="font-serif-editorial text-[14vw] sm:text-[18vw] font-bold tracking-[0.2em] uppercase text-purple-300 whitespace-nowrap">
          CELEBRATION
        </span>
      </motion.div>

      {/* Floating 2D decorative ribbons */}
      <motion.div
        style={{ rotate: ribbonRotate }}
        className="absolute -top-10 left-[8%] w-72 h-72 pointer-events-none z-10 opacity-30"
      >
        <svg viewBox="0 0 200 200" fill="none" className="w-full h-full text-pink-300">
          <path
            d="M 20,40 Q 90,120 180,60 T 160,180"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="4 6"
          />
        </svg>
      </motion.div>

      <motion.div
        style={{ rotate: ribbonRotate }}
        className="absolute -bottom-10 right-[8%] w-80 h-80 pointer-events-none z-10 opacity-25"
      >
        <svg viewBox="0 0 200 200" fill="none" className="w-full h-full text-purple-300">
          <path
            d="M 180,160 Q 110,60 20,120 T 40,20"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="6 8"
          />
        </svg>
      </motion.div>

      {/* Main Hero Container */}
      <div className="relative z-20 max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Parallax HAPPY BIRTHDAY Title & Emotional Prose */}
        <div className="lg:col-span-6 flex flex-col justify-center text-left">
          {/* Section badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-pink-400/30 bg-pink-500/10 text-pink-200 text-xs uppercase tracking-[0.25em] mb-6 w-fit">
            <Sparkles className="w-3.5 h-3.5 text-pink-300" />
            <span>Chapter 01 • The Unfolding Story</span>
          </div>

          {/* Opposing Parallax "HAPPY" and "BIRTHDAY" */}
          <div className="flex flex-col py-2 select-none">
            <motion.h2
              style={{ y: happyY }}
              className="font-serif-editorial text-5xl sm:text-7xl md:text-8xl font-light tracking-[0.14em] uppercase text-white leading-none glow-text-gold"
            >
              HAPPY
            </motion.h2>
            <motion.h2
              style={{ y: birthdayY }}
              className="font-serif-editorial text-5xl sm:text-7xl md:text-8xl font-light tracking-[0.12em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-200 leading-none mt-1"
            >
              BIRTHDAY
            </motion.h2>
          </div>

          <div className="w-16 h-[1.5px] bg-gradient-to-r from-pink-400 to-transparent my-6" />

          <p className="text-white/70 text-sm sm:text-base leading-relaxed font-light tracking-wide max-w-md">
            For another year of wonder, gentle magic, and infinite light. Today honors every quiet joy you bring into the world, wrapped in warmth, love, and starlight.
          </p>

          {/* Delicate Stat / Sentiment Badges */}
          <div className="mt-8 flex items-center gap-6">
            <div className="flex flex-col">
              <span className="font-serif-editorial text-2xl text-pink-200 font-normal">Infinite</span>
              <span className="text-[11px] uppercase tracking-[0.2em] text-white/50">Wishes</span>
            </div>
            <div className="w-[1px] h-8 bg-white/20" />
            <div className="flex flex-col">
              <span className="font-serif-editorial text-2xl text-purple-200 font-normal">Countless</span>
              <span className="text-[11px] uppercase tracking-[0.2em] text-white/50">Smiles</span>
            </div>
            <div className="w-[1px] h-8 bg-white/20" />
            <div className="flex flex-col">
              <span className="font-serif-editorial text-2xl text-pink-300 font-normal">Endless</span>
              <span className="text-[11px] uppercase tracking-[0.2em] text-white/50">Grace</span>
            </div>
          </div>
        </div>

        {/* Right Column: Layered Dreamy Artwork & Editorial Frame */}
        <div className="lg:col-span-6 flex justify-center items-center relative">
          <div className="relative w-full max-w-[420px] sm:max-w-[460px] aspect-[3/4] p-3 sm:p-4 rounded-3xl border border-purple-500/20 bg-gradient-to-b from-purple-950/20 via-pink-950/10 to-transparent shadow-[0_20px_80px_rgba(124,58,237,0.15)] backdrop-blur-sm">
            {/* Corner metallic accents */}
            <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-pink-300/60" />
            <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-pink-300/60" />
            <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-pink-300/60" />
            <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-pink-300/60" />

            <motion.div
              style={{ scale: imageScale, y: imageY }}
              className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image
                src="/images/birthday/hero.jpg"
                alt="Enchanted 2D Birthday Celebration Scene"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 500px"
                className="object-cover object-center"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#05050A]/70 via-transparent to-purple-950/20 pointer-events-none" />

              <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white/80 text-xs">
                <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-400/40" />
                <span className="font-serif-editorial tracking-wider text-sm">A Day of Radiance</span>
              </div>
            </motion.div>

            {/* Floating botanical badge */}
            <div className="absolute -bottom-6 -right-6 px-5 py-3 rounded-2xl bg-[#090916]/85 border border-pink-300/30 backdrop-blur-xl shadow-xl z-30">
              <p className="font-serif-editorial text-xs text-pink-200 tracking-wider">
                &ldquo;May every moment bring wonder.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
