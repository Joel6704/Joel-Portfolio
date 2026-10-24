/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Royal Blue & Midnight Navy Palette (Adrian Knox Theme)
        royal: {
          DEFAULT: '#0066FF',
          950: '#050814',
          900: '#080E24',
          800: '#0A1332',
          700: '#0047BA',
          600: '#0055D4',
          500: '#0066FF',
          400: '#2B7FFF',
          300: '#60A5FA',
          200: '#93C5FD',
          100: '#DBEAFE',
        },
        navy: {
          DEFAULT: '#060B18',
          950: '#03060F',
          900: '#060B18',
          850: '#080E21',
          800: '#0B132B',
          700: '#0E1A3C',
          600: '#14234F',
        },
        // Primary backgrounds
        obsidian: {
          DEFAULT: '#050814',
          950: '#03050D',
          900: '#050814',
          850: '#070C1E',
          800: '#0A112A',
        },
        burgundy: {
          DEFAULT: '#080E21',
          900: '#080E21',
          800: '#0B132B',
          700: '#0E1A3C',
          600: '#132350',
        },
        // Accent reds mapped to electric royal blue
        crimson: {
          DEFAULT: '#0066FF',
          700: '#0047BA',
          600: '#0055D4',
          500: '#0066FF',
          400: '#2B7FFF',
          300: '#60A5FA',
          200: '#93C5FD',
        },
        // Dividers
        divider: {
          DEFAULT: '#14234F',
          dark: '#0E1A3C',
          light: '#1D3575',
        },
        // Text
        ivory: {
          DEFAULT: '#F8FAFC',
          100: '#FFFFFF',
          200: '#F8FAFC',
          300: '#E2E8F0',
        },
        silver: {
          DEFAULT: '#94A3B8',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
        },
      },
      fontFamily: {
        exo: ['"Exo 2"', 'sans-serif'],
        display: ['"Exo 2"', 'sans-serif'],
        heading: ['"Exo 2"', 'sans-serif'],
        space: ['"Exo 2"', 'sans-serif'],
        sora: ['"Exo 2"', 'sans-serif'],
        body: ['"Exo 2"', 'sans-serif'],
        sans: ['"Exo 2"', 'sans-serif'],
        intro: ['"Space Grotesk"', '"Plus Jakarta Sans"', 'sans-serif'],
        signature: ['"Alex Brush"', 'cursive'],
      },
      boxShadow: {
        'neon-blue': '0 0 20px rgba(0, 140, 255, 0.45)',
        'neon-cyan': '0 0 25px rgba(0, 229, 255, 0.55)',
        'neon-pill': '0 0 30px rgba(0, 140, 255, 0.5), 0 0 60px rgba(0, 229, 255, 0.3)',
        'red-sm': '0 0 12px rgba(0, 102, 255, 0.25)',
        'red-glow': '0 0 40px rgba(0, 102, 255, 0.35)',
        'red-lg': '0 0 70px rgba(0, 102, 255, 0.4)',
        'blue-sm': '0 0 12px rgba(0, 102, 255, 0.3)',
        'blue-glow': '0 0 40px rgba(0, 102, 255, 0.45)',
        'blue-lg': '0 0 70px rgba(0, 102, 255, 0.5)',
        'card-dark': '0 10px 30px -10px rgba(0,0,0,0.8), 0 0 0 1px rgba(0,102,255,0.12)',
        'card-hover': '0 20px 40px -15px rgba(0,0,0,0.9), 0 0 30px rgba(0,102,255,0.25)',
      },
      animation: {
        'pulse-slow': 'pulseGlow 6s ease-in-out infinite',
        'float-slow': 'float 7s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease forwards',
        'shimmer': 'shimmerSweep 3.5s linear infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
          '50%': { opacity: '0.6', transform: 'scale(1.06)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        shimmerSweep: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}
