'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { format } from 'date-fns';
import type { TIL } from '../../lib/types';

export default function MemoryPage() {
  const [tils, setTils] = useState<TIL[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTILs = async () => {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('tils')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_draft', false)
        .order('created_at', { ascending: false });

      if (!error && data) {
        setTils(data);
      }

      setLoading(false);
    };

    fetchTILs();
  }, []);

  if (loading) {
    return <p className="p-4">Loading your memory bank...</p>;
  }

  if (tils.length === 0) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-semibold mb-2">Your Memory Bank</h1>
        <p className="text-gray-600">No TILs logged yet. Start learning!</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Your Memory Bank</h1>

      {tils.map((til) => (
        <div key={til.id} className="p-4 bg-white rounded shadow">
          <p className="text-sm text-gray-500">
            {format(new Date(til.created_at), 'PP')}
          </p>
          <p className="text-base">{til.content}</p>
          {til.category && (
            <p className="text-xs mt-1 italic text-gray-600">
              Category: {til.category}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
