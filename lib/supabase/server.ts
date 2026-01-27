import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Server-only Supabase admin client
// Uses service role key - NEVER import this file in client components

let supabaseAdmin: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient {
  // Lazy initialization to avoid build-time errors when env vars aren't set
  if (!supabaseAdmin) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!url || !serviceKey) {
      throw new Error(
        'Missing Supabase environment variables. Ensure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set.'
      );
    }

    supabaseAdmin = createClient(url, serviceKey, {
      auth: {
        // Disable session persistence - not needed for server-side operations
        persistSession: false,
        autoRefreshToken: false,
      },
    });
  }

  return supabaseAdmin;
}
