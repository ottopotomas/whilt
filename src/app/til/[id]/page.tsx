'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "../../../../lib/supabase";
import CommentSection from "../../../components/CommentSection";

export default function TilPage() {
  const params = useParams();
  const id = params?.id as string;

  type Til = {
  id: string;
  question: string;
  answer: string;
  category: string;
};

const [til, setTil] = useState<Til | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchTIL = async () => {
      const { data, error } = await supabase
        .from("tils")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        setError("Error loading TIL");
      } else {
        setTil(data);
      }

      setLoading(false);
    };

    fetchTIL();
  }, [id]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (error || !til) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">{til.question}</h1>
      <p className="mt-2 text-gray-700">{til.answer}</p>
      <p className="mt-1 text-sm text-gray-500">Category: {til.category}</p>
      <CommentSection tilId={til.id} />
    </div>
  );
}
