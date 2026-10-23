import React, { useEffect, useRef } from 'react';

export const BackgroundEffects: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Check prefers-reduced-motion
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

    // Particle pool: 35 lightweight particles
    interface Particle {
      x: number;
      y: number;
      radius: number;
      speedX: number;
      speedY: number;
      opacity: number;
      fadeSpeed: number;
    }

    const particleCount = 36;
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5 + 0.6,
        speedX: (Math.random() - 0.5) * 0.25,
        speedY: (Math.random() - 0.5) * 0.25 - 0.1, // slight upward drift
        opacity: Math.random() * 0.5 + 0.2,
        fadeSpeed: (Math.random() * 0.005 + 0.002) * (Math.random() > 0.5 ? 1 : -1),
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render floating cyan and electric blue particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.speedX;
        p.y += p.speedY;
        p.opacity += p.fadeSpeed;

        if (p.opacity > 0.65 || p.opacity < 0.15) {
          p.fadeSpeed = -p.fadeSpeed;
        }

        // Wrap around boundaries
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 229, 255, ${p.opacity})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#00E5FF';
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

      {/* 2. Slowly Moving Blue Light Beams */}
      <div
        className="absolute top-[-10%] left-[15%] w-[650px] h-[450px] rounded-full opacity-20 filter blur-[90px] animate-pulse-slow"
        style={{
          background: 'radial-gradient(circle, #008CFF 0%, #0047BA 60%, transparent 100%)',
        }}
      />
      <div
        className="absolute top-[20%] right-[5%] w-[550px] h-[550px] rounded-full opacity-25 filter blur-[100px]"
        style={{
          background: 'radial-gradient(circle, #00E5FF 0%, #008CFF 50%, transparent 80%)',
        }}
      />

      {/* 3. Subtle Workspace Photography Texture blended softly */}
      <div
        className="absolute inset-0 opacity-10 mix-blend-luminosity"
        style={{
          backgroundImage: 'url(/workspace-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* 4. Canvas for Tiny Floating Cyan Particles */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
      />

      {/* 5. Animated Curved Neon Lines near Bottom-Right */}
      <div className="absolute right-0 bottom-10 w-[350px] h-[260px] opacity-40 pointer-events-none">
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
            stroke="rgba(0, 140, 255, 0.25)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="neon-line-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#008CFF" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#00E5FF" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#008CFF" stopOpacity="0.2" />
            </linearGradient>
          </defs>
        </svg>
      </div>

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
