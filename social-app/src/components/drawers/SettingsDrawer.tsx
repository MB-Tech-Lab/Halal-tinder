import { ScrollView, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { SlideDrawer } from "./SlideDrawer";
import { useTheme } from "@/src/hooks/useTheme";

interface Props {
  visible: boolean;
  onClose: () => void;
}

const settingsItems = [
  { label: "Account", href: "/settings/account" },
  { label: "Theme", href: "/settings/theme" },
  { label: "Notifications", href: "/settings/notifications" },
  { label: "Privacy", href: "/settings/privacy" },
  { label: "Storage", href: "/settings/storage" },
  { label: "Security", href: "/settings/security" },
  { label: "About", href: "/settings/about" },
] as const;

export function SettingsDrawer({ visible, onClose }: Props) {
  const theme = useTheme();
  const router = useRouter();

  return (
    <SlideDrawer visible={visible} onClose={onClose} title="Settings">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ gap: 12 }}>
        {settingsItems.map((item) => (
          <TouchableOpacity
            key={item.label}
            onPress={() => {
              router.push(item.href as any);
              onClose();
            }}
            style={{
              padding: 16,
              borderRadius: 16,
              backgroundColor: theme.surface,
              borderWidth: 1,
              borderColor: theme.border,
            }}
          >
            <Text style={{ color: theme.text, fontWeight: "700" }}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SlideDrawer>
  );
}
