import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ThreeIntroCanvas } from './intro/ThreeIntroCanvas';
import { CursorSpotlight } from './common/CursorSpotlight';

interface WelcomeIntroProps {
  onComplete: () => void;
}

// Configurable timing phases (in milliseconds)
const TIMING = {
  phase1_opening: 1800, // Atmospheric Opening
  phase2_welcome: 3600, // "WELCOME" reveal
  phase3_name: 5600,    // "JOEL THOMAS" & "PORTFOLIO" reveal
  phase4_hold: 7800,    // Cinematic appreciation hold
  phase5_transition: 8800, // Final smooth camera push-in & transition
};

export const WelcomeIntro: React.FC<WelcomeIntroProps> = ({ onComplete }) => {
  // Current animation phase state
  const [phase, setPhase] = useState<number>(1);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const timeoutsRef = useRef<number[]>([]);

  // Mouse Parallax for Typography Tilt in 3D Space
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 120 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // 3D Perspective Rotation for text
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-12, 12]);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [10, -10]);

  const handleFinish = useCallback(() => {
    setIsTransitioning(true);
    // Allow 0.8s for final cinematic camera push-in and dissolve
    setTimeout(() => {
      onComplete();
    }, 750);
  }, [onComplete]);

  // Keyboard shortcut (Escape, Space, or Enter to smoothly proceed)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
        handleFinish();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleFinish]);

  // Mouse movement tracking for 3D tilt
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

  // Cinematic 5-Phase Sequence Orchestration (Total ~8-9s)
  useEffect(() => {
    // If reduced motion is requested, finish immediately
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onComplete();
      return;
    }

    const t1 = window.setTimeout(() => setPhase(2), TIMING.phase1_opening);
    const t2 = window.setTimeout(() => setPhase(3), TIMING.phase2_welcome);
    const t3 = window.setTimeout(() => setPhase(4), TIMING.phase3_name);
    const t4 = window.setTimeout(() => {
      setIsTransitioning(true);
    }, TIMING.phase4_hold);
    const t5 = window.setTimeout(() => {
      onComplete();
    }, TIMING.phase5_transition);

    timeoutsRef.current = [t1, t2, t3, t4, t5];

    return () => {
      timeoutsRef.current.forEach((t) => clearTimeout(t));
    };
  }, [onComplete]);

  // Letters for "PORTFOLIO" staggered reveal
  const portfolioLetters = "PORTFOLIO".split('');

  return (
    <motion.div
      onClick={handleFinish}
      initial={{ opacity: 1 }}
      animate={{
        opacity: isTransitioning ? 0 : 1,
        scale: isTransitioning ? 1.08 : 1,
        filter: isTransitioning ? 'blur(10px)' : 'blur(0px)',
      }}
      exit={{
        opacity: 0,
        scale: 1.1,
        filter: 'blur(12px)',
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
      }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-50 bg-[#030712] flex flex-col items-center justify-center px-6 overflow-hidden select-none cursor-default perspective-1000"
      style={{ perspective: 1200 }}
    >
      {/* 1. Immersive 3D Background with Floating Objects, Metallic Rings & Glass Spheres */}
      <ThreeIntroCanvas isTransitioning={isTransitioning} />

      {/* 2. Soft Cursor Spotlight Glow following mouse across dark navy background */}
      <CursorSpotlight isIntro={true} />

      {/* 3. Deep Midnight Background Radial Vignette */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background:
            'radial-gradient(ellipse 90% 80% at 50% 50%, rgba(3, 7, 18, 0.25) 0%, rgba(3, 7, 18, 0.75) 65%, #030712 100%)',
        }}
      />

      {/* 4. Center Typography Composition with 3D Depth Tilt */}
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative z-10 max-w-5xl w-full text-center flex flex-col items-center justify-center pointer-events-none select-none"
      >
        {/* Line 1: "WELCOME" (Introductory Heading, Bold & Oversized) */}
        <div className="overflow-hidden mb-2 sm:mb-3">
          <motion.div
            initial={{ opacity: 0, y: 35, scale: 0.94 }}
            animate={{
              opacity: phase >= 2 ? 1 : 0,
              y: phase >= 2 ? 0 : 35,
              scale: phase >= 2 ? 1 : 0.94,
            }}
            transition={{
              duration: 1.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="flex items-center justify-center gap-3 sm:gap-4"
          >
            {/* Left Cyan Accent Dash */}
            <span
              className="hidden sm:inline-block w-8 sm:w-14 h-[2px] rounded-full"
              style={{
                background: 'linear-gradient(90deg, transparent, #00E5FF)',
              }}
            />

            <h2 className="font-space font-extrabold text-xs sm:text-sm md:text-base lg:text-lg tracking-[0.28em] sm:tracking-[0.38em] uppercase text-[#7DD3FC]/90 filter drop-shadow-[0_0_15px_rgba(0,229,255,0.5)]">
              WELCOME
            </h2>

            {/* Right Purple Accent Dash */}
            <span
              className="hidden sm:inline-block w-8 sm:w-14 h-[2px] rounded-full"
              style={{
                background: 'linear-gradient(90deg, #A855F7, transparent)',
              }}
            />
          </motion.div>
        </div>

        {/* Line 2: "JOEL THOMAS" (Main Heroic Focal Point with Animated Gradient & Light Sweep) */}
        <div className="overflow-hidden my-1 sm:my-2 px-4">
          <motion.div
            initial={{ opacity: 0, y: 55, scale: 0.92 }}
            animate={{
              opacity: phase >= 3 ? 1 : 0,
              y: phase >= 3 ? 0 : 55,
              scale: phase >= 3 ? 1 : 0.92,
            }}
            transition={{
              duration: 1.3,
              delay: 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <h1 className="font-sora font-black text-4xl sm:text-6xl md:text-7xl lg:text-[5.4rem] xl:text-[5.9rem] uppercase tracking-[-0.03em] leading-[1.05] relative inline-block select-none">
              <span className="text-gradient-intro drop-shadow-[0_0_45px_rgba(0,140,255,0.75)] drop-shadow-[0_0_85px_rgba(168,85,247,0.55)]">
                JOEL THOMAS
              </span>

              {/* Glowing Dimensional Aura behind name */}
              <span
                className="absolute -inset-x-8 -inset-y-4 rounded-full pointer-events-none opacity-40 blur-2xl"
                style={{
                  background:
                    'radial-gradient(ellipse at center, rgba(0, 229, 255, 0.45) 0%, rgba(168, 85, 247, 0.35) 45%, transparent 75%)',
                }}
                aria-hidden="true"
              />
            </h1>
          </motion.div>
        </div>

        {/* Line 3: "PORTFOLIO" (Elegant Secondary Line with Wide Tracking) */}
        <div className="overflow-hidden mt-3 sm:mt-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: phase >= 3 ? 1 : 0 }}
            transition={{ duration: 0.9, delay: 0.55 }}
            className="flex items-center justify-center gap-1.5 sm:gap-2.5 tracking-[0.38em] sm:tracking-[0.48em] uppercase font-space font-semibold text-xs sm:text-sm md:text-base text-slate-300"
          >
            {portfolioLetters.map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 15 }}
                animate={{
                  opacity: phase >= 3 ? 1 : 0,
                  y: phase >= 3 ? 0 : 15,
                }}
                transition={{
                  duration: 0.6,
                  delay: 0.65 + index * 0.05,
                  ease: 'easeOut',
                }}
                className="inline-block transition-colors duration-300 hover:text-[#00E5FF]"
              >
                {char}
              </motion.span>
            ))}
          </motion.div>
        </div>

        {/* Dynamic Glowing Beam Underneath */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{
            opacity: phase >= 3 ? 0.75 : 0,
            scaleX: phase >= 3 ? 1 : 0,
          }}
          transition={{ duration: 1.2, delay: 0.8, ease: 'easeOut' }}
          className="w-40 sm:w-64 h-[2px] mt-6 sm:mt-7 rounded-full bg-gradient-to-r from-transparent via-[#00E5FF] to-transparent shadow-[0_0_18px_#00E5FF,0_0_30px_#A855F7]"
        />
      </motion.div>

      {/* Subtle Hint Indicator at Bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: phase >= 4 ? 0.5 : 0 }}
        transition={{ duration: 0.8 }}
        className="absolute bottom-6 sm:bottom-8 z-10 text-center pointer-events-none"
      >
        <span className="font-space text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.2em] text-slate-400">
          Entering Joel Thomas Portfolio
        </span>
      </motion.div>
    </motion.div>
  );
};

export default WelcomeIntro;
