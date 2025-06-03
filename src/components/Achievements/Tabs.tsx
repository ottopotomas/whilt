import React from 'react';
import { cn } from '../../utils/utils';

type Props = {
  activeTab: 'summary' | 'achievements' | 'inventory';
  onTabChange: (tab: 'summary' | 'achievements' | 'inventory') => void;
};

const tabLabels: { id: Props['activeTab']; label: string }[] = [
  { id: 'summary', label: 'Summary' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'inventory', label: 'Inventory' },
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
