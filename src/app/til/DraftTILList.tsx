'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import toast from 'react-hot-toast';
import { startOfToday } from 'date-fns';

type DraftTILListProps = {
  userId: string;
};

type TIL = {
  id: string;
  content: string;
  created_at: string;
};

const DraftTILList = ({ userId }: DraftTILListProps) => {
  const [drafts, setDrafts] = useState<TIL[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchDrafts = async () => {
    const { data, error } = await supabase
      .from('tils')
      .select('*')
      .eq('user_id', userId)
      .eq('is_draft', true)
      .order('created_at', { ascending: true });

    if (error) {
      toast.error('Failed to load drafts');
    } else {
      setDrafts(data || []);
    }
  };

  const publishDraft = async (id: string) => {
    setLoading(true);

    // Check if user is under the 10-TIL cap
    const { data: todaysTILs, error: countError } = await supabase
      .from('tils')
      .select('id')
      .eq('user_id', userId)
      .eq('source', 'manual')
      .eq('is_draft', false)
      .gte('created_at', startOfToday().toISOString());

    if (countError) {
      toast.error('Failed to check TIL limit');
      setLoading(false);
      return;
    }

    if ((todaysTILs?.length || 0) >= 10) {
      toast.error("Can't publish — you've hit today’s 10-TIL limit.");
      setLoading(false);
      return;
    }

    const { error: updateError } = await supabase
      .from('tils')
      .update({ is_draft: false })
      .eq('id', id);

    if (updateError) {
      toast.error('Failed to publish TIL');
    } else {
      toast.success('TIL published!');
      fetchDrafts(); // refresh list
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchDrafts();
  }, []);

  if (drafts.length === 0) return null;

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-2">Draft TILs</h2>
      <ul className="space-y-2">
        {drafts.map((til) => (
          <li key={til.id} className="bg-gray-100 p-3 rounded shadow">
            <p className="text-sm mb-2">{til.content}</p>
            <button
              onClick={() => publishDraft(til.id)}
              disabled={loading}
              className="text-blue-600 hover:underline text-sm"
            >
              {loading ? 'Publishing...' : 'Publish Now'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DraftTILList;
