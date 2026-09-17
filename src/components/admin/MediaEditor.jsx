import { useEffect, useState } from 'react';
import { deletePortfolioFile, getPortfolioMedia, uploadPortfolioFile } from '../../lib/portfolioService';

export default function MediaEditor() {
  const [media, setMedia] = useState([]);
  const [status, setStatus] = useState('');
  const [uploading, setUploading] = useState(false);

  const refresh = async () => setMedia(await getPortfolioMedia());
  useEffect(() => { refresh(); }, []);

  const handleUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const result = await uploadPortfolioFile(file);
    setUploading(false);
    setStatus(result.ok ? 'Media uploaded successfully.' : result.message);
    if (result.ok) refresh();
  };

  const handleDelete = async (item) => {
    if (!window.confirm('Delete this file from Supabase Storage?')) return;
    const result = await deletePortfolioFile(item);
    setStatus(result.ok ? 'Media deleted.' : result.message);
    if (result.ok) refresh();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Media Library</h2>
        <p className="mt-2 text-sm text-gray-400">Upload portfolio images and PDFs to the protected media bucket.</p>
      </div>
      <label className="inline-flex cursor-pointer rounded-xl bg-[#00F5C3] px-4 py-2 text-sm font-semibold text-[#050505]">
        {uploading ? 'Uploading...' : 'Upload media'}
        <input type="file" accept="image/jpeg,image/png,image/webp,application/pdf" disabled={uploading} onChange={handleUpload} className="hidden" />
      </label>
      {status && <p className="text-sm text-[#00F5C3]">{status}</p>}
      {media.length === 0 ? <div className="rounded-2xl border border-dashed border-[#00F5C3]/30 p-8 text-center text-sm text-gray-400">No uploaded media found.</div> : media.map((item) => (
        <div key={item.id} className="flex flex-col gap-3 rounded-2xl border border-[#00F5C3]/20 bg-[#111815] p-4 md:flex-row md:items-center md:justify-between">
          <a href={`${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/portfolio-media/${item.path}`} target="_blank" rel="noreferrer" className="truncate text-sm text-[#00F5C3]">{item.name}</a>
          <button type="button" onClick={() => handleDelete(item)} className="rounded-lg border border-red-500/30 px-3 py-2 text-xs text-red-300">Delete</button>
        </div>
      ))}
    </div>
  );
}