import React, { useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { DetailedSkill } from './skillsData';

interface FloatingSkillCardProps {
  skill: DetailedSkill;
  index: number;
  isSelected?: boolean;
  onHoverStart: (skill: DetailedSkill, rect: DOMRect) => void;
  onHoverEnd: () => void;
  onSelect: (skill: DetailedSkill, rect: DOMRect) => void;
}

export const FloatingSkillCard: React.FC<FloatingSkillCardProps> = ({
  skill,
  index,
  isSelected = false,
  onHoverStart,
  onHoverEnd,
  onSelect,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Subtle 3D tilt without React re-renders (utilizes CSS custom properties)
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const normX = (x - rect.width / 2) / (rect.width / 2);
    const normY = (y - rect.height / 2) / (rect.height / 2);

    card.style.setProperty('--tilt-x', `${(-normY * 5).toFixed(2)}deg`);
    card.style.setProperty('--tilt-y', `${(normX * 5).toFixed(2)}deg`);
    card.style.setProperty('--glare-x', `${(normX * 45 + 50).toFixed(1)}%`);
    card.style.setProperty('--glare-y', `${(normY * 45 + 50).toFixed(1)}%`);
  }, []);

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      onHoverStart(skill, rect);
    },
    [skill, onHoverStart]
  );

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (card) {
      card.style.setProperty('--tilt-x', '0deg');
      card.style.setProperty('--tilt-y', '0deg');
    }
    onHoverEnd();
  }, [onHoverEnd]);

  // Clicking the card or View More button opens the skill description modal
  const handleCardClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      onSelect(skill, rect);
    },
    [skill, onSelect]
  );

  const handleViewMoreClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        onSelect(skill, rect);
      }
    },
    [skill, onSelect]
  );

  // Dynamic icon micro-motion on hover
  const getIconMotion = () => {
    switch (skill.iconAnimType) {
      case 'spin':
        return 'group-hover:rotate-45 group-hover:scale-110';
      case 'tilt':
        return 'group-hover:-rotate-12 group-hover:scale-115';
      case 'pulse':
        return 'group-hover:scale-115';
      case 'float':
        return 'group-hover:-translate-y-0.5 group-hover:scale-110';
      case 'bounce':
      default:
        return 'group-hover:-translate-y-0.5 group-hover:scale-110';
    }
  };

  const Icon = skill.icon;

  // Multiple vibrant colors for the glowing border tracing line:
  // Starts with transparent gap (230deg), then travels as a luminous electric line
  // ending with an intense white/cyan glowing spark head
  const tracerGradient = `conic-gradient(from 0deg, transparent 0deg, transparent 230deg, ${skill.accentColor} 265deg, #00E5FF 310deg, #A855F7 338deg, #EC4899 352deg, #FFFFFF 360deg)`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.5,
        delay: Math.min(index * 0.04, 0.4),
        ease: [0.16, 1, 0.3, 1],
      }}
      className="select-none flex justify-center items-center w-full"
      style={{ perspective: 1200 }}
    >
      <div
        ref={cardRef}
        onClick={handleCardClick}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        tabIndex={0}
        role="button"
        aria-label={`Skill details for ${skill.name}`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            if (cardRef.current) {
              onSelect(skill, cardRef.current.getBoundingClientRect());
            }
          }
        }}
        /* UNIFORM CARD DIMENSIONS FOR ALL 12 SKILLS */
        className={`group relative w-full max-w-[215px] sm:max-w-[225px] lg:max-w-[235px] h-[126px] sm:h-[132px] cursor-pointer rounded-2xl transition-all duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
          isSelected
            ? 'scale-[1.04] z-30 shadow-[0_0_30px_rgba(0,229,255,0.45),0_0_50px_rgba(168,85,247,0.35)]'
            : 'hover:scale-[1.03] hover:z-20 shadow-[0_10px_25px_-6px_rgba(0,0,0,0.7)] hover:shadow-[0_16px_35px_-8px_rgba(0,0,0,0.85),0_0_24px_rgba(0,140,255,0.35)]'
        }`}
        style={{
          transformStyle: 'preserve-3d',
          transform:
            'rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg)) translateZ(0px)',
          transition: 'transform 0.18s ease-out, box-shadow 0.3s ease',
        }}
      >
        {/* ═════════════════════════════════════════════════════════════
            CONTINUOUS INDEPENDENT FLOATING PHYSICS LAYER
            ═════════════════════════════════════════════════════════════ */}
        <div
          className="relative w-full h-full rounded-2xl"
          style={{
            animation: skill.floatAnimation,
            transformStyle: 'preserve-3d',
          }}
        >
          {/* ═════════════════════════════════════════════════════════════
              ANIMATED BORDER TRACING: A glowing line travels around the card's border
              ═════════════════════════════════════════════════════════════ */}
          <div
            className="absolute -inset-[1.5px] rounded-2xl overflow-hidden pointer-events-none z-0"
            aria-hidden="true"
          >
            {/* Base subtle guide border */}
            <div className="absolute inset-0 rounded-2xl border border-white/[0.08]" />

            {/* Glowing tracer line segment traveling continuously around the border */}
            <div
              className={`absolute -inset-[160%] pointer-events-none ${
                skill.borderReverse ? 'animate-border-trace-reverse' : 'animate-border-trace'
              }`}
              style={{
                background: tracerGradient,
                animationDuration: skill.borderDuration || '4.5s',
              }}
            />
          </div>

          {/* Luminous Outer Glow Following the Tracer */}
          <div
            className={`absolute -inset-1 rounded-2xl blur-md pointer-events-none -z-10 transition-opacity duration-300 ${
              skill.borderReverse ? 'animate-border-trace-reverse' : 'animate-border-trace'
            } ${isSelected ? 'opacity-90' : 'opacity-40 group-hover:opacity-75'}`}
            style={{
              background: tracerGradient,
              animationDuration: skill.borderDuration || '4.5s',
            }}
            aria-hidden="true"
          />

          {/* ═════════════════════════════════════════════════════════════
              MULTIPLE COLOR SKILL BOX (Dark translucent glass with vibrant accents)
              ═════════════════════════════════════════════════════════════ */}
          <div
            className="relative z-10 w-full h-full rounded-[calc(1rem-1.5px)] p-2.5 sm:p-3 flex flex-col items-center justify-between text-center overflow-hidden"
            style={{
              background: `
                radial-gradient(circle at 18% 18%, ${skill.glowColor.replace('0.55', '0.18').replace('0.5', '0.18')} 0%, transparent 60%),
                radial-gradient(circle at 82% 82%, rgba(168, 85, 247, 0.14) 0%, transparent 60%),
                radial-gradient(circle at 50% 100%, rgba(0, 229, 255, 0.08) 0%, transparent 60%),
                linear-gradient(135deg, rgba(8, 16, 40, 0.88) 0%, rgba(5, 10, 28, 0.82) 50%, rgba(3, 7, 22, 0.92) 100%)
              `,
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              boxShadow:
                'inset 0 1px 1px rgba(255, 255, 255, 0.22), inset 0 -1px 1px rgba(0, 0, 0, 0.5)',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Dynamic Glass Specular Light Reflection Follower */}
            <div
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
              style={{
                background:
                  'radial-gradient(circle 100px at var(--glare-x, 50%) var(--glare-y, 50%), rgba(255, 255, 255, 0.16) 0%, rgba(0, 229, 255, 0.06) 45%, transparent 80%)',
              }}
              aria-hidden="true"
            />

            {/* Subtle Diagonal Glass Sheen */}
            <div
              className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent"
              aria-hidden="true"
            />

            {/* ── 1. SKILL ICON WITH MULTICOLOR GLOW ── */}
            <div
              className="relative flex items-center justify-center shrink-0"
              style={{
                transform: 'translateZ(18px)',
                transformStyle: 'preserve-3d',
              }}
            >
              <div
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center border border-cyan-400/35 bg-gradient-to-br from-[#0E2046]/90 via-[#0A1434]/85 to-[#040A1E]/95 shadow-[0_4px_12px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.25)] group-hover:border-cyan-300 transition-all duration-300"
                style={{
                  boxShadow: `0 0 14px -2px ${skill.glowColor}`,
                }}
              >
                <div
                  className={`text-cyan-400 group-hover:text-cyan-200 transition-all duration-300 flex items-center justify-center ${getIconMotion()}`}
                >
                  <Icon size={16} className="drop-shadow-[0_0_6px_rgba(0,229,255,0.7)]" />
                </div>
              </div>
            </div>

            {/* ── 2. SKILL NAME (CLEAN, HIGH-CONTRAST WHITE) ── */}
            <div
              className="relative w-full px-1 my-auto"
              style={{
                transform: 'translateZ(22px)',
                transformStyle: 'preserve-3d',
              }}
            >
              <h3 className="font-heading text-[11px] sm:text-xs lg:text-[12.5px] font-bold uppercase tracking-wider text-white group-hover:text-cyan-200 transition-colors duration-200 leading-snug drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] line-clamp-2">
                {skill.name}
              </h3>
            </div>

            {/* ── 3. "VIEW MORE" BUTTON: CLICK TO VIEW SKILL DESCRIPTION ── */}
            <div
              className="relative w-full flex justify-center pt-0.5"
              style={{
                transform: 'translateZ(16px)',
                transformStyle: 'preserve-3d',
              }}
            >
              <button
                type="button"
                onClick={handleViewMoreClick}
                className="group/btn relative inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9.5px] sm:text-[10px] font-heading font-semibold tracking-wider uppercase text-cyan-300 border border-cyan-400/35 bg-gradient-to-r from-cyan-500/15 via-blue-500/10 to-purple-500/15 hover:border-cyan-300 hover:text-white hover:shadow-[0_0_14px_rgba(0,229,255,0.45)] hover:scale-[1.05] active:scale-[0.98] transition-all duration-200 cursor-pointer overflow-hidden"
              >
                {/* Subtle animated shimmer streak across View More button */}
                <span className="relative z-10 flex items-center gap-1">
                  <span>View More</span>
                  <ArrowRight size={10} className="text-cyan-400 group-hover/btn:translate-x-0.5 transition-transform" />
                </span>
                
                {/* Button inner glow overlay on hover */}
                <span className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-purple-500/20 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-200" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FloatingSkillCard;
