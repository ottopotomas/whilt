// --- TIL & Comment types ---
export type TIL = {
  id: string;
  content: string;
  category: string;

  // Optional core metadata
  user_id?: string;
  created_at?: string;
  is_draft?: boolean;

  // Optional source info
  source?: string;
  sourceUrl?: string;
  sources?: { title?: string; url: string }[];

  // Optional media
  imageUrl?: string;

  // Social/engagement metadata
  addedByCount?: number;

  // Optional user information (string = username or full user object)
  user?: 
    | string 
    | {
        username?: string;
        name?: string;
        avatar_url?: string;
      };
};

export type Comment = {
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

// --- Inventory Types ---
export type Rarity = 'basic' | 'special' | 'rare' | 'legendary';

export type Item = {
  name: string;
  tag: string;
  meta: string;
  rarity: Rarity;
  icon: string;
};
