import { Text, Switch, View } from "react-native";
import { useTheme } from "@/src/hooks/useTheme";

interface Props {
  label: string;
  description?: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}

export function SettingToggleRow({ label, description, value, onValueChange }: Props) {
  const theme = useTheme();
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
        paddingVertical: 12,
      }}
    >
      <View style={{ flex: 1, gap: 4 }}>
        <Text style={{ color: theme.text, fontWeight: "700" }}>{label}</Text>
        {!!description && <Text style={{ color: theme.mutedText }}>{description}</Text>}
      </View>
      <Switch value={value} onValueChange={onValueChange} trackColor={{ false: theme.border, true: theme.primary }} />
    </View>
  );
}
