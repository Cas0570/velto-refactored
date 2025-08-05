// src/pages/BrandingPage.tsx

import { useNavigate } from "react-router-dom";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { Header } from "@/components/common/Header";
import { ROUTES } from "@/lib/constants";

export function BrandingPage() {
  const navigate = useNavigate();

  return (
    <MobileLayout showNavigation={false}>
      <div className="p-4">
        <Header
          title="Branding"
          subtitle="Customize your payment pages"
          variant="minimal"
          showBackButton
          onBackClick={() => navigate(ROUTES.PROFILE)}
        />
        <div className="mt-8 text-center">
          <p className="text-muted-foreground">This page will contain:</p>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>• Logo/profile image upload</li>
            <li>• Brand color customization</li>
            <li>• Payment page preview</li>
            <li>• Theme selection</li>
          </ul>
        </div>
      </div>
    </MobileLayout>
  );
}
