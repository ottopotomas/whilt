// src/app/api/get-til-by-id/route.ts

import { supabaseAdmin as supabase } from '../../../lib/supabaseAdmin';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  console.log("🧠 API DEBUG - TIL ID:", id);

  // 👇 NEW: Fetch all IDs first
  const { data: allTils } = await supabase
    .from('tils')
    .select('id');

  console.log("🧠 DEBUG - All TIL IDs in DB:", allTils?.map((t) => t.id));

  // Then try to fetch the one matching ID
  const { data, error } = await supabase
    .from('tils')
    .select('*')
    .eq('id', id)
    .single();

  console.log("🧠 DEBUG - TIL result:", { data, error });

  return NextResponse.json({ data, error });
}
