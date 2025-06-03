'use client';

import React from 'react';

type Insight = {
  id: string;
  label: string;
  icon: string;
  til: string;
  stat?: string;
  status?: 'success' | 'in-progress' | 'struggled';
};

const insights: Insight[] = [
  {
    id: 'liked',
    label: 'Most Liked TIL',
    icon: '❤️',
    til: 'The mitochondria is the powerhouse of the cell.',
    stat: '84 likes',
  },
  {
    id: 'learned',
    label: 'Most Learned TIL',
    icon: '🌍',
    til: 'The Moon has moonquakes.',
    stat: '37 users adopted this',
  },
  {
    id: 'growth',
    label: 'Growth TIL',
    icon: '📈',
    til: 'TIL about osmosis — this pushed me to Level 2: Graduate Scientist.',
    stat: 'Science Level 2 unlocked',
    status: 'success',
  },
  {
    id: 'nemesis',
    label: 'Nemesis TIL',
    icon: '🧩',
    til: 'TIL: The capital of Burkina Faso is Ouagadougou.',
    stat: 'Failed 3 times',
    status: 'struggled',
  },
  {
    id: 'slain',
    label: 'Slain Dragon TIL',
    icon: '🐉',
    til: 'TIL: The capital of Burkina Faso is Ouagadougou.',
    stat: 'Passed after 3 attempts',
    status: 'success',
  },
];

const InsightsTab = () => {
  return (
    <div className="mt-4 space-y-4">
      {insights.map((insight) => (
        <div
          key={insight.id}
          className="bg-muted rounded-xl p-4 shadow-sm space-y-2 border border-border"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-medium text-sm">
              <span className="text-lg">{insight.icon}</span>
              {insight.label}
            </div>
            {insight.stat && (
              <span className="text-xs text-muted-foreground">{insight.stat}</span>
            )}
          </div>
          <p className="text-sm text-foreground leading-tight">{insight.til}</p>
        </div>
      ))}
    </div>
  );
};

export default InsightsTab;
