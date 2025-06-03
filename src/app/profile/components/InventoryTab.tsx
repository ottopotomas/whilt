"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { supabase } from '@/lib/supabaseClient';
import type { InventoryItem } from "../../../../types/inventory";

type Props = {
  isPremium: boolean;
  isBasic: boolean;
};

export default function InventoryTab({ isPremium, isBasic }: Props) {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadInventory = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("capy_inventory")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (!error && data) {
        setItems(data);
      }

      setLoading(false);
    };

    loadInventory();
  }, []);

  if (loading) return <p className="p-4">Loading inventory...</p>;
  if (!items.length)
    return (
      <div className="p-4 text-gray-500">
        No Capy Explorer items yet. Keep learning to unlock rare rewards!
      </div>
    );

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {items.map((item, index) => {
        const isFree = !isPremium && !isBasic;
        const isLocked =
          isFree ||
          (isBasic && !isPremium && index > 2); // Basic gets first 3 unlocked

        return (
          <div
            key={item.id}
            className={`relative border p-3 rounded-xl bg-white ${
              isLocked
                ? "opacity-50 blur-[1px] pointer-events-none"
                : "hover:shadow-md transition"
            }`}
          >
            <div className="text-lg font-bold">{item.emoji}</div>
            <h3 className="text-sm font-semibold mt-1">{item.name}</h3>

            {!isLocked && (
              <>
                <p className="text-xs text-gray-500 mt-1">
                  {item.description}
                </p>
                <p className="text-[10px] text-gray-400 mt-1">
                  Linked to:{" "}
                  <a
                    href={`/til/${item.linked_til_id}`}
                    className="underline text-blue-600"
                  >
                    TIL
                  </a>
                </p>
              </>
            )}

            {isLocked && (
              <div className="absolute top-1 right-1 text-[10px] text-yellow-600 font-semibold">
                🔒 Premium
              </div>
            )}

            <div className="absolute bottom-1 right-2 text-[10px] text-gray-400 italic">
              {item.rarity.charAt(0).toUpperCase() + item.rarity.slice(1)} Item
            </div>
          </div>
        );
      })}
    </div>
  );
}
