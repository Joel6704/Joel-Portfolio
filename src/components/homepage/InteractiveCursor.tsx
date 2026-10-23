import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const InteractiveCursor: React.FC = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth spring for the outer ring
  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Check if pointer is fine and not reduced motion
    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!isFinePointer || prefersReducedMotion) {
      return;
    }

    setIsEnabled(true);

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    // Track when hovering over clickable elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'A' ||
          target.tagName === 'BUTTON' ||
          target.closest('a') ||
          target.closest('button') ||
          target.getAttribute('role') === 'button')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.body.addEventListener('mouseenter', handleMouseEnter);
    document.body.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isEnabled || !isVisible) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden="true">
      {/* 1. Outer Smooth Follow Ring */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovered ? 1.6 : 1,
          borderColor: isHovered ? 'rgba(0, 229, 255, 0.9)' : 'rgba(0, 140, 255, 0.5)',
          backgroundColor: isHovered ? 'rgba(0, 229, 255, 0.08)' : 'transparent',
        }}
        transition={{ duration: 0.15 }}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-[#00E5FF]/60 shadow-[0_0_15px_rgba(0,229,255,0.4)] pointer-events-none"
      />

      {/* 2. Center Cyan Glowing Dot */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#00E5FF] shadow-[0_0_10px_#00E5FF,0_0_20px_#008CFF] pointer-events-none"
      />
    </div>
  );
};

// Decorative Cursor Guide Widget in lower-right hero area
export const CursorExperienceBadge: React.FC = () => {
  return (
    <div className="hidden lg:flex items-center gap-3 select-none pointer-events-none">
      {/* Curved Cyan Arrow */}
      <svg
        className="w-12 h-10 text-[#00E5FF] filter drop-shadow-[0_0_6px_#00E5FF]"
        viewBox="0 0 60 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 10 32 C 25 10, 40 12, 48 24"
          stroke="#00E5FF"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeDasharray="3 3"
        />
        <polygon points="46,28 53,24 49,18" fill="#00E5FF" />
      </svg>

      {/* Decorative Cursor Illustration + Text */}
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#060D24]/80 border border-[#008CFF]/30 backdrop-blur-md shadow-[0_0_15px_rgba(0,140,255,0.18)]">
        {/* Glowing Cursor Icon */}
        <div className="w-5 h-5 rounded-full bg-[#008CFF]/20 flex items-center justify-center text-[#00E5FF] animate-pulse">
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M4 2l16 12-7.5 1.5 4.5 7.5-3 1.5-4.5-7.5-5.5 5.5z" />
          </svg>
        </div>
        <span className="font-space text-[11px] font-medium text-[#7DD3FC] tracking-wide">
          Move your cursor for a dynamic experience
        </span>
      </div>
    </div>
  );
};
