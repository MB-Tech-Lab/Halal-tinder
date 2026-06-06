import { Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "@/src/hooks/useTheme";

interface Option {
  label: string;
  value: string;
}

interface Props {
  label?: string;
  value: string[];
  options: Option[];
  onChange: (value: string[]) => void;
  error?: string;
}

export function MultiSelect({ label, value, options, onChange, error }: Props) {
  const theme = useTheme();

  const toggle = (item: string) => {
    const exists = value.includes(item);
    onChange(exists ? value.filter((entry) => entry !== item) : [...value, item]);
  };

  return (
    <View style={{ gap: 8 }}>
      {!!label && <Text style={{ color: theme.text, fontWeight: "600" }}>{label}</Text>}
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
        {options.map((option) => {
          const selected = value.includes(option.value);
          return (
            <TouchableOpacity
              key={option.value}
              onPress={() => toggle(option.value)}
              style={{
                paddingHorizontal: 14,
                paddingVertical: 10,
                borderRadius: 999,
                backgroundColor: selected ? theme.primary : theme.surface,
                borderWidth: 1,
                borderColor: selected ? theme.primary : theme.inputBorder,
              }}
            >
              <Text style={{ color: selected ? theme.primaryButtonText : theme.text, fontWeight: "600" }}>
                {option.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      {!!error && <Text style={{ color: theme.error, fontSize: 12 }}>{error}</Text>}
    </View>
  );
}
