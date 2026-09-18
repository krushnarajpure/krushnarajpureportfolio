import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaExternalLinkAlt, FaExpand, FaTimes } from 'react-icons/fa';
import { usePortfolio } from '../context/PortfolioContext';
import { resolvePortfolioAsset } from '../lib/portfolioAssets';

function CertificateImage({ certificate, className = '', onClick }) {
  const [failed, setFailed] = useState(false);
  const source = resolvePortfolioAsset(certificate.image || certificate.imagePath);
  useEffect(() => setFailed(false), [source]);

  if (!source || failed) {
    return <div className="flex h-full min-h-56 items-center justify-center bg-[#0B1210] px-6 text-center text-sm text-gray-400">Certificate preview unavailable</div>;
  }

  return <img src={source} alt={certificate.title} onError={() => setFailed(true)} onClick={onClick} className={`h-full w-full object-contain ${onClick ? 'cursor-zoom-in' : ''} ${className}`} />;
}

const Certificates = () => {
  const { portfolio } = usePortfolio();
  const certificates = (portfolio.certificates || []).filter((certificate) => certificate.published !== false);
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  useEffect(() => {
    const closeOnEscape = (event) => event.key === 'Escape' && setSelectedCertificate(null);
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, []);

  return (
    <section id="certificates" className="section">
      <h2 className="section-title">Certificates</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {certificates.map((certificate, index) => (
          <motion.div key={certificate.id || index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.1 }} className="glass-card group overflow-hidden" whileHover={{ y: -8, borderColor: 'rgba(0, 245, 195, 0.5)', boxShadow: '0 0 30px rgba(0, 245, 195, 0.2)' }} style={{ borderRadius: '18px' }}>
            <button type="button" onClick={() => setSelectedCertificate(certificate)} className="relative block aspect-[4/3] w-full overflow-hidden bg-[#0B1210] text-left" aria-label={`Preview ${certificate.title}`}>
              <CertificateImage certificate={certificate} />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background-card/80 via-transparent to-transparent" />
              <span className="absolute bottom-4 right-4 rounded-full border border-[#00F5C3]/40 bg-[#0B1210]/80 p-3 text-[#00F5C3] opacity-0 transition-opacity group-hover:opacity-100"><FaExpand size={13} /></span>
              <span className="absolute left-4 top-4 rounded-full border border-accent-primary/30 bg-background-card/90 px-4 py-2 text-xs font-space text-accent-primary">{certificate.issuer}</span>
            </button>
            <div className="p-6"><h3 className="mb-2 font-orbitron text-lg font-bold text-white">{certificate.title}</h3><p className="mb-1 font-space text-sm text-accent-primary">{certificate.issuer}</p><p className="mb-4 font-space text-xs text-text-secondary">Issued: {certificate.issueDate || certificate.date || 'Date not set'}</p><div className="flex gap-2"><button type="button" onClick={() => setSelectedCertificate(certificate)} className="btn-primary flex flex-1 items-center justify-center space-x-2 px-4 py-2.5 text-xs"><FaExpand size={14} /><span>View Certificate</span></button>{certificate.verificationUrl && <a href={certificate.verificationUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center rounded-xl border border-accent-primary/30 px-3 text-accent-primary" aria-label={`Verify ${certificate.title}`}><FaExternalLinkAlt size={13} /></a>}</div></div>
          </motion.div>
        ))}
      </div>

      {selectedCertificate && <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md" role="dialog" aria-modal="true" aria-label={`${selectedCertificate.title} preview`} onClick={() => setSelectedCertificate(null)}><div className="relative flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-[#00F5C3]/30 bg-[#0B1210] shadow-2xl shadow-[#00F5C3]/10" onClick={(event) => event.stopPropagation()}><button type="button" onClick={() => setSelectedCertificate(null)} className="absolute right-4 top-4 z-10 rounded-full border border-white/10 bg-black/60 p-3 text-white" aria-label="Close certificate preview"><FaTimes /></button><div className="flex min-h-0 flex-1 items-center justify-center bg-black p-4"><CertificateImage certificate={selectedCertificate} className="max-h-[78vh]" /></div><div className="border-t border-white/10 px-5 py-4"><h3 className="font-orbitron text-lg font-bold text-white">{selectedCertificate.title}</h3><p className="mt-1 text-sm text-[#00F5C3]">{selectedCertificate.issuer} {selectedCertificate.issueDate ? `• ${selectedCertificate.issueDate}` : ''}</p></div></div></div>}
    </section>
  );
};

export default Certificates;
