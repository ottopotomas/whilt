'use client';

import React, { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import HeaderSection from '@/components/Achievements/HeaderSection';
import Tabs from './Tabs';
import SummaryOverview from './SummaryOverview';
import SummaryFree from './SummaryFree';
import SummaryBasic from './SummaryBasic';
import SummaryPremium from './SummaryPremium';

type Plan = 'free' | 'basic' | 'premium';
type Tab = 'overview' | 'insights' | 'progress' | 'milestones';

export default function SummaryPage() {
  const [userPlan, setUserPlan] = useState<Plan>('free'); // default to free
  const [activeTab, setActiveTab] = useState<Tab>('overview');

  useEffect(() => {
    const fetchUserPlan = async () => {
      const supabase = createClientComponentClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      // Optional: adjust depending on where your plan is stored
      const plan = user?.user_metadata?.plan as Plan | undefined;

      if (plan === 'basic' || plan === 'premium') {
        setUserPlan(plan);
      }
    };

    fetchUserPlan();
  }, []);

  const renderContent = () => {
    if (activeTab !== 'overview') {
      return (
        <div className="p-4 text-center text-muted-foreground">
          Coming soon.
        </div>
      );
    }

    switch (userPlan) {
      case 'basic':
        return <SummaryBasic />;
      case 'premium':
        return <SummaryPremium />;
      default:
        return <SummaryFree />;
    }
  };

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <HeaderSection />
      <Tabs activeTab={activeTab} onTabChange={setActiveTab} />
      {renderContent()}
    </main>
  );
}
