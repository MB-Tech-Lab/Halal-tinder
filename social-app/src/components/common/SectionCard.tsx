import { ReactNode } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/src/hooks/useTheme";

interface Props {
  title: string;
  subtitle?: string;
  onPress?: () => void;
  icon?: keyof typeof Ionicons.glyphMap;
  children?: ReactNode;
}

export function SectionCard({ title, subtitle, onPress, icon = "chevron-forward", children }: Props) {
  const theme = useTheme();
  const Container = onPress ? TouchableOpacity : View;

  return (
    <Container
      onPress={onPress}
      style={[styles.container, { backgroundColor: theme.cardBackground, borderColor: theme.border }]}
    >
      <View style={styles.row}>
        <View style={{ flex: 1 }}>
          <Text style={{ color: theme.text, fontSize: 16, fontWeight: "700" }}>{title}</Text>
          {!!subtitle && <Text style={{ color: theme.mutedText, marginTop: 4 }}>{subtitle}</Text>}
        </View>
        {onPress ? <Ionicons name={icon} size={18} color={theme.mutedText} /> : null}
      </View>
      {children}
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    padding: 16,
    borderWidth: StyleSheet.hairlineWidth,
    gap: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
});
