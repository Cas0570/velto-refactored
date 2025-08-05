// src/components/layout/Section.tsx

import { cn } from "@/lib/utils";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  description?: string;
  spacing?: "none" | "sm" | "md" | "lg" | "xl";
}

export function Section({
  children,
  className,
  title,
  description,
  spacing = "md",
}: SectionProps) {
  const spacingClasses = {
    none: "",
    sm: "space-y-2",
    md: "space-y-4",
    lg: "space-y-6",
    xl: "space-y-8",
  };

  return (
    <section className={cn("w-full", spacingClasses[spacing], className)}>
      {(title || description) && (
        <div className="space-y-1">
          {title && (
            <h2 className="text-heading-2 font-semibold text-foreground">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-body text-muted-foreground">{description}</p>
          )}
        </div>
      )}
      {children}
    </section>
  );
}
