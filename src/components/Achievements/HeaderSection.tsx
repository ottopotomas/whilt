'use client';

import React from 'react';
import { cn } from '../../utils/utils'; // if you're using className merge utility
import Image from 'next/image';
import { Button } from "../../components/ui/button";

type Props = {
  username?: string;
  streakCount?: number;
  leftBadge?: { title: string; icon: string };
  rightBadge?: { title: string; icon: string };
  avatarUrl?: string;
};

const HeaderSection = ({
  username = 'Jane Doe',
  streakCount = 14,
  leftBadge = { title: 'MEMORY MASTER', icon: '🏆' },
  rightBadge = { title: 'COMMUNITY HERO!', icon: '💬' },
  avatarUrl = '/default-avatar.png',
}: Props) => {
  return (
    <div className="w-full text-center mb-6">
      {/* Badge Row */}
      <div className="flex items-center justify-between px-4 mb-2">
        <div className="text-sm font-medium flex flex-col items-center text-muted-foreground">
          <span className="text-xl">{leftBadge.icon}</span>
          <span className="text-[0.7rem] mt-1 uppercase">{leftBadge.title}</span>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-full overflow-hidden border border-gray-300 mb-1">
            <Image
              src={avatarUrl}
              alt="User Avatar"
              width={64}
              height={64}
              className="object-cover"
            />
          </div>
          <span className="text-sm font-medium">{username}</span>
          <span className="text-xs text-muted-foreground">
            🔥 {streakCount} day streak
          </span>
        </div>

        <div className="text-sm font-medium flex flex-col items-center text-muted-foreground">
          <span className="text-xl">{rightBadge.icon}</span>
          <span className="text-[0.7rem] mt-1 uppercase">{rightBadge.title}</span>
        </div>
      </div>
    </div>
  );
};

export default HeaderSection;
