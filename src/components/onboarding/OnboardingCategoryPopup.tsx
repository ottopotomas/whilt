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
      title="Step 2: Categorise it 🗂️"
      message={`Wow, I didn’t know that! Nice first TIL. Hmmm… to me that sounds like *${suggestedCategory}*. You can change it if you'd like.`}
      step={2}
      totalSteps={6}
    >
      <label className="text-sm text-gray-700 mb-2 block">Choose a category:</label>

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm"
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <button
        onClick={() => onSelectCategory(category)}
        className="mt-5 w-full py-3 rounded-xl font-semibold bg-orange-500 text-white hover:bg-orange-600 transition"
      >
        Continue
      </button>

      <button
        onClick={onSkip}
        className="mt-3 text-sm text-gray-500 underline"
      >
        Skip for now
      </button>
    </CapyPopup>
  );
}
