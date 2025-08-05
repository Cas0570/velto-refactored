// src/lib/utils.ts

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { PaymentRequestStatus } from "./types";

/**
 * Combines class names using clsx and tailwind-merge
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format currency amount
 */
export function formatCurrency(
  amount: number,
  currency: string = "EUR",
  locale: string = "nl-NL"
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(amount);
}

/**
 * Format date relative to now (e.g., "2 dagen geleden")
 */
export function formatRelativeDate(date: string | Date): string {
  const now = new Date();
  const targetDate = new Date(date);
  const diffInSeconds = Math.floor(
    (now.getTime() - targetDate.getTime()) / 1000
  );

  if (diffInSeconds < 60) {
    return "Nu";
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} ${
      diffInMinutes === 1 ? "minuut" : "minuten"
    } geleden`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} ${diffInHours === 1 ? "uur" : "uur"} geleden`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays} ${diffInDays === 1 ? "dag" : "dagen"} geleden`;
  }

  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) {
    return `${diffInWeeks} ${diffInWeeks === 1 ? "week" : "weken"} geleden`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  return `${diffInMonths} ${diffInMonths === 1 ? "maand" : "maanden"} geleden`;
}

/**
 * Format date in Dutch format (dd-mm-yyyy)
 */
export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat("nl-NL", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(date));
}

/**
 * Get status display info (color, text)
 */
export function getStatusInfo(status: PaymentRequestStatus) {
  const statusMap = {
    draft: {
      label: "Concept",
      variant: "secondary" as const,
      color: "text-muted-foreground",
      bgColor: "bg-muted",
    },
    active: {
      label: "Verstuurd",
      variant: "default" as const,
      color: "text-orange-700 dark:text-orange-300",
      bgColor: "bg-orange-100 dark:bg-orange-900/20",
    },
    paid: {
      label: "Betaald",
      variant: "success" as const,
      color: "text-green-700 dark:text-green-300",
      bgColor: "bg-green-100 dark:bg-green-900/20",
    },
    expired: {
      label: "Verlopen",
      variant: "destructive" as const,
      color: "text-red-700 dark:text-red-300",
      bgColor: "bg-red-100 dark:bg-red-900/20",
    },
    cancelled: {
      label: "Geannuleerd",
      variant: "secondary" as const,
      color: "text-muted-foreground",
      bgColor: "bg-muted",
    },
  };

  return statusMap[status] || statusMap.draft;
}

/**
 * Generate a unique ID
 */
export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

/**
 * Validate email address
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate phone number (Dutch format)
 */
export function isValidPhoneNumber(phone: string): boolean {
  const phoneRegex = /^(\+31|0031|0)[6-9]\d{8}$/;
  return phoneRegex.test(phone.replace(/\s|-/g, ""));
}

/**
 * Format phone number to Dutch format
 */
export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\s|-/g, "");
  if (cleaned.startsWith("+31")) {
    return cleaned.replace("+31", "+31 ").replace(/(\d{1})(\d{8})/, "$1 $2");
  }
  if (cleaned.startsWith("06")) {
    return cleaned.replace(/(\d{2})(\d{8})/, "$1 $2");
  }
  return phone;
}

/**
 * Truncate text with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}

/**
 * Get initials from name
 */
export function getInitials(firstName: string, lastName?: string): string {
  const first = firstName?.charAt(0)?.toUpperCase() || "";
  const last = lastName?.charAt(0)?.toUpperCase() || "";
  return `${first}${last}`.slice(0, 2);
}

/**
 * Calculate percentage
 */
export function calculatePercentage(value: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
}

/**
 * Debounce function
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Copy text to clipboard
 */
export async function copyToClipboard(
  text: string,
  onSuccess?: () => void,
  onError?: (error: Error) => void
): Promise<void> {
  try {
    await navigator.clipboard.writeText(text);
    onSuccess?.();
  } catch (error) {
    onError?.(error as Error);
  }
}

/**
 * Share using Web Share API or fallback to copy
 */
export async function shareContent(
  shareData: ShareData,
  fallbackText: string
): Promise<void> {
  if (navigator.share && navigator.canShare(shareData)) {
    try {
      await navigator.share(shareData);
    } catch (error) {
      // User cancelled or error occurred
      console.warn("Share failed:", error);
    }
  } else {
    // Fallback to copy to clipboard
    await copyToClipboard(fallbackText);
  }
}

/**
 * Check if device is mobile
 */
export function isMobile(): boolean {
  return window.innerWidth < 768;
}

/**
 * Get random item from array
 */
export function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Sleep function for async operations
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Format bytes to human readable size
 */
export function formatBytes(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

/**
 * Generate QR code URL (placeholder for actual QR service)
 */
export function generateQRCodeUrl(url: string, size: number = 200): string {
  // In a real app, you'd use a QR code service like qr-server.com or generate locally
  return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(
    url
  )}`;
}

/**
 * Validate amount input
 */
export function validateAmount(amount: string): {
  isValid: boolean;
  error?: string;
} {
  const numAmount = parseFloat(amount);

  if (isNaN(numAmount)) {
    return { isValid: false, error: "Voer een geldig bedrag in" };
  }

  if (numAmount <= 0) {
    return { isValid: false, error: "Bedrag moet groter zijn dan €0" };
  }

  if (numAmount > 10000) {
    return { isValid: false, error: "Bedrag mag niet hoger zijn dan €10.000" };
  }

  return { isValid: true };
}

/**
 * Local storage helpers with error handling
 */
export const storage = {
  get: <T>(key: string, defaultValue?: T): T | null => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue ?? null;
    } catch {
      return defaultValue ?? null;
    }
  },

  set: <T>(key: string, value: T): boolean => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  },

  remove: (key: string): boolean => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch {
      return false;
    }
  },

  clear: (): boolean => {
    try {
      localStorage.clear();
      return true;
    } catch {
      return false;
    }
  },
};
