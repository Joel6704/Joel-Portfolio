import React from 'react';
import { motion } from 'framer-motion';
import { CategoryBadge } from './CategoryBadge';
import { HeroHeadline } from './HeroHeadline';
import { HeroActions } from './HeroActions';
import { ProfilePortrait } from './ProfilePortrait';
import { ServicesPanel } from './ServicesPanel';
import { CursorExperienceBadge } from './InteractiveCursor';
import { homeConfig } from '../../data/homeConfig';

export const HeroSection: React.FC = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-between pt-28 sm:pt-32 lg:pt-36 pb-12 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full flex-1 flex flex-col justify-center">
        {/* Main Two-Column Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column (7 cols): Category Badge, Headline, Description, CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center z-20">
            {/* Category Badge */}
            <CategoryBadge text={homeConfig.brand.categoryBadge} />

            {/* Main Headline */}
            <HeroHeadline
              line1={homeConfig.hero.headline.line1}
              line2={homeConfig.hero.headline.line2}
              line3={homeConfig.hero.headline.line3}
            />

            {/* Supporting Description */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease: 'easeOut' }}
              className="font-space text-slate-300 text-base sm:text-lg lg:text-xl font-normal leading-relaxed max-w-xl mb-8"
            >
              {homeConfig.hero.description}
            </motion.p>

            {/* Call to Action Buttons */}
            <HeroActions
              primaryLabel={homeConfig.hero.primaryAction.label}
              primaryHref={homeConfig.hero.primaryAction.href}
            />
          </div>

          {/* Right Column (5 cols): Portrait with Geometric Frame in Front */}
          <div className="lg:col-span-5 relative flex items-center justify-center lg:justify-end z-20">
            <ProfilePortrait
              imageSrc={homeConfig.portrait.src}
              fallbackSrc={homeConfig.portrait.fallbackSrc}
              name={homeConfig.portrait.annotation.name}
              title={homeConfig.portrait.annotation.title}
            />
          </div>
        </div>

        {/* Service Feature Panel (Horizontal under hero) */}
        <ServicesPanel services={homeConfig.services} />

        {/* Lower Right Interactive Cursor Experience Prompt */}
        <div className="mt-8 flex items-center justify-between z-20">
          <div className="hidden sm:flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-ping" />
            <span className="font-space text-xs text-[#7DD3FC]/80 font-medium uppercase tracking-wider">
              Available for Strategic Marketing & Growth Projects
            </span>
          </div>

          <CursorExperienceBadge />
        </div>
      </div>
    </section>
  );
};
