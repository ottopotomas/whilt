/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRouter } from "next/router";
import CommentSection from "../../../components/CommentSection";

export default function TilPage() {
  const router = useRouter();
  const { id } = router.query;

  if (!id || typeof id !== "string") return null; // 👈 Or show loading state

  return (
    <div>
      {/* Other TIL content */}
      <CommentSection tilId={id} />
    </div>
  );
}
