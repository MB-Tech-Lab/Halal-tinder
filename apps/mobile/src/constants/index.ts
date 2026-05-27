/**
 * Mobile app constants
 */

export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    REFRESH: '/auth/refresh',
    LOGOUT: '/auth/logout',
  },
  USERS: {
    GET_PROFILE: '/users/:id',
    UPDATE_PROFILE: '/users/:id',
    LIST: '/users',
  },
  MATCHES: {
    GET_MATCHES: '/matches',
    LIKE: '/matches/:id/like',
    PASS: '/matches/:id/pass',
    BLOCK: '/matches/:id/block',
  },
  MESSAGES: {
    GET_CONVERSATIONS: '/conversations',
    GET_MESSAGES: '/conversations/:id/messages',
    SEND_MESSAGE: '/conversations/:id/messages',
  },
  NOTIFICATIONS: {
    GET: '/notifications',
  },
};

export const STORAGE_KEYS = {
  ACCESS_TOKEN: '@halal_tinder:access_token',
  REFRESH_TOKEN: '@halal_tinder:refresh_token',
  USER: '@halal_tinder:user',
  PREFERENCES: '@halal_tinder:preferences',
};

export const COLORS = {
  PRIMARY: '#007AFF',
  SECONDARY: '#F2F2F7',
  SUCCESS: '#34C759',
  DANGER: '#FF3B30',
  WARNING: '#FF9500',
  BACKGROUND: '#FFFFFF',
  TEXT_PRIMARY: '#000000',
  TEXT_SECONDARY: '#666666',
  BORDER: '#E5E5EA',
};

export const TIMINGS = {
  ANIMATION: 200,
  DEBOUNCE: 300,
  TOAST_DURATION: 3000,
};
