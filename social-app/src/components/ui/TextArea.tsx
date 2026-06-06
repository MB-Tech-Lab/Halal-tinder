import { Text, TextInput, View } from "react-native";
import { useTheme } from "@/src/hooks/useTheme";

interface Props {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  error?: string;
}

export function TextArea({ label, value, onChangeText, placeholder, error }: Props) {
  const theme = useTheme();
  return (
    <View style={{ gap: 8 }}>
      {!!label && <Text style={{ color: theme.text, fontWeight: "600" }}>{label}</Text>}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.placeholder}
        multiline
        style={{
          minHeight: 120,
          borderRadius: 16,
          borderWidth: 1,
          borderColor: error ? theme.error : theme.inputBorder,
          backgroundColor: theme.surface,
          color: theme.text,
          padding: 16,
          textAlignVertical: "top",
        }}
      />
      {!!error && <Text style={{ color: theme.error, fontSize: 12 }}>{error}</Text>}
    </View>
  );
}
