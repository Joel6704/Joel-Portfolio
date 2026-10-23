import React, { useState, useEffect } from 'react';
import { ArrowDown } from 'lucide-react';

interface HeroProps {
  onCopyText: (text: string, label: string) => void;
}

export const Hero: React.FC<HeroProps> = () => {
  const [imgError, setImgError] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const brands = [
    { name: 'Prep Academy', label: 'PREP ACADEMY' },
    { name: 'CareerIQ360', label: 'CareerIQ360' },
    { name: 'PIXELBOHO', label: 'PIXELBOHO' },
    { name: 'Google', label: 'Google' },
    { name: 'Meta', label: 'Meta' },
    { name: 'Microsoft Azure', label: 'Microsoft Azure' },
    { name: 'Wix', label: 'Wix' },
    { name: 'Canva', label: 'Canva' },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-between overflow-hidden"
      style={{ backgroundColor: '#060B18' }}
    >
      {/* Background Digital Marketing Workspace Photography with subtle deep navy tint */}
      <div
        className="absolute inset-0 pointer-events-none opacity-15 mix-blend-luminosity"
        style={{
          backgroundImage: 'url(/workspace-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Dark Navy Cinematic Gradient Overlays */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(circle at 75% 40%, rgba(0, 102, 255, 0.18) 0%, transparent 60%), linear-gradient(180deg, rgba(6, 11, 24, 0.85) 0%, #060B18 100%)',
        }}
      />

      {/* Ambient Top Glow */}
      <div
        className="absolute top-0 left-1/4 w-[600px] h-[350px] pointer-events-none rounded-full"
        aria-hidden="true"
        style={{
          background: 'radial-gradient(ellipse, rgba(0, 102, 255, 0.15) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full pt-32 sm:pt-36 lg:pt-40 flex-1 flex flex-col justify-center">

        {/* Main 2-Column Hero Composition matching Reference Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

          {/* LEFT COLUMN (7 cols) — Typography, Tag, Description, CTAs, Client Proof */}
          <div
            className={`lg:col-span-7 flex flex-col justify-center transition-all duration-700 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            {/* 1. Role Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0066FF]/10 border border-[#0066FF]/30 text-[#38BDF8] font-heading text-xs font-semibold tracking-[0.16em] uppercase mb-6 self-start shadow-[0_0_15px_rgba(0,102,255,0.18)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF] shadow-[0_0_8px_#0066FF]" />
              DIGITAL MARKETER & GROWTH STRATEGIST
            </div>

            {/* 2. Bold Headline matching "I DESIGN WEBSITES THAT DRIVE RESULTS." */}
            <h1 className="font-heading font-black text-4xl sm:text-6xl lg:text-[4.2rem] tracking-tight uppercase text-white leading-[1.04] mb-6">
              I BUILD DIGITAL STRATEGIES <br className="hidden sm:inline" />
              THAT{' '}
              <span className="text-[#0066FF] drop-shadow-[0_0_35px_rgba(0,102,255,0.55)]">
                DRIVE RESULTS.
              </span>
            </h1>

            {/* 3. Subheading / Description */}
            <p className="font-body text-[#94A3B8] text-base sm:text-lg lg:text-xl font-normal leading-relaxed max-w-xl mb-9">
              I help businesses and educational platforms stand out online with strategic social media campaigns, high-converting content, SEO optimization, and data-backed growth.
            </p>

            {/* 4. Action Buttons (Side by Side matching reference) */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <a
                href="#projects"
                className="px-8 py-3.5 rounded-lg bg-[#0066FF] hover:bg-[#0052CC] text-white font-heading text-xs sm:text-sm font-semibold tracking-[0.12em] uppercase inline-flex items-center gap-2.5 transition-all duration-300 shadow-[0_8px_25px_rgba(0,102,255,0.4)] hover:shadow-[0_12px_35px_rgba(0,102,255,0.65)] hover:-translate-y-0.5 cursor-pointer"
              >
                <span>VIEW MY WORK</span>
                <span className="text-base font-bold">↗</span>
              </a>
              <a
                href="#contact"
                className="px-8 py-3.5 rounded-lg border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 text-white font-heading text-xs sm:text-sm font-semibold tracking-[0.12em] uppercase inline-flex items-center gap-2.5 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
              >
                <span>LET'S WORK TOGETHER</span>
                <span className="text-base font-bold">↗</span>
              </a>
            </div>

            {/* 5. Client / Campaign Proof Avatars matching reference */}
            <div className="flex items-center gap-4 pt-2">
              <div className="flex items-center -space-x-2.5">
                <div
                  className="w-10 h-10 rounded-full border-2 border-[#060B18] flex items-center justify-center text-white text-xs font-bold shadow-md"
                  style={{ background: 'linear-gradient(135deg, #0066FF 0%, #0047BA 100%)' }}
                >
                  PA
                </div>
                <div
                  className="w-10 h-10 rounded-full border-2 border-[#060B18] flex items-center justify-center text-white text-xs font-bold shadow-md"
                  style={{ background: 'linear-gradient(135deg, #38BDF8 0%, #0284C7 100%)' }}
                >
                  CQ
                </div>
                <div
                  className="w-10 h-10 rounded-full border-2 border-[#060B18] flex items-center justify-center text-white text-xs font-bold shadow-md"
                  style={{ background: 'linear-gradient(135deg, #6366F1 0%, #4338CA 100%)' }}
                >
                  PB
                </div>
                <div
                  className="w-10 h-10 rounded-full border-2 border-[#060B18] flex items-center justify-center text-white text-xs font-bold shadow-md"
                  style={{ background: 'linear-gradient(135deg, #10B981 0%, #047857 100%)' }}
                >
                  JT
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-bold text-sm text-white tracking-wide">
                  50+ Campaigns & Projects
                </span>
                <span className="font-body text-xs text-[#64748B]">
                  Delivering measurable growth & verified results
                </span>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN (5 cols) — Portrait with Electric Blue Aura & Handwritten Signature */}
          <div
            className={`lg:col-span-5 flex justify-center lg:justify-end transition-all duration-1000 delay-200 relative ${
              mounted ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6'
            }`}
          >
            <div className="relative w-full max-w-[340px] sm:max-w-[420px] lg:max-w-[460px]">

              {/* Brilliant Royal Blue Circular Halo Glow Aura behind portrait (as in reference) */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[420px] lg:w-[480px] h-[340px] sm:h-[420px] lg:h-[480px] rounded-full pointer-events-none"
                aria-hidden="true"
                style={{
                  background:
                    'radial-gradient(circle at 50% 50%, rgba(0, 102, 255, 0.6) 0%, rgba(0, 70, 220, 0.35) 45%, rgba(6, 11, 24, 0.05) 70%, transparent 80%)',
                  filter: 'blur(45px)',
                }}
              />

              {/* Secondary Soft Rim Glow */}
              <div
                className="absolute -inset-4 rounded-3xl blur-2xl pointer-events-none opacity-70"
                aria-hidden="true"
                style={{
                  background: 'radial-gradient(ellipse at 50% 40%, rgba(56, 189, 248, 0.3) 0%, transparent 65%)',
                }}
              />

              {/* Portrait Image Container */}
              <div className="relative z-10 w-full h-[440px] sm:h-[530px] lg:h-[580px] flex items-end justify-center overflow-visible">
                {!imgError ? (
                  <img
                    src="/portrait-hero-transparent.png"
                    alt="Joel Thomas – Digital Marketer & Growth Strategist"
                    onError={() => setImgError(true)}
                    className="w-full h-full object-contain object-bottom filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.85)] drop-shadow-[0_0_50px_rgba(0,102,255,0.4)] transition-transform duration-700 hover:scale-[1.02]"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-[#0B132B] rounded-2xl border border-[#172554]">
                    <div className="w-24 h-24 rounded-full mb-4 flex items-center justify-center font-display text-3xl font-bold border-2 border-[#0066FF] bg-[#060B18] text-[#0066FF]">
                      JT
                    </div>
                    <div className="font-heading text-lg tracking-widest text-white uppercase">
                      Joel Thomas
                    </div>
                    <div className="font-heading text-xs tracking-wider text-[#38BDF8] uppercase mt-1">
                      Digital Marketer
                    </div>
                  </div>
                )}

                {/* Stylish Electric Blue Handwritten Signature */}
                <div className="absolute right-0 sm:-right-4 -bottom-6 sm:-bottom-10 z-20 pointer-events-none select-none">
                  <span className="font-signature text-4xl sm:text-5xl lg:text-6xl text-[#38BDF8] -rotate-12 inline-block filter drop-shadow-[0_4px_16px_rgba(0,102,255,0.7)]">
                    Joel Thomas
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* TRUSTED BY BRANDS WORLDWIDE Bar matching reference */}
        <div className="w-full mt-16 sm:mt-20 pt-8 sm:pt-10 border-t border-white/10 pb-6 sm:pb-8">
          <div className="text-center mb-6">
            <span className="font-heading text-xs sm:text-[13px] font-semibold tracking-[0.24em] uppercase text-[#64748B]">
              TRUSTED BY BRANDS & PLATFORMS
            </span>
          </div>

          {/* Clean Monochrome Brand Logos Row */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 lg:gap-14">
            {brands.map((brand, idx) => (
              <div
                key={idx}
                className="group flex items-center gap-2 px-3 py-1.5 rounded-md transition-all duration-300 opacity-60 hover:opacity-100 hover:scale-105"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF] opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="font-heading text-sm sm:text-base font-bold tracking-wider text-[#94A3B8] group-hover:text-white transition-colors">
                  {brand.label}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Subtle Scroll Indicator */}
      <div className="relative z-10 pb-6 flex justify-center">
        <a
          href="#about"
          className="font-body text-[10px] font-medium tracking-[0.2em] uppercase text-[#64748B] hover:text-[#38BDF8] transition-colors flex flex-col items-center gap-1.5"
          aria-label="Scroll to About section"
        >
          <span>Scroll</span>
          <ArrowDown size={14} className="animate-bounce text-[#0066FF]" />
        </a>
      </div>

    </section>
  );
};
