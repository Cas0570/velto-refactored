// src/pages/PaymentPage.tsx
import { useParams } from "react-router-dom";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { Header } from "@/components/common/Header";
import { MOCK_DATA } from "@/lib/constants";

export function PaymentPage() {
  const { id } = useParams<{ id: string }>();
  const request = MOCK_DATA.PAYMENT_REQUESTS.find((r) => r.id === id);

  return (
    <MobileLayout showNavigation={false}>
      <div className="p-4">
        <Header
          title={request?.title || "Betalingsverzoek"}
          subtitle="Public payment request page coming soon"
          variant="centered"
        />
        <div className="mt-8 text-center">
          <p className="text-muted-foreground">This page will contain:</p>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>• Beautiful payment request display</li>
            <li>• Multiple payment method buttons</li>
            <li>• QR code for mobile payments</li>
            <li>• Share functionality</li>
          </ul>
        </div>
      </div>
    </MobileLayout>
  );
}
