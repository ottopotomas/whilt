import { supabase } from "../../../../lib/supabase";
import CommentSection from "../../../components/CommentSection";

// No typing, no destructuring — bypass Vercel's type bug
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function TilPage(props: any) {
  const id = props?.params?.id;

  const { data, error } = await supabase
    .from("tils")
    .select("*")
    .eq("id", id);

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
