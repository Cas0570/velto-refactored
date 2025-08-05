// src/components/common/WizardProgress.tsx

import React from "react";
import { Check } from "lucide-react";
import { cn, wizardUtils } from "@/lib/utils";
import type { WizardStep } from "@/lib/types";

interface WizardProgressProps {
  steps: WizardStep[];
  currentStepIndex: number;
  showStepNumbers?: boolean;
  className?: string;
  variant?: "default" | "compact" | "minimal";
}

/**
 * Progress indicator component for wizard
 */
export function WizardProgress({
  steps,
  currentStepIndex,
  showStepNumbers = true,
  className,
  variant = "default",
}: WizardProgressProps) {
  const progress = wizardUtils.calculateProgress(
    currentStepIndex,
    steps.length
  );

  if (variant === "minimal") {
    return (
      <div className={cn("w-full", className)}>
        <div className="flex justify-between text-sm text-muted-foreground mb-2">
          <span>
            Stap {currentStepIndex + 1} van {steps.length}
          </span>
          <span>{progress}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div className={cn("w-full", className)}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={cn(
                  "w-2 h-2 rounded-full transition-colors duration-200",
                  index < currentStepIndex
                    ? "bg-primary"
                    : index === currentStepIndex
                    ? "bg-primary"
                    : "bg-muted"
                )}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">
            {currentStepIndex + 1}/{steps.length}
          </span>
        </div>
      </div>
    );
  }

  // Default variant - optimized for mobile
  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between mb-6 px-2">
        {steps.map((step, index) => {
          const isCompleted = index < currentStepIndex;
          const isCurrent = index === currentStepIndex;

          return (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center min-w-0 flex-1">
                {/* Step circle */}
                <div
                  className={cn(
                    "flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-200 mb-2",
                    isCompleted
                      ? "bg-primary border-primary text-primary-foreground"
                      : isCurrent
                      ? "bg-primary border-primary text-primary-foreground"
                      : "bg-background border-muted-foreground/30 text-muted-foreground"
                  )}
                >
                  {isCompleted ? (
                    <Check className="w-4 h-4" />
                  ) : showStepNumbers ? (
                    <span className="text-xs font-medium">{index + 1}</span>
                  ) : (
                    <div className="w-1.5 h-1.5 rounded-full bg-current" />
                  )}
                </div>

                {/* Step label */}
                <div className="text-center max-w-full">
                  <p
                    className={cn(
                      "text-xs font-medium truncate",
                      isCurrent
                        ? "text-foreground"
                        : isCompleted
                        ? "text-muted-foreground"
                        : "text-muted-foreground/60"
                    )}
                  >
                    {/* {step.title} */}
                  </p>
                </div>
              </div>

              {/* Connector line */}
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "flex-1 h-0.5 mx-2 mb-1 transition-colors duration-200 max-w-[40px]",
                    index < currentStepIndex
                      ? "bg-primary"
                      : "bg-muted-foreground/20"
                  )}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
