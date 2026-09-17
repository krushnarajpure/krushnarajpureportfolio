import { motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';

const Education = () => {
  const { portfolio } = usePortfolio();
  const education = (portfolio.education || []).filter((item) => item.published !== false);

  return (
    <section id="education" className="section">
      <h2 className="section-title">🎓 Education</h2>
      <p className="text-text-secondary font-space text-center mb-12 max-w-2xl mx-auto">
        My academic journey and educational background.
      </p>
      
      <div className="max-w-5xl mx-auto px-4">
        {/* Timeline Line */}
        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent-primary via-accent-secondary to-accent-primary opacity-40"></div>
          
          {education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: index * 0.15, ease: 'easeOut' }}
              className="relative pl-20 mb-6"
            >
              {/* Timeline Node */}
              <motion.div
                className="absolute left-6 top-8 w-3 h-3 bg-accent-primary rounded-full z-10"
                animate={{
                  boxShadow: [
                    '0 0 8px #00F5C3, 0 0 16px #00F5C3',
                    '0 0 20px #00F5C3, 0 0 35px #00F5C3',
                    '0 0 8px #00F5C3, 0 0 16px #00F5C3',
                  ],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              
              <motion.div
                className="glass-card p-6 rounded-2xl border border-accent-primary/20 hover:border-accent-primary/50"
                whileHover={{
                  y: -8,
                  scale: 1.02,
                  boxShadow: '0 20px 40px rgba(0, 245, 195, 0.15), 0 0 30px rgba(0, 245, 195, 0.2)',
                  borderColor: 'rgba(0, 245, 195, 0.6)',
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="text-4xl drop-shadow-lg">{edu.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-orbitron font-bold text-xl text-white mb-2">
                      {edu.degree}
                    </h3>
                    <p className="text-accent-primary font-space text-sm mb-2">
                      {edu.institution}
                    </p>
                    <div className="flex items-center gap-2 text-text-secondary font-space text-sm">
                      <span>📅</span>
                      <span>{edu.duration || `${edu.startYear || edu.startDate || ''} - ${edu.endYear || edu.endDate || ''}`}</span>
                    </div>
                  </div>
                </div>

                {/* Stats Badges */}
                <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-accent-primary/20">
                  {edu.cgpa && (
                    <motion.div
                      className="px-4 py-2 bg-accent-primary/10 border border-accent-primary/30 rounded-full"
                      whileHover={{
                        scale: 1.05,
                        boxShadow: '0 0 20px rgba(0, 245, 195, 0.4)',
                      }}
                    >
                      <span className="text-accent-primary font-space font-semibold text-sm">
                        CGPA: {edu.cgpa}
                      </span>
                    </motion.div>
                  )}
                  {edu.percentage && (
                    <motion.div
                      className="px-4 py-2 bg-accent-primary/10 border border-accent-primary/30 rounded-full"
                      whileHover={{
                        scale: 1.05,
                        boxShadow: '0 0 20px rgba(0, 245, 195, 0.4)',
                      }}
                    >
                      <span className="text-accent-primary font-space font-semibold text-sm">
                        Percentage: {edu.percentage}
                      </span>
                    </motion.div>
                  )}
                  <motion.div
                    className={`px-4 py-2 rounded-full border ${
                      edu.current || edu.status?.toLowerCase().includes('currently')
                        ? 'bg-green-500/10 text-green-400 border-green-500/30'
                        : 'bg-accent-primary/10 text-accent-primary border-accent-primary/30'
                    }`}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: edu.current || edu.status?.toLowerCase().includes('currently')
                        ? '0 0 20px rgba(34, 197, 94, 0.4)'
                        : '0 0 20px rgba(0, 245, 195, 0.4)',
                    }}
                  >
                    <span className="font-space font-semibold text-sm flex items-center gap-2">
                      {(edu.current || edu.status?.toLowerCase().includes('currently')) && (
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                      )}
                      {edu.status || (edu.current ? 'Currently Pursuing' : 'Completed')}
                    </span>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
