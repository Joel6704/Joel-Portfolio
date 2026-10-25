import React, { useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
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

  // Smooth 3D tilt without React re-renders (utilizes CSS custom properties)
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const normX = (x - rect.width / 2) / (rect.width / 2);
    const normY = (y - rect.height / 2) / (rect.height / 2);

    card.style.setProperty('--tilt-x', `${(-normY * 8.5).toFixed(2)}deg`);
    card.style.setProperty('--tilt-y', `${(normX * 8.5).toFixed(2)}deg`);
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

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      onSelect(skill, rect);
    },
    [skill, onSelect]
  );

  // Dynamic icon hover effect
  const getIconMotion = () => {
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 35, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: 0.6,
        delay: Math.min(index * 0.07, 0.6),
        ease: [0.16, 1, 0.3, 1],
      }}
      className="h-full select-none"
      style={{ perspective: 1200 }}
    >
      <div
        ref={cardRef}
        onClick={handleClick}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`group relative h-full w-full rounded-2xl cursor-pointer transition-all duration-300 ease-out ${
          isSelected
            ? 'scale-[1.03] shadow-[0_0_35px_rgba(0,229,255,0.45),0_0_55px_rgba(168,85,247,0.35)]'
            : 'hover:scale-[1.03] shadow-[0_12px_30px_-8px_rgba(0,0,0,0.7)] hover:shadow-[0_20px_45px_-10px_rgba(0,0,0,0.85),0_0_30px_rgba(0,140,255,0.35)]'
        }`}
        style={{
          transformStyle: 'preserve-3d',
          transform:
            'rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg)) translateZ(0px)',
          transition: 'transform 0.18s ease-out, box-shadow 0.3s ease, border-color 0.3s ease',
        }}
      >
        {/* Floating Physics Layer */}
        <div
          className="relative w-full h-full rounded-2xl"
          style={{
            animation:
              index % 4 === 0
                ? 'floatSkillCard1 5.6s ease-in-out infinite'
                : index % 4 === 1
                ? 'floatSkillCard2 6.4s ease-in-out infinite 0.7s'
                : index % 4 === 2
                ? 'floatSkillCard3 5.0s ease-in-out infinite 1.4s'
                : 'floatSkillCard4 6.0s ease-in-out infinite 2.1s',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* ═════════════════════════════════════════════════════════════
              1. CONTINUOUS ROTATING MULTICOLOR GRADIENT BORDER
              ═════════════════════════════════════════════════════════════ */}
          <div
            className="absolute -inset-[1.5px] rounded-2xl overflow-hidden pointer-events-none z-0"
            aria-hidden="true"
          >
            {/* Spinning Conic Rainbow Gradient (Blue, Cyan, Violet, Pink, Purple) */}
            <div
              className={`absolute -inset-[100%] transition-opacity duration-500 ${
                isSelected ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'
              }`}
              style={{
                background:
                  'conic-gradient(from 0deg, #008CFF 0%, #00E5FF 22%, #8B5CF6 45%, #EC4899 68%, #A855F7 85%, #008CFF 100%)',
                animation: 'rotateRainbowBorder 5.5s linear infinite',
              }}
            />
          </div>

          {/* Ambient Outer Blue & Purple Glow around the edges */}
          <div
            className={`absolute -inset-1 rounded-2xl blur-md pointer-events-none transition-opacity duration-500 -z-10 ${
              isSelected
                ? 'opacity-85'
                : 'opacity-40 group-hover:opacity-80'
            }`}
            style={{
              background:
                'radial-gradient(circle, rgba(0, 229, 255, 0.35) 0%, rgba(168, 85, 247, 0.25) 50%, transparent 75%)',
            }}
            aria-hidden="true"
          />

          {/* ═════════════════════════════════════════════════════════════
              2. TRANSLUCENT GLASS CARD INTERIOR (Dark Navy)
              ═════════════════════════════════════════════════════════════ */}
          <div
            className="relative z-10 w-full h-full rounded-2xl p-6 sm:p-7 flex flex-col items-center justify-center text-center overflow-hidden"
            style={{
              background:
                'linear-gradient(145deg, rgba(8, 16, 42, 0.88) 0%, rgba(5, 10, 28, 0.82) 50%, rgba(3, 7, 20, 0.92) 100%)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Dynamic Glass Specular Light Reflection Follower */}
            <div
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
              style={{
                background:
                  'radial-gradient(circle 140px at var(--glare-x, 50%) var(--glare-y, 50%), rgba(255, 255, 255, 0.15) 0%, rgba(0, 229, 255, 0.08) 40%, transparent 80%)',
              }}
              aria-hidden="true"
            />

            {/* Subtle Diagonal Glass Sheen */}
            <div
              className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/[0.035] to-transparent"
              aria-hidden="true"
            />

            {/* Layered Depth Element 1: 3D Floating Icon Container */}
            <div
              className="relative mb-5 flex items-center justify-center"
              style={{
                transform: 'translateZ(26px)',
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Outer Glowing Halo behind Icon */}
              <div
                className="absolute inset-0 rounded-2xl blur-lg transition-all duration-300 group-hover:scale-125"
                style={{
                  background:
                    'radial-gradient(circle, rgba(0, 229, 255, 0.4) 0%, rgba(139, 92, 246, 0.25) 60%, transparent 80%)',
                  opacity: isSelected ? 0.9 : 0.45,
                }}
                aria-hidden="true"
              />

              {/* Glass Icon Badge */}
              <div
                className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center border border-cyan-400/35 bg-gradient-to-br from-[#0A1A3A]/90 via-[#060E26]/90 to-[#020617]/95 shadow-[0_8px_20px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.25)] group-hover:border-cyan-300 group-hover:shadow-[0_0_24px_rgba(0,229,255,0.45),inset_0_1px_2px_rgba(255,255,255,0.4)] transition-all duration-300"
              >
                <div
                  className={`text-cyan-400 group-hover:text-cyan-200 transition-all duration-300 flex items-center justify-center ${getIconMotion()}`}
                >
                  <skill.icon size={26} className="drop-shadow-[0_0_8px_rgba(0,229,255,0.7)]" />
                </div>
              </div>
            </div>

            {/* Layered Depth Element 2: Skill Name */}
            <div
              className="relative px-2 flex flex-col items-center"
              style={{
                transform: 'translateZ(18px)',
                transformStyle: 'preserve-3d',
              }}
            >
              <h3 className="font-heading text-base sm:text-[1.08rem] font-bold uppercase tracking-wider text-white group-hover:text-cyan-200 transition-colors duration-200 leading-snug drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                {skill.name}
              </h3>

              {/* Minimal category accent under skill name */}
              <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.2em] uppercase text-slate-400/80 group-hover:text-cyan-300/90 mt-2 transition-colors duration-200">
                {skill.category}
              </span>
            </div>

            {/* Layered Depth Element 3: Bottom Hover Cue Indicator */}
            <div
              className="mt-4 flex items-center gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                transform: 'translateZ(12px)',
                transformStyle: 'preserve-3d',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#00E5FF] group-hover:scale-125 transition-transform" />
              <span className="font-space text-[10px] tracking-wider text-cyan-300/80 group-hover:text-cyan-200 font-medium uppercase">
                View Details
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FloatingSkillCard;
