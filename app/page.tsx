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
import { LittleThingsSection } from "@/components/LittleThingsSection";
import { GooeyRevealSection } from "@/components/GooeyRevealSection";
import { MemorySection } from "@/components/MemorySection";
import { LetterSection } from "@/components/LetterSection";
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

      {/* SCENE 01 — Cinematic Intro */}
      <CinematicIntro />

      {/* SCENE 02 — Fatima Hero Section */}
      <HeroSection />

      {/* SCENE 03 & 04 — The World Opens & Exploded View Interaction */}
      <ExplodedScene />

      {/* SCENE 05 — The Little Things */}
      <LittleThingsSection />

      {/* SCENE 06 — Gooey Cursor Reveal Portal */}
      <GooeyRevealSection />

      {/* SCENE 07 — Memory Collage */}
      <MemorySection />

      {/* SCENE 08 — Heartfelt Letter */}
      <LetterSection />

      {/* SCENE 09 — Dreams & Wishes */}
      <DreamsSection />

      {/* SCENE 10 — Birthday Surprise */}
      <SurpriseSection onOpenSurprise={() => setIsSurpriseOpen(true)} />

      {/* SCENE 11 & 12 — Final Birthday Reveal & Celebration */}
      <FinalCelebration isOpen={isSurpriseOpen} />
    </main>
  );
}
