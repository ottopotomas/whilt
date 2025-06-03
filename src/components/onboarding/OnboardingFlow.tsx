'use client';

import { useState } from 'react';
import OnboardingIntroPopup from './OnboardingIntroPopup';
import OnboardingWelcomePopup from './OnboardingWelcomePopup';
import OnboardingCategoryPopup from './OnboardingCategoryPopup';
import OnboardingSourcePopup from './OnboardingSourcePopup';
import OnboardingBranchPopup from './OnboardingBranchPopup';
import OnboardingAchievementsPopup from './OnboardingAchievementsPopup';
import OnboardingFinalPopup from './OnboardingFinalPopup';

type OnboardingStep =
  | 1 // intro
  | 2 // add TIL
  | 3 // category
  | 4 // source
  | 5 // related TIL
  | 6 // achievements
  | 7 // final screen
  | 'done';

export default function OnboardingFlow() {
  const [step, setStep] = useState<OnboardingStep>(1);
  const [tilText, setTilText] = useState('');
  const [suggestedCategory, setSuggestedCategory] = useState('History');
  const [suggestedSource, setSuggestedSource] = useState({
    url: 'https://example.com/capybaras-in-history',
    summary: 'This article explores ancient beliefs around capybaras in Andean mythology.',
  });
  const [suggestedBranchTIL, setSuggestedBranchTIL] = useState(
    'TIL capybaras were often depicted as symbols of peace in indigenous folklore.'
  );

  const handleSkip = () => {
    console.log('Onboarding skipped');
    setStep('done');
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
    setStep(4);
  };

  if (step === 'done') return null;

  if (step === 1) {
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
        username="friend"
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

  if (step === 4) {
    return (
      <OnboardingSourcePopup
        suggestedSource={suggestedSource}
        onSelectSource={() => setStep(5)}
        onSkip={() => setStep(5)}
      />
    );
  }

  if (step === 5) {
    return (
      <OnboardingBranchPopup
        originalTIL={tilText}
        suggestedTIL={suggestedBranchTIL}
        onAcceptBranch={() => setStep(6)}
        onSkip={() => setStep(6)}
      />
    );
  }

  if (step === 6) {
    return (
      <OnboardingAchievementsPopup
        onComplete={() => setStep(7)}
        onSkip={() => setStep(7)}
      />
    );
  }

  if (step === 7) {
    return (
      <OnboardingFinalPopup
        onFinish={() => {
          console.log('User completed onboarding!');
          // Save to Supabase here: hasCompletedOnboarding = true
          setStep('done');
        }}
      />
    );
  }

  return null;
}
