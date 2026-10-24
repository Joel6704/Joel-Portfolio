import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Sparkles, Layers } from 'lucide-react';
import type { ToolItem } from './toolsData';

interface ToolDetailsPanelProps {
  selectedTool: ToolItem;
}

export const ToolDetailsPanel: React.FC<ToolDetailsPanelProps> = ({ selectedTool }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [panelSize, setPanelSize] = useState({ width: 480, height: 650 });
  const [isHovered, setIsHovered] = useState(false);
  const [justSelected, setJustSelected] = useState(false);

  // Measure exact panel dimensions for precise rounded border tracing
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setPanelSize({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);

    let observer: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined' && containerRef.current) {
      observer = new ResizeObserver(() => updateSize());
      observer.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener('resize', updateSize);
      observer?.disconnect();
    };
  }, []);

  // Flash / intensify glow temporarily when active tool changes
  useEffect(() => {
    const frame = requestAnimationFrame(() => setJustSelected(true));
    const timer = setTimeout(() => setJustSelected(false), 900);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timer);
    };
  }, [selectedTool.id]);

  const cornerRadius = panelSize.width < 640 ? 16 : 24;
  const isIntensified = isHovered || justSelected;

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative w-full h-[540px] sm:h-[600px] lg:h-[650px] rounded-2xl sm:rounded-3xl bg-[#060B18]/90 border p-6 sm:p-8 flex flex-col justify-between overflow-hidden backdrop-blur-xl select-none transition-all duration-500"
      style={{
        borderColor: `${selectedTool.accentColor}40`,
        boxShadow: isIntensified
          ? `0 14px 45px rgba(0,0,0,0.7), inset 0 0 50px ${selectedTool.accentColor}18, 0 0 35px ${selectedTool.accentColor}45`
          : `0 8px 32px rgba(0,0,0,0.6), inset 0 0 40px ${selectedTool.accentColor}10, 0 0 20px ${selectedTool.accentColor}25`,
      }}
    >
      {/* ── CARD 2: Dynamic Continuous Animated Border Tracing Overlay (Projects Tool Accent Color) ── */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-30 overflow-visible"
        aria-hidden="true"
      >
        <defs>
          {/* Luminous dynamic traveling gradient powered by selectedTool.accentColor */}
          <linearGradient id={`toolBorderTraceGrad-${selectedTool.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={selectedTool.accentColor} />
            <stop offset="35%" stopColor={selectedTool.accentColor} stopOpacity="0.9" />
            <stop offset="70%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor={selectedTool.accentColor} />
          </linearGradient>

          {/* Atmospheric glow filter for traveling border tracer */}
          <filter id={`borderTraceBlur-${selectedTool.id}`} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Soft Ambient Glow Tracer Layer */}
        <motion.rect
          x="1.5"
          y="1.5"
          width={Math.max(0, panelSize.width - 3)}
          height={Math.max(0, panelSize.height - 3)}
          rx={cornerRadius}
          fill="none"
          stroke={`url(#toolBorderTraceGrad-${selectedTool.id})`}
          strokeWidth={isIntensified ? 5.5 : 3.8}
          strokeLinecap="round"
          pathLength={1000}
          strokeDasharray="210 790"
          filter={`url(#borderTraceBlur-${selectedTool.id})`}
          animate={{ strokeDashoffset: [1000, 0] }}
          transition={{
            duration: 7.5,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            opacity: isIntensified ? 0.95 : 0.65,
            transition: 'opacity 0.3s ease, stroke-width 0.3s ease',
          }}
        />

        {/* Sharp High-Precision Core Line */}
        <motion.rect
          x="1.5"
          y="1.5"
          width={Math.max(0, panelSize.width - 3)}
          height={Math.max(0, panelSize.height - 3)}
          rx={cornerRadius}
          fill="none"
          stroke={`url(#toolBorderTraceGrad-${selectedTool.id})`}
          strokeWidth={isIntensified ? 2.4 : 1.8}
          strokeLinecap="round"
          pathLength={1000}
          strokeDasharray="210 790"
          animate={{ strokeDashoffset: [1000, 0] }}
          transition={{
            duration: 7.5,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            opacity: 1,
            transition: 'stroke-width 0.3s ease',
          }}
        />
      </svg>

      {/* ── Subtle Background Illumination Matching Active Tool Accent Color ── */}
      <motion.div
        key={`tool-glow-${selectedTool.id}`}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: isIntensified ? 0.45 : 0.32, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="absolute -top-20 -right-20 w-84 h-84 rounded-full pointer-events-none blur-[80px]"
        style={{
          background: `radial-gradient(circle, ${selectedTool.accentColor} 0%, ${selectedTool.accentColor}25 50%, transparent 75%)`,
          transition: 'background 0.5s ease',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col h-full overflow-y-auto pr-1 sm:pr-2 custom-scrollbar">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedTool.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col h-full justify-between"
          >
            <div>
              {/* ── A. Dynamic Breadcrumb ── */}
              <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-slate-400 mb-5 flex-wrap">
                <span
                  className="inline-flex items-center gap-1.5 font-semibold uppercase transition-colors duration-300"
                  style={{ color: selectedTool.accentColor }}
                >
                  <Layers size={12} style={{ color: selectedTool.accentColor }} />
                  {selectedTool.category}
                </span>
                <span className="text-slate-600 font-bold">›</span>
                <span className="text-slate-200 font-medium">
                  {selectedTool.name}
                </span>
              </div>

              {/* ── B. Tool Header: Logo + Tag Badge + Name ── */}
              <div className="flex items-start gap-4 mb-5">
                <div
                  className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center shrink-0 border p-2.5 transition-all duration-300 bg-[#0A1228]"
                  style={{
                    borderColor: `${selectedTool.accentColor}60`,
                    boxShadow: isIntensified
                      ? `0 0 28px ${selectedTool.accentColor}60`
                      : `0 0 18px ${selectedTool.accentColor}35`,
                  }}
                >
                  <img
                    src={selectedTool.iconUrl}
                    alt={`${selectedTool.name} logo`}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>

                <div className="flex flex-col">
                  {selectedTool.tag && (
                    <span
                      className="self-start text-[10px] sm:text-xs font-mono font-semibold tracking-widest uppercase px-2.5 py-0.5 rounded-full border mb-1.5 transition-all duration-300"
                      style={{
                        backgroundColor: `${selectedTool.accentColor}18`,
                        borderColor: `${selectedTool.accentColor}50`,
                        color: selectedTool.accentColor,
                      }}
                    >
                      {selectedTool.tag}
                    </span>
                  )}
                  <h3 className="font-sans font-bold text-2xl sm:text-3xl text-white tracking-tight leading-tight">
                    {selectedTool.name}
                  </h3>
                </div>
              </div>

              {/* ── C. Concise Professional Description ── */}
              <p className="font-sans text-slate-300 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                {selectedTool.description}
              </p>

              {/* ── Divider ── */}
              <div
                className="w-full h-px mb-6 transition-all duration-500"
                style={{
                  background: `linear-gradient(to right, ${selectedTool.accentColor}50 via-purple-500/20 to-transparent)`,
                }}
              />

              {/* ── D. WHAT I USE IT FOR: Practical Application Bullet Points ── */}
              <div className="mb-6">
                <h4 className="text-xs font-mono font-semibold uppercase tracking-[0.2em] text-slate-400 mb-3.5 flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full transition-all duration-300"
                    style={{
                      backgroundColor: selectedTool.accentColor,
                      boxShadow: `0 0 8px ${selectedTool.accentColor}`,
                    }}
                  />
                  WHAT I USE IT FOR
                </h4>

                <ul className="space-y-3">
                  {selectedTool.whatIUseItFor.map((item, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: idx * 0.08 }}
                      className="flex items-start gap-3 text-xs sm:text-sm text-slate-200 leading-relaxed font-sans"
                    >
                      <CheckCircle2
                        size={16}
                        className="shrink-0 mt-0.5 transition-colors duration-300"
                        style={{ color: selectedTool.accentColor }}
                      />
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>

            {/* ── E. RELATED TOOLS OR FEATURES ── */}
            <div className="pt-4 border-t border-slate-800/80 mt-auto">
              <h4 className="text-xs font-mono font-semibold uppercase tracking-[0.2em] text-slate-400 mb-3 flex items-center gap-2">
                <Sparkles size={13} style={{ color: selectedTool.accentColor, transition: 'color 0.4s ease' }} />
                RELATED TOOLS & FEATURES
              </h4>

              <div className="flex flex-wrap gap-2">
                {selectedTool.relatedToolsOrFeatures.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full text-xs font-sans font-medium bg-[#0A1228] border border-slate-700/60 text-slate-300 hover:text-white transition-all duration-200"
                    style={{
                      borderColor: undefined,
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = selectedTool.accentColor;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = 'rgba(51, 65, 85, 0.6)';
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Note: Explore button is completely removed */}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ToolDetailsPanel;
