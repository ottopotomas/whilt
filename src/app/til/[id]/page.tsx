import CommentSection from "../../../components/CommentSection";

// this is the proper App Router pattern for a route segment like [id]
export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <div className="p-4">
      <CommentSection tilId={id} />
    </div>
  );
}