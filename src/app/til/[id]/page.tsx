import { supabase } from "../../../../lib/supabase";
import CommentSection from "../../../components/CommentSection";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function TilPage({ params }: any) {
  console.log("🧠 Page params:", params);

  const { data: til, error } = await supabase
    .from("tils")
    .select("*")
    .eq("id", params.id)
    .single();

  console.log("📦 Supabase TIL:", til);
  console.log("❌ Supabase error:", error);

  if (error) {
    return (
      <div className="p-4">
        <p>❌ Error fetching TIL: {error.message}</p>
      </div>
    );
  }

  if (!til) {
    return (
      <div className="p-4">
        <p>⚠️ No TIL found for ID: {params.id}</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">{til.question}</h1>
      <p className="mt-2">{til.answer}</p>
      <p className="text-sm text-gray-500">Category: {til.category}</p>

      <CommentSection tilId={til.id} />
    </div>
  );
}
