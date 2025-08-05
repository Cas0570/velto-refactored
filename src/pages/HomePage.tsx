// src/pages/HomePage.tsx

import { useNavigate } from "react-router-dom";
import {
  Plus,
  Euro,
  Clock,
  BarChart3,
  FileText,
  User,
  Zap,
} from "lucide-react";

import { MobileLayout } from "@/components/layout/MobileLayout";
import { Header } from "@/components/common/Header";
import { StatCard } from "@/components/common/StatCard";
import { RequestCard } from "@/components/common/RequestCard";
import { Section } from "@/components/layout/Section";
import { Grid } from "@/components/layout/Grid";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ROUTES, MOCK_DATA } from "@/lib/constants";
import { getInitials } from "@/lib/utils";

export function HomePage() {
  const navigate = useNavigate();
  const user = MOCK_DATA.USER;
  const stats = MOCK_DATA.STATISTICS;
  const recentRequests = MOCK_DATA.PAYMENT_REQUESTS.slice(0, 2);

  const handleRequestAction = (action: string, requestId: string) => {
    console.log(`Action: ${action} on request: ${requestId}`);
    // TODO: Implement actual actions
  };

  const userInitials = getInitials(user.firstName, user.lastName);

  // Quick action cards data
  const quickActions = [
    {
      title: "Verzoeken",
      icon: FileText,
      variant: "orange" as const,
      onClick: () => navigate(ROUTES.DASHBOARD),
    },
    {
      title: "Profiel",
      icon: User,
      variant: "cyan" as const,
      onClick: () => navigate(ROUTES.PROFILE),
    },
    {
      title: "Branding",
      icon: BarChart3,
      variant: "purple" as const,
      onClick: () => navigate(ROUTES.BRANDING),
    },
  ];

  return (
    <MobileLayout>
      <div className="space-y-6">
        {/* Header */}
        <Header
          title={`Hallo, ${user.firstName}!`}
          subtitle="Klaar voor een nieuwe betaalverzoek?"
          showAvatar={true}
          avatarFallback={userInitials}
          onAvatarClick={() => navigate(ROUTES.PROFILE)}
        />

        {/* Statistics Grid */}
        <Section title="Overzicht" spacing="md">
          <Grid cols={2} gap="md">
            <StatCard
              icon={<Euro />}
              value={`€${stats.totalAmount.toLocaleString("nl-NL", {
                minimumFractionDigits: 2,
              })}`}
              label="Totaal ontvangen"
              variant="green"
              trend={{ value: "+15%", positive: true }}
            />
            <StatCard
              icon={<Clock />}
              value={stats.pendingRequests}
              label="Openstaand"
              variant="orange"
              trend={{ value: "+3", positive: true }}
            />
            <StatCard
              icon={<Euro />}
              value={`€${stats.thisMonthAmount.toLocaleString("nl-NL", {
                minimumFractionDigits: 2,
              })}`}
              label="Deze maand"
              variant="cyan"
              trend={{ value: "+22%", positive: true }}
            />
            <StatCard
              icon={<BarChart3 />}
              value={`${stats.successRate}%`}
              label="Success ratio"
              variant="purple"
              trend={{ value: "+5%", positive: true }}
            />
          </Grid>
        </Section>

        {/* Recent Activity */}
        <Section spacing="md">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-heading-2 font-semibold text-foreground">
              Recente activiteit
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(ROUTES.DASHBOARD)}
            >
              Alles bekijken
            </Button>
          </div>

          <div className="space-y-3">
            {recentRequests.map((request) => (
              <RequestCard
                key={request.id}
                request={{
                  ...request,
                  paymentMethods: [...request.paymentMethods],
                }}
                variant="compact"
                onAction={handleRequestAction}
              />
            ))}
          </div>
        </Section>

        {/* Quick Actions */}
        <Section title="Snelle acties" spacing="md">
          <Grid cols={3} gap="sm" className="mb-4">
            {quickActions.map((action) => (
              <Card
                key={action.title}
                variant="elevated"
                size="sm"
                interactive={true}
                onClick={action.onClick}
                className="text-center p-4"
              >
                <div className="flex flex-col items-center space-y-2">
                  <div
                    className={`p-3 rounded-full ${
                      action.variant === "orange"
                        ? "bg-orange-500"
                        : action.variant === "cyan"
                        ? "bg-cyan-500"
                        : action.variant === "purple"
                        ? "bg-purple-500"
                        : "bg-primary"
                    }`}
                  >
                    <action.icon className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    {action.title}
                  </span>
                </div>
              </Card>
            ))}
          </Grid>

          {/* Featured Action - New Request */}
          <Card
            variant="gradient"
            size="default"
            interactive={true}
            onClick={() => navigate(ROUTES.NEW_REQUEST)}
            className="relative overflow-hidden"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-primary rounded-full">
                  <Zap className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    Snel verzoek
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Maak in 30 seconden een verzoek
                  </p>
                </div>
              </div>
              <Button size="icon" className="shrink-0 shadow-lg">
                <Plus className="h-5 w-5" />
              </Button>
            </div>
          </Card>
        </Section>
      </div>
    </MobileLayout>
  );
}
