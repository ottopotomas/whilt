import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import type { Database } from "../../../../../types/supabase";

export async function DELETE(req: Request) {
  const supabase = createRouteHandlerClient<Database>({ cookies });

  const { searchParams } = new URL(req.url);
  const tilId = searchParams.get("id");

  if (!tilId) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { error } = await supabase
    .from("tils")
    .delete()
    .eq("id", tilId)
    .eq("user_id", user.id); // ensure ownership

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ success: true });
}
