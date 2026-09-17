import { useMemo } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { isAdminAuthenticated, logoutAdmin } from '../lib/admin';
import { usePortfolio } from '../context/PortfolioContext';
import { hasSupabaseConfig } from '../lib/supabase';

const sidebarItems = [
  { label: 'Overview', path: '/admin' },
  { label: 'Profile', path: '/admin/profile' },
  { label: 'About', path: '/admin/about' },
  { label: 'Education', path: '/admin/education' },
  { label: 'Skills', path: '/admin/skills' },
  { label: 'Projects', path: '/admin/projects' },
  { label: 'Certificates', path: '/admin/certificates' },
  { label: 'Achievements', path: '/admin/achievements' },
  { label: 'Experience', path: '/admin/experience' },
  { label: 'Services', path: '/admin/services' },
  { label: 'Resume', path: '/admin/resume' },
  { label: 'Social Links', path: '/admin/social' },
  { label: 'Messages', path: '/admin/messages' },
  { label: 'Media', path: '/admin/media' },
  { label: 'Settings', path: '/admin/settings' },
  { label: 'Admin Profile', path: '/admin/admin-profile' },
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { portfolio } = usePortfolio();

  const stats = useMemo(() => ({
    projects: portfolio.projects?.length ?? 0,
    certificates: portfolio.certificates?.length ?? 0,
    achievements: portfolio.achievements?.length ?? 0,
    skills: portfolio.skills?.length ?? 0,
    experience: portfolio.experience?.length ?? 0,
    education: portfolio.education?.length ?? 0,
    messages: portfolio.contactMessages?.length ?? 0,
    published: [
      ...((portfolio.projects ?? []).filter((item) => item.published)),
      ...((portfolio.certificates ?? []).filter((item) => item.published)),
      ...((portfolio.achievements ?? []).filter((item) => item.published)),
      ...((portfolio.skills ?? []).filter((item) => item.published)),
      ...((portfolio.experience ?? []).filter((item) => item.published)),
    ].length,
  }), [portfolio]);

  const handleLogout = () => {
    logoutAdmin();
    navigate('/admin/login');
  };

  if (!isAdminAuthenticated()) {
    navigate('/admin/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <aside className="w-full border-b border-[#00F5C3]/20 bg-[#0B1210] p-4 lg:w-72 lg:border-b-0 lg:border-r lg:p-6">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-[0.32rem] text-[#00F5C3]">Portfolio</p>
            <h2 className="mt-3 text-2xl font-bold">Admin Panel</h2>
          </div>

          <nav className="grid grid-cols-2 gap-2 space-y-0 sm:grid-cols-3 lg:block lg:space-y-2">
            {sidebarItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="block rounded-xl border border-transparent px-3 py-2 text-sm text-gray-200 transition hover:border-[#00F5C3]/30 hover:bg-[#111815]"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            onClick={handleLogout}
            className="mt-8 w-full rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300"
          >
            Logout
          </button>
          <Link to="/" className="mt-3 block w-full rounded-xl border border-[#00F5C3]/20 px-3 py-2 text-center text-sm text-[#00F5C3]">
            Back to Portfolio
          </Link>
        </aside>

        <main className="flex-1 p-6 lg:p-8">
          <header className="mb-8 flex flex-col gap-4 border-b border-[#00F5C3]/20 pb-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.28rem] text-[#00F5C3]">Overview</p>
              <h1 className="mt-2 text-3xl font-bold">Dashboard</h1>
            </div>
            <div className="rounded-xl border border-[#00F5C3]/20 bg-[#0B1210] px-4 py-2 text-sm text-gray-300">
              <span>{portfolio.profile?.name || 'Krushna Rajpure'}</span>
              <span className={`ml-3 text-xs ${hasSupabaseConfig ? 'text-green-300' : 'text-yellow-300'}`}>
                {hasSupabaseConfig ? 'Supabase connected' : 'Local fallback'}
              </span>
            </div>
          </header>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-8">
            {[
              ['Projects', stats.projects],
              ['Certificates', stats.certificates],
              ['Achievements', stats.achievements],
              ['Skills', stats.skills],
              ['Experience', stats.experience],
              ['Education', stats.education],
              ['Messages', stats.messages],
              ['Published', stats.published],
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-[#00F5C3]/20 bg-[#0B1210] p-4">
                <p className="text-xs uppercase tracking-[0.2rem] text-gray-400">{label}</p>
                <p className="mt-3 text-3xl font-bold text-[#00F5C3]">{value}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-[#00F5C3]/20 bg-[#0B1210] p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
