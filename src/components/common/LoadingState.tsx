// src/components/common/LoadingState.tsx

import { LoadingSpinner } from "./LoadingSpinner";
import { cn } from "@/lib/utils";

interface LoadingStateProps {
  title?: string;
  description?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function LoadingState({
  title = "Laden...",
  description,
  size = "md",
  className,
}: LoadingStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-8",
        className
      )}
    >
      <LoadingSpinner size={size} className="mb-4" />
      <h3 className="text-sm font-medium text-foreground mb-1">{title}</h3>
      {description && (
        <p className="text-xs text-muted-foreground text-center max-w-sm">
          {description}
        </p>
      )}
    </div>
  );
}
