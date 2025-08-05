// src/components/layout/NavigationBar.tsx

import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
import type { NavigationBarProps } from "@/lib/types";

export function NavigationBar({
  variant = "bottom",
  className,
}: NavigationBarProps) {
  if (variant === "top") {
    return (
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60 border-b border-border z-50 safe-area-top",
          className
        )}
      >
        <div className="flex justify-around items-center h-16 px-4 max-w-md mx-auto">
          {NAV_ITEMS.map(({ to, icon: Icon, label, badge }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                cn(
                  "flex flex-col items-center justify-center p-2 rounded-lg transition-colors min-w-[60px] relative",
                  "text-muted-foreground hover:text-foreground",
                  isActive && "text-primary bg-primary/10"
                )
              }
            >
              <div className="relative">
                <Icon className="h-5 w-5 mb-1" />
                {badge && badge > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-2 -right-2 h-4 w-4 p-0 text-xs flex items-center justify-center"
                  >
                    {badge > 99 ? "99+" : badge}
                  </Badge>
                )}
              </div>
              <span className="text-xs font-medium">{label}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    );
  }

  return (
    <nav
      className={cn(
        "fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50",
        className
      )}
    >
      <div className="flex justify-around items-center h-16 px-4 max-w-md mx-auto">
        {NAV_ITEMS.map(({ to, icon: Icon, label, badge }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center justify-center p-2 rounded-lg transition-colors min-w-[60px] relative",
                "text-muted-foreground hover:text-foreground",
                isActive && "text-primary bg-primary/10"
              )
            }
          >
            <div className="relative">
              <Icon className="h-5 w-5 mb-1" />
              {badge && badge > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-2 -right-2 h-4 w-4 p-0 text-xs flex items-center justify-center"
                >
                  {badge > 99 ? "99+" : badge}
                </Badge>
              )}
            </div>
            <span className="text-xs font-medium">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
