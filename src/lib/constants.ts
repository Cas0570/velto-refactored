// src/lib/constants.ts

import type { PaymentMethod, NavItem } from "./types";
import { Home, FileText, User } from "lucide-react";

// App Configuration
export const APP_CONFIG = {
  name: "Velto",
  tagline: "Verzoek. Betaal. Klaar.",
  version: "1.0.0",
  supportEmail: "support@velto.app",
  websiteUrl: "https://velto.app",
} as const;

// Routing
export const ROUTES = {
  WELCOME: "/",
  ONBOARDING: "/onboarding",
  HOME: "/home",
  DASHBOARD: "/verzoeken",
  NEW_REQUEST: "/nieuw-verzoek",
  PROFILE: "/profiel",
  BRANDING: "/branding",
  PAYMENT: "/betaling",
  NOT_FOUND: "*",
} as const;

// Navigation Items
export const NAV_ITEMS: NavItem[] = [
  { to: ROUTES.HOME, icon: Home, label: "Home" },
  { to: ROUTES.DASHBOARD, icon: FileText, label: "Verzoeken" },
  { to: ROUTES.PROFILE, icon: User, label: "Profiel" },
];

// Payment Methods Configuration
export const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: "tikkie",
    type: "tikkie",
    label: "Tikkie",
    description: "Nederlandse banken",
    icon: "🏦",
    url: "",
    isConnected: false,
  },
  {
    id: "paypal",
    type: "paypal",
    label: "PayPal",
    description: "Wereldwijd beschikbaar",
    icon: "💳",
    url: "",
    isConnected: false,
  },
  {
    id: "ideal",
    type: "ideal",
    label: "iDEAL",
    description: "Nederlandse banken",
    icon: "🇳🇱",
    url: "",
    isConnected: false,
  },
  {
    id: "mollie",
    type: "mollie",
    label: "Mollie",
    description: "iDEAL, creditcard en meer",
    icon: "🔷",
    url: "",
    isConnected: false,
  },
  {
    id: "bancontact",
    type: "bancontact",
    label: "Bancontact",
    description: "Belgische banken",
    icon: "🇧🇪",
    url: "",
    isConnected: false,
  },
  {
    id: "bank-transfer",
    type: "bank-transfer",
    label: "Bankoverschrijving",
    description: "Handmatige betaling",
    icon: "🏛️",
    url: "",
    isConnected: false,
  },
];

// Theme Configuration
export const THEME_CONFIG = {
  DEFAULT_THEME: "light" as const,
  STORAGE_KEY: "velto-theme",
};

// Brand Colors (for branding settings)
export const BRAND_COLORS = [
  "#43D478", // Velto mint (default)
  "#3B82F6", // Blue
  "#EF4444", // Red
  "#F59E0B", // Orange
  "#8B5CF6", // Purple
  "#10B981", // Emerald
  "#F97316", // Orange
  "#EC4899", // Pink
] as const;

// Form Validation
export const VALIDATION = {
  MIN_AMOUNT: 0.01,
  MAX_AMOUNT: 10000,
  MIN_DESCRIPTION_LENGTH: 3,
  MAX_DESCRIPTION_LENGTH: 100,
  MIN_NAME_LENGTH: 2,
  MAX_NAME_LENGTH: 50,
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  USER: "velto-user",
  THEME: "velto-theme",
  DRAFT_REQUEST: "velto-draft-request",
  ONBOARDING_PROGRESS: "velto-onboarding-progress",
} as const;

// Animation Durations (in ms)
export const ANIMATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
} as const;

// Breakpoints (matching Tailwind)
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  "2XL": 1536,
} as const;

// Status Colors
export const STATUS_COLORS = {
  draft: "muted",
  active: "warning",
  paid: "success",
  expired: "destructive",
  cancelled: "muted",
} as const;

// Mock Data for Development
export const MOCK_DATA = {
  USER: {
    id: "1",
    firstName: "Jan",
    lastName: "Jansen",
    email: "jan@voorbeeld.nl",
    phone: "+31 6 12345678",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  PAYMENT_REQUESTS: [
    {
      id: "1",
      userId: "1",
      title: "Oppassen op 27 juli",
      description: "Oppassen van 19:00 tot 23:00",
      amount: 22.5,
      currency: "EUR",
      status: "paid" as const,
      paymentMethods: [],
      shareableUrl: "/betaling/1",
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
      updatedAt: new Date().toISOString(),
      paidAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    },
    {
      id: "2",
      userId: "1",
      title: "Website onderhoud",
      description: "Maandelijks onderhoud website",
      amount: 125.0,
      currency: "EUR",
      status: "active" as const,
      paymentMethods: [],
      shareableUrl: "/betaling/2",
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
      updatedAt: new Date().toISOString(),
    },
    {
      id: "3",
      userId: "1",
      title: "Tuinwerk weekend",
      description: "Onkruid wieden en planten water geven",
      amount: 45.0,
      currency: "EUR",
      status: "expired" as const,
      paymentMethods: [],
      shareableUrl: "/betaling/3",
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 week ago
      updatedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // expired 1 day ago
    },
  ],
  STATISTICS: {
    totalRequests: 12,
    totalAmount: 1247.8,
    paidRequests: 8,
    paidAmount: 847.5,
    pendingRequests: 3,
    pendingAmount: 324.5,
    successRate: 92,
    thisMonthAmount: 324.5,
  },
} as const;
