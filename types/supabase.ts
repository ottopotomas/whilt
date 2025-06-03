export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export type Database = {
  public: {
    Tables: {
      comments: {
        Row: {
          id: string;
          til_id: string;
          user_id: string;
          text: string;
          avatar_url: string | null;
          created_at: string;
        };
        Insert: {
          til_id: string;
          user_id: string;
          text: string;
          avatar_url?: string | null;
          // If your DB auto-generates these, omit them
          id?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          til_id?: string;
          user_id?: string;
          text?: string;
          avatar_url?: string | null;
          created_at?: string;
        };
      };
    };
    Views: {};
    Functions: {};
    Enums: {};
  };
};
