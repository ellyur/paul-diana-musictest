import { TypeAnimation } from 'react-type-animation';
import { useState, useEffect, useRef } from 'react';
import { useAnimationContext } from '@/contexts/AnimationContext';
import { optimizeCloudinaryVideo } from '@/lib/cloudinaryOptimize';

const heroVideo = optimizeCloudinaryVideo(
  "https://res.cloudinary.com/dr3xey7h9/video/upload/v1760101530/top_page_eeee0w.mp4",
  { width: 1920, quality: 'auto:low' }
);

interface HeroSectionProps {
  audioRef: React.RefObject<HTMLAudioElement>;
}

const HeroSection = ({ audioRef }: HeroSectionProps) => {
  const [showElements, setShowElements] = useState(false);
  const { animationsEnabled } = useAnimationContext();
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <section 
      className="hero-section bg-white relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background Video */}
      <video
        ref={videoRef}
        src={heroVideo}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        data-testid="hero-video"
      />

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content - Centered Names */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6">
        {/* Tagline */}
        <div className={`transition-all duration-700 mb-4 ${(animationsEnabled && showElements) ? 'animate-fade-up opacity-100' : (!animationsEnabled ? 'opacity-100' : 'opacity-0')}`}>
          <p className="text-sm sm:text-base md:text-lg text-white font-light tracking-[0.3em] uppercase" data-testid="text-tagline" style={{ fontFamily: 'Satoshi, sans-serif', fontWeight: 300 }}>
            WHERE LOVE BLOOMS
          </p>
        </div>
        
        {/* Names */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-white tracking-wide" data-testid="text-main-invitation" style={{ fontFamily: 'Boska, serif', fontWeight: 300 }}>
          {animationsEnabled ? (
            <TypeAnimation
              sequence={[
                'PAUL & DIANA',
                () => {
                  setShowElements(true);
                }
              ]}
              wrapper="span"
              speed={{ type: 'keyStrokeDelayInMs', value: 273 }}
              style={{ 
                display: 'inline-block'
              }}
              cursor={true}
              repeat={0}
              className="typewriter-text"
            />
          ) : (
            <span 
              style={{ 
                display: 'inline-block'
              }}
              className="typewriter-text"
            >
              PAUL & DIANA
            </span>
          )}
        </h1>

        {/* Date */}
        <div className={`transition-all duration-700 mt-6 ${(animationsEnabled && showElements) ? 'animate-fade-up opacity-100' : (!animationsEnabled ? 'opacity-100' : 'opacity-0')}`}>
          <p className="text-sm sm:text-base md:text-lg text-white font-light tracking-[0.3em] uppercase" data-testid="text-date" style={{ fontFamily: 'Satoshi, sans-serif', fontWeight: 300 }}>
            December 26, 2025 . Moncada Tarlac
          </p>
        </div>
      </div>

      {/* Scroll Down Arrow - Bottom of screen */}
      <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 transition-all duration-700 ${(animationsEnabled && showElements) ? 'animate-fade-up opacity-100' : (!animationsEnabled ? 'opacity-100' : 'opacity-0')}`}>
        <div className="flex flex-col items-center justify-center space-y-2 text-center">
          <span className="text-xs sm:text-sm text-white/80">Scroll down</span>
          <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white animate-bounce" viewBox="0 0 24 24">
            <path fill="currentColor" d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/>
          </svg>
        </div>
      </div>

      {/* Styles */}
      <style>{`
        .hero-section {
          min-height: 100vh !important;
        }
        @media (min-width: 768px) {
          .hero-section {
            min-height: 100vh !important;
          }
        }
        @media (max-width: 767px) {
          .hero-section {
            background-attachment: scroll !important;
            background-size: cover !important;
            padding-top: 1rem;
            padding-bottom: 1rem;
            min-height: 100vh !important;
          }
          .hero-section h1 {
            font-size: 3rem !important;
            line-height: 1.1 !important;
          }
        }

        /* Custom underscore cursor for TypeAnimation */
        .typewriter-text .react-type-animation-cursor {
          color: #111827;
          animation: blink 1.2s infinite;
        }

        .typewriter-text .react-type-animation-cursor::after {
          content: '_';
          font-weight: bold;
        }

        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;