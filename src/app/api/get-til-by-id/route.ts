import { getSupabaseAdmin } from '../../../lib/supabaseAdmin';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const til_id = searchParams.get('til_id');

  if (!til_id) {
    return NextResponse.json({ data: null, error: 'Missing til_id' }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from('tils')
    .select('*')
    .eq('id', til_id)
    .single();

  return NextResponse.json({ data, error });
}
