import { usePortfolio } from '../../context/PortfolioContext';

export default function CertificatesEditor() {
  const { portfolio, setPortfolio } = usePortfolio();

  const updateCertificate = (id, field, value) => {
    setPortfolio((current) => ({
      ...current,
      certificates: (current.certificates || []).map((item) => item.id === id ? { ...item, [field]: value } : item),
    }));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Certificates</h2>
      <div className="space-y-4">
        {(portfolio.certificates || []).map((certificate) => (
          <div key={certificate.id} className="rounded-2xl border border-[#00F5C3]/20 bg-[#111815] p-4">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="text-sm text-gray-300">
                <span className="mb-2 block">Title</span>
                <input value={certificate.title || ''} onChange={(e) => updateCertificate(certificate.id, 'title', e.target.value)} className="w-full rounded-xl border border-[#00F5C3]/20 bg-[#0B1210] px-3 py-2 text-white outline-none" />
              </label>
              <label className="text-sm text-gray-300">
                <span className="mb-2 block">Issuing organization</span>
                <input value={certificate.issuer || ''} onChange={(e) => updateCertificate(certificate.id, 'issuer', e.target.value)} className="w-full rounded-xl border border-[#00F5C3]/20 bg-[#0B1210] px-3 py-2 text-white outline-none" />
              </label>
              <label className="text-sm text-gray-300">
                <span className="mb-2 block">Issue date</span>
                <input type="date" value={certificate.issueDate || ''} onChange={(e) => updateCertificate(certificate.id, 'issueDate', e.target.value)} className="w-full rounded-xl border border-[#00F5C3]/20 bg-[#0B1210] px-3 py-2 text-white outline-none" />
              </label>
              <label className="text-sm text-gray-300">
                <span className="mb-2 block">Credential ID</span>
                <input value={certificate.credentialId || ''} onChange={(e) => updateCertificate(certificate.id, 'credentialId', e.target.value)} className="w-full rounded-xl border border-[#00F5C3]/20 bg-[#0B1210] px-3 py-2 text-white outline-none" />
              </label>
              <label className="text-sm text-gray-300 md:col-span-2">
                <span className="mb-2 block">Verification URL</span>
                <input value={certificate.verificationUrl || ''} onChange={(e) => updateCertificate(certificate.id, 'verificationUrl', e.target.value)} className="w-full rounded-xl border border-[#00F5C3]/20 bg-[#0B1210] px-3 py-2 text-white outline-none" />
              </label>
              <label className="text-sm text-gray-300 md:col-span-2">
                <span className="mb-2 block">Description</span>
                <textarea rows={3} value={certificate.description || ''} onChange={(e) => updateCertificate(certificate.id, 'description', e.target.value)} className="w-full rounded-xl border border-[#00F5C3]/20 bg-[#0B1210] px-3 py-2 text-white outline-none" />
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
