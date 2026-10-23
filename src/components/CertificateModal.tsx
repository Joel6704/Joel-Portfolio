import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ZoomOut, RotateCcw, ExternalLink, Award, Download } from 'lucide-react';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  title: string;
  subtitle?: string;
  downloadSrc?: string;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  imageSrc,
  title,
  subtitle,
  downloadSrc,
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
      setZoomLevel(1);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.35, 2.5));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.35, 0.8));
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-hidden select-none"
          role="dialog"
          aria-modal="true"
          aria-label={title}
        >
          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 15 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl bg-[#060D24] border border-[#008CFF]/40 shadow-[0_0_50px_rgba(0,140,255,0.35),0_25px_50px_-12px_rgba(0,0,0,0.9)] overflow-hidden"
          >
            {/* Header Bar */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-[#172554] bg-[#030712]/90 backdrop-blur-md shrink-0">
              <div className="flex items-center gap-2.5 sm:gap-3 overflow-hidden">
                <div className="w-8 h-8 rounded-lg bg-[#008CFF]/15 border border-[#008CFF]/40 flex items-center justify-center text-[#00E5FF] shrink-0 shadow-[0_0_12px_rgba(0,229,255,0.3)]">
                  <Award size={16} />
                </div>
                <div className="flex flex-col truncate">
                  <h3 className="font-space font-bold text-sm sm:text-base text-white truncate">
                    {title}
                  </h3>
                  <span className="font-space text-[10px] sm:text-xs text-[#7DD3FC] truncate">
                    {subtitle}
                  </span>
                </div>
              </div>

              {/* Action Controls & Close Button */}
              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                {/* Zoom Out */}
                <button
                  onClick={handleZoomOut}
                  disabled={zoomLevel <= 0.8}
                  className="p-1.5 sm:p-2 rounded-lg bg-[#060D20] border border-[#172554] text-[#94A3B8] hover:text-white hover:border-[#008CFF] disabled:opacity-40 transition-colors"
                  title="Zoom Out"
                  aria-label="Zoom Out"
                >
                  <ZoomOut size={16} />
                </button>

                {/* Reset Zoom */}
                <button
                  onClick={handleResetZoom}
                  className="px-2 py-1 sm:py-1.5 rounded-lg bg-[#060D20] border border-[#172554] font-space text-[11px] text-[#94A3B8] hover:text-white hover:border-[#008CFF] transition-colors inline-flex items-center gap-1"
                  title="Reset Zoom (100%)"
                  aria-label="Reset Zoom"
                >
                  <RotateCcw size={12} />
                  <span>{Math.round(zoomLevel * 100)}%</span>
                </button>

                {/* Zoom In */}
                <button
                  onClick={handleZoomIn}
                  disabled={zoomLevel >= 2.5}
                  className="p-1.5 sm:p-2 rounded-lg bg-[#060D20] border border-[#172554] text-[#94A3B8] hover:text-white hover:border-[#008CFF] disabled:opacity-40 transition-colors"
                  title="Zoom In"
                  aria-label="Zoom In"
                >
                  <ZoomIn size={16} />
                </button>

                {/* Download Button (when downloadSrc is provided) */}
                {downloadSrc && (
                  <a
                    href={downloadSrc}
                    download
                    className="p-1.5 sm:p-2 rounded-lg bg-[#060D20] border border-[#172554] text-[#94A3B8] hover:text-[#86efac] hover:border-green-500/60 transition-colors"
                    title="Download Certificate"
                    aria-label="Download certificate"
                  >
                    <Download size={16} />
                  </a>
                )}

                {/* Open In New Tab */}
                <a
                  href={imageSrc}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 sm:p-2 rounded-lg bg-[#060D20] border border-[#172554] text-[#94A3B8] hover:text-white hover:border-[#008CFF] transition-colors"
                  title="Open Original Image"
                  aria-label="Open original image in new tab"
                >
                  <ExternalLink size={16} />
                </a>

                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="p-1.5 sm:p-2 ml-1 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 hover:text-white hover:bg-red-500/25 transition-colors focus:outline-none"
                  title="Close (Esc)"
                  aria-label="Close certificate modal"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Certificate Display Area */}
            <div className="relative flex-1 overflow-auto p-3 sm:p-6 flex items-center justify-center bg-[#020612]/95 min-h-[300px]">
              <div
                className="transition-transform duration-200 ease-out origin-center"
                style={{
                  transform: `scale(${zoomLevel})`,
                  cursor: zoomLevel > 1 ? 'grab' : 'zoom-in',
                }}
                onClick={() => {
                  if (zoomLevel === 1) handleZoomIn();
                }}
              >
                <img
                  src={imageSrc}
                  alt={title}
                  className="max-h-[75vh] w-auto max-w-full object-contain rounded-lg shadow-2xl border border-white/10"
                  draggable={false}
                />
              </div>
            </div>

            {/* Footer with Hint */}
            <div className="px-4 py-2 border-t border-[#172554] bg-[#030712]/80 flex items-center justify-between text-[11px] font-space text-[#94A3B8]">
              <span>Click image or buttons to zoom in/out</span>
              <span className="hidden sm:inline">Press Esc or click outside to close</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
