import { Text, View } from "react-native";
import { useTheme } from "@/src/hooks/useTheme";

interface Props {
  text: string;
  mine?: boolean;
}

export function MessageBubble({ text, mine }: Props) {
  const theme = useTheme();
  return (
    <View
      style={{
        alignSelf: mine ? "flex-end" : "flex-start",
        maxWidth: "84%",
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderRadius: 18,
        backgroundColor: mine ? theme.primary : theme.surface,
        borderWidth: mine ? 0 : 1,
        borderColor: theme.border,
      }}
    >
      <Text style={{ color: mine ? theme.primaryButtonText : theme.text, lineHeight: 20 }}>{text}</Text>
    </View>
  );
}
