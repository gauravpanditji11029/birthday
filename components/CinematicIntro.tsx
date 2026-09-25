"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export function CinematicIntro() {
  const letters = "FATIMA".split("");

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-between px-6 py-12 md:py-16 overflow-hidden bg-[#05050A] select-none">
      {/* Background breathing aura */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: [0.15, 0.35, 0.2], scale: [0.9, 1.05, 0.95] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[600px] md:w-[850px] h-[340px] sm:h-[600px] md:h-[850px] rounded-full bg-[radial-gradient(circle,rgba(167,139,250,0.18)_0%,rgba(249,168,212,0.12)_35%,rgba(124,58,237,0.04)_65%,transparent_80%)] blur-3xl pointer-events-none"
      />

      {/* Cinematic horizontal sweeping beam */}
      <motion.div
        initial={{ left: "-100%", opacity: 0 }}
        animate={{ left: "100%", opacity: [0, 0.7, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, repeatDelay: 6, ease: "easeInOut" }}
        className="absolute top-1/2 -translate-y-1/2 w-48 sm:w-80 h-[1.5px] bg-gradient-to-r from-transparent via-pink-300 to-transparent blur-[1px] pointer-events-none"
      />

      {/* Top micro tag */}
      <div className="pt-8">
        <motion.div
          initial={{ opacity: 0, y: -20, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3 text-xs tracking-[0.35em] uppercase text-purple-300/80 font-light"
        >
          <span className="w-6 h-[1px] bg-purple-400/40" />
          <span>A Dedicated Digital Universe</span>
          <span className="w-6 h-[1px] bg-purple-400/40" />
        </motion.div>
      </div>

      {/* Central main hero title */}
      <div className="relative my-auto flex flex-col items-center justify-center text-center max-w-5xl">
        {/* "IT'S YOUR DAY" */}
        <motion.div
          initial={{ opacity: 0, y: 15, filter: "blur(10px)" }}
          animate={{ opacity: 0.9, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-sans text-xs sm:text-sm md:text-base tracking-[0.45em] uppercase text-pink-200/90 font-medium mb-3 sm:mb-6"
        >
          It&apos;s Your Day
        </motion.div>

        {/* Grand "FATIMA" Editorial Serif Title */}
        <div className="relative overflow-visible py-2">
          {/* Subtle soft backdrop glow for name */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.35 }}
            transition={{ duration: 2.5, delay: 1.4 }}
            className="absolute inset-0 -inset-x-8 bg-gradient-to-r from-purple-500/20 via-pink-400/25 to-purple-500/20 blur-2xl pointer-events-none"
          />

          <h1 className="relative font-serif-editorial text-6xl sm:text-8xl md:text-9xl lg:text-[13rem] font-light tracking-[0.14em] sm:tracking-[0.18em] uppercase leading-none select-none text-transparent bg-clip-text bg-gradient-to-b from-[#FFF7ED] via-[#F9A8D4] to-[#A78BFA]">
            {letters.map((char, index) => (
              <motion.span
                key={index}
                initial={{
                  opacity: 0,
                  y: 40,
                  filter: "blur(14px)",
                  scale: 0.92,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  scale: 1,
                }}
                transition={{
                  duration: 1.6,
                  delay: 1.2 + index * 0.12,
                  ease: [0.19, 1, 0.22, 1],
                }}
                className="inline-block transform hover:text-white transition-colors duration-300"
              >
                {char}
              </motion.span>
            ))}
          </h1>
        </div>

        {/* Subtitle: "another beautiful year of you ♡" */}
        <motion.p
          initial={{ opacity: 0, y: 25, filter: "blur(8px)" }}
          animate={{ opacity: 0.85, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.8, delay: 2.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif-editorial italic text-lg sm:text-2xl md:text-3xl text-purple-200/90 font-light mt-4 sm:mt-8 tracking-wide"
        >
          another beautiful year of you <span className="text-pink-400 font-sans not-italic">♡</span>
        </motion.p>
      </div>

      {/* Bottom Scroll Prompt */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 3.0, ease: "easeOut" }}
        className="pb-4 flex flex-col items-center gap-2 cursor-pointer group"
        onClick={() => {
          const heroEl = document.getElementById("hero");
          if (heroEl) heroEl.scrollIntoView({ behavior: "smooth" });
        }}
      >
        <span className="text-[11px] uppercase tracking-[0.3em] font-medium text-white/50 group-hover:text-pink-300 transition-colors duration-300">
          Scroll to discover your birthday surprise
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-pink-300/70 group-hover:text-pink-200"
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
