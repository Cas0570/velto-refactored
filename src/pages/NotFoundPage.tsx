// src/pages/NotFoundPage.tsx
import { useNavigate } from "react-router-dom";
import { Home, AlertCircle } from "lucide-react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { EmptyState } from "@/components/common/EmptyState";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants";

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <MobileLayout showNavigation={false}>
      <div className="min-h-screen flex items-center justify-center">
        <EmptyState
          icon={<AlertCircle className="w-8 h-8 text-muted-foreground" />}
          title="404 - Pagina niet gevonden"
          description="De pagina die je zoekt bestaat niet of is verplaatst."
          action={
            <Button onClick={() => navigate(ROUTES.HOME)}>
              <Home className="w-4 mr-2" />
              Terug naar home
            </Button>
          }
        />
      </div>
    </MobileLayout>
  );
}
