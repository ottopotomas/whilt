// src/components/Achievements/AchievementsTabs.tsx

'use client';

import React from 'react';
import { cn } from '@/utils/utils';

export type Tab = 'all' | 'categories' | 'milestones' | 'community';

const tabList: { id: Tab; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'categories', label: 'Categories' },
  { id: 'milestones', label: 'Milestones' },
  { id: 'community', label: 'Community' },
];

interface Props {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const AchievementsTabs: React.FC<Props> = ({ activeTab, onTabChange }) => {
  return (
    <div className="flex border-b border-border">
      {tabList.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            'flex-1 py-2 text-center text-sm font-medium transition-colors',
            activeTab === tab.id
              ? 'text-primary border-b-2 border-primary'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default AchievementsTabs;
