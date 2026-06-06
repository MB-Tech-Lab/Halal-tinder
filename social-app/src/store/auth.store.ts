import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { createSecureStorage } from "@/src/utils/storage";
import { AuthUser } from "@/src/types/domain";

interface AuthStore {
  currentUser: AuthUser | null;
  rememberMe: boolean;
  isAuthenticated: boolean;
  hasHydrated: boolean;
  login: (user: AuthUser, rememberMe?: boolean) => void;
  logout: () => void;
  setRememberMe: (value: boolean) => void;
  setHasHydrated: (value: boolean) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      currentUser: null,
      rememberMe: true,
      isAuthenticated: false,
      hasHydrated: false,
      login: (user, rememberMe = true) =>
        set({
          currentUser: user,
          rememberMe,
          isAuthenticated: true,
        }),
      logout: () =>
        set({
          currentUser: null,
          isAuthenticated: false,
        }),
      setRememberMe: (value) => set({ rememberMe: value }),
      setHasHydrated: (value) => set({ hasHydrated: value }),
    }),
    {
      name: "auth-store",
      storage: createJSONStorage(() => createSecureStorage("social-app:")),
      partialize: (state) => ({
        currentUser: state.currentUser,
        rememberMe: state.rememberMe,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
