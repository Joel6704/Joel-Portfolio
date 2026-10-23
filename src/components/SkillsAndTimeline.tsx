import React from 'react';
import {
  Share2,
  Palette,
  CalendarDays,
  BarChart2,
  Search,
  Compass,
  Film,
  Sparkles,
  Briefcase,
  GraduationCap,
  Calendar,
} from 'lucide-react';
import { experiences, educationList } from '../data/portfolioData';

interface SkillItem {
  name: string;
  detail: string;
  icon: React.ReactNode;
}

export const SkillsAndTimeline: React.FC = () => {
  const iconProps = { size: 16, style: { color: '#0066FF' } };

  const personalSkills: SkillItem[] = [
    {
      name: 'Social Media Marketing',
      detail: 'SMO, channel growth & community engagement',
      icon: <Share2 {...iconProps} />,
    },
    {
      name: 'Content Creation',
      detail: 'High-retention carousels, visuals & storytelling',
      icon: <Palette {...iconProps} />,
    },
    {
      name: 'Campaign Planning',
      detail: 'Editorial calendars & end-to-end campaign execution',
      icon: <CalendarDays {...iconProps} />,
    },
    {
      name: 'Data Analysis',
      detail: 'Traffic diagnostics, user behavior & ROI reports',
      icon: <BarChart2 {...iconProps} />,
    },
    {
      name: 'SEO & Keyword Research',
      detail: 'On-page SEO, search volume & Google Business Profile',
      icon: <Search {...iconProps} />,
    },
    {
      name: 'Communication & Strategy',
      detail: 'Consultative pitching, presentations & team synergy',
      icon: <Compass {...iconProps} />,
    },
    {
      name: 'Video Editing',
      detail: 'Short-form videos, Reels, storytelling, pacing & visual quality',
      icon: <Film {...iconProps} />,
    },
    {
      name: 'AI Graphic Designing',
      detail: 'Promotional posters, social graphics & AI creative workflows',
      icon: <Sparkles {...iconProps} />,
    },
  ];

  return (
    <section
      id="skills"
      className="py-24 sm:py-28 relative"
      style={{ backgroundColor: '#050505', borderTop: '1px solid #172554' }}
    >
      {/* Subtle red ambient glow */}
      <div
        className="absolute top-1/2 left-0 w-[450px] h-[450px] -translate-y-1/2 pointer-events-none"
        aria-hidden="true"
        style={{
          background: 'radial-gradient(circle, rgba(0,102,255,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">

        {/* Section tag */}
        <div className="section-tag mb-12 self-start">
          <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#0066FF' }} />
          <span>Core Competencies & Timeline</span>
        </div>

        {/* ── Two-Column Master Editorial Grid: Skills Left | Education & Experience Right ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* ════════ LEFT COLUMN: PERSONAL SKILLS ════════ */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="mb-8">
              <h2 className="font-heading text-3xl sm:text-4xl font-bold uppercase tracking-wide text-[#F5F5F5] mb-2">
                PERSONAL <span style={{ color: '#0066FF' }}>SKILLS</span>
              </h2>
              <div className="w-16 h-[2px] mb-4" style={{ backgroundColor: '#0066FF' }} />
              <p className="font-body text-[#C5C5C5] text-sm leading-relaxed">
                Core digital marketing and business development disciplines cultivated through real-world campaigns, lead generation pipelines, and data analysis.
              </p>
            </div>

            {/* 2-column skills grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {personalSkills.map((skill, index) => (
                <div
                  key={index}
                  className="p-4 rounded-md transition-all duration-300 hover:border-[#0066FF] group"
                  style={{
                    background: '#0A1228',
                    border: '1px solid #1E293B',
                  }}
                >
                  <div className="flex items-start gap-3">
                    {/* Small red outline icon box */}
                    <div
                      className="w-8 h-8 rounded shrink-0 flex items-center justify-center transition-transform duration-200 group-hover:scale-110"
                      style={{
                        border: '1px solid #0066FF',
                        background: 'rgba(6, 11, 24, 0.6)',
                      }}
                    >
                      {skill.icon}
                    </div>

                    {/* Skill info */}
                    <div className="min-w-0">
                      <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-[#F5F5F5] group-hover:text-white transition-colors leading-tight mb-1">
                        {skill.name}
                      </h3>
                      <p className="font-body text-[11px] text-[#A0A0A0] leading-snug">
                        {skill.detail}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Practical Proficiency Pill Bar */}
            <div
              className="mt-6 p-4 rounded-md flex flex-wrap items-center justify-between gap-3"
              style={{
                background: 'rgba(6, 11, 24, 0.3)',
                border: '1px solid #172554',
              }}
            >
              <div className="font-heading text-xs tracking-wider uppercase text-[#C5C5C5]">
                Methodology
              </div>
              <div className="font-body text-xs text-[#F5F5F5] flex flex-wrap gap-2">
                <span className="text-[#0066FF]">Data-Driven</span> • <span>Storytelling</span> • <span className="text-[#0066FF]">Growth Funnels</span>
              </div>
            </div>
          </div>

          {/* ════════ RIGHT COLUMN: EDUCATION & EXPERIENCE TIMELINE ════════ */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="mb-8">
              <h2 className="font-heading text-3xl sm:text-4xl font-bold uppercase tracking-wide text-[#F5F5F5] mb-2">
                EDUCATION & <span style={{ color: '#0066FF' }}>EXPERIENCE</span>
              </h2>
              <div className="w-16 h-[2px] mb-4" style={{ backgroundColor: '#0066FF' }} />
              <p className="font-body text-[#C5C5C5] text-sm leading-relaxed">
                Structured chronological record of professional roles, digital agency internship, academic degrees, and specialized certifications.
              </p>
            </div>

            {/* Vertical timeline */}
            <div className="relative pl-6 sm:pl-8 space-y-8">

              {/* Continuous thin red vertical line */}
              <div
                className="absolute left-[7px] sm:left-[11px] top-2 bottom-2 w-[1.5px]"
                style={{
                  background: 'linear-gradient(to bottom, #0066FF 0%, #0047BA 50%, #172554 100%)',
                }}
              />

              {/* 1. Prep Academy */}
              {experiences.map((exp) => (
                <div key={exp.id} className="relative group">
                  {/* Crimson circular marker */}
                  <div
                    className="absolute -left-[23px] sm:-left-[27px] top-1.5 w-3 h-3 rounded-full transition-transform duration-200 group-hover:scale-125"
                    style={{
                      backgroundColor: '#0066FF',
                      boxShadow: '0 0 10px rgba(0,102,255,0.6)',
                      border: '2px solid #050505',
                    }}
                  />

                  {/* Card / Entry */}
                  <div
                    className="p-5 rounded-md transition-all duration-300 hover:border-[#0066FF]"
                    style={{
                      background: '#090101',
                      border: '1px solid #1E293B',
                    }}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                      <span className="font-heading text-xs font-semibold tracking-wider uppercase text-[#0066FF] inline-flex items-center gap-1.5">
                        <Calendar size={12} />
                        {exp.period}
                      </span>
                      {exp.isCurrent && (
                        <span
                          className="px-2 py-0.5 font-heading text-[9px] font-bold uppercase tracking-wider rounded-xs"
                          style={{
                            background: 'rgba(0,102,255,0.2)',
                            color: '#F5F5F5',
                            border: '1px solid #0066FF',
                          }}
                        >
                          Current Role
                        </span>
                      )}
                    </div>

                    <h3 className="font-heading text-base sm:text-lg font-semibold uppercase tracking-wide text-[#F5F5F5] mb-0.5">
                      {exp.role}
                    </h3>
                    <div className="font-body text-xs font-medium text-[#C5C5C5] mb-2 flex items-center gap-1.5">
                      <Briefcase size={12} style={{ color: '#0066FF' }} />
                      {exp.company}
                    </div>

                    <p className="font-body text-xs text-[#A0A0A0] leading-relaxed mb-3">
                      {exp.responsibilities[0]}
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                      {exp.tags.slice(0, 4).map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="font-body text-[10px] px-2 py-0.5 text-[#C5C5C5]"
                          style={{
                            background: 'rgba(6, 11, 24, 0.4)',
                            border: '1px solid #172554',
                          }}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}

              {/* 2. Education Items */}
              {educationList.map((edu) => (
                <div key={edu.id} className="relative group">
                  {/* Crimson circular marker */}
                  <div
                    className="absolute -left-[23px] sm:-left-[27px] top-1.5 w-3 h-3 rounded-full transition-transform duration-200 group-hover:scale-125"
                    style={{
                      backgroundColor: '#0066FF',
                      boxShadow: '0 0 10px rgba(0,102,255,0.6)',
                      border: '2px solid #050505',
                    }}
                  />

                  {/* Card / Entry */}
                  <div
                    className="p-5 rounded-md transition-all duration-300 hover:border-[#0066FF]"
                    style={{
                      background: '#090101',
                      border: '1px solid #1E293B',
                    }}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                      <span className="font-heading text-xs font-semibold tracking-wider uppercase text-[#0066FF] inline-flex items-center gap-1.5">
                        <Calendar size={12} />
                        {edu.period}
                      </span>
                      <span
                        className="px-2 py-0.5 font-heading text-[9px] font-bold uppercase tracking-wider rounded-xs"
                        style={{
                          background: edu.status === 'Completed' ? 'rgba(40,100,40,0.2)' : 'rgba(0,102,255,0.2)',
                          color: '#F5F5F5',
                          border: `1px solid ${edu.status === 'Completed' ? '#3d8b3d' : '#0066FF'}`,
                        }}
                      >
                        {edu.status}
                      </span>
                    </div>

                    <h3 className="font-heading text-base sm:text-lg font-semibold uppercase tracking-wide text-[#F5F5F5] mb-0.5">
                      {edu.degree}
                    </h3>
                    <div className="font-body text-xs font-medium text-[#C5C5C5] mb-2 flex items-center gap-1.5">
                      <GraduationCap size={13} style={{ color: '#0066FF' }} />
                      {edu.institution}
                    </div>

                    <p className="font-body text-xs text-[#A0A0A0] leading-relaxed">
                      {edu.details}
                    </p>
                  </div>
                </div>
              ))}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
