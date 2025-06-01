"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Sparkles, Lock } from "lucide-react";
import type { TIL } from "../../../../types/til";
import { supabase } from "../../../lib/supabaseClient";

type Props = {
  isPremium: boolean;
};

export default function CapySuggestion({ isPremium }: Props) {
  const [suggestedTIL, setSuggestedTIL] = useState<TIL | null>(null);

  useEffect(() => {
    const fetchSuggestion = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("capy_suggestions")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      if (!error && data) {
        setSuggestedTIL(data as TIL);
      }
    };

    fetchSuggestion();
  }, []);

  if (!suggestedTIL) return null;

  return (
    <div
      className={`rounded-xl border p-4 flex gap-3 items-start ${
        isPremium
          ? "bg-yellow-50 border-yellow-200"
          : "bg-gray-100 border-gray-200 opacity-60 relative"
      }`}
    >
      <Image
        src="/capy-professor-icon.png"
        alt="Professor Capy"
        width={40}
        height={40}
        className="rounded-full flex-shrink-0"
      />

      <div className={`flex-1 space-y-1 ${!isPremium ? "blur-sm" : ""}`}>
        <p className="text-sm text-gray-700">
          <strong>Professor Capy</strong> suggests this for your Knowledge Bank:
        </p>
        <Link
          href={`/til/${suggestedTIL.id}`}
          className="text-sm text-blue-600 hover:underline"
        >
          TIL: {suggestedTIL.content}
        </Link>
        <div className="text-[10px] text-gray-400 mt-1 flex items-center gap-1">
          <Sparkles size={12} /> Premium Insight
        </div>
      </div>

      {!isPremium && (
        <div className="absolute top-2 right-2 text-[10px] font-semibold text-yellow-600 bg-yellow-100 px-2 py-0.5 rounded-full flex items-center gap-1">
          <Lock size={12} /> Premium only
        </div>
      )}
    </div>
  );
}
