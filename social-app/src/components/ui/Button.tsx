import { ReactNode } from "react";
import { ActivityIndicator, Pressable, Text, ViewStyle } from "react-native";
import { useTheme } from "@/src/hooks/useTheme";

interface Props {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "ghost";
  loading?: boolean;
  icon?: ReactNode;
  style?: ViewStyle;
}

export function Button({ title, onPress, variant = "primary", loading, icon, style }: Props) {
  const theme = useTheme();
  const isPrimary = variant === "primary";
  const isSecondary = variant === "secondary";

  const backgroundColor = isPrimary ? theme.primary : isSecondary ? theme.surface : "transparent";
  const borderColor = isGhost(variant) ? "transparent" : theme.border;
  const textColor = isPrimary ? theme.primaryButtonText : theme.text;

  return (
    <Pressable
      onPress={onPress}
      disabled={loading}
      style={({ pressed }) => [
        {
          minHeight: 50,
          paddingHorizontal: 16,
          borderRadius: 16,
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          gap: 10,
          backgroundColor,
          borderWidth: 1,
          borderColor,
          opacity: pressed ? 0.92 : 1,
          transform: [{ scale: pressed ? 0.985 : 1 }],
        },
        style,
      ]}
    >
      {loading ? <ActivityIndicator color={textColor} /> : null}
      {!loading ? icon : null}
      <Text style={{ color: textColor, fontWeight: "700" }}>{title}</Text>
    </Pressable>
  );
}

function isGhost(variant: Props["variant"]) {
  return variant === "ghost";
}
