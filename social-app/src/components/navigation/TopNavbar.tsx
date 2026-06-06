import { useState } from "react";
import { Pressable, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/src/hooks/useTheme";

interface Props {
  onSearchChange: (value: string) => void;
  onOpenNotifications: () => void;
  onOpenMenu: () => void;
}

export function TopNavbar({ onSearchChange, onOpenNotifications, onOpenMenu }: Props) {
  const theme = useTheme();
  const [query, setQuery] = useState("");

  return (
    <View style={{ gap: 12, paddingHorizontal: 16, paddingTop: 10, paddingBottom: 8 }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <View style={{ flex: 1, flexDirection: "row", alignItems: "center", gap: 10 }}>
          <View
            style={{
              width: 42,
              height: 42,
              borderRadius: 14,
              backgroundColor: theme.primary,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ionicons name="heart" size={20} color="#fff" />
          </View>
          <View style={{ flex: 1 }}>
            <TextInput
              value={query}
              onChangeText={(text) => {
                setQuery(text);
                onSearchChange(text);
              }}
              placeholder="Search people, interests, chats"
              placeholderTextColor={theme.placeholder}
              style={{
                minHeight: 44,
                borderRadius: 14,
                paddingHorizontal: 16,
                color: theme.text,
                backgroundColor: theme.surface,
                borderWidth: 1,
                borderColor: theme.inputBorder,
              }}
            />
          </View>
        </View>

        <Pressable onPress={onOpenNotifications} style={{ padding: 10 }}>
          <Ionicons name="notifications-outline" size={24} color={theme.text} />
        </Pressable>
        <Pressable onPress={onOpenMenu} style={{ padding: 10 }}>
          <Ionicons name="ellipsis-vertical" size={22} color={theme.text} />
        </Pressable>
      </View>
    </View>
  );
}
