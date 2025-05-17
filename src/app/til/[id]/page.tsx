import { supabase } from "../../../../lib/supabase";
import CommentSection from "../../../components/CommentSection";

export default async function TilDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;

  const { data, error } = await supabase
    .from("tils")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error || !data) {
    return (
      <div className="p-4">
        <p>⚠️ No TIL found for this ID, or an error occurred.</p>
        <pre className="mt-4 text-sm text-red-600">
          ID: {id}
          {"\n"}
          Error: {JSON.stringify(error, null, 2)}
          {"\n"}
          Data: {JSON.stringify(data, null, 2)}
        </pre>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">{data.question}</h1>
      <p className="mt-2 text-gray-700">{data.answer}</p>
      <p className="mt-1 text-sm text-gray-500">Category: {data.category}</p>

      <CommentSection tilId={data.id} />
    </div>
  );
}
