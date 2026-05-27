/**
 * Environment configuration for mobile app
 */

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000/api/v1';

export const config = {
  api: {
    baseURL: API_BASE_URL,
    timeout: 10000,
  },
  storage: {
    tokenKey: '@halal_tinder:auth_token',
    refreshTokenKey: '@halal_tinder:refresh_token',
    userKey: '@halal_tinder:user',
  },
};

export default config;
