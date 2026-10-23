import React, { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { ExternalLink, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { projects } from '../data/portfolioData';
import type { Project } from '../types';

interface ProjectsProps {
  onSelectProject?: (project: Project) => void;
}

const getProjectNumber = (index: number) => {
  return `PROJECT ${(index + 1).toString().padStart(2, '0')}`;
};

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const destinationUrl = project.externalLink?.url || '#';
  const ctaLabel = project.externalLink?.label || 'VIEW PROJECT';
  const cardHighlights =
    project.mockupDetails?.highlights?.slice(0, 3) ||
    project.strategy?.slice(0, 3) ||
    [];

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.55,
            ease: [0.25, 0.1, 0.25, 1],
          },
        },
      }}
      className="h-full"
    >
      <a
        href={destinationUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${project.title} (${destinationUrl}) - opens in a new tab`}
        className="group relative flex flex-col h-full rounded-2xl overflow-hidden bg-[#0A1228] border border-[#0066FF]/25 hover:border-amber-400/60 transition-all duration-500 shadow-[0_15px_35px_-10px_rgba(0,0,0,0.8)] hover:shadow-[0_20px_50px_rgba(245,158,11,0.18),0_0_30px_rgba(0,102,255,0.2)] hover:-translate-y-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
      >
        {/* Ambient Warm Golden/Blue Hover Backlight Glow */}
        <div
          className="absolute -top-24 -right-24 w-48 h-48 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: 'radial-gradient(circle, rgba(245, 158, 11, 0.22) 0%, rgba(0, 102, 255, 0.15) 50%, transparent 70%)',
            filter: 'blur(30px)',
          }}
          aria-hidden="true"
        />

        {/* Thumbnail Image Container */}
        <div className="relative w-full h-52 sm:h-56 overflow-hidden bg-[#040816]">
          <img
            src={project.imageUrl || '/blogs-project.png'}
            alt={project.title}
            className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />

          {/* Dark Gradient Overlay for Readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1228] via-[#0A1228]/40 to-transparent pointer-events-none" />

          {/* Floating Category Pill with Gold Accent */}
          <div className="absolute top-3.5 left-3.5 z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#060D22]/90 backdrop-blur-md border border-amber-500/40 text-amber-300 font-heading text-[11px] font-semibold tracking-wider uppercase shadow-md">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_6px_#F59E0B]" />
              {project.category.split('•')[0].trim()}
            </span>
          </div>

          {/* Floating External Link Icon */}
          <div className="absolute top-3.5 right-3.5 z-10 w-9 h-9 rounded-full bg-[#060D22]/90 backdrop-blur-md border border-white/15 flex items-center justify-center text-slate-300 group-hover:text-white group-hover:bg-[#0066FF] group-hover:border-[#0066FF] transition-all duration-300 shadow-md">
            <ExternalLink size={15} />
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between relative z-10">
          <div>
            {/* Project Number & Platform Badge */}
            <div className="flex items-center justify-between text-xs font-heading tracking-widest uppercase mb-3">
              <span className="text-amber-400 font-bold flex items-center gap-1.5">
                <Sparkles size={12} className="text-amber-400" />
                {getProjectNumber(index)}
              </span>
              {project.badge && (
                <span className="text-slate-400 font-mono text-[11px] bg-white/[0.04] px-2 py-0.5 rounded border border-white/[0.06]">
                  {project.badge}
                </span>
              )}
            </div>

            {/* Project Title */}
            <h3 className="font-display text-xl sm:text-[1.28rem] font-bold text-white group-hover:text-amber-300 transition-colors duration-300 leading-snug line-clamp-2 mb-2.5">
              {project.title}
            </h3>

            {/* Project Description */}
            <p className="font-body text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-3 mb-5">
              {project.tagline || project.overview}
            </p>

            {/* Highlights / Deliverables Tags */}
            {cardHighlights.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-6">
                {cardHighlights.map((highlight, hIdx) => (
                  <span
                    key={hIdx}
                    className="text-[11px] font-medium text-slate-300 bg-[#101935] border border-[#0066FF]/25 px-2.5 py-1 rounded-xs"
                  >
                    {highlight}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Card CTA Button (Consistent with Card URL) */}
          <div className="pt-2">
            <span
              className="w-full py-3 px-4 rounded-lg font-heading text-xs sm:text-sm font-semibold tracking-wider uppercase text-white flex items-center justify-center gap-2 shadow-lg transition-all duration-300 bg-gradient-to-r from-[#0066FF] to-[#0047BA] group-hover:from-amber-500 group-hover:to-amber-600 group-hover:shadow-[0_4px_25px_rgba(245,158,11,0.4)]"
            >
              <span>{ctaLabel}</span>
              <ExternalLink
                size={14}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
              />
            </span>
          </div>
        </div>
      </a>
    </motion.div>
  );
};

export const Projects: React.FC<ProjectsProps> = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  // Initial row: exactly 3 projects
  const initialProjects = projects.slice(0, 3);
  // Remaining projects revealed via View More
  const remainingProjects = projects.slice(3);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <section
      id="projects"
      className="py-24 sm:py-28 relative overflow-hidden"
      style={{
        backgroundColor: '#060B18',
        borderTop: '1px solid rgba(0, 102, 255, 0.25)',
      }}
    >
      {/* Background Digital Marketing Photography with dark overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10 mix-blend-luminosity"
        style={{
          backgroundImage: 'url(/workspace-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Subtle ambient glow in the background */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] pointer-events-none rounded-full"
        aria-hidden="true"
        style={{
          background: 'radial-gradient(ellipse, rgba(0, 70, 220, 0.14) 0%, rgba(245, 158, 11, 0.04) 40%, transparent 70%)',
          filter: 'blur(70px)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">

        {/* Centered Section Heading & Narrative */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-14 sm:mb-16"
        >
          {/* Centered Section Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 font-heading text-xs font-semibold tracking-[0.2em] uppercase mb-4 shadow-[0_0_15px_rgba(245,158,11,0.12)]">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_#F59E0B]" />
            Featured Work
          </div>

          {/* Centered Main Heading */}
          <h2 className="font-display text-[clamp(2.2rem,5vw,3.6rem)] font-bold uppercase tracking-wider text-white leading-tight">
            MY <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#008CFF] via-amber-300 to-amber-500">PROJECTS</span>
          </h2>

          {/* Centered Accent Line */}
          <div className="w-20 h-1 bg-gradient-to-r from-[#0066FF] via-amber-400 to-[#0066FF] mx-auto my-4 rounded-full" />

          {/* Centered Subtitle */}
          <p className="font-body text-slate-300 text-sm sm:text-base lg:text-lg leading-relaxed">
            Building impactful digital experiences through strategic marketing, creative content, blog platforms, and consistent brand communication.
          </p>
        </motion.div>

        {/* 1. Initial 3 Project Cards: Exactly 3 in One Horizontal Row on Desktop */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8 items-stretch"
        >
          {initialProjects.map((project, idx) => (
            <ProjectCard key={project.id} project={project} index={idx} />
          ))}
        </motion.div>

        {/* 2. Expandable Remaining Projects Container */}
        <AnimatePresence>
          {isExpanded && remainingProjects.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: 'auto', marginTop: '1.75rem' }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              className="overflow-hidden w-full"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8 items-stretch">
                {remainingProjects.map((project, idx) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={initialProjects.length + idx}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 3. Centered "View More Projects" / "Show Less" Button */}
        {remainingProjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-12 sm:mt-14 text-center flex justify-center"
          >
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full font-heading text-xs sm:text-sm font-semibold tracking-[0.16em] uppercase text-white border border-amber-500/40 bg-[#0A1228] hover:border-amber-400 hover:bg-[#0E1A3D] hover:shadow-[0_0_30px_rgba(245,158,11,0.28)] transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            >
              <span>{isExpanded ? 'SHOW LESS' : 'VIEW MORE PROJECTS'}</span>
              {isExpanded ? (
                <ChevronUp
                  size={16}
                  className="text-amber-400 group-hover:-translate-y-0.5 transition-transform"
                />
              ) : (
                <ChevronDown
                  size={16}
                  className="text-amber-400 group-hover:translate-y-0.5 transition-transform"
                />
              )}
            </button>
          </motion.div>
        )}

      </div>
    </section>
  );
};

export default Projects;
