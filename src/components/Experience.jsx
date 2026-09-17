import { motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';

const Experience = () => {
  const { portfolio } = usePortfolio();
  const experience = (portfolio.experience || []).filter((item) => item.published !== false)[0];

  if (!experience) return null;

  return (
    <section id="experience" className="section">
      <h2 className="section-title">Experience</h2>
      
      <div className="max-w-[1400px] mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card p-10 md:p-12 relative overflow-hidden rounded-3xl"
          whileHover={{
            y: -8,
            borderColor: 'rgba(0, 245, 195, 0.5)',
            boxShadow: '0 0 30px rgba(0, 245, 195, 0.2)',
          }}
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8 pb-6 border-b border-accent-primary/20">
            <div className="flex items-center gap-4">
              <div className="text-4xl">💼</div>
              <div>
                <h3 className="font-orbitron font-bold text-2xl text-white mb-1">
                  {experience.title}
                </h3>
                <div className="text-accent-primary font-space text-lg font-semibold">
                  {experience.company}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-4 py-2 bg-green-500/20 text-green-400 rounded-full text-sm font-space border border-green-500/30 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Currently Working
              </span>
            </div>
          </div>

          <div className="text-text-secondary font-space text-sm mb-8 flex items-center gap-4">
            <span>📍 {experience.location}</span>
            <span>•</span>
            <span>📅 {experience.duration}</span>
            <span>•</span>
            <span>💼 {experience.type}</span>
          </div>

          {/* Two Column Layout */}
          <div className="grid md:grid-cols-[65%_35%] gap-8">
            {/* Left Column */}
            <div className="space-y-8">
              {/* About */}
              <div>
                <h4 className="font-orbitron font-bold text-lg text-white mb-3">
                  About the Internship
                </h4>
                <p className="text-text-secondary font-space text-sm leading-relaxed">
                  {experience.description}
                </p>
              </div>

              {/* Responsibilities */}
              <div>
                <h4 className="font-orbitron font-bold text-lg text-white mb-4">
                  Responsibilities
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(experience.responsibilities || []).map((responsibility, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="glass-card p-3 flex items-center gap-3 hover:border-accent-primary/50 transition-colors duration-300"
                    >
                      <span className="text-accent-primary text-lg">✔</span>
                      <span className="text-text-secondary font-space text-sm">
                        {responsibility}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Technologies */}
              <div>
                <h4 className="font-orbitron font-bold text-lg text-white mb-4">
                  Technologies Used
                </h4>
                <div className="flex flex-wrap gap-2">
                  {(experience.technologies || []).map((tech, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="px-4 py-2 bg-accent-primary/10 text-accent-primary rounded-full text-sm font-space border border-accent-primary/20 hover:border-accent-primary/50 hover:bg-accent-primary/20 transition-all duration-300"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Info Cards */}
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="glass-card p-4"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xl">🏢</span>
                  <span className="text-text-secondary font-space text-xs">Company</span>
                </div>
                <div className="text-white font-space font-semibold">
                  {experience.company}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="glass-card p-4"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xl">📍</span>
                  <span className="text-text-secondary font-space text-xs">Location</span>
                </div>
                <div className="text-white font-space font-semibold">
                  {experience.location}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="glass-card p-4"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xl">📅</span>
                  <span className="text-text-secondary font-space text-xs">Duration</span>
                </div>
                <div className="text-white font-space font-semibold">
                  {experience.duration}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="glass-card p-4"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xl">💼</span>
                  <span className="text-text-secondary font-space text-xs">Employment</span>
                </div>
                <div className="text-white font-space font-semibold">
                  {experience.type}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="glass-card p-4"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xl">🛠</span>
                  <span className="text-text-secondary font-space text-xs">Tech Stack</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {(experience.technologies || []).map((tech, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-accent-primary/10 text-accent-primary rounded text-xs font-space border border-accent-primary/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
