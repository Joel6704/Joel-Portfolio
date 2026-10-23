import React, { useState } from 'react';
import {
  GraduationCap,
  Briefcase,
  Calendar,
  Award,
  CheckCircle2,
  Eye,
} from 'lucide-react';
import { educationList, experiences } from '../data/portfolioData';
import { CertificateModal } from './CertificateModal';

export const EducationExperience: React.FC = () => {
  const [selectedCertificate, setSelectedCertificate] = useState<{
    title: string;
    subtitle?: string;
    imageSrc: string;
    downloadSrc?: string;
  } | null>(null);
  return (
    <section
      id="experience"
      className="py-24 sm:py-28 relative"
      style={{ backgroundColor: '#060B18', borderTop: '1px solid #172554' }}
    >
      {/* Subtle royal blue ambient glow */}
      <div
        className="absolute top-1/3 right-10 w-[500px] h-[500px] pointer-events-none"
        aria-hidden="true"
        style={{
          background: 'radial-gradient(circle, rgba(0, 102, 255, 0.08) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">

        {/* Section tag */}
        <div className="section-tag mb-8 self-start">
          <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#0066FF', boxShadow: '0 0 8px #0066FF' }} />
          <span>Academic & Professional Path</span>
        </div>

        {/* Main Section Header */}
        <div className="mb-16">
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-wide text-white mb-2">
            EDUCATION & <span style={{ color: '#0066FF' }}>EXPERIENCE</span>
          </h2>
          <div className="w-20 h-[2px] mb-5" style={{ backgroundColor: '#0066FF' }} />
          <p className="font-body text-[#94A3B8] text-sm sm:text-base leading-relaxed max-w-3xl">
            A professional journey of academic achievements, industry experience, and continuous learning.
          </p>
        </div>

        {/* ════════════════════════════════════════════════════════
            SUBSECTION A: EDUCATION (Appears First)
            ════════════════════════════════════════════════════════ */}
        <div className="mb-20">
          {/* Dedicated Education Heading */}
          <div className="flex items-center gap-3.5 mb-10 pb-4 border-b border-[#172554]">
            <div
              className="w-9 h-9 rounded-sm flex items-center justify-center shrink-0"
              style={{
                border: '1px solid #0066FF',
                background: 'rgba(0, 102, 255, 0.1)',
                color: '#0066FF',
              }}
            >
              <GraduationCap size={18} />
            </div>
            <div>
              <h3 className="font-heading text-xl sm:text-2xl font-bold uppercase tracking-wider text-white">
                EDUCATION
              </h3>
              <p className="font-body text-xs text-[#94A3B8]">
                Academic degrees, technical foundations, and specialized certifications
              </p>
            </div>
          </div>

          {/* Education Vertical Timeline */}
          <div className="relative pl-6 sm:pl-10 space-y-8">
            {/* Thin blue vertical timeline line */}
            <div
              className="absolute left-[7px] sm:left-[11px] top-3 bottom-3 w-[1.5px]"
              style={{
                background: 'linear-gradient(to bottom, #0066FF 0%, #0047BA 50%, #172554 100%)',
              }}
            />

            {educationList.map((edu) => (
              <div key={edu.id} className="relative group">
                {/* Small blue circular marker */}
                <div
                  className="absolute -left-[23px] sm:-left-[27px] top-2.5 w-3 h-3 rounded-full transition-transform duration-200 group-hover:scale-125"
                  style={{
                    backgroundColor: '#0066FF',
                    border: '2px solid #060B18',
                    boxShadow: '0 0 10px rgba(0, 102, 255, 0.8)',
                  }}
                />

                {/* Timeline Card */}
                <div
                  className="p-6 sm:p-7 rounded-md transition-all duration-300 group"
                  style={{
                    background: '#0A1228',
                    border: '1px solid #172554',
                    boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.7)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#0066FF';
                    e.currentTarget.style.boxShadow = '0 12px 28px -5px rgba(0, 0, 0, 0.85), 0 0 15px rgba(0, 102, 255, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#172554';
                    e.currentTarget.style.boxShadow = '0 4px 20px -2px rgba(0, 0, 0, 0.7)';
                  }}
                >
                  {/* Top metadata: Date & Status */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-2.5">
                    {/* Blue date */}
                    <span className="font-heading text-xs font-semibold tracking-wider uppercase text-[#38BDF8] inline-flex items-center gap-1.5">
                      <Calendar size={13} />
                      {edu.period}
                    </span>

                    {/* Status Pill */}
                    <span
                      className="px-2.5 py-0.5 font-heading text-[10px] font-semibold uppercase tracking-wider rounded-xs inline-flex items-center gap-1.5"
                      style={
                        edu.status === 'Completed'
                          ? {
                            background: 'rgba(34, 197, 94, 0.15)',
                            border: '1px solid rgba(34, 197, 94, 0.4)',
                            color: '#86efac',
                          }
                          : {
                            background: 'rgba(0, 102, 255, 0.15)',
                            border: '1px solid rgba(0, 102, 255, 0.4)',
                            color: '#93c5fd',
                          }
                      }
                    >
                      {edu.status === 'Completed' ? (
                        <>
                          <CheckCircle2 size={11} />
                          Completed
                        </>
                      ) : (
                        <>
                          <span className="w-1.5 h-1.5 rounded-full animate-pulse bg-[#0066FF]" />
                          Ongoing Learning
                        </>
                      )}
                    </span>
                  </div>

                  {/* Qualification Title (White) */}
                  <h4 className="font-heading text-lg sm:text-xl font-semibold uppercase tracking-wide text-white mb-1 group-hover:text-[#38BDF8] transition-colors">
                    {edu.degree}
                  </h4>

                  {/* Institution Name */}
                  <p className="font-body text-xs sm:text-sm font-medium text-[#94A3B8] mb-3 flex items-center gap-1.5">
                    <GraduationCap size={14} style={{ color: '#0066FF' }} />
                    {edu.institution}
                  </p>

                  {/* Certification Badge if present */}
                  {edu.certification && (
                    <div
                      className="inline-flex items-center gap-1.5 px-3 py-1 font-body text-xs mb-3.5 rounded-xs"
                      style={{
                        background: 'rgba(0, 102, 255, 0.12)',
                        border: '1px solid rgba(0, 102, 255, 0.35)',
                        color: '#F8FAFC',
                      }}
                    >
                      <Award size={13} style={{ color: '#0066FF' }} />
                      <span className="font-medium">{edu.certification}</span>
                    </div>
                  )}

                  {/* Short Description (Light-grey) */}
                  <p className="font-body text-xs sm:text-sm text-[#94A3B8] leading-relaxed mb-4">
                    {edu.details}
                  </p>

                  {/* View Certificate Button (Only for entries with certificateImage) */}
                  {edu.certificateImage && (
                    <div className="mb-4">
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedCertificate({
                            title: edu.certificateTitle || edu.degree,
                            subtitle: edu.certificateSubtitle,
                            imageSrc: edu.certificateImage!,
                            downloadSrc: edu.certificateImage,
                          })
                        }
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded font-body text-xs font-medium text-[#38BDF8] hover:text-white bg-[#0066FF]/10 hover:bg-[#0066FF]/20 border border-[#0066FF]/50 hover:border-[#38BDF8] shadow-[0_0_12px_rgba(0,102,255,0.15)] hover:shadow-[0_0_16px_rgba(56,189,248,0.35)] transition-all duration-200 cursor-pointer group/btn"
                        title="View Certificate"
                      >
                        <Eye size={13} className="text-[#38BDF8] group-hover/btn:scale-110 transition-transform" />
                        <span>View Certificate</span>
                      </button>
                    </div>
                  )}

                  {/* Focus Area Tags */}
                  {edu.focusAreas && edu.focusAreas.length > 0 && (
                    <div className="pt-3 border-t border-[#172554] flex flex-wrap gap-2">
                      {edu.focusAreas.map((area, aIdx) => (
                        <span
                          key={aIdx}
                          className="font-body text-[11px] px-2.5 py-0.5 rounded-xs text-[#94A3B8]"
                          style={{
                            background: 'rgba(0, 102, 255, 0.08)',
                            border: '1px solid #172554',
                          }}
                        >
                          #{area}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Subtle Section Separator between Education and Experience */}
        <div className="w-full border-t border-[#172554] my-16" />

        {/* ════════════════════════════════════════════════════════
            SUBSECTION B: PROFESSIONAL EXPERIENCE (Appears Second)
            ════════════════════════════════════════════════════════ */}
        <div>
          {/* Dedicated Professional Experience Heading */}
          <div className="flex items-center gap-3.5 mb-10 pb-4 border-b border-[#172554]">
            <div
              className="w-9 h-9 rounded-sm flex items-center justify-center shrink-0"
              style={{
                border: '1px solid #0066FF',
                background: 'rgba(0, 102, 255, 0.1)',
                color: '#0066FF',
              }}
            >
              <Briefcase size={18} />
            </div>
            <div>
              <h3 className="font-heading text-xl sm:text-2xl font-bold uppercase tracking-wider text-white">
                PROFESSIONAL EXPERIENCE
              </h3>
              <p className="font-body text-xs text-[#94A3B8]">
                Full-time roles, marketing campaigns, and agency internships
              </p>
            </div>
          </div>

          {/* Professional Experience Vertical Timeline */}
          <div className="relative pl-6 sm:pl-10 space-y-8">
            {/* Thin blue vertical timeline line */}
            <div
              className="absolute left-[7px] sm:left-[11px] top-3 bottom-3 w-[1.5px]"
              style={{
                background: 'linear-gradient(to bottom, #0066FF 0%, #0047BA 60%, #172554 100%)',
              }}
            />

            {experiences.map((exp) => (
              <div key={exp.id} className="relative group">
                {/* Small blue circular marker */}
                <div
                  className="absolute -left-[23px] sm:-left-[27px] top-2.5 w-3 h-3 rounded-full transition-transform duration-200 group-hover:scale-125"
                  style={{
                    backgroundColor: '#0066FF',
                    border: '2px solid #060B18',
                    boxShadow: '0 0 10px rgba(0, 102, 255, 0.8)',
                  }}
                />

                {/* Timeline Card */}
                <div
                  className="p-6 sm:p-7 rounded-md transition-all duration-300 group"
                  style={{
                    background: '#0A1228',
                    border: '1px solid #172554',
                    boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.7)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#0066FF';
                    e.currentTarget.style.boxShadow = '0 12px 28px -5px rgba(0, 0, 0, 0.85), 0 0 15px rgba(0, 102, 255, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#172554';
                    e.currentTarget.style.boxShadow = '0 4px 20px -2px rgba(0, 0, 0, 0.7)';
                  }}
                >
                  {/* Top metadata: Date & Role Status */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-2.5">
                    {/* Blue date */}
                    <span className="font-heading text-xs font-semibold tracking-wider uppercase text-[#38BDF8] inline-flex items-center gap-1.5">
                      <Calendar size={13} />
                      {exp.period}
                    </span>

                    {/* Current Role badge */}
                    {exp.isCurrent && (
                      <span
                        className="px-2.5 py-0.5 font-heading text-[10px] font-semibold uppercase tracking-wider rounded-xs inline-flex items-center gap-1.5"
                        style={{
                          background: 'rgba(0, 102, 255, 0.18)',
                          border: '1px solid rgba(0, 102, 255, 0.45)',
                          color: '#F8FAFC',
                        }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full animate-pulse bg-[#0066FF]" />
                        Current Role
                      </span>
                    )}
                  </div>

                  {/* Job Title (White) */}
                  <h4 className="font-heading text-lg sm:text-xl font-semibold uppercase tracking-wide text-white mb-1 group-hover:text-[#38BDF8] transition-colors">
                    {exp.role}
                  </h4>

                  {/* Company Name */}
                  <p className="font-body text-xs sm:text-sm font-medium text-[#94A3B8] mb-4 flex items-center gap-1.5">
                    <Briefcase size={14} style={{ color: '#0066FF' }} />
                    {exp.company}
                  </p>

                  {/* Responsibilities list (Light-grey descriptions) */}
                  <ul className="space-y-2 mb-4">
                    {exp.responsibilities.map((resp, rIdx) => (
                      <li key={rIdx} className="font-body text-xs sm:text-sm text-[#94A3B8] leading-relaxed flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF] mt-2 shrink-0 shadow-[0_0_6px_#0066FF]" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Relevant Tags */}
                  {exp.tags && exp.tags.length > 0 && (
                    <div className="pt-3 border-t border-[#172554] flex flex-wrap gap-2">
                      {exp.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="font-body text-[11px] px-2.5 py-0.5 rounded-xs text-[#94A3B8]"
                          style={{
                            background: 'rgba(0, 102, 255, 0.08)',
                            border: '1px solid #172554',
                          }}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Certificate Lightbox Modal */}
      <CertificateModal
        isOpen={!!selectedCertificate}
        onClose={() => setSelectedCertificate(null)}
        imageSrc={selectedCertificate?.imageSrc || ''}
        title={selectedCertificate?.title || ''}
        subtitle={selectedCertificate?.subtitle}
        downloadSrc={selectedCertificate?.downloadSrc}
      />
    </section>
  );
};
