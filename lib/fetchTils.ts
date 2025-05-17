// lib/fetchTils.ts
import { supabase } from "./supabase";

export async function fetchPublicTils() {
  const { data, error } = await supabase
    .from("tils")
    .select("*")
    .eq("is_public", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching TILs:", error);
    return [];
  }

  return data;
}
