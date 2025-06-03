'use client';

import React from 'react';
import { Flame, MessageSquareText, Atom, HeartHandshake } from 'lucide-react';

const SummaryOverview = () => {
  return (
    <div className="space-y-6 mt-6 text-sm">
      {/* Streak Info */}
      <div className="text-center">
        <h2 className="text-xl font-semibold">🔥 14-day streak</h2>
        <p className="text-muted-foreground mt-1">Keep it going!</p>
      </div>

      {/* Weekly Stats */}
      <div className="flex flex-col gap-3 text-sm">
        <div className="flex items-center gap-2">
          <MessageSquareText className="w-4 h-4 text-muted-foreground" />
          <span>7 TILs logged this week</span>
        </div>

        <div className="flex items-center gap-2">
          <Atom className="w-4 h-4 text-muted-foreground" />
          <span>Top Category: Science</span>
        </div>

        <div className="flex items-center gap-2">
          <HeartHandshake className="w-4 h-4 text-muted-foreground" />
          <span>You helped 25 people learn this week</span>
        </div>
      </div>

      {/* Premium Teaser */}
      <div className="bg-muted p-4 rounded-md text-center mt-6">
        <p className="text-sm font-medium mb-1">
          Want to track your learning growth?
        </p>
        <p className="text-xs text-muted-foreground mb-3">
          Upgrade to see accuracy trends, insights, and progress over time.
        </p>
        <button className="bg-teal-600 text-white text-sm px-4 py-2 rounded-md font-medium">
          Upgrade
        </button>
      </div>
    </div>
  );
};

export default SummaryOverview;
