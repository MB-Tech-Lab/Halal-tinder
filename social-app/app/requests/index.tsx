import { useMemo } from "react";
import { ScrollView, Text, View } from "react-native";
import { Image } from "expo-image";
import { Screen } from "@/src/components/common/Screen";
import { useRequestStore } from "@/src/store/request.store";
import { useTheme } from "@/src/hooks/useTheme";
import { Button } from "@/src/components/ui/Button";
import { PageHeader } from "@/src/components/common/PageHeader";
import { mockUsers } from "@/src/mock/users";

export default function RequestsScreen() {
  const theme = useTheme();
  const requests = useRequestStore((state) => state.requests);
  const acceptRequest = useRequestStore((state) => state.acceptRequest);
  const rejectRequest = useRequestStore((state) => state.rejectRequest);
  const summary = useRequestStore((state) => state.getRequestSummary)("me");

  const requestCards = useMemo(() => {
    return requests
      .filter((request) => request.fromUserId === "me")
      .map((request) => ({
        request,
        user: mockUsers.find((item) => item.id === request.toUserId),
      }))
      .filter((item) => !!item.user);
  }, [requests]);

  const total = Math.max(summary.sent, 1);

  return (
    <Screen>
      <PageHeader title="Requests" subtitle="Track sent, pending, accepted, and rejected requests." showBack />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ gap: 16, paddingBottom: 140 }}>
        <View
          style={{
            padding: 16,
            borderRadius: 22,
            backgroundColor: theme.cardBackground,
            borderWidth: 1,
            borderColor: theme.border,
            gap: 14,
          }}
        >
          <Text style={{ color: theme.text, fontSize: 16, fontWeight: "800" }}>Request overview</Text>
          <View style={{ flexDirection: "row", gap: 10 }}>
            {[
              { label: "Sent", value: summary.sent, color: theme.primary },
              { label: "Pending", value: summary.pending, color: theme.warning },
              { label: "Accepted", value: summary.accepted, color: theme.success },
              { label: "Rejected", value: summary.rejected, color: theme.error },
            ].map((item) => (
              <View key={item.label} style={{ flex: 1, gap: 8 }}>
                <View
                  style={{
                    height: 92,
                    borderRadius: 18,
                    backgroundColor: theme.surface,
                    borderWidth: 1,
                    borderColor: theme.border,
                    justifyContent: "flex-end",
                    overflow: "hidden",
                  }}
                >
                  <View
                    style={{
                      height: `${Math.max((item.value / total) * 100, item.value > 0 ? 20 : 4)}%` as any,
                      backgroundColor: item.color,
                      borderRadius: 18,
                    }}
                  />
                </View>
                <Text style={{ color: theme.text, fontSize: 12, fontWeight: "700" }}>{item.label}</Text>
                <Text style={{ color: theme.mutedText, fontSize: 12 }}>{item.value}</Text>
              </View>
            ))}
          </View>
        </View>

        {requestCards.length === 0 ? (
          <View
            style={{
              padding: 16,
              borderRadius: 22,
              backgroundColor: theme.surface,
              borderWidth: 1,
              borderColor: theme.border,
            }}
          >
            <Text style={{ color: theme.text, fontWeight: "700" }}>No requests yet</Text>
            <Text style={{ color: theme.mutedText, marginTop: 6 }}>Send a profile request from the home feed to see it here.</Text>
          </View>
        ) : null}

        {requestCards.map(({ request, user }) => {
          if (!user) return null;

          return (
            <View
              key={request.id}
              style={{
                padding: 14,
                borderRadius: 22,
                backgroundColor: theme.cardBackground,
                borderWidth: 1,
                borderColor: theme.border,
                gap: 12,
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                <Image source={{ uri: user.photos[0] }} style={{ width: 52, height: 52, borderRadius: 16 }} />
                <View style={{ flex: 1, gap: 2 }}>
                  <Text style={{ color: theme.text, fontWeight: "800" }}>
                    {user.name}, {user.age}
                  </Text>
                  <Text style={{ color: theme.mutedText }}>
                    {user.profession} · {user.location}
                  </Text>
                </View>
                <View
                  style={{
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                    borderRadius: 999,
                    backgroundColor:
                      request.status === "accepted"
                        ? theme.success
                        : request.status === "rejected"
                        ? theme.error
                        : theme.warning,
                  }}
                >
                  <Text style={{ color: "#FFF", fontWeight: "800", fontSize: 12 }}>{request.status}</Text>
                </View>
              </View>

              <Text style={{ color: theme.mutedText, lineHeight: 20 }}>
                {request.status === "pending"
                  ? "Waiting for the other person to accept your request."
                  : request.status === "accepted"
                  ? "This request is accepted and unlocked."
                  : "This request was rejected."}
              </Text>

              {request.status === "pending" ? (
                <View style={{ flexDirection: "row", gap: 10 }}>
                  <View style={{ flex: 1 }}>
                    <Button title="Accept" onPress={() => acceptRequest(request.id)} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Button title="Reject" variant="secondary" onPress={() => rejectRequest(request.id)} />
                  </View>
                </View>
              ) : null}
            </View>
          );
        })}
      </ScrollView>
    </Screen>
  );
}
