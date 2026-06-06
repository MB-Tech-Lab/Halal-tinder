import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "@/src/hooks/useTheme";

interface Props {
  uri?: string;
  name: string;
  size?: number;
}

export function Avatar({ uri, name, size = 56 }: Props) {
  const theme = useTheme();
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return uri ? (
    <Image source={{ uri }} style={[styles.image, { width: size, height: size, borderRadius: size / 2 }]} />
  ) : (
    <View style={[styles.fallback, { width: size, height: size, borderRadius: size / 2, backgroundColor: theme.surface }]}>
      <Text style={{ color: theme.text, fontWeight: "700" }}>{initials}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  image: { backgroundColor: "#000" },
  fallback: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: StyleSheet.hairlineWidth,
  },
});
