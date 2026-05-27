import { z } from "zod";

// Auth schemas
export const registerSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().optional()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required")
});

export const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1, "Refresh token is required")
});

// Profile schemas
export const updateProfileSchema = z.object({
  age: z.number().int().min(18).max(100).optional(),
  gender: z.enum(["male", "female", "other"]).optional(),
  bio: z.string().max(500).optional(),
  location: z.string().optional(),
  photos: z.array(z.string()).optional()
});

export const preferencesSchema = z.object({
  ageMin: z.number().int().min(18),
  ageMax: z.number().int().max(100),
  genders: z.array(z.enum(["male", "female", "other"])),
  locations: z.array(z.string()).optional(),
  seekingMarriage: z.boolean()
});

// Message schemas
export const createMessageSchema = z.object({
  conversationId: z.string().uuid(),
  content: z.string().min(1).max(5000)
});

export const typingSchema = z.object({
  conversationId: z.string().uuid(),
  isTyping: z.boolean()
});

// Match schemas
export const matchActionSchema = z.object({
  action: z.enum(["like", "pass", "block"])
});

// Query parameter schemas
export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20)
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
export type PreferencesInput = z.infer<typeof preferencesSchema>;
export type CreateMessageInput = z.infer<typeof createMessageSchema>;
export type MatchActionInput = z.infer<typeof matchActionSchema>;
export type PaginationInput = z.infer<typeof paginationSchema>;
