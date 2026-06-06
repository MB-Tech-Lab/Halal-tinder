export const GENDERS = ["male", "female", "other"] as const;
export type Gender = (typeof GENDERS)[number];

export const LOOKING_FOR = ["male", "female", "everyone"] as const;
export type LookingFor = (typeof LOOKING_FOR)[number];

export const THEME_KEYS = [
  "oceanBlue",
  "midnightOrange",
  "whatsappGreen",
] as const;
export type ThemeKey = (typeof THEME_KEYS)[number];

export type RequestStatus = "pending" | "accepted" | "rejected";

export interface ThemeTokens {
  name: string;
  background: string;
  surface: string;
  primary: string;
  secondary: string;
  success: string;
  warning: string;
  error: string;
  text: string;
  border: string;
  placeholder: string;
  cardBackground: string;
  tabBar: string;
  drawerBackground: string;
  inputBorder: string;
  primaryButtonText: string;
  secondaryButtonText: string;
  mutedText: string;
  overlay: string;
}

export interface SocialLinks {
  instagram?: string;
  linkedin?: string;
  x?: string;
  website?: string;
}

export interface Profile {
  bio: string;
  education: string;
  profession: string;
  business: string;
  location: string;
  gender: Gender;
  lookingFor: LookingFor;
  interests: string[];
  languages: string[];
  socialLinks: SocialLinks;
  photos: string[];
}

export interface User {
  id: string;
  name: string;
  age: number;
  gender: Gender;
  lookingFor: LookingFor;
  location: string;
  profession: string;
  business: string;
  education: string;
  interests: string[];
  languages: string[];
  photos: string[];
  bio: string;
  shortBio: string;
  distanceKm: number;
  status: string;
  online: boolean;
  lastSeen: string;
  profileCompleted: boolean;
  socialLinks: SocialLinks;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
}

export interface ChatMessage {
  id: string;
  chatId: string;
  senderId: string;
  text: string;
  createdAt: string;
  isSystem?: boolean;
}

export interface Chat {
  id: string;
  userId: string;
  name: string;
  avatar: string;
  online: boolean;
  lastSeen: string;
  unreadCount: number;
  lastMessage: string;
  lastMessageAt: string;
  typing: boolean;
  allowed: boolean;
}

export interface ProfileRequest {
  id: string;
  fromUserId: string;
  toUserId: string;
  status: RequestStatus;
  createdAt: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  unread: boolean;
}

export interface NotificationPreferences {
  pushNotifications: boolean;
  chatNotifications: boolean;
  requestNotifications: boolean;
  marketingNotifications: boolean;
}

export interface PrivacySettings {
  showOnlineStatus: boolean;
  showDistance: boolean;
  showProfilePublicly: boolean;
  readReceipts: boolean;
}

export interface SecuritySettings {
  biometricLogin: boolean;
  deviceSessions: boolean;
  changePasswordEnabled: boolean;
}
