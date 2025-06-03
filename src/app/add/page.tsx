// src/app/add/page.tsx
'use client';

import { useEffect, useState } from 'react';
import TILForm from '@/app/til/TILForm';
import { supabase } from '@/lib/supabaseClient';

export default function AddTILPage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUserId(user?.id ?? null);
      setLoading(false);
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFFCF5]">
        <p className="text-gray-600 text-sm">Loading...</p>
      </div>
    );
  }

  if (!userId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFFCF5]">
        <p className="text-red-600 text-sm">You must be logged in to add a TIL.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFCF5] flex flex-col items-center justify-start px-6 py-10">
      <h1 className="text-2xl font-semibold text-[#1F1F1F] mb-2 lowercase">
        what have i learned today?
      </h1>
      <p className="text-sm text-gray-600 mb-8">
        jot down your new insight — one sentence is all it takes.
      </p>

      <div className="w-full max-w-xl">
        <TILForm userId={userId} />
      </div>
    </div>
  );
}
