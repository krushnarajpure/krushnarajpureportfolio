import { motion } from 'framer-motion';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { usePortfolio } from '../context/PortfolioContext';
import { resolvePortfolioAsset } from '../lib/portfolioAssets';

const Certificates = () => {
  const { portfolio } = usePortfolio();
  const certificates = (portfolio.certificates || []).filter((certificate) => certificate.published !== false);

  return (
    <section id="certificates" className="section">
      <h2 className="section-title">Certificates</h2>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((cert, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="glass-card overflow-hidden group"
            whileHover={{
              y: -8,
              borderColor: 'rgba(0, 245, 195, 0.5)',
              boxShadow: '0 0 30px rgba(0, 245, 195, 0.2)',
            }}
            style={{ borderRadius: '18px' }}
          >
            {/* Certificate Preview Image */}
            <div className="relative h-56 overflow-hidden">
              <motion.img
                src={resolvePortfolioAsset(cert.image)}
                alt={cert.title}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.5 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background-card to-transparent opacity-70" />
              
              {/* Organization Logo Badge */}
              <div className="absolute top-4 left-4 px-4 py-2 bg-background-card/90 backdrop-blur-sm rounded-full text-xs font-space text-accent-primary border border-accent-primary/30">
                {cert.issuer}
              </div>
            </div>

            <div className="p-6">
              <h3 className="font-orbitron font-bold text-lg text-white mb-2">
                {cert.title}
              </h3>
              <p className="text-accent-primary font-space text-sm mb-1">
                {cert.issuer}
              </p>
              <p className="text-text-secondary font-space text-xs mb-4">
                Issued: {cert.issueDate || cert.date || 'Date not set'}
              </p>

              {/* Action Button */}
              <motion.a
                href={cert.verificationUrl || resolvePortfolioAsset(cert.image) || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex items-center justify-center space-x-2 text-xs py-2.5 px-4 w-full"
                aria-label={`View ${cert.title} Certificate`}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: '0 0 20px rgba(0, 245, 195, 0.5)',
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <FaExternalLinkAlt size={14} />
                <span>View Certificate</span>
              </motion.a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Certificates;
