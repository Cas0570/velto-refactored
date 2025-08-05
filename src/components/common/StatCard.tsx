// src/components/common/StatCard.tsx

import * as React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { StatCardProps } from "@/lib/types";

const variantStyles = {
  green: {
    background:
      "bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20",
    border: "border-green-200 dark:border-green-800",
    iconBg: "bg-green-500",
    valueColor: "text-green-900 dark:text-green-100",
    labelColor: "text-green-700 dark:text-green-300",
    trendColor: "text-green-600 dark:text-green-400",
  },
  orange: {
    background:
      "bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/20 dark:to-orange-900/20",
    border: "border-orange-200 dark:border-orange-800",
    iconBg: "bg-orange-500",
    valueColor: "text-orange-900 dark:text-orange-100",
    labelColor: "text-orange-700 dark:text-orange-300",
    trendColor: "text-orange-600 dark:text-orange-400",
  },
  cyan: {
    background:
      "bg-gradient-to-br from-cyan-50 to-cyan-100 dark:from-cyan-950/20 dark:to-cyan-900/20",
    border: "border-cyan-200 dark:border-cyan-800",
    iconBg: "bg-cyan-500",
    valueColor: "text-cyan-900 dark:text-cyan-100",
    labelColor: "text-cyan-700 dark:text-cyan-300",
    trendColor: "text-cyan-600 dark:text-cyan-400",
  },
  purple: {
    background:
      "bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/20 dark:to-purple-900/20",
    border: "border-purple-200 dark:border-purple-800",
    iconBg: "bg-purple-500",
    valueColor: "text-purple-900 dark:text-purple-100",
    labelColor: "text-purple-700 dark:text-purple-300",
    trendColor: "text-purple-600 dark:text-purple-400",
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
            {React.cloneElement(
              icon as React.ReactElement<React.SVGProps<SVGSVGElement>>,
              {
                className: "h-5 w-5 text-white",
              }
            )}
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
          {React.cloneElement(
            icon as React.ReactElement<React.SVGProps<SVGSVGElement>>,
            {
              className: "h-4 w-4 text-white",
            }
          )}
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
