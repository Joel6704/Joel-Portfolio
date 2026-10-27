import React, { useEffect } from 'react';
import {
  X,
  CheckCircle2,
  Layers,
  ArrowRight,
  Info,
  ExternalLink,
} from 'lucide-react';
import type { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 backdrop-blur-md transition-opacity"
        style={{ background: 'rgba(5,5,5,0.85)' }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal card */}
      <div
        className="relative max-w-3xl w-full z-10 max-h-[90vh] flex flex-col overflow-hidden text-white rounded-xl"
        style={{
          background: '#0A1228',
          border: '1px solid #172554',
          boxShadow: '0 30px 80px rgba(0,0,0,0.95), 0 0 40px rgba(0, 102, 255, 0.15)',
        }}
      >
        {/* Modal Header */}
        <div
          className="p-6 sm:p-8 flex items-start justify-between gap-4"
          style={{ borderBottom: '1px solid #172554', background: '#060B18' }}
        >
          <div>
            <div className="flex items-center gap-2 mb-2">
              {project.categoryLink ? (
                <a
                  href={project.categoryLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-heading text-[10px] font-semibold tracking-[0.14em] uppercase px-2.5 py-1 rounded inline-flex items-center gap-1 hover:underline"
                  style={{ color: '#38BDF8', border: '1px solid rgba(0, 102, 255, 0.4)', background: 'rgba(0, 102, 255, 0.1)' }}
                  title="Open company LinkedIn"
                >
                  {project.categoryLabel}
                  <ExternalLink size={10} />
                </a>
              ) : (
                <span
                  className="font-heading text-[10px] font-semibold tracking-[0.14em] uppercase px-2.5 py-1 rounded"
                  style={{ color: '#38BDF8', border: '1px solid rgba(0, 102, 255, 0.4)', background: 'rgba(0, 102, 255, 0.1)' }}
                >
                  {project.categoryLabel}
                </span>
              )}
              {project.badge && (
                <span
                  className="font-body text-[11px] text-[#94A3B8] px-2.5 py-1 rounded"
                  style={{ border: '1px solid #172554', background: 'rgba(0, 102, 255, 0.05)' }}
                >
                  {project.badge}
                </span>
              )}
            </div>
            <h2
              id="modal-project-title"
              className="font-display text-xl sm:text-2xl font-bold text-white"
            >
              {project.title}
            </h2>
            <p className="font-body text-sm text-[#94A3B8] mt-1">{project.tagline}</p>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#94A3B8] hover:text-white transition-colors shrink-0 rounded"
            style={{ border: '1px solid #172554' }}
            aria-label="Close Case Study"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="p-6 sm:p-8 space-y-7 overflow-y-auto">

          {/* Media preview frame if imageUrl exists */}
          {project.imageUrl && (
            <div
              className="rounded-lg overflow-hidden p-3 bg-[#060B18]"
              style={{ border: '1px solid #172554' }}
            >
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#172554] text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#0066FF]" />
                  <span className="w-2 h-2 rounded-full bg-[#38BDF8]" />
                  <span className="w-2 h-2 rounded-full bg-[#172554]" />
                  <span className="font-heading text-[10px] tracking-wider uppercase text-[#94A3B8] ml-2">
                    Visual Showcase • {project.mockupDetails?.metricsValue || 'Deliverable Preview'}
                  </span>
                </div>
                {project.externalLink && (
                  <a
                    href={project.externalLink.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-heading text-[10px] tracking-wider uppercase text-[#38BDF8] hover:text-white transition-colors inline-flex items-center gap-1"
                  >
                    {project.externalLink.label || 'Open Live Project'} <ExternalLink size={11} />
                  </a>
                )}
              </div>
              <div className="max-h-[380px] overflow-hidden rounded-md border border-[#172554] bg-black">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
          )}

          {/* Asset info note */}
          <div
            className="p-4 rounded-lg flex items-start gap-3 font-body text-xs text-[#94A3B8]"
            style={{ border: '1px solid rgba(0, 102, 255, 0.3)', background: 'rgba(0, 102, 255, 0.08)' }}
          >
            <Info size={16} style={{ color: '#0066FF' }} className="shrink-0 mt-0.5" />
            <div>
              <strong className="font-semibold text-white block mb-0.5">
                Verified Deliverables
              </strong>
              This case study documents actual operational deliverables. You can replace the thumbnail
              with exported Canva carousels, Google Analytics charts, or live campaign graphics.
            </div>
          </div>

          {/* Visual deliverables box */}
          <div
            className="p-5 rounded-lg"
            style={{ background: '#060B18', border: '1px solid #172554' }}
          >
            <div className="flex items-center justify-between font-body text-xs text-[#94A3B8] mb-4">
              <span className="flex items-center gap-1.5">
                <Layers size={13} style={{ color: '#0066FF' }} />
                Deliverable Archetype
              </span>
              <span className="text-[#64748B]">{project.mockupDetails.sublabel}</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-3">
              {project.mockupDetails.highlights.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 text-center flex flex-col items-center justify-center min-h-[64px] rounded"
                  style={{ border: '1px solid #172554', background: 'rgba(0, 102, 255, 0.05)' }}
                >
                  <span className="font-heading text-[9px] tracking-[0.12em] uppercase text-[#64748B]">
                    Pillar 0{idx + 1}
                  </span>
                  <span className="font-body text-xs font-semibold text-white mt-1">{item}</span>
                </div>
              ))}
            </div>

            <div className="text-center pt-2">
              <span className="font-body text-xs text-[#94A3B8]">
                Deliverable Focus:{' '}
                <strong style={{ color: '#38BDF8' }}>{project.mockupDetails.metricsValue}</strong>
              </span>
            </div>
          </div>

          {/* Overview & Objective */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              { label: 'Project Overview', text: project.overview },
              { label: 'Primary Objective', text: project.objective },
            ].map(({ label, text }) => (
              <div key={label} className="p-5 rounded-lg" style={{ border: '1px solid #172554', background: 'rgba(6, 11, 24, 0.8)' }}>
                <h3
                  className="font-heading text-[10px] tracking-[0.14em] uppercase mb-2"
                  style={{ color: '#38BDF8' }}
                >
                  {label}
                </h3>
                <p className="font-body text-sm text-[#94A3B8] leading-relaxed">{text}</p>
              </div>
            ))}
          </div>

          {/* My Role */}
          <div>
            <h3
              className="section-heading-condensed text-sm text-white mb-2 flex items-center gap-2"
            >
              My Role & Ownership
            </h3>
            <div
              className="font-body text-sm text-[#94A3B8] p-4 rounded-lg"
              style={{ border: '1px solid rgba(0, 102, 255, 0.3)', background: 'rgba(0, 102, 255, 0.06)' }}
            >
              {project.role}
            </div>
          </div>

          {/* Strategy */}
          <div>
            <h3 className="section-heading-condensed text-sm text-white mb-3">
              Strategy & Execution
            </h3>
            <div className="space-y-2.5">
              {project.strategy.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 font-body text-sm text-[#94A3B8]">
                  <span
                    className="w-5 h-5 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5 rounded"
                    style={{ border: '1px solid rgba(0, 102, 255, 0.4)', color: '#38BDF8', background: 'rgba(0, 102, 255, 0.1)' }}
                  >
                    {idx + 1}
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Deliverables */}
          <div>
            <h3 className="section-heading-condensed text-sm text-white mb-3">
              Creative & Analytical Deliverables
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {project.deliverables.map((deliv, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 p-3 font-body text-sm text-white rounded-lg"
                  style={{ border: '1px solid #172554', background: 'rgba(6, 11, 24, 0.8)' }}
                >
                  <CheckCircle2 size={15} style={{ color: '#0066FF' }} className="shrink-0" />
                  <span>{deliv}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Outcome */}
          <div
            className="p-5 rounded-lg"
            style={{ background: 'rgba(0, 102, 255, 0.1)', border: '1px solid rgba(0, 102, 255, 0.35)' }}
          >
            <h3
              className="font-heading text-[10px] tracking-[0.14em] uppercase mb-2"
              style={{ color: '#38BDF8' }}
            >
              Verified Operational Outcome
            </h3>
            <p className="font-body text-sm text-white leading-relaxed font-medium">
              {project.outcome}
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div
          className="p-6 flex flex-wrap items-center justify-between gap-3"
          style={{ borderTop: '1px solid #172554', background: '#060B18' }}
        >
          <button
            onClick={onClose}
            className="font-heading text-[11px] tracking-[0.12em] uppercase text-[#94A3B8] hover:text-white transition-colors px-4 py-2 rounded"
            style={{ border: '1px solid #172554' }}
          >
            Close
          </button>
          <div className="flex flex-wrap items-center gap-3">
            {project.externalLink && (
              <a
                href={project.externalLink.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-blue inline-flex items-center gap-2 px-5 py-2.5 font-heading text-[11px] font-semibold tracking-[0.12em] uppercase rounded-lg shadow-[0_4px_15px_rgba(0,102,255,0.4)]"
              >
                <ExternalLink size={13} />
                {project.externalLink.label}
              </a>
            )}
            {project.pdfUrl && (
              <a
                href={project.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 font-heading text-[11px] font-semibold tracking-[0.12em] uppercase rounded-lg border border-emerald-500/40 hover:border-emerald-400 bg-emerald-950/40 hover:bg-emerald-900/60 text-emerald-300 hover:text-white transition-all shadow-[0_0_15px_rgba(16,185,129,0.2)]"
              >
                <ExternalLink size={13} />
                Open PDF Directly
              </a>
            )}
            <a
              href="#contact"
              onClick={onClose}
              className="inline-flex items-center gap-2 px-5 py-2.5 font-heading text-[11px] font-semibold tracking-[0.12em] uppercase rounded-lg border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 text-white transition-all"
            >
              Discuss Similar Project
              <ArrowRight size={13} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
