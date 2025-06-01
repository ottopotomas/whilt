import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import type { Database } from "../../../../../types/supabase";

export async function POST(req: Request) {
  const supabase = createRouteHandlerClient<Database>({ cookies });

  const { id, content } = await req.json();
  if (!id || !content) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { error } = await supabase
    .from("tils")
    .update({ content })
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
