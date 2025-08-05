// src/pages/NewRequestPage.tsx

import { useNavigate } from "react-router-dom";
import { Wizard } from "@/components/common/Wizard";
import {
  AmountStep,
  DescriptionStep,
  PaymentMethodSelectionStep,
  DraftPreviewStep,
  RequestCreatedStep,
} from "@/components/common/PaymentRequestSteps";
import { ROUTES } from "@/lib/constants";
import type { WizardStep, CreateRequestForm } from "@/lib/types";

export function NewRequestPage() {
  const navigate = useNavigate();

  const paymentRequestSteps: WizardStep<CreateRequestForm>[] = [
    {
      id: "amount",
      title: "Bedrag",
      description: "Hoeveel wil je vragen?",
      component: AmountStep,
    },
    {
      id: "description",
      title: "Omschrijving",
      description: "Waar is het verzoek voor?",
      component: DescriptionStep,
    },
    {
      id: "payment-methods",
      title: "Betaalmethodes",
      description: "Hoe kunnen klanten betalen?",
      component: PaymentMethodSelectionStep,
    },
    {
      id: "draft-preview",
      title: "Bijna klaar",
      description: "Controleer je verzoek",
      component: DraftPreviewStep,
    },
    {
      id: "request-created",
      title: "Voltooid",
      description: "Verzoek aangemaakt",
      component: RequestCreatedStep,
    },
  ];

  const handlePaymentRequestComplete = async (data: CreateRequestForm) => {
    console.log("Payment request created:", data);

    // TODO: Implement actual API call to create payment request
    // const response = await createPaymentRequest(data);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Navigate to dashboard after successful creation
    navigate(ROUTES.DASHBOARD);
  };

  const handlePaymentRequestCancel = () => {
    navigate(ROUTES.HOME);
  };

  return (
    <Wizard<CreateRequestForm>
      steps={paymentRequestSteps}
      onComplete={handlePaymentRequestComplete}
      onCancel={handlePaymentRequestCancel}
      title="Nieuw betaalverzoek"
      subtitle="Maak in een paar stappen je verzoek aan"
      showProgress={true}
      showStepNumbers={true}
      allowBackNavigation={true}
    />
  );
}