"use client";

import React, { useState } from "react";
import { FilmGrain } from "@/components/FilmGrain";
import { AtmosphericLightRays } from "@/components/AtmosphericLightRays";
import { ParticleLayer } from "@/components/ParticleLayer";
import { CustomCursor } from "@/components/CustomCursor";
import { FixedNav } from "@/components/FixedNav";
import { CinematicIntro } from "@/components/CinematicIntro";
import { HeroSection } from "@/components/HeroSection";
import { ExplodedScene } from "@/components/ExplodedScene";
import { LittleMomentsSection } from "@/components/LittleMomentsSection";
import { GooeyRevealSection } from "@/components/GooeyRevealSection";
import { MemoryGallerySection } from "@/components/MemoryGallerySection";
import { HeartfeltMessageSection } from "@/components/HeartfeltMessageSection";
import { DreamsSection } from "@/components/DreamsSection";
import { SurpriseSection } from "@/components/SurpriseSection";
import { FinalCelebration } from "@/components/FinalCelebration";

export default function Home() {
  const [isSurpriseOpen, setIsSurpriseOpen] = useState(false);

  return (
    <main className="relative min-h-screen bg-[#05050A] text-[#FFF7ED] overflow-x-hidden">
      {/* Visual Ambiance Layers */}
      <FilmGrain />
      <AtmosphericLightRays intensity={0.16} interactive={true} />
      <ParticleLayer petalCount={24} starCount={40} />
      <CustomCursor />

      {/* Floating Header Navigation */}
      <FixedNav />

      {/* 01 — Cinematic Intro */}
      <CinematicIntro />

      {/* 02 & 03 — Happy Birthday Hero & Magical World */}
      <HeroSection />

      {/* 04 — Exploded Birthday Scene */}
      <ExplodedScene />

      {/* 05 — The Little Moments */}
      <LittleMomentsSection />

      {/* 06 — Interactive Gooey Reveal */}
      <GooeyRevealSection />

      {/* 07 — Memory Gallery / Scrapbook */}
      <MemoryGallerySection />

      {/* 08 — Heartfelt Message */}
      <HeartfeltMessageSection />

      {/* 09 — Dream Big */}
      <DreamsSection />

      {/* 10 — Surprise Sequence */}
      <SurpriseSection onOpenSurprise={() => setIsSurpriseOpen(true)} />

      {/* 11, 12, 13 — Final Celebration & One More Wish */}
      <FinalCelebration isOpen={isSurpriseOpen} />
    </main>
  );
}
