// lib/fetchTils.ts
import { supabase } from "./supabaseClient"; // use client-side supabase instance
// import type { TIL } from './types'; // Uncomment and define if you want type safety

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

  return data || [];
}
