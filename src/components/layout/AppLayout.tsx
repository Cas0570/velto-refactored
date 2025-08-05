// src/components/layout/AppLayout.tsx

import * as React from "react";
import { cn } from "@/lib/utils";
import { NavigationBar } from "./NavigationBar";

interface AppLayoutProps {
  children: React.ReactNode;
  className?: string;
  showNavigation?: boolean;
  navigationVariant?: "bottom" | "top";
}

export function AppLayout({
  children,
  className,
  showNavigation = true,
  navigationVariant = "bottom",
}: AppLayoutProps) {
  return (
    <div className={cn("min-h-screen bg-background", className)}>
      <div className="max-w-md lg:max-w-6xl xl:max-w-[1920px] mx-auto bg-background min-h-screen relative">
        {/* Top Navigation */}
        {showNavigation && navigationVariant === "top" && (
          <NavigationBar variant="top" />
        )}

        {/* Main Content */}
        <main
          className={cn(
            "flex-1",
            showNavigation &&
              navigationVariant === "bottom" &&
              "pb-16 safe-area-bottom",
            showNavigation &&
              navigationVariant === "top" &&
              "pt-16 safe-area-top"
          )}
        >
          {children}
        </main>

        {/* Bottom Navigation */}
        {showNavigation && navigationVariant === "bottom" && (
          <NavigationBar variant="bottom" />
        )}
      </div>
    </div>
  );
}

// src/components/layout/MobileLayout.tsx

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

// src/components/layout/PageContainer.tsx

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

// src/components/layout/Section.tsx

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

// src/components/layout/Grid.tsx

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

// src/components/layout/Stack.tsx

interface StackProps {
  children: React.ReactNode;
  className?: string;
  spacing?: "none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  align?: "start" | "center" | "end" | "stretch";
  direction?: "vertical" | "horizontal";
}

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
