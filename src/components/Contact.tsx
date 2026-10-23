import React, { useState } from 'react';
import {
  Mail,
  Phone,
  Send,
  Copy,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  MapPin,
} from 'lucide-react';
import { LinkedInIcon } from './Icons';
import { personalInfo } from '../data/portfolioData';

interface ContactProps {
  onCopyText: (text: string, label: string) => void;
}

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export const Contact: React.FC<ContactProps> = ({ onCopyText }) => {
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);

  const validate = (): boolean => {
    const errs: FormErrors = {};
    if (!formData.name.trim()) errs.name = 'Please provide your name.';
    else if (formData.name.trim().length < 2) errs.name = 'Name must be at least 2 characters.';
    if (!formData.email.trim()) errs.email = 'Please provide your email address.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) errs.email = 'Please provide a valid email format.';
    if (!formData.subject.trim()) errs.subject = 'Please specify a subject.';
    if (!formData.message.trim()) errs.message = 'Please enter a message.';
    else if (formData.message.trim().length < 10) errs.message = 'Message should be at least 10 characters.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const mailSubject = encodeURIComponent(`[Portfolio Inquiry] ${formData.subject} - from ${formData.name}`);
    const mailBody = encodeURIComponent(
      `Hi Joel,\n\nMy name is ${formData.name} (${formData.email}).\n\n${formData.message}\n\nLooking forward to speaking with you!`
    );
    window.location.href = `mailto:${personalInfo.email}?subject=${mailSubject}&body=${mailBody}`;
    setSubmittedMessage(
      `Your email client is opening with your pre-formatted message. If it didn't open, email directly to ${personalInfo.email}.`
    );
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', subject: '', message: '' });
    setErrors({});
    setSubmittedMessage(null);
  };

  const inputClass = (hasError: boolean) =>
    `w-full px-4 py-3 font-body text-sm text-ivory-200 bg-transparent focus:outline-none transition-all ${
      hasError
        ? 'border-[#0066FF]'
        : 'border-[rgba(69,7,12,0.7)] focus:border-[#0066FF]'
    }`;

  return (
    <section
      id="contact"
      className="py-28 relative"
      style={{ backgroundColor: '#0A1228', borderTop: '1px solid #172554' }}
    >
      {/* Ambient glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none"
        aria-hidden="true"
        style={{ background: 'radial-gradient(ellipse, rgba(0,102,255,0.08) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">

        {/* Section tag */}
        <div className="section-tag mb-10">
          <span className="inline-block w-1 h-1 rounded-full" style={{ backgroundColor: '#0066FF' }} />
          Get In Touch
        </div>

        {/* Heading */}
        <div className="max-w-3xl mb-16">
          <h2 className="font-display text-[clamp(2.4rem,6vw,4.5rem)] font-bold text-ivory-200 leading-tight mb-4">
            Let's Work <span style={{ color: '#0066FF' }}>Together</span>
          </h2>
          <div className="accent-line mb-6" />
          <p className="font-body text-silver-200 text-base leading-relaxed">
            Whether you're looking for creative marketing support, social media management,
            digital growth initiatives, or business development collaboration, I'd love to connect.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* Left: Contact Details */}
          <div className="lg:col-span-4 space-y-4">

            {/* Email */}
            <div
              className="p-5 group transition-all duration-200 hover:border-[#0066FF]"
              style={{ border: '1px solid #172554', background: 'rgba(5,5,5,0.8)' }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <Mail size={18} style={{ color: '#0066FF' }} />
                  <div>
                    <div className="font-heading text-[10px] tracking-[0.15em] uppercase text-silver-500 mb-0.5">
                      Email
                    </div>
                    <a
                      href={`mailto:${personalInfo.email}`}
                      className="font-body text-sm font-medium text-ivory-200 hover:text-white transition-colors break-all"
                    >
                      {personalInfo.email}
                    </a>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onCopyText(personalInfo.email, 'Email address')}
                  className="p-1.5 text-silver-500 hover:text-white transition-colors"
                  aria-label="Copy email"
                >
                  <Copy size={15} />
                </button>
              </div>
            </div>

            {/* Phone */}
            <div
              className="p-5 group transition-all duration-200 hover:border-[#0066FF]"
              style={{ border: '1px solid #172554', background: 'rgba(5,5,5,0.8)' }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <Phone size={18} style={{ color: '#0066FF' }} />
                  <div>
                    <div className="font-heading text-[10px] tracking-[0.15em] uppercase text-silver-500 mb-0.5">
                      Phone / WhatsApp
                    </div>
                    <a
                      href={`tel:${personalInfo.phoneRaw}`}
                      className="font-body text-sm font-medium text-ivory-200 hover:text-white transition-colors"
                    >
                      {personalInfo.phone}
                    </a>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onCopyText(personalInfo.phone, 'Phone number')}
                  className="p-1.5 text-silver-500 hover:text-white transition-colors"
                  aria-label="Copy phone"
                >
                  <Copy size={15} />
                </button>
              </div>
            </div>

            {/* Location */}
            <div
              className="p-5"
              style={{ border: '1px solid #172554', background: 'rgba(5,5,5,0.8)' }}
            >
              <div className="flex items-center gap-3.5">
                <MapPin size={18} style={{ color: '#0066FF' }} />
                <div>
                  <div className="font-heading text-[10px] tracking-[0.15em] uppercase text-silver-500 mb-0.5">
                    Location
                  </div>
                  <div className="font-body text-sm font-medium text-ivory-200">
                    {personalInfo.location}
                  </div>
                </div>
              </div>
            </div>

            {/* LinkedIn */}
            <div
              className="p-5 group transition-all duration-200 hover:border-[#0066FF]"
              style={{ border: '1px solid #172554', background: 'rgba(5,5,5,0.8)' }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <LinkedInIcon size={18} style={{ color: '#0066FF' }} />
                  <div>
                    <div className="font-heading text-[10px] tracking-[0.15em] uppercase text-silver-500 mb-0.5">
                      LinkedIn
                    </div>
                    <div className="font-body text-sm font-medium text-ivory-200">
                      Joel Thomas
                    </div>
                  </div>
                </div>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 text-silver-500 hover:text-white transition-colors"
                  aria-label="Open LinkedIn"
                >
                  <ExternalLink size={15} />
                </a>
              </div>
            </div>

            {/* Availability block */}
            <div
              className="p-5"
              style={{ background: 'rgba(0,102,255,0.08)', border: '1px solid rgba(0,102,255,0.3)' }}
            >
              <div
                className="flex items-center gap-2 font-heading text-[10px] tracking-[0.18em] uppercase mb-2"
                style={{ color: '#0066FF' }}
              >
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: '#0066FF' }} />
                Open for Opportunities
              </div>
              <p className="font-body text-xs text-silver-300 leading-relaxed">
                Available for full-time roles and freelance collaborations in digital marketing
                and business development.
              </p>
            </div>
          </div>

          {/* Right: Message Form */}
          <div className="lg:col-span-8">
            <div
              className="p-7 sm:p-10"
              style={{ background: '#050505', border: '1px solid #172554' }}
            >
              <div className="flex items-center justify-between pb-6 mb-6" style={{ borderBottom: '1px solid #1E293B' }}>
                <div>
                  <h3 className="font-display text-xl font-semibold text-ivory-200 mb-1">
                    Send a Message
                  </h3>
                  <p className="font-body text-xs text-silver-400">
                    Prepares your message and opens directly in your email client.
                  </p>
                </div>
                <Mail size={22} style={{ color: '#0066FF' }} />
              </div>

              {submittedMessage ? (
                <div
                  className="p-8 text-center space-y-5"
                  style={{ border: '1px solid rgba(0,102,255,0.35)', background: 'rgba(0,102,255,0.06)' }}
                >
                  <div
                    className="w-14 h-14 mx-auto flex items-center justify-center"
                    style={{ border: '1px solid rgba(0,102,255,0.5)' }}
                  >
                    <CheckCircle2 size={26} style={{ color: '#0066FF' }} />
                  </div>
                  <h4 className="font-display text-lg font-semibold text-ivory-200">Inquiry Formatted!</h4>
                  <p className="font-body text-sm text-silver-300 leading-relaxed max-w-md mx-auto">
                    {submittedMessage}
                  </p>
                  <div className="pt-2 flex flex-wrap justify-center gap-3">
                    <a
                      href={`mailto:${personalInfo.email}`}
                      className="btn-red px-6 py-2.5 font-heading text-xs font-semibold tracking-[0.12em] uppercase"
                    >
                      Open Email App
                    </a>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="btn-outline-red px-6 py-2.5 font-heading text-xs font-semibold tracking-[0.12em] uppercase"
                    >
                      Write Another
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5 text-left">

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div>
                      <label htmlFor="name" className="block font-heading text-[10px] tracking-[0.15em] uppercase text-silver-400 mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Alex Morgan"
                        className={inputClass(!!errors.name)}
                        style={{ border: `1px solid ${errors.name ? '#0066FF' : 'rgba(69,7,12,0.7)'}` }}
                      />
                      {errors.name && (
                        <p className="font-body text-xs mt-1 flex items-center gap-1" style={{ color: '#d94040' }}>
                          <AlertCircle size={11} /> {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block font-heading text-[10px] tracking-[0.15em] uppercase text-silver-400 mb-1.5">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. alex@company.com"
                        className={inputClass(!!errors.email)}
                        style={{ border: `1px solid ${errors.email ? '#0066FF' : 'rgba(69,7,12,0.7)'}` }}
                      />
                      {errors.email && (
                        <p className="font-body text-xs mt-1 flex items-center gap-1" style={{ color: '#d94040' }}>
                          <AlertCircle size={11} /> {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label htmlFor="subject" className="block font-heading text-[10px] tracking-[0.15em] uppercase text-silver-400 mb-1.5">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. Campaign Collaboration / Marketing Role"
                      className={inputClass(!!errors.subject)}
                      style={{ border: `1px solid ${errors.subject ? '#0066FF' : 'rgba(69,7,12,0.7)'}` }}
                    />
                    {errors.subject && (
                      <p className="font-body text-xs mt-1 flex items-center gap-1" style={{ color: '#d94040' }}>
                        <AlertCircle size={11} /> {errors.subject}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block font-heading text-[10px] tracking-[0.15em] uppercase text-silver-400 mb-1.5">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share details regarding your campaign, project goals, or opportunity..."
                      className={inputClass(!!errors.message) + ' resize-y'}
                      style={{ border: `1px solid ${errors.message ? '#0066FF' : 'rgba(69,7,12,0.7)'}` }}
                    />
                    {errors.message && (
                      <p className="font-body text-xs mt-1 flex items-center gap-1" style={{ color: '#d94040' }}>
                        <AlertCircle size={11} /> {errors.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="btn-red w-full py-4 font-heading text-sm font-semibold tracking-[0.14em] uppercase inline-flex items-center justify-center gap-2"
                    >
                      <Send size={16} />
                      Prepare & Send Message
                    </button>
                    <p className="font-body text-[11px] text-center text-silver-500 mt-2.5">
                      Inquiries reach Joel directly at <strong>{personalInfo.email}</strong>
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
