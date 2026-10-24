import React from 'react';
import { CursorPlayground } from '../common/CursorPlayground';
import { Magnetic } from '../common/Magnetic';

export { CursorPlayground as InteractiveCursor };

// Decorative Cursor Guide Widget in lower-right hero area with Magnetic interaction
export const CursorExperienceBadge: React.FC = () => {
  return (
    <Magnetic strength={0.3} maxOffset={12}>
      <div className="hidden lg:flex items-center gap-3 select-none cursor-default group">
        {/* Curved Cyan-Purple Arrow */}
        <svg
          className="w-12 h-10 text-[#00E5FF] filter drop-shadow-[0_0_6px_#00E5FF] transition-transform duration-300 group-hover:scale-110"
          viewBox="0 0 60 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 10 32 C 25 10, 40 12, 48 24"
            stroke="url(#badge-arrow-grad)"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeDasharray="3 3"
          />
          <polygon points="46,28 53,24 49,18" fill="#A855F7" />
          <defs>
            <linearGradient id="badge-arrow-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00E5FF" />
              <stop offset="100%" stopColor="#A855F7" />
            </linearGradient>
          </defs>
        </svg>

        {/* Decorative Cursor Illustration + Text */}
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#060D24]/80 border border-[#008CFF]/30 hover:border-[#A855F7]/50 backdrop-blur-md shadow-[0_0_15px_rgba(0,140,255,0.18)] hover:shadow-[0_0_25px_rgba(168,85,247,0.3)] transition-all duration-300">
          {/* Glowing Cursor Icon with Purple/Cyan glow */}
          <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-[#008CFF]/30 to-[#A855F7]/30 flex items-center justify-center text-[#00E5FF] animate-pulse">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4 2l16 12-7.5 1.5 4.5 7.5-3 1.5-4.5-7.5-5.5 5.5z" />
            </svg>
          </div>
          <span className="font-space text-[11px] font-medium text-[#7DD3FC] tracking-wide group-hover:text-white transition-colors">
            Move your cursor for a dynamic experience
          </span>
        </div>
      </div>
    </Magnetic>
  );
};

export default CursorPlayground;
