// src/components/common/StatCard.tsx

import * as React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { StatCardProps } from "@/lib/types";

const variantStyles = {
  success: {
    background:
      "bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20",
    border: "border-green-200 dark:border-green-800",
    iconBg: "bg-success",
    valueColor: "text-green-900 dark:text-green-100",
    labelColor: "text-green-700 dark:text-green-300",
    trendColor: "text-green-600 dark:text-green-400",
  },
  warning: {
    background:
      "bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/20 dark:to-orange-900/20",
    border: "border-orange-200 dark:border-orange-800",
    iconBg: "bg-warning",
    valueColor: "text-orange-900 dark:text-orange-100",
    labelColor: "text-orange-700 dark:text-orange-300",
    trendColor: "text-orange-600 dark:text-orange-400",
  },
  info: {
    background:
      "bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20",
    border: "border-blue-200 dark:border-blue-800",
    iconBg: "bg-blue-500",
    valueColor: "text-blue-900 dark:text-blue-100",
    labelColor: "text-blue-700 dark:text-blue-300",
    trendColor: "text-blue-600 dark:text-blue-400",
  },
  primary: {
    background: "bg-gradient-to-br from-primary/10 to-primary/5",
    border: "border-primary/20",
    iconBg: "bg-primary",
    valueColor: "text-primary-foreground",
    labelColor: "text-foreground",
    trendColor: "text-primary",
  },
};

export function StatCard({
  icon,
  value,
  label,
  variant,
  trend,
  centered = false,
  className,
  ...props
}: StatCardProps & React.HTMLAttributes<HTMLDivElement>) {
  const styles = variantStyles[variant];

  if (centered) {
    return (
      <Card
        className={cn(
          "min-h-[100px] p-4 flex items-center justify-center transition-all hover:shadow-md",
          styles.background,
          styles.border,
          className
        )}
        {...props}
      >
        <div className="flex flex-col items-center text-center space-y-2">
          <div
            className={cn(
              "p-2 rounded-lg flex items-center justify-center",
              styles.iconBg
            )}
          >
            {React.cloneElement(icon as React.ReactElement, {
              className: "h-5 w-5 text-white",
            })}
          </div>
          <div>
            <p className={cn("text-2xl font-bold mb-1", styles.valueColor)}>
              {value}
            </p>
            <p className={cn("text-xs", styles.labelColor)}>{label}</p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card
      className={cn(
        "p-4 transition-all hover:shadow-md",
        styles.background,
        styles.border,
        className
      )}
      {...props}
    >
      <div className="flex items-start justify-between mb-3">
        <div className={cn("p-2 rounded-lg", styles.iconBg)}>
          {React.cloneElement(icon as React.ReactElement, {
            className: "h-4 w-4 text-white",
          })}
        </div>
        {trend && (
          <Badge
            variant="outline"
            className={cn(
              "flex items-center space-x-1 border-current",
              styles.trendColor
            )}
          >
            {trend.positive ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )}
            <span className="text-xs font-medium">{trend.value}</span>
          </Badge>
        )}
      </div>
      <div>
        <p className={cn("text-2xl font-bold mb-1", styles.valueColor)}>
          {value}
        </p>
        <p className={cn("text-xs", styles.labelColor)}>{label}</p>
      </div>
    </Card>
  );
}
