import { ReactNode } from "react";
import { Text, View } from "react-native";
import { useTheme } from "@/src/hooks/useTheme";

interface Props {
  title: string;
  description: string;
  action?: ReactNode;
}

export function EmptyState({ title, description, action }: Props) {
  const theme = useTheme();
  return (
    <View style={{ alignItems: "center", padding: 24, gap: 8 }}>
      <Text style={{ color: theme.text, fontSize: 18, fontWeight: "700", textAlign: "center" }}>{title}</Text>
      <Text style={{ color: theme.mutedText, textAlign: "center", lineHeight: 20 }}>{description}</Text>
      {action}
    </View>
  );
}
