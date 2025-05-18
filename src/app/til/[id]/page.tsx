import CommentSection from "../../../components/CommentSection";

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
