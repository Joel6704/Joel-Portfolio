import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
  pulsePhase: number;
  pulseSpeed: number;
  color: string;
}

const PARTICLE_COLORS = [
  '#00E5FF', // Cyan
  '#38BDF8', // Sky Blue
  '#3B82F6', // Royal Blue
  '#8B5CF6', // Violet
  '#A855F7', // Purple
  '#C084FC', // Light Purple
  '#6366F1', // Indigo
];

export const ToolsParticleCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const parent = canvas.parentElement;
    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    // Track cursor coordinates across the entire section background
    let mouseX = -9999;
    let mouseY = -9999;
    let isMouseInArea = false;

    const onMouseMove = (e: MouseEvent) => {
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      isMouseInArea = true;
    };

    const onMouseLeave = () => {
      isMouseInArea = false;
      mouseX = -9999;
      mouseY = -9999;
    };

    if (parent) {
      parent.addEventListener('mousemove', onMouseMove, { passive: true });
      parent.addEventListener('mouseleave', onMouseLeave, { passive: true });
    }

    // Full-section responsive particle density
    const particleCount = width < 640 ? 46 : width < 1024 ? 76 : 105;
    const maxLineDistance = width < 640 ? 75 : 98;

    // Initialize particles across the full section area
    const particles: Particle[] = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * (prefersReducedMotion ? 0 : 0.38),
      vy: (Math.random() - 0.5) * (prefersReducedMotion ? 0 : 0.38),
      radius: 1.1 + Math.random() * 2.0,
      baseAlpha: 0.22 + Math.random() * 0.48,
      pulsePhase: Math.random() * Math.PI * 2,
      pulseSpeed: 0.015 + Math.random() * 0.024,
      color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
    }));

    // Handle high-DPI scaling and responsive resizing
    const handleResize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined' && parent) {
      resizeObserver = new ResizeObserver(() => handleResize());
      resizeObserver.observe(parent);
    }

    // Main 60fps Animation Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // A. Ambient Cursor Glow Ripple across the main background
      if (isMouseInArea && !prefersReducedMotion) {
        const mouseGlow = ctx.createRadialGradient(
          mouseX,
          mouseY,
          0,
          mouseX,
          mouseY,
          120
        );
        mouseGlow.addColorStop(0, 'rgba(0, 229, 255, 0.12)');
        mouseGlow.addColorStop(0.45, 'rgba(139, 92, 246, 0.06)');
        mouseGlow.addColorStop(1, 'transparent');
        ctx.fillStyle = mouseGlow;
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 120, 0, Math.PI * 2);
        ctx.fill();
      }

      // B. Update Particle Positions & Handle Mouse Attraction / Repulsion
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!prefersReducedMotion) {
          p.x += p.vx;
          p.y += p.vy;
          p.pulsePhase += p.pulseSpeed;

          // Interactive gentle repulsion when cursor approaches
          if (isMouseInArea) {
            const dx = p.x - mouseX;
            const dy = p.y - mouseY;
            const dist = Math.hypot(dx, dy);
            const mouseRadius = 125;

            if (dist < mouseRadius && dist > 1) {
              const force = (1 - dist / mouseRadius) * 1.6;
              const angle = Math.atan2(dy, dx);
              p.x += Math.cos(angle) * force * 1.3;
              p.y += Math.sin(angle) * force * 1.3;
            }
          }

          // Smooth edge boundary wrapping across full section
          if (p.x < -20) p.x = width + 20;
          else if (p.x > width + 20) p.x = -20;
          if (p.y < -20) p.y = height + 20;
          else if (p.y > height + 20) p.y = -20;
        }

        // Calculate dynamic alpha and interactive intensity boost
        let dynamicAlpha = Math.max(
          0.12,
          p.baseAlpha + Math.sin(p.pulsePhase) * 0.22
        );

        if (isMouseInArea) {
          const distToMouse = Math.hypot(p.x - mouseX, p.y - mouseY);
          if (distToMouse < 110) {
            dynamicAlpha = Math.min(1, dynamicAlpha + (1 - distToMouse / 110) * 0.42);
          }
        }

        // Render particle with radiant atmospheric glow
        ctx.save();
        ctx.shadowColor = p.color;
        ctx.shadowBlur = p.radius * 3.8;
        ctx.fillStyle = p.color;
        ctx.globalAlpha = dynamicAlpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // C. Render Proximity Constellation Connecting Lines
      ctx.save();
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.hypot(dx, dy);

          if (dist < maxLineDistance) {
            const lineAlpha = (1 - dist / maxLineDistance) * 0.18;
            ctx.strokeStyle = '#8B5CF6';
            ctx.globalAlpha = lineAlpha;
            ctx.lineWidth = 0.85;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        // Subtle interactive connecting strand from cursor to nearby particles
        if (isMouseInArea && !prefersReducedMotion) {
          const distToMouse = Math.hypot(p1.x - mouseX, p1.y - mouseY);
          if (distToMouse < 95) {
            const lineAlpha = (1 - distToMouse / 95) * 0.32;
            ctx.strokeStyle = '#00E5FF';
            ctx.globalAlpha = lineAlpha;
            ctx.lineWidth = 0.95;
            ctx.beginPath();
            ctx.moveTo(mouseX, mouseY);
            ctx.lineTo(p1.x, p1.y);
            ctx.stroke();
          }
        }
      }
      ctx.restore();

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (parent) {
        parent.removeEventListener('mousemove', onMouseMove);
        parent.removeEventListener('mouseleave', onMouseLeave);
      }
      resizeObserver?.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none select-none z-0"
      style={{ display: 'block' }}
      aria-hidden="true"
    />
  );
};

export default ToolsParticleCanvas;
