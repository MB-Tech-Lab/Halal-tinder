import { THEMES } from "../theme/themes";
import { useThemeStore } from "../store/themeStore";

export function useTheme() {
  const theme =
    useThemeStore(
      (state) => state.theme
    );

  return THEMES[theme].colors;
}
export function useThemeName() {
  const theme =
    useThemeStore(
      (state) => state.theme
    );

  return THEMES[theme].name;
}