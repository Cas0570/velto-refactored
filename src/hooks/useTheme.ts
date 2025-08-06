// src/hooks/useTheme.ts

import { useEffect, useState } from "react";
import type { Theme } from "@/lib/types";
import { THEME_CONFIG } from "@/lib/constants";

/**
 * Custom hook for theme management with persistence
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    // Get theme from localStorage or default to system
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(THEME_CONFIG.STORAGE_KEY) as Theme;
      return stored || THEME_CONFIG.DEFAULT_THEME;
    }
    return THEME_CONFIG.DEFAULT_THEME;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    
    // Remove previous theme classes
    root.classList.remove("light", "dark");
    
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
    
    // Persist theme to localStorage
    localStorage.setItem(THEME_CONFIG.STORAGE_KEY, theme);
  }, [theme]);

  // Listen for system theme changes when theme is set to "system"
  useEffect(() => {
    if (theme !== "system") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      const root = window.document.documentElement;
      root.classList.remove("light", "dark");
      root.classList.add(mediaQuery.matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => {
      switch (prev) {
        case "light":
          return "dark";
        case "dark":
          return "system";
        case "system":
          return "light";
        default:
          return "light";
      }
    });
  };

  const setSpecificTheme = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  // Get the actual applied theme (resolves "system" to "light" or "dark")
  const resolvedTheme = theme === "system" 
    ? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
    : theme;

  return {
    theme,
    resolvedTheme,
    toggleTheme,
    setTheme: setSpecificTheme,
  };
}