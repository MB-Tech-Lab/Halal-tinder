import { Text, TouchableOpacity, View } from "react-native";
import { Screen } from "@/src/components/common/Screen";
import { useThemeStore } from "@/src/store/theme.store";
import { useTheme } from "@/src/hooks/useTheme";
import { PageHeader } from "@/src/components/common/PageHeader";

const themes = [
  { key: "oceanBlue", label: "Ocean Blue" },
  { key: "midnightOrange", label: "Midnight Orange" },
  { key: "whatsappGreen", label: "WhatsApp Green" },
] as const;

export default function ThemeSettings() {
  const theme = useTheme();
  const activeTheme = useThemeStore((state) => state.activeTheme);
  const setTheme = useThemeStore((state) => state.setTheme);

  return (
    <Screen>
      <View style={{ gap: 14 }}>
        <PageHeader title="Theme" subtitle="Choose a balanced color system." showBack />
        {themes.map((item) => (
          <TouchableOpacity
            key={item.key}
            onPress={() => setTheme(item.key)}
            style={{
              padding: 16,
              borderRadius: 18,
              backgroundColor: item.key === activeTheme ? theme.primary : theme.cardBackground,
              borderWidth: 1,
              borderColor: theme.border,
            }}
          >
            <Text style={{ color: item.key === activeTheme ? theme.primaryButtonText : theme.text, fontWeight: "700" }}>
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </Screen>
  );
}
