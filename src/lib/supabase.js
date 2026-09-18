import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
export const supabaseStorageBucket = import.meta.env.VITE_SUPABASE_STORAGE_BUCKET;

const isPlaceholder = (value) => !value || /your-project|your-anon-key/i.test(value);

export const supabase = !isPlaceholder(supabaseUrl) && !isPlaceholder(supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : null;

export const hasSupabaseConfig = Boolean(
  supabase &&
  !isPlaceholder(supabaseStorageBucket)
);
