// src/components/Inventory/InventoryItem.tsx

import React from "react";
import { cn } from "@/lib/utils";
import type { Item, Rarity } from "@/lib/types";

const rarityColors: Record<Rarity, string> = {
  basic: "bg-white",
  special: "bg-green-100",
  rare: "bg-yellow-50",
  legendary: "bg-purple-100",
};

type Props = {
  item: Item;
};

export default function InventoryItem({ item }: Props) {
  return (
    <div
      className={cn(
        "rounded-md p-4 text-sm shadow-sm border",
        rarityColors[item.rarity]
      )}
    >
      <div className="text-2xl mb-2">{item.icon}</div>
      <div className="font-medium">{item.name}</div>
      {item.tag && <div className="text-xs text-muted-foreground">{item.tag}</div>}
      {item.meta && (
        <div className="text-xs mt-1 text-muted-foreground">{item.meta}</div>
      )}
    </div>
  );
}
