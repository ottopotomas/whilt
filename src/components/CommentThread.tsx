// src/components/CommentThread.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { Send } from "lucide-react";
import { useComments } from "../../lib/hooks/useComments";

type Comment = {
  id: string;
  til_id: string;
  user_id: string;
  content: string;
  created_at: string;
  user?: {
    username?: string;
    name?: string;
    avatar_url?: string;
  };
};

type Props = {
  tilId: string;
  comments: Comment[];
  currentUser?: string;
  currentUserAvatar?: string;
  onUnauth?: () => void;
};

export default function CommentThread({
  tilId,
  comments,
  currentUser,
  currentUserAvatar,
  onUnauth,
}: Props) {
  const [newComment, setNewComment] = useState("");
  const { postComment, loading } = useComments();

  const handleSubmit = async () => {
    if (!currentUser) {
      onUnauth?.();
      toast.error("🔒 Please sign in to comment.");
      return;
    }

    if (!newComment.trim()) return;

    const { error } = await postComment({
      tilId,
      text: newComment,
      user_id: currentUser,
      avatarUrl: currentUserAvatar,
    });

    if (error) {
      toast.error("Failed to post comment.");
    } else {
      toast.success("Comment posted!");
      setNewComment("");
      window.location.reload(); // temporary until SWR or cache refresh is added
    }
  };

  return (
    <section className="bg-white border border-gray-200 rounded-xl p-4 space-y-4">
      <h3 className="text-sm font-semibold text-gray-800">
        💬 {comments.length} Comment{comments.length !== 1 && "s"}
      </h3>

      {/* Comment List */}
      <div className="space-y-4">
        {comments.map((comment) => {
          const username = comment.user?.username || "anonymous";
          const avatar = comment.user?.avatar_url;

          return (
            <div key={comment.id} className="flex items-start gap-3 text-sm">
              <div className="w-9 h-9 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                {avatar ? (
                  <Image
                    src={avatar}
                    alt={username}
                    width={36}
                    height={36}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-300" />
                )}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2 text-gray-700">
                  <span className="font-medium">@{username}</span>
                  <span className="text-xs text-gray-400">
                    {new Date(comment.created_at).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-800">{comment.content}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Comment Input */}
      <div className="flex items-center border-t border-gray-100 pt-4 gap-3">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          className="flex-1 text-sm px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-200"
          disabled={loading}
        />
        <button
          onClick={handleSubmit}
          className="p-2 text-blue-600 hover:text-blue-800 transition"
          title="Post Comment"
          disabled={loading}
        >
          <Send size={18} />
        </button>
      </div>
    </section>
  );
}
