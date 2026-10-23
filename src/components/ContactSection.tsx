import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Copy,
  Check,
  ArrowUpRight,
  MessageSquare,
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

interface ContactSectionProps {
  onCopyText: (text: string, label: string) => void;
}

const leftVariants: Variants = {
  hidden: { opacity: 0, x: -30, y: 15 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration: 0.75,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const centerVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      delay: 0.15,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const rightVariants: Variants = {
  hidden: { opacity: 0, scale: 0.94, y: 25 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.85,
      delay: 0.25,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const showcaseImages = [
  '/contact-showcase-1.jpg',
  '/contact-showcase-2.jpg',
  '/contact-showcase-3.jpg',
];

// Pre-defined deterministic particles for smooth performance and purity
const PARTICLES = [
  { id: 1, left: '10%', top: '18%', size: 2.5, duration: 9, delay: 0 },
  { id: 2, left: '26%', top: '65%', size: 3, duration: 11, delay: 1.5 },
  { id: 3, left: '44%', top: '14%', size: 2, duration: 8, delay: 0.8 },
  { id: 4, left: '58%', top: '78%', size: 3.5, duration: 13, delay: 2 },
  { id: 5, left: '74%', top: '22%', size: 2, duration: 10, delay: 1.2 },
  { id: 6, left: '88%', top: '58%', size: 3, duration: 12, delay: 2.5 },
  { id: 7, left: '16%', top: '42%', size: 2, duration: 9.5, delay: 3 },
  { id: 8, left: '48%', top: '48%', size: 2.5, duration: 10.5, delay: 1.8 },
  { id: 9, left: '84%', top: '12%', size: 2, duration: 8.5, delay: 2.2 },
  { id: 10, left: '34%', top: '86%', size: 2.5, duration: 11.5, delay: 0.5 },
  { id: 11, left: '66%', top: '38%', size: 3, duration: 9, delay: 3.2 },
  { id: 12, left: '92%', top: '84%', size: 2, duration: 12.5, delay: 1 },
];

export const ContactSection: React.FC<ContactSectionProps> = ({ onCopyText }) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleCopy = (text: string, label: string, key: string) => {
    onCopyText(text, label);
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey(null);
    }, 2500);
  };

  // Automatically scroll between original showcase images every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % showcaseImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Desktop interactive mouse ambient glow tracking
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      aria-labelledby="contact-heading"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="py-24 sm:py-28 lg:py-32 relative overflow-hidden"
      style={{
        backgroundColor: '#050816',
        borderTop: '1px solid rgba(37, 99, 235, 0.25)',
      }}
    >
      {/* ══════════════════════════════════════════════════════════
          1. PREMIUM ANIMATED CINEMATIC BACKGROUND
          ══════════════════════════════════════════════════════════ */}

      {/* Deep Navy/Black Radial Core */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 0%, #0A1024 0%, #050816 70%, #03050E 100%)',
        }}
        aria-hidden="true"
      />

      {/* Floating Ambient Electric-Blue Light Orb (Top-Left) */}
      <motion.div
        className="absolute -top-32 -left-20 w-[640px] h-[540px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(37, 99, 235, 0.22) 0%, rgba(10, 16, 36, 0.08) 50%, transparent 70%)',
          filter: 'blur(80px)',
        }}
        animate={{
          x: [-20, 20, -20],
          y: [-15, 15, -15],
          scale: [1, 1.1, 1],
          opacity: [0.65, 0.9, 0.65],
        }}
        transition={{ repeat: Infinity, duration: 12, ease: 'easeInOut' }}
        aria-hidden="true"
      />

      {/* Floating Ambient Cyan Light Orb (Bottom-Right behind Laptop) */}
      <motion.div
        className="absolute -bottom-24 -right-16 w-[680px] h-[580px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(34, 211, 238, 0.18) 0%, rgba(37, 99, 235, 0.12) 45%, transparent 70%)',
          filter: 'blur(85px)',
        }}
        animate={{
          x: [20, -20, 20],
          y: [15, -15, 15],
          scale: [1.08, 0.96, 1.08],
          opacity: [0.6, 0.85, 0.6],
        }}
        transition={{ repeat: Infinity, duration: 14, ease: 'easeInOut' }}
        aria-hidden="true"
      />

      {/* Subtle Violet Depth Highlight Orb (Center/Left) */}
      <motion.div
        className="absolute top-1/3 left-1/4 w-[480px] h-[420px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, rgba(37, 99, 235, 0.05) 50%, transparent 70%)',
          filter: 'blur(75px)',
        }}
        animate={{
          x: [-15, 25, -15],
          y: [20, -15, 20],
          opacity: [0.35, 0.65, 0.35],
        }}
        transition={{ repeat: Infinity, duration: 16, ease: 'easeInOut' }}
        aria-hidden="true"
      />

      {/* Subtle Floating Particle Specks Field */}
      {PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            backgroundColor: '#22D3EE',
            boxShadow: '0 0 8px #22D3EE, 0 0 14px rgba(37, 99, 235, 0.6)',
          }}
          animate={{
            y: [-14, 14, -14],
            x: [-7, 7, -7],
            opacity: [0.2, 0.75, 0.2],
          }}
          transition={{
            repeat: Infinity,
            duration: p.duration,
            delay: p.delay,
            ease: 'easeInOut',
          }}
          aria-hidden="true"
        />
      ))}

      {/* Fine Futuristic Digital Grid Lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(37, 99, 235, 0.45) 1px, transparent 1px), linear-gradient(to bottom, rgba(37, 99, 235, 0.45) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
        aria-hidden="true"
      />

      {/* Soft Vignette Lighting around edges */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, transparent 35%, rgba(5, 8, 22, 0.8) 100%)',
        }}
        aria-hidden="true"
      />

      {/* Desktop Mouse Pointer Subtle Ambient Glow */}
      {isHovered && (
        <div
          className="absolute pointer-events-none rounded-full transition-opacity duration-300 hidden md:block"
          style={{
            width: 460,
            height: 460,
            left: mousePos.x - 230,
            top: mousePos.y - 230,
            background:
              'radial-gradient(circle, rgba(34, 211, 238, 0.07) 0%, rgba(37, 99, 235, 0.04) 45%, transparent 70%)',
            filter: 'blur(35px)',
          }}
          aria-hidden="true"
        />
      )}

      {/* ══════════════════════════════════════════════════════════
          2. MAIN CONTENT CONTAINER
          ══════════════════════════════════════════════════════════ */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 xl:gap-14 items-center">

          {/* ──────────────────────────────────────────────────────────
              PART 1: LEFT SIDE — HEADING & AVAILABILITY
              ────────────────────────────────────────────────────────── */}
          <motion.div
            variants={leftVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="lg:col-span-4 flex flex-col justify-between h-full"
          >
            <div>
              {/* Modern Glassmorphic Section Tag */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#2563EB]/40 bg-[#0A1024]/75 backdrop-blur-md text-[#22D3EE] font-heading text-xs tracking-[0.16em] uppercase mb-6 shadow-[0_0_16px_rgba(37,99,235,0.25)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22D3EE] shadow-[0_0_8px_#22D3EE]" />
                <span>Get in Touch</span>
              </div>

              {/* Bold Futuristic Heading with Gradient & Drop Glow */}
              <h2
                id="contact-heading"
                className="font-heading text-4xl sm:text-5xl lg:text-[3.25rem] xl:text-[3.65rem] font-extrabold uppercase tracking-tight text-[#F8FAFC] leading-[1.04] mb-5"
              >
                LET'S WORK <br />
                <span className="bg-gradient-to-r from-[#2563EB] via-[#38BDF8] to-[#22D3EE] bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(37,99,235,0.55)]">
                  TOGETHER
                </span>
              </h2>

              {/* Supporting Text */}
              <p className="font-body text-[#94A3B8] text-sm sm:text-base leading-relaxed max-w-md mb-8 sm:mb-10">
                I'm currently open to new projects, business development opportunities, and strategic digital campaigns. Let's create something extraordinary that drives real business results.
              </p>
            </div>

            {/* Availability Indicator with Soft Cyan Pulse & Arrow Circle */}
            <div className="pt-2">
              <div className="inline-flex items-center gap-3 px-4 py-2.5 rounded-full border border-[#2563EB]/40 bg-gradient-to-r from-[#0A1024]/90 via-[#0A1024]/60 to-transparent backdrop-blur-md shadow-[0_0_24px_rgba(37,99,235,0.22)]">
                {/* Glowing cyan pulse beacon */}
                <span className="relative flex h-2.5 w-2.5 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22D3EE] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#22D3EE] shadow-[0_0_8px_#22D3EE]" />
                </span>

                <span className="font-heading text-xs font-bold tracking-[0.16em] uppercase text-[#F8FAFC]">
                  AVAILABLE FOR FREELANCE
                </span>

                {/* Arrow-Circle Icon */}
                <div className="w-6 h-6 rounded-full bg-[#2563EB]/25 border border-[#2563EB]/50 flex items-center justify-center text-[#22D3EE] shadow-[0_0_10px_rgba(34,211,238,0.25)]">
                  <ArrowUpRight size={13} />
                </div>
              </div>
            </div>
          </motion.div>

          {/* ──────────────────────────────────────────────────────────
              PART 2: CENTER — REFINED GLASSMORPHIC CONTACT PANEL
              ────────────────────────────────────────────────────────── */}
          <motion.div
            variants={centerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="lg:col-span-4 flex flex-col justify-center space-y-3 p-4 sm:p-5 rounded-2xl bg-[#0A1024]/65 backdrop-blur-md border border-[#2563EB]/25 shadow-[0_20px_50px_rgba(0,0,0,0.55),0_0_25px_rgba(37,99,235,0.1)] relative"
          >
            {/* Soft inner corner light highlight */}
            <div
              className="absolute top-0 right-0 w-32 h-32 pointer-events-none rounded-tr-2xl opacity-20"
              style={{
                background: 'radial-gradient(circle at top right, rgba(34, 211, 238, 0.4) 0%, transparent 70%)',
              }}
              aria-hidden="true"
            />

            {/* Row 1: Email */}
            <div className="group relative p-3.5 sm:p-4 rounded-xl border border-transparent hover:border-[#22D3EE]/30 hover:bg-[#050816]/60 transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.12)] hover:translate-x-1">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
                  {/* Glowing Cyan-Accented Icon */}
                  <div className="w-11 h-11 rounded-full shrink-0 flex items-center justify-center border border-[#2563EB]/40 bg-[#2563EB]/15 text-[#22D3EE] shadow-[0_0_15px_rgba(34,211,238,0.25)] group-hover:border-[#22D3EE] group-hover:bg-[#2563EB]/25 group-hover:shadow-[0_0_24px_rgba(34,211,238,0.5)] group-hover:scale-105 transition-all duration-300">
                    <Mail size={18} />
                  </div>

                  {/* Information Details */}
                  <div className="min-w-0">
                    <span className="block font-heading text-[10px] tracking-[0.18em] uppercase text-[#22D3EE] font-semibold mb-0.5">
                      EMAIL ADDRESS
                    </span>
                    <a
                      href={`mailto:${personalInfo.email}`}
                      className="font-body text-xs sm:text-sm font-medium text-[#F8FAFC] group-hover:text-[#22D3EE] transition-colors truncate block focus:outline-none focus-visible:underline"
                    >
                      {personalInfo.email}
                    </a>
                  </div>
                </div>

                {/* Quick Copy Button */}
                <button
                  type="button"
                  onClick={() => handleCopy(personalInfo.email, 'Email Address', 'email')}
                  className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-[#2563EB]/20 border border-transparent hover:border-[#2563EB]/40 transition-all cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-[#22D3EE]"
                  aria-label="Copy email address"
                  title="Copy email"
                >
                  {copiedKey === 'email' ? (
                    <Check size={14} className="text-emerald-400" />
                  ) : (
                    <Copy size={14} />
                  )}
                </button>
              </div>
            </div>

            {/* Row 2: Phone / WhatsApp */}
            {personalInfo.phone && (
              <div className="group relative p-3.5 sm:p-4 rounded-xl border border-transparent hover:border-[#22D3EE]/30 hover:bg-[#050816]/60 transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.12)] hover:translate-x-1">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
                    {/* Glowing Cyan-Accented Icon */}
                    <div className="w-11 h-11 rounded-full shrink-0 flex items-center justify-center border border-[#2563EB]/40 bg-[#2563EB]/15 text-[#22D3EE] shadow-[0_0_15px_rgba(34,211,238,0.25)] group-hover:border-[#22D3EE] group-hover:bg-[#2563EB]/25 group-hover:shadow-[0_0_24px_rgba(34,211,238,0.5)] group-hover:scale-105 transition-all duration-300">
                      <Phone size={18} />
                    </div>

                    {/* Information Details */}
                    <div className="min-w-0">
                      <span className="block font-heading text-[10px] tracking-[0.18em] uppercase text-[#22D3EE] font-semibold mb-0.5">
                        PHONE / WHATSAPP
                      </span>
                      <a
                        href={`tel:${personalInfo.phoneRaw}`}
                        className="font-body text-xs sm:text-sm font-medium text-[#F8FAFC] group-hover:text-[#22D3EE] transition-colors truncate block focus:outline-none focus-visible:underline"
                      >
                        {personalInfo.phone}
                      </a>
                    </div>
                  </div>

                  {/* Actions: WhatsApp Link or Copy */}
                  <div className="flex items-center gap-1">
                    {personalInfo.whatsapp && (
                      <a
                        href={personalInfo.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-[#2563EB]/20 border border-transparent hover:border-[#2563EB]/40 transition-all cursor-pointer"
                        aria-label="Chat on WhatsApp"
                        title="Chat on WhatsApp"
                      >
                        <MessageSquare size={14} />
                      </a>
                    )}
                    <button
                      type="button"
                      onClick={() => handleCopy(personalInfo.phoneRaw, 'Phone Number', 'phone')}
                      className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-[#2563EB]/20 border border-transparent hover:border-[#2563EB]/40 transition-all cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-[#22D3EE]"
                      aria-label="Copy phone number"
                      title="Copy phone"
                    >
                      {copiedKey === 'phone' ? (
                        <Check size={14} className="text-emerald-400" />
                      ) : (
                        <Copy size={14} />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Row 3: Location */}
            <div className="group relative p-3.5 sm:p-4 rounded-xl border border-transparent hover:border-[#22D3EE]/30 hover:bg-[#050816]/60 transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.12)] hover:translate-x-1">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
                  {/* Glowing Cyan-Accented Icon */}
                  <div className="w-11 h-11 rounded-full shrink-0 flex items-center justify-center border border-[#2563EB]/40 bg-[#2563EB]/15 text-[#22D3EE] shadow-[0_0_15px_rgba(34,211,238,0.25)] group-hover:border-[#22D3EE] group-hover:bg-[#2563EB]/25 group-hover:shadow-[0_0_24px_rgba(34,211,238,0.5)] group-hover:scale-105 transition-all duration-300">
                    <MapPin size={18} />
                  </div>

                  {/* Information Details */}
                  <div className="min-w-0">
                    <span className="block font-heading text-[10px] tracking-[0.18em] uppercase text-[#22D3EE] font-semibold mb-0.5">
                      LOCATION
                    </span>
                    <span className="font-body text-xs sm:text-sm font-medium text-[#F8FAFC] group-hover:text-[#22D3EE] transition-colors block">
                      {personalInfo.location}
                    </span>
                    <span className="font-body text-[11px] text-[#94A3B8] block mt-0.5">
                      Open to Remote & Relocation
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ──────────────────────────────────────────────────────────
              PART 3: RIGHT SIDE — FLOATING LAPTOP SHOWCASE WITH RIM LIGHTING
              ────────────────────────────────────────────────────────── */}
          <motion.div
            variants={rightVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="lg:col-span-4 flex items-center justify-center relative"
          >
            {/* Subtle Floating Animation on Desktop */}
            <motion.div
              animate={{ y: [-5, 5, -5] }}
              transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
              className="relative w-full"
            >
              {/* Soft Electric-Blue Ambient Backlight Glow behind Laptop */}
              <div
                className="absolute -inset-4 rounded-3xl pointer-events-none opacity-50 group-hover:opacity-85 transition-opacity duration-500"
                style={{
                  background:
                    'radial-gradient(circle, rgba(37, 99, 235, 0.4) 0%, rgba(34, 211, 238, 0.22) 45%, transparent 70%)',
                  filter: 'blur(35px)',
                }}
                aria-hidden="true"
              />

              {/* Violet Accent Glow on the Corner for Depth */}
              <div
                className="absolute -bottom-8 -left-8 w-44 h-44 rounded-full pointer-events-none opacity-35"
                style={{
                  background: 'radial-gradient(circle, rgba(139, 92, 246, 0.35) 0%, transparent 70%)',
                  filter: 'blur(30px)',
                }}
                aria-hidden="true"
              />

              {/* Laptop Showcase Frame with Cyan Rim Lighting */}
              <div className="relative w-full rounded-2xl overflow-hidden group shadow-[0_30px_70px_-15px_rgba(0,0,0,0.95),0_0_35px_rgba(34,211,238,0.2)] border border-[#2563EB]/35 hover:border-[#22D3EE]/70 ring-1 ring-[#22D3EE]/25 transition-all duration-500">
                <div className="relative aspect-[4/3] w-full bg-[#050816] overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentSlide}
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -40 }}
                      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute inset-0 w-full h-full"
                    >
                      <img
                        src={showcaseImages[currentSlide]}
                        alt={`Joel Thomas Portfolio Showcase ${currentSlide + 1}`}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* Screen Glass Reflection Sheen */}
                  <div
                    className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent opacity-60"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;
