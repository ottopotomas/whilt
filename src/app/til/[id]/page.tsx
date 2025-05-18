/* eslint-disable @typescript-eslint/no-explicit-any */
import CommentSection from "../../../components/CommentSection";

export default async function TilPage({ params }: any) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/get-til-by-id?id=${params.id}`,
    { cache: "no-store" }
  );
  const { data: til } = await res.json();

  if (!til) {
    return <div className="p-6 text-red-600">Error loading TIL</div>;
  }

  console.log("🔍 TIL Object:", til); // Keep this for now

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">{til.question}</h1>
      <p className="mt-2 text-gray-700">{til.answer}</p>
      <p className="mt-1 text-sm text-gray-500">Category: {til.category}</p>

      <CommentSection tilId={til.id} />
    </div>
  );
}
