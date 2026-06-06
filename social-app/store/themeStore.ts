import { create } from "zustand";

export type ThemeType =
  | "blue"
  | "orange"
  | "whatsapp";

interface ThemeStore {
  theme: ThemeType;

  setTheme: (
    theme: ThemeType
  ) => void;
}

export const useThemeStore =
  create<ThemeStore>((set) => ({
    theme: "blue",

    setTheme: (theme) =>
      set({ theme }),
  }));