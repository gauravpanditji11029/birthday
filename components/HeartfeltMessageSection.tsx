"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";

export function HeartfeltMessageSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.25 });

  const paragraphs = [
    {
      lines: [
        "Today is a little reminder",
        "to celebrate you,",
        "the moments you've lived,",
        "the dreams you're chasing,",
        "and all the beautiful things",
        "still waiting ahead.",
      ],
      delay: 0.3,
    },
    {
      lines: [
        "May this year bring",
        "more laughter,",
        "more unforgettable moments,",
        "more reasons to smile,",
        "and countless little surprises.",
      ],
      delay: 0.9,
    },
    {
      lines: ["Happy Birthday ♡"],
      delay: 1.5,
      isFinal: true,
    },
  ];

  return (
    <section
      id="letter"
      ref={containerRef}
      className="relative w-full min-h-screen py-32 px-6 sm:px-12 flex flex-col items-center justify-center bg-gradient-to-b from-[#05050A] via-[#090818] to-[#05050A] overflow-hidden select-none"
    >
      {/* Background very subtle ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full bg-[radial-gradient(circle,rgba(249,168,212,0.06)_0%,rgba(167,139,250,0.05)_50%,transparent_75%)] blur-3xl pointer-events-none" />

      {/* Subtle tag */}
      <div className="text-center max-w-xl mb-12">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-400/30 bg-purple-950/30 text-purple-200 text-xs uppercase tracking-[0.25em] mb-4"
        >
          <Sparkles className="w-3.5 h-3.5 text-pink-300" />
          <span>A Gentle Note</span>
        </motion.div>
      </div>

      {/* Main Minimalist Heartfelt Card */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-2xl rounded-3xl p-8 sm:p-14 bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/10 backdrop-blur-xl shadow-[0_25px_80px_rgba(0,0,0,0.7)] text-center flex flex-col items-center"
      >
        {/* Subtle Rosette */}
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500/20 to-pink-500/20 border border-pink-300/30 flex items-center justify-center text-pink-300 mb-8 shadow-sm">
          <Heart className="w-4 h-4 fill-pink-300/40" />
        </div>

        {/* Paragraph 1 */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-serif-editorial text-2xl sm:text-3xl text-white/90 leading-relaxed font-light mb-8 max-w-lg"
        >
          {paragraphs[0].lines.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </motion.div>

        {/* Thin divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="w-16 h-[1px] bg-gradient-to-r from-transparent via-pink-400/40 to-transparent my-4"
        />

        {/* Paragraph 2 */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 1, delay: 1.0 }}
          className="font-serif-editorial text-2xl sm:text-3xl text-purple-200/90 leading-relaxed font-light mb-10 max-w-lg"
        >
          {paragraphs[1].lines.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </motion.div>

        {/* Paragraph 3: Happy Birthday ♡ */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, filter: "blur(8px)" }}
          animate={isInView ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
          transition={{ duration: 1.2, delay: 1.6 }}
          className="pt-2"
        >
          <span className="font-handwriting text-4xl sm:text-5xl text-pink-300 font-bold tracking-wide">
            Happy Birthday <span className="font-sans not-italic text-pink-400">♡</span>
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
