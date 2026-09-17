import { motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';

const About = () => {
  const { portfolio } = usePortfolio();
  const about = portfolio.about || {};
  return (
    <section id="about" className="section">
      <h2 className="section-title">About Me</h2>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* Left Column - Information */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          {/* About Me */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="font-orbitron font-bold text-xl text-accent-primary mb-3">
              About Me
            </h3>
            <p className="text-text-secondary font-space text-sm leading-relaxed">
              {about.summary}
            </p>
          </motion.div>

          {/* Current Internship */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="font-orbitron font-bold text-xl text-accent-primary mb-3">
              Current Internship
            </h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-accent-primary">💼</span>
                <span className="text-white font-space font-semibold">{about.currentInternship}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-accent-primary">🏢</span>
                <span className="text-text-secondary font-space">{about.company}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-accent-primary">📅</span>
                <span className="text-text-secondary font-space">{about.startDate} – {about.endDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-accent-primary">📍</span>
                <span className="text-text-secondary font-space">{about.location}</span>
              </div>
            </div>
          </motion.div>

        </motion.div>

        {/* Right Column - Quick Facts */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card p-6"
          >
            <h3 className="font-orbitron font-bold text-xl text-accent-primary mb-4">
              Quick Facts
            </h3>
            <div className="space-y-4">
              {(about.quickFacts || []).map((fact) => (
              <div key={fact.label} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xl">•</span>
                  <span className="text-white font-space">{fact.label}</span>
                </div>
                <span className="font-orbitron font-bold text-accent-primary">{fact.value}</span>
              </div>
              ))}

              {/* Languages */}
              <div className="pt-4 border-t border-accent-primary/20">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xl">•</span>
                  <span className="text-white font-space font-semibold">Languages</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(about.languages || []).map((language) => <span key={language} className="px-3 py-1 bg-accent-primary/20 text-accent-primary rounded-full text-xs font-space border border-accent-primary/30">{language}</span>)}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
