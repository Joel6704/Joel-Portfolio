import React from 'react';
import type { BrandConfig } from '../../data/homeConfig';

interface TrustedBrandsProps {
  heading?: string;
  brands: BrandConfig[];
}

export const TrustedBrands: React.FC<TrustedBrandsProps> = ({
  heading = 'TRUSTED BY BRANDS',
  brands,
}) => {
  // Duplicate for seamless 50% translation marquee
  const marqueeItems = [...brands, ...brands, ...brands, ...brands];

  return (
    <section className="w-full relative z-20 bg-white border-y border-slate-200 py-3 sm:py-3.5 lg:py-4 shadow-[0_4px_16px_rgba(0,0,0,0.08)] overflow-hidden select-none">
      {/* Top Subtle Cyan Glow Accent */}
      <div
        className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#008CFF]/50 to-transparent"
        aria-hidden="true"
      />

      {/* Heading on White Background with Decorative Blue Lines */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-2 sm:mb-2.5 text-center flex items-center justify-center gap-2 sm:gap-3">
        <span className="w-6 sm:w-12 h-[1px] bg-gradient-to-r from-transparent to-[#008CFF]/70" />
        <h2 className="font-space text-[10px] sm:text-[11px] font-extrabold tracking-[0.25em] sm:tracking-[0.3em] uppercase text-slate-800 leading-none">
          {heading}
        </h2>
        <span className="w-6 sm:w-12 h-[1px] bg-gradient-to-l from-transparent to-[#008CFF]/70" />
      </div>

      {/* Marquee with Compact, Balanced Logos on White Background */}
      <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)]">
        <div className="animate-marquee flex items-center gap-8 sm:gap-12 lg:gap-14">
          {marqueeItems.map((brand, idx) => (
            <div
              key={`${brand.id}-${idx}`}
              className="group flex items-center gap-3 sm:gap-4 px-1.5 transition-all duration-300 cursor-default shrink-0"
            >
              {/* Electric Blue Separator Accent Dot */}
              <span className="w-1.5 h-1.5 rounded-full bg-[#008CFF] shadow-[0_0_6px_rgba(0,140,255,0.6)] shrink-0" />

              {/* Brand Logo Proportionally Scaled */}
              {brand.logoUrl ? (
                <div className="flex items-center justify-center h-8 sm:h-9 lg:h-10">
                  <img
                    src={brand.logoUrl}
                    alt={brand.name}
                    className="h-6 sm:h-7 lg:h-8 w-auto max-w-[130px] sm:max-w-[160px] lg:max-w-[190px] object-contain transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
              ) : (
                <span className="font-space text-xs sm:text-sm font-bold tracking-wider text-slate-800 group-hover:text-[#008CFF] transition-colors">
                  {brand.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
