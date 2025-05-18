"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

interface Comment {
  id: string;
  content: string;
  created_at: string;
  user_id: string | null;
}

function CommentSection({ tilId }: { tilId: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);

  async function fetchComments() {
  console.log("🧠 Fetching comments for:", tilId);

  const { data: allComments, error: fetchError } = await supabase
    .from("comments")
    .select("*")
    .order("created_at", { ascending: true });

  console.log("🗃️ All comments in DB:", allComments);

  const filtered = allComments?.filter((c) => c.til_id === tilId);

  console.log("💬 Filtered comments for TIL ID:", filtered);

  if (!fetchError) setComments(filtered || []);
}

  async function postComment() {
    if (!newComment.trim()) return;
    setLoading(true);

    const newEntry = {
      til_id: tilId,
      content: newComment,
    };

    console.log("🧠 Posting comment:", newEntry);

    const { error: insertError } = await supabase
      .from("comments")
      .insert([newEntry]);

    if (insertError) {
      console.error("🚫 Insert error:", insertError);
    } else {
      setNewComment("");

      const { data, error: fetchError } = await supabase
        .from("comments")
        .select("*")
        .eq("til_id", tilId)
        .order("created_at", { ascending: true });

      console.log("🔄 Refetched comments:", data);
      console.log("❗ Refetch error:", fetchError);
      if (!fetchError) setComments(data || []);
    }

    setLoading(false);
  }

  return (
    <div className="mt-4">
      <h4 className="font-semibold mb-2">Comments</h4>
      {comments.length === 0 && (
        <p className="text-sm text-gray-500">No comments yet.</p>
      )}
      <ul className="space-y-2">
        {comments.map((comment) => (
          <li key={comment.id} className="border p-2 rounded bg-gray-50">
            <p className="text-sm">{comment.content}</p>
            <span className="text-xs text-gray-400">
              {new Date(comment.created_at).toLocaleString()}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex gap-2">
        <input
          type="text"
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="flex-1 border rounded px-3 py-2"
        />
        <button
          onClick={postComment}
          disabled={loading}
          className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
        >
          {loading ? "Posting..." : "Post"}
        </button>
      </div>
    </div>
  );
}

export default CommentSection;