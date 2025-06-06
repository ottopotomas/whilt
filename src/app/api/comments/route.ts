import { getSupabaseAdmin } from '../../../lib/supabaseAdmin';
import { NextResponse } from 'next/server';

// GET: Fetch comments for a specific TIL
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const til_id = searchParams.get('til_id');

  if (!til_id) {
    return NextResponse.json({ data: null, error: 'Missing til_id' }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from('comments')
    .select('*')
    .eq('til_id', til_id)
    .order('created_at', { ascending: true });

  return NextResponse.json({ data, error });
}

// POST: Add a new comment
export async function POST(req: Request) {
  const body = await req.json();
  const { til_id, content, user_id = null } = body;

  if (!til_id || !content) {
    return NextResponse.json({ data: null, error: 'Missing til_id or content' }, { status: 400 });
  }

  const supabase = getSupabaseAdmin(); // ✅ You were missing this line

  const { data, error } = await supabase
    .from('comments')
    .insert([{ til_id, content, user_id }])
    .select()
    .single();

  return NextResponse.json({ data, error });
}
