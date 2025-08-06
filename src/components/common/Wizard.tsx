// src/components/common/Wizard.tsx

/* eslint-disable @typescript-eslint/no-explicit-any */

import React from "react";
import { AlertCircle } from "lucide-react";
import { useWizard } from "@/hooks/useWizard";
import { WizardProvider } from "./WizardContext";
import { WizardProgress } from "./WizardProgress";
import { WizardNavigation } from "./WizardNavigation";
import { Header } from "./Header";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { Card } from "@/components/ui/card";
import { cn, validateAmount } from "@/lib/utils";
import { WIZARD_CONFIG, VALIDATION } from "@/lib/constants";
import type { WizardProps, WizardStepProps } from "@/lib/types";

/**
 * Reusable multi-step wizard component
 */
export function Wizard<T extends Record<string, any>>({
  steps,
  initialData,
  onComplete,
  onCancel,
  title,
  subtitle,
  showProgress = WIZARD_CONFIG.SHOW_PROGRESS_BY_DEFAULT,
  showStepNumbers = WIZARD_CONFIG.SHOW_STEP_NUMBERS_BY_DEFAULT,
  allowBackNavigation = WIZARD_CONFIG.ALLOW_BACK_NAVIGATION_BY_DEFAULT,
  className,
  variant = "default",
}: WizardProps<T>) {
  const wizardId = React.useMemo(() => {
    // Generate a unique wizard ID based on the steps
    return `wizard-${steps.map((s) => s.id).join("-")}`;
  }, [steps]);

  const wizardContext = useWizard<T>({
    steps,
    initialData,
    wizardId,
    autoSave: true,
    onComplete,
    onCancel,
  });

  const {
    currentStepIndex,
    data,
    isLoading,
    errors,
    updateData,
    nextStep,
    previousStep,
    skipStep,
  } = wizardContext;

  const currentStep = steps[currentStepIndex];
  const CurrentStepComponent = currentStep?.component;

  // Determine if current step can proceed based on data validation
  const canProceed = React.useMemo(() => {
    // Payment request wizard validation
    if (currentStep.id === "amount") {
      const validation = validateAmount((data as any).amount || "");
      return validation.isValid;
    }
    if (currentStep.id === "description") {
      const description = (data as any).description?.trim() || "";
      return (
        description.length >= VALIDATION.MIN_DESCRIPTION_LENGTH &&
        description.length <= VALIDATION.MAX_DESCRIPTION_LENGTH
      );
    }
    if (currentStep.id === "payment-methods") {
      return (
        (data as any).paymentMethods && (data as any).paymentMethods.length > 0
      );
    }

    // Onboarding wizard validation
    if (currentStep.id === "personal-info") {
      const formData = data as any;
      return (
        formData.firstName?.trim() &&
        formData.lastName?.trim() &&
        formData.email?.trim() &&
        formData.firstName.length >= VALIDATION.MIN_NAME_LENGTH &&
        formData.lastName.length >= VALIDATION.MIN_NAME_LENGTH &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
        (!formData.phone || /^(\+31|0031|0)[6-9]\d{8}$/.test(formData.phone.replace(/\s|-/g, "")))
      );
    }
    if (currentStep.id === "payment-methods-setup") {
      return (
        (data as any).paymentMethods && (data as any).paymentMethods.length > 0
      );
    }

    // Profile customization, welcome tutorial, draft preview and request created steps can always proceed
    return true;
  }, [currentStep.id, data]);

  // Update wizard context with canProceed status
  React.useEffect(() => {
    // This could be used to update the wizard context if needed
  }, [canProceed]);

  if (!CurrentStepComponent) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Wizard fout</h3>
          <p className="text-muted-foreground">
            Er is een probleem opgetreden bij het laden van de wizard stap.
          </p>
        </div>
      </div>
    );
  }

  // Step props for the current step component
  const stepProps: WizardStepProps<T> = {
    data,
    onChange: updateData,
    onNext: nextStep,
    onBack: previousStep,
    onSkip: currentStep.canSkip ? skipStep : undefined,
    canProceed,
    isLoading,
    errors,
  };

  const renderWizardContent = () => (
    <WizardProvider value={{ ...wizardContext, canGoNext: canProceed }}>
      <div className={cn("w-full", className)}>
        {/* Header */}
        {(title || subtitle) && (
          <Header
            title={title || currentStep.title}
            subtitle={subtitle || currentStep.description}
            variant={variant === "minimal" ? "minimal" : "default"}
            className="mb-6"
          />
        )}

        {/* Progress indicator */}
        {showProgress && (
          <WizardProgress
            steps={steps}
            currentStepIndex={currentStepIndex}
            showStepNumbers={showStepNumbers}
            variant={variant}
            className="mb-8"
          />
        )}

        {/* Error display */}
        {errors.general && (
          <Card className="mb-6 p-4 border-destructive bg-destructive/5">
            <div className="flex items-center gap-2 text-destructive">
              <AlertCircle className="w-4 h-4" />
              <p className="text-sm font-medium">{errors.general}</p>
            </div>
          </Card>
        )}

        {/* Current step content */}
        <div className="mb-8">
          <CurrentStepComponent {...stepProps} />
        </div>

        {/* Navigation */}
        <WizardNavigation
          steps={steps}
          allowBackNavigation={allowBackNavigation}
          showCancelButton={!!onCancel}
          variant={variant}
        />
      </div>
    </WizardProvider>
  );

  // Render based on variant
  if (variant === "minimal") {
    return (
      <div className={cn("max-w-md mx-auto p-4", className)}>
        {renderWizardContent()}
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <Card className={cn("max-w-lg mx-auto p-6", className)}>
        {renderWizardContent()}
      </Card>
    );
  }

  // Default variant with mobile layout
  return (
    <MobileLayout showNavigation={false}>{renderWizardContent()}</MobileLayout>
  );
}

// Export wizard-related components for advanced usage
export { WizardProvider } from "./WizardContext";
export { WizardProgress } from "./WizardProgress";
export { WizardNavigation } from "./WizardNavigation";