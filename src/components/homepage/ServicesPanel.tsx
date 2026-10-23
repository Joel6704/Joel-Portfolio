import React from 'react';
import { motion } from 'framer-motion';
import { Megaphone, TrendingUp, Sparkles, Users, Target, Cloud } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { ServiceItemConfig } from '../../data/homeConfig';

interface ServicesPanelProps {
  services: ServiceItemConfig[];
}

const iconMap: Record<string, LucideIcon> = {
  Megaphone,
  TrendingUp,
  Sparkles,
  Users,
  Target,
  Cloud,
};

export const ServicesPanel: React.FC<ServicesPanelProps> = ({ services }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className="w-full mt-12 sm:mt-16 lg:mt-20 z-20"
    >
      <div className="w-full rounded-2xl backdrop-blur-xl bg-[#060D24]/75 border border-[#008CFF]/30 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.85),0_0_25px_rgba(0,140,255,0.15)] overflow-hidden">
        {/* Top subtle cyan light line */}
        <div
          className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#00E5FF]/50 to-transparent"
          aria-hidden="true"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#008CFF]/20">
          {services.map((item) => {
            const Icon = iconMap[item.icon] || Sparkles;

            return (
              <div
                key={item.id}
                className="group p-5 sm:p-6 lg:p-7 flex flex-col justify-between transition-all duration-300 hover:bg-[#008CFF]/[0.08] cursor-pointer"
              >
                {/* Header row: Icon + subtle indicator */}
                <div className="flex items-center justify-between mb-4">
                  <div className="relative w-12 h-12 rounded-xl bg-[#008CFF]/15 border border-[#008CFF]/35 flex items-center justify-center text-[#00E5FF] shadow-[0_0_15px_rgba(0,229,255,0.25)] group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(0,229,255,0.6)] group-hover:border-[#00E5FF] transition-all duration-300">
                    <Icon size={22} className="relative z-10" />
                    {/* Glowing radial aura on hover */}
                    <span
                      className="absolute inset-0 rounded-xl bg-[#00E5FF]/20 filter blur-md opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-hidden="true"
                    />
                  </div>

                  <span className="text-[11px] font-space font-semibold text-[#00E5FF]/50 group-hover:text-[#00E5FF] transition-colors">
                    ↗
                  </span>
                </div>

                {/* Two-line title */}
                <div>
                  <h3 className="font-space font-bold text-base sm:text-lg text-slate-200 group-hover:text-white leading-snug transition-colors">
                    <span className="block">{item.line1}</span>
                    <span className="block text-[#7DD3FC] group-hover:text-[#00E5FF] transition-colors">
                      {item.line2}
                    </span>
                  </h3>
                  <p className="font-space text-xs text-[#94A3B8] mt-2 line-clamp-2 leading-relaxed opacity-85 group-hover:opacity-100 transition-opacity">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};
