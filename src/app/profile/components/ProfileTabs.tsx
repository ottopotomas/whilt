"use client";

import { useState } from "react";
import type { TIL } from "../../../lib/types";

import TILTab from "./TILTab";
import RepliesTab from "./RepliesTab";
import KnowledgeBankTab from "./KnowledgeBankTab";
import InventoryTab from "./InventoryTab";

type TabOption = "tils" | "replies" | "knowledge" | "inventory";

interface ProfileTabsProps {
  isPremium: boolean;
  isBasic: boolean;
  userId: string;
  tils: TIL[];
}

export default function ProfileTabs({
  isPremium,
  isBasic,
  userId,
  tils,
}: ProfileTabsProps) {
  const [activeTab, setActiveTab] = useState<TabOption>("tils");

  const tabLabels: { key: TabOption; label: string }[] = [
    { key: "tils", label: "Your TILs" },
    { key: "replies", label: "Replies" },
    { key: "knowledge", label: "Knowledge Bank" },
    { key: "inventory", label: "Inventory" },
  ];

  const tabClasses = (tab: TabOption) =>
    `px-4 py-2 rounded-full text-sm font-medium transition ${
      activeTab === tab
        ? "bg-blue-600 text-white"
        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
    }`;

  return (
    <div className="space-y-6">
      {/* Tabs Navigation */}
      <div className="flex justify-between bg-white p-2 rounded-full shadow-inner max-w-md mx-auto">
        {tabLabels.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={tabClasses(key)}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === "tils" && <TILTab userId={userId} />}
        {activeTab === "replies" && <RepliesTab userId={userId} />}
        {activeTab === "knowledge" && (
          <KnowledgeBankTab isPremium={isPremium} isBasic={isBasic} />
        )}
        {activeTab === "inventory" && (
          <InventoryTab isPremium={isPremium} isBasic={isBasic} />
        )}
      </div>
    </div>
  );
}
