import React from 'react';
import { motion } from 'framer-motion';

interface CategoryBadgeProps {
  text: string;
}

export const CategoryBadge: React.FC<CategoryBadgeProps> = ({ text }) => {
  // Parse items separated by "•"
  const items = text.split('•').map((item) => item.trim());

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full backdrop-blur-md bg-[#008CFF]/10 border border-[#008CFF]/35 shadow-[0_0_20px_rgba(0,140,255,0.2)] mb-6 self-start select-none"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] shadow-[0_0_8px_#00E5FF] animate-pulse" />
      <div className="flex items-center gap-2 font-space text-xs sm:text-[13px] font-semibold tracking-wider text-[#7DD3FC] uppercase">
        {items.map((item, idx) => (
          <React.Fragment key={idx}>
            <span>{item}</span>
            {idx < items.length - 1 && (
              <span className="text-[#00E5FF] text-[10px] font-bold opacity-80">•</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </motion.div>
  );
};
