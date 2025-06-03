'use client';

import React from 'react';
import { CATEGORY_PROGRESSIONS } from '../../../utils/categoryProgressions';
import { capitalize } from '../../../utils/utils';

type CategoryProgress = {
  categoryId: string;
  currentTILs: number;
};

const userCategoryProgress: CategoryProgress[] = [
  { categoryId: 'science', currentTILs: 34 },
  { categoryId: 'mindset', currentTILs: 12 },
  { categoryId: 'history', currentTILs: 3 },
  // Add more for demo
];

const getLevelInfo = (categoryId: string, currentTILs: number) => {
  const levels = CATEGORY_PROGRESSIONS[categoryId] || [];
  let currentLevel = levels[0];
  let nextLevel = levels[1];

  for (let i = 0; i < levels.length; i++) {
    if (currentTILs >= levels[i].requiredTILs) {
      currentLevel = levels[i];
      nextLevel = levels[i + 1];
    } else {
      break;
    }
  }

  return {
    levelTitle: currentLevel?.title,
    progressToNext: nextLevel
      ? `${currentTILs}/${nextLevel.requiredTILs}`
      : 'Maxed Out',
    percent: nextLevel
      ? Math.min((currentTILs / nextLevel.requiredTILs) * 100, 100)
      : 100,
  };
};

const CategoryProgressTab = () => {
  return (
    <div className="mt-4 space-y-4">
      {userCategoryProgress.map((cat) => {
        const { levelTitle, progressToNext, percent } = getLevelInfo(cat.categoryId, cat.currentTILs);
        return (
          <div
            key={cat.categoryId}
            className="bg-muted rounded-xl p-4 shadow-sm border border-border"
          >
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium">{capitalize(cat.categoryId)}</span>
              <span className="text-xs text-muted-foreground">{levelTitle}</span>
            </div>
            <div className="w-full h-2 bg-border rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all rounded-full"
                style={{ width: `${percent}%` }}
              />
            </div>
            <div className="text-xs text-muted-foreground text-right mt-1">
              {progressToNext}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CategoryProgressTab;
