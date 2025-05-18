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

  // Fetch comments on load
  useEffect(() => {
    async function fetchComments() {
      const { data, error } = await supabase
        .from("comments")
        .select("*")
        .eq("til_id", tilId)
        .order("created_at", { ascending: true });

      if (error) {
        console.error("❗ Error fetching comments:", error);
      } else {
        setComments(data || []);
      }
    }

    fetchComments();
  }, [tilId]);

  // Post new comment
  async function postComment() {
    if (!newComment.trim()) return;
    setLoading(true);

    const { error } = await supabase.from("comments").insert([
      {
        til_id: tilId,
        content: newComment,
      },
    ]);

    if (error) {
      console.error("❗ Error posting comment:", error);
    } else {
      setNewComment("");

      // Refetch comments after posting
      const { data, error: refetchError } = await supabase
        .from("comments")
        .select("*")
        .eq("til_id", tilId)
        .order("created_at", { ascending: true });

      if (refetchError) {
        console.error("❗ Error refetching comments:", refetchError);
      } else {
        setComments(data || []);
      }
    }

    setLoading(false);
  }

  return (
    <div className="mt-6">
      <h4 className="font-semibold mb-2">Comments</h4>
      {comments.length === 0 ? (
        <p className="text-sm text-gray-500">No comments yet.</p>
      ) : (
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
      )}

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
