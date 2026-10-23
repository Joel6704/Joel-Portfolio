import React from 'react';
import { Lock, ExternalLink, Globe } from 'lucide-react';

interface BrowserMockupProps {
  imageUrl?: string;
  className?: string;
  interactive?: boolean;
  url?: string;
  accentColor?: string;
  glowGradient?: string;
  alt?: string;
  hoverText?: string;
}

export const BrowserMockup: React.FC<BrowserMockupProps> = ({
  imageUrl = '/blogs-project.png',
  className = '',
  interactive = true,
  url = 'careeriq360.ai/blog',
  accentColor = '#7965FF',
  glowGradient,
  alt = 'CareerIQ360 Career Insights Blog Preview',
  hoverText = 'Open careeriq360.ai/blog ↗',
}) => {
  const defaultGlow = `radial-gradient(ellipse at 50% 50%, ${accentColor}55 0%, ${accentColor}22 50%, transparent 75%)`;

  return (
    <div
      className={`relative mx-auto select-none transition-all duration-500 ${className}`}
      style={{
        maxWidth: '440px',
        width: '100%',
      }}
    >
      {/* Cinematic Ambient Rim Glow behind the Browser Frame */}
      <div
        className="absolute -inset-4 rounded-[36px] pointer-events-none transition-opacity duration-700 opacity-60 group-hover:opacity-95"
        aria-hidden="true"
        style={{
          background: glowGradient || defaultGlow,
          filter: 'blur(30px)',
        }}
      />

      {/* Realistic Browser Physical Chassis */}
      <div
        className="relative rounded-[28px] p-[8px] sm:p-[10px] bg-gradient-to-b from-[#2a2a2e] via-[#151518] to-[#0a0a0d] border border-[#3e3e42]/70 ring-1 ring-white/10"
        style={{
          boxShadow: `0 30px 90px -15px rgba(0,0,0,0.98), 0 0 40px ${accentColor}33`,
        }}
      >
        {/* Inner Frame */}
        <div className="relative rounded-[20px] overflow-hidden bg-[#070913] border border-black/80 flex flex-col">

          {/* Browser Window Chrome Header Bar */}
          <div className="relative z-30 px-3.5 sm:px-4 py-2.5 bg-[#0B0F1F] border-b border-[#1c223a] flex items-center justify-between gap-3 text-[#C5C5C5]">
            {/* macOS Window Controls */}
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]/90 inline-block shadow-xs" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]/90 inline-block shadow-xs" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]/90 inline-block shadow-xs" />
            </div>

            {/* URL Address Bar Pill */}
            <div className="flex-1 max-w-[260px] mx-auto bg-[#14192d] hover:bg-[#1a2039] transition-colors rounded-full px-3 py-1 flex items-center justify-center gap-1.5 border border-white/5 shadow-inner">
              <Lock size={10} className="text-[#10B981] shrink-0" />
              <span className="font-mono text-[11px] text-[#E0E7FF] tracking-tight truncate">
                {url}
              </span>
            </div>

            {/* Right Quick Action Icon */}
            <div className="flex items-center gap-1.5 shrink-0 text-[#7965FF]">
              <Globe size={13} className="opacity-80" />
            </div>
          </div>

          {/* Screenshot Viewport Container */}
          <div className="relative bg-[#050505] overflow-hidden group/screen cursor-pointer max-h-[480px] sm:max-h-[520px]">
            {/* The Authentic Blog Screenshot */}
            <img
              src={imageUrl}
              alt={alt}
              loading="lazy"
              className="w-full h-auto block object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />

            {/* Diagonal Realistic Glass Sheen / Reflection */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(125deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 30%, transparent 45%)',
              }}
            />

            {/* Interactive hover overlay pill */}
            {interactive && (
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex items-center justify-center backdrop-blur-[1px]"
                style={{ backgroundColor: `${accentColor}18` }}
              >
                <span
                  className="px-4 py-2 rounded-full bg-black/85 text-[11px] sm:text-xs font-heading font-semibold tracking-wider uppercase text-white shadow-xl flex items-center gap-1.5"
                  style={{ border: `1px solid ${accentColor}`, boxShadow: `0 8px 25px ${accentColor}44` }}
                >
                  <span>{hoverText}</span>
                  <ExternalLink size={12} className="text-[#7965FF]" />
                </span>
              </div>
            )}
          </div>

          {/* Browser Bottom Status Footprint Bar */}
          <div className="px-3 py-1 bg-[#090D1B] border-t border-[#1c223a] flex items-center justify-between text-[10px] text-[#A39DFF]/80 font-mono">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
              Live Publication
            </span>
            <span>{url.split('/')[0]}</span>
          </div>

        </div>
      </div>
    </div>
  );
};
