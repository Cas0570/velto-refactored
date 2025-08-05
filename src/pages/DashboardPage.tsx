// src/pages/DashboardPage.tsx

import { useNavigate } from "react-router-dom";
import { Plus, X } from "lucide-react";

import { MobileLayout } from "@/components/layout/MobileLayout";
import { Header } from "@/components/common/Header";
import { RequestCard } from "@/components/common/RequestCard";
import { EmptyState } from "@/components/common/EmptyState";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/layout/Section";
import { ROUTES, MOCK_DATA } from "@/lib/constants";

export function DashboardPage() {
  const navigate = useNavigate();
  const requests = MOCK_DATA.PAYMENT_REQUESTS;

  const handleRequestAction = (action: string, requestId: string) => {
    console.log(`Action: ${action} on request: ${requestId}`);
    // TODO: Implement actual actions
    if (action === "view") {
      navigate(`${ROUTES.PAYMENT}/${requestId}`);
    }
  };

  return (
    <MobileLayout>
      <div className="space-y-6">
        <Header
          title="Mijn verzoeken"
          subtitle="Beheer al je betalingsverzoeken op één plek"
        >
          <Button
            className="w-full mb-6"
            size="lg"
            onClick={() => navigate(ROUTES.NEW_REQUEST)}
          >
            <Plus className="w-5 h-5 mr-2" />
            Nieuw verzoek
          </Button>
        </Header>

        <Section spacing="md">
          {requests.length > 0 ? (
            <div className="space-y-4">
              {requests.map((request) => (
                <RequestCard
                  key={request.id}
                  request={request}
                  variant="default"
                  onAction={handleRequestAction}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={<X className="w-8 h-8 text-muted-foreground" />}
              title="Nog geen verzoeken"
              description="Maak je eerste betalingsverzoek om te beginnen"
              action={
                <Button onClick={() => navigate(ROUTES.NEW_REQUEST)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Nieuw verzoek
                </Button>
              }
            />
          )}
        </Section>
      </div>
    </MobileLayout>
  );
}
