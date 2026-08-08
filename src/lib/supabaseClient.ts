import { createBrowserClient } from "@supabase/ssr";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabaseConfigured = Boolean(url && anonKey);

// Returns null when Supabase env vars aren't set, so the app can render a
// graceful "auth not configured" state instead of crashing. See .env.example.
export function getSupabaseBrowserClient() {
  if (!supabaseConfigured) return null;
  return createBrowserClient(url as string, anonKey as string);
}
