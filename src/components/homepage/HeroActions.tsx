import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface HeroActionsProps {
  primaryLabel: string;
  primaryHref: string;
}

export const HeroActions: React.FC<HeroActionsProps> = ({
  primaryLabel,
  primaryHref,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-wrap items-center gap-4 sm:gap-5 mb-10"
    >
      {/* Primary Button: Cyan-to-Electric-Blue Gradient Pill */}
      <motion.a
        href={primaryHref}
        whileHover={{ y: -2, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="group relative px-8 py-3.5 rounded-full font-space text-xs sm:text-sm font-bold tracking-wider uppercase text-white inline-flex items-center gap-2.5 overflow-hidden transition-all duration-300 shadow-[0_0_25px_rgba(0,140,255,0.45)] hover:shadow-[0_0_40px_rgba(0,229,255,0.7)]"
        style={{
          background: 'linear-gradient(135deg, #00E5FF 0%, #008CFF 100%)',
        }}
      >
        {/* Subtle shine sweep on hover */}
        <span
          className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-out pointer-events-none"
          aria-hidden="true"
        />
        <span className="relative z-10 text-slate-950 font-extrabold">{primaryLabel}</span>
        <ArrowRight
          size={16}
          className="relative z-10 text-slate-950 transition-transform duration-300 group-hover:translate-x-1.5"
        />
      </motion.a>
    </motion.div>
  );
};
