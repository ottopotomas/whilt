import CommentSection from "../../../components/CommentSection";

export default function TilPage({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <div className="p-4">
      {/* Your TIL content here */}
      <CommentSection tilId={id} />
    </div>
  );
}