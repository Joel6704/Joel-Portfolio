import React from 'react';
import {
  Award,
  Calendar,
  CheckCircle2,
  BookOpen,
} from 'lucide-react';
import { educationList } from '../data/portfolioData';

export const Education: React.FC = () => {
  return (
    <section
      id="education"
      className="py-28 relative"
      style={{ backgroundColor: '#050505', borderTop: '1px solid #172554' }}
    >
      {/* Ambient glow */}
      <div
        className="absolute bottom-0 right-0 w-[400px] h-[400px] pointer-events-none"
        aria-hidden="true"
        style={{ background: 'radial-gradient(circle, rgba(22,0,0,0.7) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">

        {/* Section tag */}
        <div className="section-tag mb-10">
          <span className="inline-block w-1 h-1 rounded-full" style={{ backgroundColor: '#0066FF' }} />
          Education & Learning
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start mb-16">
          <div>
            <h2 className="font-display text-[clamp(2.2rem,5vw,3.5rem)] font-bold text-ivory-200 leading-tight mb-4">
              Academic <span style={{ color: '#0066FF' }}>Foundation</span>
            </h2>
            <div className="accent-line mb-6" />
            <p className="font-body text-silver-200 text-base leading-relaxed">
              Formal foundations in Computer Applications, certified training in modern AI-driven
              marketing strategies, and ongoing cloud computing studies.
            </p>
          </div>
        </div>

        {/* ── Education Cards ── */}
        {/* Two-column layout: Left = main degree, Right = certifications */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Main degree card — wider */}
          <div className="lg:col-span-5">
            {educationList.filter((e) => e.id === 'bca').map((item) => (
              <div
                key={item.id}
                className="card-editorial p-7 h-full"
              >
                <div className="flex items-center justify-between gap-3 mb-5">
                  <div
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 font-body text-[11px] font-semibold"
                    style={{
                      background: 'rgba(34,87,34,0.12)',
                      border: '1px solid rgba(46,116,46,0.3)',
                      color: '#86c786',
                    }}
                  >
                    <CheckCircle2 size={11} />
                    Completed
                  </div>
                  <div className="flex items-center gap-1 font-body text-xs text-silver-400">
                    <Calendar size={12} style={{ color: '#0066FF' }} />
                    {item.period}
                  </div>
                </div>

                <BookOpen size={24} className="mb-4" style={{ color: '#0066FF' }} />

                <h3 className="font-display text-xl font-bold text-ivory-200 leading-snug mb-2">
                  {item.degree}
                </h3>
                <p className="font-body text-sm font-semibold mb-4" style={{ color: '#0066FF' }}>
                  {item.institution}
                </p>
                <p className="font-body text-sm text-silver-300 leading-relaxed mb-5">
                  {item.details}
                </p>

                {item.focusAreas && (
                  <div className="pt-5" style={{ borderTop: '1px solid #1E293B' }}>
                    <div className="font-heading text-[10px] tracking-[0.15em] uppercase text-silver-500 mb-3">
                      Focus Areas
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {item.focusAreas.map((area, i) => (
                        <span
                          key={i}
                          className="font-body text-xs px-2.5 py-1 text-silver-300"
                          style={{ border: '1px solid #172554', background: 'rgba(22,0,0,0.4)' }}
                        >
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Certifications + Ongoing — right column */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {educationList.filter((e) => e.id !== 'bca').map((item) => (
              <div
                key={item.id}
                className="card-editorial p-7"
                style={item.status === 'Ongoing Learning' ? { borderColor: 'rgba(0,102,255,0.4)' } : {}}
              >
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 font-body text-[11px] font-semibold ${
                      item.status === 'Ongoing Learning'
                        ? ''
                        : ''
                    }`}
                    style={
                      item.status === 'Ongoing Learning'
                        ? {
                            background: 'rgba(0,102,255,0.15)',
                            border: '1px solid rgba(0,102,255,0.4)',
                            color: '#d94040',
                          }
                        : {
                            background: 'rgba(34,87,34,0.12)',
                            border: '1px solid rgba(46,116,46,0.3)',
                            color: '#86c786',
                          }
                    }
                  >
                    {item.status === 'Ongoing Learning' ? (
                      <>
                        <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: '#0066FF' }} />
                        Ongoing
                      </>
                    ) : (
                      <>
                        <CheckCircle2 size={11} />
                        Completed
                      </>
                    )}
                  </div>
                  <div className="flex items-center gap-1 font-body text-xs text-silver-400">
                    <Calendar size={12} style={{ color: '#0066FF' }} />
                    {item.period}
                  </div>
                </div>

                <h3 className="font-display text-lg font-bold text-ivory-200 leading-snug mb-1">
                  {item.degree}
                </h3>
                <p className="font-body text-sm font-semibold mb-3" style={{ color: '#0066FF' }}>
                  {item.institution}
                </p>

                {item.certification && (
                  <div
                    className="inline-flex items-center gap-2 px-3 py-1.5 font-body text-xs mb-4"
                    style={{
                      background: 'rgba(0,102,255,0.1)',
                      border: '1px solid rgba(0,102,255,0.3)',
                      color: '#d94040',
                    }}
                  >
                    <Award size={13} />
                    {item.certification}
                  </div>
                )}

                <p className="font-body text-sm text-silver-300 leading-relaxed mb-4">
                  {item.details}
                </p>

                {item.focusAreas && (
                  <div className="flex flex-wrap gap-2 pt-4" style={{ borderTop: '1px solid #1E293B' }}>
                    {item.focusAreas.map((area, i) => (
                      <span
                        key={i}
                        className="font-body text-xs px-2.5 py-1 text-silver-300"
                        style={{ border: '1px solid #172554', background: 'rgba(22,0,0,0.4)' }}
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
