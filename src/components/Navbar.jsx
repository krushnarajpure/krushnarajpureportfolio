import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPaperPlane } from 'react-icons/fa';
import logoImage from '../logo/logo.png';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = ['home', 'about', 'education', 'skills', 'projects', 'achievements', 'certificates', 'contact', 'footer'];
    
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, []);

  const menuItems = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Education', href: '#education', id: 'education' },
    { name: 'Skills', href: '#skills', id: 'skills' },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'Certifications', href: '#certificates', id: 'certificates' },
    { name: 'Achievements', href: '#achievements', id: 'achievements' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  const handleScroll = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 90;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass shadow-lg shadow-accent-primary/10' : ''
      }`}
      style={{
        height: '90px',
        padding: '0 40px',
      }}
    >
      <style>{`
        @media (min-width: 769px) and (max-width: 1024px) {
          nav {
            height: 80px !important;
            padding: 0 24px !important;
          }
          nav img {
            width: 56px !important;
            height: 56px !important;
          }
        }
        @media (max-width: 768px) {
          nav {
            height: 72px !important;
            padding: 0 20px !important;
          }
          nav img {
            width: 48px !important;
            height: 48px !important;
          }
        }
      `}</style>
      <div className="w-full flex items-center justify-between h-full">
        {/* Logo */}
        <motion.a
          href="#home"
          onClick={(e) => handleScroll(e, 'home')}
          aria-label="Scroll to Home"
        >
          <motion.img
            src={logoImage}
            alt="YB Logo"
            className="object-contain"
            style={{
              width: '64px',
              height: '64px',
            }}
            whileHover={{ 
              scale: 1.08,
              boxShadow: '0 0 20px rgba(0, 245, 195, 0.4)',
            }}
            transition={{ duration: 0.3 }}
          />
        </motion.a>

        {/* Desktop Menu - Centered */}
        <div className="hidden lg:flex items-center space-x-1 flex-1 justify-center">
          {menuItems.map((item) => (
            <motion.a
              key={item.name}
              href={item.href}
              onClick={(e) => handleScroll(e, item.id)}
              className="relative px-5 py-2 font-space text-sm transition-all duration-300"
              whileHover={{ scale: 1.05 }}
            >
              <span className={`relative z-10 transition-colors duration-300 ${
                activeSection === item.id
                  ? 'text-accent-primary font-semibold'
                  : 'text-text-secondary hover:text-accent-primary'
              }`}>
                {item.name}
              </span>
              {activeSection === item.id && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-primary"
                  layoutId="activeNav"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
              <motion.div
                className={`absolute bottom-0 left-0 h-0.5 bg-accent-primary ${
                  activeSection === item.id ? 'w-full' : 'w-0'
                }`}
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          ))}
        </div>

        {/* Right Side CTA Button */}
        <div className="hidden lg:flex items-center space-x-3">
          <motion.a
            href="/admin/login"
            className="flex items-center space-x-2 rounded-full border border-accent-primary/40 bg-background-card/40 px-4 py-2 text-sm font-space text-accent-primary transition-all duration-300 hover:border-accent-primary hover:shadow-lg hover:shadow-accent-primary/20"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            aria-label="Admin Access"
          >
            <span>Admin Access</span>
          </motion.a>
          <motion.button
            onClick={(e) => handleScroll(e, 'contact')}
            className="flex items-center space-x-2 bg-gradient-to-r from-accent-primary to-accent-secondary text-background-dark font-space text-sm font-semibold py-2.5 px-5 rounded-full border-2 border-accent-primary/50 shadow-lg shadow-accent-primary/30"
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 0 30px rgba(0, 245, 195, 0.6), 0 0 50px rgba(0, 245, 195, 0.3)',
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            aria-label="Let's Connect"
          >
            <FaPaperPlane size={14} />
            <span>Let's Connect</span>
          </motion.button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-accent-primary"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {mobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Full-screen Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 lg:hidden glass"
          >
            <div className="flex flex-col items-center justify-center h-full space-y-4 px-6">
              {menuItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    handleScroll(e, item.id);
                    setMobileMenuOpen(false);
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`px-6 py-3 rounded-full text-2xl font-space transition-all duration-300 ${
                    activeSection === item.id
                      ? 'bg-accent-primary text-white shadow-lg shadow-accent-primary/30'
                      : 'text-white hover:text-accent-primary'
                  }`}
                >
                  {item.name}
                </motion.a>
              ))}
              
              {/* Mobile CTA Button */}
              <motion.button
                onClick={(e) => {
                  handleScroll(e, 'contact');
                  setMobileMenuOpen(false);
                }}
                className="mt-8 flex items-center justify-center space-x-2 bg-gradient-to-r from-accent-primary to-accent-secondary text-background-dark font-space text-sm font-semibold py-3 px-6 rounded-full border-2 border-accent-primary/50 shadow-lg shadow-accent-primary/30 w-full max-w-xs"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: '0 0 30px rgba(0, 245, 195, 0.6)',
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
                aria-label="Let's Connect"
              >
                <FaPaperPlane size={16} />
                <span>Let's Connect</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
