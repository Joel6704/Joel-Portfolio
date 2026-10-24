import React, { useRef, useState, useEffect } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

interface MagneticProps {
  children: React.ReactNode;
  strength?: number; // Distance multiplier (default: 0.25)
  maxOffset?: number; // Max pixel pull limit (default: 14)
  className?: string;
  disabled?: boolean;
}

/**
 * Magnetic component that smoothly pulls its content toward the mouse cursor
 * when hovered, snapping back on leave. Automatically disables on mobile/touch screens
 * or if reduced motion is preferred.
 */
export const Magnetic: React.FC<MagneticProps> = ({
  children,
  strength = 0.25,
  maxOffset = 14,
  className = '',
  disabled = false,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [canHover, setCanHover] = useState(() => {
    if (typeof window === 'undefined') return false;
    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return isFinePointer && !prefersReducedMotion && !disabled;
  });

  // Motion values for magnetic displacement
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth, snappy spring physics for magnetic effect
  const springConfig = { damping: 18, stiffness: 220, mass: 0.6 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  useEffect(() => {
    const handleMediaChange = () => {
      const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      setCanHover(isFinePointer && !prefersReducedMotion && !disabled);
    };

    const fineMedia = window.matchMedia('(hover: hover) and (pointer: fine)');
    fineMedia.addEventListener('change', handleMediaChange);
    return () => fineMedia.removeEventListener('change', handleMediaChange);
  }, [disabled]);

  if (!canHover) {
    return <div className={className}>{children}</div>;
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;

    // Clamp within maxOffset bounds for a refined, professional feel
    const clampedX = Math.max(-maxOffset, Math.min(maxOffset, deltaX));
    const clampedY = Math.max(-maxOffset, Math.min(maxOffset, deltaY));

    x.set(clampedX);
    y.set(clampedY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: smoothX, y: smoothY }}
      className={`inline-block ${className}`}
      data-magnetic="true"
    >
      {children}
    </motion.div>
  );
};

export default Magnetic;
