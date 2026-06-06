import { Pressable, Text, View } from "react-native";
import { Image } from "expo-image";
import { Chat } from "@/src/types/domain";
import { useTheme } from "@/src/hooks/useTheme";
import { Badge } from "@/src/components/common/Badge";

interface Props {
  chat: Chat;
  onPress: () => void;
}

export function ChatRow({ chat, onPress }: Props) {
  const theme = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        padding: 14,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: theme.border,
        backgroundColor: theme.cardBackground,
        opacity: pressed ? 0.96 : 1,
        transform: [{ scale: pressed ? 0.99 : 1 }],
      })}
    >
      <View>
        <Image source={{ uri: chat.avatar }} style={{ width: 54, height: 54, borderRadius: 16 }} />
        <View
          style={{
            position: "absolute",
            right: -1,
            bottom: -1,
            width: 12,
            height: 12,
            borderRadius: 7,
            borderWidth: 2,
            borderColor: theme.cardBackground,
            backgroundColor: chat.online ? theme.success : theme.placeholder,
          }}
        />
      </View>
      <View style={{ flex: 1, gap: 4 }}>
        <Text style={{ color: theme.text, fontSize: 15, fontWeight: "800" }}>{chat.name}</Text>
        <Text style={{ color: theme.mutedText }} numberOfLines={1}>
          {chat.lastMessage}
        </Text>
      </View>
      <View style={{ alignItems: "flex-end", gap: 8 }}>
        <Text style={{ color: theme.mutedText, fontSize: 12 }}>
          {new Date(chat.lastMessageAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </Text>
        {chat.unreadCount > 0 ? <Badge label={String(chat.unreadCount)} tone="primary" /> : null}
      </View>
    </Pressable>
  );
}
