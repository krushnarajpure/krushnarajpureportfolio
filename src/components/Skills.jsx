import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  FaHtml5, 
  FaCss3Alt, 
  FaJs, 
  FaReact, 
  FaJava, 
  FaGithub, 
  FaGitAlt,
  FaDatabase,
  FaServer,
  FaCode,
  FaProjectDiagram
} from 'react-icons/fa';
import { SiTailwindcss, SiSpringboot, SiPostman, SiVercel, SiRailway } from 'react-icons/si';

const iconMap = { FaHtml5, FaCss3Alt, FaJs, FaReact, FaJava, FaGithub, FaGitAlt, FaDatabase, FaServer, FaCode, FaProjectDiagram, SiTailwindcss, SiSpringboot, SiPostman, SiVercel, SiRailway };

const Skills = () => {
  const { portfolio } = usePortfolio();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const groupedSkills = (portfolio.skills || []).filter((skill) => skill.published !== false).reduce((groups, skill) => {
    const category = skill.category || 'Other Technologies';
    groups[category] = groups[category] || [];
    groups[category].push({
      ...skill,
      icon: iconMap[skill.icon] || FaProjectDiagram,
      color: skill.color || '#00F5C3',
      description: skill.experience || skill.proficiency || 'Technology',
    });
    return groups;
  }, {});
  const skillCategories = Object.entries(groupedSkills).map(([title, skills]) => ({
    title,
    skills: skills.sort((first, second) => Number(first.order || 0) - Number(second.order || 0)),
  }));

  return (
    <section 
      id="skills" 
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="section relative overflow-hidden"
    >
      {/* Mouse Spotlight */}
      <div 
        className="mouse-spotlight"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
        }}
      />

      {/* Tiny Grid Background */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 245, 195, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 245, 195, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px',
          }}
        />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-accent-primary/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 2}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 
            className="font-orbitron font-bold text-accent-primary mb-5 neon-glow"
            style={{ 
              fontSize: 'clamp(28px, 4vw, 48px)',
              letterSpacing: '1px',
              marginBottom: '20px'
            }}
          >
            Tech Stack
          </h2>
          <p 
            className="font-space leading-relaxed mx-auto"
            style={{ 
              maxWidth: '700px',
              fontSize: '18px',
              color: '#A8A8A8',
              lineHeight: '1.8'
            }}
          >
            Technologies I use to build scalable, modern and responsive web applications.
          </p>
        </div>

        {skillCategories.map((category, categoryIndex) => (
          <div key={categoryIndex} className="mb-12">
            {/* Category Title - Centered with dot above and lines on both sides */}
            <div className="flex flex-col items-center mb-8">
              <div className="w-2 h-2 bg-accent-primary rounded-full mb-3 neon-border" />
              <div className="flex items-center w-full max-w-4xl">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent to-accent-primary/50" />
                <h3 className="font-orbitron font-bold text-2xl md:text-3xl lg:text-[32px] text-accent-primary mx-6 text-center">
                  {category.title}
                </h3>
                <div className="flex-1 h-px bg-gradient-to-l from-transparent to-accent-primary/50" />
              </div>
            </div>

            {/* Skills Grid - Centered */}
            <div className="mx-auto grid max-w-[990px] grid-cols-2 justify-items-center gap-x-4 gap-y-6 md:grid-cols-3 lg:mx-auto lg:w-[990px] lg:max-w-none lg:grid-cols-[repeat(5,138px)] lg:gap-x-[73px] lg:gap-y-6">
              {category.skills.map((skill, skillIndex) => {
                const Icon = skill.icon;
                return (
                  <motion.div
                    key={skillIndex}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.5, 
                      delay: (categoryIndex * 0.2) + (skillIndex * 0.08) 
                    }}
                    whileHover={{ 
                      y: -8,
                      scale: 1.05,
                      borderColor: 'rgba(0, 245, 195, 0.6)',
                      boxShadow: '0 0 40px rgba(0, 245, 195, 0.3)',
                      backgroundColor: 'rgba(15, 15, 15, 0.9)',
                    }}
                    className="relative cursor-pointer"
                    aria-label={`${skill.name} - ${skill.description}`}
                    role="button"
                    tabIndex={0}
                    style={{
                      width: '138px',
                      height: '92px',
                      backgroundColor: 'rgba(15, 15, 15, 0.75)',
                      borderRadius: '12px',
                      border: '1px solid rgba(0, 255, 200, 0.18)',
                      backdropFilter: 'blur(12px)',
                      WebkitBackdropFilter: 'blur(12px)',
                    }}
                  >
                    <div className="flex h-full flex-col items-center justify-center p-2">
                      <motion.div
                        whileHover={{ rotate: 10 }}
                        transition={{ duration: 0.35 }}
                        className="relative"
                      >
                        <div className="absolute inset-0 bg-[rgba(0,245,195,0.15)] blur-xl rounded-full opacity-0 hover:opacity-100 transition-opacity duration-350" />
                        <Icon 
                          size={26} 
                          style={{ color: skill.color }}
                          className="relative z-10"
                        />
                      </motion.div>
                      <div className="mt-1 text-center">
                        <span className="block font-space text-[11px] font-semibold leading-tight text-white">
                          {skill.name}
                        </span>
                        <span className="mt-1 block font-space text-[9px] leading-tight text-text-secondary">
                          {skill.description}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
