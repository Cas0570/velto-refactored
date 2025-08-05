// src/hooks/useWizard.ts

/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useCallback, useEffect, useRef } from "react";
import type { WizardStep, WizardContextValue } from "@/lib/types";
import { wizardUtils, debounce } from "@/lib/utils";
import { WIZARD_CONFIG } from "@/lib/constants";

interface UseWizardOptions<T> {
  steps: WizardStep<T>[];
  initialData?: Partial<T>;
  wizardId?: string;
  autoSave?: boolean;
  autoSaveDelay?: number;
  onComplete?: (data: T) => void | Promise<void>;
  onCancel?: () => void;
  onStepChange?: (stepIndex: number, data: T) => void;
}

/**
 * Custom hook for managing wizard state and navigation
 */
export function useWizard<T extends Record<string, any>>({
  steps,
  initialData = {} as Partial<T>,
  wizardId,
  autoSave = false,
  autoSaveDelay = WIZARD_CONFIG.AUTO_SAVE_DELAY,
  onComplete,
  onCancel,
  onStepChange,
}: UseWizardOptions<T>): WizardContextValue<T> {
  // Initialize state
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [data, setData] = useState<T>(() => {
    // Try to load saved progress if wizardId is provided
    if (wizardId && autoSave) {
      const savedProgress = wizardUtils.loadProgress<T>(wizardId);
      if (savedProgress) {
        setCurrentStepIndex(savedProgress.currentStep);
        return { ...initialData, ...savedProgress.data } as T;
      }
    }
    return { ...initialData } as T;
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Refs for debounced functions
  const debouncedSaveRef = useRef<((data: T, step: number) => void) | null>(
    null
  );

  // Initialize debounced save function
  useEffect(() => {
    if (wizardId && autoSave) {
      debouncedSaveRef.current = debounce((data: T, step: number) => {
        wizardUtils.saveProgress(wizardId, data, step);
      }, autoSaveDelay);
    }
  }, [wizardId, autoSave, autoSaveDelay]);

  // Auto-save when data or step changes
  useEffect(() => {
    if (debouncedSaveRef.current) {
      debouncedSaveRef.current(data, currentStepIndex);
    }
  }, [data, currentStepIndex]);

  // Call onStepChange when step changes
  useEffect(() => {
    onStepChange?.(currentStepIndex, data);
  }, [currentStepIndex, data, onStepChange]);

  // Navigation functions
  const goToStep = useCallback(
    (stepIndex: number) => {
      if (stepIndex >= 0 && stepIndex < steps.length) {
        setCurrentStepIndex(stepIndex);
        setErrors({}); // Clear errors when navigating
      }
    },
    [steps.length]
  );

  const nextStep = useCallback(() => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
      setErrors({});
    }
  }, [currentStepIndex, steps.length]);

  const previousStep = useCallback(() => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
      setErrors({});
    }
  }, [currentStepIndex]);

  const skipStep = useCallback(() => {
    const currentStep = steps[currentStepIndex];
    if (currentStep?.canSkip) {
      nextStep();
    }
  }, [currentStepIndex, steps, nextStep]);

  // Data management functions
  const updateData = useCallback((newData: Partial<T>) => {
    setData((prevData) => wizardUtils.mergeWizardData(prevData, newData));
    setErrors({}); // Clear errors when data is updated
  }, []);

  const setLoadingState = useCallback((loading: boolean) => {
    setIsLoading(loading);
  }, []);

  const setErrorState = useCallback((newErrors: Record<string, string>) => {
    setErrors(newErrors);
  }, []);

  // Completion and cancellation
  const complete = useCallback(async () => {
    if (onComplete) {
      setIsLoading(true);
      try {
        await onComplete(data);
        // Clear saved progress on successful completion
        if (wizardId && autoSave) {
          wizardUtils.clearProgress(wizardId);
        }
      } catch (error) {
        console.error("Wizard completion failed:", error);
        setErrors({
          general: "Er is een fout opgetreden bij het voltooien van de wizard.",
        });
      } finally {
        setIsLoading(false);
      }
    }
  }, [data, onComplete, wizardId, autoSave]);

  const cancel = useCallback(() => {
    // Clear saved progress on cancellation
    if (wizardId && autoSave) {
      wizardUtils.clearProgress(wizardId);
    }
    onCancel?.();
  }, [onCancel, wizardId, autoSave]);

  // Computed properties
  const canGoBack = currentStepIndex > 0;
  const canGoNext = currentStepIndex < steps.length - 1;
  const totalSteps = steps.length;

  return {
    currentStepIndex,
    totalSteps,
    data,
    isLoading,
    errors,
    canGoBack,
    canGoNext,
    goToStep,
    nextStep,
    previousStep,
    skipStep,
    updateData,
    setLoading: setLoadingState,
    setErrors: setErrorState,
    complete,
    cancel,
  };
}
