"use client";

import { supabase } from '@/lib/supabaseClient';
import type { TIL } from "../../../../types/til";

interface ProfileHeaderProps {
  tilCount: number;
  streak: number;
  isPremium: boolean;
  lastLearnedAt?: string; // optional enhancement if you want to pass it in
}

export default function ProfileHeader({
  tilCount,
  streak,
  isPremium,
  lastLearnedAt,
}: ProfileHeaderProps) {
  return (
    <section className="space-y-6">
      {/* Avatar + Stats */}
      <div className="bg-white p-4 rounded shadow space-y-2">
        <h1 className="text-xl font-bold">👤 Your Profile</h1>
        <p><strong>TILs logged:</strong> {tilCount}</p>
        <p><strong>🔥 Streak:</strong> {streak} day{streak !== 1 ? "s" : ""}</p>
        <p><strong>Premium:</strong> {isPremium ? "✅ Active" : "❌ Inactive"}</p>
        {lastLearnedAt && (
          <p className="text-sm text-gray-500">
            Last learned: {new Date(lastLearnedAt).toLocaleDateString()}
          </p>
        )}
      </div>

      {/* Avatar Level */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">🎭 Your WHILT Avatar</h2>
        <div className="p-4 border rounded bg-gray-50 text-center">
          {tilCount < 10 && (
            <>
              <p className="text-3xl mb-1">🎓</p>
              <p className="font-semibold">Beginner Learner</p>
              <p className="text-sm text-gray-500">Just getting started. Keep going!</p>
            </>
          )}
          {tilCount >= 10 && tilCount < 50 && (
            <>
              <p className="text-3xl mb-1">🧢</p>
              <p className="font-semibold">Learning Enthusiast</p>
              <p className="text-sm text-gray-500">You’re building momentum!</p>
            </>
          )}
          {tilCount >= 50 && tilCount < 100 && (
            <>
              <p className="text-3xl mb-1">👓</p>
              <p className="font-semibold">Knowledge Builder</p>
              <p className="text-sm text-gray-500">Your brain is expanding rapidly.</p>
            </>
          )}
          {tilCount >= 100 && (
            <>
              <p className="text-3xl mb-1">🧠</p>
              <p className="font-semibold">WHILT Master</p>
              <p className="text-sm text-gray-500">You’ve mastered the learning game.</p>
            </>
          )}
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">Achievements</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {[
            { label: '🔥 3-Day Streak', unlocked: streak >= 3, description: 'Keep it up for a full week!' },
            { label: '📚 7-Day Streak', unlocked: streak >= 7, description: 'One week of daily learning!' },
            { label: '🧘 28-Day Streak', unlocked: streak >= 28, description: 'A full month of memory gains.' },
            { label: '🤔 10 TILs Logged', unlocked: tilCount >= 10, description: 'You’re just getting started.' },
            { label: '🧠 50 TILs Logged', unlocked: tilCount >= 50, description: 'You’re building a real knowledge bank.' },
            { label: '🏆 100 TILs Logged', unlocked: tilCount >= 100, description: 'You are a memory master.' },
            { label: '🧪 Premium Pack Unlocked', unlocked: isPremium, premium: true, description: 'Access exclusive TIL packs.' },
            { label: '🎁 Monthly Capy Reward', unlocked: isPremium, premium: true, description: 'Earn rare learning items!' },
          ].map((badge, i) => (
            <div
              key={i}
              className={`p-3 rounded border text-sm relative ${
                badge.unlocked
                  ? "border-green-500 bg-green-50 text-green-800"
                  : badge.premium
                  ? "border-yellow-400 bg-yellow-50 text-yellow-500 opacity-60"
                  : "border-gray-300 bg-gray-100 text-gray-400"
              }`}
            >
              <p className="font-semibold">
                {badge.unlocked ? badge.label : `🔒 ${badge.label}`}
              </p>
              <p>{badge.description}</p>
              {badge.premium && !isPremium && (
                <p className="absolute top-1 right-2 text-xs italic text-yellow-500">
                  Premium only
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Capy Explorer */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">🧭 Capy Explorer</h2>
        {isPremium ? (
          <div className="border p-4 rounded bg-green-50 text-green-900 space-y-1">
            <p className="text-xl">🎁 This Month’s Reward:</p>
            <p className="text-2xl font-semibold">🧤 Botanist’s Gauntlets</p>
            <p className="text-sm text-green-800">Unlocked through your learning streak!</p>
          </div>
        ) : (
          <div className="border p-4 rounded bg-gray-100 text-gray-400 space-y-1 relative">
            <p className="text-xl">🎁 This Month’s Reward</p>
            <p className="text-2xl font-semibold blur-sm">🧤 ???</p>
            <p className="text-sm italic">Premium users unlock rare items every month.</p>
            <div className="absolute top-2 right-2 text-xs text-yellow-500 font-semibold">Premium</div>
          </div>
        )}
      </div>
    </section>
  );
}
