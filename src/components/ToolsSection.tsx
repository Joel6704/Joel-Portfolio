import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Wrench } from 'lucide-react';
import { ALL_TOOLS, type ToolItem } from './tools/toolsData';
import { ToolsVisualization } from './tools/ToolsVisualization';
import { ToolDetailsPanel } from './tools/ToolDetailsPanel';
import { ToolsParticleCanvas } from './tools/ToolsParticleCanvas';

export const ToolsSection: React.FC = () => {
  // Default to the first tool (CapCut)
  const [selectedTool, setSelectedTool] = useState<ToolItem>(ALL_TOOLS[0]);

  return (
    <section
      id="tools"
      aria-labelledby="tools-heading"
      className="py-24 sm:py-28 relative overflow-hidden bg-[#030712]"
      style={{ borderTop: '1px solid #172554' }}
    >
      {/* ── 1. Outermost Background Layer: Animated Particles, Ambient Gradients & Technology Elements Behind Both Cards ── */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0" aria-hidden="true">
        {/* Soft radial blue-purple glow in center */}
        <motion.div
          animate={{
            scale: [1, 1.15, 0.95, 1],
            opacity: [0.22, 0.32, 0.22],
          }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[950px] h-[650px] rounded-full pointer-events-none blur-[130px]"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(168, 85, 247, 0.45) 0%, rgba(0, 140, 255, 0.3) 40%, rgba(6, 11, 24, 0.8) 75%)',
          }}
        />

        {/* Ambient Electric-Blue Glow Top-Left */}
        <motion.div
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -25, 25, 0],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-32 -left-32 w-[650px] h-[650px] rounded-full opacity-25 blur-[120px]"
          style={{
            background: 'radial-gradient(circle, rgba(0, 229, 255, 0.4) 0%, rgba(59, 130, 246, 0.2) 50%, transparent 75%)',
          }}
        />

        {/* Ambient Deep Purple Glow Bottom-Right */}
        <motion.div
          animate={{
            x: [0, -35, 25, 0],
            y: [0, 30, -30, 0],
          }}
          transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-36 -right-36 w-[700px] h-[700px] rounded-full opacity-25 blur-[130px]"
          style={{
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, rgba(99, 102, 241, 0.2) 50%, transparent 75%)',
          }}
        />

        {/* Full-Section Background Particle Canvas (Surrounding and Behind Both Cards) */}
        <ToolsParticleCanvas />

        {/* Occasional Subtle Light Sweep Across Entire Background */}
        <motion.div
          animate={{
            x: ['-120%', '220%'],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
            repeatDelay: 3,
          }}
          className="absolute top-0 bottom-0 w-[420px] -skew-x-12 opacity-[0.14] blur-3xl select-none"
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, rgba(0, 229, 255, 0.3) 45%, rgba(168, 85, 247, 0.4) 55%, transparent 100%)',
          }}
        />



        {/* Floating Illuminated Technology Symbols in Outermost Background */}
        <motion.span
          animate={{
            y: [-8, 8, -8],
            opacity: [0.15, 0.35, 0.15],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-28 left-16 font-mono text-xs text-cyan-400/40 select-none tracking-widest hidden lg:block"
        >
          &lt;dev /&gt;
        </motion.span>
        <motion.span
          animate={{
            y: [6, -10, 6],
            opacity: [0.12, 0.3, 0.12],
          }}
          transition={{ duration: 9.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute bottom-20 left-20 font-mono text-xs text-purple-400/40 select-none tracking-widest hidden lg:block"
        >
          ✦ AI_NODE
        </motion.span>
        <motion.span
          animate={{
            y: [-10, 6, -10],
            opacity: [0.14, 0.32, 0.14],
          }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute top-36 right-20 font-mono text-xs text-blue-400/35 select-none tracking-widest hidden lg:block"
        >
          ◈ INTEL
        </motion.span>

        {/* Floating Translucent Geometric Shapes */}
        <motion.div
          animate={{
            rotate: 360,
            y: [-15, 15, -15],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="absolute top-1/4 left-1/4 w-10 h-10 border border-cyan-500/15 rounded-lg -rotate-12 pointer-events-none"
        />
        <motion.div
          animate={{
            rotate: -360,
            y: [15, -15, 15],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-1/4 right-1/4 w-12 h-12 border border-purple-500/15 rounded-full pointer-events-none"
        />

        {/* Digital Matrix Lattice Grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(rgba(0, 140, 255, 0.6) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      {/* ── 3. Foreground Container: Section Header & Both Cards Layered Above Background ── */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          {/* Subtle Top Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 font-sans text-xs tracking-widest uppercase mb-4 shadow-[0_0_15px_rgba(168,85,247,0.15)]"
          >
            <Wrench size={12} className="text-purple-400" />
            <span>Interactive Software Ecosystem</span>
          </motion.div>

          {/* Main Section Heading: White "Tools &" + Blue-to-Purple Gradient "Technologies" */}
          <motion.h2
            id="tools-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white mb-3"
          >
            Tools &{' '}
            <span className="bg-gradient-to-r from-[#008CFF] via-[#6366F1] to-[#A855F7] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(168,85,247,0.35)]">
              Technologies
            </span>
          </motion.h2>

          {/* Muted Grey-Purple Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl"
          >
            An interactive showcase of the industry-standard software, AI engines, search analytics, and development environments I use to build and scale digital experiences. Select any tool to inspect its practical applications.
          </motion.p>
        </div>

        {/* ── Two-Panel Responsive Layout (Both Cards Layered Above Outermost Animated Background) ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.75, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start"
        >
          {/* Left Panel: Large Interactive Tools Visualization (7 cols on lg) - CARD 1 with Animated Border Tracing */}
          <div className="lg:col-span-7 xl:col-span-7 w-full relative z-20">
            <ToolsVisualization
              selectedTool={selectedTool}
              onSelectTool={setSelectedTool}
            />
          </div>

          {/* Right Panel: Selected Tool Details Panel (5 cols on lg) - CARD 2 with Animated Border Tracing */}
          <div className="lg:col-span-5 xl:col-span-5 w-full relative z-20">
            <ToolDetailsPanel selectedTool={selectedTool} />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ToolsSection;
