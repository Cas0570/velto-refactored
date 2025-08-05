// src/lib/types.ts

/* eslint-disable @typescript-eslint/no-explicit-any */

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaymentRequest {
  id: string;
  userId: string;
  title: string;
  description?: string;
  amount: number;
  currency: string;
  status: PaymentRequestStatus;
  paymentMethods: PaymentMethod[];
  shareableUrl: string;
  qrCodeUrl?: string;
  createdAt: string;
  updatedAt: string;
  paidAt?: string;
  expiresAt?: string;
}

export type PaymentRequestStatus =
  | "draft"
  | "active"
  | "paid"
  | "expired"
  | "cancelled";

export interface PaymentMethod {
  id: string;
  type: PaymentMethodType;
  label: string;
  description: string;
  icon: string;
  url: string;
  accountName?: string;
  isConnected: boolean;
}

export type PaymentMethodType =
  | "tikkie"
  | "paypal"
  | "mollie"
  | "ideal"
  | "bancontact"
  | "bank-transfer";

export interface BrandingSettings {
  id: string;
  userId: string;
  brandName: string;
  logoUrl?: string;
  primaryColor: string;
  backgroundColor?: string;
  textColor?: string;
}

export interface Statistics {
  totalRequests: number;
  totalAmount: number;
  paidRequests: number;
  paidAmount: number;
  pendingRequests: number;
  pendingAmount: number;
  successRate: number;
  thisMonthAmount: number;
}

// Form types
export interface CreateRequestForm {
  amount: string;
  description: string;
  paymentMethods: string[];
}

export interface OnboardingForm {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  paymentMethods: string[];
  connectedAccounts: Record<string, string>;
}

export interface ProfileForm {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
}

// UI Component types
export interface StatCardProps {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  variant: "green" | "orange" | "cyan" | "purple";
  trend?: {
    value: string | number;
    positive: boolean;
  };
  centered?: boolean;
}

export interface RequestCardProps {
  request: PaymentRequest;
  variant?: "default" | "compact";
  onAction?: (action: string, requestId: string) => void;
}

export interface HeaderProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  showAvatar?: boolean;
  onAvatarClick?: () => void;
}

export interface ExtendedHeaderProps extends HeaderProps {
  variant?: "default" | "centered" | "minimal";
  showBackButton?: boolean;
  onBackClick?: () => void;
  avatarSrc?: string;
  avatarFallback?: string;
  className?: string;
}

// Navigation types
export interface NavItem {
  to: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  badge?: number;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Theme types
export type Theme = "light" | "dark" | "system";

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
  className?: string;
}

export interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export interface LoadingStateProps {
  title?: string;
  description?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export interface ProgressStepsProps {
  steps: Array<{ id: string; title: string; description?: string }>;
  currentStep: string;
  className?: string;
}

export interface StatusBadgeProps {
  status: PaymentRequestStatus;
  className?: string;
}

export interface AppLayoutProps {
  children: React.ReactNode;
  className?: string;
  showNavigation?: boolean;
  navigationVariant?: "bottom" | "top";
}

export interface GridProps {
  children: React.ReactNode;
  className?: string;
  cols?: 1 | 2 | 3 | 4 | 6;
  gap?: "none" | "sm" | "md" | "lg";
  responsive?: boolean;
}

export interface MobileLayoutProps {
  children: React.ReactNode;
  className?: string;
  showNavigation?: boolean;
  maxWidth?: "sm" | "md" | "lg" | "full";
}

export interface NavigationBarProps {
  variant?: "top" | "bottom";
  className?: string;
}

export interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  padding?: "none" | "sm" | "md" | "lg";
}

export interface SectionProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  description?: string;
  spacing?: "none" | "sm" | "md" | "lg" | "xl";
}

export interface StackProps {
  children: React.ReactNode;
  className?: string;
  spacing?: "none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  align?: "start" | "center" | "end" | "stretch";
  direction?: "vertical" | "horizontal";
}

// Step types for multi-step forms
export interface StepProps<T = any> {
  data: T;
  onChange: (data: Partial<T>) => void;
  onNext: () => void;
  onBack: () => void;
  canProceed: boolean;
}

export type Step = {
  id: string;
  title: string;
  description?: string;
  component: React.ComponentType<StepProps>;
};

// Error types
export interface AppError {
  code: string;
  message: string;
  details?: any;
}
