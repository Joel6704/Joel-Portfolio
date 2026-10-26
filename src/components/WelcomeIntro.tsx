import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { ThreeIntroCanvas } from './intro/ThreeIntroCanvas';
import { CursorSpotlight } from './common/CursorSpotlight';

interface WelcomeIntroProps {
  onComplete: () => void;
}

export const WelcomeIntro: React.FC<WelcomeIntroProps> = ({ onComplete }) => {
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const hasNavigatedRef = useRef<boolean>(false);
  const autoNavTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const transitionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleFinish = useCallback(() => {
    if (hasNavigatedRef.current) return;
    hasNavigatedRef.current = true;

    // Clear 6s auto-navigation timer if still running
    if (autoNavTimerRef.current) {
      clearTimeout(autoNavTimerRef.current);
      autoNavTimerRef.current = null;
    }

    setIsTransitioning(true);

    // Smooth 0.65s transition into Home Page
    transitionTimerRef.current = setTimeout(() => {
      onComplete();
    }, 650);
  }, [onComplete]);

  // Automatically navigate to the homepage after 6 seconds (6000ms)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      handleFinish();
      return;
    }

    autoNavTimerRef.current = setTimeout(() => {
      handleFinish();
    }, 6000);

    return () => {
      if (autoNavTimerRef.current) {
        clearTimeout(autoNavTimerRef.current);
        autoNavTimerRef.current = null;
      }
      if (transitionTimerRef.current) {
        clearTimeout(transitionTimerRef.current);
        transitionTimerRef.current = null;
      }
    };
  }, [handleFinish]);

  // Keyboard accessibility (Escape, Enter, or Space to proceed immediately)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        handleFinish();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleFinish]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{
        opacity: isTransitioning ? 0 : 1,
        scale: isTransitioning ? 1.06 : 1,
        filter: isTransitioning ? 'blur(10px)' : 'blur(0px)',
      }}
      exit={{
        opacity: 0,
        scale: 1.08,
        filter: 'blur(12px)',
        transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
      }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-50 bg-[#020617] flex items-center justify-center overflow-hidden select-none"
    >
      {/* 1. Interactive 3D Canvas: Large Luminous Sphere, Curved Glowing Ribbons & Floating Spheres */}
      <ThreeIntroCanvas isTransitioning={isTransitioning} />

      {/* 2. Soft Electric-Blue Cursor Spotlight Glow */}
      <CursorSpotlight isIntro={true} />

      {/* 3. Atmospheric Lighting & Radial Vignette Gradients */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background:
            'radial-gradient(circle at 20% 50%, rgba(0, 102, 255, 0.16) 0%, transparent 55%), radial-gradient(circle at 75% 50%, rgba(0, 140, 255, 0.22) 0%, rgba(0, 229, 255, 0.08) 35%, transparent 65%), radial-gradient(ellipse 95% 85% at 50% 50%, rgba(2, 6, 23, 0.15) 0%, rgba(2, 6, 23, 0.75) 75%, #020617 100%)',
        }}
        aria-hidden="true"
      />

      {/* 4. Cinematic Soft Cyan Light Beams */}
      <div
        className="absolute -top-32 right-1/4 w-96 h-96 rounded-full pointer-events-none z-[1] opacity-35 blur-[100px]"
        style={{
          background: 'radial-gradient(circle, rgba(0, 229, 255, 0.4) 0%, rgba(0, 102, 255, 0.2) 50%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* 5. Main Content Composition */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 min-h-screen flex items-center pointer-events-none">
        <div className="w-full lg:w-[58%] xl:w-[54%] flex flex-col items-center text-center mx-auto lg:mx-0 py-8">
          
          {/* ── Element 1: WELCOME Heading ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center justify-center mb-1 sm:mb-2"
          >
            <span className="text-white font-sans font-semibold text-xs sm:text-sm tracking-[0.38em] sm:tracking-[0.46em] uppercase">
              WELCOME
            </span>
            {/* Subtle Cyan Accent Underneath */}
            <span
              className="w-8 sm:w-12 h-[2px] mt-2 rounded-full shadow-[0_0_8px_#00E5FF]"
              style={{
                background: 'linear-gradient(90deg, transparent, #00E5FF, transparent)',
              }}
            />
          </motion.div>

          {/* ── Element 2: Main Heading (JOEL THOMAS in One Line) ── */}
          <div className="overflow-hidden my-2 sm:my-3 max-w-full">
            <motion.h1
              initial={{ y: '105%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              transition={{ duration: 0.95, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="font-intro font-bold tracking-[-0.02em] uppercase select-none leading-none text-3xl min-[400px]:text-4xl sm:text-5xl md:text-6xl lg:text-[4.4rem] xl:text-[5.2rem] whitespace-nowrap flex items-center justify-center gap-2.5 sm:gap-4 lg:gap-5"
            >
              {/* JOEL in pure white */}
              <span className="text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)]">
                JOEL
              </span>
              {/* THOMAS in vibrant electric blue with glow */}
              <span className="text-[#008CFF] drop-shadow-[0_0_30px_rgba(0,140,255,0.85)] drop-shadow-[0_0_65px_rgba(0,102,255,0.45)]">
                THOMAS
              </span>
            </motion.h1>
          </div>

          {/* ── Element 3: Professional Description ── */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-white font-sans font-medium text-base sm:text-lg md:text-xl tracking-normal sm:tracking-wide whitespace-normal sm:whitespace-nowrap mt-2 sm:mt-3"
          >
            Digital Marketing | Social Media Management
          </motion.p>

          {/* ── Element 4: Supporting Text ── */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-[#38BDF8] font-sans font-normal text-sm sm:text-base tracking-wider mt-2 sm:mt-2.5"
          >
            Turning Ideas Into Digital Experiences.
          </motion.p>

          {/* ── Element 5: Glowing CTA Button ── */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 2.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 sm:mt-8 pt-1"
          >
            <button
              id="intro-explore-btn"
              type="button"
              onClick={handleFinish}
              className="group relative inline-flex items-center justify-center gap-2.5 px-8 py-3.5 sm:px-9 sm:py-4 rounded-full text-white font-sans font-medium text-sm sm:text-base tracking-wide transition-all duration-300 pointer-events-auto cursor-pointer select-none overflow-hidden hover:-translate-y-0.5 hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background: 'linear-gradient(135deg, #0052CC 0%, #0066FF 45%, #008CFF 80%, #00B4D8 100%)',
                boxShadow:
                  '0 0 24px rgba(0, 102, 255, 0.55), 0 0 45px rgba(0, 229, 255, 0.28), inset 0 1px 1px rgba(255, 255, 255, 0.45)',
                border: '1px solid rgba(0, 229, 255, 0.65)',
              }}
            >
              {/* Soft inner glow sheen on hover */}
              <span
                className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: 'radial-gradient(circle at center, rgba(0, 229, 255, 0.35) 0%, transparent 70%)',
                }}
              />

              <span className="relative z-10 flex items-center gap-2 text-white font-semibold tracking-wide">
                Explore My Portfolio
                <span className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-1 text-cyan-200 text-lg leading-none">
                  ↗
                </span>
              </span>
            </button>
          </motion.div>

        </div>
      </div>
    </motion.div>
  );
};

export default WelcomeIntro;
