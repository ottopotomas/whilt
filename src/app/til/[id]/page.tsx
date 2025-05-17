import { supabase } from "../../../../lib/supabase";
import CommentSection from "../../../components/CommentSection";

export default async function TilPage(props: { params: { id: string } }) {
  const { id } = props.params;

  const { data: til, error } = await supabase
    .from("tils")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !til) {
    return (
      <div className="p-4">
        <p>⚠️ TIL not found or error fetching it.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">{til.question}</h1>
      <p className="mt-2 text-gray-700">{til.answer}</p>
      <p className="mt-1 text-sm text-gray-500">Category: {til.category}</p>

      <CommentSection tilId={til.id} />
    </div>
  );
}
