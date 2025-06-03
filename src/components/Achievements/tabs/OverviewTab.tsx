'use client';

import React from 'react';
import { Badge } from '../../../../types/achievements';

type Props = {
  recentBadges?: Badge[];
  trendingBadge?: Badge;
  recentLevelUps?: { category: string; levelTitle: string }[];
};

const OverviewTab = ({
  recentBadges = [
    { id: '1', title: 'Super Commenter', icon: '💬', description: '', unlocked: true },
    { id: '2', title: 'Memory Master', icon: '🧠', description: '', unlocked: true },
  ],
  trendingBadge = {
    id: '3',
    title: 'Streak Champion',
    icon: '🔥',
    description: '',
    unlocked: false,
    progress: 24,
  },
  recentLevelUps = [
    { category: 'Science', levelTitle: 'Board Certified Scientist' },
    { category: 'Mindset', levelTitle: 'Thoughtful Thinker' },
  ],
}: Props) => {
  return (
    <div className="space-y-6 mt-4">
      {/* 🎖️ Recent Badges */}
      <div>
        <h3 className="text-sm font-medium mb-2 text-muted-foreground">Recent Achievements</h3>
        <div className="flex gap-3">
          {recentBadges.map((badge) => (
            <div
              key={badge.id}
              className="bg-muted rounded-xl px-3 py-2 flex flex-col items-center shadow-sm"
            >
              <div className="text-2xl">{badge.icon}</div>
              <div className="text-[0.65rem] mt-1 uppercase font-semibold text-center leading-tight">
                {badge.title}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 🔁 Trending In Progress */}
      <div>
        <h3 className="text-sm font-medium mb-2 text-muted-foreground">Trending Progress</h3>
        <div className="bg-muted rounded-xl p-3 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-medium">
              <span className="text-lg">{trendingBadge.icon}</span>
              {trendingBadge.title}
            </div>
            <span className="text-xs text-muted-foreground">
              {trendingBadge.progress}/25
            </span>
          </div>
          <div className="mt-2 w-full h-2 bg-border rounded-full">
            <div
              className="h-full bg-primary rounded-full transition-all"
              style={{ width: `${(trendingBadge.progress ?? 0) / 25 * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* 📈 Recent Level-Ups */}
      <div>
        <h3 className="text-sm font-medium mb-2 text-muted-foreground">Recent Level Ups</h3>
        <ul className="space-y-2">
          {recentLevelUps.map((level, i) => (
            <li
              key={i}
              className="bg-muted rounded-lg p-3 text-sm shadow-sm flex justify-between items-center"
            >
              <span>{level.category}</span>
              <span className="text-xs text-muted-foreground">{level.levelTitle}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OverviewTab;
