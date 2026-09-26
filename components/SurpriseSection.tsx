"use client";

import React, { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Sparkles, Gift } from "lucide-react";

interface SurpriseSectionProps {
  onOpenSurprise: () => void;
}

export function SurpriseSection({ onOpenSurprise }: SurpriseSectionProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.3 });
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    setIsOpening(true);
    // Suspenseful anticipation light bloom before triggering final celebration
    setTimeout(() => {
      onOpenSurprise();
    }, 1200);
  };

  return (
    <section
      id="surprise"
      ref={containerRef}
      className="relative w-full min-h-[90vh] py-32 px-6 flex flex-col items-center justify-center bg-[#05050A] text-center overflow-hidden select-none"
    >
      {/* Dimmed backdrop with deep cinematic stillness */}
      <div className="absolute inset-0 bg-black/85 pointer-events-none" />

      {/* Anticipation light bloom on open */}
      <AnimatePresence>
        {isOpening && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 2.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute z-40 w-96 h-96 rounded-full bg-[radial-gradient(circle,rgba(255,247,237,0.95)_0%,rgba(249,168,212,0.7)_40%,rgba(167,139,250,0.4)_70%,transparent_100%)] blur-2xl pointer-events-none"
          />
        )}
      </AnimatePresence>

      <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
        {/* Step 1: “Wait…” */}
        <motion.p
          initial={{ opacity: 0, y: 15, filter: "blur(6px)" }}
          animate={isInView ? { opacity: 0.75, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 1, delay: 0.3 }}
          className="font-serif-editorial italic text-2xl sm:text-3xl text-purple-300 font-light mb-4"
        >
          Wait…
        </motion.p>

        {/* Step 2: “There’s one more thing.” */}
        <motion.h3
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 1.2, delay: 1.0 }}
          className="font-serif-editorial text-4xl sm:text-6xl md:text-7xl font-light text-white leading-tight"
        >
          There&apos;s one more thing.
        </motion.h3>

        {/* Visual pause separator */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.5, delay: 1.8 }}
          className="w-24 h-[1px] bg-gradient-to-r from-transparent via-pink-400 to-transparent my-8"
        />

        {/* Step 3: “Ready?” */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 0.85, y: 0 } : {}}
          transition={{ duration: 1, delay: 2.2 }}
          className="text-xs sm:text-sm uppercase tracking-[0.4em] text-pink-200/90 font-medium mb-8"
        >
          Ready?
        </motion.p>

        {/* Button: “OPEN THE SURPRISE ♡” */}
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 2.6 }}
          whileHover={{ scale: 1.06, y: -4 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleOpen}
          disabled={isOpening}
          className="group relative inline-flex items-center gap-3 px-8 sm:px-10 py-4 rounded-full border border-pink-400/50 bg-gradient-to-r from-purple-950/60 via-pink-950/50 to-purple-950/60 backdrop-blur-xl shadow-[0_0_30px_rgba(249,168,212,0.25)] hover:shadow-[0_0_55px_rgba(249,168,212,0.55)] hover:border-pink-300 transition-all duration-300 cursor-pointer text-white"
        >
          <Gift className="w-5 h-5 text-pink-300 group-hover:rotate-12 transition-transform duration-300" />
          <span className="font-serif-editorial text-lg sm:text-xl font-normal tracking-wider text-pink-100 group-hover:text-white uppercase">
            {isOpening ? "Unfolding Wonder..." : "OPEN THE SURPRISE ♡"}
          </span>
          <Sparkles className="w-4 h-4 text-pink-300 animate-twinkle" />
        </motion.button>
      </div>
    </section>
  );
}
