import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HomePage } from './components/homepage';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { PersonalSkills } from './components/PersonalSkills';
import { EducationExperience } from './components/EducationExperience';
import { ToolsSection } from './components/ToolsSection';
import { ContactSection } from './components/ContactSection';
import { ProjectModal } from './components/ProjectModal';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { WelcomeIntro } from './components/WelcomeIntro';
import type { Project } from './types';

export const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Manage initial welcome intro state (Intro is always initial screen on load/refresh unless prefers-reduced-motion)
  const [showIntro, setShowIntro] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      try {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) {
          return false;
        }
      } catch {
        return true;
      }
    }
    return true;
  });

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  // Copy to clipboard handler with feedback toast
  const handleCopyText = (text: string, label: string) => {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          setToastMessage(`${label} copied to clipboard!`);
          setTimeout(() => setToastMessage(null), 3500);
        })
        .catch(() => {
          setToastMessage(`Selected: ${text}`);
          setTimeout(() => setToastMessage(null), 3500);
        });
    } else {
      setToastMessage(`Selected: ${text}`);
      setTimeout(() => setToastMessage(null), 3500);
    }
  };

  // Section observer to update active navigation state
  useEffect(() => {
    // Only run intersection observer after intro completes and HomePage is mounted
    if (showIntro) return;

    const sectionIds = [
      'hero',
      'about',
      'projects',
      'skills',
      'experience',
      'tools',
      'contact',
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0,
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, [showIntro]);

  return (
    <>
      <AnimatePresence mode="wait">
        {showIntro ? (
          /* 1. Coordinated Welcome Intro Animation Sequence: First & Only screen on initial open / refresh */
          <WelcomeIntro key="intro" onComplete={handleIntroComplete} />
        ) : (
          /* 2. Main Home Page & Content: Mounts cleanly after intro with smooth crossfade */
          <motion.div
            key="home-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="w-full min-h-screen"
          >
            <HomePage activeSection={activeSection}>
              {/* 3. About Me Section */}
              <About />

              {/* 4. Featured Projects / Work */}
              <Projects onSelectProject={setSelectedProject} />

              {/* 5. Personal Skills Section */}
              <PersonalSkills />

              {/* 6. Education & Experience Section */}
              <EducationExperience />

              {/* 7. Tools I Use */}
              <ToolsSection />

              {/* 8. Contact Section */}
              <ContactSection onCopyText={handleCopyText} />

              {/* 9. Footer */}
              <Footer />

              {/* Interactive Case Study Modal */}
              <ProjectModal
                project={selectedProject}
                onClose={() => setSelectedProject(null)}
              />

              {/* Interactive Toast Notification */}
              <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
            </HomePage>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default App;
