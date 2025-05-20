export type TIL = {
  id: string;
  user_id: string;
  content: string;
  category: string;
  created_at: string;
  source?: string;
  is_draft: boolean;
};

export type Comment = {
  id: string;
  til_id: string;
  user_id: string;
  content: string;
  created_at: string;
};
