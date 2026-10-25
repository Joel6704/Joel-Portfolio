import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { ChevronDown, Sparkles, Zap, Layers } from 'lucide-react';
import { ALL_PERSONAL_SKILLS, type DetailedSkill } from './skills/skillsData';
import { FloatingSkillCard } from './skills/FloatingSkillCard';
import { SkillDetailModal } from './skills/SkillDetailModal';

// Background ambient floating particles
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

// Floating discipline watermark tags
const backgroundSkillTags = [
  { text: 'SEO & OPTIMIZATION', x: '4%', y: '12%', duration: 11, delay: 0 },
  { text: 'DATA ANALYTICS', x: '82%', y: '16%', duration: 13, delay: 1.5 },
  { text: 'CONTENT STRATEGY', x: '8%', y: '48%', duration: 10, delay: 0.8 },
  { text: 'GROWTH MARKETING', x: '80%', y: '52%', duration: 12, delay: 2 },
  { text: 'LEAD GENERATION', x: '3%', y: '84%', duration: 14, delay: 1 },
  { text: 'CLOUD ARCHITECTURE', x: '82%', y: '86%', duration: 11, delay: 2.5 },
  { text: 'AI WORKFLOWS', x: '46%', y: '95%', duration: 9, delay: 0.5 },
];

// Cinematic Heading Reveal Variants
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

export const PersonalSkills: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeSkill, setActiveSkill] = useState<DetailedSkill | null>(null);
  const [activeCardRect, setActiveCardRect] = useState<DOMRect | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // Timer for smooth hover transition and mouse-leave tolerance
  const leaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Initial row: exactly 8 skills (2 rows of 4 on desktop)
  const initialSkills = ALL_PERSONAL_SKILLS.slice(0, 8);
  // Remaining 4 skills revealed via View More / Show Less
  const remainingSkills = ALL_PERSONAL_SKILLS.slice(8);

  const clearLeaveTimer = useCallback(() => {
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = null;
    }
  }, []);

  // Hover start: immediately activate skill and detail card
  const handleHoverStart = useCallback(
    (skill: DetailedSkill, rect: DOMRect) => {
      clearLeaveTimer();
      setActiveSkill(skill);
      setActiveCardRect(rect);
      setIsDetailOpen(true);
    },
    [clearLeaveTimer]
  );

  // Hover end: start short grace period before closing so user can transition to detail card
  const handleHoverEnd = useCallback(() => {
    clearLeaveTimer();
    leaveTimerRef.current = setTimeout(() => {
      setIsDetailOpen(false);
    }, 280);
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
      className="py-24 sm:py-28 lg:py-32 relative overflow-hidden bg-[#040817]"
      style={{ borderTop: '1px solid rgba(0, 140, 255, 0.22)' }}
    >
      {/* ══════════════════════════════════════════════════════════
          1. PREMIUM CINEMATIC BACKGROUND WITH KEN-BURNS DRIFT
          ══════════════════════════════════════════════════════════ */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none" aria-hidden="true">
        {/* Subtle Background Picture with Slow Drift */}
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            y: [0, -12, 0],
          }}
          transition={{
            duration: 26,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -inset-[6%] w-[112%] h-[112%] bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/skills-bg.jpg')",
            opacity: 0.24,
          }}
        />

        {/* Seamless Vignette & Edge Blend Gradients */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(to bottom, #040817 0%, rgba(4, 8, 23, 0.45) 15%, rgba(4, 8, 23, 0.2) 50%, rgba(4, 8, 23, 0.65) 82%, #040817 100%),
              radial-gradient(ellipse at 50% 10%, rgba(0, 140, 255, 0.16) 0%, rgba(139, 92, 246, 0.08) 40%, transparent 68%),
              linear-gradient(to right, #040817 0%, transparent 12%, transparent 88%, #040817 100%)
            `,
          }}
        />

        {/* Ambient Dark Navy Contrast Overlay */}
        <div className="absolute inset-0 bg-[#040817]/40 backdrop-blur-[0.5px]" />
      </div>

      {/* Digital Dotted Matrix Pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(rgba(0, 229, 255, 0.6) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
        aria-hidden="true"
      />

      {/* ── 4 Slowly Moving Blurred Light Orbs (Electric Blue, Cyan, Violet, Pink/Magenta) ── */}
      {/* Orb 1: Electric Royal Blue (Top-Left) */}
      <div
        className="absolute -top-24 -left-20 w-[650px] h-[550px] pointer-events-none rounded-full blur-[130px] opacity-25 animate-ambient-orb-1"
        style={{
          background: 'radial-gradient(circle, #008CFF 0%, rgba(0, 71, 186, 0.5) 50%, transparent 75%)',
        }}
        aria-hidden="true"
      />

      {/* Orb 2: Electric Cyan (Center-Right) */}
      <div
        className="absolute top-1/4 -right-24 w-[700px] h-[550px] pointer-events-none rounded-full blur-[140px] opacity-25 animate-ambient-orb-2"
        style={{
          background: 'radial-gradient(circle, #00E5FF 0%, rgba(0, 140, 255, 0.45) 50%, transparent 75%)',
        }}
        aria-hidden="true"
      />

      {/* Orb 3: Violet & Purple (Bottom-Left) */}
      <div
        className="absolute -bottom-28 -left-24 w-[680px] h-[580px] pointer-events-none rounded-full blur-[135px] opacity-20 animate-ambient-orb-3"
        style={{
          background: 'radial-gradient(circle, #8B5CF6 0%, rgba(99, 102, 241, 0.4) 50%, transparent 75%)',
        }}
        aria-hidden="true"
      />

      {/* Orb 4: Magenta & Neon Pink (Center-Bottom) */}
      <div
        className="absolute bottom-1/4 right-1/4 w-[600px] h-[500px] pointer-events-none rounded-full blur-[130px] opacity-15 animate-ambient-orb-4"
        style={{
          background: 'radial-gradient(circle, #EC4899 0%, rgba(168, 85, 247, 0.35) 50%, transparent 75%)',
        }}
        aria-hidden="true"
      />

      {/* Dynamic Interactive Reactive Lighting responding to currently selected / hovered skill */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-700 blur-[120px] ${
          isDetailOpen && activeSkill ? 'opacity-45' : 'opacity-0'
        }`}
        style={{
          background: activeSkill
            ? `radial-gradient(ellipse 65% 50% at 50% 50%, ${activeSkill.glowColor} 0%, rgba(139, 92, 246, 0.15) 50%, transparent 75%)`
            : 'transparent',
          transition: 'opacity 0.6s ease, background 0.7s ease',
        }}
        aria-hidden="true"
      />

      {/* Subtle Ambient Light Wave */}
      <div
        className="absolute -inset-x-20 top-1/3 h-96 pointer-events-none opacity-20 blur-[100px] -rotate-6"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(0, 140, 255, 0.35) 30%, rgba(0, 229, 255, 0.25) 50%, rgba(168, 85, 247, 0.3) 70%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      {/* Floating Micro Particle Specks */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none" aria-hidden="true">
        {ambientParticles.map((p, idx) => (
          <motion.div
            key={idx}
            animate={{
              y: [0, -32, 0],
              x: [0, 10, -6, 0],
              opacity: [0.2, 0.75, 0.2],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(0,229,255,0.85)]"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
            }}
          />
        ))}
      </div>

      {/* Floating Watermark Discipline Keywords */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none" aria-hidden="true">
        {backgroundSkillTags.map((tag, idx) => (
          <motion.div
            key={idx}
            animate={{
              y: [-10, 10, -10],
              x: [-4, 4, -4],
              opacity: [0.06, 0.12, 0.06],
            }}
            transition={{
              duration: tag.duration,
              delay: tag.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute font-mono text-[10px] sm:text-[11px] tracking-[0.24em] text-cyan-300 font-semibold uppercase px-3 py-1 rounded border border-cyan-400/10 bg-cyan-500/[0.02]"
            style={{ left: tag.x, top: tag.y }}
          >
            {tag.text}
          </motion.div>
        ))}
      </div>

      {/* ══════════════════════════════════════════════════════════
          2. MAIN CONTENT (HEADING + 3D FLOATING SKILL CARDS)
          ══════════════════════════════════════════════════════════ */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">

        {/* ── CINEMATIC SECTION HEADING ── */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14 sm:mb-16">

          {/* Section Tag Badge */}
          <div className="w-full flex justify-center mb-4 sm:mb-5">
            <motion.div
              variants={headingRevealVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{ scale: 1.05, y: -2 }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-cyan-400/40 bg-gradient-to-r from-cyan-500/15 via-blue-500/10 to-purple-500/15 text-cyan-300 font-heading text-xs tracking-[0.18em] uppercase shadow-[0_0_22px_rgba(0,229,255,0.22)] cursor-default select-none transition-all duration-200"
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
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-3">
            <motion.span
              animate={{ y: [-4, 4, -4], opacity: [0.4, 1, 0.4], rotate: [0, 180, 360] }}
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
                <span className="relative z-10 bg-gradient-to-r from-[#00E5FF] via-[#008CFF] to-[#A855F7] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(0,229,255,0.45)]">
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
              animate={{ y: [4, -4, 4], opacity: [0.4, 1, 0.4], rotate: [360, 180, 0] }}
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
            className="relative w-28 h-[2.5px] mx-auto mb-5 rounded-full overflow-hidden bg-slate-800"
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

          {/* Interactive 3D Showcase Prompt Pill */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-5 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#08122C]/70 border border-cyan-500/25 text-[#7DD3FC] text-xs font-space select-none shadow-[0_0_15px_rgba(0,140,255,0.15)]"
          >
            <Layers size={13} className="text-cyan-400" />
            <span>Hover or tap any floating card to project in-depth deliverables</span>
          </motion.div>
        </div>

        {/* ── 3D SKILL CARDS GRID (INITIAL 8 CARDS) ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 items-stretch">
          {initialSkills.map((skill, index) => (
            <FloatingSkillCard
              key={skill.id}
              skill={skill}
              index={index}
              isSelected={isDetailOpen && activeSkill?.id === skill.id}
              onHoverStart={handleHoverStart}
              onHoverEnd={handleHoverEnd}
              onSelect={handleSelect}
            />
          ))}
        </div>

        {/* ── EXPANDABLE REMAINING SKILLS (CARDS 9–12) ── */}
        <AnimatePresence>
          {isExpanded && remainingSkills.length > 0 && (
            <motion.div
              id="remaining-skills-container"
              key="remaining-skills"
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: 'auto', marginTop: '1.5rem' }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-visible w-full"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 items-stretch pt-1 pb-1">
                {remainingSkills.map((skill, index) => (
                  <FloatingSkillCard
                    key={skill.id}
                    skill={skill}
                    index={initialSkills.length + index}
                    isSelected={isDetailOpen && activeSkill?.id === skill.id}
                    onHoverStart={handleHoverStart}
                    onHoverEnd={handleHoverEnd}
                    onSelect={handleSelect}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── "VIEW MORE" / "SHOW LESS" TOGGLE BUTTON ── */}
        {remainingSkills.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-12 sm:mt-14 text-center flex justify-center"
          >
            <button
              type="button"
              onClick={handleToggle}
              aria-expanded={isExpanded}
              aria-controls="remaining-skills-container"
              className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full font-heading text-xs sm:text-sm font-semibold tracking-[0.16em] uppercase text-white border border-cyan-400/40 bg-[#08122C] hover:border-cyan-300 hover:bg-[#0B1E45] hover:shadow-[0_0_30px_rgba(0,229,255,0.35)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              <span>{isExpanded ? 'Show Less' : 'View More'}</span>
              <motion.span
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="inline-flex items-center justify-center text-cyan-400 group-hover:text-cyan-200"
              >
                <ChevronDown size={16} />
              </motion.span>
            </button>
          </motion.div>
        )}

      </div>

      {/* ══════════════════════════════════════════════════════════
          3. INTERACTIVE 3D SKILL DETAIL PROJECTION CARD
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
