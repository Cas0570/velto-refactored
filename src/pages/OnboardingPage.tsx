// src/pages/OnboardingPage.tsx
import { MobileLayout } from "@/components/layout/MobileLayout";
import { Header } from "@/components/common/Header";

export function OnboardingPage() {
  return (
    <MobileLayout showNavigation={false}>
      <div className="p-4">
        <Header
          title="Onboarding"
          subtitle="Multi-step user onboarding coming soon"
          variant="minimal"
        />
        <div className="mt-8 text-center">
          <p className="text-muted-foreground">
            This page will contain the complete onboarding flow with:
          </p>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>• Personal information form</li>
            <li>• Payment method connection</li>
            <li>• Profile setup</li>
            <li>• Welcome tutorial</li>
          </ul>
        </div>
      </div>
    </MobileLayout>
  );
}
