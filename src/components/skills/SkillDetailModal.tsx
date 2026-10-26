import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, CheckCircle2, Zap } from 'lucide-react';
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
  const modalCardRef = useRef<HTMLDivElement>(null);

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

  // Subtle 3D perspective tilt on detail card mouse movement
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = modalCardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const normX = (x - rect.width / 2) / (rect.width / 2);
    const normY = (y - rect.height / 2) / (rect.height / 2);

    card.style.setProperty('--modal-tilt-x', `${(-normY * 4).toFixed(2)}deg`);
    card.style.setProperty('--modal-tilt-y', `${(normX * 4).toFixed(2)}deg`);
  }, []);

  const handleCardMouseLeave = useCallback(() => {
    const card = modalCardRef.current;
    if (card) {
      card.style.setProperty('--modal-tilt-x', '0deg');
      card.style.setProperty('--modal-tilt-y', '0deg');
    }
    onMouseLeave?.();
  }, [onMouseLeave]);

  if (!isOpen || !skill) return null;

  const isDesktop = windowWidth >= 1024;
  const detailWidth = 410;
  const detailHeight = 460;

  // Calculate desktop projected position relative to hovered card
  let desktopStyle: React.CSSProperties = {};
  if (isDesktop && cardRect) {
    let x = cardRect.right + 18;
    // If overflowing right viewport edge, project to left of card
    if (x + detailWidth > windowWidth - 20) {
      x = Math.max(20, cardRect.left - detailWidth - 18);
    }

    // Center vertically with card, clamped to viewport bounds
    let y = cardRect.top + cardRect.height / 2 - detailHeight / 2;
    y = Math.max(80, Math.min(y, windowHeight - detailHeight - 20));

    desktopStyle = {
      position: 'fixed',
      left: `${x}px`,
      top: `${y}px`,
      width: `${detailWidth}px`,
      zIndex: 99999,
    };
  }

  const Icon = skill.icon;

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
        onMouseLeave={handleCardMouseLeave}
        onMouseMove={handleMouseMove}
      >
        <motion.div
          ref={modalCardRef}
          initial={{
            opacity: 0,
            scale: isDesktop ? 0.9 : 0.94,
            y: isDesktop ? 0 : 16,
            filter: 'blur(6px)',
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
            filter: 'blur(0px)',
          }}
          exit={{
            opacity: 0,
            scale: 0.92,
            filter: 'blur(6px)',
            transition: { duration: 0.2 },
          }}
          transition={{
            duration: 0.3,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="relative w-full max-w-[420px] rounded-3xl overflow-hidden pointer-events-auto shadow-[0_25px_60px_-10px_rgba(0,0,0,0.95),0_0_40px_rgba(0,140,255,0.35),0_0_70px_rgba(168,85,247,0.25)]"
          style={{
            perspective: 1200,
            transformStyle: 'preserve-3d',
            transform:
              'rotateX(var(--modal-tilt-x, 0deg)) rotateY(var(--modal-tilt-y, 0deg))',
            transition: 'transform 0.15s ease-out',
          }}
        >
          {/* ═════════════════════════════════════════════════════════════
              CONTINUOUS MULTICOLOR ROTATING GRADIENT BORDER
              ═════════════════════════════════════════════════════════════ */}
          <div className="absolute -inset-[1.5px] rounded-3xl overflow-hidden pointer-events-none z-0" aria-hidden="true">
            <div
              className="absolute -inset-[100%] opacity-90"
              style={{
                background: skill.gradientColors,
                animation: 'rotateRainbowBorder 5.5s linear infinite',
              }}
            />
            {/* Luminous glow sweep */}
            <div
              className="absolute inset-0"
              style={{
                animation: 'borderLightSweep 4s ease-in-out infinite',
              }}
            />
          </div>

          {/* Exterior soft ambient halo */}
          <div
            className="absolute -inset-2 rounded-3xl blur-xl pointer-events-none -z-10 opacity-70"
            style={{
              background: `radial-gradient(circle, ${skill.glowColor} 0%, rgba(168, 85, 247, 0.3) 50%, transparent 75%)`,
            }}
            aria-hidden="true"
          />

          {/* ═════════════════════════════════════════════════════════════
              GLASS CARD INTERIOR (Reference-inspired dark indigo/navy)
              ═════════════════════════════════════════════════════════════ */}
          <div
            className="relative z-10 w-full rounded-3xl p-5 sm:p-6 text-left overflow-hidden flex flex-col max-h-[85vh] overflow-y-auto"
            style={{
              background:
                'linear-gradient(145deg, rgba(8, 16, 42, 0.94) 0%, rgba(5, 11, 30, 0.92) 50%, rgba(3, 7, 22, 0.96) 100%)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              boxShadow:
                'inset 0 1px 1px rgba(255, 255, 255, 0.25), inset 0 -1px 1px rgba(0, 0, 0, 0.6)',
            }}
          >
            {/* Diagonal specular glare */}
            <div
              className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent rounded-3xl"
              aria-hidden="true"
            />

            {/* ── HEADER ROW: ICON + TITLE + CLOSE BUTTON ── */}
            <div className="relative flex items-start justify-between gap-3 pb-4 border-b border-white/[0.08]">
              <div className="flex items-center gap-3">
                {/* Glowing Glass Icon Badge */}
                <div
                  className="w-11 h-11 rounded-2xl flex items-center justify-center border border-cyan-400/40 bg-gradient-to-br from-[#0F224A] via-[#0A1636] to-[#040A1F] shadow-[0_0_18px_rgba(0,229,255,0.35),inset_0_1px_1px_rgba(255,255,255,0.3)] shrink-0"
                >
                  <Icon size={22} className="text-cyan-300 drop-shadow-[0_0_6px_rgba(0,229,255,0.8)]" />
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-[9px] uppercase tracking-[0.18em] px-2 py-0.5 rounded-full border border-cyan-400/30 bg-cyan-500/10 text-cyan-300 font-semibold">
                      {skill.categoryLabel}
                    </span>
                    <span className="font-mono text-[9px] text-slate-400">
                      {skill.glyph}
                    </span>
                  </div>
                  <h3 className="font-heading text-lg sm:text-xl font-bold uppercase tracking-wider text-white leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                    {skill.name}
                  </h3>
                </div>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={onClose}
                aria-label="Close skill details"
                className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-200 cursor-pointer shrink-0"
              >
                <X size={15} />
              </button>
            </div>

            {/* ── SKILL SUMMARY DESCRIPTION ── */}
            <div className="mt-4">
              <p className="font-body text-[#CBD5E1] text-xs sm:text-[13px] leading-relaxed">
                {skill.meaning}
              </p>
            </div>

            {/* ── CORE DELIVERABLES / ACTIVITIES ── */}
            <div className="mt-4 pt-3 border-t border-white/[0.06]">
              <div className="flex items-center gap-1.5 mb-2.5">
                <Sparkles size={12} className="text-cyan-400" />
                <span className="font-heading text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.16em] text-cyan-300">
                  Practical Execution & Deliverables
                </span>
              </div>

              <ul className="space-y-1.5">
                {skill.practicalActivities.map((activity, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-[11.5px] sm:text-xs text-slate-300/95 leading-normal">
                    <CheckCircle2
                      size={13}
                      className="text-cyan-400 shrink-0 mt-0.5 drop-shadow-[0_0_4px_rgba(0,229,255,0.7)]"
                    />
                    <span>{activity}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── REAL-WORLD IMPACT CALLOUT ── */}
            <div className="mt-4 p-3 rounded-2xl border border-cyan-400/25 bg-gradient-to-r from-cyan-500/10 via-blue-500/5 to-purple-500/10">
              <div className="flex items-center gap-1.5 mb-1 text-cyan-300 font-heading text-[9.5px] font-bold uppercase tracking-wider">
                <Zap size={11} className="text-cyan-400" />
                <span>Measurable Impact</span>
              </div>
              <p className="font-body text-[11px] sm:text-[11.5px] text-slate-200 leading-snug">
                {skill.realWorldImpact}
              </p>
            </div>

            {/* ── TAGS ROW ── */}
            <div className="mt-4 pt-3 border-t border-white/[0.06] flex flex-wrap gap-1.5">
              {skill.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-md font-mono text-[9px] tracking-wide text-cyan-300/90 bg-cyan-950/40 border border-cyan-400/20"
                >
                  #{tag}
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
