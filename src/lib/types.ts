// src/lib/types.ts

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

// Step types for multi-step forms
// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  details?: any;
}
