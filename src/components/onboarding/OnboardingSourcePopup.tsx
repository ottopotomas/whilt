'use client';

import { useState } from "react";
import CapyPopup from "../CapyPopup";

interface OnboardingSourcePopupProps {
  suggestedSource: {
    url: string;
    summary: string;
  };
  onSelectSource: (url: string) => void;
  onSkip: () => void;
}

export default function OnboardingSourcePopup({
  suggestedSource,
  onSelectSource,
  onSkip,
}: OnboardingSourcePopupProps) {
  const [sourceUrl, setSourceUrl] = useState(suggestedSource.url);

  return (
    <CapyPopup
      title="Step 3: Add a Source 🔗"
      message="Want to back that up? I found something that supports your TIL — you can use mine or paste your own."
      step={3}
      totalSteps={6}
    >
      {/* AI Summary Preview */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-left text-sm text-gray-700">
        <p className="font-semibold mb-1">💡 Suggested Insight:</p>
        <p className="text-gray-600 italic">{suggestedSource.summary}</p>
      </div>

      {/* Editable Source Field */}
      <input
        type="url"
        value={sourceUrl}
        onChange={(e) => setSourceUrl(e.target.value)}
        placeholder="https://example.com"
        className="mt-4 w-full border border-gray-300 rounded-xl px-4 py-3 text-sm"
      />

      {/* Continue */}
      <button
        onClick={() => onSelectSource(sourceUrl)}
        className="mt-5 w-full py-3 rounded-xl font-semibold bg-orange-500 text-white hover:bg-orange-600 transition"
      >
        Continue
      </button>

      {/* Skip Option */}
      <button
        onClick={onSkip}
        className="mt-3 text-sm text-gray-500 underline"
      >
        Skip for now
      </button>
    </CapyPopup>
  );
}
