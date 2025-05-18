import { NextResponse } from "next/server";
import { supabase } from "../../../../lib/supabase";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing ID" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("tils")
    .select("*")
    .eq("id", id)
    .single();

  console.log("🧠 API DEBUG - TIL ID:", id);
  console.log("Data:", data);
  console.log("Error:", error);

  if (error || !data) {
    return NextResponse.json({ error: error?.message || "Not found" }, { status: 404 });
  }

  return NextResponse.json(data);
}
