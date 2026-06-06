import { Alert, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { FlashList } from "@shopify/flash-list";
import { Ionicons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import { useChatStore } from "@/src/store/chat.store";
import { useTheme } from "@/src/hooks/useTheme";
import { Avatar } from "@/src/components/common/Avatar";
import { MessageBubble } from "@/src/components/cards/MessageBubble";
import { Button } from "@/src/components/ui/Button";
import { PageHeader } from "@/src/components/common/PageHeader";

export default function ChatDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const theme = useTheme();
  const chat = useChatStore((state) => state.chats.find((item) => item.id === id));
  const messages = useChatStore((state) => state.messages[id] ?? []);
  const sendMessage = useChatStore((state) => state.sendMessage);
  const setChatAllowed = useChatStore((state) => state.setChatAllowed);
  const [text, setText] = useState("");

  const ordered = useMemo(() => [...messages].sort((a, b) => a.createdAt.localeCompare(b.createdAt)), [messages]);

  if (!chat) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: theme.background }}>
        <Text style={{ color: theme.text }}>Chat not found.</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1, backgroundColor: theme.background }}>
      <View style={{ paddingHorizontal: 16 }}>
        <PageHeader
          title={chat.name}
          subtitle={chat.online ? "Online now" : chat.lastSeen}
          showBack
          rightAction={{
            label: "Info",
            onPress: () => Alert.alert("Chat info", "Mock conversation details."),
          }}
        />
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 12,
          paddingHorizontal: 16,
          paddingVertical: 10,
        }}
      >
        <Avatar uri={chat.avatar} name={chat.name} size={48} />
        <Text style={{ color: theme.mutedText, flex: 1 }}>
          {chat.allowed ? "This chat is unlocked." : "Chat request required before messaging."}
        </Text>
      </View>

      {!chat.allowed ? (
        <View style={{ paddingHorizontal: 16, paddingBottom: 10 }}>
          <Button
            title="Send Chat Request"
            onPress={() => {
              setChatAllowed(chat.id, true);
              Alert.alert("Request sent", "The chat request is now pending in the mock flow.");
            }}
          />
        </View>
      ) : null}

      <FlashList
        data={ordered}
        inverted
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MessageBubble text={item.text} mine={item.senderId === "me"} />}
        contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 12, gap: 10 }}
      />

      {chat.typing ? (
        <Text style={{ color: theme.mutedText, paddingHorizontal: 16, paddingBottom: 8 }}>Typing...</Text>
      ) : null}

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          padding: 16,
          borderTopWidth: 1,
          borderTopColor: theme.border,
          backgroundColor: theme.background,
        }}
      >
        <TouchableOpacity>
          <Ionicons name="happy-outline" size={24} color={theme.text} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="add-circle-outline" size={24} color={theme.text} />
        </TouchableOpacity>
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Message"
          placeholderTextColor={theme.placeholder}
          style={{
            flex: 1,
            minHeight: 48,
            borderRadius: 16,
            borderWidth: 1,
            borderColor: theme.inputBorder,
            backgroundColor: theme.surface,
            color: theme.text,
            paddingHorizontal: 16,
          }}
        />
        <TouchableOpacity
          onPress={() => {
            if (!text.trim()) return;
            sendMessage(chat.id, text.trim());
            setText("");
          }}
          style={{
            width: 48,
            height: 48,
            borderRadius: 16,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: theme.primary,
          }}
        >
          <Ionicons name="send" size={18} color={theme.primaryButtonText} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
