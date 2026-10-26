import React, { useState, useRef, useCallback } from 'react';
import { motion, type Variants } from 'framer-motion';
import { Sparkles, Zap } from 'lucide-react';
import { ALL_PERSONAL_SKILLS, type DetailedSkill } from './skills/skillsData';
import { FloatingSkillCard } from './skills/FloatingSkillCard';
import { SkillDetailModal } from './skills/SkillDetailModal';

// Cinematic Heading Reveal Variants
const headingRevealVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    filter: 'blur(6px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const subtitleRevealVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 14,
    filter: 'blur(4px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.55,
      delay: 0.15,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// ── Floating 3D Geometric Crystals Component (Reference Image Style) ──
const FloatingGeometricCrystals: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0" aria-hidden="true">
      {/* Crystal 1: Top Left Faceted Prism */}
      <div
        className="absolute top-[8%] left-[4%] w-20 h-24 sm:w-24 sm:h-28 opacity-25 filter blur-[0.5px]"
        style={{
          animation: 'floatCrystal1 18s ease-in-out infinite',
          willChange: 'transform',
        }}
      >
        <svg viewBox="0 0 100 120" className="w-full h-full drop-shadow-[0_0_15px_rgba(0,229,255,0.35)]">
          <polygon points="50,5 95,45 50,75 5,45" fill="rgba(0, 229, 255, 0.1)" stroke="rgba(0, 229, 255, 0.45)" strokeWidth="1.2" />
          <polygon points="50,75 95,45 50,115" fill="rgba(139, 92, 246, 0.14)" stroke="rgba(168, 85, 247, 0.4)" strokeWidth="1.2" />
          <polygon points="50,75 5,45 50,115" fill="rgba(0, 140, 255, 0.12)" stroke="rgba(0, 140, 255, 0.35)" strokeWidth="1.2" />
        </svg>
      </div>

      {/* Crystal 2: Upper Center-Right Floating Octahedron */}
      <div
        className="absolute top-[12%] right-[12%] w-24 h-28 sm:w-28 sm:h-32 opacity-25 filter blur-[0.6px]"
        style={{
          animation: 'floatCrystal2 22s ease-in-out infinite 2s',
          willChange: 'transform',
        }}
      >
        <svg viewBox="0 0 100 120" className="w-full h-full drop-shadow-[0_0_20px_rgba(168,85,247,0.35)]">
          <polygon points="50,10 90,55 50,85 10,55" fill="rgba(168, 85, 247, 0.12)" stroke="rgba(236, 72, 153, 0.45)" strokeWidth="1.2" />
          <polygon points="50,85 90,55 50,110" fill="rgba(0, 229, 255, 0.14)" stroke="rgba(0, 229, 255, 0.45)" strokeWidth="1.2" />
          <polygon points="50,85 10,55 50,110" fill="rgba(99, 102, 241, 0.1)" stroke="rgba(139, 92, 246, 0.35)" strokeWidth="1.2" />
        </svg>
      </div>

      {/* Crystal 3: Mid-Right Floating Rhomboid */}
      <div
        className="hidden sm:block absolute top-[46%] -right-2 w-28 h-32 opacity-25 filter blur-[0.8px]"
        style={{
          animation: 'floatCrystal3 20s ease-in-out infinite 1s',
          willChange: 'transform',
        }}
      >
        <svg viewBox="0 0 120 140" className="w-full h-full drop-shadow-[0_0_20px_rgba(0,140,255,0.35)]">
          <polygon points="60,10 110,60 60,100 10,60" fill="rgba(0, 140, 255, 0.12)" stroke="rgba(0, 229, 255, 0.5)" strokeWidth="1.2" />
          <polygon points="60,100 110,60 60,130" fill="rgba(236, 72, 153, 0.12)" stroke="rgba(236, 72, 153, 0.4)" strokeWidth="1.2" />
          <polygon points="60,100 10,60 60,130" fill="rgba(139, 92, 246, 0.15)" stroke="rgba(168, 85, 247, 0.45)" strokeWidth="1.2" />
        </svg>
      </div>

      {/* Crystal 4: Lower-Left Diamond Facet */}
      <div
        className="absolute bottom-[14%] left-[5%] w-20 h-24 sm:w-24 sm:h-28 opacity-20 filter blur-[0.5px]"
        style={{
          animation: 'floatCrystal1 19s ease-in-out infinite 3s',
          willChange: 'transform',
        }}
      >
        <svg viewBox="0 0 100 120" className="w-full h-full drop-shadow-[0_0_16px_rgba(0,229,255,0.3)]">
          <polygon points="50,15 88,58 50,88 12,58" fill="rgba(0, 229, 255, 0.08)" stroke="rgba(0, 229, 255, 0.35)" strokeWidth="1.2" />
          <polygon points="50,88 88,58 50,112" fill="rgba(168, 85, 247, 0.12)" stroke="rgba(168, 85, 247, 0.35)" strokeWidth="1.2" />
          <polygon points="50,88 12,58 50,112" fill="rgba(0, 140, 255, 0.1)" stroke="rgba(0, 140, 255, 0.35)" strokeWidth="1.2" />
        </svg>
      </div>
    </div>
  );
};

export const PersonalSkills: React.FC = () => {
  const [activeSkill, setActiveSkill] = useState<DetailedSkill | null>(null);
  const [activeCardRect, setActiveCardRect] = useState<DOMRect | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // Timer for smooth hover transition and mouse-leave tolerance
  const leaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearLeaveTimer = useCallback(() => {
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = null;
    }
  }, []);

  // Hover start: highlights ambient active glow without involuntarily popping open modal
  const handleHoverStart = useCallback(
    (skill: DetailedSkill, rect: DOMRect) => {
      clearLeaveTimer();
      setActiveSkill(skill);
      setActiveCardRect(rect);
    },
    [clearLeaveTimer]
  );

  // Hover end: cleans up leave timers
  const handleHoverEnd = useCallback(() => {
    clearLeaveTimer();
  }, [clearLeaveTimer]);

  // Keep detail card open if user hovers onto it
  const handleDetailMouseEnter = useCallback(() => {
    clearLeaveTimer();
  }, [clearLeaveTimer]);

  // Close detail card when user leaves it
  const handleDetailMouseLeave = useCallback(() => {
    handleHoverEnd();
  }, [handleHoverEnd]);

  // Mobile / explicit click selection
  const handleSelect = useCallback(
    (skill: DetailedSkill, rect: DOMRect) => {
      clearLeaveTimer();
      setActiveSkill(skill);
      setActiveCardRect(rect);
      setIsDetailOpen(true);
    },
    [clearLeaveTimer]
  );

  const handleCloseDetail = useCallback(() => {
    clearLeaveTimer();
    setIsDetailOpen(false);
  }, [clearLeaveTimer]);

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="py-20 sm:py-24 lg:py-28 relative overflow-hidden bg-[#030713]"
      style={{ borderTop: '1px solid rgba(0, 140, 255, 0.22)' }}
    >
      {/* ══════════════════════════════════════════════════════════
          1. CINEMATIC BACKGROUND (Midnight navy + subtle drift + lighting)
          ══════════════════════════════════════════════════════════ */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none" aria-hidden="true">
        {/* Subtle Background Picture with Slow Drift */}
        <div
          className="absolute -inset-[4%] w-[108%] h-[108%] bg-cover bg-center bg-no-repeat opacity-[0.14]"
          style={{
            backgroundImage: "url('/skills-bg.jpg')",
          }}
        />

        {/* Seamless Vignette & Edge Blend Gradients */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(to bottom, #030713 0%, rgba(3, 7, 19, 0.45) 15%, rgba(3, 7, 19, 0.2) 50%, rgba(3, 7, 19, 0.65) 85%, #030713 100%),
              radial-gradient(ellipse at 50% 10%, rgba(0, 140, 255, 0.16) 0%, rgba(139, 92, 246, 0.08) 40%, transparent 70%),
              linear-gradient(to right, #030713 0%, transparent 12%, transparent 88%, #030713 100%)
            `,
          }}
        />

        {/* Deep Midnight Navy Overlay */}
        <div className="absolute inset-0 bg-[#030713]/60 backdrop-blur-[0.5px]" />
      </div>

      {/* ── Angled Futuristic Spatial Horizon Line (Reference Image Style) ── */}
      <div
        className="absolute top-[28%] -inset-x-20 h-[1.5px] pointer-events-none -rotate-2 opacity-30"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(0, 229, 255, 0.1) 15%, rgba(0, 229, 255, 0.7) 50%, rgba(168, 85, 247, 0.55) 75%, transparent 100%)',
          boxShadow: '0 0 12px rgba(0, 229, 255, 0.5)',
        }}
        aria-hidden="true"
      />

      {/* Digital Dotted Matrix Grid Pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(rgba(0, 229, 255, 0.7) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
        aria-hidden="true"
      />

      {/* ── 4 Slowly Moving Blurred Light Orbs (Optimized blur for silky smooth 60fps) ── */}
      {/* Orb 1: Electric Royal Blue (Top-Left) */}
      <div
        className="absolute -top-16 -left-16 w-[520px] h-[440px] pointer-events-none rounded-full blur-[80px] opacity-20 animate-ambient-orb-1"
        style={{
          background: 'radial-gradient(circle, #008CFF 0%, rgba(0, 71, 186, 0.5) 50%, transparent 75%)',
          willChange: 'transform',
        }}
        aria-hidden="true"
      />

      {/* Orb 2: Electric Cyan (Center-Right) */}
      <div
        className="absolute top-1/4 -right-16 w-[550px] h-[460px] pointer-events-none rounded-full blur-[80px] opacity-20 animate-ambient-orb-2"
        style={{
          background: 'radial-gradient(circle, #00E5FF 0%, rgba(0, 140, 255, 0.45) 50%, transparent 75%)',
          willChange: 'transform',
        }}
        aria-hidden="true"
      />

      {/* Orb 3: Violet & Purple (Bottom-Left) */}
      <div
        className="absolute -bottom-20 -left-20 w-[540px] h-[460px] pointer-events-none rounded-full blur-[80px] opacity-15 animate-ambient-orb-3"
        style={{
          background: 'radial-gradient(circle, #8B5CF6 0%, rgba(99, 102, 241, 0.4) 50%, transparent 75%)',
          willChange: 'transform',
        }}
        aria-hidden="true"
      />

      {/* Orb 4: Magenta & Neon Pink (Center-Bottom) */}
      <div
        className="absolute bottom-1/4 right-1/4 w-[480px] h-[400px] pointer-events-none rounded-full blur-[80px] opacity-15 animate-ambient-orb-4"
        style={{
          background: 'radial-gradient(circle, #EC4899 0%, rgba(168, 85, 247, 0.35) 50%, transparent 75%)',
          willChange: 'transform',
        }}
        aria-hidden="true"
      />

      {/* Dynamic Reactive Ambient Glow responding to currently hovered skill */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-700 blur-[90px] ${
          isDetailOpen && activeSkill ? 'opacity-35' : 'opacity-0'
        }`}
        style={{
          background: activeSkill
            ? `radial-gradient(ellipse 65% 45% at 50% 50%, ${activeSkill.glowColor} 0%, rgba(139, 92, 246, 0.15) 50%, transparent 75%)`
            : 'transparent',
          transition: 'opacity 0.6s ease, background 0.7s ease',
        }}
        aria-hidden="true"
      />

      {/* ── 3D Geometric Floating Faceted Crystals (Reference Image Style) ── */}
      <FloatingGeometricCrystals />

      {/* ══════════════════════════════════════════════════════════
          2. MAIN CONTENT (HEADING + FLOATING GLASS SKILLS CLOUD)
          ══════════════════════════════════════════════════════════ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 relative z-10">

        {/* ── CINEMATIC SECTION HEADING ── */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10 sm:mb-12">

          {/* Section Tag Badge */}
          <div className="w-full flex justify-center mb-3.5">
            <motion.div
              variants={headingRevealVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{ scale: 1.05, y: -2 }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-cyan-400/40 bg-gradient-to-r from-cyan-500/15 via-blue-500/10 to-purple-500/15 text-cyan-300 font-heading text-xs tracking-[0.18em] uppercase shadow-[0_0_20px_rgba(0,229,255,0.2)] cursor-default select-none transition-all duration-200"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                className="text-cyan-400 flex items-center justify-center"
              >
                <Sparkles size={13} />
              </motion.div>

              <span className="font-semibold">Core Capabilities</span>

              <motion.div
                animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#00E5FF]"
              />
            </motion.div>
          </div>

          {/* Main Heading with Gradient Glow */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-2.5">
            <motion.span
              animate={{ y: [-3, 3, -3], opacity: [0.4, 1, 0.4], rotate: [0, 180, 360] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="text-cyan-400/80 pointer-events-none flex items-center justify-center"
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
                <span className="relative z-10 bg-gradient-to-r from-[#00E5FF] via-[#008CFF] to-[#A855F7] bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(0,229,255,0.45)]">
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
              animate={{ y: [3, -3, 3], opacity: [0.4, 1, 0.4], rotate: [360, 180, 0] }}
              transition={{ duration: 5.5, delay: 0.5, repeat: Infinity, ease: 'easeInOut' }}
              className="text-purple-400/80 pointer-events-none flex items-center justify-center"
              aria-hidden="true"
            >
              <Sparkles size={18} />
            </motion.span>
          </div>

          {/* Traveling Shimmer Beam Underline */}
          <motion.div
            variants={headingRevealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="relative w-24 h-[2px] mx-auto mb-3.5 rounded-full overflow-hidden bg-slate-800"
          >
            <motion.div
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
              className="w-full h-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
            />
          </motion.div>

          {/* Subtitle */}
          <motion.p
            variants={subtitleRevealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="font-body text-[#94A3B8] text-sm sm:text-base leading-relaxed max-w-2xl"
          >
            Core digital marketing, business development, and cloud management disciplines cultivated through real-world campaigns, lead generation pipelines, and technical execution.
          </motion.p>
        </div>

        {/* ══════════════════════════════════════════════════════════
            3. FLOATING GLASS SKILLS CLOUD (ALL 12 SKILLS SIMULTANEOUSLY)
            Every card is exactly the same size. No scrollbars.
            ══════════════════════════════════════════════════════════ */}
        <div
          className="relative w-full py-2 sm:py-4"
          style={{
            perspective: 1200,
          }}
        >
          {/* Responsive 4-col (desktop), 3-col (tablet), 2-col (mobile) grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5 lg:gap-6 items-center justify-items-center">
            {ALL_PERSONAL_SKILLS.map((skill, index) => (
              <div
                key={skill.id}
                className="w-full flex justify-center"
              >
                <FloatingSkillCard
                  skill={skill}
                  index={index}
                  isSelected={isDetailOpen && activeSkill?.id === skill.id}
                  onHoverStart={handleHoverStart}
                  onHoverEnd={handleHoverEnd}
                  onSelect={handleSelect}
                />
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ══════════════════════════════════════════════════════════
          4. INTERACTIVE 3D SKILL DETAIL PROJECTION CARD
          ══════════════════════════════════════════════════════════ */}
      <SkillDetailModal
        skill={activeSkill}
        cardRect={activeCardRect}
        isOpen={isDetailOpen}
        onClose={handleCloseDetail}
        onMouseEnter={handleDetailMouseEnter}
        onMouseLeave={handleDetailMouseLeave}
      />
    </section>
  );
};

export default PersonalSkills;
