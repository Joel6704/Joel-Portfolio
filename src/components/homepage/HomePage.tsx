import React from 'react';
import { Navbar } from './Navbar';
import { HeroSection } from './HeroSection';
import { TrustedBrands } from './TrustedBrands';
import { InteractiveCursor } from './InteractiveCursor';
import { BackgroundEffects } from './BackgroundEffects';
import { CursorSpotlight } from '../common/CursorSpotlight';
import { homeConfig } from '../../data/homeConfig';

interface HomePageProps {
  activeSection?: string;
  children?: React.ReactNode;
}

export const HomePage: React.FC<HomePageProps> = ({
  activeSection = 'hero',
  children,
}) => {
  return (
    <div className="relative min-h-screen bg-[#030712] text-[#F8FAFC] flex flex-col font-space selection:bg-[#008CFF] selection:text-white overflow-x-hidden">
      {/* 1. Custom Interactive Cursor Playground (Desktop only, trail & glowing ring) */}
      <InteractiveCursor />

      {/* 2. Cursor Spotlight (Mouse-following electric blue & purple radial glow) */}
      <CursorSpotlight />

      {/* 3. Layered Animated Midnight Background with Floating Particles & Neon Glows */}
      <BackgroundEffects />

      {/* 4. Transparent Floating Header with Cyan JT Monogram, Nav Links & "Let's Talk" CTA */}
      <Navbar activeSection={activeSection} />

      {/* 5. Main Hero Section (Two-Column Layout, Portrait, Stats, Services Panel) */}
      <main className="relative z-10 flex-1 w-full">
        <HeroSection />

        {/* 6. Full-Width Horizontal Brand Strip Marquee */}
        <TrustedBrands brands={homeConfig.trustedBrands} />

        {/* In-page Anchor Sections for Single-Page Navigation */}
        {children}
      </main>
    </div>
  );
};

export default HomePage;
