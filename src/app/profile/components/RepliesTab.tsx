"use client";

import { useEffect, useState } from "react";
import { supabase } from '@/lib/supabaseClient';
import TILCard from "../../../app/til/TILCard";
import type { TIL } from "@/lib/types"; // ✅ Update import path to match your unified type definition

type Props = {
  userId: string;
};

export default function RepliesTab({ userId }: Props) {
  const [repliedTILs, setRepliedTILs] = useState<TIL[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepliedTILs = async () => {
      const [likesRes, commentsRes] = await Promise.all([
        supabase.from("likes").select("til_id").eq("user_id", userId),
        supabase.from("comments").select("til_id").eq("user_id", userId),
      ]);

      const likedIds = likesRes.data?.map((row) => row.til_id) || [];
      const commentedIds = commentsRes.data?.map((row) => row.til_id) || [];

      const allUniqueIds = Array.from(new Set([...likedIds, ...commentedIds]));

      if (allUniqueIds.length === 0) {
        setRepliedTILs([]);
        setLoading(false);
        return;
      }

      const { data: tilData, error } = await supabase
        .from("tils")
        .select("*")
        .in("id", allUniqueIds)
        .eq("is_draft", false)
        .order("created_at", { ascending: false });

      if (!error && tilData) {
        const withUser = tilData.map((til) => ({
          ...til,
          user:
            typeof til.user === "string"
              ? { username: til.user }
              : til.user ?? undefined,
        }));
        setRepliedTILs(withUser as TIL[]);
      }

      setLoading(false);
    };

    fetchRepliedTILs();
  }, [userId]);

  if (loading) return <p className="p-4">Loading replies...</p>;

  if (!repliedTILs.length) {
    return (
      <p className="p-4 text-gray-500">
        You haven’t replied to or liked any TILs yet.
      </p>
    );
  }

  return (
    <section className="space-y-4">
      {repliedTILs.map((til) => (
        <TILCard key={til.id} til={til} />
      ))}
    </section>
  );
}
