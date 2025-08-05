// src/components/common/StatusBadge.tsx

import type { StatusBadgeProps } from "@/lib/types";
import { getStatusInfo } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const statusInfo = getStatusInfo(status);

  return (
    <Badge className={cn(statusInfo.bgColor, statusInfo.color, className)}>
      {statusInfo.label}
    </Badge>
  );
}
