import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
  color: string;
  glowColor: string;
}

const PARTICLE_PALETTE = [
  { color: '#00F0FF', glow: 'rgba(0, 240, 255, 0.6)' }, // Neon Cyan
  { color: '#38BDF8', glow: 'rgba(56, 189, 248, 0.5)' }, // Electric Sky
  { color: '#818CF8', glow: 'rgba(129, 140, 248, 0.5)' }, // Soft Indigo
  { color: '#A855F7', glow: 'rgba(168, 85, 247, 0.6)' }, // Neon Purple
  { color: '#C084FC', glow: 'rgba(192, 132, 252, 0.5)' }, // Light Violet
  { color: '#34D399', glow: 'rgba(52, 211, 153, 0.5)' }, // Neon Mint
  { color: '#FB7185', glow: 'rgba(251, 113, 133, 0.5)' }, // Cyber Rose
];

interface ProjectsCanvasProps {
  className?: string;
}

export const ProjectsCanvas: React.FC<ProjectsCanvasProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    let animId: number = 0;
    let width = 0;
    let height = 0;
    let isVisible = true;
    let gridOffset = 0;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Mouse coordinates relative to container
    let mouseX = -9999;
    let mouseY = -9999;
    let targetMouseX = -9999;
    let targetMouseY = -9999;
    let isMouseOver = false;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = parent.getBoundingClientRect();
      targetMouseX = e.clientX - rect.left;
      targetMouseY = e.clientY - rect.top;
      isMouseOver = true;
    };

    const handleMouseLeave = () => {
      isMouseOver = false;
      targetMouseX = -9999;
      targetMouseY = -9999;
    };

    parent.addEventListener('mousemove', handleMouseMove, { passive: true });
    parent.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    // Handle Resize & Canvas Resolution
    let particles: Particle[] = [];

    const resize = () => {
      if (!canvas || !parent) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = parent.clientWidth;
      height = parent.clientHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);
      initParticles();
    };

    const initParticles = () => {
      const count = width < 640 ? 30 : width < 1024 ? 50 : 75;
      particles = [];

      for (let i = 0; i < count; i++) {
        const item = PARTICLE_PALETTE[Math.floor(Math.random() * PARTICLE_PALETTE.length)];
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.45,
          vy: (Math.random() - 0.5) * 0.45,
          radius: Math.random() * 1.8 + 1,
          baseAlpha: Math.random() * 0.45 + 0.35,
          color: item.color,
          glowColor: item.glow,
        });
      }
    };

    resize();
    window.addEventListener('resize', resize);

    // Intersection Observer to stop animation when out of view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
          if (isVisible && !animId) {
            animId = requestAnimationFrame(render);
          }
        });
      },
      { threshold: 0.05 }
    );

    observer.observe(parent);

    // Nebula ambient lights
    let nebulaTime = 0;

    const render = () => {
      if (!isVisible) {
        animId = 0;
        return;
      }

      // Smooth mouse follow
      if (isMouseOver) {
        mouseX += (targetMouseX - mouseX) * 0.08;
        mouseY += (targetMouseY - mouseY) * 0.08;
      } else {
        mouseX = -9999;
        mouseY = -9999;
      }

      ctx.clearRect(0, 0, width, height);

      // 1. Deep sci-fi backdrop gradient
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      bgGrad.addColorStop(0, '#02050E');
      bgGrad.addColorStop(0.5, '#050B1B');
      bgGrad.addColorStop(1, '#020409');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      nebulaTime += prefersReducedMotion ? 0 : 0.005;

      // 2. Slow moving futuristic ambient glow nebulas
      // Cyan Nebula Left
      const cyanX = width * 0.25 + Math.sin(nebulaTime) * 80;
      const cyanY = height * 0.35 + Math.cos(nebulaTime * 0.8) * 50;
      const cyanGrad = ctx.createRadialGradient(cyanX, cyanY, 10, cyanX, cyanY, width * 0.45);
      cyanGrad.addColorStop(0, 'rgba(0, 240, 255, 0.075)');
      cyanGrad.addColorStop(0.5, 'rgba(0, 102, 255, 0.035)');
      cyanGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = cyanGrad;
      ctx.fillRect(0, 0, width, height);

      // Purple Nebula Right
      const purpX = width * 0.75 + Math.cos(nebulaTime * 0.9) * 80;
      const purpY = height * 0.65 + Math.sin(nebulaTime * 0.7) * 60;
      const purpGrad = ctx.createRadialGradient(purpX, purpY, 10, purpX, purpY, width * 0.45);
      purpGrad.addColorStop(0, 'rgba(168, 85, 247, 0.08)');
      purpGrad.addColorStop(0.5, 'rgba(139, 92, 246, 0.035)');
      purpGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = purpGrad;
      ctx.fillRect(0, 0, width, height);

      // Interactive cursor spotlight nebula
      if (mouseX > 0 && mouseY > 0) {
        const mouseGrad = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 280);
        mouseGrad.addColorStop(0, 'rgba(0, 240, 255, 0.09)');
        mouseGrad.addColorStop(0.5, 'rgba(168, 85, 247, 0.04)');
        mouseGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = mouseGrad;
        ctx.fillRect(0, 0, width, height);
      }

      // 3. Subtle Cyber Grid Lines
      const gridSize = 64;
      if (!prefersReducedMotion) {
        gridOffset = (gridOffset + 0.15) % gridSize;
      }
      ctx.save();
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.032)';
      ctx.lineWidth = 1;

      // Vertical grid lines
      for (let x = 0; x <= width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Horizontal grid lines with subtle scroll motion
      for (let y = gridOffset; y <= height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      ctx.restore();

      // 4. Connecting Lines between particles within proximity
      const maxConnectDist = width < 768 ? 90 : 130;
      ctx.lineWidth = 0.75;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxConnectDist) {
            const alpha = (1 - dist / maxConnectDist) * 0.22;
            ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }

        // Connect particles near mouse cursor
        if (mouseX > 0 && mouseY > 0) {
          const mdx = particles[i].x - mouseX;
          const mdy = particles[i].y - mouseY;
          const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
          const maxMouseDist = 160;

          if (mDist < maxMouseDist) {
            const mAlpha = (1 - mDist / maxMouseDist) * 0.45;
            ctx.strokeStyle = `rgba(168, 85, 247, ${mAlpha})`;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(mouseX, mouseY);
            ctx.stroke();
          }
        }
      }

      // 5. Draw Glowing Particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!prefersReducedMotion) {
          p.x += p.vx;
          p.y += p.vy;

          // Gentle mouse reaction
          if (mouseX > 0 && mouseY > 0) {
            const mdx = p.x - mouseX;
            const mdy = p.y - mouseY;
            const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
            if (mDist < 120 && mDist > 0) {
              const force = (120 - mDist) / 120;
              p.x += (mdx / mDist) * force * 0.8;
              p.y += (mdy / mDist) * force * 0.8;
            }
          }

          // Boundary wrap
          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;
          if (p.y < -10) p.y = height + 10;
          if (p.y > height + 10) p.y = -10;
        }

        // Draw particle glow halo
        ctx.save();
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.glowColor;
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.baseAlpha;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      observer.disconnect();
      parent.removeEventListener('mousemove', handleMouseMove);
      parent.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none w-full h-full ${className}`}
      aria-hidden="true"
    />
  );
};
