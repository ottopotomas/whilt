// lib/supabaseAdmin.ts
import { createClient } from '@supabase/supabase-js';

export const getSupabaseAdmin = () => {
  const url = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error('Missing environment variables for Supabase');
  }

  return createClient(url, serviceKey);
};
