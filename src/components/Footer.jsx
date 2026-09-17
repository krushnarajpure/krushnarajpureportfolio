import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowUp, FaInstagram, FaFileDownload, FaCheck } from 'react-icons/fa';
import logoImage from '../logo/logo.png';

const Footer = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    {
      icon: FaGithub,
      href: 'https://github.com/krushnarajpure',
      label: 'GitHub',
    },
    {
      icon: FaLinkedin,
      href: 'https://linkedin.com/in/krushna-rajpure',
      label: 'LinkedIn',
    },
    {
      icon: FaInstagram,
      href: 'https://instagram.com/krushna_rajpure',
      label: 'Instagram',
    },
    {
      icon: FaEnvelope,
      href: 'mailto:krushnarajpure93@gmail.com',
      label: 'Email',
    },
    {
      icon: FaFileDownload,
      href: '/resume/krushna_bandu_rajpure_Resume.pdf',
      label: 'Resume',
      download: true,
    },
  ];

  return (
    <footer className="glass border-t border-accent-primary/30 relative overflow-hidden">
      {/* Matrix Particles */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-accent-primary rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 2}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* LEFT SECTION - Logo & Branding */}
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.img
                src={logoImage}
                alt="KR Logo"
                className="object-contain mx-auto lg:mx-0 mb-6"
                style={{ width: '80px', height: '80px' }}
                whileHover={{ 
                  scale: 1.1,
                  rotate: 5,
                }}
                transition={{ duration: 0.3 }}
              />
              <h3 className="font-orbitron font-bold text-2xl text-white mb-2">
                 Krushna Rajpure
              </h3>
              <p className="text-accent-primary font-space text-base mb-4 font-semibold">
                Aspiring Java Full Stack Developer
              </p>
              <p className="text-text-secondary font-space text-sm leading-relaxed max-w-sm mx-auto lg:mx-0">
                Building scalable, modern, and responsive web applications using Java, Spring Boot, React, and MySQL.
              </p>
            </motion.div>
          </div>

          {/* CENTER SECTION - Quick Contact */}
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h4 className="font-orbitron font-bold text-xl text-white mb-6">
                Quick Contact
              </h4>
              <div className="space-y-4">
                <motion.a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center lg:justify-start gap-3 text-text-secondary font-space text-sm p-3 rounded-xl bg-background-card/40 backdrop-blur-sm border border-accent-primary/20 hover:border-accent-primary/50 transition-all duration-300"
                  whileHover={{ 
                    scale: 1.02,
                    x: 5,
                  }}
                  aria-label="Location"
                >
                  <span className="text-accent-primary text-lg">📍</span>
                  <span className="text-white">Beed, Maharashtra - 431122</span>
                </motion.a>
                <motion.a
                  href="tel:+919860894960"
                  className="flex items-center justify-center lg:justify-start gap-3 text-text-secondary font-space text-sm p-3 rounded-xl bg-background-card/40 backdrop-blur-sm border border-accent-primary/20 hover:border-accent-primary/50 transition-all duration-300"
                  whileHover={{ 
                    scale: 1.02,
                    x: 5,
                  }}
                  aria-label="Phone"
                >
                  <span className="text-accent-primary text-lg">📞</span>
                  <span className="text-white">+91 9860894960</span>
                </motion.a>
                <motion.a
                  href="mailto:krushnarajpure93@gmail.com"
                  className="flex items-center justify-center lg:justify-start gap-3 text-text-secondary font-space text-sm p-3 rounded-xl bg-background-card/40 backdrop-blur-sm border border-accent-primary/20 hover:border-accent-primary/50 transition-all duration-300"
                  whileHover={{ 
                    scale: 1.02,
                    x: 5,
                  }}
                  aria-label="Email"
                >
                  <span className="text-accent-primary text-lg">✉</span>
                  <span className="text-white">krushnarajpure93@gmail.com</span>
                </motion.a>
              </div>
            </motion.div>
          </div>

          {/* RIGHT SECTION - Social Links & Available For */}
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h4 className="font-orbitron font-bold text-xl text-white mb-6">
                Connect
              </h4>
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8">
                {socialLinks.map((link, index) => {
                  const Icon = link.icon;
                  return (
                    <motion.a
                      key={index}
                      href={link.href}
                      target={link.label === 'Email' ? undefined : '_blank'}
                      rel="noopener noreferrer"
                      download={link.download ? true : undefined}
                      className="w-12 h-12 bg-background-card/80 backdrop-blur-sm rounded-full flex items-center justify-center border border-accent-primary/30 text-accent-primary hover:border-accent-primary transition-all duration-300"
                      aria-label={link.label}
                      whileHover={{ 
                        scale: 1.15,
                        rotate: 10,
                        boxShadow: '0 0 25px rgba(0, 245, 195, 0.5)',
                      }}
                      whileTap={{ scale: 0.9 }}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                    >
                      <Icon size={20} />
                    </motion.a>
                  );
                })}
              </div>

              {/* Available For Section */}
              <div className="glass-card p-5 rounded-2xl border border-accent-primary/30">
                <h5 className="font-orbitron font-bold text-white text-sm mb-4">
                  Available For
                </h5>
                <div className="space-y-3">
                  <motion.div
                    className="flex items-center gap-3 text-text-secondary font-space text-sm"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FaCheck className="text-accent-primary" size={14} />
                    <span>Full-Time Opportunities</span>
                  </motion.div>
                  <motion.div
                    className="flex items-center gap-3 text-text-secondary font-space text-sm"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FaCheck className="text-accent-primary" size={14} />
                    <span>Internships</span>
                  </motion.div>
                  <motion.div
                    className="flex items-center gap-3 text-text-secondary font-space text-sm"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FaCheck className="text-accent-primary" size={14} />
                    <span>Freelance Projects</span>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 pt-8 border-t border-accent-primary/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-space text-text-secondary text-sm text-center md:text-left">
              © 2026 Krushna Rajpure. All Rights Reserved.
            </p>
            <p className="font-space text-text-secondary text-sm text-center md:text-right">
              Designed & Developed with <span className="text-accent-primary">❤️</span> using React, Vite & Tailwind CSS
            </p>
          </div>
        </div>
      </div>

      {/* Premium Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-br from-accent-primary to-accent-secondary rounded-full flex items-center justify-center text-background-dark border-2 border-accent-primary/50 z-50 shadow-lg shadow-accent-primary/30"
            aria-label="Back to top"
            initial={{ opacity: 0, scale: 0, y: 50 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
            }}
            exit={{ 
              opacity: 0, 
              scale: 0, 
              y: 50,
            }}
            whileHover={{ 
              scale: 1.15,
              boxShadow: '0 0 40px rgba(0, 245, 195, 0.8), 0 0 60px rgba(0, 245, 195, 0.4)',
            }}
            whileTap={{ scale: 0.95 }}
            transition={{
              type: 'spring',
              stiffness: 400,
              damping: 17,
            }}
          >
            <motion.div
              animate={{ 
                y: [0, -5, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: 'loop',
                ease: 'easeInOut',
              }}
            >
              <FaArrowUp className="text-2xl" />
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
};

export default Footer;
