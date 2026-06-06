import { Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { Screen } from "@/src/components/common/Screen";
import { useTheme } from "@/src/hooks/useTheme";
import { PageHeader } from "@/src/components/common/PageHeader";

const items = [
  { label: "Account", href: "/settings/account" },
  { label: "Theme", href: "/settings/theme" },
  { label: "Notifications", href: "/settings/notifications" },
  { label: "Privacy", href: "/settings/privacy" },
  { label: "Storage", href: "/settings/storage" },
  { label: "Security", href: "/settings/security" },
  { label: "About", href: "/settings/about" },
] as const;

export default function SettingsIndex() {
  const router = useRouter();
  const theme = useTheme();

  return (
    <Screen>
      <View style={{ gap: 14 }}>
        <PageHeader title="Settings" subtitle="Adjust account, privacy, storage, and theme." showBack />
        {items.map((item) => (
          <TouchableOpacity
            key={item.label}
            onPress={() => router.push(item.href as any)}
            style={{
              padding: 16,
              borderRadius: 18,
              backgroundColor: theme.cardBackground,
              borderWidth: 1,
              borderColor: theme.border,
            }}
          >
            <Text style={{ color: theme.text, fontWeight: "700" }}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </Screen>
  );
}
