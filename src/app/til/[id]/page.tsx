'use client'; // Add this line to mark the file as a Client Component

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation'; // Use useSearchParams instead of useRouter
import { supabase } from '../../../../lib/supabase'; // Adjust path if necessary
import CommentSection from '../../../components/CommentSection'; // Adjust path if necessary

interface TIL {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export default function TilPage() {
  const [til, setTil] = useState<TIL | null>(null); // Add type for til state
  const [error, setError] = useState<string | null>(null); // Allow for error string
  const searchParams = useSearchParams();
  const id = searchParams.get('id'); // Get the dynamic ID from search params

  useEffect(() => {
    if (!id) return;

    const fetchTIL = async () => {
      try {
        const { data, error } = await supabase
          .from('tils')
          .select('*')
          .eq('id', id);

        if (error) throw error;
        setTil(data ? data[0] : null); // Handle data properly
      } catch (err) {
        setError('Error fetching TIL');
      }
    };

    fetchTIL();
  }, [id]);

  if (error) return <p>{error}</p>;

  if (!til) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">{til.question}</h1>
      <p className="mt-2 text-gray-700">{til.answer}</p>
      <p className="mt-1 text-sm text-gray-500">Category: {til.category}</p>

      <CommentSection tilId={til.id} />
    </div>
  );
}
