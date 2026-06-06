import { Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "@/src/hooks/useTheme";

interface Props {
  label?: string;
  value: string;
  onPress: () => void;
  error?: string;
}

export function DatePicker({ label, value, onPress, error }: Props) {
  const theme = useTheme();
  return (
    <View style={{ gap: 8 }}>
      {!!label && <Text style={{ color: theme.text, fontWeight: "600" }}>{label}</Text>}
      <TouchableOpacity
        onPress={onPress}
        style={{
          minHeight: 50,
          borderRadius: 16,
          borderWidth: 1,
          borderColor: error ? theme.error : theme.inputBorder,
          backgroundColor: theme.surface,
          justifyContent: "center",
          paddingHorizontal: 16,
        }}
      >
        <Text style={{ color: value ? theme.text : theme.placeholder }}>{value || "Select date"}</Text>
      </TouchableOpacity>
      {!!error && <Text style={{ color: theme.error, fontSize: 12 }}>{error}</Text>}
    </View>
  );
}
