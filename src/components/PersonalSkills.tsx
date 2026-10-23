import React, { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import {
  Share2,
  Palette,
  CalendarDays,
  BarChart2,
  Search,
  Compass,
  Film,
  Sparkles,
  FileText,
  Users,
  Briefcase,
  Cloud,
  ChevronDown,
  Zap,
} from 'lucide-react';

interface SkillItem {
  name: string;
  category: string;
  detail: string;
  icon: React.ReactNode;
  iconAnimType: 'bounce' | 'tilt' | 'pulse' | 'spin' | 'float';
}

// Background floating gold particles
const ambientParticles = [
  { x: 10, y: 16, size: 3, delay: 0, duration: 12 },
  { x: 26, y: 42, size: 2, delay: 1.2, duration: 15 },
  { x: 42, y: 18, size: 2.5, delay: 2.4, duration: 14 },
  { x: 62, y: 28, size: 3, delay: 0.6, duration: 11 },
  { x: 78, y: 14, size: 2, delay: 3, duration: 16 },
  { x: 88, y: 52, size: 2.5, delay: 1.5, duration: 13 },
  { x: 18, y: 80, size: 3, delay: 2, duration: 12 },
  { x: 50, y: 74, size: 2, delay: 0.8, duration: 15 },
  { x: 74, y: 84, size: 2.5, delay: 2.2, duration: 14 },
  { x: 92, y: 78, size: 2, delay: 1.1, duration: 16 },
  { x: 6, y: 62, size: 2.5, delay: 3.1, duration: 13 },
  { x: 58, y: 56, size: 2, delay: 2.7, duration: 17 },
];

// Background floating skill discipline watermark tags
const backgroundSkillTags = [
  { text: 'SEO & OPTIMIZATION', x: '4%', y: '12%', duration: 11, delay: 0 },
  { text: 'DATA ANALYTICS', x: '82%', y: '16%', duration: 13, delay: 1.5 },
  { text: 'CONTENT STRATEGY', x: '8%', y: '48%', duration: 10, delay: 0.8 },
  { text: 'GROWTH MARKETING', x: '80%', y: '52%', duration: 12, delay: 2 },
  { text: 'LEAD GENERATION', x: '3%', y: '84%', duration: 14, delay: 1 },
  { text: 'CLOUD ARCHITECTURE', x: '82%', y: '86%', duration: 11, delay: 2.5 },
  { text: 'AI WORKFLOWS', x: '46%', y: '95%', duration: 9, delay: 0.5 },
];

// Cinematic Heading Reveal Variants (Blur to Clear + Fade Up)
const headingRevealVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 28,
    filter: 'blur(8px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const subtitleRevealVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
    filter: 'blur(6px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.65,
      delay: 0.18,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// Row 1: Cinematic 3D Perspective + Upward Glide
const row1CardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 45,
    rotateX: 14,
    scale: 0.94,
    transformPerspective: 1200,
  },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: {
      duration: 0.65,
      delay: 0.35 + delay,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

// Row 2: Cinematic Horizontal Slide-in + Upward Glide
const row2CardVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -24,
    y: 35,
    scale: 0.95,
  },
  visible: (delay: number) => ({
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.65,
      delay: 0.75 + delay,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

// Expanded Row 3: Staggered Fade Up
const expandedCardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 28,
    scale: 0.96,
  },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      delay: delay,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

interface SkillCardProps {
  skill: SkillItem;
  index: number;
  rowType: 'row1' | 'row2' | 'expanded';
  customDelay: number;
}

const SkillCard: React.FC<SkillCardProps> = ({ skill, index, rowType, customDelay }) => {
  const getIconHoverAnimation = () => {
    switch (skill.iconAnimType) {
      case 'spin':
        return 'group-hover:rotate-45 group-hover:scale-110';
      case 'tilt':
        return 'group-hover:-rotate-12 group-hover:scale-115';
      case 'pulse':
        return 'group-hover:scale-120';
      case 'float':
        return 'group-hover:-translate-y-1 group-hover:scale-110';
      case 'bounce':
      default:
        return 'group-hover:-translate-y-0.5 group-hover:scale-110';
    }
  };

  const getVariants = () => {
    if (rowType === 'row1') return row1CardVariants;
    if (rowType === 'row2') return row2CardVariants;
    return expandedCardVariants;
  };

  return (
    <motion.div
      variants={getVariants()}
      custom={customDelay}
      whileHover={{ y: -7, transition: { duration: 0.25, ease: 'easeOut' } }}
      className="h-full"
    >
      <div
        className="group relative h-full p-5 sm:p-6 rounded-xl flex flex-col justify-between bg-[#0A1228] border border-amber-500/20 hover:border-amber-400/80 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.7)] hover:shadow-[0_20px_45px_-10px_rgba(0,0,0,0.9),0_0_30px_rgba(245,158,11,0.25)] transition-all duration-300 ease-out overflow-hidden cursor-default"
      >
        {/* 1. Cinematic Initial Reveal Light Reflection Sheen */}
        <motion.div
          initial={{ x: '-150%' }}
          animate={{ x: '160%' }}
          transition={{
            delay: (rowType === 'row1' ? 0.45 : rowType === 'row2' ? 0.85 : 0.1) + customDelay,
            duration: 0.85,
            ease: 'easeInOut',
          }}
          className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-amber-400/[0.18] to-transparent transform -skew-x-25 pointer-events-none"
          aria-hidden="true"
        />

        {/* 2. Interactive Diagonal Light Sweep across Card Surface on Hover */}
        <div
          className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-amber-400/[0.12] to-transparent transform -skew-x-20 pointer-events-none"
          aria-hidden="true"
        />

        {/* 3. Ambient Gold Backlight Glow */}
        <div
          className="absolute -top-14 -right-14 w-32 h-32 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: 'radial-gradient(circle, rgba(245, 158, 11, 0.28) 0%, rgba(251, 191, 36, 0.1) 45%, transparent 70%)',
            filter: 'blur(22px)',
          }}
          aria-hidden="true"
        />

        <div className="relative z-10">
          {/* Top Row: Icon Container + Category Badge */}
          <div className="flex items-center justify-between mb-4">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center bg-amber-500/10 border border-amber-500/30 group-hover:border-amber-400 group-hover:bg-amber-500/20 group-hover:shadow-[0_0_16px_rgba(245,158,11,0.3)] transition-all duration-300"
            >
              <div
                className={`text-amber-400 group-hover:text-amber-300 transition-all duration-300 flex items-center justify-center ${getIconHoverAnimation()}`}
              >
                {skill.icon}
              </div>
            </div>

            {/* Skill Category Micro-pill */}
            <span className="font-mono text-[10px] tracking-widest uppercase px-2.5 py-0.5 rounded-full border border-amber-500/20 bg-amber-500/5 text-amber-300/80 group-hover:text-amber-300 group-hover:border-amber-400/40 group-hover:bg-amber-500/10 transition-colors duration-200">
              {skill.category}
            </span>
          </div>

          {/* Skill Title */}
          <h3 className="font-heading text-base sm:text-lg font-semibold uppercase tracking-wider text-white group-hover:text-amber-300 transition-colors duration-200 leading-snug mb-2">
            {skill.name}
          </h3>

          {/* Skill Description */}
          <p className="font-body text-xs sm:text-sm text-[#94A3B8] group-hover:text-slate-200 transition-colors duration-200 leading-relaxed">
            {skill.detail}
          </p>
        </div>

        {/* Card Footer: Index + Animated Live Radar Light + Expanding Gold Bar */}
        <div className="relative z-10 mt-5 pt-3 border-t border-slate-800/80 flex flex-col gap-2">
          <div className="flex items-center justify-between text-[11px] font-mono text-amber-400/80 group-hover:text-amber-300 transition-colors">
            <span>{String(index + 1).padStart(2, '0')}</span>

            {/* Pulsing radar dot indicator */}
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,1)]" />
            </span>
          </div>

          {/* Smooth Expanding Gold Bar on hover */}
          <div className="w-full h-[1.5px] bg-slate-800/50 rounded-full overflow-hidden">
            <div className="h-full w-0 group-hover:w-full bg-gradient-to-r from-amber-400 to-yellow-300 rounded-full transition-all duration-500 ease-out" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const PersonalSkills: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const iconProps = {
    size: 20,
    className: 'text-amber-400 group-hover:text-amber-300 transition-colors duration-200',
  };

  const skills: SkillItem[] = [
    {
      name: 'Social Media Marketing',
      category: 'GROWTH',
      detail: 'SMO, channel growth, brand voice & community engagement across Instagram & LinkedIn.',
      icon: <Share2 {...iconProps} />,
      iconAnimType: 'bounce',
    },
    {
      name: 'Content Creation',
      category: 'CREATIVE',
      detail: 'High-retention carousels, promotional posters, digital creatives & visual storytelling.',
      icon: <Palette {...iconProps} />,
      iconAnimType: 'tilt',
    },
    {
      name: 'Campaign Planning',
      category: 'STRATEGY',
      detail: 'Integrated marketing initiatives, editorial calendars & end-to-end campaign execution.',
      icon: <CalendarDays {...iconProps} />,
      iconAnimType: 'pulse',
    },
    {
      name: 'Data Analysis',
      category: 'ANALYTICS',
      detail: 'Traffic diagnostics, user behavior tracking, funnel drop-off & Google Analytics reporting.',
      icon: <BarChart2 {...iconProps} />,
      iconAnimType: 'pulse',
    },
    {
      name: 'SEO & Keyword Research',
      category: 'SEARCH',
      detail: 'On-page SEO, high-intent keyword discovery & Google Business Profile local visibility.',
      icon: <Search {...iconProps} />,
      iconAnimType: 'tilt',
    },
    {
      name: 'Communication & Strategy',
      category: 'LEADERSHIP',
      detail: 'Consultative customer presentations, stakeholder reporting & cross-team synergy.',
      icon: <Compass {...iconProps} />,
      iconAnimType: 'spin',
    },
    {
      name: 'Video Editing',
      category: 'PRODUCTION',
      detail: 'Editing engaging short-form videos, Instagram Reels, promotional videos, and social media content with attention to storytelling, pacing, transitions, and visual quality.',
      icon: <Film {...iconProps} />,
      iconAnimType: 'tilt',
    },
    {
      name: 'AI Graphic Designing',
      category: 'AI & DESIGN',
      detail: 'Creating creative visuals, promotional posters, social media graphics, and digital marketing creatives using AI-powered design tools and creative workflows.',
      icon: <Sparkles {...iconProps} />,
      iconAnimType: 'spin',
    },
    {
      name: 'Blog Writing',
      category: 'EDITORIAL',
      detail: 'Creating informative, engaging, and SEO-friendly blog articles, educational content, and website content for digital platforms.',
      icon: <FileText {...iconProps} />,
      iconAnimType: 'float',
    },
    {
      name: 'Coordination',
      category: 'OPERATIONS',
      detail: 'Coordinating with designers, content creators, and team members to manage tasks, organize workflows, and ensure timely project delivery.',
      icon: <Users {...iconProps} />,
      iconAnimType: 'pulse',
    },
    {
      name: 'Client Management',
      category: 'RELATIONS',
      detail: 'Managing client relationships, understanding requirements, communicating updates, coordinating deliverables, and maintaining professional relationships.',
      icon: <Briefcase {...iconProps} />,
      iconAnimType: 'tilt',
    },
    {
      name: 'Microsoft Azure',
      category: 'CLOUD INFRA',
      detail: 'Understanding cloud computing concepts, Azure services, virtual machines, storage accounts, virtual networks, and basic cloud infrastructure management.',
      icon: <Cloud {...iconProps} />,
      iconAnimType: 'float',
    },
  ];

  const row1Skills = skills.slice(0, 4);
  const row2Skills = skills.slice(4, 8);
  const remainingSkills = skills.slice(8);

  const handleToggle = () => {
    if (isExpanded) {
      setIsExpanded(false);
      const el = document.getElementById('skills');
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top < -80) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    } else {
      setIsExpanded(true);
    }
  };

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="py-24 sm:py-28 relative overflow-hidden"
      style={{ backgroundColor: '#060B18', borderTop: '1px solid #172554' }}
    >
      {/* ══════════════════════════════════════════════════════════
          1. PREMIUM ANIMATED CINEMATIC BACKGROUND DESIGN
          ══════════════════════════════════════════════════════════ */}

      {/* A. Cinematic High-End Background Picture with Ken-Burns Breathing Zoom & Drift */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none" aria-hidden="true">
        <motion.div
          animate={{
            scale: [1, 1.06, 1],
            y: [0, -15, 0],
          }}
          transition={{
            duration: 24,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -inset-[6%] w-[112%] h-[112%] bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/skills-bg.jpg')",
            opacity: 0.35,
          }}
        />

        {/* Seamless Vignette & Edge Blend Gradients (Flawlessly transitions to #060B18 on all 4 borders) */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(to bottom, #060B18 0%, rgba(6, 11, 24, 0.45) 15%, rgba(6, 11, 24, 0.2) 50%, rgba(6, 11, 24, 0.6) 82%, #060B18 100%),
              radial-gradient(ellipse at 50% 12%, rgba(245, 158, 11, 0.16) 0%, transparent 65%),
              linear-gradient(to right, #060B18 0%, transparent 12%, transparent 88%, #060B18 100%)
            `,
          }}
        />

        {/* Ambient Contrast Overlay */}
        <div className="absolute inset-0 bg-[#060B18]/30 backdrop-blur-[0.5px]" />
      </div>

      {/* B. Digital Dotted Matrix Pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: 'radial-gradient(rgba(245, 158, 11, 0.45) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
        aria-hidden="true"
      />

      {/* B. Interconnected Glowing Constellation Grid (SVG) */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.14]"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="goldLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#FBBF24" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.4" />
          </linearGradient>
        </defs>

        {/* Constellation Connection Lines */}
        <line x1="14%" y1="22%" x2="28%" y2="38%" stroke="url(#goldLineGrad)" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="28%" y1="38%" x2="48%" y2="24%" stroke="url(#goldLineGrad)" strokeWidth="1" />
        <line x1="48%" y1="24%" x2="72%" y2="36%" stroke="url(#goldLineGrad)" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="72%" y1="36%" x2="86%" y2="22%" stroke="url(#goldLineGrad)" strokeWidth="1" />
        <line x1="18%" y1="76%" x2="40%" y2="82%" stroke="url(#goldLineGrad)" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="40%" y1="82%" x2="68%" y2="78%" stroke="url(#goldLineGrad)" strokeWidth="1" />
        <line x1="68%" y1="78%" x2="88%" y2="70%" stroke="url(#goldLineGrad)" strokeWidth="1" strokeDasharray="4 4" />

        {/* Nodes with gentle pulsing opacity */}
        {[
          { cx: '14%', cy: '22%' },
          { cx: '28%', cy: '38%' },
          { cx: '48%', cy: '24%' },
          { cx: '72%', cy: '36%' },
          { cx: '86%', cy: '22%' },
          { cx: '18%', cy: '76%' },
          { cx: '40%', cy: '82%' },
          { cx: '68%', cy: '78%' },
          { cx: '88%', cy: '70%' },
        ].map((node, i) => (
          <circle
            key={i}
            cx={node.cx}
            cy={node.cy}
            r="3"
            fill="#F59E0B"
            className="animate-pulse"
            style={{ animationDuration: `${3 + (i % 3)}s` }}
          />
        ))}
      </svg>

      {/* C. Occasional Soft Gold Light Trails Moving Slowly Across */}
      <motion.div
        animate={{
          x: ['-25%', '125%'],
          y: ['-10%', '115%'],
          opacity: [0, 0.45, 0],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: 'easeInOut',
          repeatDelay: 5,
        }}
        className="absolute w-72 h-[1.5px] bg-gradient-to-r from-transparent via-amber-400/60 to-transparent pointer-events-none blur-[1px] transform -rotate-25"
        style={{ left: '0%', top: '25%' }}
        aria-hidden="true"
      />

      <motion.div
        animate={{
          x: ['125%', '-25%'],
          y: ['15%', '85%'],
          opacity: [0, 0.4, 0],
        }}
        transition={{
          duration: 18,
          delay: 7,
          repeat: Infinity,
          ease: 'easeInOut',
          repeatDelay: 6,
        }}
        className="absolute w-80 h-[1.5px] bg-gradient-to-r from-transparent via-amber-300/50 to-transparent pointer-events-none blur-[1px] transform rotate-15"
        style={{ right: '0%', top: '45%' }}
        aria-hidden="true"
      />

      {/* D. Ambient Breathing Gold Radial Gradients */}
      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.35, 0.55, 0.35],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-12 left-1/2 -translate-x-1/2 w-[700px] h-[360px] pointer-events-none rounded-full"
        aria-hidden="true"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(245, 158, 11, 0.12) 0%, rgba(217, 119, 6, 0.04) 45%, transparent 75%)',
          filter: 'blur(65px)',
        }}
      />

      <div
        className="absolute bottom-8 right-12 w-[460px] h-[300px] pointer-events-none rounded-full"
        aria-hidden="true"
        style={{
          background: 'radial-gradient(circle, rgba(245, 158, 11, 0.05) 0%, transparent 70%)',
          filter: 'blur(55px)',
        }}
      />

      {/* E. Floating Subtle Gold Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none" aria-hidden="true">
        {ambientParticles.map((p, idx) => (
          <motion.div
            key={idx}
            animate={{
              y: [0, -35, 0],
              x: [0, 12, -8, 0],
              opacity: [0.2, 0.7, 0.2],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute rounded-full bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.8)]"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
            }}
          />
        ))}
      </div>

      {/* F. Floating Watermark Discipline Keywords */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none" aria-hidden="true">
        {backgroundSkillTags.map((tag, idx) => (
          <motion.div
            key={idx}
            animate={{
              y: [-12, 12, -12],
              x: [-4, 4, -4],
              opacity: [0.07, 0.14, 0.07],
            }}
            transition={{
              duration: tag.duration,
              delay: tag.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute font-mono text-[11px] sm:text-xs tracking-[0.22em] text-amber-400 font-semibold uppercase px-3 py-1 rounded border border-amber-500/10 bg-amber-500/[0.02]"
            style={{ left: tag.x, top: tag.y }}
          >
            {tag.text}
          </motion.div>
        ))}
      </div>

      {/* ══════════════════════════════════════════════════════════
          2. MAIN CONTENT CONTAINER (CARDS + HEADING)
          ══════════════════════════════════════════════════════════ */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">

        {/* ── CINEMATIC HEADING REVEAL ── */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14 sm:mb-16">

          {/* Glowing Animated Tag Badge */}
          <div className="w-full flex justify-center mb-4 sm:mb-5">
            <motion.div
              variants={headingRevealVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{ scale: 1.05, y: -2 }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-amber-500/35 bg-gradient-to-r from-amber-500/15 via-amber-500/10 to-amber-500/15 text-amber-300 font-heading text-xs tracking-[0.16em] uppercase shadow-[0_0_20px_rgba(245,158,11,0.18)] cursor-default select-none transition-all duration-200"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                className="text-amber-400 flex items-center justify-center"
              >
                <Sparkles size={13} />
              </motion.div>

              <span className="font-semibold">Core Capabilities</span>

              <motion.div
                animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_#F59E0B]"
              />
            </motion.div>
          </div>

          {/* Heading with Blur-to-Clear Reveal + Light Sheen Sweep */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-3">
            <motion.span
              animate={{ y: [-4, 4, -4], opacity: [0.35, 1, 0.35], rotate: [0, 180, 360] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="text-amber-400/80 pointer-events-none flex items-center justify-center"
              aria-hidden="true"
            >
              <Zap size={18} />
            </motion.span>

            <motion.h2
              id="skills-heading"
              variants={headingRevealVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-wider text-white m-0 relative"
            >
              MY{' '}
              <span className="relative inline-block overflow-hidden px-1">
                <span className="relative z-10 bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-500 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(245,158,11,0.4)]">
                  SKILLS
                </span>
                {/* Light Sweep Reflection across heading */}
                <motion.span
                  initial={{ x: '-120%', opacity: 0 }}
                  animate={{ x: '180%', opacity: [0, 0.8, 0] }}
                  transition={{ delay: 0.6, duration: 1.2, ease: 'easeInOut', repeat: Infinity, repeatDelay: 6 }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none transform -skew-x-20"
                  aria-hidden="true"
                />
              </span>
            </motion.h2>

            <motion.span
              animate={{ y: [4, -4, 4], opacity: [0.35, 1, 0.35], rotate: [360, 180, 0] }}
              transition={{ duration: 5.5, delay: 0.5, repeat: Infinity, ease: 'easeInOut' }}
              className="text-amber-400/80 pointer-events-none flex items-center justify-center"
              aria-hidden="true"
            >
              <Sparkles size={18} />
            </motion.span>
          </div>

          {/* Dynamic Traveling Shimmer Beam Underline */}
          <motion.div
            variants={headingRevealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="relative w-28 h-[2.5px] mx-auto mb-5 rounded-full overflow-hidden bg-slate-800"
          >
            <motion.div
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
              className="w-full h-full bg-gradient-to-r from-transparent via-amber-400 to-transparent"
            />
          </motion.div>

          {/* Subtitle */}
          <motion.p
            variants={subtitleRevealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="font-body text-[#94A3B8] text-sm sm:text-base leading-relaxed"
          >
            Core digital marketing, business development, and cloud management disciplines cultivated through real-world campaigns, lead generation pipelines, and technical execution.
          </motion.p>
        </div>

        {/* ── CINEMATIC FIRST ROW (CARDS 1–4) ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.08 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 items-stretch"
        >
          {row1Skills.map((skill, index) => (
            <SkillCard
              key={skill.name}
              skill={skill}
              index={index}
              rowType="row1"
              customDelay={index * 0.12}
            />
          ))}
        </motion.div>

        {/* ── CINEMATIC SECOND ROW (CARDS 5–8) ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.08 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 items-stretch mt-5 sm:mt-6"
        >
          {row2Skills.map((skill, index) => (
            <SkillCard
              key={skill.name}
              skill={skill}
              index={row1Skills.length + index}
              rowType="row2"
              customDelay={index * 0.12}
            />
          ))}
        </motion.div>

        {/* ── EXPANDABLE REMAINING SKILLS (CARDS 9–12) ── */}
        <AnimatePresence>
          {isExpanded && remainingSkills.length > 0 && (
            <motion.div
              id="remaining-skills-container"
              key="remaining-skills"
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: 'auto', marginTop: '1.25rem' }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden w-full"
            >
              <motion.div
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 items-stretch pt-1 pb-1"
              >
                {remainingSkills.map((skill, index) => (
                  <SkillCard
                    key={skill.name}
                    skill={skill}
                    index={row1Skills.length + row2Skills.length + index}
                    rowType="expanded"
                    customDelay={index * 0.1}
                  />
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── CENTERED "VIEW MORE" / "SHOW LESS" BUTTON ── */}
        {remainingSkills.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-10 sm:mt-12 text-center flex justify-center"
          >
            <button
              type="button"
              onClick={handleToggle}
              aria-expanded={isExpanded}
              aria-controls="remaining-skills-container"
              className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full font-heading text-xs sm:text-sm font-semibold tracking-[0.16em] uppercase text-white border border-amber-500/40 bg-[#0A1228] hover:border-amber-400 hover:bg-[#0E1A3D] hover:shadow-[0_0_30px_rgba(245,158,11,0.32)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            >
              <span>{isExpanded ? 'Show Less' : 'View More'}</span>
              <motion.span
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="inline-flex items-center justify-center text-amber-400 group-hover:text-amber-300"
              >
                <ChevronDown size={16} />
              </motion.span>
            </button>
          </motion.div>
        )}

      </div>
    </section>
  );
};

export default PersonalSkills;
