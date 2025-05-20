'use client';

import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import DraftTILList from '../../components/DraftTILList';

export default function MemoryPage() {
  const supabase = createClientComponentClient();
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUserId(user?.id || null);
    };

    getUser();
  }, []);

  if (!userId) {
    return (
      <div className="p-6 text-center">
        <p className="text-sm text-gray-500">Loading your memory bank...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🧠 Your Knowledge Bank</h1>
      <p className="text-sm text-gray-600 mb-6">
        Review your drafts and publish when you're ready.
      </p>

      <DraftTILList userId={userId} />
    </div>
  );
}
