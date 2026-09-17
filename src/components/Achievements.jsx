import { motion } from 'framer-motion';
import { FaTrophy, FaMedal, FaCertificate } from 'react-icons/fa';
import { usePortfolio } from '../context/PortfolioContext';
import { resolvePortfolioAsset } from '../lib/portfolioAssets';

const Achievements = () => {
  const { portfolio } = usePortfolio();
  const achievements = (portfolio.achievements || []).filter((item) => item.published !== false).map((item, index) => ({
    ...item,
    position: item.position || item.title,
    event: item.event || item.organization,
    year: item.year || item.date?.slice(0, 4),
    icon: index % 2 === 0 ? FaTrophy : FaMedal,
    accent: index % 2 === 0 ? '#FFD700' : '#C0C0C0',
    certificate: resolvePortfolioAsset(item.image),
    badge: index % 2 === 0 ? '🏆' : '🥈',
  }));

  return (
    <section id="achievements" className="section">
      <h2 className="section-title">Achievements</h2>
      
      <div className="grid md:grid-cols-2 gap-8">
        {achievements.map((achievement, index) => {
          const Icon = achievement.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="glass-card overflow-hidden group"
              whileHover={{
                borderColor: 'rgba(0, 245, 195, 0.5)',
                boxShadow: '0 0 30px rgba(0, 245, 195, 0.2)',
                scale: 1.02,
              }}
            >
              {/* Certificate Image */}
              <div className="relative h-48 overflow-hidden">
                <motion.img
                  src={achievement.certificate}
                  alt={`${achievement.event} Certificate`}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background-card to-transparent opacity-70" />
                
                {/* Hackathon Badge */}
                <div className="absolute top-4 right-4 px-3 py-1 bg-background-card/90 backdrop-blur-sm rounded-full text-2xl border border-accent-primary/30">
                  {achievement.badge}
                </div>
              </div>

              <div className="p-6">
                {/* Position with Icon */}
                <div className="flex items-center gap-3 mb-4">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${achievement.accent}20`, border: `2px solid ${achievement.accent}` }}
                  >
                    <Icon size={20} style={{ color: achievement.accent }} />
                  </div>
                  <div>
                    <h3 
                      className="font-orbitron font-bold text-lg"
                      style={{ color: achievement.accent }}
                    >
                      {achievement.position}
                    </h3>
                    <span className="font-space text-text-secondary text-sm">{achievement.year}</span>
                  </div>
                </div>

                {/* Event */}
                <div className="mb-4">
                  <span className="font-space text-accent-primary text-sm font-semibold">
                    {achievement.event}
                  </span>
                </div>

                {/* Team */}
                <div className="mb-3">
                  <span className="font-space text-text-secondary text-xs">Team: </span>
                  <span className="font-space text-white text-sm font-medium">
                    {achievement.team}
                  </span>
                </div>

                {/* Project */}
                <div className="mb-4">
                  <span className="font-space text-text-secondary text-xs">Project: </span>
                  <span className="font-space text-white text-sm font-medium">
                    {achievement.project}
                  </span>
                </div>

                {/* Description */}
                <p className="text-text-secondary font-space text-sm leading-relaxed mb-6">
                  {achievement.description}
                </p>

                {/* View Certificate Button */}
                <button className="btn-secondary w-full flex items-center justify-center gap-2 text-sm">
                  <FaCertificate />
                  <span>View Certificate</span>
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Achievements;
