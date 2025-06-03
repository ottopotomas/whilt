'use client';

import { useState } from "react";
import CapyPopup from "../CapyPopup";

export default function OnboardingWelcomePopup({
  username,
  onNext,
  onSkip,
}: {
  username: string;
  onNext: (tilText: string) => void;
  onSkip: () => void;
}) {
  const [til, setTIL] = useState("");

  const handleSubmit = () => {
    if (til.trim()) {
      onNext(til.trim());
    }
  };

  return (
    <CapyPopup
      title={`🐾 Hi there ${username}! I’m Professor Capy`}
      message="I’ll be your guide to learning something new every day. Ready to begin?"
      step={1}
      totalSteps={6}
    >
      {/* Prompt Heading */}
      <h2 className="text-lg font-bold text-gray-800 mt-2 mb-2">
        Post the first TIL
      </h2>
      <p className="text-sm text-gray-600 mb-4">
        Share something you’ve learned by posting your first TIL (Today I Learned).
      </p>

      {/* TIL Input */}
      <input
        type="text"
        value={til}
        onChange={(e) => setTIL(e.target.value)}
        placeholder="TIL there’s an ancient statue that depicts a capybara..."
        className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm"
      />

      {/* Post Button */}
      <button
        onClick={handleSubmit}
        disabled={!til.trim()}
        className={`mt-5 w-full py-3 rounded-xl font-semibold ${
          til.trim()
            ? "bg-orange-500 text-white hover:bg-orange-600 transition"
            : "bg-gray-200 text-gray-500 cursor-not-allowed"
        }`}
      >
        Post a TIL
      </button>

      {/* Skip Link */}
      <button
        onClick={onSkip}
        className="mt-3 text-sm text-gray-500 underline"
      >
        Skip for now
      </button>
    </CapyPopup>
  );
}
