import { Alert, ScrollView, Text, View } from "react-native";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "@/src/services/mock-api";
import { useRequestStore } from "@/src/store/request.store";
import { useTheme } from "@/src/hooks/useTheme";
import { Button } from "@/src/components/ui/Button";
import { Badge } from "@/src/components/common/Badge";
import { LockedCard } from "@/src/components/common/LockedCard";
import { PageHeader } from "@/src/components/common/PageHeader";

export default function UserDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const theme = useTheme();
  const sendRequest = useRequestStore((state) => state.sendRequest);
  const request = useRequestStore((state) => state.getRequestStatus)("me", id ?? "");

  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const user = users.find((item) => item.id === id);

  if (!user) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: theme.background }}>
        <Text style={{ color: theme.text }}>Profile not found.</Text>
      </View>
    );
  }

  const unlocked = request?.status === "accepted";

  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.background }} contentContainerStyle={{ paddingBottom: 32 }}>
      <View style={{ paddingHorizontal: 16 }}>
        <PageHeader
          title={user.name}
          subtitle={`${user.profession} · ${user.location}`}
          showBack
        />
      </View>
      <Image source={{ uri: user.photos[0] }} style={{ height: 360, width: "100%" }} contentFit="cover" />
      <View style={{ padding: 16, gap: 16 }}>
        <View style={{ gap: 10 }}>
          <Text style={{ color: theme.text, fontSize: 24, fontWeight: "800" }}>
            {user.name}, {user.age}
          </Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
            {user.interests.map((interest) => (
              <Badge key={interest} label={interest} />
            ))}
          </View>
        </View>

        <Button
          title={unlocked ? "Profile Request Accepted" : "Send Profile Request"}
          onPress={() => {
            if (!unlocked) {
              sendRequest("me", user.id);
              Alert.alert("Request sent", "Your profile request is now pending.");
            }
          }}
        />
        <View style={{ flexDirection: "row", gap: 12 }}>
          <View style={{ flex: 1 }}>
            <Button title="Report User" variant="secondary" onPress={() => Alert.alert("Report", "Report flow is mocked.")} />
          </View>
          <View style={{ flex: 1 }}>
            <Button title="Block User" variant="secondary" onPress={() => Alert.alert("Block", "Block flow is mocked.")} />
          </View>
        </View>

        <LockedCard
          title={unlocked ? "Unlocked details" : "Locked profile details"}
          description={unlocked ? "You can now see the detailed information." : "Accept the request to reveal more about this person."}
        >
          <View style={{ gap: 12 }}>
            <Text style={{ color: theme.text }}>{user.bio}</Text>
            <Text style={{ color: theme.text }}>Education: {user.education}</Text>
            <Text style={{ color: theme.text }}>Languages: {user.languages.join(", ")}</Text>
            <Text style={{ color: theme.text }}>
              Social: {user.socialLinks.instagram} {user.socialLinks.linkedin}
            </Text>
          </View>
        </LockedCard>

        {unlocked ? (
          <View style={{ gap: 12 }}>
            <Text style={{ color: theme.text, fontSize: 18, fontWeight: "700" }}>More photos</Text>
            <View style={{ flexDirection: "row", gap: 10 }}>
              {user.photos.slice(1).map((photo) => (
                <Image key={photo} source={{ uri: photo }} style={{ width: 110, height: 150, borderRadius: 18 }} />
              ))}
            </View>
          </View>
        ) : null}

        <Button title="Back" variant="ghost" onPress={() => router.back()} />
      </View>
    </ScrollView>
  );
}
