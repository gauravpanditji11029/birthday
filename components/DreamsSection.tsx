"use client";

import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Moon, Star, Sparkles, Heart } from "lucide-react";

export function DreamsSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });
  const [activeWord, setActiveWord] = useState<string | null>(null);

  // Floating celestial words requested in prompt:
  // “joy”, “adventure”, “love”, “success”, “laughter”, “dreams”, “memories”, “magic”
  const words = [
    { word: "joy", subtitle: "Moments of pure light and ease", xOffset: -12, delay: 0.2 },
    { word: "adventure", subtitle: "Journeys that awaken wonder", xOffset: 8, delay: 0.35 },
    { word: "love", subtitle: "The warmth that always surrounds you", xOffset: -6, delay: 0.5 },
    { word: "success", subtitle: "Every dream quietly unfolding", xOffset: 14, delay: 0.65 },
    { word: "laughter", subtitle: "The sound that makes life brighter", xOffset: -10, delay: 0.8 },
    { word: "dreams", subtitle: "Wishes waiting among the stars", xOffset: 6, delay: 0.95 },
    { word: "memories", subtitle: "Treasures carried in the heart", xOffset: -8, delay: 1.1 },
    { word: "magic", subtitle: "The extraordinary found in every day", xOffset: 10, delay: 1.25 },
  ];

  return (
    <section
      id="wishes"
      ref={containerRef}
      className="relative w-full min-h-screen py-28 px-6 sm:px-12 flex flex-col items-center justify-center bg-gradient-to-b from-[#05050A] via-[#0d0b21] to-[#05050A] overflow-hidden"
    >
      {/* Crescent moon in dreamy corner */}
      <motion.div
        animate={{ y: [0, -10, 0], rotate: [0, 2, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-16 right-10 sm:right-24 pointer-events-none opacity-80"
      >
        <div className="relative w-24 h-24 flex items-center justify-center">
          <Moon className="w-16 h-16 text-[#FFF7ED] drop-shadow-[0_0_25px_rgba(255,247,237,0.7)]" />
          <Sparkles className="absolute top-1 right-2 w-5 h-5 text-pink-300 animate-twinkle" />
        </div>
      </motion.div>

      {/* Atmospheric starlight haze */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,rgba(167,139,250,0.12)_0%,rgba(249,168,212,0.08)_40%,transparent_75%)] blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-2xl mb-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-pink-400/30 bg-pink-500/10 text-pink-200 text-xs uppercase tracking-[0.25em] mb-4"
        >
          <Star className="w-3.5 h-3.5 text-pink-300" />
          <span>Chapter 03 • Celestial Horizon</span>
        </motion.div>

        {/* Large Text: “DREAM BIG” */}
        <motion.h3
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="font-serif-editorial text-5xl sm:text-7xl md:text-8xl font-light text-white tracking-[0.14em] uppercase glow-text-gold"
        >
          DREAM BIG
        </motion.h3>

        {/* Subtitle: “Because beautiful things are still ahead.” */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-serif-editorial italic text-xl sm:text-2xl text-purple-200/90 font-light mt-4"
        >
          Because beautiful things are still ahead.
        </motion.p>
      </div>

      {/* Floating Constellation of Glowing Words */}
      <div className="relative w-full max-w-5xl z-10 grid grid-cols-2 sm:grid-cols-4 gap-5">
        {words.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={
              isInView
                ? {
                    opacity: 1,
                    y: [0, (index % 2 === 0 ? -6 : 6), 0],
                    scale: 1,
                  }
                : {}
            }
            transition={{
              opacity: { duration: 0.9, delay: item.delay },
              scale: { duration: 0.9, delay: item.delay },
              y: { duration: 4 + (index % 3), repeat: Infinity, ease: "easeInOut", delay: item.delay },
            }}
            whileHover={{ scale: 1.08, y: -8 }}
            onClick={() => setActiveWord(activeWord === item.word ? null : item.word)}
            className={`p-5 rounded-2xl cursor-pointer transition-all duration-300 glass-panel border flex flex-col items-center text-center ${
              activeWord === item.word
                ? "border-pink-400 bg-pink-950/40 shadow-[0_0_30px_rgba(249,168,212,0.4)]"
                : "border-purple-500/20 hover:border-pink-400/50 hover:shadow-[0_0_20px_rgba(167,139,250,0.25)]"
            }`}
          >
            <Sparkles className="w-4 h-4 text-pink-300 mb-2 animate-twinkle" />
            <span className="font-serif-editorial text-2xl sm:text-3xl text-white font-light tracking-wider lowercase">
              {item.word}
            </span>
            <span className="text-[11px] text-white/50 font-light mt-1 max-w-[140px] leading-tight">
              {item.subtitle}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
