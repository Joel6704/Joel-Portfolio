import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface ProfilePortraitProps {
  imageSrc: string;
  fallbackSrc: string;
  name: string;
  title: string;
}

export const ProfilePortrait: React.FC<ProfilePortraitProps> = ({
  imageSrc,
  fallbackSrc,
  name,
  title,
}) => {
  const [imgError, setImgError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(imageSrc);

  // Mouse Parallax Effect on Desktop
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 120 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Photo in the back moves with smooth mouse parallax
  const parallaxX = useTransform(smoothX, [-0.5, 0.5], [-14, 14]);
  const parallaxY = useTransform(smoothY, [-0.5, 0.5], [-10, 10]);

  // Foreground frame moves with subtle counter-depth for a 3D hologram illusion
  const frameX = useTransform(smoothX, [-0.5, 0.5], [5, -5]);
  const frameY = useTransform(smoothY, [-0.5, 0.5], [4, -4]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    };

    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  const handleImageError = () => {
    if (currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
    } else {
      setImgError(true);
    }
  };

  return (
    <div className="relative w-full max-w-[360px] sm:max-w-[440px] lg:max-w-[490px] flex items-center justify-center select-none">
      {/* 1. Ambient Royal & Cyan Aura Halo Glow (Far Back) */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[450px] lg:w-[520px] h-[340px] sm:h-[450px] lg:h-[520px] rounded-full pointer-events-none z-0"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(0, 140, 255, 0.45) 0%, rgba(0, 229, 255, 0.22) 35%, rgba(4, 9, 26, 0.05) 65%, transparent 75%)',
          filter: 'blur(55px)',
        }}
      />

      {/* 2. Dotted Geometric Grid Background Pattern (Back) */}
      <div
        className="absolute -inset-8 pointer-events-none opacity-25 rounded-3xl z-0"
        aria-hidden="true"
        style={{
          backgroundImage: 'radial-gradient(rgba(0, 229, 255, 0.35) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
          maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 75%)',
        }}
      />

      {/* 3. PERSON PHOTO (IN THE BACK - Layer z-10) */}
      <motion.div
        style={{ x: parallaxX, y: parallaxY }}
        animate={{ y: [-7, 7, -7] }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="relative z-10 w-full h-[450px] sm:h-[530px] lg:h-[590px] flex items-end justify-center"
      >
        {!imgError ? (
          <img
            src={currentSrc}
            alt="Joel Thomas — Digital Marketer & Growth Strategist"
            onError={handleImageError}
            className="w-full h-full object-contain object-bottom filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)] drop-shadow-[0_0_45px_rgba(0,140,255,0.45)] transition-all duration-500"
            loading="eager"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-[#060D20]/80 rounded-3xl border border-[#008CFF]/40 backdrop-blur-md">
            <div className="w-24 h-24 rounded-full mb-4 flex items-center justify-center font-space text-3xl font-extrabold border-2 border-[#00E5FF] bg-[#030712] text-[#00E5FF] shadow-[0_0_25px_rgba(0,229,255,0.5)]">
              JT
            </div>
            <div className="font-space text-xl tracking-wider text-white font-bold uppercase">
              {name}
            </div>
            <div className="font-space text-xs tracking-widest text-[#00E5FF] uppercase mt-1">
              {title}
            </div>
          </div>
        )}
      </motion.div>

      {/* 4. GLOWING GEOMETRIC FRAME (IN THE FRONT - Layer z-20) */}
      <motion.div
        style={{ x: frameX, y: frameY }}
        className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
      >
        <svg
          viewBox="0 0 420 540"
          className="w-full h-full max-w-[400px] sm:max-w-[470px] lg:max-w-[500px]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle Outer Frame Base Line */}
          <rect
            x="20"
            y="20"
            width="380"
            height="500"
            rx="32"
            stroke="rgba(0, 140, 255, 0.35)"
            strokeWidth="1.5"
          />

          {/* Animated Glowing Neon-Trace Stroke In Front of Photo */}
          <rect
            x="20"
            y="20"
            width="380"
            height="500"
            rx="32"
            stroke="#00E5FF"
            strokeWidth="2.5"
            className="animate-neon-trace"
            style={{
              filter: 'drop-shadow(0 0 12px #00E5FF) drop-shadow(0 0 25px rgba(0,140,255,0.7))',
            }}
          />

          {/* Futuristic Corner Brackets (Front Overlay) */}
          <path
            d="M 12 45 L 12 20 L 45 20"
            stroke="#00E5FF"
            strokeWidth="3"
            strokeLinecap="round"
            style={{ filter: 'drop-shadow(0 0 8px #00E5FF)' }}
          />
          <path
            d="M 408 45 L 408 20 L 375 20"
            stroke="#00E5FF"
            strokeWidth="3"
            strokeLinecap="round"
            style={{ filter: 'drop-shadow(0 0 8px #00E5FF)' }}
          />
          <path
            d="M 12 495 L 12 520 L 45 520"
            stroke="#00E5FF"
            strokeWidth="3"
            strokeLinecap="round"
            style={{ filter: 'drop-shadow(0 0 8px #00E5FF)' }}
          />
          <path
            d="M 408 495 L 408 520 L 375 520"
            stroke="#00E5FF"
            strokeWidth="3"
            strokeLinecap="round"
            style={{ filter: 'drop-shadow(0 0 8px #00E5FF)' }}
          />

          {/* Subtle Cyber HUD Tick Marks in Front */}
          <line x1="200" y1="20" x2="220" y2="20" stroke="#00E5FF" strokeWidth="2.5" />
          <line x1="20" y1="260" x2="20" y2="280" stroke="#00E5FF" strokeWidth="2.5" />
          <line x1="400" y1="260" x2="400" y2="280" stroke="#00E5FF" strokeWidth="2.5" />
        </svg>

        {/* Soft bottom gradient overlay in front of photo base to blend smoothly into frame edge */}
        <div
          className="absolute inset-x-8 bottom-4 h-24 rounded-b-3xl pointer-events-none"
          style={{
            background: 'linear-gradient(to top, rgba(3, 7, 18, 0.75) 0%, transparent 100%)',
          }}
        />
      </motion.div>

      {/* 5. Handwritten-Style Name Annotation (Layer z-30, In Front) */}
      <div className="absolute -left-4 sm:-left-10 bottom-10 sm:bottom-14 z-30 pointer-events-none select-none">
        <div className="flex flex-col items-start relative">
          <div className="font-signature text-3xl sm:text-4xl lg:text-[2.75rem] text-[#00E5FF] -rotate-6 filter drop-shadow-[0_0_12px_rgba(0,229,255,0.7)] leading-tight whitespace-nowrap">
            {name}
          </div>
          <div className="font-space text-[10px] sm:text-xs font-semibold tracking-wider text-[#7DD3FC] -rotate-6 uppercase -mt-1 ml-2 opacity-90">
            {title}
          </div>

          {/* Cyan Curved Arrow pointing toward portrait */}
          <svg
            className="w-16 h-12 sm:w-20 sm:h-14 mt-1 ml-6 text-[#00E5FF] filter drop-shadow-[0_0_8px_#00E5FF]"
            viewBox="0 0 100 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <marker
                id="cyan-arrow"
                viewBox="0 0 10 10"
                refX="6"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 1 L 8 5 L 0 9 z" fill="#00E5FF" />
              </marker>
            </defs>
            <path
              d="M 10 15 C 30 50, 65 50, 85 25"
              stroke="#00E5FF"
              strokeWidth="2.2"
              strokeLinecap="round"
              fill="none"
              markerEnd="url(#cyan-arrow)"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
