"use client";

import { useEffect, useState } from "react";
import { supabase } from '@/lib/supabaseClient';
import type { TIL } from "../../lib/types";

import ProfileHeader from "./components/ProfileHeader";
import ProfileTabs from "./components/ProfileTabs";
import TILTab from "./components/TILTab";
import RepliesTab from "./components/RepliesTab";
import KnowledgeBankTab from "./components/KnowledgeBankTab";
import InventoryTab from "./components/InventoryTab";

export default function ProfilePage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [tils, setTils] = useState<TIL[]>([]);
  const [tilCount, setTilCount] = useState(0);
  const [streak, setStreak] = useState(0);
  const [isPremium, setIsPremium] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"tils" | "replies" | "knowledge" | "inventory">("tils");

  useEffect(() => {
    const loadData = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        setLoading(false);
        return;
      }

      setUserId(user.id);

      // Fetch TILs
      const { data: tilsData, error: tilError } = await supabase
        .from("tils")
        .select("*")
        .eq("user_id", user.id)
        .eq("is_draft", false)
        .order("created_at", { ascending: false });

      if (!tilError && tilsData) {
        setTils(tilsData as TIL[]);
        setTilCount(tilsData.length);
        setStreak(calculateStreak(tilsData as TIL[]));
      }

      // Fetch profile info
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("is_premium")
        .eq("id", user.id)
        .single();

      if (!profileError && profile?.is_premium !== undefined) {
        setIsPremium(profile.is_premium);
      }

      setLoading(false);
    };

    loadData();
  }, []);

  const calculateStreak = (tils: TIL[]) => {
    const today = new Date();
    let streak = 0;

    for (let i = 0; i < tils.length; i++) {
      const createdAt = tils[i].created_at;
      if (!createdAt) continue; // ✅ protect against undefined values

      const tilDate = new Date(createdAt);
      const daysAgo = Math.floor(
        (today.getTime() - tilDate.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (daysAgo === streak) {
        streak += 1;
      } else if (daysAgo > streak) {
        break;
      }
    }

    return streak;
  };

  if (loading) return <p className="p-4">Loading your profile...</p>;

  const isBasic = !isPremium;

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <ProfileHeader tilCount={tilCount} streak={streak} isPremium={isPremium} />

      <ProfileTabs
        isPremium={isPremium}
        isBasic={isBasic}
        userId={userId ?? ""}
        tils={tils}
      />

      {activeTab === "tils" && userId && <TILTab userId={userId} />}
      {activeTab === "replies" && userId && <RepliesTab userId={userId} />}
      {activeTab === "knowledge" && (
        <KnowledgeBankTab isPremium={isPremium} isBasic={isBasic} />
      )}
      {activeTab === "inventory" && (
        <InventoryTab isPremium={isPremium} isBasic={isBasic} />
      )}
    </div>
  );
}
