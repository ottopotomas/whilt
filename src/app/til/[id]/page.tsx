import CommentSection from "../../../components/CommentSection";

// ✅ Add generateStaticParams — avoids weird TS inference bugs
export function generateStaticParams() {
  return []; // placeholder — we're using dynamic rendering
}

export default function Page({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="p-4">
      <CommentSection tilId={params.id} />
    </div>
  );
}
