'use client';

import { useSupabaseClient } from "@supabase/auth-helpers-react";
import CapyPopup from "../CapyPopup";
    
interface OnboardingFinalPopupProps {
  onFinish: () => void;
}

export default function OnboardingFinalPopup({ onFinish }: OnboardingFinalPopupProps) {
  const supabase = useSupabaseClient();

  const handleFinish = async () => {
    try {
      const { error } = await supabase.auth.updateUser({
        data: { hasCompletedOnboarding: true },
      });

      if (error) {
        console.error("Failed to update user metadata:", error.message);
      }
    } catch (err) {
      console.error("Unexpected error updating onboarding status:", err);
    }

    onFinish(); // Proceed to exit onboarding
  };

  return (
    <CapyPopup title="That’s all for now!" message="">
      <div className="bg-[#F7F7F7] border border-gray-200 rounded-xl px-4 py-4 text-sm text-gray-800 mb-6 text-left">
        <p className="font-medium">
          Your knowledge growth journey has officially begun! 🌱
        </p>
        <p className="mt-2 text-gray-700">
          May it grow, thrive, and bloom into additional discoveries and neural connections.
        </p>
      </div>

      <button
        onClick={handleFinish}
        className="w-full py-3 rounded-xl font-semibold bg-orange-500 text-white hover:bg-orange-600 transition"
      >
        Let’s go!
      </button>
    </CapyPopup>
  );
}
