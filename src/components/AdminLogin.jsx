import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAdmin, ensureAdminSetup, saveAdmin } from '../lib/admin';
import { hasSupabaseConfig } from '../lib/supabase';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [needsSetup, setNeedsSetup] = useState(!hasSupabaseConfig && !ensureAdminSetup());

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (needsSetup) {
        saveAdmin(form.email, form.password);
        setNeedsSetup(false);
        const result = await loginAdmin(form);
        if (!result.ok) {
          setError(result.message);
          setIsLoading(false);
          return;
        }
        navigate('/admin');
        return;
      }

      const result = await loginAdmin(form);
      if (!result.ok) {
        setError(result.message);
        setIsLoading(false);
        return;
      }

      navigate('/admin');
    } catch {
      setError('Unable to sign in. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-md rounded-3xl border border-[#00F5C3]/30 bg-[#0B1210] p-8 shadow-2xl shadow-[#00F5C3]/10">
        <div className="mb-8 text-center">
          <p className="text-xs uppercase tracking-[0.32rem] text-[#00F5C3]">Admin Access</p>
          <h1 className="mt-3 text-3xl font-bold text-white">Portfolio CMS</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm text-gray-300">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-xl border border-[#00F5C3]/30 bg-[#111815] px-4 py-3 text-white outline-none transition focus:border-[#00F5C3]"
              placeholder="admin@example.com"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-300">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full rounded-xl border border-[#00F5C3]/30 bg-[#111815] px-4 py-3 text-white outline-none transition focus:border-[#00F5C3]"
              placeholder="Enter password"
              required
            />
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-xl bg-gradient-to-r from-[#00F5C3] to-[#39FF88] px-4 py-3 font-semibold text-[#050505] transition hover:brightness-110 disabled:opacity-70"
          >
            {isLoading ? 'Signing in...' : needsSetup ? 'Create Admin Account' : 'Login'}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-gray-400">
          {needsSetup ? 'This is your first sign-in. Set an admin email and password.' : 'Secure admin access only.'}
        </p>
      </div>
    </div>
  );
}
