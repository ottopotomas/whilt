'use client';

import React, { useState } from 'react';
import AchievementsTabs from ../components/Achievements/AchievementsTabs';
import AchievementsAll from '@/components/Achievements/AchievementsAll';
import AchievementsCategories from '@/components/Achievements/AchievementsCategories';
import AchievementsMilestones from '@/components/Achievements/AchievementsMilestones';
import AchievementsCommunity from '@/components/Achievements/AchievementsCommunity';

type Tab = 'all' | 'categories' | 'milestones' | 'community';

export default function AchievementsPage() {
  const [activeTab, setActiveTab] = useState<Tab>('all');

  const renderTab = () => {
    switch (activeTab) {
      case 'categories':
        return <AchievementsCategories />;
      case 'milestones':
        return <AchievementsMilestones />;
      case 'community':
        return <AchievementsCommunity />;
      default:
        return <AchievementsAll />;
    }
  };

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Your Achievements</h1>
      <AchievementsTabs activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="mt-6">{renderTab()}</div>
    </main>
  );
}
