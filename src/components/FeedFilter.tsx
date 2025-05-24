// src/components/FeedFilter.tsx
import React from "react";

const filters = ["Trending", "Latest", "Following"];

type Props = {
  active?: string;
  setActive?: (val: string) => void;
};

export default function FeedFilter({ active = "Trending", setActive = () => {} }: Props) {
  return (
    <div className="flex gap-3 px-4 pt-4 pb-2 overflow-x-auto border-b border-gray-200">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => setActive(filter)}
          className={`text-sm font-medium px-3 py-1 rounded-full transition-all duration-200
            ${
              active === filter
                ? "bg-[#1F1F1F] text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }
          `}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}
