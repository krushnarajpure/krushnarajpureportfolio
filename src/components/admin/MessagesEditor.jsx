import { useMemo, useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { deleteContactMessage, updateContactMessageStatus } from '../../lib/portfolioService';

export default function MessagesEditor() {
  const { portfolio, setPortfolio } = usePortfolio();
  const [query, setQuery] = useState('');
  const messages = useMemo(() => (portfolio.contactMessages || []).filter((message) => {
    const value = `${message.name} ${message.email} ${message.subject} ${message.message}`.toLowerCase();
    return value.includes(query.toLowerCase());
  }), [portfolio.contactMessages, query]);

  const changeStatus = async (message, status) => {
    const result = await updateContactMessageStatus(message.id, status);
    if (!result.ok) return;
    setPortfolio((current) => ({
      ...current,
      contactMessages: current.contactMessages.map((item) => item.id === message.id ? { ...item, status } : item),
    }));
  };

  const removeMessage = async (message) => {
    if (!window.confirm('Delete this message permanently?')) return;
    const result = await deleteContactMessage(message.id);
    if (!result.ok) return;
    setPortfolio((current) => ({
      ...current,
      contactMessages: current.contactMessages.filter((item) => item.id !== message.id),
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Contact Messages</h2>
        <p className="mt-2 text-sm text-gray-400">Private messages are visible only to authenticated admins.</p>
      </div>
      <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search messages..." className="w-full rounded-xl border border-[#00F5C3]/20 bg-[#111815] px-3 py-2 text-white outline-none focus:border-[#00F5C3]" />
      {messages.length === 0 ? <div className="rounded-2xl border border-dashed border-[#00F5C3]/30 p-8 text-center text-sm text-gray-400">No contact messages found.</div> : messages.map((message) => (
        <article key={message.id} className="rounded-2xl border border-[#00F5C3]/20 bg-[#111815] p-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white">{message.subject}</h3>
              <p className="mt-1 text-sm text-[#00F5C3]">{message.name} · {message.email}</p>
              <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-gray-300">{message.message}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <select value={message.status} onChange={(event) => changeStatus(message, event.target.value)} className="rounded-lg border border-[#00F5C3]/30 bg-[#0B1210] px-2 py-2 text-xs text-gray-200">
                <option value="new">New</option>
                <option value="read">Read</option>
                <option value="archived">Archived</option>
              </select>
              <button type="button" onClick={() => removeMessage(message)} className="rounded-lg border border-red-500/30 px-3 py-2 text-xs text-red-300">Delete</button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
