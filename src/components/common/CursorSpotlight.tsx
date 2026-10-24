import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface CursorSpotlightProps {
  className?: string;
  isIntro?: boolean;
}

/**
 * CursorSpotlight: A soft, mouse-following radial gradient glow with electric blue & purple hues.
 * Glides smoothly across the background without blocking clicks or obscuring text.
 * Falls back to a subtle static ambient glow on mobile and touch devices.
 */
export const CursorSpotlight: React.FC<CursorSpotlightProps> = ({
  className = '',
  isIntro = false,
}) => {
  const [isDesktop] = useState(() => {
    if (typeof window === 'undefined') return false;
    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return isFinePointer && !prefersReducedMotion;
  });
  const [isVisible, setIsVisible] = useState(false);

  // Mouse coordinate motion values
  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);

  // Smooth spring damping for a fluid, floating spotlight effect
  const springConfig = { damping: 30, stiffness: 180, mass: 0.8 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (!isDesktop) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.body.addEventListener('mouseleave', handleMouseLeave);
    document.body.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isDesktop, mouseX, mouseY, isVisible]);

  // Mobile / Touch or reduced motion fallback: Static ambient glow
  if (!isDesktop) {
    return (
      <div
        className={`pointer-events-none fixed inset-0 z-0 overflow-hidden ${className}`}
        aria-hidden="true"
      >
        <div
          className="absolute inset-0"
          style={{
            background: isIntro
              ? 'radial-gradient(circle 500px at 50% 45%, rgba(0, 140, 255, 0.18) 0%, rgba(139, 92, 246, 0.12) 40%, transparent 70%)'
              : 'radial-gradient(ellipse 700px 450px at 50% 15%, rgba(0, 140, 255, 0.14) 0%, rgba(139, 92, 246, 0.08) 45%, transparent 75%)',
          }}
        />
      </div>
    );
  }

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <motion.div
        className="absolute top-0 left-0 w-[700px] h-[700px] rounded-full pointer-events-none transition-opacity duration-700"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isVisible ? (isIntro ? 0.35 : 0.22) : 0,
          background:
            'radial-gradient(circle, rgba(0, 229, 255, 0.22) 0%, rgba(0, 140, 255, 0.18) 25%, rgba(139, 92, 246, 0.14) 50%, rgba(124, 58, 237, 0.05) 70%, transparent 85%)',
          filter: 'blur(45px)',
          willChange: 'transform, opacity',
        }}
      />
    </div>
  );
};

export default CursorSpotlight;
