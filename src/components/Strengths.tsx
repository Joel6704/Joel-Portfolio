import React from 'react';
import {
  Lightbulb,
  MessageSquare,
  LineChart,
  Users,
  Clock,
  GraduationCap,
} from 'lucide-react';
import { personalStrengths } from '../data/portfolioData';

const getStrengthIcon = (iconName: string) => {
  const props = { size: 22, style: { color: '#0066FF' } };
  switch (iconName) {
    case 'Lightbulb':     return <Lightbulb     {...props} />;
    case 'MessageSquare': return <MessageSquare {...props} />;
    case 'LineChart':     return <LineChart     {...props} />;
    case 'Users':         return <Users         {...props} />;
    case 'Clock':         return <Clock         {...props} />;
    case 'GraduationCap': return <GraduationCap {...props} />;
    default:              return <Lightbulb     {...props} />;
  }
};

export const Strengths: React.FC = () => {
  return (
    <section
      id="strengths"
      className="py-28 relative"
      style={{ backgroundColor: '#0A1228', borderTop: '1px solid #172554' }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

        {/* Section tag */}
        <div className="section-tag mb-10">
          <span className="inline-block w-1 h-1 rounded-full" style={{ backgroundColor: '#0066FF' }} />
          Personal Strengths
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start mb-16">
          <div>
            <h2 className="font-display text-[clamp(2.2rem,5vw,3.5rem)] font-bold text-ivory-200 leading-tight mb-4">
              Beyond the <span style={{ color: '#0066FF' }}>Job Title</span>
            </h2>
            <div className="accent-line mb-6" />
            <p className="font-body text-silver-200 text-base leading-relaxed">
              The core work ethic, analytical rigor, and collaborative mindset that guide my daily
              contributions and campaign outcomes.
            </p>
          </div>
        </div>

        {/* 6 Strengths Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {personalStrengths.map((item, idx) => (
            <div
              key={idx}
              className="card-editorial p-6 group"
            >
              <div className="skill-icon-box mb-4 group-hover:border-[#0066FF] transition-colors">
                {getStrengthIcon(item.iconName)}
              </div>
              <h3 className="section-heading-condensed text-base text-ivory-200 mb-2">
                {item.title}
              </h3>
              <p className="font-body text-sm text-silver-300 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
