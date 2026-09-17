import { usePortfolio } from '../../context/PortfolioContext';

export default function SettingsEditor() {
  const { portfolio, setPortfolio, savePortfolio } = usePortfolio();

  const updateSetting = (field, value) => {
    setPortfolio((current) => ({
      ...current,
      settings: {
        ...current.settings,
        [field]: value,
      },
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Settings</h2>
        <p className="mt-2 text-sm text-gray-400">Manage portfolio metadata and publication visibility.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-sm text-gray-300">
          <span>Site title</span>
          <input value={portfolio.settings?.siteTitle || ''} onChange={(e) => updateSetting('siteTitle', e.target.value)} className="w-full rounded-xl border border-[#00F5C3]/20 bg-[#111815] px-3 py-2 text-white outline-none" />
        </label>
        <label className="space-y-2 text-sm text-gray-300">
          <span>SEO title</span>
          <input value={portfolio.settings?.seoTitle || ''} onChange={(e) => updateSetting('seoTitle', e.target.value)} className="w-full rounded-xl border border-[#00F5C3]/20 bg-[#111815] px-3 py-2 text-white outline-none" />
        </label>
        <label className="space-y-2 text-sm text-gray-300 md:col-span-2">
          <span>SEO description</span>
          <textarea rows={3} value={portfolio.settings?.seoDescription || ''} onChange={(e) => updateSetting('seoDescription', e.target.value)} className="w-full rounded-xl border border-[#00F5C3]/20 bg-[#111815] px-3 py-2 text-white outline-none" />
        </label>
        <label className="space-y-2 text-sm text-gray-300 md:col-span-2">
          <span>Availability</span>
          <input value={portfolio.settings?.contactAvailability || ''} onChange={(e) => updateSetting('contactAvailability', e.target.value)} className="w-full rounded-xl border border-[#00F5C3]/20 bg-[#111815] px-3 py-2 text-white outline-none" />
        </label>
      </div>
      <button type="button" onClick={() => savePortfolio(portfolio)} className="rounded-xl bg-[#00F5C3] px-5 py-2.5 font-semibold text-[#050505]">Save Changes</button>
    </div>
  );
}
