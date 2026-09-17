import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaCheck } from 'react-icons/fa';
import { usePortfolio } from '../context/PortfolioContext';
import { resolvePortfolioAsset } from '../lib/portfolioAssets';

const Projects = () => {
  const { portfolio } = usePortfolio();
  const projects = (portfolio.projects || []).filter((project) => project.published !== false);

  return (
    <section id="projects" className="section">
      <h2 className="section-title">Projects</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
        {projects.map((project, index) => (
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
            }}
          >
            {/* Project Image */}
            <div className="relative h-56 overflow-hidden rounded-t-2xl">
              <motion.img
                src={resolvePortfolioAsset(project.image)}
                alt={project.title}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.5 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background-card to-transparent opacity-70" />
            </div>

            <div className="p-6">
              <h3 className="font-orbitron font-bold text-xl text-accent-primary mb-3">
                {project.title}
              </h3>

              <p className="text-text-secondary font-space text-sm mb-4 leading-relaxed">
                {project.description}
              </p>

              {/* Tech Stack Badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                {(project.technologies || project.tech || []).map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-3 py-1 bg-accent-primary/20 text-accent-primary rounded-full text-xs font-space border border-accent-primary/30"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Features with Icons */}
              {(project.features || []).length > 0 && <div className="mb-5">
                <h4 className="font-space font-semibold text-white text-sm mb-3">Features:</h4>
                <ul className="space-y-2">
                  {project.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="text-text-secondary font-space text-xs flex items-start"
                    >
                      <FaCheck className="text-accent-primary mr-2 mt-0.5 flex-shrink-0" size={10} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>}

              {/* Action Buttons */}
              <div className="flex gap-3">
                <motion.a
                  href={project.githubUrl || project.github || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary flex items-center justify-center space-x-2 text-xs py-2.5 px-4 flex-1"
                  aria-label={`View ${project.title} on GitHub`}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: '0 0 20px rgba(0, 245, 195, 0.3)',
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <FaGithub size={14} />
                  <span>GitHub</span>
                </motion.a>
                <motion.a
                  href={project.demoUrl || project.demo || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary flex items-center justify-center space-x-2 text-xs py-2.5 px-4 flex-1"
                  aria-label={`View ${project.title} ${project.title === 'Personal Portfolio' ? 'Website' : 'Demo'}`}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: '0 0 20px rgba(0, 245, 195, 0.5)',
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <FaExternalLinkAlt size={14} />
                  <span>{project.title === 'Personal Portfolio' ? 'Live Website' : 'Live Demo'}</span>
                </motion.a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
