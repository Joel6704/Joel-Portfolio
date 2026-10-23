import React from 'react';
import {
  Briefcase,
  Sparkles,
  LineChart,
  Cpu,
  Layers,
  CheckCircle,
} from 'lucide-react';
import { skillCategories } from '../data/portfolioData';

// Tools data (separate from skill categories)
const tools = [
  'CapCut',
  'Google Analytics',
  'Alight Motion',
  'Rank Math',
  'Ahrefs',
  'ChatGPT',
  'Claude',
  'Gemini',
  'Perplexity',
  'Antigravity',
  'Visual Studio Code',
  'Framer',
  'GitHub',
  'Microsoft Azure',
  'Wix',
  'Canva',
  'WordPress',
  'Semrush',
  'Mailchimp',
];

const getCategoryIcon = (iconName: string) => {
  const props = { size: 22, style: { color: '#0066FF' } };
  switch (iconName) {
    case 'Briefcase':  return <Briefcase  {...props} />;
    case 'Sparkles':   return <Sparkles   {...props} />;
    case 'LineChart':  return <LineChart  {...props} />;
    case 'Cpu':        return <Cpu        {...props} />;
    default:           return <Layers     {...props} />;
  }
};

export const Skills: React.FC = () => {
  return (
    <section
      id="skills"
      className="py-28 relative"
      style={{ backgroundColor: '#050505', borderTop: '1px solid #172554' }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

        {/* ── Section Header ── */}
        <div className="section-tag mb-10">
          <span className="inline-block w-1 h-1 rounded-full" style={{ backgroundColor: '#0066FF' }} />
          Skills & Expertise
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 mb-20">

          {/* Left: Section title + description */}
          <div>
            <h2 className="font-display text-[clamp(2.2rem,5vw,3.5rem)] font-bold text-ivory-200 leading-tight mb-4">
              My <span style={{ color: '#0066FF' }}>Expertise</span>
            </h2>
            <div className="accent-line mb-6" />
            <p className="font-body text-silver-200 text-base leading-relaxed">
              Spanning strategic business development, social media optimization,
              search engine visibility, performance analytics, and modern AI/cloud fundamentals.
            </p>
          </div>

          {/* Right: Empty or decorative stat */}
          <div className="flex items-end">
            <div
              className="w-full p-6"
              style={{ background: '#0A1228', border: '1px solid #172554' }}
            >
              <div className="font-heading text-[10px] tracking-[0.18em] uppercase mb-2" style={{ color: '#0066FF' }}>
                Professional Focus
              </div>
              <div className="font-display text-lg font-semibold text-ivory-200 leading-snug">
                Digital Marketing • Business Development • SEO & Analytics
              </div>
            </div>
          </div>
        </div>

        {/* ── 4 Skill Category Cards in 2x2 Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {skillCategories.map((cat, idx) => (
            <div
              key={idx}
              className="card-editorial p-7 group"
            >
              {/* Header */}
              <div className="flex items-center gap-4 mb-5 pb-5" style={{ borderBottom: '1px solid #1E293B' }}>
                <div className="skill-icon-box shrink-0">
                  {getCategoryIcon(cat.iconName)}
                </div>
                <div>
                  <h3 className="section-heading-condensed text-base text-ivory-200">
                    {cat.title}
                  </h3>
                  <p className="font-body text-[11px] text-silver-400 mt-0.5">
                    {cat.skills.length} core competencies
                  </p>
                </div>
              </div>

              <p className="font-body text-sm text-silver-300 mb-5 leading-relaxed">
                {cat.description}
              </p>

              {/* Skill Pills */}
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 font-body text-xs text-silver-200"
                    style={{
                      border: '1px solid rgba(69,7,12,0.7)',
                      background: 'rgba(22,0,0,0.5)',
                    }}
                  >
                    <CheckCircle size={11} style={{ color: '#0066FF' }} />
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ── Tools I Use Section ── */}
        <div>
          <h3 className="section-heading-condensed text-xl text-ivory-200 mb-2">
            Tools I Use
          </h3>
          <div className="accent-line mb-8" />

          <div className="flex flex-wrap gap-3">
            {tools.map((tool) => (
              <div key={tool} className="tool-card">
                {tool}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
