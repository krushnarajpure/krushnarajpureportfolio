import { useEffect, useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { uploadPortfolioFile } from '../../lib/portfolioService';

export default function ProfileEditor() {
  const { portfolio, setPortfolio, savePortfolio } = usePortfolio();
  const [draft, setDraft] = useState(portfolio.profile || {});
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState('');

  useEffect(() => {
    setDraft(portfolio.profile || {});
  }, [portfolio.profile]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDraft((current) => ({ ...current, [name]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    const nextPortfolio = { ...portfolio, profile: draft };
    setPortfolio(() => nextPortfolio);
    await savePortfolio(nextPortfolio);
    setSaving(false);
    setNotice('Profile saved successfully.');
  };

  const handlePhotoUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const result = await uploadPortfolioFile(file);
    setUploading(false);
    if (result.ok) setDraft((current) => ({ ...current, photo: result.url }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Profile</h2>
        <p className="mt-2 text-sm text-gray-400">Edit the public profile information shown across the portfolio.</p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="space-y-2 text-sm text-gray-300">
          <span>Name</span>
          <input name="name" value={draft.name || ''} onChange={handleChange} className="w-full rounded-xl border border-[#00F5C3]/20 bg-[#111815] px-3 py-2 text-white outline-none focus:border-[#00F5C3]" />
        </label>
        <label className="space-y-2 text-sm text-gray-300">
          <span>Professional title</span>
          <input name="title" value={draft.title || ''} onChange={handleChange} className="w-full rounded-xl border border-[#00F5C3]/20 bg-[#111815] px-3 py-2 text-white outline-none focus:border-[#00F5C3]" />
        </label>
        <label className="space-y-2 text-sm text-gray-300 md:col-span-2">
          <span>Introduction</span>
          <textarea name="intro" value={draft.intro || ''} onChange={handleChange} rows={4} className="w-full rounded-xl border border-[#00F5C3]/20 bg-[#111815] px-3 py-2 text-white outline-none focus:border-[#00F5C3]" />
        </label>
        <label className="space-y-2 text-sm text-gray-300">
          <span>Email</span>
          <input name="email" value={draft.email || ''} onChange={handleChange} className="w-full rounded-xl border border-[#00F5C3]/20 bg-[#111815] px-3 py-2 text-white outline-none focus:border-[#00F5C3]" />
        </label>
        <label className="space-y-2 text-sm text-gray-300">
          <span>Phone</span>
          <input name="phone" value={draft.phone || ''} onChange={handleChange} className="w-full rounded-xl border border-[#00F5C3]/20 bg-[#111815] px-3 py-2 text-white outline-none focus:border-[#00F5C3]" />
        </label>
        <label className="space-y-2 text-sm text-gray-300">
          <span>Location</span>
          <input name="location" value={draft.location || ''} onChange={handleChange} className="w-full rounded-xl border border-[#00F5C3]/20 bg-[#111815] px-3 py-2 text-white outline-none focus:border-[#00F5C3]" />
        </label>
        <label className="space-y-2 text-sm text-gray-300">
          <span>GitHub URL</span>
          <input name="github" value={draft.github || ''} onChange={handleChange} className="w-full rounded-xl border border-[#00F5C3]/20 bg-[#111815] px-3 py-2 text-white outline-none focus:border-[#00F5C3]" />
        </label>
        <label className="space-y-2 text-sm text-gray-300">
          <span>LinkedIn URL</span>
          <input name="linkedin" value={draft.linkedin || ''} onChange={handleChange} className="w-full rounded-xl border border-[#00F5C3]/20 bg-[#111815] px-3 py-2 text-white outline-none focus:border-[#00F5C3]" />
        </label>
        <label className="space-y-2 text-sm text-gray-300">
          <span>Resume URL</span>
          <input name="resume" value={draft.resume || ''} onChange={handleChange} className="w-full rounded-xl border border-[#00F5C3]/20 bg-[#111815] px-3 py-2 text-white outline-none focus:border-[#00F5C3]" />
        </label>
        <label className="space-y-2 text-sm text-gray-300">
          <span>Availability</span>
          <input name="availability" value={draft.availability || ''} onChange={handleChange} className="w-full rounded-xl border border-[#00F5C3]/20 bg-[#111815] px-3 py-2 text-white outline-none focus:border-[#00F5C3]" />
        </label>
        <label className="space-y-2 text-sm text-gray-300">
          <span>Profile photo upload</span>
          <input type="file" accept="image/jpeg,image/png,image/webp" disabled={uploading} onChange={handlePhotoUpload} className="block w-full text-sm text-gray-300" />
          <span className="block truncate text-xs text-gray-500">{uploading ? 'Uploading...' : draft.photo || 'No uploaded photo'}</span>
        </label>
      </div>
      <div className="flex items-center gap-3 border-t border-[#00F5C3]/20 pt-5">
        <button type="button" onClick={handleSave} disabled={saving || uploading} className="rounded-xl bg-[#00F5C3] px-5 py-2.5 font-semibold text-[#050505] disabled:opacity-60">{saving ? 'Saving...' : 'Save Changes'}</button>
        {notice && <span className="text-sm text-[#00F5C3]">{notice}</span>}
      </div>
    </div>
  );
}
