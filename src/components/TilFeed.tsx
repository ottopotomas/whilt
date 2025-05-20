// components/TilFeed.tsx
"use client";

import { useEffect, useState } from "react";
import { fetchPublicTils } from "../lib/fetchTils";

interface TIL {
  id: string;
  question: string;
  answer: string;
  category: string;
  created_at: string;
}

export default function TilFeed() {
  const [tils, setTils] = useState<TIL[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTils() {
      const data = await fetchPublicTils();
      setTils(data);
      setLoading(false);
    }
    loadTils();
  }, []);

  if (loading) return <p className="text-center">Loading TILs...</p>;
  if (tils.length === 0) return <p className="text-center">No public TILs yet.</p>;

  return (
    <div className="flex flex-col gap-4">
      {tils.map((til) => (
        <div key={til.id} className="rounded-xl shadow p-4 border bg-white">
          <div className="text-sm text-gray-500">
            {new Date(til.created_at).toLocaleDateString()}
          </div>
          <h3 className="text-lg font-bold">{til.question}</h3>
          <p className="text-gray-700">{til.answer}</p>
          <div className="mt-2 text-xs">Category: {til.category}</div>
        </div>
      ))}
    </div>
  );
}
