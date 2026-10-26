import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import { Magnetic } from '../common/Magnetic';

interface HeroActionsProps {
  primaryLabel: string;
  primaryHref: string;
  resumeHref?: string;
  resumeFileName?: string;
}

export const HeroActions: React.FC<HeroActionsProps> = ({
  primaryLabel,
  primaryHref,
  resumeHref = '/Joel-Thomas-Resume.pdf',
  resumeFileName = 'Joel-Thomas-Resume.pdf',
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-wrap items-center gap-4 sm:gap-5 mb-10"
    >
      {/* Primary Button: Cyan-to-Electric-Blue Gradient Pill with Magnetic hover */}
      <Magnetic strength={0.3} maxOffset={12}>
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
      </Magnetic>

      {/* Secondary Button: Download Resume with Subtle Gradient Border, Smooth Hover Glow & Magnetic Physics */}
      <Magnetic strength={0.3} maxOffset={12}>
        <motion.a
          href={resumeHref}
          download={resumeFileName}
          whileHover={{ y: -2, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="group relative p-[1.5px] rounded-full inline-flex items-center justify-center transition-all duration-300 bg-gradient-to-r from-cyan-400/50 via-blue-500/40 to-cyan-300/60 hover:from-cyan-300 hover:via-sky-400 hover:to-blue-400 shadow-[0_0_20px_rgba(0,180,255,0.18)] hover:shadow-[0_0_35px_rgba(0,229,255,0.5)]"
        >
          {/* Inner dark blue backdrop */}
          <span className="relative w-full h-full px-7 py-3.5 rounded-full bg-[#070e28]/90 hover:bg-[#0c1844]/80 backdrop-blur-md flex items-center gap-2.5 font-space text-xs sm:text-sm font-bold tracking-wider uppercase text-white transition-all duration-300">
            {/* Subtle glow wash on hover */}
            <span
              className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/10 via-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              aria-hidden="true"
            />
            <Download
              size={16}
              className="relative z-10 text-cyan-400 group-hover:text-cyan-300 group-hover:translate-y-0.5 transition-all duration-300"
            />
            <span className="relative z-10 text-slate-100 group-hover:text-white transition-colors duration-300">
              Download Resume
            </span>
          </span>
        </motion.a>
      </Magnetic>
    </motion.div>
  );
};

export default HeroActions;
