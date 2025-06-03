"use client";

import { useEffect, useState } from "react";
import { supabase } from '@/lib/supabaseClient';
import TILCard from "../../../app/til/TILCard";
import type { TIL } from "@/lib/types"; // ✅ Ensure this is the correct path

type Props = {
  userId: string;
};

export default function TILTab({ userId }: Props) {
  const [userTILs, setUserTILs] = useState<TIL[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserTILs = async () => {
      const { data, error } = await supabase
        .from("tils")
        .select("*")
        .eq("user_id", userId)
        .eq("is_draft", false)
        .order("created_at", { ascending: false });

      if (!error && data) {
        const withUser = data.map((til) => ({
          ...til,
          user:
            typeof til.user === "string"
              ? { username: til.user }
              : til.user ?? undefined,
        }));
        setUserTILs(withUser as TIL[]);
      }

      setLoading(false);
    };

    fetchUserTILs();
  }, [userId]);

  if (loading) return <p className="p-4">Loading TILs...</p>;

  if (!userTILs.length) {
    return (
      <p className="p-4 text-gray-500">You haven’t posted any TILs yet.</p>
    );
  }

  return (
    <section className="space-y-4">
      {userTILs.map((til) => (
        <TILCard key={til.id} til={til} />
      ))}
    </section>
  );
}
