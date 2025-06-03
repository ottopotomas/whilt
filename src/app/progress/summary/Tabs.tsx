'use client';

import React from 'react';
import { cn } from '../../../utils/utils'; // adjust path if your utils are elsewhere

type Props = {
  activeTab: 'overview' | 'insights' | 'progress' | 'milestones';
  onTabChange: (tab: Props['activeTab']) => void;
};

const tabLabels: { id: Props['activeTab']; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'insights', label: 'Insights' },
  { id: 'progress', label: 'Category Progress' },
  { id: 'milestones', label: 'Milestones' },
];

const Tabs = ({ activeTab, onTabChange }: Props) => {
  return (
    <div className="mt-6 flex justify-between items-center border-b border-border">
      {tabLabels.map((tab) => (
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

export default Tabs;
