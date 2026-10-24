import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export const BackgroundEffects: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isInteractive] = useState(() => {
    if (typeof window === 'undefined') return false;
    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return isFinePointer && !prefersReducedMotion;
  });

  // Mouse Parallax Coordinates for Background Elements
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 90 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Parallax transforms for ambient beam 1 (opposite shift for depth)
  const beam1X = useTransform(smoothX, [-0.5, 0.5], [-24, 24]);
  const beam1Y = useTransform(smoothY, [-0.5, 0.5], [-16, 16]);

  // Parallax transforms for ambient beam 2
  const beam2X = useTransform(smoothX, [-0.5, 0.5], [20, -20]);
  const beam2Y = useTransform(smoothY, [-0.5, 0.5], [14, -14]);

  // Neon line subtle shift
  const neonLineX = useTransform(smoothX, [-0.5, 0.5], [12, -12]);
  const neonLineY = useTransform(smoothY, [-0.5, 0.5], [8, -8]);

  useEffect(() => {
    if (!isInteractive) return;

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isInteractive, mouseX, mouseY]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle pool: 36 lightweight drifting particles with electric blue & purple accents
    interface Particle {
      x: number;
      y: number;
      radius: number;
      speedX: number;
      speedY: number;
      opacity: number;
      fadeSpeed: number;
      hue: 'cyan' | 'purple' | 'blue';
    }

    const particleCount = 36;
    const particles: Particle[] = [];
    const hues: ('cyan' | 'purple' | 'blue')[] = ['cyan', 'cyan', 'blue', 'purple'];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5 + 0.6,
        speedX: (Math.random() - 0.5) * 0.22,
        speedY: (Math.random() - 0.5) * 0.22 - 0.08,
        opacity: Math.random() * 0.5 + 0.15,
        fadeSpeed: (Math.random() * 0.005 + 0.002) * (Math.random() > 0.5 ? 1 : -1),
        hue: hues[Math.floor(Math.random() * hues.length)],
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.speedX;
        p.y += p.speedY;
        p.opacity += p.fadeSpeed;

        if (p.opacity > 0.65 || p.opacity < 0.12) {
          p.fadeSpeed = -p.fadeSpeed;
        }

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        if (p.hue === 'purple') {
          ctx.fillStyle = `rgba(168, 85, 247, ${p.opacity})`;
          ctx.shadowBlur = 8;
          ctx.shadowColor = '#A855F7';
        } else if (p.hue === 'blue') {
          ctx.fillStyle = `rgba(0, 140, 255, ${p.opacity})`;
          ctx.shadowBlur = 8;
          ctx.shadowColor = '#008CFF';
        } else {
          ctx.fillStyle = `rgba(0, 229, 255, ${p.opacity})`;
          ctx.shadowBlur = 8;
          ctx.shadowColor = '#00E5FF';
        }
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none" aria-hidden="true">
      {/* 1. Deep Midnight Navy Base Radial Gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 90% 60% at 50% 0%, #06112C 0%, #04091A 40%, #030712 100%)',
        }}
      />

      {/* 2. Interactive Parallax Blue & Purple Light Beams */}
      <motion.div
        style={isInteractive ? { x: beam1X, y: beam1Y } : undefined}
        className="absolute top-[-10%] left-[12%] w-[680px] h-[480px] rounded-full opacity-20 filter blur-[90px] animate-pulse-slow pointer-events-none"
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background: 'radial-gradient(circle, #008CFF 0%, #6366F1 45%, #0047BA 70%, transparent 100%)',
          }}
        />
      </motion.div>

      <motion.div
        style={isInteractive ? { x: beam2X, y: beam2Y } : undefined}
        className="absolute top-[18%] right-[5%] w-[580px] h-[580px] rounded-full opacity-25 filter blur-[100px] pointer-events-none"
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background: 'radial-gradient(circle, #00E5FF 0%, #008CFF 40%, #8B5CF6 70%, transparent 85%)',
          }}
        />
      </motion.div>

      {/* 3. Subtle Workspace Photography Texture blended softly */}
      <div
        className="absolute inset-0 opacity-10 mix-blend-luminosity"
        style={{
          backgroundImage: 'url(/workspace-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* 4. Canvas for Tiny Floating Cyan & Purple Particles */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
      />

      {/* 5. Animated Curved Neon Lines near Bottom-Right with Subtle Parallax */}
      <motion.div
        style={isInteractive ? { x: neonLineX, y: neonLineY } : undefined}
        className="absolute right-0 bottom-10 w-[350px] h-[260px] opacity-40 pointer-events-none"
      >
        <svg
          viewBox="0 0 350 260"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <path
            d="M 50 240 C 140 220, 240 160, 320 40"
            stroke="url(#neon-line-grad)"
            strokeWidth="2"
            strokeLinecap="round"
            className="animate-neon-trace"
          />
          <path
            d="M 20 260 C 120 230, 220 180, 340 80"
            stroke="rgba(139, 92, 246, 0.25)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="neon-line-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#008CFF" stopOpacity="0.1" />
              <stop offset="45%" stopColor="#00E5FF" stopOpacity="0.8" />
              <stop offset="85%" stopColor="#A855F7" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#008CFF" stopOpacity="0.2" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* 6. Subtle Vignette Border at Bottom */}
      <div
        className="absolute inset-x-0 bottom-0 h-36 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, #030712 10%, transparent 100%)',
        }}
      />
    </div>
  );
};

export default BackgroundEffects;
