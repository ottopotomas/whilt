'use client';

import React from 'react';
import type { Item, Rarity } from "@/lib/types";
import InventoryItem from '@/components/Inventory/InventoryItem';

const mockItems: Item[] = [
  {
    name: 'Old Scroll',
    tag: '#chess',
    meta: '📅 Monthly Drop',
    rarity: 'basic' as Rarity,
    icon: '🧾',
  },
  {
    name: 'Rough Amber',
    tag: '',
    meta: '⭐ 1 • Super Rare',
    rarity: 'rare' as Rarity, // mapped correctly to existing Rarity
    icon: '🟧',
  },
  {
    name: 'Ancient Pyramid',
    tag: '',
    meta: '5 TILs • Dropped Apr 2024',
    rarity: 'legendary' as Rarity,
    icon: '🏛️',
  },
  {
    name: 'Hourglass',
    tag: '#localhistory',
    meta: '⭐ Rare',
    rarity: 'rare' as Rarity,
    icon: '⌛',
  },
  {
    name: 'Framed Pictograph',
    tag: '',
    meta: '3 TILs',
    rarity: 'basic' as Rarity,
    icon: '🖼️',
  },
  {
    name: 'Dinosaur Claw',
    tag: '#paleontology',
    meta: '',
    rarity: 'rare' as Rarity,
    icon: '🦴',
  },
];

export default function InventoryPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <div className="text-center mb-6">
        <div className="text-4xl mb-2">🧭</div>
        <h1 className="text-2xl font-semibold">Explorer Inventory</h1>
        <p className="text-sm text-muted-foreground">
          Rare items discovered through learning.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {mockItems.map((item, idx) => (
          <InventoryItem key={idx} item={item} />
        ))}
      </div>
    </main>
  );
}
