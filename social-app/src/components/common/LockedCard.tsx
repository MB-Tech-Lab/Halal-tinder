import { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "@/src/hooks/useTheme";

interface Props {
  title: string;
  description: string;
  children: ReactNode;
}

export function LockedCard({ title, description, children }: Props) {
  const theme = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: theme.cardBackground, borderColor: theme.border }]}>
      <Text style={{ color: theme.text, fontSize: 16, fontWeight: "700" }}>{title}</Text>
      <Text style={{ color: theme.mutedText, marginTop: 6, marginBottom: 12 }}>{description}</Text>
      <View style={{ opacity: 0.28 }}>{children}</View>
      <View style={[StyleSheet.absoluteFill, styles.overlay, { backgroundColor: theme.overlay }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 20,
    overflow: "hidden",
    padding: 16,
    minHeight: 140,
  },
  overlay: {
    justifyContent: "center",
    alignItems: "center",
  },
});
