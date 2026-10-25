import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import type { DetailedSkill } from './skillsData';

interface SkillDetailModalProps {
  skill: DetailedSkill | null;
  cardRect: DOMRect | null;
  isOpen: boolean;
  onClose: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const SkillDetailModal: React.FC<SkillDetailModalProps> = ({
  skill,
  cardRect,
  isOpen,
  onClose,
  onMouseEnter,
  onMouseLeave,
}) => {
  const [windowWidth, setWindowWidth] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );
  const [windowHeight, setWindowHeight] = useState(() =>
    typeof window !== 'undefined' ? window.innerHeight : 800
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Keyboard accessibility: Escape closes the detail card
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !skill) return null;

  const isDesktop = windowWidth >= 1024;
  const detailWidth = 430;
  const detailHeight = 490;

  // Calculate desktop projected position relative to hovered card
  let desktopStyle: React.CSSProperties = {};
  if (isDesktop && cardRect) {
    let x = cardRect.right + 20;
    // If overflowing right viewport edge, project to left of card
    if (x + detailWidth > windowWidth - 16) {
      x = Math.max(16, cardRect.left - detailWidth - 20);
    }

    // Center vertically with card, clamped to viewport bounds
    let y = cardRect.top + cardRect.height / 2 - detailHeight / 2;
    y = Math.max(84, Math.min(y, windowHeight - detailHeight - 20));

    desktopStyle = {
      position: 'fixed',
      left: `${x}px`,
      top: `${y}px`,
      width: `${detailWidth}px`,
      zIndex: 99999,
    };
  }

  return (
    <AnimatePresence mode="wait">
      {/* ── MOBILE / TABLET BACKDROP ── */}
      {!isDesktop && (
        <motion.div
          key="mobile-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[99998] bg-[#020617]/80 backdrop-blur-md"
          aria-hidden="true"
        />
      )}

      {/* ── DETAIL CARD WRAPPER ── */}
      <div
        key={`detail-${skill.id}`}
        style={isDesktop ? desktopStyle : undefined}
        className={
          isDesktop
            ? 'pointer-events-auto'
            : 'fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 pointer-events-none'
        }
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <motion.div
          initial={{
            opacity: 0,
            scale: isDesktop ? 0.9 : 0.95,
            y: isDesktop ? 0 : 20,
            rotateY: isDesktop ? 8 : 0,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
            rotateY: 0,
          }}
          exit={{
            opacity: 0,
            scale: 0.92,
            filter: 'blur(8px)',
            transition: { duration: 0.22 },
          }}
          transition={{
            duration: 0.32,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="relative w-full max-w-[450px] rounded-3xl overflow-hidden pointer-events-auto shadow-[0_25px_65px_-12px_rgba(0,0,0,0.95),0_0_45px_rgba(0,140,255,0.35),0_0_75px_rgba(168,85,247,0.25)]"
          style={{ perspective: 1000 }}
        >
          {/* ═════════════════════════════════════════════════════════════
              1. CONTINUOUS ROTATING MULTICOLOR GRADIENT BORDER
              ═════════════════════════════════════════════════════════════ */}
          <div
            className="absolute -inset-[2px] rounded-3xl overflow-hidden pointer-events-none z-0"
            aria-hidden="true"
          >
            <div
              className="absolute -inset-[100%]"
              style={{
                background:
                  'conic-gradient(from 0deg, #008CFF 0%, #00E5FF 22%, #8B5CF6 45%, #EC4899 68%, #A855F7 85%, #008CFF 100%)',
                animation: 'rotateRainbowBorder 5s linear infinite',
              }}
            />
          </div>

          {/* Ambient Outer Halo */}
          <div
            className="absolute -inset-1.5 rounded-3xl blur-xl pointer-events-none -z-10 opacity-75"
            style={{
              background:
                'radial-gradient(circle, rgba(0, 229, 255, 0.45) 0%, rgba(168, 85, 247, 0.35) 50%, transparent 75%)',
            }}
            aria-hidden="true"
          />

          {/* ═════════════════════════════════════════════════════════════
              2. TRANSLUCENT GLASS INNER BODY (Dark Midnight Navy)
              ═════════════════════════════════════════════════════════════ */}
          <div
            className="relative z-10 w-full rounded-3xl p-6 sm:p-7 flex flex-col justify-between overflow-hidden"
            style={{
              background:
                'linear-gradient(155deg, rgba(8, 16, 42, 0.94) 0%, rgba(4, 9, 26, 0.92) 55%, rgba(2, 6, 20, 0.98) 100%)',
              backdropFilter: 'blur(28px)',
              WebkitBackdropFilter: 'blur(28px)',
            }}
          >
            {/* Soft Ambient Inner Radial Light */}
            <div
              className="absolute top-0 right-0 w-72 h-72 rounded-full pointer-events-none opacity-20 blur-3xl"
              style={{
                background: 'radial-gradient(circle, #00E5FF 0%, #8B5CF6 60%, transparent 100%)',
              }}
              aria-hidden="true"
            />

            {/* Specular Diagonal Reflection */}
            <div
              className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent"
              aria-hidden="true"
            />

            <div>
              {/* ── HEADER ROW ── */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3.5">
                  {/* Glowing 3D Icon Badge */}
                  <div className="relative w-12 h-12 rounded-2xl flex items-center justify-center border border-cyan-400/40 bg-gradient-to-br from-[#0B1E45] to-[#040A1E] shadow-[0_0_20px_rgba(0,229,255,0.4)] shrink-0">
                    <div className="text-cyan-300">
                      <skill.icon size={24} className="drop-shadow-[0_0_8px_#00E5FF]" />
                    </div>
                  </div>

                  <div>
                    {/* Category Label Pill */}
                    <span className="inline-flex items-center gap-1.5 font-mono text-[9px] sm:text-[10px] tracking-widest uppercase px-2.5 py-0.5 rounded-full border border-cyan-400/30 bg-cyan-400/10 text-cyan-300 font-semibold shadow-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#00E5FF]" />
                      {skill.categoryLabel}
                    </span>

                    {/* Skill Title */}
                    <h3 className="font-heading text-lg sm:text-xl font-bold uppercase tracking-wide text-white mt-1 drop-shadow-md">
                      {skill.name}
                    </h3>
                  </div>
                </div>

                {/* Close Button ('✕') */}
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close skill details"
                  className="w-8 h-8 rounded-full border border-slate-700/80 bg-slate-900/80 hover:bg-cyan-500/20 hover:border-cyan-400 flex items-center justify-center text-slate-400 hover:text-white transition-all duration-200 cursor-pointer shadow-md shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                >
                  <X size={16} />
                </button>
              </div>

              {/* ── WHAT IT MEANS / DEFINITION ── */}
              <div className="mb-4 pt-1">
                <p className="font-body text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {skill.meaning}
                </p>
              </div>

              {/* ── PRACTICAL ACTIVITIES & EXAMPLES ── */}
              <div className="mb-4">
                <div className="flex items-center gap-1.5 mb-2.5">
                  <Sparkles size={12} className="text-cyan-400" />
                  <span className="font-mono text-[10px] uppercase tracking-wider text-cyan-300 font-bold">
                    Practical Activities & Deliverables
                  </span>
                </div>

                <ul className="space-y-1.5">
                  {skill.practicalActivities.map((activity, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-xs text-slate-300/90 leading-snug"
                    >
                      <CheckCircle2
                        size={13}
                        className="text-cyan-400 shrink-0 mt-0.5 filter drop-shadow-[0_0_4px_#00E5FF]"
                      />
                      <span>{activity}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* ── REAL-WORLD BUSINESS IMPACT ── */}
              <div className="p-3 sm:p-3.5 rounded-xl border border-cyan-400/20 bg-gradient-to-r from-cyan-950/30 via-indigo-950/20 to-purple-950/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)] mb-4">
                <div className="flex items-center gap-1.5 mb-1 text-[10px] font-mono tracking-wider uppercase text-cyan-300 font-bold">
                  <ArrowRight size={11} className="text-cyan-400" />
                  <span>Business Impact</span>
                </div>
                <p className="font-body text-[11px] sm:text-xs text-slate-300 leading-relaxed">
                  {skill.realWorldImpact}
                </p>
              </div>
            </div>

            {/* ── FOOTER TAGS ── */}
            <div className="pt-2 border-t border-slate-800/80 flex flex-wrap gap-1.5 items-center">
              {skill.tags.map((tag, tIdx) => (
                <span
                  key={tIdx}
                  className="font-mono text-[9px] font-medium text-slate-300 bg-[#0B1530] border border-cyan-400/20 px-2 py-0.5 rounded-md"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default SkillDetailModal;
