import React from 'react';

interface ToolItem {
  name: string;
  tag: string;
  description: string;
  iconUrl: string;
}

export const ToolsSection: React.FC = () => {
  const tools: ToolItem[] = [
    {
      name: 'CapCut',
      tag: 'Video Editing',
      description: 'Video editing, transitions, effects, and Instagram Reels creation.',
      iconUrl: '/logos/capcut.svg',
    },
    {
      name: 'Google Analytics',
      tag: 'Web Analytics',
      description: 'Website traffic analysis, audience insights, and performance tracking.',
      iconUrl: '/logos/google-analytics.svg',
    },
    {
      name: 'Alight Motion',
      tag: 'Motion Graphics',
      description: 'Motion graphics, animation, visual effects, and creative video editing.',
      iconUrl: '/logos/alight-motion.png',
    },
    {
      name: 'Rank Math',
      tag: 'WordPress SEO',
      description: 'WordPress SEO optimization, on-page SEO, and search visibility improvements.',
      iconUrl: '/logos/rank-math.svg',
    },
    {
      name: 'Ahrefs',
      tag: 'SEO Intelligence',
      description: 'Keyword research, backlink analysis, competitor research, and SEO performance analysis.',
      iconUrl: '/logos/ahrefs.svg',
    },
    {
      name: 'ChatGPT',
      tag: 'Generative AI',
      description: 'AI-assisted content creation, brainstorming, research, and productivity.',
      iconUrl: '/logos/chatgpt.svg',
    },
    {
      name: 'Claude',
      tag: 'AI Writing & Analysis',
      description: 'AI-assisted writing, content refinement, research, and document analysis.',
      iconUrl: '/logos/claude.svg',
    },
    {
      name: 'Gemini',
      tag: 'AI Research',
      description: 'AI-powered research, creative assistance, content generation, and productivity.',
      iconUrl: '/logos/gemini.svg',
    },
    {
      name: 'Perplexity',
      tag: 'AI Discovery',
      description: 'AI-powered research, information discovery, and source-based answers.',
      iconUrl: '/logos/perplexity.svg',
    },
    {
      name: 'VidIQ',
      tag: 'AI Video SEO',
      description: 'AI-driven YouTube SEO, keyword intelligence, video performance optimization, and content trend analysis.',
      iconUrl: '/logos/vidiq.svg',
    },
    {
      name: 'Antigravity',
      tag: 'AI IDE & Development',
      description: 'AI-powered development environment for building, editing, and improving projects with AI assistance.',
      iconUrl: '/logos/antigravity.svg',
    },
    {
      name: 'Visual Studio Code',
      tag: 'Code Editor',
      description: 'Code editor for writing, editing, debugging, and managing website and application code.',
      iconUrl: '/logos/vscode.svg',
    },
    {
      name: 'Framer',
      tag: 'Web Design & AI',
      description: 'AI-powered website design and development platform for creating, designing, and publishing responsive websites with interactive layouts and animations.',
      iconUrl: '/logos/framer.svg',
    },
    {
      name: 'GitHub',
      tag: 'Version Control',
      description: 'Version control, code hosting, and project collaboration.',
      iconUrl: '/logos/github.svg',
    },
    {
      name: 'Microsoft Azure',
      tag: 'Cloud Infrastructure',
      description: 'Cloud computing, cloud infrastructure, and Azure service management.',
      iconUrl: '/logos/azure.svg',
    },
    {
      name: 'Wix',
      tag: 'Web Design & CMS',
      description: 'Website creation, website management, and web design.',
      iconUrl: '/logos/wix.svg',
    },
    {
      name: 'Canva',
      tag: 'Visual Design',
      description: 'Social media creatives, branding templates, presentations, and visual design.',
      iconUrl: '/logos/canva.svg',
    },
    {
      name: 'WordPress',
      tag: 'CMS Publishing',
      description: 'Website management, blog publishing, content management, and SEO-friendly landing pages.',
      iconUrl: '/logos/wordpress.svg',
    },
    {
      name: 'Semrush',
      tag: 'Competitive Intel',
      description: 'Keyword analytics, domain intelligence, backlink auditing, and competitor analysis.',
      iconUrl: '/logos/semrush.svg',
    },
    {
      name: 'Mailchimp',
      tag: 'Email Automation',
      description: 'Email newsletter campaigns, audience segmentation, automated workflows, and analytics.',
      iconUrl: '/logos/mailchimp.svg',
    },
  ];

  return (
    <section
      id="tools"
      className="py-24 sm:py-28 relative"
      style={{ backgroundColor: '#060B18', borderTop: '1px solid #172554' }}
    >
      {/* Subtle royal blue glow */}
      <div
        className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[550px] h-[450px] pointer-events-none"
        aria-hidden="true"
        style={{
          background: 'radial-gradient(circle, rgba(0, 102, 255, 0.08) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Section tag */}
        <div className="section-tag mb-6 self-start">
          <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#0066FF', boxShadow: '0 0 8px #0066FF' }} />
          <span>Technology & Workflow</span>
        </div>

        {/* Section Header */}
        <div className="mb-12 max-w-3xl">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold uppercase tracking-wide text-white mb-2">
            TOOLS <span style={{ color: '#0066FF' }}>I USE</span>
          </h2>
          <div className="w-16 h-[2px] mb-4" style={{ backgroundColor: '#0066FF' }} />
          <p className="font-body text-[#94A3B8] text-sm sm:text-base leading-relaxed">
            Industry-standard platforms, modern code editors, and AI-powered systems utilized daily for campaign execution, search optimization, creative production, cloud management, and application development.
          </p>
        </div>

        {/* Responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {tools.map((tool, idx) => (
            <div
              key={idx}
              className="p-4 rounded-md flex flex-col justify-between transition-all duration-250 cursor-pointer group"
              style={{
                background: '#0A1228',
                border: '1px solid #172554',
                transition: 'transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#0066FF';
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 10px 24px -5px rgba(0,0,0,0.8), 0 0 18px rgba(0, 102, 255, 0.25)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#172554';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div>
                <div className="flex items-center gap-3 mb-2.5">
                  <div className="w-8 h-8 rounded-md bg-[#060B18] border border-[#172554] p-1.5 flex items-center justify-center shrink-0 group-hover:border-[#0066FF]/60 transition-colors">
                    <img
                      src={tool.iconUrl}
                      alt={`${tool.name} logo`}
                      className="w-5 h-5 object-contain"
                      loading="lazy"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-heading text-xs sm:text-sm font-semibold tracking-wide uppercase text-white group-hover:text-[#38BDF8] transition-colors leading-tight truncate">
                      {tool.name}
                    </h3>
                    {tool.tag && (
                      <span className="font-body text-[9px] uppercase tracking-wider text-[#38BDF8] block truncate mt-0.5">
                        {tool.tag}
                      </span>
                    )}
                  </div>
                </div>
                <p className="font-body text-[11px] leading-relaxed text-[#94A3B8] group-hover:text-white transition-colors">
                  {tool.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
