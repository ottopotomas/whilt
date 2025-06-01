'use client';

import { useState } from "react";
import CapyPopup from "../CapyPopup";

interface OnboardingCategoryPopupProps {
  suggestedCategory: string;
  onSelectCategory: (category: string) => void;
  onSkip: () => void;
}

export default function OnboardingCategoryPopup({
  suggestedCategory,
  onSelectCategory,
  onSkip,
}: OnboardingCategoryPopupProps) {
  const [category, setCategory] = useState(suggestedCategory || "General");

  const categories = [
    "Science",
    "History",
    "Philosophy",
    "Technology",
    "Art",
    "Psychology",
    "Health",
    "Business",
    "Literature",
    "Math",
    "Geography",
    "General",
  ];

  return (
    <CapyPopup
      title="Looks like we’ve got a category!"
      message={`Wow, I didn’t know that! Nice first TIL. Hmmm… to me that sounds like *${suggestedCategory}*. But you can pick something else if you'd prefer.`}
      step={3}
      totalSteps={6}
    >
      {/* Category Selector */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full border border-gray-300 rounded-xl px-4 py-3 mt-4 text-sm"
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      {/* Confirm Selection */}
      <button
        onClick={() => onSelectCategory(category)}
        className="mt-5 w-full py-3 rounded-xl font-semibold bg-orange-500 text-white hover:bg-orange-600 transition"
      >
        Continue
      </button>

      {/* Skip */}
      <button
        onClick={onSkip}
        className="mt-3 text-sm text-gray-500 underline"
      >
        Skip for now
      </button>
    </CapyPopup>
  );
}
