import { useState } from "react";
import { Modal, Pressable, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/src/hooks/useTheme";

interface Option {
  label: string;
  value: string;
}

interface Props {
  label?: string;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
}

export function Select({ label, value, options, onChange, placeholder = "Select", error }: Props) {
  const theme = useTheme();
  const selected = options.find((option) => option.value === value)?.label ?? placeholder;
  const [open, setOpen] = useState(false);

  return (
    <View style={{ gap: 8 }}>
      {!!label && <Text style={{ color: theme.text, fontWeight: "600" }}>{label}</Text>}
      <TouchableOpacity
        onPress={() => setOpen(true)}
        style={{
          minHeight: 50,
          borderRadius: 16,
          paddingHorizontal: 16,
          borderWidth: 1,
          borderColor: error ? theme.error : theme.inputBorder,
          backgroundColor: theme.surface,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        >
        <Text style={{ color: value ? theme.text : theme.placeholder }}>{selected}</Text>
        <Ionicons name="chevron-down" size={18} color={theme.placeholder} />
      </TouchableOpacity>
      {!!error && <Text style={{ color: theme.error, fontSize: 12 }}>{error}</Text>}

      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable style={{ flex: 1, backgroundColor: theme.overlay, justifyContent: "center", padding: 20 }} onPress={() => setOpen(false)}>
          <View
            onStartShouldSetResponder={() => true}
            style={{
              borderRadius: 24,
              padding: 16,
              backgroundColor: theme.drawerBackground,
              gap: 10,
            }}
          >
            {options.map((option) => (
              <TouchableOpacity
                key={option.value}
                onPress={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
                style={{
                  padding: 14,
                  borderRadius: 16,
                  backgroundColor: option.value === value ? theme.primary : theme.surface,
                }}
              >
                <Text style={{ color: option.value === value ? theme.primaryButtonText : theme.text, fontWeight: "700" }}>
                  {option.label}
                </Text>
                </TouchableOpacity>
              ))}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}
