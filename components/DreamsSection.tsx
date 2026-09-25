"use client";

import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Moon, Star, Sparkles, Heart } from "lucide-react";

export function DreamsSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });
  const [activeWish, setActiveWish] = useState<number | null>(null);

  const wishes = [
    { title: "More laughter", desc: "The kind that makes your eyes crinkle and makes your stomach ache with happiness." },
    { title: "More adventures", desc: "Journeys to places both new and familiar that fill your soul with wonder." },
    { title: "More unforgettable moments", desc: "Times so warm and golden that you'll tuck them safely inside your heart." },
    { title: "More reasons to smile", desc: "Unexpected kindness, morning sunshine, and effortless ease every single day." },
    { title: "More dreams coming true", desc: "Every quiet wish you ever held in secret unfolding in perfect grace." },
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

      {/* Atmospheric glowing cloud clouds / starlight haze */}
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
          <span>Chapter 04 • Celestial Horizon</span>
        </motion.div>

        <motion.h3
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="font-serif-editorial text-5xl sm:text-7xl md:text-8xl font-light text-white tracking-[0.08em] uppercase glow-text-gold"
        >
          DREAM BIG
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-serif-editorial italic text-xl sm:text-2xl text-purple-200/90 font-light mt-4"
        >
          Because you deserve beautiful things.
        </motion.p>
      </div>

      {/* Floating Constellation of Wishes */}
      <div className="relative w-full max-w-5xl z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishes.map((wish, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30, scale: 0.92 }}
            animate={
              isInView
                ? {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }
                : {}
            }
            transition={{
              duration: 0.9,
              delay: 0.4 + index * 0.14,
              ease: [0.16, 1, 0.3, 1],
            }}
            whileHover={{ y: -6, scale: 1.02 }}
            onClick={() => setActiveWish(activeWish === index ? null : index)}
            className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 glass-panel border ${
              activeWish === index
                ? "border-pink-400 bg-pink-950/30 shadow-[0_0_30px_rgba(249,168,212,0.3)]"
                : "border-purple-500/20 hover:border-pink-400/50"
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs uppercase tracking-[0.25em] text-pink-300 font-medium">
                Wish 0{index + 1}
              </span>
              <Heart
                className={`w-4 h-4 transition-colors ${
                  activeWish === index ? "text-pink-400 fill-pink-400" : "text-white/30"
                }`}
              />
            </div>

            <h4 className="font-serif-editorial text-2xl text-white font-normal mb-2">
              {wish.title}
            </h4>

            <p className="text-white/70 text-xs sm:text-sm font-light leading-relaxed">
              {wish.desc}
            </p>

            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-purple-200/60">
              <span>Dedicated to Fatima</span>
              <Sparkles className="w-3 h-3 text-pink-300" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
