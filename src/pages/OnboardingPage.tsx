// src/pages/OnboardingPage.tsx

import { useNavigate } from "react-router-dom";
import { Wizard } from "@/components/common/Wizard";
import {
  PersonalInfoStep,
  PaymentMethodsSetupStep,
  ProfileCustomizationStep,
  WelcomeTutorialStep,
} from "@/components/common/OnboardingSteps";
import { ROUTES } from "@/lib/constants";
import type { WizardStep, OnboardingForm } from "@/lib/types";

export function OnboardingPage() {
  const navigate = useNavigate();

  const onboardingSteps: WizardStep<OnboardingForm>[] = [
    {
      id: "personal-info",
      title: "Persoonlijk",
      description: "Jouw gegevens",
      component: PersonalInfoStep,
    },
    {
      id: "payment-methods-setup",
      title: "Betaalmethodes",
      description: "Kies je opties",
      component: PaymentMethodsSetupStep,
    },
    {
      id: "profile-customization",
      title: "Profiel",
      description: "Personaliseer",
      component: ProfileCustomizationStep,
    },
    {
      id: "welcome-tutorial",
      title: "Welkom",
      description: "Je bent klaar!",
      component: WelcomeTutorialStep,
    },
  ];

  const handleOnboardingComplete = async (data: OnboardingForm) => {
    console.log("Onboarding completed:", data);

    // TODO: Here you would implement actual API calls:
    // 1. Create user account with personal info
    // 2. Set up payment methods and connections
    // 3. Save user preferences
    // 4. Send welcome email

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // For now, just navigate to home page
    navigate(ROUTES.HOME);
  };

  const handleOnboardingCancel = () => {
    // Navigate back to welcome page
    navigate(ROUTES.WELCOME);
  };

  return (
    <Wizard<OnboardingForm>
      steps={onboardingSteps}
      onComplete={handleOnboardingComplete}
      onCancel={handleOnboardingCancel}
      title="Welkom bij Velto"
      subtitle="Laten we je account instellen"
      showProgress={true}
      showStepNumbers={true}
      allowBackNavigation={true}
      initialData={{
        paymentMethods: [],
        connectedAccounts: {},
      }}
      className="safe-area-bottom"
    />
  );
}
