import { useThemeStore } from "@/src/store/theme.store";
import { APP_THEMES } from "@/src/theme/tokens";

export function useTheme() {
  const activeTheme = useThemeStore((state) => state.activeTheme);
  return APP_THEMES[activeTheme];
}

export function useThemeName() {
  const activeTheme = useThemeStore((state) => state.activeTheme);
  return APP_THEMES[activeTheme].name;
}
