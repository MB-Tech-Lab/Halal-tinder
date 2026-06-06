import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";

import {
  useThemeStore,
} from "../../store/themeStore";

export default function ThemeSelectorCard() {
  const setTheme =
    useThemeStore(
      (s) => s.setTheme
    );

  return (
    <View
      style={{
        flexDirection: "row",
        gap: 12,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
        marginBottom: 20,
      }}
    >
      <Text style={{ fontSize: 16, fontWeight: "bold" }}>Select Theme</Text>
      <View style={{ flexDirection: "row", gap: 12 }}>
      <TouchableOpacity
        style={{
          width: 30,
          height: 30,
          borderRadius: 20,
          backgroundColor:
            "#2563EB",
        }}
        onPress={() =>
          setTheme("blue")
        }
      />

      <TouchableOpacity
        style={{
          width: 30,
          height: 30,
          borderRadius: 20,
          backgroundColor:
            "#F97316",
        }}
        onPress={() =>
          setTheme("orange")
        }
      />

      <TouchableOpacity
        style={{
          width: 30,
          height: 30,
          borderRadius: 20,
          backgroundColor:
            "#25D366",
        }}
        onPress={() =>
          setTheme("whatsapp")
          }
        />
      </View>
    </View>
  );
}