import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { APP_THEMES } from "@/src/theme/tokens";
import { createSecureStorage } from "@/src/utils/storage";
import { ThemeKey } from "@/src/types/domain";

interface ThemeStore {
  activeTheme: ThemeKey;
  setTheme: (theme: ThemeKey) => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      activeTheme: "oceanBlue",
      setTheme: (theme) => set({ activeTheme: theme }),
    }),
    {
      name: "theme-store",
      storage: createJSONStorage(() => createSecureStorage("social-app:")),
      partialize: (state) => ({ activeTheme: state.activeTheme }),
    }
  )
);

export const themeTokens = APP_THEMES;
