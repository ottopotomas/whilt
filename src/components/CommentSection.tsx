"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";

interface Comment {
  id: string;
  content: string;
  created_at: string;
  user_id: string | null;
  user?: string | {
    username?: string;
    avatar_url?: string;
  };
}

interface CommentSectionProps {
  tilId: string;
}

export default function CommentSection({ tilId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!tilId) {
      console.warn("⛔ Missing tilId in CommentSection.");
      return;
    }

    async function fetchComments() {
      const { data, error } = await supabase
        .from("comments")
        .select(`
          *,
          user:profiles (
            username,
            avatar_url
          )
        `)
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
      console.error("🚫 Failed to post comment:", error);
    } else {
      setNewComment("");

      // Refetch comments
      const { data, error: refetchError } = await supabase
        .from("comments")
        .select(`
          *,
          user:profiles (
            username,
            avatar_url
          )
        `)
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
    <div className="mt-4">
      <h4 className="font-semibold mb-2">Comments</h4>
      {comments.length === 0 ? (
        <p className="text-sm text-gray-500">No comments yet.</p>
      ) : (
        <ul className="space-y-3">
          {comments.map((comment) => {
            const username =
              typeof comment.user === "object" ? comment.user?.username ?? "anonymous" : "anonymous";
            const avatarUrl =
              typeof comment.user === "object" ? comment.user?.avatar_url : undefined;

            return (
              <li key={comment.id} className="flex gap-3 items-start border p-3 rounded bg-gray-50">
                <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-200 shrink-0">
                  {avatarUrl ? (
                    <Image
                      src={avatarUrl}
                      alt={username}
                      width={36}
                      height={36}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-300 rounded-full" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">@{username}</p>
                  <p className="text-sm text-gray-700">{comment.content}</p>
                  <span className="text-xs text-gray-400">
                    {new Date(comment.created_at).toLocaleString()}
                  </span>
                </div>
              </li>
            );
          })}
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
