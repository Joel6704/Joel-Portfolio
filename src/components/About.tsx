import React, { useState } from 'react';
import {
  TrendingUp,
  Share2,
  Search,
  BarChart3,
  Palette,
  Cpu,
  Sparkles,
  Cloud,
} from 'lucide-react';
import { aboutHighlights, approachPrinciples, personalInfo } from '../data/portfolioData';

const getIcon = (iconName: string) => {
  const props = { size: 20, style: { color: '#0066FF' } };
  switch (iconName) {
    case 'TrendingUp': return <TrendingUp {...props} />;
    case 'Share2': return <Share2 {...props} />;
    case 'Search': return <Search {...props} />;
    case 'BarChart3': return <BarChart3 {...props} />;
    case 'Palette': return <Palette {...props} />;
    case 'Cpu': return <Cpu {...props} />;
    case 'Cloud': return <Cloud {...props} />;
    default: return <Sparkles {...props} />;
  }
};

export const About: React.FC = () => {
  const [imgError, setImgError] = useState(false);

  return (
    <section
      id="about"
      className="py-28 relative"
      style={{ backgroundColor: '#060B18', borderTop: '1px solid #172554' }}
    >
      {/* Subtle royal blue ambient */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none"
        aria-hidden="true"
        style={{ background: 'radial-gradient(circle, rgba(0, 102, 255, 0.08) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">

        {/* Section tag */}
        <div className="section-tag mb-10 self-start">
          <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#0066FF', boxShadow: '0 0 8px #0066FF' }} />
          About Me
        </div>

        {/* ── Two-column: Portrait left, Text right ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-20">

          {/* Left Column: Portrait in rectangular container with slightly rounded corners */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start">
            <div
              className="relative w-[280px] h-[360px] sm:w-[320px] sm:h-[410px] rounded-lg overflow-hidden group"
              style={{
                border: '1px solid #172554',
                background: 'linear-gradient(160deg, #0A1228 0%, #060B18 100%)',
                boxShadow: '0 25px 60px -15px rgba(0,0,0,0.9), 0 0 30px rgba(0, 102, 255, 0.15)',
              }}
            >
              {!imgError ? (
                <img
                  src="/portrait-about.jpg"
                  alt="Joel Thomas – Digital Marketing Strategist"
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-[#0A1228]">
                  <div
                    className="font-display text-5xl font-bold mb-2"
                    style={{ color: '#0066FF' }}
                  >
                    JT
                  </div>
                  <div className="font-heading text-sm text-[#F5F5F5] uppercase tracking-widest">Joel Thomas</div>
                </div>
              )}

              {/* Blue corner accents */}
              <div
                className="absolute top-0 left-0 w-8 h-8 pointer-events-none"
                style={{ borderTop: '2px solid #0066FF', borderLeft: '2px solid #0066FF' }}
              />
              <div
                className="absolute bottom-0 right-0 w-8 h-8 pointer-events-none"
                style={{ borderBottom: '2px solid #0066FF', borderRight: '2px solid #0066FF' }}
              />

              {/* Subtle bottom gradient */}
              <div
                className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
                style={{ background: 'linear-gradient(to top, rgba(6,11,24,0.9) 0%, transparent 100%)' }}
              />
            </div>
          </div>

          {/* Right Column: Text content */}
          <div className="lg:col-span-7">
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight uppercase leading-tight mb-4">
              <span className="text-[#F5F5F5]">ABOUT </span>
              <span style={{ color: '#0066FF' }}>ME</span>
            </h2>
            <div className="w-16 h-[2px] mb-6" style={{ backgroundColor: '#0066FF' }} />

            <p className="font-body text-[#F5F5F5] text-base sm:text-lg leading-relaxed mb-4">
              I am a dedicated Digital Marketer with a deep passion for content creation, strategic campaign planning, search engine optimization (SEO), targeted paid advertising, and data-driven marketing.
            </p>

            <p className="font-body text-[#C5C5C5] text-sm sm:text-base leading-relaxed mb-8">
              {personalInfo.aboutIntro}
            </p>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-4 pt-4" style={{ borderTop: '1px solid #172554' }}>
              {[
                { num: '1+', label: 'Years Experience' },
                { num: '4+', label: 'Projects Delivered' },
                { num: '100%', label: 'Campaign Focus' },
              ].map((s) => (
                <div key={s.label} className="text-left py-2">
                  <div
                    className="font-heading text-2xl sm:text-3xl font-bold mb-0.5"
                    style={{ color: '#0066FF' }}
                  >
                    {s.num}
                  </div>
                  <div className="font-body text-[10px] sm:text-xs text-[#C5C5C5] uppercase tracking-wider">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Section: What I Do — 6 competency cards ── */}
        <div className="mb-20">
          <h3 className="section-heading-condensed text-xl text-white mb-2">
            What I Do
          </h3>
          <div className="accent-line mb-10" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {aboutHighlights.map((item, idx) => (
              <div
                key={idx}
                className="card-editorial p-6 group"
              >
                <div className="skill-icon-box mb-4">
                  {getIcon(item.icon)}
                </div>
                <h4 className="font-heading text-base font-semibold tracking-wide text-white mb-2 uppercase">
                  {item.title}
                </h4>
                <p className="font-body text-sm text-[#94A3B8] leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Approach Principles ── */}
        <div
          className="p-8 sm:p-12 relative overflow-hidden rounded-xl"
          style={{
            background: '#0A1228',
            border: '1px solid #172554',
          }}
        >
          <div
            className="absolute top-0 right-0 w-64 h-64 pointer-events-none"
            aria-hidden="true"
            style={{ background: 'radial-gradient(circle, rgba(0, 102, 255, 0.12) 0%, transparent 70%)' }}
          />

          <h3 className="section-heading-condensed text-xl text-white mb-2 relative z-10">
            My Approach
          </h3>
          <div className="accent-line mb-8" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {approachPrinciples.map((p) => (
              <div key={p.number} className="space-y-3">
                <div
                  className="font-heading text-xs font-bold tracking-[0.18em] uppercase"
                  style={{ color: '#38BDF8' }}
                >
                  Step {p.number}
                </div>
                <h4 className="font-display text-lg font-semibold text-white">
                  {p.title}
                </h4>
                <p className="font-body text-sm text-[#94A3B8] leading-relaxed">
                  {p.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
