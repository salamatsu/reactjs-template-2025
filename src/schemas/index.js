import { z } from "zod";

// Common validation schemas
export const emailSchema = z.string().email("Invalid email address");

export const phoneSchema = z
  .string()
  .regex(/^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/, {
    message: "Invalid phone number format",
  })
  .optional()
  .or(z.literal(""));

// Address Schema
export const addressSchema = z.object({
  street: z.string().optional(),
  barangay: z.string().min(1, "Barangay is required"),
  city: z.string().min(1, "City is required"),
  province: z.string().min(1, "Province is required"),
  region: z.string().min(1, "Region is required"),
  zipCode: z.string().optional(),
});

// Branch Form Schema
export const branchSchema = z.object({
  branchCode: z.string().min(1, "Branch code is required"),
  branchName: z.string().min(1, "Branch name is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().optional(),
  region: z.string().optional(),
  contactNumber: phoneSchema,
  email: emailSchema.optional().or(z.literal("")),
  operatingHours: z.string().optional(),
  isActive: z.boolean().default(true),
  amenities: z.array(z.string()).optional(),
});

// Login Schema
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(6, "Password must be at least 6 characters"),
  remember: z.boolean().optional(),
});

// Room Type Schema
export const roomTypeSchema = z.object({
  name: z.string().min(1, "Room type name is required"),
  description: z.string().optional(),
  basePrice: z.number().positive("Price must be greater than 0"),
  capacity: z.number().int().positive("Capacity must be at least 1"),
  amenities: z.array(z.string()).optional(),
  bedConfiguration: z
    .array(
      z.object({
        type: z.string(),
        count: z.number().int().positive(),
      })
    )
    .optional(),
});

// Booking Schema
export const bookingSchema = z.object({
  guestName: z.string().min(1, "Guest name is required"),
  guestEmail: emailSchema,
  guestPhone: phoneSchema,
  checkIn: z.date({ required_error: "Check-in date is required" }),
  checkOut: z.date({ required_error: "Check-out date is required" }),
  roomType: z.string().min(1, "Room type is required"),
  numberOfGuests: z.number().int().positive("Number of guests must be at least 1"),
  specialRequests: z.string().optional(),
}).refine((data) => data.checkOut > data.checkIn, {
  message: "Check-out date must be after check-in date",
  path: ["checkOut"],
});

// User Profile Schema
export const userProfileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: emailSchema,
  phone: phoneSchema,
  avatar: z.string().url().optional().or(z.literal("")),
});

// Change Password Schema
export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(6, "Password must be at least 6 characters"),
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default {
  emailSchema,
  phoneSchema,
  addressSchema,
  branchSchema,
  loginSchema,
  roomTypeSchema,
  bookingSchema,
  userProfileSchema,
  changePasswordSchema,
};
