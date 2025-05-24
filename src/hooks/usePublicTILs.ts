// src/hooks/usePublicTILs.ts
import { useState, useEffect } from "react";

type TIL = {
  id: string;
  user: string;
  content: string;
  category: string;
};

export function usePublicTILs() {
  const [data, setData] = useState<TIL[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setData([
        {
          id: "1",
          user: "James Smith",
          content: "TIL horses can sleep both lying down and standing up.",
          category: "biology",
        },
      ]);
      setIsLoading(false);
    }, 500);
  }, []);

  return { data, isLoading };
}
