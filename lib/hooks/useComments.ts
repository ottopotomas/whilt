import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import type { Database } from "../../types/supabase"; // relative path to your types

type CommentInput = {
  tilId: string;
  text: string;
  user_id: string;
  avatarUrl?: string;
};

export function useComments() {
  const supabase = createClientComponentClient<Database>();
  const [loading, setLoading] = useState(false);

  async function postComment({ tilId, text, user_id, avatarUrl }: CommentInput) {
    setLoading(true);

    const { error } = await supabase.from("comments").insert([
      {
        til_id: tilId,
        text,
        user_id,
        avatar_url: avatarUrl || null,
      },
    ]);

    setLoading(false);
    return { error };
  }

  return { postComment, loading };
}
