// src/components/layout/MobileLayout.tsx

import { AppLayout } from "@/components/layout/AppLayout";
import { cn } from "@/lib/utils";
import type { MobileLayoutProps } from "@/lib/types";

export function MobileLayout({
  children,
  className,
  showNavigation = true,
  maxWidth = "sm",
}: MobileLayoutProps) {
  const maxWidthClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    full: "max-w-full",
  };

  return (
    <AppLayout showNavigation={showNavigation}>
      <div className={cn("mx-auto px-4", maxWidthClasses[maxWidth], className)}>
        {children}
      </div>
    </AppLayout>
  );
}
