// src/components/layout/PageContainer.tsx

import { cn } from "@/lib/utils";

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  padding?: "none" | "sm" | "md" | "lg";
}

export function PageContainer({
  children,
  className,
  padding = "md",
}: PageContainerProps) {
  const paddingClasses = {
    none: "",
    sm: "p-2",
    md: "p-4",
    lg: "p-6",
  };

  return (
    <div className={cn("w-full", paddingClasses[padding], className)}>
      {children}
    </div>
  );
}
