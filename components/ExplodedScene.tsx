"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Sparkles, Heart, Gift, Star, Compass, Flower2 } from "lucide-react";

export function ExplodedScene() {
  const targetRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  // Phases:
  // 0.0 - 0.25: Intact original composition
  // 0.25 - 0.55: Explode outward
  // 0.55 - 0.75: Float in space
  // 0.75 - 1.0: Reassemble into new royal birthday crest

  // Piece 1: Top-Left Polaroid
  const piece1X = useTransform(scrollYProgress, [0, 0.45, 0.7, 1], [0, -220, -180, 0]);
  const piece1Y = useTransform(scrollYProgress, [0, 0.45, 0.7, 1], [0, -160, -140, 0]);
  const piece1Rotate = useTransform(scrollYProgress, [0, 0.45, 0.7, 1], [0, -18, -12, 0]);
  const piece1Scale = useTransform(scrollYProgress, [0, 0.45, 0.7, 1], [1, 1.25, 1.1, 0.95]);

  // Piece 2: Top-Right Ribbon & Stars
  const piece2X = useTransform(scrollYProgress, [0, 0.45, 0.7, 1], [0, 240, 190, 0]);
  const piece2Y = useTransform(scrollYProgress, [0, 0.45, 0.7, 1], [0, -140, -110, 0]);
  const piece2Rotate = useTransform(scrollYProgress, [0, 0.45, 0.7, 1], [0, 24, 15, 0]);
  const piece2Scale = useTransform(scrollYProgress, [0, 0.45, 0.7, 1], [1, 1.3, 1.15, 0.95]);

  // Piece 3: Bottom-Left Handwritten Note
  const piece3X = useTransform(scrollYProgress, [0, 0.45, 0.7, 1], [0, -200, -160, 0]);
  const piece3Y = useTransform(scrollYProgress, [0, 0.45, 0.7, 1], [0, 180, 150, 0]);
  const piece3Rotate = useTransform(scrollYProgress, [0, 0.45, 0.7, 1], [0, 15, 10, 0]);

  // Piece 4: Bottom-Right Floral Cluster
  const piece4X = useTransform(scrollYProgress, [0, 0.45, 0.7, 1], [0, 220, 170, 0]);
  const piece4Y = useTransform(scrollYProgress, [0, 0.45, 0.7, 1], [0, 160, 130, 0]);
  const piece4Rotate = useTransform(scrollYProgress, [0, 0.45, 0.7, 1], [0, -22, -15, 0]);

  // Piece 5: Center Core (Fades from Original Keepsake to Assembled Final Crest)
  const originalOpacity = useTransform(scrollYProgress, [0, 0.35, 0.7, 0.85], [1, 0.4, 0.1, 0]);
  const finalCrestOpacity = useTransform(scrollYProgress, [0.65, 0.85, 1], [0, 0.85, 1]);
  const finalCrestScale = useTransform(scrollYProgress, [0.65, 0.85, 1], [0.8, 1.05, 1]);

  // Floating background petals & sparkles explosion
  const petal1X = useTransform(scrollYProgress, [0, 0.5, 1], [0, -320, 0]);
  const petal1Y = useTransform(scrollYProgress, [0, 0.5, 1], [0, -260, 0]);
  const petal2X = useTransform(scrollYProgress, [0, 0.5, 1], [0, 310, 0]);
  const petal2Y = useTransform(scrollYProgress, [0, 0.5, 1], [0, 240, 0]);

  // Explode stage label
  const phaseLabel = useTransform(
    scrollYProgress,
    [0, 0.3, 0.65, 0.9],
    ["Original Keepsake", "Scroll: Exploding Elements", "Floating in Wonder", "Assembled: Final Crest"]
  );

  return (
    <div
      id="exploded-view"
      ref={targetRef}
      className="relative w-full h-[280vh] bg-[#05050A]"
    >
      {/* Sticky Fullscreen Stage */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden px-4">
        {/* Ambient background glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(236,72,153,0.12)_0%,rgba(167,139,250,0.08)_50%,transparent_75%)] blur-3xl" />
        </div>

        {/* Section title & interactive stage badge */}
        <div className="absolute top-20 sm:top-24 flex flex-col items-center text-center z-30 pointer-events-none">
          <span className="text-[11px] uppercase tracking-[0.35em] text-pink-300 font-medium">
            Scroll-Driven Dimensional Physics
          </span>
          <h3 className="font-serif-editorial text-3xl sm:text-4xl text-white font-light mt-1">
            Exploded Birthday Universe
          </h3>
          <p className="text-white/50 text-xs sm:text-sm mt-1 max-w-md">
            Scroll down to watch every keepsake element fly outward, then assemble into a new birthday crest.
          </p>

          {/* Interactive Phase Indicator */}
          <div className="mt-3 px-4 py-1 rounded-full border border-purple-400/30 bg-purple-950/40 backdrop-blur-md text-[11px] text-purple-200 tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-pink-400 animate-ping" />
            <motion.span>{phaseLabel}</motion.span>
          </div>
        </div>

        {/* Central Exploded Composition Stage */}
        <div className="relative w-full max-w-[650px] h-[450px] flex items-center justify-center">
          {/* ========================================================
              ORIGINAL INITIAL COMPOSITION (Fades out during scroll)
              ======================================================== */}
          <motion.div
            style={{ opacity: originalOpacity }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full border-2 border-pink-300/30 bg-gradient-to-tr from-purple-950/60 to-pink-950/40 p-4 shadow-[0_0_50px_rgba(249,168,212,0.25)] flex flex-col items-center justify-center text-center">
              <Sparkles className="w-8 h-8 text-pink-300 mb-2 animate-twinkle" />
              <span className="font-serif-editorial text-2xl text-white font-light">
                Fatima&apos;s Keepsake
              </span>
              <span className="font-handwriting text-xl text-pink-200 mt-1">
                A bouquet of sweet moments
              </span>
              <div className="mt-3 flex gap-2">
                <Heart className="w-4 h-4 text-purple-300 fill-purple-300/40" />
                <Star className="w-4 h-4 text-pink-300 fill-pink-300/40" />
                <Flower2 className="w-4 h-4 text-rose-300" />
              </div>
            </div>
          </motion.div>

          {/* ========================================================
              EXPLODING 2D PIECES (Choreographed motion)
              ======================================================== */}

          {/* Piece 1: Top-Left Polaroid Photo */}
          <motion.div
            style={{
              x: piece1X,
              y: piece1Y,
              rotate: piece1Rotate,
              scale: piece1Scale,
            }}
            className="absolute z-20"
          >
            <div className="p-2 pb-5 bg-white/95 rounded-lg shadow-2xl border border-pink-200/50 w-36 sm:w-44 text-black">
              <div className="relative w-full aspect-square rounded overflow-hidden">
                <Image
                  src="/images/fatima/memory_flowers.jpg"
                  alt="Snapshot"
                  fill
                  sizes="180px"
                  className="object-cover"
                />
              </div>
              <p className="font-handwriting text-xs text-gray-800 text-center mt-2 font-semibold">
                Pure Radiance 🌸
              </p>
            </div>
          </motion.div>

          {/* Piece 2: Top-Right Starlight Compass & Ribbons */}
          <motion.div
            style={{
              x: piece2X,
              y: piece2Y,
              rotate: piece2Rotate,
              scale: piece2Scale,
            }}
            className="absolute z-20"
          >
            <div className="p-4 rounded-2xl glass-panel border border-pink-300/40 shadow-2xl flex flex-col items-center gap-2 text-center w-36 sm:w-44">
              <Compass className="w-6 h-6 text-purple-300 animate-spin" style={{ animationDuration: "20s" }} />
              <span className="font-serif-editorial text-sm text-pink-200">
                Guiding Star
              </span>
              <span className="text-[10px] text-white/60 tracking-wider">
                Illuminating every path
              </span>
            </div>
          </motion.div>

          {/* Piece 3: Bottom-Left Handwritten Note */}
          <motion.div
            style={{
              x: piece3X,
              y: piece3Y,
              rotate: piece3Rotate,
            }}
            className="absolute z-20"
          >
            <div className="p-4 rounded-xl bg-[#FFF7ED] border border-amber-200/60 shadow-2xl w-40 sm:w-48 text-[#09090F] rotate-[-4deg]">
              <div className="flex items-center gap-1.5 text-rose-500 mb-1">
                <Heart className="w-3.5 h-3.5 fill-rose-500" />
                <span className="text-[10px] uppercase font-bold tracking-wider">Note</span>
              </div>
              <p className="font-handwriting text-base text-gray-800 leading-snug">
                &ldquo;You make even the quietest days feel like poetry.&rdquo;
              </p>
            </div>
          </motion.div>

          {/* Piece 4: Bottom-Right Floral Keepsake */}
          <motion.div
            style={{
              x: piece4X,
              y: piece4Y,
              rotate: piece4Rotate,
            }}
            className="absolute z-20"
          >
            <div className="p-3 pb-4 rounded-2xl glass-panel border border-purple-400/40 shadow-2xl flex items-center gap-3 w-44 sm:w-52">
              <div className="p-2.5 rounded-xl bg-pink-500/20 text-pink-300">
                <Gift className="w-5 h-5" />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-serif-editorial text-xs text-white">
                  Precious Wishes
                </span>
                <span className="text-[10px] text-purple-200/70">
                  Wrapped in affection
                </span>
              </div>
            </div>
          </motion.div>

          {/* Drifting Floating Petals & Star Debris */}
          <motion.div
            style={{ x: petal1X, y: petal1Y }}
            className="absolute pointer-events-none z-10"
          >
            <div className="w-8 h-8 rounded-full bg-pink-400/40 blur-[2px] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
          </motion.div>

          <motion.div
            style={{ x: petal2X, y: petal2Y }}
            className="absolute pointer-events-none z-10"
          >
            <div className="w-10 h-10 rounded-full bg-purple-400/30 blur-[2px] flex items-center justify-center">
              <Star className="w-5 h-5 text-pink-200 fill-pink-200" />
            </div>
          </motion.div>

          {/* ========================================================
              NEW ASSEMBLED FINAL COMPOSITION (Phase 4 payoff)
              ======================================================== */}
          <motion.div
            style={{
              opacity: finalCrestOpacity,
              scale: finalCrestScale,
            }}
            className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none"
          >
            <div className="relative w-80 sm:w-96 p-8 rounded-3xl border-2 border-pink-400/50 bg-[#090916]/95 backdrop-blur-2xl shadow-[0_0_80px_rgba(249,168,212,0.4)] text-center flex flex-col items-center">
              {/* Crown / Star Top Badge */}
              <div className="p-3 rounded-full bg-gradient-to-tr from-pink-500 to-purple-600 text-white shadow-lg mb-3">
                <Sparkles className="w-6 h-6 animate-spin" style={{ animationDuration: "12s" }} />
              </div>

              <span className="text-[11px] uppercase tracking-[0.3em] text-pink-300 font-medium">
                Reassembled In Harmony
              </span>

              <h4 className="font-serif-editorial text-3xl sm:text-4xl text-white font-normal mt-1 glow-text-gold">
                Forever Radiant
              </h4>

              <div className="w-20 h-[1.5px] bg-gradient-to-r from-transparent via-pink-400 to-transparent my-3" />

              <p className="font-handwriting text-2xl text-purple-200">
                Fatima ♡
              </p>

              <p className="text-white/60 text-xs mt-2 max-w-xs font-light">
                All the scattered moments of love coalesce into one breathtaking truth: you are deeply celebrated.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom Scroll Cue */}
        <div className="absolute bottom-6 flex items-center gap-3 text-xs text-white/40 tracking-wider">
          <span>Phase: Scroll to trigger dimensional convergence</span>
        </div>
      </div>
    </div>
  );
}
