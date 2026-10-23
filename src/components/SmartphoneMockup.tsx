import React from 'react';
import {
  ChevronLeft,
  ChevronDown,
  Bell,
  MoreHorizontal,
  Home,
  Search,
  PlusSquare,
  Film,
  CheckCircle2,
} from 'lucide-react';

interface SmartphoneMockupProps {
  imageUrl?: string;
  className?: string;
  interactive?: boolean;
  username?: string;
  accentColor?: string;
  glowGradient?: string;
  alt?: string;
  hoverText?: string;
  showHeader?: boolean;
  userInitial?: string;
}

export const SmartphoneMockup: React.FC<SmartphoneMockupProps> = ({
  imageUrl = '/prepacademy-instagram.png',
  className = '',
  interactive = true,
  username = 'prepacademy.in',
  accentColor = '#0066FF',
  glowGradient,
  alt = 'Instagram Feed Showcase',
  hoverText,
  showHeader = true,
  userInitial = 'P',
}) => {
  const defaultGlow = `radial-gradient(ellipse at 50% 50%, ${accentColor}55 0%, ${accentColor}22 50%, transparent 75%)`;

  return (
    <div
      className={`relative mx-auto select-none transition-all duration-500 ${className}`}
      style={{
        maxWidth: '380px',
        width: '100%',
      }}
    >
      {/* Cinematic Ambient Rim Glow behind the Phone */}
      <div
        className="absolute -inset-4 rounded-[54px] pointer-events-none transition-opacity duration-700 opacity-60 group-hover:opacity-95"
        aria-hidden="true"
        style={{
          background: glowGradient || defaultGlow,
          filter: 'blur(28px)',
        }}
      />

      {/* Realistic Smartphone Physical Chassis */}
      <div
        className="relative rounded-[48px] p-[10px] sm:p-[12px] bg-gradient-to-b from-[#2a2a2e] via-[#151518] to-[#0a0a0d] border border-[#3e3e42]/70 ring-1 ring-white/10"
        style={{
          boxShadow: `0 30px 90px -15px rgba(0,0,0,0.98), 0 0 40px ${accentColor}33`,
        }}
      >
        {/* Subtle Side Button Ridges */}
        {/* Volume Rocker & Action Button on Left */}
        <div className="absolute -left-[3px] top-24 w-[3px] h-9 bg-[#2c2c30] rounded-l-sm" />
        <div className="absolute -left-[3px] top-36 w-[3px] h-14 bg-[#2c2c30] rounded-l-sm" />
        <div className="absolute -left-[3px] top-52 w-[3px] h-14 bg-[#2c2c30] rounded-l-sm" />
        {/* Power Button on Right */}
        <div className="absolute -right-[3px] top-32 w-[3px] h-16 bg-[#2c2c30] rounded-r-sm" />

        {/* Inner Phone Bezel Frame */}
        <div className="relative rounded-[38px] overflow-hidden bg-black border border-black/80 flex flex-col">

          {/* Top Speaker Ear-piece & Dynamic Island Area */}
          <div className="relative z-30 pt-3 px-6 pb-1 bg-black flex items-center justify-between text-[#F5F5F5] text-[11px] font-medium tracking-tight">
            {/* Time */}
            <span className="font-semibold tracking-normal text-xs pl-1">9:41</span>

            {/* Dynamic Island Pill Notch */}
            <div className="relative w-24 sm:w-28 h-6 bg-black rounded-full flex items-center justify-end px-2.5 shadow-inner border border-white/5 mx-auto">
              {/* Front Camera Lens Dot */}
              <div className="w-2.5 h-2.5 rounded-full bg-[#0a0a14] border border-[#1f1f2e] flex items-center justify-center">
                <div className="w-1 h-1 rounded-full bg-[#152a42]" />
              </div>
            </div>

            {/* Status Bar Icons (Cellular, WiFi, Battery) */}
            <div className="flex items-center gap-1.5 pr-1">
              {/* Cellular Signal (4 bars) */}
              <div className="flex items-end gap-[1px] h-2.5">
                <span className="w-[2px] h-[3px] bg-white rounded-xs" />
                <span className="w-[2px] h-[5px] bg-white rounded-xs" />
                <span className="w-[2px] h-[8px] bg-white rounded-xs" />
                <span className="w-[2px] h-[10px] bg-white rounded-xs" />
              </div>

              {/* 5G label */}
              <span className="text-[9px] font-bold">5G</span>

              {/* Battery Indicator */}
              <div className="w-5 h-2.5 rounded-[3px] border border-white/80 p-[1px] flex items-center">
                <div className="h-full w-[85%] bg-white rounded-xs" />
              </div>
            </div>
          </div>

          {/* Optional Instagram In-App Header (rendered when image does not include header) */}
          {showHeader && (
            <div className="relative z-20 px-3.5 py-2 bg-black border-b border-[#1c1c1f] flex items-center justify-between text-[#F5F5F5]">
              <div className="flex items-center gap-1.5">
                <ChevronLeft size={20} className="text-[#C5C5C5]" />
                <div className="flex items-center gap-1">
                  <span className="font-heading text-xs font-semibold tracking-wide">
                    {username}
                  </span>
                  <CheckCircle2 size={13} className="text-[#3897f0] fill-[#3897f0]" />
                  <ChevronDown size={14} className="text-[#999]" />
                </div>
              </div>

              <div className="flex items-center gap-3 text-[#C5C5C5]">
                <Bell size={17} />
                <MoreHorizontal size={17} />
              </div>
            </div>
          )}

          {/* Instagram Feed Screenshot Viewport */}
          <div className="relative bg-black overflow-hidden group/screen cursor-pointer">
            {/* The authentic Instagram Feed Screenshot */}
            <img
              src={imageUrl}
              alt={alt}
              className="w-full h-auto block object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              loading="eager"
            />

            {/* Diagonal Realistic Glass Sheen / Reflection */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(125deg, rgba(255, 255, 255, 0.09) 0%, rgba(255, 255, 255, 0.02) 28%, transparent 45%)',
              }}
            />

            {/* Subtle interactive hover overlay */}
            {interactive && (
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex items-center justify-center"
                style={{ backgroundColor: `${accentColor}18` }}
              >
                <span
                  className="px-3.5 py-1.5 rounded-full bg-black/85 text-[11px] font-heading font-medium tracking-wider uppercase text-white shadow-lg"
                  style={{ border: `1px solid ${accentColor}` }}
                >
                  {hoverText || `Open @${username} ↗`}
                </span>
              </div>
            )}
          </div>

          {/* Instagram Bottom Navigation Tab Bar */}
          <div className="relative z-20 px-5 pt-2 pb-1 bg-black border-t border-[#1c1c1f] flex items-center justify-between text-[#909090]">
            <Home size={19} className="text-white" />
            <Search size={19} />
            <PlusSquare size={19} />
            <Film size={19} />
            {/* User profile icon thumb */}
            <div className="w-5 h-5 rounded-full border border-white/60 p-[1px] overflow-hidden">
              <div
                className="w-full h-full rounded-full flex items-center justify-center text-[7px] font-bold text-white"
                style={{ backgroundColor: accentColor }}
              >
                {userInitial}
              </div>
            </div>
          </div>

          {/* Home Indicator Bar */}
          <div className="bg-black pt-1 pb-1.5 flex justify-center">
            <div className="w-32 h-[3.5px] bg-white/70 rounded-full" />
          </div>

        </div>
      </div>
    </div>
  );
};
