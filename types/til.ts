export {}; // makes it an ES module, safe to remove later
export type TIL = {
  id: string;
  user: string;
  content: string;
  category: string;
  imageUrl?: string;
  sourceUrl?: string;
  avatarUrl?: string;
  addedByCount?: number;
  created_at: string;
};
