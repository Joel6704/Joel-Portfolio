import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ThreeIntroCanvas } from './intro/ThreeIntroCanvas';
import { CursorSpotlight } from './common/CursorSpotlight';

interface WelcomeIntroProps {
  onComplete: () => void;
}

// Configured for 5 to 8 seconds intro sequence (Total runtime: ~6.8 seconds)
const TIMING = {
  phase1_opening: 700,     // 0.7s: 3D scene emerges from midnight navy
  phase2_welcome: 1800,    // 1.8s: "WELCOME" dramatic scale & glow reveal
  phase3_name: 3200,       // 3.2s: "JOEL THOMAS" centerpiece reveal
  phase4_portfolio: 4400,  // 4.4s: "PORTFOLIO" bold glowing reveal
  phase5_hold: 5800,       // 5.8s: Cinematic hold & glow pulse
  phase6_transition: 6800, // 6.8s: Fly-through camera push-in warp into Home
};

export const WelcomeIntro: React.FC<WelcomeIntroProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<number>(1);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const timeoutsRef = useRef<number[]>([]);

  // Mouse Parallax for Typography Tilt in 3D Space
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 24, stiffness: 130 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // 3D Perspective Rotation for text
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-14, 14]);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [11, -11]);

  const handleFinish = useCallback(() => {
    setIsTransitioning(true);
    // Smooth 0.75s transition into Home Page
    setTimeout(() => {
      onComplete();
    }, 700);
  }, [onComplete]);

  // Keyboard shortcut (Escape, Space, or Enter to skip)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
        handleFinish();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleFinish]);

  // Mouse tracking for 3D tilt
  useEffect(() => {
    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isFinePointer && !prefersReducedMotion) {
      const handleMouseMove = (e: MouseEvent) => {
        const normX = e.clientX / window.innerWidth - 0.5;
        const normY = e.clientY / window.innerHeight - 0.5;
        mouseX.set(normX);
        mouseY.set(normY);
      };

      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, [mouseX, mouseY]);

  // 5 to 8 Second Cinematic Timing Orchestration
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onComplete();
      return;
    }

    const t1 = window.setTimeout(() => setPhase(2), TIMING.phase1_opening);
    const t2 = window.setTimeout(() => setPhase(3), TIMING.phase2_welcome);
    const t3 = window.setTimeout(() => setPhase(4), TIMING.phase3_name);
    const t4 = window.setTimeout(() => setPhase(5), TIMING.phase4_portfolio);
    const t5 = window.setTimeout(() => {
      setIsTransitioning(true);
    }, TIMING.phase5_hold);
    const t6 = window.setTimeout(() => {
      onComplete();
    }, TIMING.phase6_transition);

    timeoutsRef.current = [t1, t2, t3, t4, t5, t6];

    return () => {
      timeoutsRef.current.forEach((t) => clearTimeout(t));
    };
  }, [onComplete]);

  const portfolioLetters = "PORTFOLIO".split('');

  return (
    <motion.div
      onClick={handleFinish}
      initial={{ opacity: 1 }}
      animate={{
        opacity: isTransitioning ? 0 : 1,
        scale: isTransitioning ? 1.09 : 1,
        filter: isTransitioning ? 'blur(10px)' : 'blur(0px)',
      }}
      exit={{
        opacity: 0,
        scale: 1.12,
        filter: 'blur(12px)',
        transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
      }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-50 bg-[#030712] flex flex-col items-center justify-center px-6 overflow-hidden select-none cursor-default"
      style={{ perspective: 1200 }}
    >
      {/* 1. Immersive 3D Background with Floating Rings, Glass Spheres & Shimmering Dust */}
      <ThreeIntroCanvas isTransitioning={isTransitioning} />

      {/* 2. Soft Cursor Spotlight Glow following mouse across dark navy background */}
      <CursorSpotlight isIntro={true} />

      {/* 3. Deep Midnight Background Radial Vignette */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background:
            'radial-gradient(ellipse 90% 80% at 50% 50%, rgba(3, 7, 18, 0.2) 0%, rgba(3, 7, 18, 0.72) 65%, #030712 100%)',
        }}
      />

      {/* 4. Center Typography Composition with 3D Depth Tilt */}
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative z-10 max-w-6xl w-full text-center flex flex-col items-center justify-center pointer-events-none select-none py-4"
      >
        {/* ── Line 1: "WELCOME" (Significantly Increased Size + Cyan Electric Shimmer Effect) ── */}
        <div className="overflow-hidden mb-1 sm:mb-2">
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.88 }}
            animate={{
              opacity: phase >= 2 ? 1 : 0,
              y: phase >= 2 ? 0 : 40,
              scale: phase >= 2 ? 1 : 0.88,
            }}
            transition={{
              duration: 0.85,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="flex items-center justify-center gap-4 sm:gap-6"
          >
            {/* Left Expanding Cyan Neon Beam */}
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: phase >= 2 ? 1 : 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden sm:inline-block w-12 sm:w-24 lg:w-32 h-[3px] rounded-full origin-right shadow-[0_0_12px_#00E5FF]"
              style={{
                background: 'linear-gradient(90deg, transparent, #00E5FF)',
              }}
            />

            {/* Bold Oversized WELCOME Heading */}
            <h2 className="font-heading font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl uppercase tracking-[0.24em] sm:tracking-[0.32em] text-gradient-welcome drop-shadow-[0_0_35px_rgba(0,229,255,0.7)] select-none">
              WELCOME
            </h2>

            {/* Right Expanding Purple Neon Beam */}
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: phase >= 2 ? 1 : 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden sm:inline-block w-12 sm:w-24 lg:w-32 h-[3px] rounded-full origin-left shadow-[0_0_12px_#A855F7]"
              style={{
                background: 'linear-gradient(90deg, #A855F7, transparent)',
              }}
            />
          </motion.div>
        </div>

        {/* ── Line 2: "JOEL THOMAS" (Heroic Luxury Centerpiece with Animated Gradient & Glow) ── */}
        <div className="overflow-hidden my-1 sm:my-2 px-4">
          <motion.div
            initial={{ opacity: 0, y: 55, scale: 0.9 }}
            animate={{
              opacity: phase >= 3 ? 1 : 0,
              y: phase >= 3 ? 0 : 55,
              scale: phase >= 3 ? 1 : 0.9,
            }}
            transition={{
              duration: 1.0,
              delay: 0.05,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative"
          >
            <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-[5.8rem] xl:text-[6.5rem] uppercase tracking-tight leading-[1.04] relative inline-block select-none">
              <span className="text-gradient-intro drop-shadow-[0_0_50px_rgba(0,140,255,0.8)] drop-shadow-[0_0_90px_rgba(168,85,247,0.6)]">
                JOEL THOMAS
              </span>

              {/* Glowing Dimensional Halo Aura behind name */}
              <span
                className="absolute -inset-x-12 -inset-y-6 rounded-full pointer-events-none opacity-50 blur-3xl"
                style={{
                  background:
                    'radial-gradient(ellipse at center, rgba(0, 229, 255, 0.5) 0%, rgba(168, 85, 247, 0.4) 45%, transparent 75%)',
                }}
                aria-hidden="true"
              />
            </h1>
          </motion.div>
        </div>

        {/* ── Line 3: "PORTFOLIO" (Significantly Increased Size + Letter Reveal + Purple/Cyan Effect) ── */}
        <div className="overflow-hidden mt-1 sm:mt-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{
              opacity: phase >= 4 ? 1 : 0,
              scale: phase >= 4 ? 1 : 0.92,
            }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-center gap-2 sm:gap-4 md:gap-5"
          >
            <div className="flex items-center justify-center gap-1.5 sm:gap-3 lg:gap-4 tracking-[0.28em] sm:tracking-[0.38em] lg:tracking-[0.45em] uppercase font-heading font-black text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-gradient-portfolio drop-shadow-[0_0_35px_rgba(168,85,247,0.7)]">
              {portfolioLetters.map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 25, scale: 0.8 }}
                  animate={{
                    opacity: phase >= 4 ? 1 : 0,
                    y: phase >= 4 ? 0 : 25,
                    scale: phase >= 4 ? 1 : 0.8,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: 0.15 + index * 0.045,
                    ease: 'easeOut',
                  }}
                  className="inline-block transition-transform duration-200 hover:scale-110"
                >
                  {char}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Dynamic Expanding Glowing Neon Beam Underneath */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{
            opacity: phase >= 4 ? 0.9 : 0,
            scaleX: phase >= 4 ? 1 : 0,
          }}
          transition={{ duration: 0.9, delay: 0.45, ease: 'easeOut' }}
          className="w-48 sm:w-80 lg:w-96 h-[3px] mt-6 sm:mt-8 rounded-full bg-gradient-to-r from-transparent via-[#00E5FF] to-transparent shadow-[0_0_20px_#00E5FF,0_0_35px_#A855F7]"
        />
      </motion.div>
    </motion.div>
  );
};

export default WelcomeIntro;
