import { usePortfolio } from '../../context/PortfolioContext';

export default function EducationEditor() {
  const { portfolio, setPortfolio, savePortfolio } = usePortfolio();

  const updateEducation = (id, field, value) => {
    setPortfolio((current) => ({
      ...current,
      education: (current.education || []).map((item) => item.id === id ? { ...item, [field]: value } : item),
    }));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Education</h2>
      <div className="space-y-4">
        {(portfolio.education || []).map((item) => (
          <div key={item.id} className="rounded-2xl border border-[#00F5C3]/20 bg-[#111815] p-4">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="text-sm text-gray-300">
                <span className="mb-2 block">Degree</span>
                <input value={item.degree || ''} onChange={(e) => updateEducation(item.id, 'degree', e.target.value)} className="w-full rounded-xl border border-[#00F5C3]/20 bg-[#0B1210] px-3 py-2 text-white outline-none" />
              </label>
              <label className="text-sm text-gray-300">
                <span className="mb-2 block">Institution</span>
                <input value={item.institution || ''} onChange={(e) => updateEducation(item.id, 'institution', e.target.value)} className="w-full rounded-xl border border-[#00F5C3]/20 bg-[#0B1210] px-3 py-2 text-white outline-none" />
              </label>
              <label className="text-sm text-gray-300">
                <span className="mb-2 block">Duration</span>
                <input value={item.duration || ''} onChange={(e) => updateEducation(item.id, 'duration', e.target.value)} className="w-full rounded-xl border border-[#00F5C3]/20 bg-[#0B1210] px-3 py-2 text-white outline-none" />
              </label>
              <label className="text-sm text-gray-300">
                <span className="mb-2 block">Status</span>
                <input value={item.status || ''} onChange={(e) => updateEducation(item.id, 'status', e.target.value)} className="w-full rounded-xl border border-[#00F5C3]/20 bg-[#0B1210] px-3 py-2 text-white outline-none" />
              </label>
              <label className="text-sm text-gray-300">
                <span className="mb-2 block">CGPA</span>
                <input value={item.cgpa || ''} onChange={(e) => updateEducation(item.id, 'cgpa', e.target.value)} className="w-full rounded-xl border border-[#00F5C3]/20 bg-[#0B1210] px-3 py-2 text-white outline-none" />
              </label>
              <label className="text-sm text-gray-300">
                <span className="mb-2 block">Percentage</span>
                <input value={item.percentage || ''} onChange={(e) => updateEducation(item.id, 'percentage', e.target.value)} className="w-full rounded-xl border border-[#00F5C3]/20 bg-[#0B1210] px-3 py-2 text-white outline-none" />
              </label>
              <label className="text-sm text-gray-300 md:col-span-2">
                <span className="mb-2 block">Description</span>
                <textarea value={item.description || ''} onChange={(e) => updateEducation(item.id, 'description', e.target.value)} rows={3} className="w-full rounded-xl border border-[#00F5C3]/20 bg-[#0B1210] px-3 py-2 text-white outline-none" />
              </label>
            </div>
          </div>
        ))}
      </div>
      <button type="button" onClick={() => savePortfolio(portfolio)} className="rounded-xl bg-[#00F5C3] px-5 py-2.5 font-semibold text-[#050505]">Save Changes</button>
    </div>
  );
}
