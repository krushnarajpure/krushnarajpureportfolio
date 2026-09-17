import { useState, useEffect } from 'react';
import { FaGithub, FaLinkedin, FaArrowRight, FaDownload, FaRocket, FaGraduationCap, FaTrophy, FaLaptopCode, FaCertificate } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import { resolvePortfolioAsset } from '../lib/portfolioAssets';

const roles = ['Java Full Stack Developer', 'Frontend Developer', 'Backend Developer', 'React Developer', 'Spring Boot Developer', 'Software Developer'];

const Hero = () => {
  const { portfolio } = usePortfolio();
  const profile = portfolio.profile || {};
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(80);

  useEffect(() => {
    const handleTyping = () => {
      const currentRole = roles[loopNum % roles.length];

      if (isDeleting) {
        setText(currentRole.substring(0, text.length - 1));
        setTypingSpeed(50);
      } else {
        setText(currentRole.substring(0, text.length + 1));
        setTypingSpeed(80);
      }

      if (!isDeleting && text === currentRole) {
        setTypingSpeed(1500);
        setIsDeleting(true);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setTypingSpeed(500);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed]);

  return (
    <section
      id="home"
      className="min-h-screen relative matrix-bg flex items-center pt-20"
    >
      {/* Matrix Background Effects */}
      <div className="particles">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 15}s`,
              animationDuration: `${15 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      <div className="gradient-lights">
        <div className="gradient-light" style={{ top: '10%', left: '10%' }} />
        <div className="gradient-light" style={{ top: '60%', right: '10%', animationDelay: '5s' }} />
        <div className="gradient-light" style={{ bottom: '20%', left: '30%', animationDelay: '10s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1 text-center lg:text-left"
          >
            <div className="text-text-secondary font-space text-lg mb-4">
              Hi, I'm
            </div>
            <h1 className="font-orbitron font-bold text-4xl md:text-5xl lg:text-7xl text-white mb-4" style={{ textShadow: '0 0 10px rgba(0, 245, 195, 0.3)' }}>
              {(profile.name || 'Krushna Rajpure').toUpperCase()}
            </h1>
            <div className="font-space text-xl md:text-2xl lg:text-3xl text-accent-primary mb-6 h-12">
              {text}
              <span className="animate-pulse">|</span>
            </div>
            <p className="text-text-secondary font-space text-base md:text-lg mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              {profile.intro}
            </p>

            <div className="flex flex-wrap gap-4 mb-8 justify-center lg:justify-start">
              <motion.a
                href="/resume/krushna_bandu_rajpure_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex items-center space-x-2 relative overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Download Resume"
              >
                <span className="relative z-10 flex items-center space-x-2">
                  <FaDownload />
                  <span>Download Resume</span>
                </span>
              </motion.a>
              <motion.button
                className="btn-secondary flex items-center space-x-2 relative overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const projectsSection = document.getElementById('projects');
                  if (projectsSection) {
                    const offset = 90;
                    const elementPosition = projectsSection.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - offset;
                    window.scrollTo({
                      top: offsetPosition,
                      behavior: 'smooth'
                    });
                  }
                }}
                aria-label="View Projects"
              >
                <span className="relative z-10 flex items-center space-x-2">
                  <FaRocket />
                  <span>View Projects</span>
                </span>
              </motion.button>
              <motion.button
                className="btn-primary flex items-center space-x-2 relative overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    const offset = 90;
                    const elementPosition = contactSection.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - offset;
                    window.scrollTo({
                      top: offsetPosition,
                      behavior: 'smooth'
                    });
                  }
                }}
                aria-label="Hire Me"
              >
                <span className="relative z-10 flex items-center space-x-2">
                  <FaArrowRight />
                  <span>Hire Me</span>
                </span>
              </motion.button>
            </div>

            <div className="flex space-x-4 justify-center lg:justify-start">
              <motion.a
                href={profile.github || '#'}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="w-12 h-12 bg-background-card/80 backdrop-blur-sm rounded-full flex items-center justify-center border border-accent-primary/30 text-accent-primary hover:border-accent-primary transition-all duration-300"
                whileHover={{
                  scale: 1.15,
                  rotate: 10,
                  boxShadow: '0 0 20px rgba(0, 245, 195, 0.4)',
                }}
                whileTap={{ scale: 0.95 }}
              >
                <FaGithub size={20} />
              </motion.a>
              <motion.a
                href={profile.linkedin || '#'}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="w-12 h-12 bg-background-card/80 backdrop-blur-sm rounded-full flex items-center justify-center border border-accent-primary/30 text-accent-primary hover:border-accent-primary transition-all duration-300"
                whileHover={{
                  scale: 1.15,
                  rotate: -10,
                  boxShadow: '0 0 20px rgba(0, 245, 195, 0.4)',
                }}
                whileTap={{ scale: 0.95 }}
              >
                <FaLinkedin size={20} />
              </motion.a>
            </div>
          </motion.div>

          {/* Right Side - Profile Dashboard */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative order-1 lg:order-2"
          >
            <div className="glass-card p-6 max-w-sm mx-auto">
              {/* Profile Photo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex justify-center mb-4"
              >
                <div className="relative">
                  <motion.img
                    src={resolvePortfolioAsset(profile.photo)}
                    alt={profile.name || 'Portfolio profile'}
                    className="w-30 h-30 rounded-full border-2 border-accent-primary/50 object-cover"
                    style={{ width: '120px', height: '120px' }}
                    whileHover={{
                      scale: 1.05,
                      borderColor: 'rgba(0, 245, 195, 0.8)',
                      boxShadow: '0 0 20px rgba(0, 245, 195, 0.3)',
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>

              {/* Role & Company */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-center mb-4"
              >
                <h3 className="font-orbitron font-bold text-lg text-accent-primary mb-1">
                  Frontend Developer Intern
                </h3>
                <p className="text-white font-space text-sm mb-2">
                  Athenura Technologies
                </p>
                <p className="text-text-secondary font-space text-xs flex items-center justify-center gap-2">
                  <span>📍</span>
                  <span>Nagpur, Maharashtra</span>
                </p>
              </motion.div>

              {/* Open to Opportunities Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex justify-center mb-4"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/30 rounded-full">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  <span className="text-green-400 font-space text-xs">Open to Full-Time Opportunities</span>
                </div>
              </motion.div>

              {/* Stats Grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="grid grid-cols-2 gap-3"
              >
                {/* CGPA */}
                <motion.div
                  className="glass-card p-3 text-center"
                  whileHover={{
                    y: -4,
                    boxShadow: '0 0 20px rgba(0, 245, 195, 0.2)',
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-accent-primary mb-1">
                    <FaGraduationCap size={16} />
                  </div>
                  <div className="font-orbitron font-bold text-xl text-white">8.50</div>
                  <div className="text-text-secondary font-space text-xs">CGPA</div>
                </motion.div>

                {/* Hackathon Wins */}
                <motion.div
                  className="glass-card p-3 text-center"
                  whileHover={{
                    y: -4,
                    boxShadow: '0 0 20px rgba(0, 245, 195, 0.2)',
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-accent-primary mb-1">
                    <FaTrophy size={16} />
                  </div>
                  <div className="font-orbitron font-bold text-xl text-white">2</div>
                  <div className="text-text-secondary font-space text-xs">Hackathon Wins</div>
                </motion.div>

                {/* Projects */}
                <motion.div
                  className="glass-card p-3 text-center"
                  whileHover={{
                    y: -4,
                    boxShadow: '0 0 20px rgba(0, 245, 195, 0.2)',
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-accent-primary mb-1">
                    <FaLaptopCode size={16} />
                  </div>
                  <div className="font-orbitron font-bold text-xl text-white">4+</div>
                  <div className="text-text-secondary font-space text-xs">Projects</div>
                </motion.div>

                {/* Certificates */}
                <motion.div
                  className="glass-card p-3 text-center"
                  whileHover={{
                    y: -4,
                    boxShadow: '0 0 20px rgba(0, 245, 195, 0.2)',
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-accent-primary mb-1">
                    <FaCertificate size={16} />
                  </div>
                  <div className="font-orbitron font-bold text-xl text-white">6+</div>
                  <div className="text-text-secondary font-space text-xs">Certificates</div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
