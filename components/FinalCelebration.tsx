"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Heart, RotateCcw } from "lucide-react";

interface FinalCelebrationProps {
  isOpen: boolean;
}

export function FinalCelebration({ isOpen }: FinalCelebrationProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [wishMade, setWishMade] = useState(false);
  const [wishCount, setWishCount] = useState(0);

  // Custom celebration particle engine (fluttering petals, stars, hearts, stardust motes)
  const triggerCelebration = () => {
    setWishMade(true);
    setWishCount((prev) => prev + 1);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      rotation: number;
      vRot: number;
      color: string;
      alpha: number;
      type: "petal" | "star" | "heart" | "dust";
    }

    const colors = [
      "#F9A8D4", // blush pink
      "#EC4899", // soft rose
      "#A78BFA", // soft lavender
      "#C084FC", // dreamy violet
      "#FFF7ED", // warm cream
    ];

    const particles: Particle[] = [];
    const count = 95;
    const originX = canvas.width / 2;
    const originY = canvas.height * 0.7;

    for (let i = 0; i < count; i++) {
      const angle = (Math.random() - 0.5) * Math.PI * 1.4 - Math.PI / 2;
      const speed = 4 + Math.random() * 9;
      const types: ("petal" | "star" | "heart" | "dust")[] = ["petal", "star", "heart", "dust"];

      particles.push({
        x: originX + (Math.random() - 0.5) * 60,
        y: originY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 5 + Math.random() * 8,
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.08,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
        type: types[Math.floor(Math.random() * types.length)],
      });
    }

    let frameId: number;
    let life = 0;

    const loop = () => {
      life += 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.09; // gentle gravity
        p.vx *= 0.985; // drag
        p.rotation += p.vRot;
        p.alpha -= 0.005;

        if (p.alpha <= 0) return;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 10;

        if (p.type === "petal") {
          ctx.beginPath();
          ctx.moveTo(0, -p.size);
          ctx.quadraticCurveTo(p.size * 0.8, 0, 0, p.size);
          ctx.quadraticCurveTo(-p.size * 0.8, 0, 0, -p.size);
          ctx.fill();
        } else if (p.type === "star") {
          ctx.beginPath();
          ctx.moveTo(0, -p.size);
          ctx.lineTo(p.size * 0.3, -p.size * 0.3);
          ctx.lineTo(p.size, 0);
          ctx.lineTo(p.size * 0.3, p.size * 0.3);
          ctx.lineTo(0, p.size);
          ctx.lineTo(-p.size * 0.3, p.size * 0.3);
          ctx.lineTo(-p.size, 0);
          ctx.lineTo(-p.size * 0.3, -p.size * 0.3);
          ctx.closePath();
          ctx.fill();
        } else if (p.type === "heart") {
          const s = p.size * 0.5;
          ctx.beginPath();
          ctx.moveTo(0, s * 0.3);
          ctx.bezierCurveTo(-s, -s, -s * 2, s * 0.5, 0, s * 2);
          ctx.bezierCurveTo(s * 2, s * 0.5, s, -s, 0, s * 0.3);
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.4, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      });

      if (life < 260) {
        frameId = requestAnimationFrame(loop);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    loop();
  };

  useEffect(() => {
    if (isOpen) {
      const el = document.getElementById("final-celebration");
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <section
      id="final-celebration"
      ref={containerRef}
      className="relative w-full min-h-screen py-28 px-6 sm:px-12 flex flex-col items-center justify-center bg-gradient-to-b from-[#05050A] via-[#120e29] to-[#05050A] overflow-hidden select-none"
    >
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-50 w-full h-full"
      />

      {/* Atmospheric lighting pool */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[radial-gradient(circle,rgba(249,168,212,0.18)_0%,rgba(167,139,250,0.14)_40%,transparent_75%)] blur-3xl pointer-events-none" />

      {/* Floating fairy light lanterns */}
      <div className="absolute top-12 left-10 w-2 h-2 rounded-full bg-amber-300 shadow-[0_0_20px_#fde68a] animate-ping" />
      <div className="absolute top-24 right-14 w-2 h-2 rounded-full bg-pink-300 shadow-[0_0_20px_#f472b6] animate-ping" style={{ animationDelay: "1s" }} />

      {/* Main Grand Announcement */}
      <div className="text-center max-w-5xl mx-auto mb-12 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-pink-400/40 bg-pink-500/10 text-pink-200 text-xs uppercase tracking-[0.3em] mb-6"
        >
          <Sparkles className="w-4 h-4 text-pink-300 animate-twinkle" />
          <span>The Grand Celebration</span>
        </motion.div>

        {/* Huge Enormous “HAPPY BIRTHDAY” */}
        <motion.h2
          initial={{ opacity: 0, y: 25, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="font-serif-editorial text-5xl sm:text-7xl md:text-9xl font-light text-white tracking-[0.16em] uppercase glow-text-gold leading-none"
        >
          HAPPY BIRTHDAY
        </motion.h2>

        {/* Heart Glyph */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-pink-400 text-3xl sm:text-4xl my-3"
        >
          ♡
        </motion.div>

        {/* Prompt subtitle: “May this year be even more beautiful than the last.” */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 0.9, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="font-serif-editorial italic text-xl sm:text-3xl text-purple-200/90 font-light mt-2 max-w-xl mx-auto"
        >
          &ldquo;May this year be even more beautiful than the last.&rdquo;
        </motion.p>
      </div>

      {/* Main Celebration Artwork Frame */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.4, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-xl aspect-[3/4] p-4 rounded-3xl border-2 border-pink-400/40 bg-gradient-to-b from-purple-950/40 via-pink-950/20 to-black/60 shadow-[0_20px_90px_rgba(249,168,212,0.35)] backdrop-blur-xl mb-12"
      >
        <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
          <Image
            src="/images/birthday/celebration.jpg"
            alt="Celebrating with birthday cake, candles, and starlight"
            fill
            sizes="(max-width: 768px) 100vw, 600px"
            className="object-cover object-center transition-transform duration-1000 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#05050A]/70 via-transparent to-transparent pointer-events-none" />

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full bg-black/60 backdrop-blur-md border border-pink-300/40 text-center whitespace-nowrap shadow-lg">
            <span className="font-serif-editorial text-sm sm:text-base text-pink-200 tracking-wider">
              ✦ Surrounded by light, joy, and stardust ✦
            </span>
          </div>
        </div>
      </motion.div>

      {/* Button: “One More Wish ♡” */}
      <div className="relative z-30 flex flex-col items-center gap-6">
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={triggerCelebration}
          className="group relative inline-flex items-center gap-3 px-10 py-4 rounded-full border-2 border-pink-400 bg-gradient-to-r from-pink-500 via-purple-600 to-pink-500 text-white shadow-[0_0_40px_rgba(249,168,212,0.6)] cursor-pointer"
        >
          <Sparkles className="w-5 h-5 text-white animate-spin" style={{ animationDuration: "8s" }} />
          <span className="font-serif-editorial text-xl sm:text-2xl font-medium tracking-wider">
            One More Wish ♡
          </span>
          <Heart className="w-5 h-5 text-white fill-white group-hover:scale-125 transition-transform" />
        </motion.button>

        {/* Revealed Dedication:
            “Keep smiling.
            Keep dreaming.
            Keep being you. ♡”
            Finally: “HAPPY BIRTHDAY” */}
        <AnimatePresence>
          {wishMade && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 1 }}
              className="mt-6 text-center max-w-lg p-8 rounded-3xl glass-panel border border-pink-300/50 shadow-2xl"
            >
              <div className="font-serif-editorial text-2xl sm:text-3xl text-white font-light space-y-1">
                <p>Keep smiling.</p>
                <p>Keep dreaming.</p>
                <p className="font-handwriting text-3xl sm:text-4xl text-pink-300 font-semibold pt-1">
                  Keep being you. ♡
                </p>
              </div>

              <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-pink-400 to-transparent my-4 mx-auto" />

              <h3 className="font-serif-editorial text-3xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-white font-normal uppercase tracking-widest glow-text-gold">
                HAPPY BIRTHDAY
              </h3>

              <div className="mt-5 flex items-center justify-center gap-3">
                <button
                  onClick={triggerCelebration}
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-purple-200 hover:text-white px-4 py-2 rounded-full border border-purple-400/30 bg-purple-950/40 hover:bg-purple-900/50 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Replay Wish ({wishCount})</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <footer className="mt-28 text-center text-xs text-white/40 tracking-[0.25em] uppercase font-light">
        <p>A magical digital universe created for your birthday</p>
        <p className="mt-1 text-[10px] text-pink-300/50 font-serif-editorial lowercase italic tracking-wider">
          may every day feel like your favorite story
        </p>
      </footer>
    </section>
  );
}
