import { Pressable, Text, View } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { User } from "@/src/types/domain";
import { useTheme } from "@/src/hooks/useTheme";
import { Badge } from "@/src/components/common/Badge";

interface Props {
  user: User;
  onPress: () => void;
}

export function UserCard({ user, onPress }: Props) {
  const theme = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        marginBottom: 14,
        borderRadius: 22,
        overflow: "hidden",
        backgroundColor: theme.cardBackground,
        borderWidth: 1,
        borderColor: theme.border,
        opacity: pressed ? 0.96 : 1,
        transform: [{ scale: pressed ? 0.99 : 1 }],
      })}
    >
      <Image source={{ uri: user.photos[0] }} style={{ height: 300, width: "100%" }} contentFit="cover" />
      <View style={{ padding: 14, gap: 10 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", gap: 10 }}>
          <View style={{ flex: 1, gap: 4 }}>
            <Text style={{ color: theme.text, fontSize: 19, fontWeight: "800" }}>
              {user.name}, {user.age}
            </Text>
            <Text style={{ color: theme.mutedText }}>
              {user.profession} · {user.location}
            </Text>
          </View>
          <Badge label={`${user.distanceKm} km`} tone="primary" />
        </View>
        <Text style={{ color: theme.text, lineHeight: 20 }} numberOfLines={2}>
          {user.shortBio}
        </Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
          {user.interests.slice(0, 3).map((interest) => (
            <Badge key={interest} label={interest} />
          ))}
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
          <Ionicons name={user.online ? "ellipse" : "time-outline"} size={13} color={user.online ? theme.success : theme.mutedText} />
          <Text style={{ color: theme.mutedText, fontSize: 12 }}>{user.online ? "Online now" : user.lastSeen}</Text>
        </View>
      </View>
    </Pressable>
  );
}
