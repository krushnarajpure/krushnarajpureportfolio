import { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';

export default function AboutEditor() {
  const { portfolio, setPortfolio, savePortfolio } = usePortfolio();
  const [notice, setNotice] = useState('');

  const updateField = (field, value) => {
    setPortfolio((current) => ({
      ...current,
      about: {
        ...current.about,
        [field]: value,
      },
    }));
  };

  const updateQuickFact = (index, field, value) => {
    const quickFacts = [...(portfolio.about?.quickFacts || [])];
    quickFacts[index] = { ...quickFacts[index], [field]: value };
    updateField('quickFacts', quickFacts);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">About</h2>
        <p className="mt-2 text-sm text-gray-400">Customize the public About section and quick facts.</p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="space-y-2 text-sm text-gray-300 md:col-span-2">
          <span>About heading</span>
          <input value={portfolio.about?.heading || ''} onChange={(e) => updateField('heading', e.target.value)} className="w-full rounded-xl border border-[#00F5C3]/20 bg-[#111815] px-3 py-2 text-white outline-none focus:border-[#00F5C3]" />
        </label>
        <label className="space-y-2 text-sm text-gray-300 md:col-span-2">
          <span>Summary</span>
          <textarea rows={5} value={portfolio.about?.summary || ''} onChange={(e) => updateField('summary', e.target.value)} className="w-full rounded-xl border border-[#00F5C3]/20 bg-[#111815] px-3 py-2 text-white outline-none focus:border-[#00F5C3]" />
        </label>
        <label className="space-y-2 text-sm text-gray-300">
          <span>Current internship</span>
          <input value={portfolio.about?.currentInternship || ''} onChange={(e) => updateField('currentInternship', e.target.value)} className="w-full rounded-xl border border-[#00F5C3]/20 bg-[#111815] px-3 py-2 text-white outline-none focus:border-[#00F5C3]" />
        </label>
        <label className="space-y-2 text-sm text-gray-300">
          <span>Company</span>
          <input value={portfolio.about?.company || ''} onChange={(e) => updateField('company', e.target.value)} className="w-full rounded-xl border border-[#00F5C3]/20 bg-[#111815] px-3 py-2 text-white outline-none focus:border-[#00F5C3]" />
        </label>
        <label className="space-y-2 text-sm text-gray-300">
          <span>Start date</span>
          <input value={portfolio.about?.startDate || ''} onChange={(e) => updateField('startDate', e.target.value)} className="w-full rounded-xl border border-[#00F5C3]/20 bg-[#111815] px-3 py-2 text-white outline-none focus:border-[#00F5C3]" />
        </label>
        <label className="space-y-2 text-sm text-gray-300">
          <span>End date</span>
          <input value={portfolio.about?.endDate || ''} onChange={(e) => updateField('endDate', e.target.value)} className="w-full rounded-xl border border-[#00F5C3]/20 bg-[#111815] px-3 py-2 text-white outline-none focus:border-[#00F5C3]" />
        </label>
        <label className="space-y-2 text-sm text-gray-300">
          <span>Location</span>
          <input value={portfolio.about?.location || ''} onChange={(e) => updateField('location', e.target.value)} className="w-full rounded-xl border border-[#00F5C3]/20 bg-[#111815] px-3 py-2 text-white outline-none focus:border-[#00F5C3]" />
        </label>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold text-white">Quick facts</h3>
        <div className="space-y-3">
          {(portfolio.about?.quickFacts || []).map((fact, index) => (
            <div key={`${fact.label}-${index}`} className="grid gap-3 md:grid-cols-2">
              <input value={fact.label || ''} onChange={(e) => updateQuickFact(index, 'label', e.target.value)} className="rounded-xl border border-[#00F5C3]/20 bg-[#111815] px-3 py-2 text-white outline-none focus:border-[#00F5C3]" />
              <input value={fact.value || ''} onChange={(e) => updateQuickFact(index, 'value', e.target.value)} className="rounded-xl border border-[#00F5C3]/20 bg-[#111815] px-3 py-2 text-white outline-none focus:border-[#00F5C3]" />
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3 border-t border-[#00F5C3]/20 pt-5">
        <button type="button" onClick={async () => { await savePortfolio(portfolio); setNotice('About section saved successfully.'); }} className="rounded-xl bg-[#00F5C3] px-5 py-2.5 font-semibold text-[#050505]">Save Changes</button>
        {notice && <span className="text-sm text-[#00F5C3]">{notice}</span>}
      </div>
    </div>
  );
}
