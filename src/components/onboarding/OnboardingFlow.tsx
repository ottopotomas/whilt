'use client';

import { useState } from 'react';
import OnboardingIntroPopup from './OnboardingIntroPopup';
import OnboardingWelcomePopup from './OnboardingWelcomePopup';
import OnboardingCategoryPopup from './OnboardingCategoryPopup';
import OnboardingSourcePopup from "./OnboardingSourcePopup";

type OnboardingStep =
  | 1 // intro
  | 2 // add til
  | 3 // category
  | 4 // source (coming)
  | 5 // branch TIL (coming)
  | 6 // achievements
  | 7 // final screen
  | 'done';

export default function OnboardingFlow() {
  const [step, setStep] = useState<OnboardingStep>(1);
  const [tilText, setTilText] = useState('');
  const [suggestedCategory, setSuggestedCategory] = useState('');

  const handleSkip = () => {
    // You should save `hasCompletedOnboarding: true` to Supabase or user metadata here
    console.log('Onboarding skipped');
    setStep('done'); // Exit flow
  };

  const handleTILSubmit = async (til: string) => {
    setTilText(til);
    try {
      const res = await fetch('/api/ai-categorise', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ til }),
      });

      const data = await res.json();
      const aiCategory = data?.category || 'General';
      setSuggestedCategory(aiCategory);
      setStep(3);
    } catch (error) {
      console.error('Error categorizing TIL:', error);
      setSuggestedCategory('General');
      setStep(3);
    }
  };

  const handleCategorySelect = (category: string) => {
    console.log('User selected category:', category);
    // Optionally save category
    setStep(4); // Proceed to source step next
  };

  // Final exit point after step 6
  const completeOnboarding = () => {
    console.log('Onboarding complete!');
    // Save to Supabase: `hasCompletedOnboarding: true`
    setStep('done');
  };

  // Step-based rendering
  if (step === 'done') {
    return (
      <OnboardingIntroPopup
        onNext={() => setStep(2)}
        onSkip={handleSkip}
      />
    );
  }

  if (step === 2) {
    return (    
      <OnboardingWelcomePopup
       username={"friend"} // ✅ Add this line
  onNext={handleTILSubmit}
  onSkip={handleSkip}
     />
    );
  }

  if (step === 3) {
    return (
      <OnboardingCategoryPopup
        suggestedCategory={suggestedCategory}
        onSelectCategory={handleCategorySelect}
        onSkip={handleSkip}
      />
    );
  }

  // Placeholder for Step 4–6
  if (step === 4) {
  return (
    <OnboardingSourcePopup
      suggestedSource={{
        url: "https://example.com/capybaras-in-history",
        summary:
          "This article explores ancient beliefs around capybaras in Andean mythology.",
      }}
      onSelectSource={(url) => {
        console.log("Selected source:", url);
        setStep(5);
      }}
      onSkip={() => setStep(5)}
    />
  );
}

  if (step === 5) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 text-center">
          <p className="text-sm mb-4">Step 5 (Branch TIL) coming soon...</p>
          <button
            onClick={() => setStep(6)}
            className="bg-orange-500 text-white py-2 px-6 rounded-xl"
          >
            Skip for now
          </button>
        </div>
      </div>
    );
  }

  if (step === 6) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 text-center">
          <p className="text-sm mb-4">Step 6 (Achievements) coming soon...</p>
          <button
            onClick={() => setStep(7)}
            className="bg-orange-500 text-white py-2 px-6 rounded-xl"
          >
            Finish
          </button>
        </div>
      </div>
    );
  }

  if (step === 7) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 text-center">
          <h2 className="text-lg font-bold mb-2">🎉 You’re ready!</h2>
          <p className="text-sm text-gray-700 mb-4">
            You’ve planted your first seed of knowledge. Let’s grow it together 🌱
          </p>
          <p className="text-sm text-gray-500 italic">
            Make sure to check back in 12–24 hours — I’ll have your first memory test ready!
          </p>
          <button
            onClick={completeOnboarding}
            className="mt-6 bg-[#0A524B] text-white py-2 px-6 rounded-xl"
          >
            Go to Feed
          </button>
        </div>
      </div>
    );
  }

  return null; // Onboarding complete
}
