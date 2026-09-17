import { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { uploadPortfolioFile } from '../../lib/portfolioService';

const inputClass = 'w-full rounded-xl border border-[#00F5C3]/20 bg-[#0B1210] px-3 py-2 text-white outline-none focus:border-[#00F5C3]';

function initialValue(field) {
  if (field.type === 'checkbox') return false;
  if (field.type === 'array') return [];
  return '';
}

function emptyItem(fields) {
  return fields.reduce((result, field) => ({ ...result, [field.name]: initialValue(field) }), {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    published: true,
    order: 1,
  });
}

function displayValue(value) {
  if (Array.isArray(value)) return value.join(', ');
  if (typeof value === 'boolean') return value ? 'Yes' : 'No';
  return value || 'Not set';
}

export default function CollectionEditor({ title, section, fields }) {
  const { portfolio, setPortfolio, savePortfolio } = usePortfolio();
  const items = portfolio[section] || [];
  const [editing, setEditing] = useState(null);
  const [query, setQuery] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');
  const [notice, setNotice] = useState('');
  const [uploading, setUploading] = useState(false);

  const filteredItems = (() => {
    const normalizedQuery = query.trim().toLowerCase();
    return [...items]
      .filter((item) => !normalizedQuery || fields.some((field) => displayValue(item[field.name]).toLowerCase().includes(normalizedQuery)))
      .sort((first, second) => {
        const firstOrder = Number(first.order || 0);
        const secondOrder = Number(second.order || 0);
        return sortDirection === 'asc' ? firstOrder - secondOrder : secondOrder - firstOrder;
      });
  })();

  const saveItem = async (event) => {
    event.preventDefault();
    if (!editing) return;
    const requiredFields = fields.filter((field) => field.required);
    const invalidField = requiredFields.find((field) => !editing[field.name]?.toString().trim());
    if (invalidField) {
      setNotice(`${invalidField.label} is required.`);
      return;
    }

    const nextItems = portfolio[section]?.some((item) => item.id === editing.id)
      ? portfolio[section].map((item) => item.id === editing.id ? editing : item)
      : [editing, ...(portfolio[section] || [])];
    const nextPortfolio = {
      ...portfolio,
      [section]: nextItems,
    };
    setPortfolio(() => nextPortfolio);
    await savePortfolio(nextPortfolio);
    setEditing(null);
    setNotice('Saved locally and queued for Supabase sync.');
  };

  const removeItem = (id) => {
    if (!window.confirm('Delete this item? This action cannot be undone.')) return;
    setPortfolio((current) => ({
      ...current,
      [section]: (current[section] || []).filter((item) => item.id !== id),
    }));
    setNotice('Deleted locally and queued for Supabase sync.');
  };

  const togglePublished = (id) => {
    setPortfolio((current) => ({
      ...current,
      [section]: (current[section] || []).map((item) => item.id === id ? { ...item, published: !item.published } : item),
    }));
    setNotice('Publication status updated.');
  };

  const uploadField = async (fieldName, file) => {
    setUploading(true);
    const result = await uploadPortfolioFile(file);
    setUploading(false);
    if (!result.ok) {
      setNotice(result.message);
      return;
    }
    setEditing((current) => ({ ...current, [fieldName]: result.url }));
    setNotice('Media uploaded. Save the item to publish the new URL.');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">{title}</h2>
          <p className="mt-2 text-sm text-gray-400">Manage, publish, reorder, and remove {title.toLowerCase()}.</p>
        </div>
        <button type="button" onClick={() => { setNotice(''); setEditing(emptyItem(fields)); }} className="rounded-xl bg-[#00F5C3] px-4 py-2 text-sm font-semibold text-[#050505]">Add {title.slice(0, -1)}</button>
      </div>

      {notice && <p className="rounded-xl border border-[#00F5C3]/20 bg-[#00F5C3]/10 px-4 py-3 text-sm text-[#00F5C3]">{notice}</p>}

      <div className="flex flex-col gap-3 md:flex-row">
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={`Search ${title.toLowerCase()}...`} className={inputClass} />
        <button type="button" onClick={() => setSortDirection((current) => current === 'asc' ? 'desc' : 'asc')} className="rounded-xl border border-[#00F5C3]/20 px-4 py-2 text-sm text-gray-300">Order: {sortDirection === 'asc' ? 'Ascending' : 'Descending'}</button>
      </div>

      {editing && (
        <form onSubmit={saveItem} className="space-y-4 rounded-2xl border border-[#00F5C3]/30 bg-[#111815] p-5">
          <div className="grid gap-4 md:grid-cols-2">
            {fields.map((field) => (
              <label key={field.name} className={`space-y-2 text-sm text-gray-300 ${field.type === 'textarea' || field.type === 'array' ? 'md:col-span-2' : ''}`}>
                <span>{field.label}{field.required ? ' *' : ''}</span>
                {field.type === 'textarea' ? (
                  <textarea rows={4} value={editing[field.name] || ''} onChange={(event) => setEditing((current) => ({ ...current, [field.name]: event.target.value }))} className={inputClass} />
                ) : field.type === 'checkbox' ? (
                  <input type="checkbox" checked={Boolean(editing[field.name])} onChange={(event) => setEditing((current) => ({ ...current, [field.name]: event.target.checked }))} className="h-5 w-5 accent-[#00F5C3]" />
                ) : field.type === 'file' ? (
                  <div className="space-y-2">
                    <input type="file" accept="image/jpeg,image/png,image/webp,application/pdf" disabled={uploading} onChange={(event) => uploadField(field.name, event.target.files?.[0])} className="block w-full text-sm text-gray-300" />
                    {editing[field.name] && <p className="truncate text-xs text-[#00F5C3]">Current: {editing[field.name]}</p>}
                  </div>
                ) : field.type === 'array' ? (
                  <textarea rows={2} value={(editing[field.name] || []).join(', ')} onChange={(event) => setEditing((current) => ({ ...current, [field.name]: event.target.value.split(',').map((value) => value.trim()).filter(Boolean) }))} className={inputClass} placeholder="Separate values with commas" />
                ) : (
                  <input type={field.type || 'text'} value={editing[field.name] || ''} onChange={(event) => setEditing((current) => ({ ...current, [field.name]: event.target.value }))} className={inputClass} />
                )}
              </label>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            <button type="submit" disabled={uploading} className="rounded-xl bg-[#00F5C3] px-4 py-2 text-sm font-semibold text-[#050505] disabled:opacity-60">{uploading ? 'Uploading...' : 'Save changes'}</button>
            <button type="button" onClick={() => setEditing(null)} className="rounded-xl border border-gray-600 px-4 py-2 text-sm text-gray-300">Cancel</button>
          </div>
        </form>
      )}

      <div className="space-y-3">
        {filteredItems.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[#00F5C3]/30 p-8 text-center text-sm text-gray-400">No matching {title.toLowerCase()} found.</div>
        ) : filteredItems.map((item) => (
          <div key={item.id} className="rounded-2xl border border-[#00F5C3]/20 bg-[#111815] p-4">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="min-w-0 flex-1">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span className={`rounded-full px-3 py-1 text-xs ${item.published ? 'bg-green-500/10 text-green-300' : 'bg-yellow-500/10 text-yellow-300'}`}>{item.published ? 'Published' : 'Draft'}</span>
                  <span className="text-xs text-gray-500">Order {item.order || 0}</span>
                </div>
                <div className="grid gap-2 sm:grid-cols-2">
                  {fields.slice(0, 4).map((field) => <p key={field.name} className="truncate text-sm text-gray-300"><span className="text-gray-500">{field.label}: </span>{displayValue(item[field.name])}</p>)}
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <button type="button" onClick={() => setEditing({ ...item })} className="rounded-lg border border-[#00F5C3]/30 px-3 py-2 text-xs text-[#00F5C3]">Edit</button>
                <button type="button" onClick={() => togglePublished(item.id)} className="rounded-lg border border-yellow-500/30 px-3 py-2 text-xs text-yellow-300">{item.published ? 'Unpublish' : 'Publish'}</button>
                <button type="button" onClick={() => removeItem(item.id)} className="rounded-lg border border-red-500/30 px-3 py-2 text-xs text-red-300">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
