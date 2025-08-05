// src/components/common/EmptyState.tsx

import { cn } from "@/lib/utils";
import type { EmptyStateProps } from "@/lib/types";

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-12",
        className
      )}
    >
      {icon && (
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-medium text-foreground mb-2">{title}</h3>
      {description && (
        <p className="text-muted-foreground text-center max-w-sm mb-4">
          {description}
        </p>
      )}
      {action}
    </div>
  );
}
