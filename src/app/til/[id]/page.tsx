import { supabase } from "../../../../lib/supabase";
import CommentSection from "../../../components/CommentSection";

export default async function TilPage({ params }: { params: { id: string } }) {
  const { id } = params;

  const { data, error } = await supabase
    .from("tils")
    .select("*")
    .eq("id", id); // Removed `.single()` to debug

  console.log("🧠 Requested TIL ID:", id);
  console.log("📦 Supabase returned:", data);
  console.log("❌ Supabase error:", error);

  if (error || !data || data.length === 0) {
    return (
      <div className="p-4">
        <p>⚠️ No TIL found for this ID, or an error occurred.</p>
      </div>
    );
  }

  // Just use the first item for now
  const til = data[0];

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">{til.question}</h1>
      <p className="mt-2 text-gray-700">{til.answer}</p>
      <p className="mt-1 text-sm text-gray-500">Category: {til.category}</p>

      <CommentSection tilId={til.id} />
    </div>
  );
}
