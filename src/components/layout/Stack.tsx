// src/components/layout/Stack.tsx

import { cn } from "@/lib/utils";
import type { StackProps } from "@/lib/types";

export function Stack({
  children,
  className,
  spacing = "md",
  align = "stretch",
  direction = "vertical",
}: StackProps) {
  const spacingClasses = {
    none: "",
    xs: direction === "vertical" ? "space-y-1" : "space-x-1",
    sm: direction === "vertical" ? "space-y-2" : "space-x-2",
    md: direction === "vertical" ? "space-y-4" : "space-x-4",
    lg: direction === "vertical" ? "space-y-6" : "space-x-6",
    xl: direction === "vertical" ? "space-y-8" : "space-x-8",
    "2xl": direction === "vertical" ? "space-y-12" : "space-x-12",
  };

  const alignClasses = {
    start: direction === "vertical" ? "items-start" : "justify-start",
    center: direction === "vertical" ? "items-center" : "justify-center",
    end: direction === "vertical" ? "items-end" : "justify-end",
    stretch: direction === "vertical" ? "items-stretch" : "justify-stretch",
  };

  const directionClasses = {
    vertical: "flex flex-col",
    horizontal: "flex flex-row",
  };

  return (
    <div
      className={cn(
        directionClasses[direction],
        spacingClasses[spacing],
        alignClasses[align],
        className
      )}
    >
      {children}
    </div>
  );
}
