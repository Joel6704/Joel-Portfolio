import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ALL_TOOLS,
  TOOL_CATEGORIES,
  type ToolItem,
  type ToolCategoryType,
} from './toolsData';

interface ToolsVisualizationProps {
  selectedTool: ToolItem;
  onSelectTool: (tool: ToolItem) => void;
}

export const ToolsVisualization: React.FC<ToolsVisualizationProps> = ({
  selectedTool,
  onSelectTool,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ToolCategoryType>('All');
  const [hoveredToolId, setHoveredToolId] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [justSelected, setJustSelected] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 600, height: 580 });

  // Update container dimensions on resize
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setDimensions({
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

  // Flash / intensify border glow temporarily when active tool changes
  useEffect(() => {
    const frame = requestAnimationFrame(() => setJustSelected(true));
    const timer = setTimeout(() => setJustSelected(false), 900);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timer);
    };
  }, [selectedTool.id]);

  // Filter tools based on selected category
  const filteredTools = useMemo(() => {
    if (selectedCategory === 'All') return ALL_TOOLS;
    return ALL_TOOLS.filter((t) => t.category === selectedCategory);
  }, [selectedCategory]);

  // Organic harmonic floating drift parameters per tool
  const floatParams = useMemo(() => {
    const map: Record<
      string,
      {
        ampX: number;
        ampY: number;
        freqX: number;
        freqY: number;
        phaseX: number;
        phaseY: number;
      }
    > = {};

    ALL_TOOLS.forEach((tool, idx) => {
      map[tool.id] = {
        ampX: 10 + (idx % 4) * 2.5,
        ampY: 9 + ((idx + 2) % 4) * 2.5,
        freqX: 8 + (idx % 5) * 1.5,
        freqY: 7 + ((idx + 1) % 5) * 1.5,
        phaseX: (idx * 0.7) % (Math.PI * 2),
        phaseY: (idx * 1.1) % (Math.PI * 2),
      };
    });

    return map;
  }, []);

  const cornerRadius = dimensions.width < 640 ? 16 : 24;
  const isIntensified = isHovered || hoveredToolId !== null || justSelected;

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative w-full h-[540px] sm:h-[600px] lg:h-[650px] rounded-2xl sm:rounded-3xl bg-[#060B18]/90 border border-purple-500/25 p-4 sm:p-6 overflow-hidden flex flex-col justify-between shadow-[0_8px_32px_rgba(0,0,0,0.6),inset_0_0_40px_rgba(168,85,247,0.05)] select-none backdrop-blur-xl transition-all duration-500"
      style={{
        boxShadow: isIntensified
          ? '0 12px 40px rgba(0,0,0,0.7), inset 0 0 50px rgba(168,85,247,0.12), 0 0 30px rgba(99,102,241,0.2)'
          : '0 8px 32px rgba(0,0,0,0.6), inset 0 0 40px rgba(168,85,247,0.05)',
      }}
    >
      {/* ── CARD 1: Continuous Animated Border Tracing Overlay ── */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-30 overflow-visible"
        aria-hidden="true"
      >
        <defs>
          {/* Blue, purple, and subtle cyan traveling gradient */}
          <linearGradient id="visBorderTraceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00E5FF" />
            <stop offset="35%" stopColor="#3B82F6" />
            <stop offset="70%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#C084FC" />
          </linearGradient>

          {/* Soft atmospheric glow filter for the traveling line */}
          <filter id="visBorderTraceBlur" x="-30%" y="-30%" width="160%" height="160%">
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
          width={Math.max(0, dimensions.width - 3)}
          height={Math.max(0, dimensions.height - 3)}
          rx={cornerRadius}
          fill="none"
          stroke="url(#visBorderTraceGrad)"
          strokeWidth={isIntensified ? 5.5 : 3.8}
          strokeLinecap="round"
          pathLength={1000}
          strokeDasharray="210 790"
          filter="url(#visBorderTraceBlur)"
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
          width={Math.max(0, dimensions.width - 3)}
          height={Math.max(0, dimensions.height - 3)}
          rx={cornerRadius}
          fill="none"
          stroke="url(#visBorderTraceGrad)"
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

      {/* ── Soft Radial Backlight Glow Behind Selected Tool Node with Tool's Unique Accent Color ── */}
      <motion.div
        key={`selected-node-backlight-${selectedTool.id}`}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 0.5, scale: 1.25 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="absolute w-52 h-52 rounded-full pointer-events-none blur-[55px] -translate-x-1/2 -translate-y-1/2 z-0"
        style={{
          left: `${selectedTool.position.x}%`,
          top: `${selectedTool.position.y}%`,
          background: `radial-gradient(circle, ${selectedTool.accentColor} 0%, ${selectedTool.accentColor}30 45%, transparent 70%)`,
          transition: 'background 0.5s ease',
        }}
        aria-hidden="true"
      />

      {/* ── Faint Digital Grid Mesh inside card ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035] z-0"
        style={{
          backgroundImage:
            'radial-gradient(rgba(168, 85, 247, 0.5) 1px, transparent 1px), radial-gradient(rgba(0, 140, 255, 0.5) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
          backgroundPosition: '0 0, 18px 18px',
        }}
        aria-hidden="true"
      />

      {/* ── Top Bar: Category Filter Pills ── */}
      <div className="relative z-20 flex flex-wrap items-center gap-1.5 sm:gap-2 mb-2">
        {TOOL_CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-xs font-sans font-medium tracking-wide transition-all duration-300 cursor-pointer ${
                isSelected
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-[0_0_16px_rgba(168,85,247,0.4)] border border-purple-400/50 scale-[1.02]'
                  : 'bg-slate-900/70 hover:bg-slate-800/80 text-slate-300 hover:text-white border border-slate-700/50'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* ── Interactive Visualization Canvas: Floating Tool Nodes ── */}
      <div className="relative z-10 flex-1 w-full h-full min-h-[380px]">
        {/* Dynamic Constellation Lines connecting active tool to peers in the same category */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id={`toolConnGrad-${selectedTool.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={selectedTool.accentColor} stopOpacity="0.45" />
              <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.3" />
              <stop offset="100%" stopColor={selectedTool.accentColor} stopOpacity="0.15" />
            </linearGradient>
          </defs>

          {filteredTools
            .filter((t) => t.id !== selectedTool.id && t.category === selectedTool.category)
            .map((t) => {
              const x1 = (selectedTool.position.x / 100) * dimensions.width;
              const y1 = (selectedTool.position.y / 100) * (dimensions.height - 80) + 40;
              const x2 = (t.position.x / 100) * dimensions.width;
              const y2 = (t.position.y / 100) * (dimensions.height - 80) + 40;

              return (
                <line
                  key={`${selectedTool.id}-${t.id}`}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={`url(#toolConnGrad-${selectedTool.id})`}
                  strokeWidth="1.3"
                  strokeDasharray="4 4"
                  className="animate-pulse"
                />
              );
            })}
        </svg>

        {/* Circular Tool Nodes with Dynamic Tool-Specific Colors */}
        <AnimatePresence>
          {filteredTools.map((tool) => {
            const isSelected = tool.id === selectedTool.id;
            const isHoveredNode = tool.id === hoveredToolId;
            const p = floatParams[tool.id] || {
              ampX: 11,
              ampY: 9,
              freqX: 8.5,
              freqY: 7.5,
              phaseX: 0,
              phaseY: 0,
            };

            // Responsive node sizing
            const nodeSize =
              dimensions.width < 500
                ? Math.round(tool.size * 0.72)
                : dimensions.width < 768
                ? Math.round(tool.size * 0.84)
                : tool.size;

            return (
              <motion.div
                key={tool.id}
                animate={{
                  x: [
                    -p.ampX * 0.5,
                    p.ampX * 0.5,
                    p.ampX * 0.2,
                    -p.ampX * 0.4,
                    -p.ampX * 0.5,
                  ],
                  y: [
                    -p.ampY * 0.5,
                    p.ampY * 0.3,
                    -p.ampY * 0.6,
                    p.ampY * 0.5,
                    -p.ampY * 0.5,
                  ],
                }}
                transition={{
                  duration: p.freqX,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute"
                style={{
                  left: `${tool.position.x}%`,
                  top: `${tool.position.y}%`,
                  transform: 'translate(-50%, -50%)',
                  zIndex: isSelected ? 30 : isHoveredNode ? 25 : 10,
                }}
              >
                <motion.button
                  type="button"
                  onClick={() => onSelectTool(tool)}
                  onMouseEnter={() => setHoveredToolId(tool.id)}
                  onMouseLeave={() => setHoveredToolId(null)}
                  whileHover={{ scale: 1.14 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative rounded-full flex flex-col items-center justify-center p-2 text-center transition-all duration-300 cursor-pointer select-none"
                  style={{
                    width: `${nodeSize}px`,
                    height: `${nodeSize}px`,
                    background: isSelected
                      ? `radial-gradient(circle at 35% 35%, ${tool.accentColor}35 0%, rgba(10, 18, 42, 0.94) 80%)`
                      : 'radial-gradient(circle at 35% 35%, rgba(15, 23, 52, 0.9) 0%, rgba(6, 11, 24, 0.95) 100%)',
                    border: isSelected
                      ? `2px solid ${tool.accentColor}`
                      : isHoveredNode
                      ? `1.5px solid ${tool.accentColor}`
                      : '1.5px solid rgba(168, 85, 247, 0.25)',
                    boxShadow: isSelected
                      ? `0 0 32px ${tool.accentColor}90, 0 0 60px ${tool.accentColor}40`
                      : isHoveredNode
                      ? `0 0 24px ${tool.accentColor}55`
                      : 'none',
                    backdropFilter: 'blur(12px)',
                    transition: 'all 0.4s ease',
                  }}
                  aria-label={`Select ${tool.name}`}
                  aria-pressed={isSelected}
                >
                  {/* Active Outer Pulsing Glowing Ring with Assigned Tool Color */}
                  {isSelected && (
                    <motion.span
                      animate={{
                        scale: [1, 1.24, 1],
                        opacity: [0.9, 0.25, 0.9],
                      }}
                      transition={{
                        duration: 2.6,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                      className="absolute -inset-2 rounded-full pointer-events-none"
                      style={{
                        border: `1.5px solid ${tool.accentColor}`,
                        boxShadow: `0 0 20px ${tool.accentColor}, inset 0 0 10px ${tool.accentColor}50`,
                      }}
                    />
                  )}

                  {/* Tool Logo Image */}
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-md p-0.5 flex items-center justify-center shrink-0">
                    <img
                      src={tool.iconUrl}
                      alt={`${tool.name} logo`}
                      className={`w-full h-full object-contain transition-transform duration-300 ${
                        isSelected ? 'scale-110 drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]' : 'group-hover:scale-105'
                      }`}
                      loading="lazy"
                    />
                  </div>

                  {/* Node Tool Name */}
                  <span
                    className={`font-sans font-semibold tracking-tight leading-tight mt-1 transition-colors duration-300 px-1 text-center line-clamp-1 ${
                      nodeSize < 80 ? 'text-[9.5px]' : 'text-[11px]'
                    } ${
                      isSelected
                        ? 'text-white font-bold drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]'
                        : 'text-slate-200 group-hover:text-white'
                    }`}
                  >
                    {tool.name}
                  </span>

                  {/* Active Indicator Dot with Tool Accent Color */}
                  {isSelected && (
                    <span
                      className="absolute -bottom-1 w-2 h-2 rounded-full transition-all duration-300"
                      style={{
                        backgroundColor: tool.accentColor,
                        boxShadow: `0 0 10px ${tool.accentColor}`,
                      }}
                    />
                  )}
                </motion.button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* ── Bottom Status Bar ── */}
      <div className="relative z-20 flex items-center justify-between pt-2 border-t border-slate-800/60 text-[11px] font-mono text-slate-400">
        <span className="flex items-center gap-1.5">
          <span
            className="w-1.5 h-1.5 rounded-full animate-ping"
            style={{ backgroundColor: selectedTool.accentColor }}
          />
          <span className="text-slate-300">
            {filteredTools.length} of {ALL_TOOLS.length} Tools in view
          </span>
        </span>
        <span className="text-purple-300/80 hidden sm:inline">
          Click any circular node to inspect usage & capabilities
        </span>
      </div>
    </div>
  );
};

export default ToolsVisualization;
