"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";

export function LetterSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.25 });

  const paragraphs = [
    { text: "Dear Fatima,", type: "salutation", delay: 0.3 },
    { text: "Today is a reminder of how special you are.", type: "body", delay: 0.6 },
    {
      text: "I hope this year brings you more reasons to smile, more moments you'll want to remember, and more dreams turning into reality.",
      type: "body",
      delay: 0.9,
    },
    { text: "Keep being exactly who you are.", type: "highlight", delay: 1.3 },
    { text: "Happy Birthday, Fatima ♡", type: "valediction", delay: 1.6 },
  ];

  return (
    <section
      id="letter"
      ref={containerRef}
      className="relative w-full min-h-screen py-28 px-6 sm:px-12 flex flex-col items-center justify-center bg-gradient-to-b from-[#05050A] via-[#080714] to-[#05050A] overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(249,168,212,0.08)_0%,rgba(167,139,250,0.06)_50%,transparent_75%)] blur-3xl pointer-events-none" />

      {/* Heading */}
      <div className="text-center max-w-xl mb-12">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-400/30 bg-purple-950/30 text-purple-200 text-xs uppercase tracking-[0.25em] mb-4"
        >
          <Sparkles className="w-3.5 h-3.5 text-pink-300" />
          <span>Chapter 03 • The Letter</span>
        </motion.div>

        <motion.h3
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 1, delay: 0.15 }}
          className="font-serif-editorial text-4xl sm:text-5xl md:text-6xl font-light text-white tracking-wide"
        >
          A LITTLE LETTER FOR YOU
        </motion.h3>
      </div>

      {/* Physical Parchment Letter Container */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-2xl bg-[#FFFDF9] text-[#1E1B18] rounded-3xl p-8 sm:p-14 shadow-[0_25px_80px_rgba(0,0,0,0.7),0_0_40px_rgba(249,168,212,0.15)] border border-[#E8DFC9] overflow-hidden"
      >
        {/* Subtle decorative watercolor floral corner accents */}
        <div className="absolute top-0 right-0 w-36 h-36 bg-[radial-gradient(ellipse_at_top_right,rgba(249,168,212,0.25)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-44 h-44 bg-[radial-gradient(ellipse_at_bottom_left,rgba(167,139,250,0.2)_0%,transparent_70%)] pointer-events-none" />

        {/* Paper texture lines */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />

        {/* Letter Wax Seal / Rosette Header */}
        <div className="flex items-center justify-between border-b border-[#E6DDCA] pb-6 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#9B2C2C] to-[#E53E3E] text-white flex items-center justify-center shadow-md">
              <span className="font-serif-editorial font-bold text-lg">F</span>
            </div>
            <div>
              <span className="block font-serif-editorial text-xs tracking-[0.2em] uppercase text-[#716A5C]">
                Official Keepsake
              </span>
              <span className="block text-[11px] text-[#A89F8D]">
                To: Fatima ♡
              </span>
            </div>
          </div>
          <span className="font-serif-editorial italic text-xs text-[#8C8271]">
            Written with warmth
          </span>
        </div>

        {/* Line-by-line animated text content */}
        <div className="space-y-6">
          {paragraphs.map((para, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 18, filter: "blur(4px)" }}
              animate={
                isInView
                  ? {
                      opacity: 1,
                      y: 0,
                      filter: "blur(0px)",
                    }
                  : {}
              }
              transition={{
                duration: 1,
                delay: para.delay,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {para.type === "salutation" && (
                <p className="font-serif-editorial text-2xl sm:text-3xl text-[#2D2A26] font-normal">
                  {para.text}
                </p>
              )}

              {para.type === "body" && (
                <p className="font-serif-editorial text-lg sm:text-xl text-[#3E3A34] leading-relaxed font-light">
                  {para.text}
                </p>
              )}

              {para.type === "highlight" && (
                <p className="font-serif-editorial text-xl sm:text-2xl text-[#1F1B18] font-medium leading-relaxed italic border-l-2 border-[#D4A373] pl-4 my-2">
                  &ldquo;{para.text}&rdquo;
                </p>
              )}

              {para.type === "valediction" && (
                <div className="pt-4 flex items-center justify-between">
                  <p className="font-handwriting text-2xl sm:text-3xl text-[#78350F] font-bold">
                    Happy Birthday, Fatima <span className="text-rose-500 font-sans">♡</span>
                  </p>
                  <Heart className="w-5 h-5 text-rose-400 fill-rose-300" />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Delicate footer ornament */}
        <div className="mt-8 pt-6 border-t border-[#E6DDCA]/80 flex justify-center">
          <div className="flex items-center gap-3 text-xs tracking-widest text-[#9C927F] uppercase font-serif-editorial">
            <span>✧</span>
            <span>Always Remembered</span>
            <span>✧</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
