import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import {
  LinkedInIcon,
  InstagramIcon,
  FacebookIcon,
  TwitterIcon,
  ThreadsIcon,
} from './Icons';
import { personalInfo } from '../data/portfolioData';

interface NavbarProps {
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      setIsScrolled(currentScroll > 40);
      if (totalScroll > 0) {
        setScrollProgress((currentScroll / totalScroll) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero', id: 'hero' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'Skills', href: '#skills', id: 'skills' },
    { name: 'Education & Experience', href: '#experience', id: 'experience' },
    { name: 'Tools', href: '#tools', id: 'tools' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  const socialLinks = [
    {
      name: 'LinkedIn',
      href: personalInfo.linkedin,
      icon: LinkedInIcon,
      label: 'LinkedIn Profile',
      isExternal: true,
    },
    {
      name: 'Instagram',
      href: personalInfo.instagram,
      icon: InstagramIcon,
      label: 'Instagram Profile',
      isExternal: true,
    },
    {
      name: 'Facebook',
      href: personalInfo.facebook,
      icon: FacebookIcon,
      label: 'Facebook Profile',
      isExternal: true,
    },
    {
      name: 'X (Twitter)',
      href: personalInfo.twitter,
      icon: TwitterIcon,
      label: 'Twitter / X Profile',
      isExternal: true,
    },
    {
      name: 'Threads',
      href: personalInfo.threads,
      icon: ThreadsIcon,
      label: 'Threads Profile',
      isExternal: true,
    },
  ];

  return (
    <>
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-[2px] bg-transparent z-50">
        <div
          className="h-full transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%`, backgroundColor: '#0066FF', boxShadow: '0 0 10px #0066FF' }}
        />
      </div>

      {/* Main Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled
            ? 'glass-nav-dark py-3 shadow-lg shadow-black/50'
            : 'bg-transparent py-5'
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between">

            {/* Brand: Stylized Monogram Logo + Name + Title matching reference */}
            <a
              href="#hero"
              className="group focus:outline-none shrink-0 flex items-center gap-3"
              aria-label="Joel Thomas – Return to homepage"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0066FF] to-[#0047BA] flex items-center justify-center font-display font-black text-white text-sm shadow-[0_0_14px_rgba(0,102,255,0.45)] group-hover:scale-105 transition-transform">
                JT
              </div>
              <div className="flex flex-col">
                <div className="font-heading text-sm sm:text-base font-bold tracking-[0.14em] text-white uppercase leading-none group-hover:text-[#38BDF8] transition-colors">
                  Joel Thomas
                </div>
                <div
                  className="font-heading text-[10px] font-semibold tracking-[0.2em] uppercase mt-0.5 text-[#38BDF8]"
                >
                  Digital Marketer
                </div>
              </div>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-0" aria-label="Main Navigation">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    className={`px-3 lg:px-4 py-2 font-body text-[11px] font-medium tracking-[0.1em] uppercase transition-all duration-200 ${isActive
                        ? 'text-white border-b-2 border-[#0066FF]'
                        : 'text-silver-300 hover:text-white'
                      }`}
                  >
                    {link.name}
                  </a>
                );
              })}
            </nav>

            {/* Right side: 4 Clickable Social & Contact Logos + Connect CTA */}
            <div className="flex items-center gap-2.5 sm:gap-3.5">
              <div className="flex items-center gap-1.5 sm:gap-2">
                {socialLinks.map(({ name, href, icon: Icon, label, isExternal }) => (
                  <a
                    key={name}
                    href={href}
                    target={isExternal ? '_blank' : undefined}
                    rel={isExternal ? 'noopener noreferrer' : undefined}
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-sm flex items-center justify-center text-silver-400 hover:text-white transition-all duration-200 hover:scale-105"
                    style={{
                      border: '1px solid #172554',
                      background: 'rgba(10, 18, 40, 0.6)',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = '#00E5FF';
                      (e.currentTarget as HTMLElement).style.color = '#00E5FF';
                      (e.currentTarget as HTMLElement).style.boxShadow = '0 0 12px rgba(0, 229, 255, 0.45)';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = '#172554';
                      (e.currentTarget as HTMLElement).style.color = '';
                      (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                    }}
                    aria-label={label}
                    title={name}
                  >
                    <Icon size={14} />
                  </a>
                ))}
              </div>

              <a
                href="#contact"
                className="hidden xl:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg font-heading text-xs font-bold tracking-[0.12em] uppercase text-white bg-[#0066FF] hover:bg-[#0052CC] shadow-[0_4px_16px_rgba(0,102,255,0.35)] hover:shadow-[0_6px_22px_rgba(0,102,255,0.55)] transition-all"
              >
                <span>LET'S TALK</span>
                <span>↗</span>
              </a>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-1.5 text-silver-300 hover:text-white md:hidden focus:outline-none"
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div
            className="md:hidden px-6 pt-4 pb-6 mt-1 border-t"
            style={{ backgroundColor: '#060B18', borderColor: '#172554' }}
          >
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-3 py-2.5 font-heading text-xs font-medium tracking-[0.1em] uppercase transition-colors flex items-center justify-between ${isActive
                        ? 'text-white border-l-2 pl-4'
                        : 'text-silver-300 hover:text-white'
                      }`}
                    style={isActive ? { borderColor: '#0066FF' } : {}}
                  >
                    <span>{link.name}</span>
                    {isActive && (
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: '#0066FF', boxShadow: '0 0 6px #0066FF' }}
                      />
                    )}
                  </a>
                );
              })}
            </div>

            <div className="mt-5 pt-4 border-t flex items-center justify-between" style={{ borderColor: '#172554' }}>
              <div className="flex items-center gap-2.5">
                {socialLinks.map(({ name, href, icon: Icon, label, isExternal }) => (
                  <a
                    key={name}
                    href={href}
                    target={isExternal ? '_blank' : undefined}
                    rel={isExternal ? 'noopener noreferrer' : undefined}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-silver-400 hover:text-white transition-colors"
                    style={{
                      border: '1px solid rgba(0, 102, 255, 0.3)',
                      background: 'rgba(10, 18, 40, 0.7)',
                    }}
                    aria-label={label}
                    title={name}
                  >
                    <Icon size={15} />
                  </a>
                ))}
              </div>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2 rounded-lg font-heading text-xs font-bold tracking-wider uppercase text-white bg-[#0066FF] shadow-lg shadow-[#0066FF]/30"
              >
                LET'S TALK ↗
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
