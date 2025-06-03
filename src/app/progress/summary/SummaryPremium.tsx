'use client';

import React from 'react';
import { Flame, MessageSquareText, Atom, BookOpenCheck, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const SummaryPremium = () => {
  return (
    <div className="space-y-6 mt-6">
      {/* Header Summary */}
      <div className="text-center">
        <h2 className="text-xl font-semibold">🔥 14-day streak</h2>
        <p className="text-muted-foreground mt-1">Consistent learning = strong memory.</p>
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
          <TrendingUp className="w-4 h-4 text-muted-foreground" />
          <span>Review Accuracy: <span className="font-medium">92%</span> (↑ 4%)</span>
        </div>
      </div>

      {/* Graph Section */}
      <Card>
        <CardContent className="py-6 space-y-2 text-center text-sm text-muted-foreground">
          📈 <span className="font-medium">Review Accuracy Trend</span> (30d)
          <div className="h-[80px] bg-gray-100 rounded mt-2 text-center flex items-center justify-center text-xs text-gray-400">
            [Chart Here Soon]
          </div>
        </CardContent>
      </Card>

      {/* Pie Chart for Categories */}
      <Card>
        <CardContent className="py-6 space-y-2 text-center text-sm text-muted-foreground">
          🧠 <span className="font-medium">Top Categories</span>
          <div className="h-[80px] bg-gray-100 rounded mt-2 flex items-center justify-center text-xs text-gray-400">
            [Pie Chart Placeholder]
          </div>
        </CardContent>
      </Card>

      {/* AI Insights */}
      <Card>
        <CardContent className="space-y-2 py-4 text-sm">
          <div className="font-semibold text-base">📚 This Week’s Insights</div>
          <ul className="text-muted-foreground space-y-1">
            <li>💡 <strong>Most Liked TIL:</strong> “TIL the great wave of 🌊”</li>
            <li>🧠 <strong>Most Learned:</strong> “TIL how to deploy on Vercel”</li>
            <li>🌱 <strong>Growth TIL:</strong> “TIL how protein folding works”</li>
            <li>💥 <strong>Nemesis TIL:</strong> “TIL the capital of Burkina Faso”</li>
            <li>🐉 <strong>Slain Dragon:</strong> “TIL what recursion really is”</li>
          </ul>
        </CardContent>
      </Card>

      {/* Capy Gazette */}
      <Card className="bg-muted">
        <CardContent className="py-4 text-sm text-muted-foreground">
          📰 <strong>Capy Gazette:</strong><br />
          “This week, you’ve shown tremendous depth in Science and Community learning. 
          Your accuracy climbed and you’re building momentum. Keep your neurons dancing!”
        </CardContent>
      </Card>

      {/* CTA + Archive */}
      <div className="flex flex-col items-center space-y-4">
        <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white">
          Test Memory Now
        </Button>
        <p className="text-xs text-muted-foreground">Scroll for past summaries →</p>
      </div>
    </div>
  );
};

export default SummaryPremium;
