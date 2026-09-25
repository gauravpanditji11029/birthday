"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Heart, Sparkles, Star } from "lucide-react";

export function MemorySection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.15 });

  return (
    <section
      id="memories"
      ref={containerRef}
      className="relative w-full min-h-screen py-28 px-6 sm:px-12 flex flex-col items-center justify-center bg-gradient-to-b from-[#05050A] via-[#090914] to-[#05050A] overflow-hidden"
    >
      {/* Background ambient accents */}
      <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(167,139,250,0.08)_0%,transparent_70%)] blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-2xl mb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-pink-400/30 bg-pink-500/10 text-pink-200 text-xs uppercase tracking-[0.25em] mb-4"
        >
          <Sparkles className="w-3.5 h-3.5 text-pink-300" />
          <span>Chapter 02 • Fragments of Joy</span>
        </motion.div>

        <motion.h3
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 1, delay: 0.15 }}
          className="font-serif-editorial text-4xl sm:text-5xl md:text-6xl font-light text-white"
        >
          A Tapestry of Moments
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-white/60 text-xs sm:text-sm mt-3 font-light max-w-md mx-auto"
        >
          Cherished glimpses of quiet peace, genuine laughter, and gentle warmth that linger long after the sun sets.
        </motion.p>
      </div>

      {/* Collage Grid with Dimensional Parallax Layout */}
      <div className="relative w-full max-w-5xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* Frame 1: Polaroid with Flowers */}
        <motion.div
          initial={{ opacity: 0, y: 40, rotate: -4 }}
          animate={isInView ? { opacity: 1, y: 0, rotate: -3 } : {}}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.03, rotate: 0 }}
          className="md:col-span-5 flex flex-col items-center cursor-pointer transition-shadow"
        >
          <div className="p-3 pb-6 bg-[#FAF7F2] rounded-xl shadow-2xl border border-pink-200/60 w-full max-w-[320px] text-gray-900">
            <div className="relative w-full aspect-square rounded-lg overflow-hidden shadow-inner">
              <Image
                src="/images/fatima/memory_flowers.jpg"
                alt="Fatima with spring blossoms"
                fill
                sizes="320px"
                className="object-cover"
              />
            </div>
            <div className="mt-3 flex items-center justify-between px-1">
              <p className="font-handwriting text-lg text-gray-800">
                Golden hour & peonies
              </p>
              <Heart className="w-4 h-4 text-pink-400 fill-pink-400" />
            </div>
            <span className="block text-[10px] text-gray-400 font-sans tracking-widest uppercase mt-0.5 px-1">
              Chapter I • Blossom
            </span>
          </div>
        </motion.div>

        {/* Center Floating Quote Card & Pressed Flora */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.4 }}
          className="md:col-span-2 flex flex-col items-center justify-center text-center my-6 md:my-0"
        >
          <div className="p-6 rounded-2xl glass-panel border border-purple-400/30 shadow-xl flex flex-col items-center gap-3">
            <Star className="w-5 h-5 text-purple-300 animate-spin" style={{ animationDuration: "16s" }} />
            <span className="font-serif-editorial text-sm text-pink-200 uppercase tracking-widest">
              Timeless
            </span>
            <div className="w-8 h-[1px] bg-white/20" />
            <p className="font-handwriting text-base text-white/80 leading-snug">
              Every smile you give echoes forward.
            </p>
          </div>
        </motion.div>

        {/* Frame 2: Polaroid with Stargazing */}
        <motion.div
          initial={{ opacity: 0, y: 40, rotate: 4 }}
          animate={isInView ? { opacity: 1, y: 0, rotate: 3 } : {}}
          transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.03, rotate: 0 }}
          className="md:col-span-5 flex flex-col items-center cursor-pointer"
        >
          <div className="p-3 pb-6 bg-[#FAF7F2] rounded-xl shadow-2xl border border-purple-200/60 w-full max-w-[320px] text-gray-900">
            <div className="relative w-full aspect-square rounded-lg overflow-hidden shadow-inner">
              <Image
                src="/images/fatima/memory_stargazing.jpg"
                alt="Fatima stargazing under twilight"
                fill
                sizes="320px"
                className="object-cover"
              />
            </div>
            <div className="mt-3 flex items-center justify-between px-1">
              <p className="font-handwriting text-lg text-gray-800">
                Under the quiet stars
              </p>
              <Sparkles className="w-4 h-4 text-purple-500" />
            </div>
            <span className="block text-[10px] text-gray-400 font-sans tracking-widest uppercase mt-0.5 px-1">
              Chapter II • Celestial
            </span>
          </div>
        </motion.div>
      </div>

      {/* Floating accent ribbons & paper stamps */}
      <div className="mt-12 flex flex-wrap justify-center gap-4 text-xs text-white/50 tracking-wider">
        <span className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5">
          ✦ Hand-collected moments
        </span>
        <span className="px-4 py-1.5 rounded-full border border-pink-400/20 bg-pink-500/5 text-pink-200">
          ♡ Unspoken gratitude
        </span>
        <span className="px-4 py-1.5 rounded-full border border-purple-400/20 bg-purple-500/5 text-purple-200">
          ✧ Endless radiance
        </span>
      </div>
    </section>
  );
}
