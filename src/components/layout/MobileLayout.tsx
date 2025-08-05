// src/components/layout/MobileLayout.tsx

import { AppLayout } from "@/components/layout/AppLayout";
import { cn } from "@/lib/utils";

interface MobileLayoutProps {
  children: React.ReactNode;
  className?: string;
  showNavigation?: boolean;
  maxWidth?: "sm" | "md" | "lg" | "full";
}

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
