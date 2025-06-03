import { createClient } from "@supabase/supabase-js";
import type { Database } from "../types/supabase";

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// ✅ Get a TIL by ID
export async function getTILById(id: string) {
  const { data, error } = await supabase.from("tils").select("*").eq("id", id).single();
  if (error) throw error;
  return data;
}

// ✅ Get parent and children TILs
export async function getLinkedTILs(tilId: string) {
  // 🔧 Placeholder logic — replace with your cluster table logic if needed
  return {
    parent: null,
    children: [],
  };
}

// ✅ Get a suggested TIL (Capy AI logic)
export async function getSuggestedCapyTIL(til: any) {
  // 🔧 Placeholder for Capy AI suggestion logic
  return null;
}

// ✅ Get all comments for a TIL
export async function getTILComments(tilId: string) {
  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .eq("til_id", tilId)
    .order("created_at", { ascending: true });

  if (error) throw error;
  return data || [];
}
