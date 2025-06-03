// /src/types/achievements.d.ts

export type TILStats = {
  logged: number;
  mastered: number;
  collected: number;
  adoptedByOthers: number;
};

export type Badge = {
  id: string;
  title: string;
  icon: string; // emoji or icon class
  description: string;
  unlocked: boolean;
  progress?: number;
  category?: 'learning' | 'streaks' | 'community' | 'premium';
};

export type CategoryLevel = {
  level: number;
  title: string;
  requiredTILs: number;
};

export type CategoryProgress = {
  categoryId: string;
  currentTILs: number;
};
