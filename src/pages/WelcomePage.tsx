// src/pages/WelcomePage.tsx

import { useNavigate } from "react-router-dom";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { APP_CONFIG, ROUTES } from "@/lib/constants";

export function WelcomePage() {
  const navigate = useNavigate();

  return (
    <MobileLayout showNavigation={false} maxWidth="full">
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-background to-secondary">
        <div className="w-full max-w-sm space-y-8">
          {/* Logo */}
          <div className="text-center">
            <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-primary-foreground">
                V
              </span>
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {APP_CONFIG.name}
            </h1>
            <p className="text-lg text-muted-foreground font-medium">
              {APP_CONFIG.tagline}
            </p>
          </div>

          {/* Features Card */}
          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <p className="text-sm text-muted-foreground">
                  Maak professionele betalingsverzoeken
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <p className="text-sm text-muted-foreground">
                  Deel eenvoudig via meerdere platforms
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <p className="text-sm text-muted-foreground">
                  Ontvang betalingen via Tikkie, PayPal en meer
                </p>
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-4">
            <Button
              className="w-full"
              size="lg"
              onClick={() => navigate(ROUTES.ONBOARDING)}
            >
              Start gratis
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              Heb je al een account?{" "}
              <span
                className="text-primary font-medium cursor-pointer hover:underline"
                onClick={() => navigate(ROUTES.HOME)}
              >
                Log hier in
              </span>
            </p>
          </div>

          {/* Footer */}
          <p className="text-center text-xs text-muted-foreground">
            Door verder te gaan ga je akkoord met onze voorwaarden
          </p>
        </div>
      </div>
    </MobileLayout>
  );
}
