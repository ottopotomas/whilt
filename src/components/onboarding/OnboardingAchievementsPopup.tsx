'use client';

import CapyPopup from "../CapyPopup";

interface OnboardingAchievementsPopupProps {
  onComplete: () => void;
  onSkip: () => void;
}

export default function OnboardingAchievementsPopup({
  onComplete,
  onSkip,
}: OnboardingAchievementsPopupProps) {
  return (
    <CapyPopup
      title="Step 5: Testing & Achievements! 🧠"
      message=""
      step={5}
      totalSteps={6}
    >
      {/* Capy message box */}
      <div className="bg-[#E6F7F5] border border-[#C9EAE5] rounded-xl px-4 py-3 text-sm text-gray-800 mb-4">
        <p>
          Make sure you check back in 12–24 hours for your first test on what you’ve just learned!
          <br />
          <span className="italic text-gray-600">(Don’t worry — the first one is always easy!)</span>
        </p>
      </div>

      {/* Achievement List */}
      <div className="text-left text-sm text-gray-700 mb-6">
        <p className="font-semibold mb-2">🏆 Unlock achievements like:</p>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>First 10 TILs Logged</strong></li>
          <li>🔥 3-Day Learning Streak</li>
          <li>🌱 Knowledge Cluster Created</li>
          <li>💬 Helpful Commenter</li>
        </ul>
      </div>

      {/* Done button */}
      <button
        onClick={onComplete}
        className="w-full py-3 rounded-xl font-semibold bg-orange-500 text-white hover:bg-orange-600 transition"
      >
        Done
      </button>

      {/* Skip Option */}
      <button
        onClick={onSkip}
        className="mt-3 text-sm text-gray-500 underline w-full text-center"
      >
        Skip for now
      </button>
    </CapyPopup>
  );
}
