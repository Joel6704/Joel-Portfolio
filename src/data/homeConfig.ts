export interface NavLink {
  name: string;
  href: string;
  id: string;
}

export interface StatCardConfig {
  id: string;
  value: string;
  numericTarget: number;
  suffix?: string;
  label: string;
  sublabel: string;
  icon: 'TrendingUp' | 'BarChart3' | 'Target' | 'Award';
}

export interface ServiceItemConfig {
  id: string;
  line1: string;
  line2: string;
  icon: 'Megaphone' | 'TrendingUp' | 'Sparkles' | 'Users' | 'Target' | 'Cloud';
  description: string;
}

export interface BrandConfig {
  id: string;
  name: string;
  logoUrl?: string;
  tagline?: string;
}

export const homeConfig = {
  // Brand & Identity
  brand: {
    monogram: 'JT',
    name: 'Joel Thomas',
    role: 'Digital Marketer',
    categoryBadge: 'Digital Marketing • Social Media • Microsoft Azure',
  },

  // Navigation Links
  navLinks: [
    { name: 'Home', href: '#hero', id: 'hero' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'Skills', href: '#skills', id: 'skills' },
    { name: 'Education & Experience', href: '#experience', id: 'experience' },
    { name: 'Tools', href: '#tools', id: 'tools' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ] as NavLink[],

  // Hero Headline & Narrative
  hero: {
    headline: {
      line1: 'I BUILD DIGITAL',
      line2: 'STRATEGIES THAT',
      line3: 'DRIVE REVENUE',
    },
    description:
      'I help brands grow through data-driven digital marketing, creative content, and performance-focused strategies.',
    primaryAction: {
      label: 'View My Work',
      href: '#projects',
    },
    secondaryAction: {
      label: 'View Projects',
      href: '#projects',
    },
    letsTalkAction: {
      label: "Let's Talk",
      href: '#contact',
    },
  },

  // Portrait & Hand-drawn annotation
  portrait: {
    src: '/portrait-hero-transparent.png',
    fallbackSrc: '/portrait-hero-clean.png',
    alt: 'Joel Thomas — Professional Digital Marketer',
    annotation: {
      name: 'Joel Thomas',
      title: 'Digital Marketer',
    },
  },

  // Floating Glassmorphism Statistics
  stats: [
    {
      id: 'stat-experience',
      value: '3+',
      numericTarget: 3,
      suffix: '+',
      label: 'Years Experience',
      sublabel: 'Proven growth record',
      icon: 'TrendingUp',
    },
    {
      id: 'stat-satisfaction',
      value: '100%',
      numericTarget: 100,
      suffix: '%',
      label: 'Client Satisfaction',
      sublabel: 'Verified excellence',
      icon: 'BarChart3',
    },
    {
      id: 'stat-campaigns',
      value: '50+',
      numericTarget: 50,
      suffix: '+',
      label: 'Campaigns & Projects',
      sublabel: 'Delivering ROI',
      icon: 'Target',
    },
  ] as StatCardConfig[],

  // Service Feature Panel (Horizontal under hero)
  services: [
    {
      id: 'social-media',
      line1: 'Social Media',
      line2: 'Management',
      icon: 'Megaphone',
      description: 'Multi-platform presence & audience growth',
    },
    {
      id: 'content-strategy',
      line1: 'Content Creation',
      line2: '& Strategy',
      icon: 'TrendingUp',
      description: 'High-retention storytelling & visual campaigns',
    },
    {
      id: 'ai-design-video',
      line1: 'AI Graphics Desiging',
      line2: '& Video Editing',
      icon: 'Sparkles',
      description: 'Next-generation visuals & short-form video',
    },
    {
      id: 'microsoft-azure',
      line1: 'Microsoft Azure',
      line2: 'Cloud Computing',
      icon: 'Cloud',
      description: 'Cloud infrastructure, virtual machines & Azure deployment fundamentals',
    },
  ] as ServiceItemConfig[],

  // Trusted By Brands Strip (All Verified Official Logos)
  trustedBrands: [
    {
      id: 'prep-academy',
      name: 'Prep Academy',
      logoUrl: '/logos/prep-academy-white-bg.png',
    },
    {
      id: 'careeriq360',
      name: 'CareerIQ360',
      logoUrl: '/logos/careeriq360-white-bg.png',
    },
    {
      id: 'pixelboho',
      name: 'PixelBoho',
      logoUrl: '/logos/pixelboho-white-bg.png',
    },
    {
      id: 'whatnext',
      name: 'WhatNext',
      logoUrl: '/logos/whatnext-white-bg.png',
    },
    {
      id: 'dr-cent',
      name: 'Dr Scent',
      logoUrl: '/logos/drscent-white-bg.png',
    },
    {
      id: 'kannattu',
      name: 'Kannattu Arun Group',
      logoUrl: '/logos/kannattu-white-bg.png',
    },
  ] as BrandConfig[],

  // Interactive Cursor Prompt
  cursorPrompt: {
    text: 'Move your cursor for a dynamic experience',
  },
};
