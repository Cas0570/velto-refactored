// src/components/layout/AppLayout.tsx

import { cn } from "@/lib/utils";
import { NavigationBar } from "./NavigationBar";
import type { AppLayoutProps } from "@/lib/types";

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
