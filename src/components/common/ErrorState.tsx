// src/components/common/ErrorState.tsx

import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ErrorStateProps } from "@/lib/types";

export function ErrorState({
  title = "Er ging iets mis",
  description = "Probeer het opnieuw of neem contact op met de support.",
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-8",
        className
      )}
    >
      <div className="w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center mb-4">
        <AlertCircle className="h-6 w-6 text-destructive" />
      </div>
      <h3 className="text-sm font-medium text-foreground mb-1">{title}</h3>
      <p className="text-xs text-muted-foreground text-center max-w-sm mb-4">
        {description}
      </p>
      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Opnieuw proberen
        </Button>
      )}
    </div>
  );
}
