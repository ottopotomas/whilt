"use client";

import { useEffect, useState } from "react";
import { supabase } from '@/lib/supabaseClient';
import type { TIL } from "../../../lib/types";

import ClusterGroup from "./ClusterGroup";
import CapySuggestion from "./CapySuggestion";

interface KnowledgeBankTabProps {
  isPremium: boolean;
  isBasic: boolean;
}

type Cluster = {
  title: string;
  tils: TIL[];
};

export default function KnowledgeBankTab({ isPremium, isBasic }: KnowledgeBankTabProps) {
  const [learnedTILs, setLearnedTILs] = useState<TIL[]>([]);
  const [clusters, setClusters] = useState<Cluster[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLearnedTILs = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("tils")
        .select("*")
        .or(`user_id.eq.${user.id},learners.cs.{${user.id}}`)
        .eq("is_draft", false);

      if (!error && data) {
        setLearnedTILs(data);
        setClusters(groupTILsByCluster(data, isPremium));
      }

      setLoading(false);
    };

    fetchLearnedTILs();
  }, [isPremium]);

  if (loading) return <p className="p-4">Loading your Knowledge Bank...</p>;
  if (!learnedTILs.length) return <p className="p-4 text-gray-500">No learned TILs yet.</p>;

  return (
    <div className="space-y-6">
      {clusters.map((cluster, i) => (
        <ClusterGroup
          key={i}
          cluster={{ title: cluster.title, tils: cluster.tils }}
          isPremium={isPremium}
          isBasic={isBasic}
        />
      ))}

      {/* Premium-only AI suggestion component */}
      {isPremium && <CapySuggestion isPremium />}
    </div>
  );
}

// TEMP: Replace with actual AI grouping logic later
function groupTILsByCluster(tils: TIL[], isPremium: boolean): Cluster[] {
  return [
    {
      title: isPremium ? "AI-Generated Learning Cluster" : "General Knowledge",
      tils,
    },
  ];
}
