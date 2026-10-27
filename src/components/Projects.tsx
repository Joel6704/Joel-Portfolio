import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { Sparkles, Terminal, Activity } from 'lucide-react';
import { projects } from '../data/portfolioData';
import type { Project } from '../types';
import { ProjectsCanvas } from './projects/ProjectsCanvas';
import { FuturisticProjectCard } from './projects/FuturisticProjectCard';

interface ProjectsProps {
  onSelectProject?: (project: Project) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onSelectProject }) => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <section
      id="projects"
      className="py-24 sm:py-32 relative overflow-hidden bg-[#02050E]"
      style={{
        borderTop: '1px solid rgba(0, 240, 255, 0.18)',
        borderBottom: '1px solid rgba(168, 85, 247, 0.15)',
      }}
    >
      {/* ── Futuristic Sci-Fi Animated Background ── */}
      <ProjectsCanvas />

      {/* Cyberpunk Top & Bottom Atmospheric Lighting Halos */}
      <div
        className="absolute top-0 left-1/4 -translate-y-1/2 w-[600px] h-[300px] pointer-events-none rounded-full"
        style={{
          background: 'radial-gradient(ellipse, rgba(0, 240, 255, 0.12) 0%, transparent 70%)',
          filter: 'blur(75px)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[650px] h-[350px] pointer-events-none rounded-full"
        style={{
          background: 'radial-gradient(ellipse, rgba(168, 85, 247, 0.12) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
        aria-hidden="true"
      />

      {/* Main Content Container: Sized for balanced 4-column layout */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 relative z-10">

        {/* ── Futuristic Section Heading ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-14 sm:mb-18"
        >
          {/* Cyber Telemetry Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/30 backdrop-blur-md text-cyan-300 font-mono text-[11px] font-semibold tracking-[0.22em] uppercase mb-5 shadow-[0_0_20px_rgba(0,240,255,0.18)]">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_#00F0FF]" />
            <span className="text-cyan-400 font-bold">SYSTEM //</span> FEATURED WORK
            <span className="w-1 h-3 bg-cyan-400/40 ml-1" />
            <span className="text-purple-300 text-[10px]">01–{projects.length.toString().padStart(2, '0')}</span>
          </div>

          {/* Futuristic Main Heading */}
          <h2 className="font-display text-[clamp(2.3rem,5.2vw,3.8rem)] font-extrabold uppercase tracking-wider text-white leading-tight">
            MY{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] via-[#38BDF8] to-[#C084FC] drop-shadow-[0_0_25px_rgba(0,240,255,0.35)]">
              PROJECTS
            </span>
          </h2>

          {/* Animated Futuristic Accent Line with Center Pulse */}
          <div className="relative w-32 h-1 mx-auto my-4.5 rounded-full overflow-hidden bg-white/10">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent animate-pulse" />
            <div className="absolute top-0 bottom-0 left-0 w-1/3 bg-gradient-to-r from-[#00F0FF] to-[#A855F7] rounded-full blur-[1px]" />
          </div>

          {/* Section Narrative */}
          <p className="font-body text-slate-300 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl mx-auto">
            A curated collection of my creative work, digital experiences, and development projects.
          </p>

          {/* Live Telemetry Status Strip */}
          <div className="mt-5 inline-flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-[11px] font-mono text-slate-400">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#050C1F]/90 border border-cyan-500/20 text-cyan-300">
              <Activity size={12} className="text-cyan-400" />
              {projects.length} DEPLOYED SHOWCASES
            </span>
            <span className="hidden sm:inline text-white/20">•</span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#050C1F]/90 border border-purple-500/20 text-purple-300">
              <Sparkles size={12} className="text-purple-400" />
              100% PRODUCTION VERIFIED
            </span>
            <span className="hidden sm:inline text-white/20">•</span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#050C1F]/90 border border-blue-500/20 text-blue-300">
              <Terminal size={12} className="text-blue-400" />
              INTERACTIVE CASE STUDIES
            </span>
          </div>
        </motion.div>

        {/* ── Responsive Project Grid: Row 1 (4 Blocks), Row 2 (Blocks 5 & 6 Centered) ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 xl:gap-6 items-stretch w-full"
        >
          {projects.map((project, idx) => (
            <FuturisticProjectCard
              key={project.id}
              project={project}
              index={idx}
              onSelectProject={onSelectProject}
              className={
                idx === 4
                  ? 'lg:col-start-2'
                  : ''
              }
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
