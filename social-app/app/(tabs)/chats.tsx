import { useMemo, useState } from "react";
import { RefreshControl, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { useRouter } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { fetchChats } from "@/src/services/mock-api";
import { Screen } from "@/src/components/common/Screen";
import { Input } from "@/src/components/ui/Input";
import { ChatRow } from "@/src/components/cards/ChatRow";
import { EmptyState } from "@/src/components/common/EmptyState";
import { useChatStore } from "@/src/store/chat.store";
import { useTheme } from "@/src/hooks/useTheme";

export default function ChatsScreen() {
  const router = useRouter();
  const theme = useTheme();
  const chats = useChatStore((state) => state.chats);
  const [query, setQuery] = useState("");

  useQuery({
    queryKey: ["chats"],
    queryFn: fetchChats,
  });

  const filteredChats = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return chats;

    return chats.filter((chat) => [chat.name, chat.lastMessage].some((value) => value.toLowerCase().includes(normalized)));
  }, [chats, query]);

  return (
    <Screen>
      <View style={{ gap: 16 }}>
        <Input value={query} onChangeText={setQuery} placeholder="Search chats" />
        <FlashList
          data={filteredChats}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ChatRow chat={item} onPress={() => router.push({ pathname: "/chats/[id]", params: { id: item.id } } as any)} />}
          ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
          ListEmptyComponent={<EmptyState title="No chats" description="No conversations match your search right now." />}
          refreshControl={<RefreshControl refreshing={false} onRefresh={() => void 0} tintColor={theme.primary} />}
          contentContainerStyle={{ paddingBottom: 140 }}
        />
      </View>
    </Screen>
  );
}
