import { supabase } from "../../../../lib/supabase";
import CommentSection from "../../../components/CommentSection";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function TilPage({ params }: any) {
  // Debug: log the TIL ID
  console.log("🧠 params.id:", params.id);

  const { data: til, error } = await supabase
    .from("tils")
    .select("*")
    .eq("id", params.id)
    .single();

  // Debug: log what Supabase returned
  console.log("📦 supabase result:", til);
  console.log("❌ supabase error:", error);

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
