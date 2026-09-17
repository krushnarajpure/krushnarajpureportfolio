import { supabase, hasSupabaseConfig } from './supabase';

const ADMIN_KEY = 'krushna-portfolio-admin';
const SESSION_KEY = 'krushna-portfolio-session';

export function getStoredAdmin() {
  try {
    const raw = localStorage.getItem(ADMIN_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    console.warn('Unable to read admin config:', error);
    return null;
  }
}

export function saveAdmin(email, password) {
  const payload = {
    email: String(email || '').trim(),
    password: String(password || '').trim(),
    createdAt: new Date().toISOString(),
  };

  localStorage.setItem(ADMIN_KEY, JSON.stringify(payload));
  return payload;
}

export async function loginAdmin({ email, password }) {
  if (hasSupabaseConfig && supabase) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      return { ok: false, message: error.message || 'Invalid email or password.' };
    }

    const session = data?.session;
    if (session) {
      localStorage.setItem(SESSION_KEY, JSON.stringify({ email, loggedInAt: new Date().toISOString() }));
      return { ok: true, email: data.user?.email || email };
    }
  }

  const admin = getStoredAdmin();
  if (!admin) {
    return { ok: false, message: 'No administrator has been configured yet. Create the first admin account from the setup form.' };
  }

  const normalizedEmail = String(email || '').trim().toLowerCase();
  const normalizedPassword = String(password || '').trim();

  if (admin.email.toLowerCase() !== normalizedEmail) {
    return { ok: false, message: 'Invalid email or password.' };
  }

  if (admin.password !== normalizedPassword) {
    return { ok: false, message: 'Invalid email or password.' };
  }

  localStorage.setItem(SESSION_KEY, JSON.stringify({ email: admin.email, loggedInAt: new Date().toISOString() }));
  return { ok: true, email: admin.email };
}

export async function logoutAdmin() {
  if (hasSupabaseConfig && supabase) {
    await supabase.auth.signOut();
  }
  localStorage.removeItem(SESSION_KEY);
}

export function isAdminAuthenticated() {
  try {
    const session = localStorage.getItem(SESSION_KEY);
    return Boolean(session);
  } catch {
    return false;
  }
}

export function ensureAdminSetup() {
  const admin = getStoredAdmin();
  return Boolean(admin && admin.email && admin.password);
}
