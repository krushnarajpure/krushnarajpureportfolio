import { usePortfolio } from '../../context/PortfolioContext';

export default function SkillsEditor() {
  const { portfolio, setPortfolio } = usePortfolio();

  const updateSkill = (id, field, value) => {
    setPortfolio((current) => ({
      ...current,
      skills: (current.skills || []).map((item) => item.id === id ? { ...item, [field]: value } : item),
    }));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Skills</h2>
      <div className="space-y-4">
        {(portfolio.skills || []).map((item) => (
          <div key={item.id} className="rounded-2xl border border-[#00F5C3]/20 bg-[#111815] p-4">
            <div className="grid gap-4 md:grid-cols-3">
              <label className="text-sm text-gray-300">
                <span className="mb-2 block">Name</span>
                <input value={item.name || ''} onChange={(e) => updateSkill(item.id, 'name', e.target.value)} className="w-full rounded-xl border border-[#00F5C3]/20 bg-[#0B1210] px-3 py-2 text-white outline-none" />
              </label>
              <label className="text-sm text-gray-300">
                <span className="mb-2 block">Category</span>
                <input value={item.category || ''} onChange={(e) => updateSkill(item.id, 'category', e.target.value)} className="w-full rounded-xl border border-[#00F5C3]/20 bg-[#0B1210] px-3 py-2 text-white outline-none" />
              </label>
              <label className="text-sm text-gray-300">
                <span className="mb-2 block">Proficiency</span>
                <input value={item.proficiency || ''} onChange={(e) => updateSkill(item.id, 'proficiency', e.target.value)} className="w-full rounded-xl border border-[#00F5C3]/20 bg-[#0B1210] px-3 py-2 text-white outline-none" />
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
