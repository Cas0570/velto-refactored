// src/components/common/WizardContext.tsx

/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { createContext, useContext } from "react";
import type { WizardContextValue } from "@/lib/types";

const WizardContext = createContext<WizardContextValue | null>(null);

interface WizardProviderProps<T = any> {
  children: React.ReactNode;
  value: WizardContextValue<T>;
}

/**
 * Provider component for wizard context
 */
export function WizardProvider<T = any>({
  children,
  value,
}: WizardProviderProps<T>) {
  return (
    <WizardContext.Provider value={value}>{children}</WizardContext.Provider>
  );
}

/**
 * Hook to access wizard context
 */
// eslint-disable-next-line react-refresh/only-export-components
export function useWizardContext<T = any>(): WizardContextValue<T> {
  const context = useContext(WizardContext);
  if (!context) {
    throw new Error("useWizardContext must be used within a WizardProvider");
  }
  return context as WizardContextValue<T>;
}
