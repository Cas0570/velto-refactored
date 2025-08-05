// src/components/common/Header.tsx

import { cn } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import type { HeaderProps } from "@/lib/types";
import { ArrowLeft } from "lucide-react";

interface ExtendedHeaderProps extends HeaderProps {
  variant?: "default" | "centered" | "minimal";
  showBackButton?: boolean;
  onBackClick?: () => void;
  avatarSrc?: string;
  avatarFallback?: string;
  className?: string;
}

export function Header({
  title,
  subtitle,
  children,
  variant = "default",
  showAvatar = true,
  showBackButton = false,
  onBackClick,
  onAvatarClick,
  avatarSrc,
  avatarFallback = "U",
  className,
}: ExtendedHeaderProps) {
  if (variant === "minimal") {
    return (
      <header className={cn("py-4", className)}>
        <div className="flex items-center justify-between mb-4">
          {showBackButton && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onBackClick}
              className="mr-2"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          )}
          <h1 className="text-heading-2 font-bold text-foreground flex-1">
            {title}
          </h1>
        </div>
        {children}
      </header>
    );
  }

  if (variant === "centered") {
    return (
      <header className={cn("py-6 text-center", className)}>
        {showAvatar && (
          <Avatar
            className="w-16 h-16 mx-auto mb-4 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={onAvatarClick}
          >
            <AvatarImage src={avatarSrc} />
            <AvatarFallback className="bg-primary text-primary-foreground text-lg">
              {avatarFallback}
            </AvatarFallback>
          </Avatar>
        )}
        <h1 className="text-heading-1 font-bold text-foreground mb-2">
          {title}
        </h1>
        {subtitle && (
          <p className="text-body text-muted-foreground mb-6">{subtitle}</p>
        )}
        {children}
      </header>
    );
  }

  // Default variant
  return (
    <header className={cn("py-4", className)}>
      <div className="flex items-start justify-between mb-6">
        <div className="flex-1">
          {showBackButton && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onBackClick}
              className="mb-3 -ml-2"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Terug
            </Button>
          )}
          <h1 className="text-heading-1 font-bold text-foreground mb-2">
            {title}
          </h1>
          {subtitle && (
            <p className="text-body text-muted-foreground">{subtitle}</p>
          )}
        </div>
        {showAvatar && (
          <Avatar
            className="w-12 h-12 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={onAvatarClick}
          >
            <AvatarImage src={avatarSrc} />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {avatarFallback}
            </AvatarFallback>
          </Avatar>
        )}
      </div>
      {children}
    </header>
  );
}
