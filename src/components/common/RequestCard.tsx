// src/components/common/RequestCard.tsx

import * as React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Clock,
  MoreVertical,
  Copy,
  Send,
  Trash2,
  Eye,
  CheckCircle,
  AlertCircle,
  XCircle,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import type { RequestCardProps } from "@/lib/types";
import { formatCurrency, formatRelativeDate, getStatusInfo } from "@/lib/utils";

const statusIcons = {
  draft: Clock,
  active: Send,
  paid: CheckCircle,
  expired: XCircle,
  cancelled: AlertCircle,
};

export function RequestCard({
  request,
  variant = "default",
  onAction,
  className,
  ...props
}: RequestCardProps & React.HTMLAttributes<HTMLDivElement>) {
  const statusInfo = getStatusInfo(request.status);
  const StatusIcon = statusIcons[request.status];

  const handleAction = (action: string) => {
    onAction?.(action, request.id);
  };

  if (variant === "compact") {
    return (
      <Card
        className={cn(
          "p-4 hover:shadow-md transition-all cursor-pointer",
          className
        )}
        {...props}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            <div className="p-2 bg-muted rounded-lg shrink-0">
              <StatusIcon className={cn("h-4 w-4", statusInfo.color)} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-medium text-foreground truncate">
                {request.title}
              </p>
              <p className="text-sm text-muted-foreground">
                {formatCurrency(request.amount, request.currency)}
              </p>
            </div>
          </div>
          <Badge
            className={cn(
              "ml-2 shrink-0",
              statusInfo.bgColor,
              statusInfo.color
            )}
          >
            {statusInfo.label}
          </Badge>
        </div>
      </Card>
    );
  }

  return (
    <Card
      className={cn("p-4 hover:shadow-md transition-all", className)}
      {...props}
    >
      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3 flex-1 min-w-0">
            <div className="p-2 bg-muted rounded-lg shrink-0">
              <StatusIcon className={cn("h-4 w-4", statusInfo.color)} />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-medium text-foreground truncate">
                {request.title}
              </h3>
              {request.description && (
                <p className="text-sm text-muted-foreground truncate">
                  {request.description}
                </p>
              )}
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="shrink-0">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleAction("view")}>
                <Eye className="h-4 w-4 mr-2" />
                Bekijken
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleAction("copy")}>
                <Copy className="h-4 w-4 mr-2" />
                Link kopiëren
              </DropdownMenuItem>
              {request.status === "active" && (
                <DropdownMenuItem onClick={() => handleAction("remind")}>
                  <Send className="h-4 w-4 mr-2" />
                  Herinnering sturen
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onClick={() => handleAction("delete")}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Verwijderen
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Amount and Status */}
        <div className="flex items-end justify-between">
          <div>
            <p className="text-2xl font-bold text-foreground">
              {formatCurrency(request.amount, request.currency)}
            </p>
            <p className="text-sm text-muted-foreground">
              {formatRelativeDate(request.createdAt)}
            </p>
          </div>

          <Badge className={cn(statusInfo.bgColor, statusInfo.color)}>
            {statusInfo.label}
          </Badge>
        </div>

        {/* Progress or additional info */}
        {request.status === "active" && request.expiresAt && (
          <div className="pt-2 border-t border-border">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Vervalt:</span>
              <span className="text-foreground">
                {formatRelativeDate(request.expiresAt)}
              </span>
            </div>
          </div>
        )}

        {request.status === "paid" && request.paidAt && (
          <div className="pt-2 border-t border-border">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Betaald:</span>
              <span className="text-success">
                {formatRelativeDate(request.paidAt)}
              </span>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
