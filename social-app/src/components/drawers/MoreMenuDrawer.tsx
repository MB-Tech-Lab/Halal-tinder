import { Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { SlideDrawer } from "./SlideDrawer";
import { useTheme } from "@/src/hooks/useTheme";

interface Props {
  visible: boolean;
  onClose: () => void;
  onOpenNotifications: () => void;
}

export function MoreMenuDrawer({ visible, onClose, onOpenNotifications }: Props) {
  const theme = useTheme();
  const router = useRouter();

  const items = [
    { label: "Requests", href: "/requests" },
    { label: "Settings", href: "/settings" },
    { label: "Theme", href: "/settings/theme" },
    { label: "Notifications", action: onOpenNotifications },
  ] as const;

  return (
    <SlideDrawer visible={visible} onClose={onClose} title="More">
      <View style={{ gap: 12 }}>
        {items.map((item) => (
          <TouchableOpacity
            key={item.label}
            onPress={() => {
              if ("href" in item) {
                router.push(item.href as any);
              } else {
                item.action();
              }
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
      </View>
    </SlideDrawer>
  );
}
