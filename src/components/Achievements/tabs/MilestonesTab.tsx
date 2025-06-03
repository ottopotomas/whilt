'use client';

import React from 'react';
import { Badge } from '../../../../types/achievements';

const badges: Badge[] = [
  {
    id: '1',
    title: 'Memory Master',
    icon: '🧠',
    description: 'Passed 25 Full Recall tests',
    unlocked: true,
  },
  {
    id: '2',
    title: 'Super Commenter',
    icon: '💬',
    description: 'Left 10 insightful comments',
    unlocked: true,
  },
  {
    id: '3',
    title: 'Streak Champion',
    icon: '🔥',
    description: 'Maintained a 14-day streak',
    unlocked: false,
    progress: 10,
  },
  {
    id: '4',
    title: 'Curious Mind',
    icon: '🌱',
    description: 'Logged your first 10 TILs',
    unlocked: true,
  },
];

const MilestonesTab = () => {
  return (
    <div className="mt-4 space-y-4">
      {badges.map((badge) => (
        <div
          key={badge.id}
          className={`flex items-start gap-3 p-4 rounded-xl shadow-sm border ${
            badge.unlocked ? 'bg-muted' : 'bg-background opacity-60 border-dashed'
          }`}
        >
          <div className="text-2xl">{badge.icon}</div>
          <div className="flex-1">
            <div className="text-sm font-medium">{badge.title}</div>
            <div className="text-xs text-muted-foreground">{badge.description}</div>
            {!badge.unlocked && badge.progress !== undefined && (
              <div className="text-xs mt-1 text-foreground">
                Progress: {badge.progress}%
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MilestonesTab;
