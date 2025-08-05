// src/components/layout/Grid.tsx

import { cn } from "@/lib/utils";

interface GridProps {
  children: React.ReactNode;
  className?: string;
  cols?: 1 | 2 | 3 | 4 | 6;
  gap?: "none" | "sm" | "md" | "lg";
  responsive?: boolean;
}

export function Grid({
  children,
  className,
  cols = 2,
  gap = "md",
  responsive = true,
}: GridProps) {
  const colsClasses = {
    1: "grid-cols-1",
    2: responsive ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-2",
    3: responsive ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-3",
    4: responsive ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" : "grid-cols-4",
    6: responsive ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-6" : "grid-cols-6",
  };

  const gapClasses = {
    none: "gap-0",
    sm: "gap-2",
    md: "gap-4",
    lg: "gap-6",
  };

  return (
    <div className={cn("grid", colsClasses[cols], gapClasses[gap], className)}>
      {children}
    </div>
  );
}
