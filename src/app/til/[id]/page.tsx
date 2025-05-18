"use client";

import CommentSection from "../../../components/CommentSection";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Page(props: any) {
  const tilId = props?.params?.id;

  return (
    <div className="p-4">
      <CommentSection tilId={tilId} />
    </div>
  );
}
