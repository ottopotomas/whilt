'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabase';
import { format } from 'date-fns';
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
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold">Your Avatar</h2>
        <div className="mt-2">
          <p>
            {tilCount < 10 && '🎓 Beginner Learner'}
            {tilCount >= 10 && tilCount < 50 && '🧢 Learning Enthusiast'}
            {tilCount >= 50 && tilCount < 100 && '👓 Knowledge Builder'}
            {tilCount >= 100 && '🧠 WHILT Master'}
          </p>
        </div>
      </div>
    </div>
  );
}
