"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChevronDown, Sparkles } from "lucide-react";

export function CinematicIntro() {
  const happyLetters = "HAPPY".split("");
  const birthdayLetters = "BIRTHDAY".split("");

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-between px-6 py-12 md:py-16 overflow-hidden bg-[#05050A] select-none">
      {/* Background slowly breathing luminous aura */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: [0.1, 0.35, 0.2], scale: [0.85, 1.05, 0.95] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[600px] md:w-[850px] h-[340px] sm:h-[600px] md:h-[850px] rounded-full bg-[radial-gradient(circle,rgba(167,139,250,0.2)_0%,rgba(249,168,212,0.12)_35%,rgba(124,58,237,0.04)_65%,transparent_80%)] blur-3xl pointer-events-none"
      />

      {/* Cinematic sweeping horizontal beam of starlight */}
      <motion.div
        initial={{ left: "-100%", opacity: 0 }}
        animate={{ left: "100%", opacity: [0, 0.6, 0] }}
        transition={{ duration: 5, repeat: Infinity, repeatDelay: 5, ease: "easeInOut" }}
        className="absolute top-1/2 -translate-y-1/2 w-48 sm:w-80 h-[1.5px] bg-gradient-to-r from-transparent via-pink-300 to-transparent blur-[1px] pointer-events-none"
      />

      {/* Top delicate micro tag */}
      <div className="pt-8">
        <motion.div
          initial={{ opacity: 0, y: -15, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3 text-xs tracking-[0.35em] uppercase text-purple-300/80 font-light"
        >
          <span className="w-6 h-[1px] bg-purple-400/40" />
          <span>A Magical Celebration</span>
          <span className="w-6 h-[1px] bg-purple-400/40" />
        </motion.div>
      </div>

      {/* Central Sequenced Reveal */}
      <div className="relative my-auto flex flex-col items-center justify-center text-center max-w-6xl w-full">
        {/* Step 1: “IT’S YOUR DAY” */}
        <motion.div
          initial={{ opacity: 0, y: 15, filter: "blur(10px)" }}
          animate={{ opacity: 0.9, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-sans text-xs sm:text-sm md:text-base tracking-[0.5em] uppercase text-pink-200/90 font-medium mb-4 sm:mb-8"
        >
          It&apos;s Your Day
        </motion.div>

        {/* Step 2: Enormous “HAPPY” */}
        <div className="relative overflow-visible">
          <h2 className="font-serif-editorial text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] font-light tracking-[0.16em] uppercase leading-none select-none text-transparent bg-clip-text bg-gradient-to-b from-[#FFF7ED] via-[#F9A8D4] to-[#A78BFA]">
            {happyLetters.map((char, index) => (
              <motion.span
                key={index}
                initial={{
                  opacity: 0,
                  y: 35,
                  filter: "blur(14px)",
                  scale: 0.94,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  scale: 1,
                }}
                transition={{
                  duration: 1.5,
                  delay: 1.4 + index * 0.1,
                  ease: [0.19, 1, 0.22, 1],
                }}
                className="inline-block transform hover:text-white transition-colors duration-300"
              >
                {char}
              </motion.span>
            ))}
          </h2>
        </div>

        {/* Step 3: Enormous “BIRTHDAY” */}
        <div className="relative overflow-visible mt-2 sm:mt-4">
          <h2 className="font-serif-editorial text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] font-light tracking-[0.14em] uppercase leading-none select-none text-transparent bg-clip-text bg-gradient-to-b from-[#FFF7ED] via-[#F9A8D4] to-[#A78BFA]">
            {birthdayLetters.map((char, index) => (
              <motion.span
                key={index}
                initial={{
                  opacity: 0,
                  y: 40,
                  filter: "blur(14px)",
                  scale: 0.94,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  scale: 1,
                }}
                transition={{
                  duration: 1.6,
                  delay: 2.2 + index * 0.09,
                  ease: [0.19, 1, 0.22, 1],
                }}
                className="inline-block transform hover:text-white transition-colors duration-300"
              >
                {char}
              </motion.span>
            ))}
          </h2>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          animate={{ opacity: 0.85, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.8, delay: 3.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif-editorial italic text-lg sm:text-2xl md:text-3xl text-purple-200/90 font-light mt-6 sm:mt-8 tracking-wide"
        >
          another beautiful year of light and wonder <span className="text-pink-400 font-sans not-italic">♡</span>
        </motion.p>
      </div>

      {/* Bottom Scroll Prompt */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 3.8, ease: "easeOut" }}
        className="pb-4 flex flex-col items-center gap-2 cursor-pointer group"
        onClick={() => {
          const heroEl = document.getElementById("hero");
          if (heroEl) heroEl.scrollIntoView({ behavior: "smooth" });
        }}
      >
        <span className="text-[11px] uppercase tracking-[0.3em] font-medium text-white/50 group-hover:text-pink-300 transition-colors duration-300">
          scroll to begin ↓
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
