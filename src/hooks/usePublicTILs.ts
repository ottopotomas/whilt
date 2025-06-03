// src/hooks/usePublicTILs.ts
import { useState, useEffect } from "react";
import { TIL } from "@/lib/types"; // Adjust path if needed

export function usePublicTILs() {
  const [data, setData] = useState<TIL[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setData([
        {
          id: "1",
          content: "TIL horses can sleep both lying down and standing up.",
          category: "biology",
          user_id: "abc123",
          created_at: "2025-06-02T12:00:00Z",
          is_draft: false,
          user: {
            username: "jamessmith",
            name: "James Smith",
            avatar_url: "",
          },
        },
      ]);
      setIsLoading(false);
    }, 500);
  }, []);

  return { data, isLoading };
}
