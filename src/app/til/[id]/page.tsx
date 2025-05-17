import { supabase } from "../../../../lib/supabase";
import CommentSection from "../../../components/CommentSection";

// No custom types — let Next.js handle the params typing
export default async function TilPage({ params }: any) {
  const id = params.id;

  const { data, error } = await supabase
    .from("tils")
    .select("*")
    .eq("id", id); // no `.single()` for now to debug

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

  const til = data[0]; // Use the first item from the result array

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">{til.question}</h1>
      <p className="mt-2 text-gray-700">{til.answer}</p>
      <p className="mt-1 text-sm text-gray-500">Category: {til.category}</p>

      <CommentSection tilId={til.id} />
    </div>
  );
}
