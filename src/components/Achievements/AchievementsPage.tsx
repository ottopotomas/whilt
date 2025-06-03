// src/app/progress/achievements/page.tsx

'use client';

import React, { useState, useEffect } from 'react';
import AchievementsTabs, { Tab } from '@/components/Achievements/AchievementsTabs';
import AchievementsAll from '@/components/Achievements/AchievementsAll';
import AchievementsCategories from '@/components/Achievements/AchievementsCategories';
import AchievementsMilestones from '@/components/Achievements/AchievementsMilestones';
import AchievementsCommunity from '@/components/Achievements/AchievementsCommunity';
import { Loader } from 'lucide-react';

const AchievementsPage = () => {
  const [activeTab, setActiveTab] = useState<Tab>('all');
  const [isLoading, setIsLoading] = useState(true);

  // Simulated loading delay
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const renderTabContent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center py-16 text-muted-foreground">
          <Loader className="w-5 h-5 mr-2 animate-spin" />
          Loading achievements...
        </div>
      );
    }

    switch (activeTab) {
      case 'all':
        return <AchievementsAll />;
      case 'categories':
        return <AchievementsCategories />;
      case 'milestones':
        return <AchievementsMilestones />;
      case 'community':
        return <AchievementsCommunity />;
      default:
        return null;
    }
  };

  return (
    <main className="max-w-2xl mx-auto px-4 pt-6">
      <h1 className="text-xl font-semibold mb-4">🎖️ Your Achievements</h1>
      <AchievementsTabs activeTab={activeTab} onTabChange={setActiveTab} />
      {renderTabContent()}
    </main>
  );
};

export default AchievementsPage;
