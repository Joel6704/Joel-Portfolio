import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
  life: number;
  maxLife: number;
}

export const CursorPlayground: React.FC = () => {
  const [isEnabled] = useState(() => {
    if (typeof window === 'undefined') return false;
    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return isFinePointer && !prefersReducedMotion;
  });
  const [isHovered, setIsHovered] = useState(false);
  const [isTextInput, setIsTextInput] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameIdRef = useRef<number | null>(null);
  const isRunningRef = useRef<boolean>(false);
  const lastMousePosRef = useRef<{ x: number; y: number }>({ x: -100, y: -100 });

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth outer ring spring
  const springConfig = { damping: 26, stiffness: 320, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    if (!isEnabled) return;

    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };

    // Color palette matching dark navy, electric blue, and purple theme
    const colors = [
      'rgba(0, 229, 255, ',   // Electric cyan
      'rgba(0, 140, 255, ',   // Electric royal blue
      'rgba(168, 85, 247, ',  // Purple
      'rgba(192, 132, 252, ', // Light lavender purple
    ];

    // Particle render loop
    const renderLoop = () => {
      const cvs = canvasRef.current;
      if (!cvs) return;
      const ctx = cvs.getContext('2d');
      if (!ctx) return;

      ctx.clearRect(0, 0, cvs.width, cvs.height);

      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life--;
        p.alpha = Math.max(0, p.life / p.maxLife);

        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha * 0.75})`;
        ctx.shadowBlur = 6;
        ctx.shadowColor = p.color.includes('168') ? '#A855F7' : '#00E5FF';
        ctx.fill();
      }

      // If particles remain, keep running; otherwise pause loop to save CPU
      if (particles.length > 0) {
        animFrameIdRef.current = requestAnimationFrame(renderLoop);
      } else {
        isRunningRef.current = false;
        animFrameIdRef.current = null;
      }
    };

    const spawnParticles = (x: number, y: number) => {
      const particles = particlesRef.current;
      // Cap maximum active particles for high performance
      if (particles.length < 24) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 0.8 + 0.2;

        particles.push({
          x: x + (Math.random() - 0.5) * 4,
          y: y + (Math.random() - 0.5) * 4,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 1.6 + 0.8,
          alpha: 1,
          color,
          life: 22 + Math.floor(Math.random() * 10),
          maxLife: 32,
        });
      }

      if (!isRunningRef.current) {
        isRunningRef.current = true;
        animFrameIdRef.current = requestAnimationFrame(renderLoop);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const dx = e.clientX - lastMousePosRef.current.x;
      const dy = e.clientY - lastMousePosRef.current.y;
      const dist = Math.hypot(dx, dy);

      // Spawn trail particle if moved sufficiently
      if (dist > 4) {
        spawnParticles(e.clientX, e.clientY);
        lastMousePosRef.current = { x: e.clientX, y: e.clientY };
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isInput =
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable;
      setIsTextInput(isInput);

      const isInteractive =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') !== null ||
        target.closest('button') !== null ||
        target.closest('[data-magnetic]') !== null ||
        target.getAttribute('role') === 'button' ||
        window.getComputedStyle(target).cursor === 'pointer';

      setIsHovered(isInteractive && !isInput);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.body.addEventListener('mouseenter', handleMouseEnter);
    document.body.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [isEnabled, cursorX, cursorY, isVisible]);

  if (!isEnabled || !isVisible) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden="true">
      {/* 1. Canvas for Smooth Fading Particle Trail */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-10"
      />

      {/* 2. Outer Magnetic Follow Ring with Electric Blue & Purple Aura */}
      {!isTextInput && (
        <motion.div
          style={{
            x: smoothX,
            y: smoothY,
            translateX: '-50%',
            translateY: '-50%',
          }}
          animate={{
            scale: isHovered ? 1.7 : 1,
            borderColor: isHovered ? 'rgba(0, 229, 255, 0.95)' : 'rgba(0, 140, 255, 0.6)',
            backgroundColor: isHovered ? 'rgba(0, 229, 255, 0.08)' : 'transparent',
            boxShadow: isHovered
              ? '0 0 22px rgba(0, 229, 255, 0.55), 0 0 35px rgba(168, 85, 247, 0.35)'
              : '0 0 12px rgba(0, 140, 255, 0.3)',
          }}
          transition={{ duration: 0.16, ease: 'easeOut' }}
          className="fixed top-0 left-0 w-8 h-8 rounded-full border border-[#00E5FF]/60 pointer-events-none z-20"
        />
      )}

      {/* 3. Center Glowing Cyan/Purple Pointer Dot */}
      {!isTextInput && (
        <motion.div
          style={{
            x: cursorX,
            y: cursorY,
            translateX: '-50%',
            translateY: '-50%',
          }}
          animate={{
            scale: isHovered ? 0.6 : 1,
            backgroundColor: isHovered ? '#A855F7' : '#00E5FF',
          }}
          transition={{ duration: 0.12 }}
          className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#00E5FF] shadow-[0_0_8px_#00E5FF,0_0_16px_#8B5CF6] pointer-events-none z-30"
        />
      )}
    </div>
  );
};

export default CursorPlayground;
