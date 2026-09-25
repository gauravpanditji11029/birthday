"use client";

import React, { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Menu, X } from "lucide-react";

export function FixedNav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Web Audio API ambient dream chime arpeggiator
  const toggleAudio = () => {
    if (isAudioPlaying) {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
        audioCtxRef.current = null;
      }
      setIsAudioPlaying(false);
      return;
    }

    try {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioContextClass();
      audioCtxRef.current = ctx;

      // Gentle pentatonic chime notes (F4, A4, C5, D5, F5, G5, A5, C6)
      const frequencies = [349.23, 440.0, 523.25, 587.33, 698.46, 783.99, 880.0, 1046.5];

      const playChime = (freq: number) => {
        if (!ctx || ctx.state === "closed") return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        // Soft sine tone with gentle harmonic
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.05, ctx.currentTime + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 3.2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 3.5);
      };

      // Play soothing random arpeggios
      let step = 0;
      const runSequence = () => {
        const chordNote = frequencies[step % frequencies.length];
        playChime(chordNote);
        if (Math.random() > 0.4) {
          setTimeout(() => {
            const harmony = frequencies[(step + 2) % frequencies.length];
            playChime(harmony);
          }, 350);
        }
        step = (step + Math.floor(Math.random() * 3) + 1) % frequencies.length;
      };

      runSequence();
      timerRef.current = window.setInterval(runSequence, 1200);
      setIsAudioPlaying(true);
    } catch {
      setIsAudioPlaying(false);
    }
  };

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 px-6 sm:px-12 py-5 transition-all duration-500 ${
          isScrolled
            ? "bg-[#05050A]/70 backdrop-blur-md border-b border-purple-900/20 py-4 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left Brand */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group flex items-center gap-2 text-left focus:outline-none"
          >
            <span className="font-serif-editorial text-lg sm:text-xl font-light tracking-[0.18em] uppercase text-purple-200 group-hover:text-pink-300 transition-colors">
              Happy Birthday
            </span>
            <span className="text-pink-400 text-sm group-hover:scale-125 transition-transform duration-300">
              ♡
            </span>
          </button>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center gap-10">
            <button
              onClick={() => scrollTo("hero")}
              className="text-[12px] uppercase tracking-[0.24em] font-medium text-white/70 hover:text-white transition-colors duration-200"
            >
              Story
            </button>
            <button
              onClick={() => scrollTo("exploded-view")}
              className="text-[12px] uppercase tracking-[0.24em] font-medium text-white/70 hover:text-white transition-colors duration-200"
            >
              Explode
            </button>
            <button
              onClick={() => scrollTo("little-things")}
              className="text-[12px] uppercase tracking-[0.24em] font-medium text-white/70 hover:text-white transition-colors duration-200"
            >
              The Little Things
            </button>
            <button
              onClick={() => scrollTo("memories")}
              className="text-[12px] uppercase tracking-[0.24em] font-medium text-white/70 hover:text-white transition-colors duration-200"
            >
              Memories
            </button>
            <button
              onClick={() => scrollTo("letter")}
              className="text-[12px] uppercase tracking-[0.24em] font-medium text-white/70 hover:text-white transition-colors duration-200"
            >
              Letter
            </button>
            <button
              onClick={() => scrollTo("surprise")}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-pink-400/40 text-[11px] uppercase tracking-[0.22em] text-pink-200 hover:text-white hover:border-pink-300 hover:bg-pink-500/10 hover:shadow-[0_0_15px_rgba(249,168,212,0.3)] transition-all duration-300"
            >
              <span>Surprise</span>
              <span className="text-xs">✦</span>
            </button>

            {/* Audio chime button */}
            <button
              onClick={toggleAudio}
              aria-label="Toggle Dream Music"
              className={`p-2 rounded-full border transition-all duration-300 ${
                isAudioPlaying
                  ? "border-pink-400/60 bg-pink-500/20 text-pink-200 shadow-[0_0_12px_rgba(249,168,212,0.4)]"
                  : "border-white/20 text-white/60 hover:text-white hover:border-white/40"
              }`}
              title={isAudioPlaying ? "Mute dreamy chimes" : "Play ambient starlight chimes"}
            >
              {isAudioPlaying ? (
                <Volume2 className="w-4 h-4 animate-pulse" />
              ) : (
                <VolumeX className="w-4 h-4" />
              )}
            </button>
          </nav>

          {/* Mobile Menu & Audio Buttons */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={toggleAudio}
              aria-label="Toggle Dream Music"
              className={`p-2 rounded-full border ${
                isAudioPlaying
                  ? "border-pink-400/60 bg-pink-500/20 text-pink-200"
                  : "border-white/20 text-white/60"
              }`}
            >
              {isAudioPlaying ? (
                <Volume2 className="w-4 h-4" />
              ) : (
                <VolumeX className="w-4 h-4" />
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white/80 hover:text-white"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-[#05050A]/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-8 md:hidden">
          <button
            onClick={() => scrollTo("hero")}
            className="font-serif-editorial text-2xl tracking-[0.2em] uppercase text-white/90 hover:text-pink-300"
          >
            Story
          </button>
          <button
            onClick={() => scrollTo("exploded-view")}
            className="font-serif-editorial text-2xl tracking-[0.2em] uppercase text-white/90 hover:text-pink-300"
          >
            Explode
          </button>
          <button
            onClick={() => scrollTo("little-things")}
            className="font-serif-editorial text-2xl tracking-[0.2em] uppercase text-white/90 hover:text-pink-300"
          >
            The Little Things
          </button>
          <button
            onClick={() => scrollTo("memories")}
            className="font-serif-editorial text-2xl tracking-[0.2em] uppercase text-white/90 hover:text-pink-300"
          >
            Memories
          </button>
          <button
            onClick={() => scrollTo("letter")}
            className="font-serif-editorial text-2xl tracking-[0.2em] uppercase text-white/90 hover:text-pink-300"
          >
            Letter
          </button>
          <button
            onClick={() => scrollTo("surprise")}
            className="mt-4 px-8 py-3 rounded-full border border-pink-400 text-pink-200 uppercase tracking-[0.24em] text-sm bg-pink-500/10"
          >
            Surprise ✦
          </button>
        </div>
      )}
    </>
  );
}
