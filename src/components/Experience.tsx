import React from 'react';
import {
  Calendar,
  CheckCircle2,
  Building2,
} from 'lucide-react';
import { experiences } from '../data/portfolioData';

export const Experience: React.FC = () => {
  return (
    <section
      id="experience"
      className="py-28 relative"
      style={{ backgroundColor: '#0A1228', borderTop: '1px solid #172554' }}
    >
      {/* Ambient glow */}
      <div
        className="absolute top-0 left-0 w-[400px] h-[400px] pointer-events-none"
        aria-hidden="true"
        style={{ background: 'radial-gradient(circle, rgba(0,102,255,0.06) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">

        {/* Section tag */}
        <div className="section-tag mb-10">
          <span className="inline-block w-1 h-1 rounded-full" style={{ backgroundColor: '#0066FF' }} />
          Career Timeline
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start mb-16">
          <div>
            <h2 className="font-display text-[clamp(2.2rem,5vw,3.5rem)] font-bold text-ivory-200 leading-tight mb-4">
              My Professional <span style={{ color: '#0066FF' }}>Journey</span>
            </h2>
            <div className="accent-line mb-6" />
            <p className="font-body text-silver-200 text-base leading-relaxed">
              Documented roles across business development, education marketing,
              student enrollment campaigns, and digital marketing agency operations.
            </p>
          </div>
        </div>

        {/* ── Vertical Timeline ── */}
        <div className="relative pl-8 sm:pl-12 space-y-10">

          {/* Vertical line */}
          <div
            className="absolute left-3 sm:left-4 top-2 bottom-2 w-px"
            style={{ background: 'linear-gradient(to bottom, #0066FF 0%, #172554 60%, transparent 100%)' }}
          />

          {experiences.map((exp) => (
            <div key={exp.id} className="relative group">

              {/* Timeline dot */}
              <div
                className="absolute -left-[29px] sm:-left-[41px] top-6 w-4 h-4 flex items-center justify-center"
                style={{
                  background: '#050505',
                  border: '2px solid #0066FF',
                  boxShadow: '0 0 10px rgba(0,102,255,0.4)',
                }}
              >
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#0066FF' }} />
              </div>

              {/* Experience card */}
              <div
                className="card-editorial p-6 sm:p-8"
                style={exp.isCurrent ? { borderColor: 'rgba(0,102,255,0.4)' } : {}}
              >
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 pb-6 mb-6" style={{ borderBottom: '1px solid #1E293B' }}>

                  <div className="flex items-start gap-4">
                    <div className="skill-icon-box shrink-0 mt-0.5">
                      <Building2 size={20} style={{ color: '#0066FF' }} />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2.5 mb-1">
                        <h3 className="font-heading text-lg sm:text-xl font-semibold tracking-wide text-ivory-200 uppercase">
                          {exp.role}
                        </h3>
                        {exp.isCurrent && (
                          <span
                            className="inline-flex items-center gap-1.5 px-2.5 py-0.5 font-body text-[10px] font-semibold"
                            style={{
                              background: 'rgba(0,102,255,0.15)',
                              border: '1px solid rgba(0,102,255,0.4)',
                              color: '#d94040',
                            }}
                          >
                            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: '#0066FF' }} />
                            Current Role
                          </span>
                        )}
                      </div>
                      <div className="font-body text-sm font-semibold" style={{ color: '#0066FF' }}>
                        {exp.company}
                      </div>
                    </div>
                  </div>

                  {/* Date badge */}
                  <div
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 self-start font-body text-xs text-silver-300"
                    style={{ border: '1px solid #172554', background: 'rgba(5,5,5,0.8)' }}
                  >
                    <Calendar size={13} style={{ color: '#0066FF' }} />
                    {exp.period}
                  </div>
                </div>

                {/* Responsibilities */}
                <ul className="space-y-3 mb-6">
                  {exp.responsibilities.map((resp, rIdx) => (
                    <li key={rIdx} className="flex items-start gap-3 font-body text-sm text-silver-200 leading-relaxed">
                      <CheckCircle2 size={16} className="shrink-0 mt-0.5" style={{ color: '#0066FF' }} />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-4" style={{ borderTop: '1px solid #1E293B' }}>
                  {exp.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="font-body text-[11px] font-medium px-2.5 py-1 text-silver-300"
                      style={{ border: '1px solid #172554', background: 'rgba(22,0,0,0.4)' }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
