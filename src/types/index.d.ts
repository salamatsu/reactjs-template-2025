/**
 * Type definitions for the optimized template
 * Provides better IDE support and type safety
 */

// Socket.IO Types
export interface SocketContextType {
  socket: any;
  isConnected: boolean;
  lastMessage: any;
  emit: (event: string, data?: any) => void;
  on: (event: string, callback: (data: any) => void) => void;
  off: (event: string, callback?: (data: any) => void) => void;
}

// Form Validation Types
export interface ValidationResult {
  success: boolean;
  errors: Record<string, string>;
}

export interface AntdFieldError {
  name: string[];
  errors: string[];
}

// Status Types
export type StatusType =
  | "confirmed"
  | "pending"
  | "cancelled"
  | "paid"
  | "unpaid"
  | "partial";

// Badge Variant Types
export type BadgeVariant =
  | "default"
  | "success"
  | "warning"
  | "error"
  | "info"
  | "primary";

// Button Variant Types
export type ButtonVariant =
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "ghost";

// Navigation Types
export interface NavigationItem {
  route: string;
  name: string;
  label: string;
  icon: React.ReactNode;
  component: React.ReactNode;
  isFilter: boolean;
  isShow: boolean;
}

// Schema Types
export interface LoginFormData {
  email: string;
  password: string;
  remember?: boolean;
}

export interface BranchFormData {
  branchCode: string;
  branchName: string;
  address: string;
  city?: string;
  region?: string;
  contactNumber?: string;
  email?: string;
  operatingHours?: string;
  isActive: boolean;
  amenities?: string[];
}

export interface BookingFormData {
  guestName: string;
  guestEmail: string;
  guestPhone?: string;
  checkIn: Date;
  checkOut: Date;
  roomType: string;
  numberOfGuests: number;
  specialRequests?: string;
}

export interface UserProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  avatar?: string;
}

// Utility Types
export type ClassValue =
  | string
  | number
  | boolean
  | undefined
  | null
  | ClassValue[]
  | { [key: string]: any };

// Error Boundary Types
export interface ErrorBoundaryProps {
  children: React.ReactNode;
}

export interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

// Loading Types
export interface LoadingFallbackProps {
  tip?: string;
}

// Sentry Config Types
export interface SentryConfig {
  dsn?: string;
  environment: string;
  enabled: boolean;
  tracesSampleRate: number;
  replaysSessionSampleRate: number;
  replaysOnErrorSampleRate: number;
}

declare module "*.jpg" {
  const content: string;
  export default content;
}

declare module "*.png" {
  const content: string;
  export default content;
}

declare module "*.svg" {
  const content: string;
  export default content;
}
