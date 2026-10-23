import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import {
  LinkedInIcon,
  InstagramIcon,
  FacebookIcon,
  TwitterIcon,
  ThreadsIcon,
} from './Icons';

const CURRENT_YEAR = 2026;

interface SocialLink {
  name: string;
  href: string;
  icon: React.FC<{ size?: number; className?: string; style?: React.CSSProperties }>;
  label: string;
  hoverColor: string;
  hoverBorder: string;
  hoverGlow: string;
  isExternal?: boolean;
}

export const Footer: React.FC = () => {
  const socialLinks: SocialLink[] = [
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/joel-thomas-289120354?utm_source=share_via&utm_content=profile&utm_medium=member_android',
      icon: LinkedInIcon,
      label: 'LinkedIn Profile',
      hoverColor: '#0077B5',
      hoverBorder: '#0077B5',
      hoverGlow: 'rgba(0, 119, 181, 0.45)',
      isExternal: true,
    },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/invites/contact/?utm_source=ig_contact_invite&utm_medium=copy_link&utm_content=min72ba',
      icon: InstagramIcon,
      label: 'Instagram Profile',
      hoverColor: '#E1306C',
      hoverBorder: '#E1306C',
      hoverGlow: 'rgba(225, 48, 108, 0.45)',
      isExternal: true,
    },
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/share/1E8MtUSFSS/',
      icon: FacebookIcon,
      label: 'Facebook Profile',
      hoverColor: '#1877F2',
      hoverBorder: '#1877F2',
      hoverGlow: 'rgba(24, 119, 242, 0.45)',
      isExternal: true,
    },
    {
      name: 'X (Twitter)',
      href: 'https://x.com/JoelThomas33750',
      icon: TwitterIcon,
      label: 'X (Twitter) Profile',
      hoverColor: '#38BDF8',
      hoverBorder: '#38BDF8',
      hoverGlow: 'rgba(56, 189, 248, 0.45)',
      isExternal: true,
    },
    {
      name: 'Threads',
      href: 'https://www.threads.com/@joel___thomas___?invite=0',
      icon: ThreadsIcon,
      label: 'Threads Profile',
      hoverColor: '#FFFFFF',
      hoverBorder: '#FFFFFF',
      hoverGlow: 'rgba(255, 255, 255, 0.35)',
      isExternal: true,
    },
  ];

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Education & Experience', href: '#experience' },
    { name: 'Skills', href: '#skills' },
    { name: 'Tools', href: '#tools' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace('#', '');
    const targetElement = document.getElementById(id);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', href);
    }
  };

  const handleGetInTouchClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', '#contact');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.footer
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="relative py-7 sm:py-9 bg-[#060B18] overflow-hidden"
    >
      {/* ── 1. Animated Top Border Cyber Energy Beam ── */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-[#172554] overflow-hidden">
        <motion.div
          className="w-48 sm:w-72 h-full bg-gradient-to-r from-transparent via-[#00E5FF] to-transparent shadow-[0_0_12px_#00E5FF]"
          animate={{ x: ['-100%', '800%'] }}
          transition={{ repeat: Infinity, duration: 4.5, ease: 'linear' }}
        />
      </div>

      {/* ── 2. Layered Animated Ambient Glow Orbs ── */}
      <motion.div
        className="absolute -bottom-8 left-1/4 w-80 h-36 rounded-full pointer-events-none opacity-30"
        style={{ background: 'radial-gradient(circle, rgba(0, 102, 255, 0.28) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.4, 0.25] }}
        transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute -bottom-8 right-1/4 w-80 h-36 rounded-full pointer-events-none opacity-30"
        style={{ background: 'radial-gradient(circle, rgba(0, 229, 255, 0.22) 0%, transparent 70%)' }}
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.35, 0.2, 0.35] }}
        transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut' }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start">
          {/* Section 1: Connect With Me */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00E5FF] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00E5FF] shadow-[0_0_8px_#00E5FF]" />
              </span>
              <h3 className="font-heading text-[11px] font-semibold tracking-[0.18em] uppercase text-[#38BDF8]">
                Connect With Me
              </h3>
            </div>

            <motion.div
              whileHover={{ x: 2 }}
              className="font-heading text-base font-bold text-white tracking-[0.06em] uppercase transition-colors hover:text-[#00E5FF] cursor-default"
            >
              Joel Thomas
            </motion.div>

            {/* Social media icons only (LinkedIn, Instagram, Facebook, X, Threads) */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {socialLinks.map(({ name, href, icon: Icon, label, hoverColor, hoverBorder, hoverGlow, isExternal }) => (
                <motion.a
                  key={name}
                  href={href}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noopener noreferrer' : undefined}
                  whileHover={{ y: -3, scale: 1.12 }}
                  whileTap={{ scale: 0.94 }}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-[#94A3B8] transition-all duration-200"
                  style={{
                    border: '1px solid #172554',
                    background: 'rgba(6, 13, 36, 0.85)',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = hoverBorder;
                    el.style.color = hoverColor;
                    el.style.boxShadow = `0 0 14px ${hoverGlow}`;
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = '#172554';
                    el.style.color = '#94A3B8';
                    el.style.boxShadow = 'none';
                  }}
                  aria-label={label}
                  title={name}
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Section 2: Quick Navigation */}
          <div>
            <h3 className="font-heading text-[11px] font-semibold tracking-[0.18em] uppercase text-[#38BDF8] mb-2.5 flex items-center gap-1.5">
              <span>Quick Navigation</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF]/40 animate-pulse" />
            </h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
              {navLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  whileHover={{ x: 3 }}
                  className="group font-body text-xs text-[#94A3B8] hover:text-[#00E5FF] transition-colors py-0.5 flex items-center gap-1.5 cursor-pointer select-none"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF]/50 group-hover:bg-[#00E5FF] group-hover:scale-125 group-hover:shadow-[0_0_8px_#00E5FF] transition-all flex-shrink-0" />
                  <span className="truncate">{link.name}</span>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Section 3: Action Area (Get in Touch button with status indicator) */}
          <div className="flex flex-col items-start md:items-end justify-start space-y-2.5">
            {/* Live Status Pill */}
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#008CFF]/10 border border-[#008CFF]/30 backdrop-blur-sm text-[10px] font-heading font-medium tracking-[0.14em] uppercase text-[#7DD3FC]"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00E5FF] opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#00E5FF]" />
              </span>
              <span>Available for Projects</span>
            </motion.div>

            {/* Stylized Get in Touch button with shine sweep & hover lift */}
            <motion.button
              type="button"
              onClick={handleGetInTouchClick}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="group relative inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-heading text-xs font-bold tracking-[0.08em] text-white overflow-hidden cursor-pointer shadow-[0_0_20px_rgba(0,102,255,0.45)] hover:shadow-[0_0_30px_rgba(0,229,255,0.75)] transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, #0052D4 0%, #4364F7 50%, #00E5FF 100%)',
              }}
              aria-label="Scroll to Contact section"
            >
              {/* Sweeping laser shine effect */}
              <motion.span
                className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-[-20deg]"
                animate={{ x: ['-200%', '300%'] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut', repeatDelay: 1 }}
                aria-hidden="true"
              />
              <span className="relative z-10 flex items-center gap-1.5">
                <span>Get in Touch</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </span>
            </motion.button>
          </div>
        </div>

        {/* Minimal Bottom Divider & Copyright with Back to Top */}
        <div className="mt-6 pt-4 border-t border-[#172554]/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#64748B]">
          <p className="font-body">
            © {CURRENT_YEAR} Joel Thomas. All rights reserved.
          </p>

          {/* Animated Back to Top pill */}
          <motion.button
            type="button"
            onClick={scrollToTop}
            whileHover={{ y: -2, scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-heading font-medium tracking-wider text-[#94A3B8] hover:text-[#00E5FF] bg-[#060D24]/60 hover:bg-[#008CFF]/15 border border-[#172554] hover:border-[#00E5FF]/60 hover:shadow-[0_0_12px_rgba(0,229,255,0.3)] transition-all duration-300 cursor-pointer"
            aria-label="Back to top of page"
          >
            <span>Back to Top</span>
            <ArrowUp size={12} className="text-[#00E5FF] transition-transform duration-300 group-hover:-translate-y-0.5" />
          </motion.button>
        </div>
      </div>
    </motion.footer>
  );
};
