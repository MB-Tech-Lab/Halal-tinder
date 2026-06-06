import { Text, View } from "react-native";
import { useTheme } from "@/src/hooks/useTheme";

interface Props {
  label: string;
  tone?: "primary" | "success" | "warning" | "error" | "neutral";
}

export function Badge({ label, tone = "neutral" }: Props) {
  const theme = useTheme();
  const background =
    tone === "primary"
      ? theme.primary
      : tone === "success"
      ? theme.success
      : tone === "warning"
      ? theme.warning
      : tone === "error"
      ? theme.error
      : theme.surface;
  const color = tone === "neutral" ? theme.text : "#FFF";

  return (
    <View style={{ paddingHorizontal: 10, paddingVertical: 5, borderRadius: 999, backgroundColor: background }}>
      <Text style={{ color, fontSize: 12, fontWeight: "700" }}>{label}</Text>
    </View>
  );
}
