// src/components/common/StatusBadge.tsx

import type { PaymentRequestStatus } from "@/lib/types";
import { getStatusInfo } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: PaymentRequestStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const statusInfo = getStatusInfo(status);

  return (
    <Badge className={cn(statusInfo.bgColor, statusInfo.color, className)}>
      {statusInfo.label}
    </Badge>
  );
}
