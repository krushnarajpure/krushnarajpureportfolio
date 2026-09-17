import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';

// SVG Logo Components with Official Brand Colors
const JavaLogo = () => (
  <svg viewBox="0 0 24 24" fill="#E76F00" className="w-full h-full">
    <path d="M8.851 18.56s-.917.534.653.714c1.902.218 2.874.187 4.969-.211 0 0 .552.346 1.321.646-4.699 2.013-10.633-.118-6.943-1.149M8.276 15.933s-1.028.761.542.924c2.032.209 3.636.227 6.413-.308 0 0 .384.389.987.602-5.679 1.661-12.007.13-7.942-1.218M13.116 11.475c1.158 1.333-.304 2.533-.304 2.533s2.939-1.518 1.589-3.418c-1.261-1.772-2.228-2.652 3.007-5.688 0-.001-8.216 2.051-4.292 6.573M19.33 20.504s.679.559-.747.991c-2.712.822-11.288 1.069-13.669.033-.857-.373.75-.89 1.254-.998 1.276-.268 2.001-.231 2.001-.231-.453-.319-2.928.627-1.255 1.277 4.548 1.739 16.517.739 14.416-1.072M9.292 13.21s-2.071.492-.724.671c2.774.353 4.967.304 8.753-.165 0 0 .722.312 1.65.482-5.796 1.176-12.247.924-9.679-.988M16.636 17.457c1.915-1.125 1.028-2.207.411-2.062-.151.035-.219.065-.219.065s.056-.088.164-.127c1.228-.43 2.169 1.267-.394 2.197 0-.001.019-.018.019-.018M14.401 6.698s2.071 2.071-1.962 5.257c-3.213 2.538-.733 3.986 0 5.637-1.876-1.693-3.247-3.183-2.324-4.567 1.352-2.028 5.098-3.009 4.286-6.327M10.065 22.927c1.838.118 4.658-.065 4.728-.923 0 0-.128.329-1.518.593-1.57.297-4.058.313-5.966.086 0 0 .235.194.1.412M9.335 18.56s-.076.076-.223.118c-2.436.639-8.583.277-6.965-.252.276-.089.842-.183 8.188.134M10.065 22.927"/>
  </svg>
);

const ReactLogo = () => (
  <svg viewBox="0 0 24 24" fill="#61DAFB" className="w-full h-full">
    <path d="M12 13.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z"/>
    <path d="M12 21.35c-1.8 0-3.5-.35-4.75-.95-1.1-.5-1.9-1.15-2.35-1.9-.45-.75-.45-1.5 0-2.25.45-.75 1.25-1.4 2.35-1.9 1.25-.6 2.95-.95 4.75-.95s3.5.35 4.75.95c1.1.5 1.9 1.15 2.35 1.9.45.75.45 1.5 0 2.25-.45.75-1.25 1.4-2.35 1.9-1.25.6-2.95.95-4.75.95Zm0-1.7c1.6 0 3.1.3 4.2.8.9.45 1.4.95 1.6 1.4.2.45.2.9 0 1.35-.2.45-.7.95-1.6 1.4-1.1.5-2.6.8-4.2.8s-3.1-.3-4.2-.8c-.9-.45-1.4-.95-1.6-1.4-.2-.45-.2-.9 0-1.35.2-.45.7-.95 1.6-1.4 1.1-.5 2.6-.8 4.2-.8Z"/>
    <path d="M5.65 17.35c-.9-1.55-.9-3.35-.1-5.15.75-1.65 2.1-3.1 3.85-4.15 1.55-.95 3.35-1.45 5.15-1.45 1.8 0 3.35.5 4.4 1.45 1.05.95 1.55 2.3 1.3 3.85-.25 1.55-1.2 3.1-2.75 4.4-1.55 1.3-3.5 2.1-5.55 2.1-2.05 0-3.75-.5-4.8-1.45-.75-.75-1.25-1.75-1.5-2.6Zm.85-1c.2.75.6 1.4 1.15 1.9.85.8 2.3 1.2 4.1 1.2 1.8 0 3.5-.7 4.85-1.85 1.35-1.15 2.15-2.45 2.35-3.8.2-1.35-.2-2.45-1.05-3.2-.85-.75-2.15-1.15-3.8-1.15-1.65 0-3.25.45-4.65 1.3-1.55.95-2.75 2.25-3.4 3.7-.65 1.45-.65 2.75.05 3.9Z"/>
    <path d="M18.35 17.35c-1.05.95-2.75 1.45-4.8 1.45-2.05 0-4-.8-5.55-2.1-1.55-1.3-2.5-2.85-2.75-4.4-.25-1.55.25-2.9 1.3-3.85 1.05-.95 2.6-1.45 4.4-1.45 1.8 0 3.6.5 5.15 1.45 1.75 1.05 3.1 2.5 3.85 4.15.8 1.8.8 3.6-.1 5.15-.25.85-.75 1.85-1.5 2.6Zm-.85-1c.7-1.15.7-2.45.05-3.9-.65-1.45-1.85-2.75-3.4-3.7-1.4-.85-3-1.3-4.65-1.3-1.65 0-2.95.4-3.8 1.15-.85.75-1.25 1.85-1.05 3.2.2 1.35 1 2.65 2.35 3.8 1.35 1.15 3.05 1.85 4.85 1.85 1.8 0 3.25-.4 4.1-1.2.55-.5.95-1.15 1.15-1.9Z"/>
  </svg>
);

const JavaScriptLogo = () => (
  <svg viewBox="0 0 24 24" fill="#F7DF1E" className="w-full h-full">
    <path d="M3 3h18v18H3V3zm16.525 13.707c-.131-.821-.666-1.511-2.252-2.155-.552-.259-1.165-.438-1.349-.854-.068-.248-.083-.382-.038-.524.152-.562.818-.728 1.345-.548.354.136.688.422.873.842.928-.595.928-.595 1.578-.992-.252-.38-.386-.548-.566-.708-.632-.595-1.482-.896-2.538-.896l-.622.075c-.596.15-1.163.438-1.495.896-.992 1.125-.712 3.085.496 3.896.632.422 1.558.837 1.678 1.458.075.548-.413.728-1.258.548-.517-.136-.803-.422-1.118-.842l-1.578.912c.188.3.391.438.688.688 1.458 1.125 3.408 1.07 4.548.075.632-.548.988-1.35.896-2.252l-.038-.075zm-7.355-5.346h-1.965v5.346c0 1.125.06 2.158-.075 2.475-.248.632-.896.548-1.193.438-.3-.15-.452-.36-.632-.632-.048-.075-.075-.136-.113-.188l-1.563.967c.26.548.632.992 1.118 1.273.728.422 1.707.548 2.738.33.668-.188 1.245-.562 1.558-1.118.438-.688.345-1.528.345-2.475v-5.446h.038z"/>
  </svg>
);

const MySQLLogo = () => (
  <svg viewBox="0 0 24 24" className="w-full h-full">
    <path d="M12.178 0c-3.629 0-6.572 1.091-6.572 2.435v4.871c0 1.344 2.943 2.435 6.572 2.435s6.572-1.091 6.572-2.435V2.435C18.75 1.091 15.807 0 12.178 0zm0 1.217c2.876 0 5.355.726 5.355 1.218s-2.479 1.218-5.355 1.218S6.823 2.927 6.823 2.435s2.479-1.218 5.355-1.218zM6.823 4.26v2.435c0 .492 2.479 1.218 5.355 1.218s5.355-.726 5.355-1.218V4.26c-1.26.726-3.29 1.091-5.355 1.091S8.083 4.986 6.823 4.26zm-5.355 4.87c-.492 0-.913.364-.913.857v3.043c0 1.344 2.943 2.435 6.572 2.435s6.572-1.091 6.572-2.435V9.987c0-.492-.421-.857-.913-.857-.492 0-.913.364-.913.857v2.435c0 .492-2.479 1.218-5.355 1.218s-5.355-.726-5.355-1.218V9.987c0-.492-.421-.857-.913-.857zm10.71 0c-.492 0-.913.364-.913.857v3.043c0 1.344 2.943 2.435 6.572 2.435s6.572-1.091 6.572-2.435V9.987c0-.492-.421-.857-.913-.857-.492 0-.913.364-.913.857v2.435c0 .492-49 1.218-5.355 1.218s-5.355-.726-5.355-1.218V9.987c0-.492-.421-.857-.913-.857z" fill="#00758F"/>
    <path d="M12.178 0c-3.629 0-6.572 1.091-6.572 2.435v4.871c0 1.344 2.943 2.435 6.572 2.435s6.572-1.091 6.572-2.435V2.435C18.75 1.091 15.807 0 12.178 0zm0 1.217c2.876 0 5.355.726 5.355 1.218s-2.479 1.218-5.355 1.218S6.823 2.927 6.823 2.435s2.479-1.218 5.355-1.218zM6.823 4.26v2.435c0 .492 2.479 1.218 5.355 1.218s5.355-.726 5.355-1.218V4.26c-1.26.726-3.29 1.091-5.355 1.091S8.083 4.986 6.823 4.26z" fill="#F29111"/>
  </svg>
);

const GitHubLogo = () => (
  <svg viewBox="0 0 24 24" fill="#FFFFFF" className="w-full h-full">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const LoadingScreen = () => {
  const [loading, setLoading] = useState(true);
  const [currentLogoIndex, setCurrentLogoIndex] = useState(0);
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showReadyMessage, setShowReadyMessage] = useState(false);

  const techLogos = [
    { component: JavaLogo, glowColor: '#E76F00' },
    { component: ReactLogo, glowColor: '#61DAFB' },
    { component: JavaScriptLogo, glowColor: '#F7DF1E' },
    { component: MySQLLogo, glowColor: '#00758F' },
    { component: GitHubLogo, glowColor: '#FFFFFF' },
  ];

  const titles = [
    'Java Full Stack Developer',
    'Frontend Developer',
    'Backend Developer',
    'React Developer',
  ];

  useEffect(() => {
    // Logo display - each logo shows for 2 seconds
    const logoInterval = setInterval(() => {
      setCurrentLogoIndex((prev) => {
        if (prev >= techLogos.length - 1) {
          clearInterval(logoInterval);
          return prev;
        }
        return prev + 1;
      });
    }, 2000);

    // Title display - each title shows for 2 seconds
    const titleInterval = setInterval(() => {
      setCurrentTitleIndex((prev) => {
        if (prev >= titles.length - 1) {
          clearInterval(titleInterval);
          return prev;
        }
        return prev + 1;
      });
    }, 2000);

    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setShowReadyMessage(true);
          setTimeout(() => {
            setLoading(false);
          }, 900);
          return 100;
        }
        return prev + 1;
      });
    }, 100);

    return () => {
      clearInterval(logoInterval);
      clearInterval(titleInterval);
      clearInterval(progressInterval);
    };
  }, []);

  const CurrentLogo = techLogos[currentLogoIndex]?.component;

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background-dark overflow-hidden"
        >
          {/* Animated Grid Background */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `
                linear-gradient(rgba(0, 245, 195, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 245, 195, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
              animation: 'gridMove 20s linear infinite',
            }} />
          </div>

          {/* Glowing Particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-accent-primary rounded-full"
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                  opacity: 0,
                }}
                animate={{
                  y: [null, -window.innerHeight],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: 'easeInOut',
                }}
                style={{
                  boxShadow: '0 0 10px #00F5C3, 0 0 20px #00F5C3',
                }}
              />
            ))}
          </div>

          {/* Main Content */}
          <div className="relative z-10 flex flex-col items-center">
            {!showReadyMessage ? (
              <>
                {/* Tech Logo */}
                {CurrentLogo && (
                  <motion.div
                    key={currentLogoIndex}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ 
                      scale: [0, 1.1, 1], 
                      opacity: [0, 1, 1],
                    }}
                    transition={{ 
                      duration: 0.6,
                      times: [0, 0.3, 1],
                      ease: 'easeOut',
                    }}
                    className="mb-8"
                    style={{
                      filter: `drop-shadow(0 0 20px ${techLogos[currentLogoIndex]?.glowColor || '#00F5C3'})`,
                    }}
                  >
                    <div className="w-28 h-28 md:w-32 md:h-32">
                      <CurrentLogo />
                    </div>
                  </motion.div>
                )}

                {/* Animated Title */}
                <AnimatePresence mode='wait'>
                  <motion.div
                    key={currentTitleIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5 }}
                    className="text-2xl md:text-3xl font-space text-white font-semibold text-center mb-8"
                    style={{
                      textShadow: '0 0 20px rgba(0, 245, 195, 0.5)',
                    }}
                  >
                    {titles[currentTitleIndex]}
                  </motion.div>
                </AnimatePresence>

                {/* Progress Bar */}
                <motion.div
                  className="w-64 md:w-80 h-2 bg-background-card/50 rounded-full overflow-hidden border border-accent-primary/30 mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  style={{
                    boxShadow: '0 0 20px rgba(0, 245, 195, 0.2)',
                  }}
                >
                  <motion.div
                    className="h-full bg-gradient-to-r from-accent-primary to-accent-secondary rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.1 }}
                    style={{
                      boxShadow: '0 0 20px #00F5C3, 0 0 40px #00F5C3',
                    }}
                  />
                </motion.div>

                {/* Progress Percentage */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="font-space text-accent-primary text-sm"
                >
                  {progress}%
                </motion.div>
              </>
            ) : (
              /* Website Ready Message */
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-3xl md:text-4xl font-space text-accent-primary font-semibold text-center"
                style={{
                  textShadow: '0 0 30px rgba(0, 245, 195, 0.8)',
                }}
              >
                Website Ready
              </motion.div>
            )}
          </div>

          {/* CSS Animation for Grid */}
          <style>{`
            @keyframes gridMove {
              0% { transform: translateY(0); }
              100% { transform: translateY(50px); }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
