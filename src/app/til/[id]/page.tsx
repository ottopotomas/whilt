/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRouter } from "next/router";
import CommentSection from "../../../components/CommentSection";

export default function TilPage({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <div>
      {/* TIL content here */}
      <CommentSection tilId={id} />
    </div>
  );
}