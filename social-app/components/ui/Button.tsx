import {
    TouchableOpacity,
    Text,
  } from "react-native";
import { useTheme } from "@/hooks/useTheme";
  
  interface Props {
    title: string;
    onPress: () => void;
  }
  
  export default function Button({
    title,
    onPress,
  }: Props) {
    const theme = useTheme();
    return (
      <TouchableOpacity
        onPress={onPress}
        style={{
          backgroundColor: theme.primary,
          padding: 16,
          borderRadius: 12,
          alignItems: "center",
        }}
      >
        <Text style={{
          color: theme.text,
          fontWeight: "700",
        }}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  }
  