"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Sparkles, Heart } from "lucide-react";

export function LittleMomentsSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.25 });

  const lines = [
    { text: "the laughs", subtitle: "Effortless warmth that brightens any room" },
    { text: "the late nights", subtitle: "Quiet hours filled with thoughts and quiet comfort" },
    { text: "the random memories", subtitle: "Moments that wandered everywhere and mean everything" },
    { text: "the tiny things that make a day special", subtitle: "Small, beautiful sparks that make life sweeter" },
  ];

  return (
    <section
      id="little-moments"
      ref={containerRef}
      className="relative w-full min-h-screen py-28 px-6 sm:px-12 flex items-center justify-center bg-gradient-to-b from-[#05050A] via-[#0b0a17] to-[#05050A] overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(167,139,250,0.1)_0%,rgba(249,168,212,0.06)_50%,transparent_75%)] blur-3xl pointer-events-none" />

      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-14 items-center">
        {/* Left Column: Consistent Generated Artwork */}
        <div className="lg:col-span-6 flex justify-center order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 30 }}
            animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[420px] aspect-[3/4] p-3 rounded-3xl border border-pink-400/20 bg-gradient-to-b from-purple-950/20 to-black/40 shadow-2xl backdrop-blur-md"
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden">
              <Image
                src="/images/birthday/little_things.jpg"
                alt="A cozy, dreamy birthday moment"
                fill
                sizes="(max-width: 768px) 100vw, 450px"
                className="object-cover object-center transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#05050A]/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white/80">
                <span className="font-serif-editorial italic text-base text-pink-200">
                  Peaceful morning grace
                </span>
                <span className="p-1 rounded-full bg-white/10 backdrop-blur-sm">
                  <Sparkles className="w-3.5 h-3.5 text-pink-300" />
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Progressive Typography Reveal */}
        <div className="lg:col-span-6 flex flex-col justify-center order-1 lg:order-2">
          {/* Tag */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-400/30 bg-purple-950/30 text-purple-200 text-xs uppercase tracking-[0.25em] mb-4 w-fit"
          >
            <Heart className="w-3 h-3 text-pink-400 fill-pink-400/40" />
            <span>Gratitude & Reflection</span>
          </motion.div>

          {/* Heading */}
          <motion.h3
            initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-serif-editorial text-4xl sm:text-5xl md:text-6xl font-light text-white tracking-wide"
          >
            THE LITTLE MOMENTS
          </motion.h3>

          <div className="w-20 h-[1.5px] bg-gradient-to-r from-pink-400 to-transparent my-6" />

          {/* Progressive List */}
          <div className="flex flex-col gap-6">
            {lines.map((item, index) => (
              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  y: 25,
                  filter: "blur(8px)",
                }}
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
                  duration: 0.9,
                  delay: 0.4 + index * 0.18,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group flex flex-col pl-4 border-l-2 border-purple-500/20 hover:border-pink-400 transition-colors duration-300"
              >
                <div className="flex items-center gap-3">
                  <span className="font-serif-editorial text-2xl sm:text-3xl text-white group-hover:text-pink-200 transition-colors lowercase">
                    {item.text}
                  </span>
                </div>
                <span className="text-white/50 text-xs sm:text-sm font-light mt-0.5 tracking-wide">
                  {item.subtitle}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
