import { NextRequest, NextResponse } from "next/server";
import { supabase } from "../../../../lib/supabase";

// GET /api/comments?til_id=...
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const til_id = searchParams.get("til_id");

  if (!til_id) {
    return NextResponse.json({ error: "Missing til_id" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .eq("til_id", til_id)
    .order("created_at", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}

// POST /api/comments
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { til_id, content, user_id = null } = body;

  if (!til_id || !content) {
    return NextResponse.json(
      { error: "Missing til_id or content" },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("comments")
    .insert([{ til_id, content, user_id }])
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}
