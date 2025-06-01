'use client';

import CapyPopup from '../CapyPopup';

export default function OnboardingIntroPopup({
  onNext,
  onSkip,
}: {
  onNext: () => void;
  onSkip: () => void;
}) {
  return (
    <CapyPopup
      title="Welcome to WHILT!"
      message="Every TIL you log grows your personal brainbank 🧠. I’ll be your guide along the way!"
      step={1}
      totalSteps={6}
    >
      {/* What you'll do here list */}
      <ul className="text-left text-sm mt-4 space-y-2">
        <li>🟠 <strong>Add TILs</strong> – save what you learn each day in one sentence</li>
        <li>🔄 <strong>Review & remember</strong> – we’ll quiz you when it matters most</li>
        <li>🌱 <strong>Grow your mind</strong> – build up streaks, levels & even artifacts</li>
      </ul>

      {/* Capy's Tip */}
      <div className="text-left mt-6 p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm italic text-gray-600">
        🗨️ <strong>Capy’s Tip:</strong> Learning is a habit — and I’m here to help it stick.
      </div>

      {/* CTA Button */}
      <button
        onClick={onNext}
        className="mt-6 w-full py-3 rounded-xl font-semibold bg-orange-500 text-white hover:bg-orange-600 transition"
      >
        Let’s begin
      </button>

      {/* Skip option */}
      <button
        onClick={onSkip}
        className="mt-3 text-sm text-gray-500 underline"
      >
        Skip onboarding
      </button>
    </CapyPopup>
  );
}
