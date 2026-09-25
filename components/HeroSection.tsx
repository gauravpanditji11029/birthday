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

  // Parallax transforms
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1.05, 1.15]);
  const imageY = useTransform(scrollYProgress, [0, 1], [-40, 60]);
  const textY = useTransform(scrollYProgress, [0, 1], [60, -80]);
  const bgTextY = useTransform(scrollYProgress, [0, 1], [-30, 90]);
  const ribbonRotate = useTransform(scrollYProgress, [0, 1], [-8, 12]);
  const flowerParallax = useTransform(scrollYProgress, [0, 1], [40, -60]);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full min-h-screen py-24 sm:py-32 flex flex-col justify-center items-center overflow-hidden bg-gradient-to-b from-[#05050A] via-[#090916] to-[#05050A]"
    >
      {/* Background huge ghost editorial typography */}
      <motion.div
        style={{ y: bgTextY }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none w-full text-center z-0 opacity-15 overflow-hidden"
      >
        <span className="font-serif-editorial text-[14vw] sm:text-[18vw] font-bold tracking-[0.2em] uppercase text-purple-300 whitespace-nowrap">
          RADIANT
        </span>
      </motion.div>

      {/* Ambient background light pool */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] md:w-[750px] h-[300px] sm:h-[500px] md:h-[750px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(167,139,250,0.18)_0%,rgba(249,168,212,0.12)_45%,transparent_75%)] blur-3xl pointer-events-none z-0" />

      {/* Floating decorative ribbons (2D SVG curves) */}
      <motion.div
        style={{ rotate: ribbonRotate }}
        className="absolute -top-10 left-[10%] w-72 h-72 pointer-events-none z-10 opacity-30"
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
        {/* Left Column: Editorial Information & Story Prelude */}
        <motion.div
          style={{ y: textY }}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 flex flex-col justify-center text-left"
        >
          {/* Section badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-pink-400/30 bg-pink-500/10 text-pink-200 text-xs uppercase tracking-[0.25em] mb-6 w-fit">
            <Sparkles className="w-3.5 h-3.5 text-pink-300" />
            <span>Chapter 01 • The Protagonist</span>
          </div>

          <h2 className="font-serif-editorial text-4xl sm:text-5xl md:text-6xl font-light leading-[1.1] text-white">
            For the one who paints the world in <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-200">warmth & grace.</span>
          </h2>

          <div className="w-16 h-[1.5px] bg-gradient-to-r from-pink-400 to-transparent my-6" />

          <p className="text-white/70 text-sm sm:text-base leading-relaxed font-light tracking-wide max-w-md">
            Today marks another rotation around the sun for someone truly irreplaceable. Every memory, every quiet laugh, and every gentle gesture makes the world infinitely softer.
          </p>

          <div className="mt-8 flex items-center gap-6">
            <div className="flex flex-col">
              <span className="font-serif-editorial text-2xl text-pink-200 font-normal">Forever</span>
              <span className="text-[11px] uppercase tracking-[0.2em] text-white/50">Inspiring</span>
            </div>
            <div className="w-[1px] h-8 bg-white/20" />
            <div className="flex flex-col">
              <span className="font-serif-editorial text-2xl text-purple-200 font-normal">Infinite</span>
              <span className="text-[11px] uppercase tracking-[0.2em] text-white/50">Smiles</span>
            </div>
            <div className="w-[1px] h-8 bg-white/20" />
            <div className="flex flex-col">
              <span className="font-serif-editorial text-2xl text-pink-300 font-normal">Pure</span>
              <span className="text-[11px] uppercase tracking-[0.2em] text-white/50">Kindness</span>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Layered Character Artwork & Parallax Vignette */}
        <div className="lg:col-span-7 flex justify-center items-center relative">
          {/* Outer glowing frame */}
          <div className="relative w-full max-w-[420px] sm:max-w-[480px] aspect-[3/4] p-3 sm:p-4 rounded-3xl border border-purple-500/20 bg-gradient-to-b from-purple-950/20 via-pink-950/10 to-transparent shadow-[0_20px_80px_rgba(124,58,237,0.15)] backdrop-blur-sm">
            {/* Corner metallic accents */}
            <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-pink-300/60" />
            <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-pink-300/60" />
            <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-pink-300/60" />
            <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-pink-300/60" />

            {/* Inner image container */}
            <motion.div
              style={{ scale: imageScale, y: imageY }}
              className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image
                src="/images/fatima/hero.jpg"
                alt="Fatima — Protagonist of the story"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 500px"
                className="object-cover object-center"
              />

              {/* Subtle inner shadow & lighting vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#05050A]/70 via-transparent to-purple-950/20 pointer-events-none" />

              {/* Soft starlight glints in corners */}
              <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white/80 text-xs">
                <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-400/40" />
                <span className="font-serif-editorial tracking-wider text-sm">Fatima</span>
              </div>
            </motion.div>

            {/* Floating floating botanical badges with parallax */}
            <motion.div
              style={{ y: flowerParallax }}
              className="absolute -bottom-6 -right-6 px-5 py-3 rounded-2xl bg-[#090916]/85 border border-pink-300/30 backdrop-blur-xl shadow-xl z-30"
            >
              <p className="font-serif-editorial text-xs text-pink-200 tracking-wider">
                &ldquo;You make the universe kinder.&rdquo;
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
