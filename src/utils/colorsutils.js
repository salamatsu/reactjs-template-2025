import { cn } from "./cn";

export const getStatusColor = (status, additionalClasses) => {
  const colors = {
    confirmed: "bg-green-100 text-green-800 border-green-200",
    pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    cancelled: "bg-red-100 text-red-800 border-red-200",
    paid: "bg-blue-100 text-blue-800 border-blue-200",
    unpaid: "bg-red-100 text-red-800 border-red-200",
    partial: "bg-orange-100 text-orange-800 border-orange-200",
  };

  const baseColor = colors[status] || "bg-gray-100 text-gray-800 border-gray-200";
  return cn(baseColor, additionalClasses);
};

/**
 * Get badge variant classes based on type
 */
export const getBadgeVariant = (variant = "default", additionalClasses) => {
  const variants = {
    default: "bg-gray-100 text-gray-800 border-gray-200",
    success: "bg-green-100 text-green-800 border-green-200",
    warning: "bg-yellow-100 text-yellow-800 border-yellow-200",
    error: "bg-red-100 text-red-800 border-red-200",
    info: "bg-blue-100 text-blue-800 border-blue-200",
    primary: "bg-red-100 text-red-800 border-red-200",
  };

  return cn(variants[variant] || variants.default, additionalClasses);
};

/**
 * Get button variant classes
 */
export const getButtonVariant = (variant = "default", additionalClasses) => {
  const variants = {
    default: "bg-white text-gray-900 border-gray-300 hover:bg-gray-50",
    primary: "bg-red-600 text-white border-red-600 hover:bg-red-700",
    secondary: "bg-gray-600 text-white border-gray-600 hover:bg-gray-700",
    success: "bg-green-600 text-white border-green-600 hover:bg-green-700",
    danger: "bg-red-600 text-white border-red-600 hover:bg-red-700",
    ghost: "bg-transparent border-gray-300 hover:border-gray-400",
  };

  return cn(variants[variant] || variants.default, additionalClasses);
};
