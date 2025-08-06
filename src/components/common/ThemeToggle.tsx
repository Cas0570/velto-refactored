// src/components/common/ThemeToggle.tsx

import { Sun, Moon, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useThemeContext } from "./ThemeProvider";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  variant?: "button" | "icon" | "selector";
  className?: string;
}

/**
 * Theme toggle component with multiple variants
 */
export function ThemeToggle({
  variant = "button",
  className,
}: ThemeToggleProps) {
  const { theme, toggleTheme, setTheme } = useThemeContext();

  const getThemeIcon = (currentTheme: string) => {
    switch (currentTheme) {
      case "light":
        return <Sun className="w-4 h-4" />;
      case "dark":
        return <Moon className="w-4 h-4" />;
      case "system":
        return <Monitor className="w-4 h-4" />;
      default:
        return <Sun className="w-4 h-4" />;
    }
  };

  const getThemeLabel = (currentTheme: string) => {
    switch (currentTheme) {
      case "light":
        return "Licht";
      case "dark":
        return "Donker";
      case "system":
        return "Systeem";
      default:
        return "Licht";
    }
  };

  if (variant === "icon") {
    return (
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleTheme}
        className={cn("h-9 w-9", className)}
        title={`Huidige thema: ${getThemeLabel(theme)}`}
      >
        {getThemeIcon(theme)}
      </Button>
    );
  }

  if (variant === "selector") {
    return (
      <div className={cn("flex items-center", className)}>
        <div className="flex rounded-lg border p-1 space-x-0.5">
          {(["light", "dark", "system"] as const).map((themeOption) => (
            <Button
              key={themeOption}
              variant={theme === themeOption ? "default" : "ghost"}
              size="sm"
              onClick={() => setTheme(themeOption)}
              className="h-8 px-3"
            >
              <span className="mr-2">{getThemeIcon(themeOption)}</span>
              {getThemeLabel(themeOption)}
            </Button>
          ))}
        </div>
      </div>
    );
  }

  // Default button variant
  return (
    <Button
      variant="outline"
      onClick={toggleTheme}
      className={cn("flex items-center space-x-2", className)}
    >
      {getThemeIcon(theme)}
      <span>{getThemeLabel(theme)}</span>
    </Button>
  );
}
