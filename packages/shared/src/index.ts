/**
 * Shared types and interfaces
 */

// User types
export interface User {
  id: string;
  email: string;
  phone?: string;
  name: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProfile {
  id: string;
  userId: string;
  age: number;
  gender: Gender;
  bio?: string;
  location?: string;
  verified: boolean;
  photos: string[];
  preferences?: Preferences;
  createdAt: Date;
  updatedAt: Date;
}

export interface Preferences {
  ageMin: number;
  ageMax: number;
  genders: Gender[];
  locations?: string[];
  seekingMarriage: boolean;
}

// Match types
export interface Match {
  id: string;
  userId1: string;
  userId2: string;
  status: MatchStatus;
  createdAt: Date;
  updatedAt: Date;
}

// Message types
export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  read: boolean;
  createdAt: Date;
}

export interface Conversation {
  id: string;
  user1Id: string;
  user2Id: string;
  lastMessage?: Message;
  createdAt: Date;
  updatedAt: Date;
}

// Notification types
export interface Notification {
  id: string;
  userId: string;
  title: string;
  body: string;
  type: NotificationType;
  read: boolean;
  createdAt: Date;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

// Auth types
export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface JwtPayload {
  userId: string;
  email: string;
  role: UserRole;
  iat: number;
  exp: number;
}

// Enums
export enum UserRole {
  USER = "user",
  ADMIN = "admin",
  MODERATOR = "moderator"
}

export enum Gender {
  MALE = "male",
  FEMALE = "female",
  OTHER = "other"
}

export enum MatchStatus {
  PENDING = "pending",
  ACCEPTED = "accepted",
  REJECTED = "rejected",
  BLOCKED = "blocked"
}

export enum NotificationType {
  MATCH = "match",
  MESSAGE = "message",
  SYSTEM = "system"
}
