// src/pages/NewRequestPage.tsx
import { useNavigate } from "react-router-dom";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { Header } from "@/components/common/Header";
import { ROUTES } from "@/lib/constants";

export function NewRequestPage() {
  const navigate = useNavigate();

  return (
    <MobileLayout showNavigation={false}>
      <div className="p-4">
        <Header
          title="Nieuw verzoek"
          subtitle="Multi-step request creation wizard coming soon"
          variant="minimal"
          showBackButton
          onBackClick={() => navigate(ROUTES.DASHBOARD)}
        />
        <div className="mt-8 text-center">
          <p className="text-muted-foreground">
            This page will contain the request creation wizard with:
          </p>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>• Amount input step</li>
            <li>• Description and details</li>
            <li>• Payment method selection</li>
            <li>• Review and confirmation</li>
          </ul>
        </div>
      </div>
    </MobileLayout>
  );
}
