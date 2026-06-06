import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useTheme } from "@/src/hooks/useTheme";

interface Props {
  title?: string;
  subtitle?: string;
  showBack?: boolean;
  rightAction?: {
    label: string;
    onPress: () => void;
  };
}

export function PageHeader({ title, subtitle, showBack = true, rightAction }: Props) {
  const router = useRouter();
  const theme = useTheme();

  return (
    <View style={{ gap: 12, marginBottom: 12 }}>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10, flex: 1 }}>
          {showBack ? (
            <Pressable
              onPress={() => router.back()}
              style={{
                width: 42,
                height: 42,
                borderRadius: 14,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: theme.surface,
                borderWidth: 1,
                borderColor: theme.border,
              }}
            >
              <Ionicons name="arrow-back" size={18} color={theme.text} />
            </Pressable>
          ) : null}
          <View style={{ flex: 1 }}>
            {!!title ? <Text style={{ color: theme.text, fontSize: 24, fontWeight: "800" }}>{title}</Text> : null}
            {!!subtitle ? <Text style={{ color: theme.mutedText, marginTop: 2 }}>{subtitle}</Text> : null}
          </View>
        </View>

        {rightAction ? (
          <Pressable
            onPress={rightAction.onPress}
            style={{
              paddingHorizontal: 14,
              height: 42,
              borderRadius: 14,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: theme.primary,
            }}
          >
            <Text style={{ color: theme.primaryButtonText, fontWeight: "700" }}>{rightAction.label}</Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}
