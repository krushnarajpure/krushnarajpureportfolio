import { usePortfolio } from '../../context/PortfolioContext';

export default function OverviewPanel() {
  const { portfolio } = usePortfolio();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Welcome back</h2>
        <p className="mt-2 text-gray-400">Manage your portfolio content and publication status from here.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-[#00F5C3]/20 bg-[#111815] p-4">
          <p className="text-sm text-gray-400">Profile</p>
          <p className="mt-3 text-xl font-semibold text-white">{portfolio.profile?.name || 'Not set'}</p>
        </div>
        <div className="rounded-2xl border border-[#00F5C3]/20 bg-[#111815] p-4">
          <p className="text-sm text-gray-400">Availability</p>
          <p className="mt-3 text-xl font-semibold text-white">{portfolio.profile?.availability || 'Available'}</p>
        </div>
        <div className="rounded-2xl border border-[#00F5C3]/20 bg-[#111815] p-4">
          <p className="text-sm text-gray-400">Location</p>
          <p className="mt-3 text-xl font-semibold text-white">{portfolio.profile?.location || 'Not set'}</p>
        </div>
      </div>
    </div>
  );
}
