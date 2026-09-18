import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
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
  FaNodeJs,
  FaPython,
  FaBolt,
  FaCuttlefish
} from 'react-icons/fa';
import {
  SiTailwindcss,
  SiSpringboot,
  SiPostman,
  SiVercel,
  SiRailway,
  SiNextdotjs,
  SiBootstrap,
  SiVite,
  SiExpress,
  SiFlask,
  SiFastapi,
  SiMongodb,
  SiPostgresql,
  SiPrisma,
  SiSupabase,
  SiNpm,
  SiNetlify,
  SiGithubpages,
  SiGooglegemini,
  SiOpenai,
  SiOpencv,
  SiMediapipe,
} from 'react-icons/si';

const skillCategories = [
  {
    title: 'Frontend Development',
    skills: [
      ['HTML5', 'Structure and semantics', FaHtml5, '#E34F26'],
      ['CSS3', 'Modern visual styling', FaCss3Alt, '#1572B6'],
      ['JavaScript', 'Interactive web experiences', FaJs, '#F7DF1E'],
      ['React.js', 'Component-driven interfaces', FaReact, '#61DAFB'],
      ['Next.js', 'Full-stack React framework', SiNextdotjs, '#FFFFFF'],
      ['Tailwind CSS', 'Utility-first styling', SiTailwindcss, '#06B6D4'],
      ['Bootstrap', 'Responsive UI toolkit', SiBootstrap, '#7952B3'],
      ['Vite', 'Fast frontend tooling', SiVite, '#646CFF'],
    ],
  },
  {
    title: 'Backend Development',
    skills: [
      ['Node.js', 'JavaScript runtime', FaNodeJs, '#339933'],
      ['Express.js', 'Minimal web framework', SiExpress, '#FFFFFF'],
      ['Java', 'Object-oriented programming', FaJava, '#007396'],
      ['Spring Boot', 'Production backend framework', SiSpringboot, '#6DB33F'],
      ['Python', 'Versatile backend language', FaPython, '#3776AB'],
      ['Flask', 'Lightweight Python framework', SiFlask, '#FFFFFF'],
      ['FastAPI', 'High-performance API framework', SiFastapi, '#009688'],
      ['REST API', 'Service integration layer', FaServer, '#00F5C3'],
    ],
  },
  {
    title: 'Databases',
    skills: [
      ['MySQL', 'Relational data storage', FaDatabase, '#4479A1'],
      ['MongoDB', 'Document database', SiMongodb, '#47A248'],
      ['PostgreSQL', 'Advanced relational database', SiPostgresql, '#4169E1'],
      ['Supabase', 'Backend-as-a-service platform', SiSupabase, '#3ECF8E'],
      ['Prisma', 'Type-safe database toolkit', SiPrisma, '#FFFFFF'],
    ],
  },
  {
    title: 'Programming Languages',
    skills: [
      ['C', 'Foundational programming', FaCuttlefish, '#A8B9CC'],
      ['C++', 'Systems programming', FaCode, '#659AD2'],
      ['Java', 'Object-oriented programming', FaJava, '#007396'],
      ['Python', 'Readable general-purpose language', FaPython, '#3776AB'],
      ['JavaScript', 'Web programming language', FaJs, '#F7DF1E'],
      ['SQL', 'Database query language', FaDatabase, '#00A8E8'],
    ],
  },
  {
    title: 'Tools & Platforms',
    skills: [
      ['Git', 'Version control', FaGitAlt, '#F05032'],
      ['GitHub', 'Code collaboration', FaGithub, '#FFFFFF'],
      ['VS Code', 'Developer workspace', FaCode, '#007ACC'],
      ['Postman', 'API testing', SiPostman, '#FF6C37'],
      ['npm', 'JavaScript package manager', SiNpm, '#CB3837'],
      ['MongoDB Compass', 'Database administration', SiMongodb, '#47A248'],
    ],
  },
  {
    title: 'Cloud & Deployment',
    skills: [
      ['Vercel', 'Frontend deployment', SiVercel, '#FFFFFF'],
      ['Netlify', 'Web hosting platform', SiNetlify, '#00C7B7'],
      ['Railway', 'Backend deployment', SiRailway, '#9B3C3C'],
      ['GitHub Pages', 'Static site hosting', SiGithubpages, '#FFFFFF'],
    ],
  },
  {
    title: 'AI & Other Technologies',
    skills: [
      ['Generative AI', 'Intelligent content creation', SiOpenai, '#FFFFFF'],
      ['AI API Integration', 'Connected AI workflows', FaBolt, '#00F5C3'],
      ['Groq API', 'Fast AI inference', FaBolt, '#F55036'],
      ['Google Gemini API', 'Multimodal AI services', SiGooglegemini, '#8AB4F8'],
      ['MediaPipe', 'Real-time ML solutions', SiMediapipe, '#00BFA5'],
      ['OpenCV', 'Computer vision toolkit', SiOpencv, '#5C3EE8'],
    ],
  },
];

const Skills = () => {
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
            <div className="mx-auto grid w-full max-w-[1180px] grid-cols-2 justify-items-center gap-x-4 gap-y-6 md:grid-cols-3 lg:mx-auto lg:grid-cols-5 lg:gap-6">
              {category.skills.map(([name, description, Icon, color], skillIndex) => {
                return (
                  <motion.div
                    key={`${category.title}-${name}`}
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
                    aria-label={`${name} - ${description}`}
                    role="button"
                    tabIndex={0}
                    style={{
                      width: '100%',
                      minHeight: '112px',
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
                          size={32}
                          style={{ color }}
                          className="relative z-10"
                        />
                      </motion.div>
                      <div className="mt-1 text-center">
                        <span className="block font-space text-[11px] font-semibold leading-tight text-white">
                          {name}
                        </span>
                        <span className="mt-1 block font-space text-[9px] leading-tight text-text-secondary">
                          {description}
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
