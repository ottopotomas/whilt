'use client';

import CapyPopup from "../CapyPopup";

interface OnboardingBranchPopupProps {
  originalTIL: string;
  suggestedTIL: string;
  onAcceptBranch: (til: string) => void;
  onSkip: () => void;
}

export default function OnboardingBranchPopup({
  originalTIL,
  suggestedTIL,
  onAcceptBranch,
  onSkip,
}: OnboardingBranchPopupProps) {
  return (
    <CapyPopup
      title="Step 4: Add a Related TIL (Create a Cluster) 🌱"
      message="Here’s something I found while rummaging around — it might interest you!"
      step={4}
      totalSteps={6}
    >
      {/* Original TIL */}
      <div className="bg-white border border-gray-200 rounded-xl px-4 py-3 mb-4 shadow-sm text-left text-sm">
        <p className="text-gray-800 font-medium">Your TIL:</p>
        <p className="mt-1 text-gray-600 italic">{originalTIL}</p>
      </div>

      {/* Connector Arrow */}
      <div className="flex items-center justify-center mb-4">
        <span className="text-2xl">⬇️</span>
        <span className="mx-2 text-xl">➡️</span>
      </div>

      {/* Suggested TIL */}
      <div className="bg-orange-50 border-l-4 border-orange-400 pl-4 pr-3 py-3 rounded-xl relative shadow-sm text-left text-sm ml-4">
        <p className="text-gray-800 font-medium mb-1">Suggested Branch:</p>
        <p className="text-gray-600 italic">{suggestedTIL}</p>
        <button
          onClick={() => onAcceptBranch(suggestedTIL)}
          className="absolute top-2 right-2 text-white bg-orange-500 hover:bg-orange-600 rounded-full w-8 h-8 text-xl font-bold"
          aria-label="Add branch"
        >
          +
        </button>
      </div>

      {/* Skip Option */}
      <button
        onClick={onSkip}
        className="mt-6 text-sm text-gray-500 underline w-full text-center"
      >
        Skip for now
      </button>
    </CapyPopup>
  );
}
