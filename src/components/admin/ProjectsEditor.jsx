import { usePortfolio } from '../../context/PortfolioContext';

export default function ProjectsEditor() {
  const { portfolio, setPortfolio } = usePortfolio();

  const updateProject = (id, field, value) => {
    setPortfolio((current) => ({
      ...current,
      projects: (current.projects || []).map((item) => item.id === id ? { ...item, [field]: value } : item),
    }));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Projects</h2>
      <div className="space-y-4">
        {(portfolio.projects || []).map((project) => (
          <div key={project.id} className="rounded-2xl border border-[#00F5C3]/20 bg-[#111815] p-4">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="text-sm text-gray-300">
                <span className="mb-2 block">Title</span>
                <input value={project.title || ''} onChange={(e) => updateProject(project.id, 'title', e.target.value)} className="w-full rounded-xl border border-[#00F5C3]/20 bg-[#0B1210] px-3 py-2 text-white outline-none" />
              </label>
              <label className="text-sm text-gray-300">
                <span className="mb-2 block">Slug</span>
                <input value={project.slug || ''} onChange={(e) => updateProject(project.id, 'slug', e.target.value)} className="w-full rounded-xl border border-[#00F5C3]/20 bg-[#0B1210] px-3 py-2 text-white outline-none" />
              </label>
              <label className="text-sm text-gray-300 md:col-span-2">
                <span className="mb-2 block">Short description</span>
                <input value={project.shortDescription || ''} onChange={(e) => updateProject(project.id, 'shortDescription', e.target.value)} className="w-full rounded-xl border border-[#00F5C3]/20 bg-[#0B1210] px-3 py-2 text-white outline-none" />
              </label>
              <label className="text-sm text-gray-300 md:col-span-2">
                <span className="mb-2 block">Detailed description</span>
                <textarea rows={4} value={project.description || ''} onChange={(e) => updateProject(project.id, 'description', e.target.value)} className="w-full rounded-xl border border-[#00F5C3]/20 bg-[#0B1210] px-3 py-2 text-white outline-none" />
              </label>
              <label className="text-sm text-gray-300">
                <span className="mb-2 block">GitHub URL</span>
                <input value={project.githubUrl || ''} onChange={(e) => updateProject(project.id, 'githubUrl', e.target.value)} className="w-full rounded-xl border border-[#00F5C3]/20 bg-[#0B1210] px-3 py-2 text-white outline-none" />
              </label>
              <label className="text-sm text-gray-300">
                <span className="mb-2 block">Demo URL</span>
                <input value={project.demoUrl || ''} onChange={(e) => updateProject(project.id, 'demoUrl', e.target.value)} className="w-full rounded-xl border border-[#00F5C3]/20 bg-[#0B1210] px-3 py-2 text-white outline-none" />
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
