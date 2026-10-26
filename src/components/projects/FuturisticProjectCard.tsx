import React, { useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Sparkles, Layers, ArrowUpRight } from 'lucide-react';
import type { Project } from '../../types';

interface FuturisticProjectCardProps {
  project: Project;
  index: number;
  onSelectProject?: (project: Project) => void;
}

interface ThemeConfig {
  accent: string;
  accentSecondary: string;
  glow: string;
  glowBorder: string;
  borderDefault: string;
  badgeBg: string;
  badgeText: string;
  tagBg: string;
  tagBorder: string;
  tagText: string;
  btnGradient: string;
  btnHoverGlow: string;
  codePrefix: string;
}

const CARD_THEMES: ThemeConfig[] = [
  // 1. Neon Cyan & Electric Blue (Prep Academy Social Media)
  {
    accent: '#00F0FF',
    accentSecondary: '#008CFF',
    glow: 'rgba(0, 240, 255, 0.28)',
    glowBorder: 'rgba(0, 240, 255, 0.75)',
    borderDefault: 'rgba(0, 240, 255, 0.22)',
    badgeBg: 'rgba(0, 240, 255, 0.08)',
    badgeText: '#00F0FF',
    tagBg: 'rgba(0, 140, 255, 0.12)',
    tagBorder: 'rgba(0, 240, 255, 0.25)',
    tagText: '#7DD3FC',
    btnGradient: 'from-[#00F0FF]/90 via-[#008CFF] to-[#0055D4]',
    btnHoverGlow: '0 0 25px rgba(0, 240, 255, 0.5)',
    codePrefix: 'CYAN-01',
  },
  // 2. Electric Purple & Violet (CareerIQ360 Social Media)
  {
    accent: '#C084FC',
    accentSecondary: '#9333EA',
    glow: 'rgba(168, 85, 247, 0.3)',
    glowBorder: 'rgba(192, 132, 252, 0.75)',
    borderDefault: 'rgba(168, 85, 247, 0.25)',
    badgeBg: 'rgba(168, 85, 247, 0.1)',
    badgeText: '#E9D5FF',
    tagBg: 'rgba(168, 85, 247, 0.12)',
    tagBorder: 'rgba(192, 132, 252, 0.25)',
    tagText: '#E9D5FF',
    btnGradient: 'from-[#C084FC]/90 via-[#9333EA] to-[#6B21A8]',
    btnHoverGlow: '0 0 25px rgba(168, 85, 247, 0.5)',
    codePrefix: 'PURP-02',
  },
  // 3. Cyber Blue & Teal (CareerIQ360 Blogs)
  {
    accent: '#38BDF8',
    accentSecondary: '#0284C7',
    glow: 'rgba(56, 189, 248, 0.28)',
    glowBorder: 'rgba(56, 189, 248, 0.75)',
    borderDefault: 'rgba(56, 189, 248, 0.22)',
    badgeBg: 'rgba(56, 189, 248, 0.08)',
    badgeText: '#38BDF8',
    tagBg: 'rgba(2, 132, 199, 0.12)',
    tagBorder: 'rgba(56, 189, 248, 0.25)',
    tagText: '#BAE6FD',
    btnGradient: 'from-[#38BDF8]/90 via-[#0284C7] to-[#0369A1]',
    btnHoverGlow: '0 0 25px rgba(56, 189, 248, 0.5)',
    codePrefix: 'BLUE-03',
  },
  // 4. Futuristic Magenta & Indigo (Prep Academy Blogs)
  {
    accent: '#A78BFA',
    accentSecondary: '#6366F1',
    glow: 'rgba(129, 140, 248, 0.28)',
    glowBorder: 'rgba(167, 139, 250, 0.75)',
    borderDefault: 'rgba(129, 140, 248, 0.25)',
    badgeBg: 'rgba(99, 102, 241, 0.1)',
    badgeText: '#DDD6FE',
    tagBg: 'rgba(99, 102, 241, 0.12)',
    tagBorder: 'rgba(167, 139, 250, 0.25)',
    tagText: '#DDD6FE',
    btnGradient: 'from-[#A78BFA]/90 via-[#6366F1] to-[#4338CA]',
    btnHoverGlow: '0 0 25px rgba(129, 140, 248, 0.5)',
    codePrefix: 'INDG-04',
  },
];

export const FuturisticProjectCard: React.FC<FuturisticProjectCardProps> = ({
  project,
  index,
  onSelectProject,
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const theme = CARD_THEMES[index % CARD_THEMES.length];

  const destinationUrl = project.externalLink?.url || '#';
  const ctaLabel = project.externalLink?.label || 'VIEW PROJECT';

  // Highlight tags from mockupDetails or strategy (up to 3 items)
  const cardTags =
    project.mockupDetails?.highlights?.slice(0, 3) ||
    project.strategy?.slice(0, 3) ||
    [];

  // 3D Tilt & Cursor Glare using CSS custom properties for 60fps responsiveness
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const normX = (x - rect.width / 2) / (rect.width / 2);
    const normY = (y - rect.height / 2) / (rect.height / 2);

    card.style.setProperty('--tilt-x', `${(-normY * 6).toFixed(2)}deg`);
    card.style.setProperty('--tilt-y', `${(normX * 6).toFixed(2)}deg`);
    card.style.setProperty('--glare-x', `${x.toFixed(1)}px`);
    card.style.setProperty('--glare-y', `${y.toFixed(1)}px`);
    card.style.setProperty('--glare-opacity', '1');
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;

    card.style.setProperty('--tilt-x', '0deg');
    card.style.setProperty('--tilt-y', '0deg');
    card.style.setProperty('--glare-opacity', '0');
  }, []);

  const handleCardClick = (e: React.MouseEvent) => {
    // If the click is on an action button or external link, allow normal behavior
    const target = e.target as HTMLElement;
    if (target.closest('a') || target.closest('button')) {
      return;
    }
    if (onSelectProject) {
      onSelectProject(project);
    }
  };

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 35, scale: 0.96 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }}
      className="h-full flex flex-col"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleCardClick}
        style={{
          transform: 'perspective(1000px) rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg))',
          borderColor: theme.borderDefault,
        }}
        className="group relative flex flex-col h-full rounded-2xl overflow-hidden bg-[#050C1F]/80 backdrop-blur-xl border transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-2 cursor-pointer shadow-[0_12px_32px_-8px_rgba(0,0,0,0.85)] hover:shadow-[0_22px_45px_-10px_rgba(0,0,0,0.95)]"
      >
        {/* Dynamic Glow Halo on Hover */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            boxShadow: `inset 0 0 20px ${theme.glow}, 0 0 35px ${theme.glow}`,
            borderColor: theme.glowBorder,
          }}
          aria-hidden="true"
        />

        {/* Cursor-Following Glare Light */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300"
          style={{
            opacity: 'var(--glare-opacity, 0)',
            background: `radial-gradient(circle 240px at var(--glare-x, 50%) var(--glare-y, 50%), ${theme.glow}, transparent 70%)`,
          }}
          aria-hidden="true"
        />

        {/* Sci-Fi Corner Tech HUD Accents */}
        <span
          className="absolute top-0 left-0 w-3.5 h-3.5 border-t-2 border-l-2 rounded-tl-sm pointer-events-none z-20 transition-colors duration-300"
          style={{ borderColor: theme.accent }}
          aria-hidden="true"
        />
        <span
          className="absolute top-0 right-0 w-3.5 h-3.5 border-t-2 border-r-2 rounded-tr-sm pointer-events-none z-20 transition-colors duration-300"
          style={{ borderColor: theme.accent }}
          aria-hidden="true"
        />
        <span
          className="absolute bottom-0 left-0 w-3.5 h-3.5 border-b-2 border-l-2 rounded-bl-sm pointer-events-none z-20 transition-colors duration-300"
          style={{ borderColor: theme.accent }}
          aria-hidden="true"
        />
        <span
          className="absolute bottom-0 right-0 w-3.5 h-3.5 border-b-2 border-r-2 rounded-br-sm pointer-events-none z-20 transition-colors duration-300"
          style={{ borderColor: theme.accent }}
          aria-hidden="true"
        />

        {/* ── CARD TOP: Project Preview Image Container ── */}
        <div className="relative w-full h-48 sm:h-52 overflow-hidden bg-[#020512]">
          <img
            src={project.imageUrl || '/blogs-project.png'}
            alt={project.title}
            loading="lazy"
            className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
          />

          {/* Sci-Fi Vignette & Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050C1F] via-[#050C1F]/40 to-transparent pointer-events-none" />

          {/* Subtle Cyber Scanline Overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay group-hover:opacity-35 transition-opacity duration-500"
            style={{
              backgroundImage:
                'repeating-linear-gradient(0deg, rgba(0,0,0,0.35) 0px, rgba(0,0,0,0.35) 1px, transparent 1px, transparent 2px)',
              backgroundSize: '100% 2px',
            }}
            aria-hidden="true"
          />

          {/* Floating Category Pill with Neon LED Indicator */}
          <div className="absolute top-3 left-3 z-10">
            <span
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-heading text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase backdrop-blur-md border shadow-md"
              style={{
                backgroundColor: 'rgba(3, 8, 24, 0.85)',
                borderColor: theme.borderDefault,
                color: theme.accent,
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-ping"
                style={{ backgroundColor: theme.accent }}
              />
              <span
                className="w-1.5 h-1.5 rounded-full -ml-3"
                style={{
                  backgroundColor: theme.accent,
                  boxShadow: `0 0 8px ${theme.accent}`,
                }}
              />
              {project.category.split('•')[0].trim()}
            </span>
          </div>

          {/* Floating External Link Icon */}
          <div className="absolute top-3 right-3 z-10">
            <a
              href={destinationUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${project.title} live in a new tab`}
              onClick={(e) => e.stopPropagation()}
              className="w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md border border-white/20 text-slate-300 hover:text-white transition-all duration-300 shadow-md focus:outline-none focus-visible:ring-2"
              style={{
                backgroundColor: 'rgba(3, 8, 24, 0.85)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = theme.accent;
                e.currentTarget.style.color = '#020512';
                e.currentTarget.style.borderColor = theme.accent;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(3, 8, 24, 0.85)';
                e.currentTarget.style.color = '#cbd5e1';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
              }}
            >
              <ExternalLink size={14} />
            </a>
          </div>

          {/* Sci-Fi HUD Coordinates Stamp */}
          <div className="absolute bottom-2.5 left-3 z-10 flex items-center gap-2">
            <span
              className="font-mono text-[9px] uppercase tracking-widest px-1.5 py-0.5 rounded backdrop-blur-sm"
              style={{
                color: theme.accent,
                backgroundColor: 'rgba(3, 8, 24, 0.75)',
                border: `1px solid ${theme.borderDefault}`,
              }}
            >
              SYS // {theme.codePrefix}
            </span>
            {project.badge && (
              <span className="font-mono text-[9px] text-slate-400 bg-black/60 px-1.5 py-0.5 rounded backdrop-blur-sm border border-white/10">
                {project.badge}
              </span>
            )}
          </div>
        </div>

        {/* ── CARD BODY: Project Information ── */}
        <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between relative z-10">
          <div>
            {/* Project Index Number with Glow Accent */}
            <div className="flex items-center justify-between text-xs font-heading tracking-widest uppercase mb-2">
              <span
                className="font-bold flex items-center gap-1.5 text-xs"
                style={{ color: theme.accent }}
              >
                <Sparkles size={11} />
                PROJECT {(index + 1).toString().padStart(2, '0')}
              </span>
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                LIVE VERIFIED
              </span>
            </div>

            {/* Project Title */}
            <h3
              className="font-display text-base sm:text-lg font-bold text-white transition-colors duration-300 leading-snug line-clamp-2 mb-2 group-hover:text-cyan-200"
            >
              {project.title}
            </h3>

            {/* Project Description */}
            <p className="font-body text-xs sm:text-[13px] text-slate-300 leading-relaxed line-clamp-3 mb-4">
              {project.tagline || project.overview}
            </p>

            {/* Tech / Highlights Tags */}
            {cardTags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-5">
                {cardTags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-[10px] sm:text-[11px] font-medium px-2 py-0.5 rounded-sm transition-all duration-300"
                    style={{
                      backgroundColor: theme.tagBg,
                      borderColor: theme.tagBorder,
                      color: theme.tagText,
                      borderWidth: '1px',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* ── CARD FOOTER: Futuristic Action Buttons ── */}
          <div className="pt-2 border-t border-white/[0.06] flex items-center gap-2">
            {/* Primary Action Button: Opens Live Project URL */}
            <a
              href={destinationUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${project.title} (${ctaLabel})`}
              className={`flex-1 py-2.5 px-3 rounded-lg font-heading text-[11px] sm:text-xs font-bold tracking-wider uppercase text-white flex items-center justify-center gap-1.5 shadow-md bg-gradient-to-r ${theme.btnGradient} transition-all duration-300 hover:brightness-110 active:scale-98`}
              style={{
                boxShadow: `0 4px 18px -4px ${theme.glow}`,
              }}
            >
              <span>{ctaLabel}</span>
              <ArrowUpRight
                size={13}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
              />
            </a>

            {/* Secondary Action: View Case Study Modal */}
            {onSelectProject && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectProject(project);
                }}
                aria-label={`Open case study details for ${project.title}`}
                className="py-2.5 px-2.5 rounded-lg border border-white/15 bg-white/[0.04] hover:bg-white/[0.1] text-slate-300 hover:text-white transition-all duration-300 flex items-center justify-center shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                title="View Full Case Study"
              >
                <Layers size={14} />
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FuturisticProjectCard;
