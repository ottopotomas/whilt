'use client';

import React from 'react';
import { Flame, MessageSquareText, Atom, BarChart3, Lock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const SummaryBasic = () => {
  return (
    <div className="space-y-6 mt-6">
      {/* Top Summary */}
      <div className="text-center">
        <h2 className="text-xl font-semibold">🔥 14-day streak</h2>
        <p className="text-muted-foreground mt-1">You're on fire!</p>
      </div>

      {/* Quick Stats */}
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
          <BarChart3 className="w-4 h-4 text-muted-foreground" />
          <span>Review Accuracy: <span className="font-medium">92%</span></span>
        </div>
      </div>

      {/* Chart Placeholder */}
      <Card>
        <CardContent className="py-6 text-center text-sm text-muted-foreground">
          📊 <span className="font-medium">TILs over past 7 days</span> (chart here soon)
        </CardContent>
      </Card>

      {/* Featured Insight */}
      <Card>
        <CardContent className="py-4 text-sm">
          <div className="font-medium mb-1">🌱 Growth TIL</div>
          <div className="text-muted-foreground">
            “TIL how protein folding works — and why it matters in drug design.”
          </div>
        </CardContent>
      </Card>

      {/* Capy Comment */}
      <Card className="bg-muted">
        <CardContent className="py-4 text-sm text-muted-foreground">
          🧠 <span className="italic">
            Professor Capy says: “You're building strong foundations. Keep up the habit and watch your retention grow.”
          </span>
        </CardContent>
      </Card>

      {/* Locked Section */}
      <div className="bg-muted p-4 rounded-md text-center">
        <Lock className="mx-auto mb-2 w-5 h-5 text-gray-400" />
        <p className="text-sm font-medium mb-1">Want to unlock full insights?</p>
        <p className="text-xs text-muted-foreground mb-3">
          View weekly trends, AI TIL insights, and more.
        </p>
        <Button className="bg-teal-600 hover:bg-teal-700 text-white w-full text-sm">
          Upgrade to Premium
        </Button>
      </div>
    </div>
  );
};

export default SummaryBasic;
