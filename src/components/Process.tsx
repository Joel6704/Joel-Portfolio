import React from 'react';
import {
  Compass,
  Target,
  PencilRuler,
  Rocket,
  TrendingUp,
} from 'lucide-react';
import { processSteps } from '../data/portfolioData';

const getProcessIcon = (iconName: string) => {
  const props = { size: 22, style: { color: '#0066FF' } };
  switch (iconName) {
    case 'Compass':     return <Compass     {...props} />;
    case 'Target':      return <Target      {...props} />;
    case 'PencilRuler': return <PencilRuler {...props} />;
    case 'Rocket':      return <Rocket      {...props} />;
    case 'TrendingUp':  return <TrendingUp  {...props} />;
    default:            return <Compass     {...props} />;
  }
};

export const Process: React.FC = () => {
  return (
    <section
      id="process"
      className="py-28 relative"
      style={{ backgroundColor: '#050505', borderTop: '1px solid #172554' }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

        {/* Section tag */}
        <div className="section-tag mb-10">
          <span className="inline-block w-1 h-1 rounded-full" style={{ backgroundColor: '#0066FF' }} />
          My Creative Process
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start mb-16">
          <div>
            <h2 className="font-display text-[clamp(2.2rem,5vw,3.5rem)] font-bold text-ivory-200 leading-tight mb-4">
              From Idea to <span style={{ color: '#0066FF' }}>Impact</span>
            </h2>
            <div className="accent-line mb-6" />
            <p className="font-body text-silver-200 text-base leading-relaxed">
              A structured 5-phase methodology ensuring every campaign and outreach effort
              is grounded in audience understanding and continuous improvement.
            </p>
          </div>
        </div>

        {/* ── 5-step horizontal cards ── */}
        <div className="relative">
          {/* Desktop connector line */}
          <div
            className="hidden lg:block absolute top-9 left-9 right-9 h-px"
            style={{ background: 'linear-gradient(to right, #0066FF, #172554, #1E293B)' }}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 relative z-10">
            {processSteps.map((step) => (
              <div
                key={step.step}
                className="card-editorial p-5 group"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="skill-icon-box group-hover:border-[#0066FF] transition-colors">
                    {getProcessIcon(step.iconName)}
                  </div>
                  <span
                    className="font-heading text-[10px] font-bold tracking-[0.15em] uppercase"
                    style={{ color: '#0066FF' }}
                  >
                    {step.step}
                  </span>
                </div>

                <h3 className="section-heading-condensed text-base text-ivory-200 mb-2">
                  {step.title}
                </h3>
                <p className="font-body text-xs text-silver-300 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
