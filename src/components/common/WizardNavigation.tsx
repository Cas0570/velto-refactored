// src/components/common/WizardNavigation.tsx

import { ChevronLeft, ChevronRight, X, SkipForward } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWizardContext } from "./WizardContext";
import { cn } from "@/lib/utils";
import type { WizardStep } from "@/lib/types";

interface WizardNavigationProps {
  steps: WizardStep[];
  allowBackNavigation?: boolean;
  showCancelButton?: boolean;
  className?: string;
  variant?: "default" | "compact" | "minimal";
}

/**
 * Navigation component for wizard with back, next, skip, and cancel buttons
 */
export function WizardNavigation({
  steps,
  allowBackNavigation = true,
  showCancelButton = true,
  className,
  variant = "default",
}: WizardNavigationProps) {
  const {
    currentStepIndex,
    totalSteps,
    canGoBack,
    canGoNext,
    isLoading,
    previousStep,
    nextStep,
    skipStep,
    complete,
    cancel,
  } = useWizardContext();

  const currentStep = steps[currentStepIndex];
  const isLastStep = currentStepIndex === totalSteps - 1;
  const canSkipCurrentStep = currentStep?.canSkip;

  const handleNext = () => {
    if (isLastStep) {
      complete();
    } else {
      nextStep();
    }
  };

  if (variant === "minimal") {
    return (
      <div className={cn("flex justify-between items-center", className)}>
        {allowBackNavigation && canGoBack ? (
          <Button
            variant="ghost"
            size="sm"
            onClick={previousStep}
            disabled={isLoading}
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Terug
          </Button>
        ) : (
          <div />
        )}

        <Button
          onClick={handleNext}
          disabled={isLoading || !canGoNext}
          size="sm"
        >
          {isLoading ? (
            "Laden..."
          ) : isLastStep ? (
            "Voltooien"
          ) : (
            <>
              Volgende
              <ChevronRight className="w-4 h-4 ml-1" />
            </>
          )}
        </Button>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        {allowBackNavigation && canGoBack && (
          <Button
            variant="outline"
            size="sm"
            onClick={previousStep}
            disabled={isLoading}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
        )}

        {canSkipCurrentStep && !isLastStep && (
          <Button
            variant="ghost"
            size="sm"
            onClick={skipStep}
            disabled={isLoading}
          >
            <SkipForward className="w-4 h-4" />
          </Button>
        )}

        <Button
          onClick={handleNext}
          disabled={isLoading || !canGoNext}
          size="sm"
          className="flex-1"
        >
          {isLoading ? "Laden..." : isLastStep ? "Voltooien" : "Volgende"}
        </Button>

        {showCancelButton && (
          <Button
            variant="ghost"
            size="sm"
            onClick={cancel}
            disabled={isLoading}
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>
    );
  }

  // Default variant
  return (
    <div className={cn("flex items-center justify-between", className)}>
      {allowBackNavigation && canGoBack && (
        <Button variant="outline" onClick={previousStep} disabled={isLoading}>
          <ChevronLeft className="w-4 h-4 mr-2" />
          Terug
        </Button>
      )}

      {canSkipCurrentStep && !isLastStep && (
        <Button variant="ghost" onClick={skipStep} disabled={isLoading}>
          <SkipForward className="w-4 h-4 mr-2" />
          Overslaan
        </Button>
      )}

      {showCancelButton && (
        <Button variant="ghost" onClick={cancel} disabled={isLoading}>
          Annuleren
        </Button>
      )}

      <Button onClick={handleNext} disabled={isLoading || !canGoNext}>
        {isLoading ? (
          "Laden..."
        ) : isLastStep ? (
          "Voltooien"
        ) : (
          <>
            Volgende
            <ChevronRight className="w-4 h-4 ml-2" />
          </>
        )}
      </Button>
    </div>
  );
}
