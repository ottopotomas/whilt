import { supabase } from "../../../../lib/supabase";
import CommentSection from "../../../components/CommentSection";


interface PageProps {
  params: {
    id: string;
  };
}

export default async function TilPage({ params }: PageProps) {
  const { data: til, error } = await supabase
    .from("tils")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error || !til) return <p className="p-4">TIL not found.</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">{til.question}</h1>
      <p className="mt-2 text-gray-700">{til.answer}</p>
      <p className="mt-1 text-sm text-gray-500">Category: {til.category}</p>

      <CommentSection tilId={til.id} />
    </div>
  );
}
