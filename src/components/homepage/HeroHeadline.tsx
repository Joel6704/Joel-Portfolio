import React from 'react';
import { motion, type Variants } from 'framer-motion';

interface HeroHeadlineProps {
  line1: string;
  line2: string;
  line3: string;
}

export const HeroHeadline: React.FC<HeroHeadlineProps> = ({ line1, line2, line3 }) => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const lineVariants: Variants = {
    hidden: { opacity: 0, y: 22 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.h1
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="font-space font-extrabold text-4xl sm:text-6xl lg:text-[4.3rem] xl:text-[4.75rem] uppercase tracking-tight text-white leading-[1.03] mb-6 select-none"
    >
      {/* Line 1 */}
      <motion.div variants={lineVariants} className="overflow-hidden">
        <span className="block">{line1}</span>
      </motion.div>

      {/* Line 2 */}
      <motion.div variants={lineVariants} className="overflow-hidden">
        <span className="block">{line2}</span>
      </motion.div>

      {/* Line 3 with electric blue to cyan gradient and light sweep */}
      <motion.div variants={lineVariants} className="overflow-hidden pt-1">
        <span className="relative inline-block italic font-black text-revenue-sweep drop-shadow-[0_0_35px_rgba(0,140,255,0.6)]">
          {line3}
          {/* Subtle neon glow beam underneath */}
          <span
            className="absolute -inset-x-2 -bottom-1 h-3 pointer-events-none opacity-40 blur-lg rounded-full"
            style={{
              background: 'linear-gradient(90deg, #008CFF, #00E5FF)',
            }}
            aria-hidden="true"
          />
        </span>
      </motion.div>
    </motion.h1>
  );
};
