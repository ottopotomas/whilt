import { supabase } from '@/lib/supabaseClient';
import type { TIL, Comment } from "./types";

export async function getTILBySlug(slug: string): Promise<TIL | null> {
  const { data, error } = await supabase
    .from("tils")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) return null;
  return data;
}

export async function getLinkedTILs(id: string): Promise<{
  parent: TIL | null;
  children: TIL[];
}> {
  const { data: parent } = await supabase
    .from("tils")
    .select("*")
    .eq("id", id)
    .single();

  const { data: children } = await supabase
    .from("tils")
    .select("*")
    .eq("parent_id", id); // updated from .contains() to .eq()

  return {
    parent: parent || null,
    children: children || [],
  };
}

export async function getSuggestedCapyTIL(til: TIL): Promise<TIL | null> {
  const { data } = await supabase
    .from("tils")
    .select("*")
    .neq("id", til.id)
    .limit(1)
    .order("created_at", { ascending: false });

  return data?.[0] || null;
}

export async function getTILComments(tilId: string): Promise<Comment[]> {
  const { data, error } = await supabase
    .from("comments")
    .select(`
      id,
      til_id,
      user_id,
      content,
      created_at,
      profiles (
        username,
        name,
        avatar_url
      )
    `)
    .eq("til_id", tilId)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Error fetching comments:", error.message);
    return [];
  }

  return (data || []).map((comment: any) => ({
    ...comment,
    user: comment.profiles || { username: "unknown" },
  }));
}
