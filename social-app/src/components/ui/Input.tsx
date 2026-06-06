import { forwardRef } from "react";
import { Text, TextInput, View } from "react-native";
import { useTheme } from "@/src/hooks/useTheme";

interface Props {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  error?: string;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address" | "numeric";
  rightAccessory?: React.ReactNode;
  multiline?: boolean;
}

export const Input = forwardRef<TextInput, Props>(function Input(
  { label, value, onChangeText, placeholder, error, secureTextEntry, keyboardType, rightAccessory, multiline },
  ref
) {
  const theme = useTheme();
  return (
    <View style={{ gap: 8 }}>
      {!!label && <Text style={{ color: theme.text, fontWeight: "600" }}>{label}</Text>}
      <View style={{ position: "relative" }}>
        <TextInput
          ref={ref}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={theme.placeholder}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          multiline={multiline}
          style={{
            color: theme.text,
            borderWidth: 1,
            borderColor: error ? theme.error : theme.inputBorder,
            borderRadius: 16,
            paddingHorizontal: 16,
            paddingVertical: multiline ? 16 : 14,
            minHeight: multiline ? 110 : 50,
            backgroundColor: theme.surface,
            textAlignVertical: multiline ? "top" : "center",
          }}
        />
        {rightAccessory ? <View style={{ position: "absolute", right: 14, top: 14 }}>{rightAccessory}</View> : null}
      </View>
      {!!error && <Text style={{ color: theme.error, fontSize: 12 }}>{error}</Text>}
    </View>
  );
});
