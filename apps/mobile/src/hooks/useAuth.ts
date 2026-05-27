/**
 * Custom hooks for authentication
 */

import { useAuthStore } from '../store';

export const useAuth = () => {
  const auth = useAuthStore();

  const isAuthenticated = !!auth.accessToken;

  return {
    user: auth.user,
    accessToken: auth.accessToken,
    isAuthenticated,
    isLoading: auth.isLoading,
    setUser: auth.setUser,
    setTokens: auth.setTokens,
    logout: auth.logout,
  };
};
