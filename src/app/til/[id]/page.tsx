import { supabase } from "../../../../lib/supabase";
import CommentSection from "../../../components/CommentSection";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function TilPage({ params }: PageProps) {
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

  const til = data;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">{til.question}</h1>
      <p className="mt-2 text-gray-700">{til.answer}</p>
      <p className="mt-1 text-sm text-gray-500">Category: {til.category}</p>

      <CommentSection tilId={til.id} />
    </div>
  );
}
