import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Menu, X } from 'lucide-react';
import { homeConfig, type NavLink } from '../../data/homeConfig';
import { personalInfo } from '../../data/portfolioData';
import {
  LinkedInIcon,
  InstagramIcon,
  FacebookIcon,
  TwitterIcon,
  ThreadsIcon,
} from '../Icons';
import { Magnetic } from '../common/Magnetic';

interface NavbarProps {
  activeSection: string;
}

interface SocialItem {
  name: string;
  href: string;
  icon: React.FC<{ size?: number; className?: string }>;
  hoverColor: string;
  isExternal?: boolean;
}

const headerSocials: SocialItem[] = [
  {
    name: 'LinkedIn',
    href: personalInfo.linkedin,
    icon: LinkedInIcon,
    hoverColor: '#0077B5',
    isExternal: true,
  },
  {
    name: 'Instagram',
    href: personalInfo.instagram,
    icon: InstagramIcon,
    hoverColor: '#E1306C',
    isExternal: true,
  },
  {
    name: 'Facebook',
    href: personalInfo.facebook,
    icon: FacebookIcon,
    hoverColor: '#1877F2',
    isExternal: true,
  },
  {
    name: 'X (Twitter)',
    href: personalInfo.twitter,
    icon: TwitterIcon,
    hoverColor: '#FFFFFF',
    isExternal: true,
  },
  {
    name: 'Threads',
    href: personalInfo.threads,
    icon: ThreadsIcon,
    hoverColor: '#FFFFFF',
    isExternal: true,
  },
];

export const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = homeConfig.navLinks;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'backdrop-blur-xl bg-[#030712]/85 border-b border-[#008CFF]/20 py-2.5 sm:py-3 shadow-[0_10px_30px_rgba(0,0,0,0.85)]'
          : 'bg-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-2 lg:gap-4">
        
        {/* ── LEFT: Custom Cyan JT Monogram Logo + Brand Name ── */}
        <Magnetic strength={0.2} maxOffset={8}>
          <a
            href="#hero"
            className="group flex items-center gap-2.5 sm:gap-3.5 shrink-0 focus:outline-none"
            aria-label="Joel Thomas – Homepage"
          >
            {/* Custom Cyan JT Monogram Logo with Neon Glow */}
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#00E5FF]/20 via-[#008CFF]/15 to-[#030712] border border-[#00E5FF]/60 flex items-center justify-center font-space font-extrabold text-white text-sm sm:text-base shadow-[0_0_15px_rgba(0,229,255,0.45)] group-hover:shadow-[0_0_25px_rgba(0,229,255,0.7)] group-hover:scale-105 transition-all duration-300">
              <span className="text-[#00E5FF] drop-shadow-[0_0_8px_#00E5FF]">
                {homeConfig.brand.monogram}
              </span>
            </div>

            <div className="flex flex-col">
              <span className="font-space text-sm sm:text-base lg:text-lg font-bold tracking-tight text-white uppercase group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#00E5FF] group-hover:via-[#008CFF] group-hover:to-[#A855F7] transition-all leading-tight">
                {homeConfig.brand.name}
              </span>
              <span className="font-space text-[10px] sm:text-[11px] font-semibold tracking-wider text-[#7DD3FC] uppercase">
                {homeConfig.brand.role}
              </span>
            </div>
          </a>
        </Magnetic>

        {/* ── CENTER: Navigation Pill ── */}
        {/* Order: Home, About, Projects, Skills, Education & Experience, Tools, Contact */}
        <nav
          className="hidden lg:flex items-center gap-0.5 xl:gap-1 px-2.5 xl:px-3 py-1.5 rounded-full bg-[#060D24]/50 border border-[#008CFF]/25 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
          aria-label="Main Navigation"
        >
          {navLinks.map((link: NavLink) => {
            const isActive =
              activeSection === link.id ||
              (link.id === 'hero' && (activeSection === 'hero' || activeSection === ''));
            const isCenterHighlight = link.id === 'projects' || link.id === 'experience';

            return (
              <a
                key={link.name}
                href={link.href}
                className={`relative px-2.5 xl:px-3.5 py-1.5 font-space text-[11px] xl:text-xs font-semibold tracking-wider uppercase transition-all duration-200 select-none whitespace-nowrap rounded-full ${
                  isActive
                    ? 'text-white font-bold'
                    : isCenterHighlight
                    ? 'text-[#E2E8F0] hover:text-white hover:bg-[#008CFF]/15'
                    : 'text-[#94A3B8] hover:text-white hover:bg-white/5'
                }`}
              >
                <span>{link.name}</span>

                {/* Animated Cyan Glow Underline beneath Active Link */}
                {isActive && (
                  <motion.div
                    layoutId="activeNavUnderline"
                    className="absolute bottom-0 inset-x-2.5 h-[2px] bg-gradient-to-r from-[#008CFF] via-[#00E5FF] to-[#008CFF] shadow-[0_0_10px_#00E5FF] rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* ── RIGHT: Social Logos (Instagram, Facebook, X, Threads) + Let's Talk ── */}
        <div className="flex items-center gap-2 xl:gap-3 shrink-0">
          
          {/* Desktop 5 Social Media Logos near "Let's Talk" */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-1.5">
            {headerSocials.map(({ name, href, icon: Icon, hoverColor, isExternal }) => (
              <Magnetic key={name} strength={0.3} maxOffset={6}>
                <a
                  href={href}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noopener noreferrer' : undefined}
                  className="w-7 h-7 xl:w-8 xl:h-8 rounded-lg flex items-center justify-center text-[#94A3B8] transition-all duration-200 hover:scale-110"
                  style={{
                    border: '1px solid rgba(0, 140, 255, 0.25)',
                    background: 'rgba(6, 13, 36, 0.65)',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = '#00E5FF';
                    el.style.color = hoverColor;
                    el.style.boxShadow = '0 0 12px rgba(0, 229, 255, 0.45)';
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = 'rgba(0, 140, 255, 0.25)';
                    el.style.color = '#94A3B8';
                    el.style.boxShadow = 'none';
                  }}
                  aria-label={name}
                  title={name}
                >
                  <Icon size={14} />
                </a>
              </Magnetic>
            ))}
          </div>

          {/* Thin subtle divider */}
          <div className="hidden lg:block w-px h-5 bg-[#008CFF]/25 mx-0.5" aria-hidden="true" />

          {/* Rounded Outlined "Let's Talk" Button with Magnetic hover */}
          <Magnetic strength={0.25} maxOffset={8}>
            <motion.a
              href={homeConfig.hero.letsTalkAction.href}
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="hidden sm:inline-flex group relative px-4 xl:px-5 py-2 rounded-full font-space text-[11px] xl:text-xs font-bold tracking-wider uppercase text-white items-center gap-2 border border-[#008CFF]/60 hover:border-[#00E5FF] bg-[#060D24]/60 hover:bg-[#008CFF]/15 backdrop-blur-md shadow-[0_0_18px_rgba(0,140,255,0.25)] hover:shadow-[0_0_28px_rgba(0,229,255,0.5)] transition-all duration-300"
            >
              <Send
                size={13}
                className="text-[#00E5FF] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
              <span>{homeConfig.hero.letsTalkAction.label}</span>
            </motion.a>
          </Magnetic>

          {/* Mobile Menu Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl border border-[#008CFF]/30 bg-[#060D24]/70 text-[#94A3B8] hover:text-white focus:outline-none transition-colors"
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* ── Mobile Drawer Navigation Menu ── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden px-6 py-5 border-t border-[#008CFF]/20 bg-[#030712]/95 backdrop-blur-2xl overflow-hidden"
          >
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-2.5 rounded-xl font-space text-xs font-semibold tracking-wider uppercase transition-colors flex items-center justify-between ${
                      isActive
                        ? 'bg-[#008CFF]/15 text-[#00E5FF] border border-[#008CFF]/30'
                        : 'text-slate-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span>{link.name}</span>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-[#00E5FF] shadow-[0_0_6px_#00E5FF]" />
                    )}
                  </a>
                );
              })}

              {/* Mobile Social Logos Row */}
              <div className="pt-3 pb-2 flex items-center justify-center gap-2.5 border-t border-[#008CFF]/15">
                {headerSocials.map(({ name, href, icon: Icon, hoverColor, isExternal }) => (
                  <a
                    key={name}
                    href={href}
                    target={isExternal ? '_blank' : undefined}
                    rel={isExternal ? 'noopener noreferrer' : undefined}
                    className="w-10 h-10 rounded-xl border border-[#008CFF]/25 bg-[#060D24]/70 flex items-center justify-center text-[#94A3B8] hover:text-white transition-colors"
                    style={{ color: '#94A3B8' }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.color = hoverColor;
                      (e.currentTarget as HTMLElement).style.borderColor = '#00E5FF';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.color = '#94A3B8';
                      (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0, 140, 255, 0.25)';
                    }}
                    aria-label={name}
                    title={name}
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>

              <div className="pt-2">
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-3 rounded-full font-space text-xs font-bold tracking-wider uppercase text-center text-slate-950 bg-gradient-to-r from-[#00E5FF] to-[#008CFF] shadow-[0_0_20px_rgba(0,140,255,0.4)] block"
                >
                  Let's Talk
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
