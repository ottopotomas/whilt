import { supabase } from "../../../../lib/supabase";
import CommentSection from "../../../components/CommentSection";

type Props = {
  params: {
    id: string;
  };
};

export default async function TilPage({ params }: Props) {
  const { id } = params;

  const { data: til, error } = await supabase
    .from("tils")
    .select("*")
    .eq("id", id)
    .single();

  // ✅ Debug logs to show up in Vercel logs
  console.log("🧠 DEBUG Supabase result for ID:", id);
  console.log("Data:", til);
  console.log("Error:", error);

  if (error || !til) {
    return (
      <div className="p-6 text-red-600">
        Error loading TIL: {error?.message || "Not found"}
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
