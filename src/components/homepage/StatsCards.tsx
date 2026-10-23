import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { TrendingUp, BarChart3, Target, Award } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { StatCardConfig } from '../../data/homeConfig';

interface StatsCardsProps {
  stats: StatCardConfig[];
}

const iconMap: Record<string, LucideIcon> = {
  TrendingUp,
  BarChart3,
  Target,
  Award,
};

// Count-up item component
const StatItem: React.FC<{
  stat: StatCardConfig;
  index: number;
}> = ({ stat, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = stat.numericTarget;
    const duration = 1200; // ms
    const incrementTime = 30;
    const steps = duration / incrementTime;
    const stepValue = end / steps;

    const timer = setInterval(() => {
      start += stepValue;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [isInView, stat.numericTarget]);

  const IconComponent = iconMap[stat.icon] || TrendingUp;

  // Stagger entrance + individual subtle float offset
  const floatDelay = index * 0.8;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 45 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.6,
        delay: 0.3 + index * 0.15,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="relative group select-none"
    >
      <motion.div
        animate={{ y: [-4, 4, -4] }}
        transition={{
          duration: 5,
          delay: floatDelay,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        whileHover={{ y: -6, scale: 1.02 }}
        className="w-full sm:w-[220px] lg:w-[240px] p-4 sm:p-5 rounded-2xl backdrop-blur-xl bg-[#060D24]/75 border border-[#008CFF]/30 group-hover:border-[#00E5FF]/70 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8),0_0_20px_rgba(0,140,255,0.12)] group-hover:shadow-[0_15px_35px_-8px_rgba(0,0,0,0.9),0_0_30px_rgba(0,229,255,0.3)] transition-all duration-300 relative overflow-hidden"
      >
        {/* Subtle top border highlight */}
        <div
          className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#00E5FF]/60 to-transparent opacity-50 group-hover:opacity-100 transition-opacity"
          aria-hidden="true"
        />

        <div className="flex items-start gap-3.5">
          {/* Neon Icon Container */}
          <div className="w-10 h-10 rounded-xl bg-[#008CFF]/15 border border-[#008CFF]/40 flex items-center justify-center shrink-0 text-[#00E5FF] shadow-[0_0_15px_rgba(0,229,255,0.25)] group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(0,229,255,0.5)] transition-all duration-300">
            <IconComponent size={20} />
          </div>

          <div className="flex flex-col">
            {/* Animated Statistic Value */}
            <div className="font-space font-extrabold text-2xl sm:text-3xl text-white tracking-tight leading-none mb-1">
              {isInView ? count : 0}
              <span className="text-[#00E5FF]">{stat.suffix || ''}</span>
            </div>

            {/* Label */}
            <div className="font-space text-xs sm:text-[13px] font-semibold text-slate-200 tracking-wide leading-tight">
              {stat.label}
            </div>

            {/* Sublabel */}
            <div className="font-space text-[10px] text-[#94A3B8] font-normal mt-0.5 leading-tight">
              {stat.sublabel}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const StatsCards: React.FC<StatsCardsProps> = ({ stats }) => {
  return (
    <div className="flex flex-col gap-3 sm:gap-4 lg:gap-5 z-20">
      {stats.map((stat, idx) => (
        <StatItem key={stat.id} stat={stat} index={idx} />
      ))}
    </div>
  );
};
