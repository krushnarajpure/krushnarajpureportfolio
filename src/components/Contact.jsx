import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
import { usePortfolio } from '../context/PortfolioContext';
import { submitContactMessage } from '../lib/portfolioService';

const Contact = () => {
  const { portfolio } = usePortfolio();
  const profile = portfolio.profile || {};
  const [status, setStatus] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');
    const result = await submitContactMessage(formData);
    setStatus(result.ok ? 'Message sent successfully.' : 'Unable to send message.');
    if (result.ok) setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactInfo = [
    {
      icon: FaEnvelope,
      label: 'Email',
      value: profile.email,
      href: `mailto:${profile.email}`,
    },
    {
      icon: FaPhone,
      label: 'Phone',
      value: profile.phone,
      href: `tel:${profile.phone}`,
    },
    {
      icon: FaLinkedin,
      label: 'LinkedIn',
      value: profile.linkedin,
      href: profile.linkedin,
    },
    {
      icon: FaGithub,
      label: 'GitHub',
      value: profile.github,
      href: profile.github,
    },
    {
      icon: FaMapMarkerAlt,
      label: 'Location',
      value: profile.location,
      href: null,
    },
  ];

  return (
    <section id="contact" className="section">
      <h2 className="section-title">Contact</h2>
      
      <div className="grid md:grid-cols-2 gap-12">
        {/* Contact Info Cards */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          <h3 className="font-orbitron font-bold text-2xl text-accent-primary mb-6">
            Get In Touch
          </h3>
          <p className="text-text-secondary font-space mb-8 leading-relaxed">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>
          
          {contactInfo.map((info, index) => {
            const Icon = info.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="glass-card p-4 flex items-center space-x-4 hover:border-accent-primary/50 transition-all duration-300"
                aria-label={info.label}
              >
                <div className="w-14 h-14 bg-gradient-to-br from-accent-primary to-accent-secondary rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Icon className="text-background-dark text-xl" />
                </div>
                <div className="flex-1">
                  <div className="font-space font-semibold text-white text-sm mb-1">
                    {info.label}
                  </div>
                  {info.href ? (
                    <a
                      href={info.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent-primary font-space text-sm hover:underline transition-all"
                      aria-label={`Contact via ${info.label}`}
                    >
                      {info.value}
                    </a>
                  ) : (
                    <div className="text-text-secondary font-space text-sm">
                      {info.value}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <form onSubmit={handleSubmit} className="glass-card p-8">
            <h3 className="font-orbitron font-bold text-2xl text-accent-primary mb-6">
              Send Message
            </h3>
            
            <div className="space-y-5">
              <div>
                <label className="block font-space text-text-secondary text-sm mb-2">
                  Name
                </label>
                <motion.input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-background-card/50 border border-accent-primary/20 rounded-lg text-white font-space focus:outline-none focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/20 transition-all duration-300"
                  placeholder="Your name"
                  whileFocus={{ scale: 1.02 }}
                />
              </div>
              
              <div>
                <label className="block font-space text-text-secondary text-sm mb-2">
                  Email
                </label>
                <motion.input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-background-card/50 border border-accent-primary/20 rounded-lg text-white font-space focus:outline-none focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/20 transition-all duration-300"
                  placeholder="your@email.com"
                  whileFocus={{ scale: 1.02 }}
                />
              </div>
              
              <div>
                <label className="block font-space text-text-secondary text-sm mb-2">
                  Subject
                </label>
                <motion.input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-background-card/50 border border-accent-primary/20 rounded-lg text-white font-space focus:outline-none focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/20 transition-all duration-300"
                  placeholder="Subject"
                  whileFocus={{ scale: 1.02 }}
                />
              </div>
              
              <div>
                <label className="block font-space text-text-secondary text-sm mb-2">
                  Message
                </label>
                <motion.textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-background-card/50 border border-accent-primary/20 rounded-lg text-white font-space focus:outline-none focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/20 transition-all duration-300 resize-none"
                  placeholder="Your message"
                  whileFocus={{ scale: 1.02 }}
                />
              </div>
              
              <motion.button
                type="submit"
                className="btn-primary w-full"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Send Message"
              >
                Send Message
              </motion.button>
              {status && <p className="text-center text-sm text-accent-primary">{status}</p>}
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
