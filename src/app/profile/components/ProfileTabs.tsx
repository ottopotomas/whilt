"use client";

import { useState } from "react";
import TILTab from "./TILTab";
import RepliesTab from "./RepliesTab";
import KnowledgeBankTab from "./KnowledgeBankTab";
import InventoryTab from "./InventoryTab";

type Props = {
  isPremium: boolean;
  isBasic: boolean;
  userId: string;
};

export default function ProfileTabs({ isPremium, isBasic, userId }: Props) {
  const [activeTab, setActiveTab] = useState<"TILs" | "Replies" | "Knowledge Bank" | "Inventory">("TILs");

  const tabClasses = (tab: string) =>
    `px-4 py-2 rounded-full text-sm font-medium ${
      activeTab === tab
        ? "bg-blue-600 text-white"
        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
    }`;

  return (
    <div className="space-y-6">
      {/* Tabs Navigation */}
      <div className="flex justify-between bg-white p-2 rounded-full shadow-inner max-w-md mx-auto">
        {["TILs", "Replies", "Knowledge Bank", "Inventory"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={tabClasses(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === "TILs" && <TILTab userId={userId} />}
        {activeTab === "Replies" && <RepliesTab userId={userId} />}
        {activeTab === "Knowledge Bank" && (
          <KnowledgeBankTab isPremium={isPremium} isBasic={isBasic} />
        )}
        {activeTab === "Inventory" && <InventoryTab isPremium={isPremium} />}
      </div>
    </div>
  );
}
