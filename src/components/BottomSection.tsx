import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Copy,
  Send,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

interface BottomSectionProps {
  onCopyText: (text: string, label: string) => void;
}

interface ToolItem {
  name: string;
  tag: string;
  description: string;
  iconUrl: string;
}

export const BottomSection: React.FC<BottomSectionProps> = ({ onCopyText }) => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  // Official tools and platforms
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

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Please enter your name.';
    if (!formData.email.trim() || !formData.email.includes('@')) errs.email = 'Valid email is required.';
    if (!formData.message.trim()) errs.message = 'Please include a brief message.';
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    const mailSubject = encodeURIComponent(`[Marketing Collaboration] ${formData.subject || 'New Inquiry'} from ${formData.name}`);
    const mailBody = encodeURIComponent(`Hi Joel,\n\n${formData.message}\n\nBest,\n${formData.name} (${formData.email})`);
    window.location.href = `mailto:${personalInfo.email}?subject=${mailSubject}&body=${mailBody}`;
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="py-24 sm:py-28 relative"
      style={{ backgroundColor: '#050505', borderTop: '1px solid #172554' }}
    >
      {/* Subtle dark-red glow */}
      <div
        className="absolute bottom-0 right-1/4 w-[500px] h-[400px] pointer-events-none"
        aria-hidden="true"
        style={{
          background: 'radial-gradient(circle, rgba(0,102,255,0.07) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">

        {/* Section tag */}
        <div className="section-tag mb-12 self-start">
          <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#0066FF' }} />
          <span>Tools & Collaboration</span>
        </div>

        {/* ── Two-Column Bottom Master Layout: Tools Left | Contact Right ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* ════════ LEFT COLUMN: DIGITAL MARKETING TOOLS ════════ */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="mb-8">
              <h2 className="font-heading text-3xl sm:text-4xl font-bold uppercase tracking-wide text-[#F5F5F5] mb-2">
                TOOLS <span style={{ color: '#0066FF' }}>I USE</span>
              </h2>
              <div className="w-16 h-[2px] mb-4" style={{ backgroundColor: '#0066FF' }} />
              <p className="font-body text-[#C5C5C5] text-sm leading-relaxed">
                Industry-standard platforms utilized daily for campaign execution, search optimization, creative production, and performance tracking.
              </p>
            </div>

            {/* Grid of compact rectangular cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {tools.map((tool, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-md flex flex-col justify-between transition-all duration-250 cursor-pointer group"
                  style={{
                    background: '#0A1228',
                    border: '1px solid rgba(23, 37, 84, 0.7)',
                    transition: 'transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#0066FF';
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = '0 10px 24px -5px rgba(0,0,0,0.8), 0 0 15px rgba(0,102,255,0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(23, 37, 84, 0.7)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div>
                    <div className="flex items-center gap-3 mb-2.5">
                      <div className="w-8 h-8 rounded-md bg-[#060B18] border border-[#1E293B] p-1.5 flex items-center justify-center shrink-0 group-hover:border-[#0066FF]/60 transition-colors">
                        <img
                          src={tool.iconUrl}
                          alt={`${tool.name} logo`}
                          className="w-5 h-5 object-contain"
                          loading="lazy"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-heading text-xs sm:text-sm font-semibold tracking-wide uppercase text-[#F5F5F5] group-hover:text-white transition-colors leading-tight truncate">
                          {tool.name}
                        </h3>
                        {tool.tag && (
                          <span className="font-body text-[9px] uppercase tracking-wider text-[#0066FF] block truncate mt-0.5">
                            {tool.tag}
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="font-body text-[11px] leading-relaxed text-[#8A8A8A] group-hover:text-[#B5B5B5] transition-colors">
                      {tool.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* ════════ RIGHT COLUMN: CONTACT (LET'S WORK TOGETHER) ════════ */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="mb-8">
              <h2 className="font-heading text-3xl sm:text-4xl font-bold uppercase tracking-wide text-[#F5F5F5] mb-2">
                LET'S WORK <span style={{ color: '#0066FF' }}>TOGETHER</span>
              </h2>
              <div className="w-16 h-[2px] mb-4" style={{ backgroundColor: '#0066FF' }} />
              <p className="font-body text-[#C5C5C5] text-sm sm:text-base leading-relaxed">
                I'm currently open to new projects and collaborations. Let's create something amazing that drives real results.
              </p>
            </div>

            {/* Contact details with small red outline icons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-8">

              {/* Email */}
              <div
                className="p-4 rounded-md group transition-all duration-200 hover:border-[#0066FF]"
                style={{
                  background: '#0A1228',
                  border: '1px solid #1E293B',
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded shrink-0 flex items-center justify-center text-[#0066FF]"
                      style={{
                        border: '1px solid #0066FF',
                        background: 'rgba(6, 11, 24, 0.5)',
                      }}
                    >
                      <Mail size={15} />
                    </div>
                    <div className="min-w-0">
                      <div className="font-heading text-[10px] tracking-wider uppercase text-[#8A8A8A]">
                        Email
                      </div>
                      <a
                        href={`mailto:${personalInfo.email}`}
                        className="font-body text-xs sm:text-sm font-medium text-[#F5F5F5] hover:text-[#0066FF] transition-colors truncate block"
                      >
                        {personalInfo.email}
                      </a>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => onCopyText(personalInfo.email, 'Email')}
                    className="p-1.5 text-[#8A8A8A] hover:text-white transition-colors"
                    aria-label="Copy email address"
                  >
                    <Copy size={14} />
                  </button>
                </div>
              </div>

              {/* Phone */}
              <div
                className="p-4 rounded-md group transition-all duration-200 hover:border-[#0066FF]"
                style={{
                  background: '#0A1228',
                  border: '1px solid #1E293B',
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded shrink-0 flex items-center justify-center text-[#0066FF]"
                      style={{
                        border: '1px solid #0066FF',
                        background: 'rgba(6, 11, 24, 0.5)',
                      }}
                    >
                      <Phone size={15} />
                    </div>
                    <div className="min-w-0">
                      <div className="font-heading text-[10px] tracking-wider uppercase text-[#8A8A8A]">
                        Phone / WhatsApp
                      </div>
                      <a
                        href={`tel:${personalInfo.phoneRaw}`}
                        className="font-body text-xs sm:text-sm font-medium text-[#F5F5F5] hover:text-[#0066FF] transition-colors truncate block"
                      >
                        {personalInfo.phone}
                      </a>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => onCopyText(personalInfo.phone, 'Phone number')}
                    className="p-1.5 text-[#8A8A8A] hover:text-white transition-colors"
                    aria-label="Copy phone number"
                  >
                    <Copy size={14} />
                  </button>
                </div>
              </div>

              {/* Location */}
              <div
                className="p-4 rounded-md"
                style={{
                  background: '#0A1228',
                  border: '1px solid #1E293B',
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded shrink-0 flex items-center justify-center text-[#0066FF]"
                    style={{
                      border: '1px solid #0066FF',
                      background: 'rgba(6, 11, 24, 0.5)',
                    }}
                  >
                    <MapPin size={15} />
                  </div>
                  <div>
                    <div className="font-heading text-[10px] tracking-wider uppercase text-[#8A8A8A]">
                      Location
                    </div>
                    <div className="font-body text-xs sm:text-sm font-medium text-[#F5F5F5]">
                      {personalInfo.location}
                    </div>
                  </div>
                </div>
              </div>

              {/* Portfolio / LinkedIn */}
              <div
                className="p-4 rounded-md group transition-all duration-200 hover:border-[#0066FF]"
                style={{
                  background: '#0A1228',
                  border: '1px solid #1E293B',
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded shrink-0 flex items-center justify-center text-[#0066FF]"
                      style={{
                        border: '1px solid #0066FF',
                        background: 'rgba(6, 11, 24, 0.5)',
                      }}
                    >
                      <ExternalLink size={15} />
                    </div>
                    <div>
                      <div className="font-heading text-[10px] tracking-wider uppercase text-[#8A8A8A]">
                        LinkedIn Profile
                      </div>
                      <a
                        href={personalInfo.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-body text-xs sm:text-sm font-medium text-[#F5F5F5] hover:text-[#0066FF] transition-colors"
                      >
                        Joel Thomas
                      </a>
                    </div>
                  </div>
                  <a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 text-[#8A8A8A] hover:text-white transition-colors"
                    aria-label="Open LinkedIn"
                  >
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>

            </div>

            {/* Quick Interactive Inquiry Form */}
            <div
              className="p-6 rounded-md mb-8"
              style={{
                background: '#090101',
                border: '1px solid #1E293B',
              }}
            >
              <h3 className="font-heading text-base font-semibold uppercase tracking-wider text-[#F5F5F5] mb-1">
                Quick Inquiry
              </h3>
              <p className="font-body text-xs text-[#8A8A8A] mb-4">
                Send a direct note — opens formatted in your email client.
              </p>

              {submitted ? (
                <div className="p-4 rounded border border-[#0066FF]/40 bg-[#160000]/40 flex items-center gap-3">
                  <CheckCircle2 size={18} style={{ color: '#0066FF' }} />
                  <p className="font-body text-xs text-[#F5F5F5]">
                    Inquiry draft opened in your email client! You can also message directly to {personalInfo.email}.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSendMessage} className="space-y-3.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <input
                        type="text"
                        placeholder="Your Name *"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs text-[#F5F5F5] bg-[#050505] rounded focus:outline-none transition-colors"
                        style={{ border: `1px solid ${errors.name ? '#0066FF' : '#1E293B'}` }}
                      />
                      {errors.name && (
                        <span className="text-[10px] text-[#e88080] flex items-center gap-1 mt-1">
                          <AlertCircle size={10} /> {errors.name}
                        </span>
                      )}
                    </div>
                    <div>
                      <input
                        type="email"
                        placeholder="Your Email *"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs text-[#F5F5F5] bg-[#050505] rounded focus:outline-none transition-colors"
                        style={{ border: `1px solid ${errors.email ? '#0066FF' : '#1E293B'}` }}
                      />
                      {errors.email && (
                        <span className="text-[10px] text-[#e88080] flex items-center gap-1 mt-1">
                          <AlertCircle size={10} /> {errors.email}
                        </span>
                      )}
                    </div>
                  </div>

                  <div>
                    <textarea
                      rows={3}
                      placeholder="Project details, campaign needs, or opportunity *"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs text-[#F5F5F5] bg-[#050505] rounded focus:outline-none transition-colors resize-none"
                      style={{ border: `1px solid ${errors.message ? '#0066FF' : '#1E293B'}` }}
                    />
                    {errors.message && (
                      <span className="text-[10px] text-[#e88080] flex items-center gap-1 mt-1">
                        <AlertCircle size={10} /> {errors.message}
                      </span>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="btn-red w-full py-3 font-heading text-xs font-semibold tracking-[0.14em] uppercase inline-flex items-center justify-center gap-2 rounded"
                  >
                    <Send size={13} />
                    Send Message
                  </button>
                </form>
              )}
            </div>

            {/* Personal signature in elegant red handwritten style */}
            <div className="pt-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4" style={{ borderTop: '1px solid #1E293B' }}>
              <div>
                <div className="font-heading text-[10px] tracking-[0.2em] uppercase text-[#8A8A8A] mb-1">
                  Personal Signature
                </div>
                {/* Elegant cursive handwritten signature */}
                <div
                  className="font-signature text-3xl sm:text-4xl tracking-wider select-none"
                  style={{
                    color: '#0066FF',
                    textShadow: '0 0 15px rgba(0,102,255,0.3)',
                  }}
                >
                  Joel Thomas
                </div>
              </div>

              <div className="font-body text-xs text-[#8A8A8A]">
                Available for full-time roles & high-growth contracts.
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
