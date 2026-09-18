import { addContactMessage, defaultPortfolioData, safeReadLocalStorage, writeLocalPortfolio } from './portfolioStorage';
import { hasSupabaseConfig, supabase, supabaseStorageBucket } from './supabase';

const collectionTables = {
  skills: 'skills',
  projects: 'projects',
  certificates: 'certifications',
  achievements: 'achievements',
  experience: 'experiences',
  education: 'education',
  socialLinks: 'social_links',
  services: 'services',
};

const publicCollectionFilter = (query) => query.eq('published', true).order('display_order', { ascending: true });

const toDatabaseRow = (item) => {
  const { id, published = true, order = 0, ...data } = item;
  return { id, data, published, display_order: order };
};

const fromDatabaseRow = (row) => ({
  id: row.id,
  ...row.data,
  published: row.published,
  order: row.display_order,
});

async function readCollection(section, publicOnly) {
  const table = collectionTables[section];
  let query = supabase.from(table).select('id,data,published,display_order');
  if (publicOnly) query = publicCollectionFilter(query);
  else query = query.order('display_order', { ascending: true });
  const { data, error } = await query;
  if (error) throw error;
  return (data || []).map(fromDatabaseRow);
}

async function readSingleton(table, fallback) {
  const { data, error } = await supabase.from(table).select('data').eq('id', 1).maybeSingle();
  if (error) throw error;
  return data?.data ? { ...fallback, ...data.data } : fallback;
}

async function readContactMessages() {
  const { data, error } = await supabase.from('contact_messages').select('*').order('created_at', { ascending: false });
  if (error) return [];
  return data || [];
}

async function readPortfolio(publicOnly) {
  const [profile, about, settings, ...collections] = await Promise.all([
    readSingleton('profiles', defaultPortfolioData.profile),
    readSingleton('about_content', defaultPortfolioData.about),
    readSingleton('site_settings', defaultPortfolioData.settings),
    ...Object.keys(collectionTables).map((section) => readCollection(section, publicOnly)),
  ]);

  const data = { profile, about, settings };
  Object.keys(collectionTables).forEach((section, index) => {
    data[section] = collections[index];
  });
  data.contactMessages = publicOnly ? [] : await readContactMessages();
  return { ...defaultPortfolioData, ...data };
}

export async function loadPortfolioData() {
  if (!hasSupabaseConfig || !supabase) {
    return safeReadLocalStorage();
  }

  try {
    const { data } = await supabase.auth.getSession();
    const isAdminSession = Boolean(data.session);
    const loaded = await readPortfolio(!isAdminSession);
    const hasCollectionData = Object.keys(collectionTables).some((section) => loaded[section]?.length);

    if (!hasCollectionData) {
      const localFallback = safeReadLocalStorage();
      if (isAdminSession) await savePortfolioData(localFallback, true);
      return localFallback;
    }

    return loaded;
  } catch (error) {
    console.warn('Supabase portfolio sync unavailable, falling back to local storage.', error);
    return safeReadLocalStorage();
  }
}

export async function loadPublicPortfolioData() {
  if (!hasSupabaseConfig || !supabase) return safeReadLocalStorage();

  try {
    return await readPortfolio(true);
  } catch (error) {
    console.warn('Unable to load published portfolio data:', error.message);
    return safeReadLocalStorage();
  }
}

async function upsertSingleton(table, data) {
  const { error } = await supabase.from(table).upsert({ id: 1, data }, { onConflict: 'id' });
  if (error) throw error;
}

async function syncCollection(section, items) {
  const table = collectionTables[section];
  const rows = items.map(toDatabaseRow);
  const ids = rows.map((row) => row.id);
  if (ids.length) {
    const { error: deleteError } = await supabase.from(table).delete().not('id', 'in', `(${ids.join(',')})`);
    if (deleteError) throw deleteError;
  } else {
    const { error: clearError } = await supabase.from(table).delete().neq('id', '');
    if (clearError) throw clearError;
  }
  if (rows.length) {
    const { error } = await supabase.from(table).upsert(rows, { onConflict: 'id' });
    if (error) throw error;
  }
}

export async function savePortfolioData(data, skipLocalWrite = false) {
  if (!skipLocalWrite) {
    writeLocalPortfolio(data);
  }

  if (!hasSupabaseConfig || !supabase) {
    return data;
  }

  const { data: sessionData } = await supabase.auth.getSession();
  if (!sessionData.session) {
    return data;
  }

  try {
    await Promise.all([
      upsertSingleton('profiles', data.profile),
      upsertSingleton('about_content', data.about),
      upsertSingleton('site_settings', data.settings),
      ...Object.keys(collectionTables).map((section) => syncCollection(section, data[section] || [])),
    ]);
  } catch (error) {
    console.warn('Supabase sync failed:', error);
  }

  return data;
}

export async function submitContactMessage(message) {
  if (hasSupabaseConfig && supabase) {
    const { error } = await supabase.from('contact_messages').insert(message);
    if (!error) return { ok: true };
    console.warn('Unable to save contact message to Supabase:', error.message);
  }

  addContactMessage(message);
  return { ok: true, localOnly: true };
}

export async function updateContactMessageStatus(id, status) {
  if (!hasSupabaseConfig || !supabase) return { ok: false, message: 'Supabase is not configured.' };
  const { error } = await supabase.from('contact_messages').update({ status }).eq('id', id);
  return error ? { ok: false, message: error.message } : { ok: true };
}

export async function deleteContactMessage(id) {
  if (!hasSupabaseConfig || !supabase) return { ok: false, message: 'Supabase is not configured.' };
  const { error } = await supabase.from('contact_messages').delete().eq('id', id);
  return error ? { ok: false, message: error.message } : { ok: true };
}

export async function uploadPortfolioFile(file, folder = '') {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
  const maxBytes = 10 * 1024 * 1024;
  if (!file || !allowedTypes.includes(file.type)) return { ok: false, message: 'Use JPG, PNG, WEBP, or PDF files.' };
  if (file.size > maxBytes) return { ok: false, message: 'Files must be smaller than 10 MB.' };
  if (!hasSupabaseConfig || !supabase) return { ok: false, message: 'Configure Supabase before uploading media.' };

  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '-');
  const fileName = `${Date.now()}-${safeName}`;
  const path = folder ? `${folder}/${fileName}` : fileName;
  const { error } = await supabase.storage.from(supabaseStorageBucket).upload(path, file, { upsert: false, contentType: file.type });
  if (error) return { ok: false, message: error.message };
  const { data } = supabase.storage.from(supabaseStorageBucket).getPublicUrl(path);
  await supabase.from('portfolio_media').insert({ name: file.name, path, mime_type: file.type, size_bytes: file.size });
  return { ok: true, url: data.publicUrl, path };
}

export async function getPortfolioMedia() {
  if (!hasSupabaseConfig || !supabase) return [];
  const { data } = await supabase.from('portfolio_media').select('*').order('created_at', { ascending: false });
  return data || [];
}

export async function deletePortfolioFile(media) {
  if (!hasSupabaseConfig || !supabase) return { ok: false, message: 'Configure Supabase before deleting media.' };
  const { error: storageError } = await supabase.storage.from(supabaseStorageBucket).remove([media.path]);
  if (storageError) return { ok: false, message: storageError.message };
  const { error } = await supabase.from('portfolio_media').delete().eq('id', media.id);
  return error ? { ok: false, message: error.message } : { ok: true };
}