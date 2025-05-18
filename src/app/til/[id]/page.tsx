"use client"; // ⬅️ Forces Client Component, avoids TS bug

import CommentSection from "../../../components/CommentSection";

export default function Page(props: any) {
  const tilId = props?.params?.id;

  return (
    <div className="p-4">
      <CommentSection tilId={tilId} />
    </div>
  );
}
