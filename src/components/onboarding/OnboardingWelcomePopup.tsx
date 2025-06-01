'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import CapyPopup from "../CapyPopup";

export default function OnboardingWelcomePopup({
  onNext,
  onSkip,
}: {
  onNext: (tilText: string) => void;
  onSkip: () => void;
}) {
  const [til, setTIL] = useState("");
  const router = useRouter();

  const handleSubmit = () => {
    if (til.trim()) {
      onNext(til.trim());
    }
  };

  return (
    <CapyPopup
      title="Welcome to WHILT!"
      message="I'm Professor Capy, your guide to learning something new every day. Let's get started by sharing something you've learned today."
    >
      <input
        type="text"
        value={til}
        onChange={(e) => setTIL(e.target.value)}
        placeholder="TIL there's an ancient statue of a capybara..."
        className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm"
      />

      <button
        onClick={handleSubmit}
        disabled={!til.trim()}
        className={`mt-5 w-full py-3 rounded-xl font-semibold ${
          til.trim()
            ? "bg-[#0A524B] text-white hover:bg-[#094139]"
            : "bg-gray-200 text-gray-500 cursor-not-allowed"
        }`}
      >
        Post a TIL
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
