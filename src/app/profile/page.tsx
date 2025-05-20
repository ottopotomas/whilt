'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabase';
import type { TIL } from '../../lib/types';

export default function ProfilePage() {
  const [tils, setTils] = useState<TIL[]>([]);
  const [tilCount, setTilCount] = useState(0);
  const [streak, setStreak] = useState(0);
  const [isPremium, setIsPremium] = useState(false);
  const [loading, setLoading] = useState(true);

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

      // Get TILs
      const { data: tilsData } = await supabase
        .from('tils')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_draft', false)
        .order('created_at', { ascending: false });

      setTils(tilsData || []);
      setTilCount(tilsData?.length || 0);
      setStreak(calculateStreak(tilsData || []));

      // Get profile data
      const { data: profile } = await supabase
        .from('profiles')
        .select('is_premium')
        .eq('id', user.id)
        .single();

      setIsPremium(profile?.is_premium || false);
      setLoading(false);
    };

    loadData();
  }, []);

  const calculateStreak = (tils: TIL[]) => {
    if (tils.length === 0) return 0;

    const today = new Date();
    let streak = 0;

    for (let i = 0; i < tils.length; i++) {
      const tilDate = new Date(tils[i].created_at);
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

  return (
  <div className="p-6 max-w-2xl mx-auto space-y-6">
    <h1 className="text-2xl font-bold">👤 Your Profile</h1>

    <div className="bg-white p-4 rounded shadow space-y-2">
      <p><strong>TILs logged:</strong> {tilCount}</p>
      <p><strong>🔥 Streak:</strong> {streak} day{streak !== 1 && 's'}</p>
      <p>
        <strong>Premium:</strong>{' '}
        {isPremium ? '✅ Active' : '❌ Inactive'}
      </p>
      {tils.length > 0 && (
        <p className="text-sm text-gray-500">
          Last learned: {new Date(tils[0].created_at).toLocaleDateString()}
        </p>
      )}
    </div>

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

    <div className="bg-white p-4 rounded shadow">
  <h2 className="text-lg font-semibold mb-2">Achievements</h2>
  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
    {[
  {
    label: '🔥 3-Day Streak',
    unlocked: streak >= 3,
    description: 'Keep it up for a full week!',
  },
  {
    label: '📚 7-Day Streak',
    unlocked: streak >= 7,
    description: 'One week of daily learning!',
  },
  {
    label: '🧘 28-Day Streak',
    unlocked: streak >= 28,
    description: 'A full month of memory gains.',
  },
  {
    label: '🤔 10 TILs Logged',
    unlocked: tilCount >= 10,
    description: 'You’re just getting started.',
  },
  {
    label: '🧠 50 TILs Logged',
    unlocked: tilCount >= 50,
    description: 'You’re building a real knowledge bank.',
  },
  {
    label: '🏆 100 TILs Logged',
    unlocked: tilCount >= 100,
    description: 'You are a memory master.',
  },
  // PREMIUM EXTRAS
  {
    label: '🧪 Premium Pack Unlocked',
    unlocked: isPremium,
    premium: true,
    description: 'Access exclusive TIL packs.',
  },
  {
    label: '🎁 Monthly Capy Reward',
    unlocked: isPremium,
    premium: true,
    description: 'Earn rare learning items!',
  },
].map((badge, index) => (
  <div
    key={index}
    className={`p-3 rounded border text-sm relative ${
      badge.unlocked
        ? 'border-green-500 bg-green-50 text-green-800'
        : badge.premium
        ? 'border-yellow-400 bg-yellow-50 text-yellow-500 opacity-60'
        : 'border-gray-300 bg-gray-100 text-gray-400'
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

  <div className="bg-white p-4 rounded shadow">
  <h2 className="text-lg font-semibold mb-2">🧭 Capy Explorer</h2>

  {isPremium ? (
    <div className="border p-4 rounded bg-green-50 text-green-900 space-y-1">
      <p className="text-xl">🎁 This Month&rsquo;s Reward:</p>
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

</div>

  </div>
);      
} // end of ProfilePage component