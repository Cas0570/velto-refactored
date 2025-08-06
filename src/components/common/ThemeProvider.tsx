// src/components/common/ThemeProvider.tsx

import React, { createContext, useContext } from "react";
import { useTheme } from "@/hooks/useTheme";
import type { Theme } from "@/lib/types";

interface ThemeContextType {
  theme: Theme;
  resolvedTheme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

/**
 * Theme provider component that manages theme state and persistence
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const themeState = useTheme();

  return (
    <ThemeContext.Provider value={themeState}>{children}</ThemeContext.Provider>
  );
}

/**
 * Hook to access theme context
 */
// eslint-disable-next-line react-refresh/only-export-components
export function useThemeContext(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return context;
}
