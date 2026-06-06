import { useMemo, useState } from "react";
import { Pressable, RefreshControl, ScrollView, Text, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { useRouter } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "@/src/services/mock-api";
import { useFeedStore } from "@/src/store/feed.store";
import { useProfileStore } from "@/src/store/profile.store";
import { useRequestStore } from "@/src/store/request.store";
import { getVisibleUsers, searchUsers } from "@/src/features/feed/selectors";
import { Screen } from "@/src/components/common/Screen";
import { TopNavbar } from "@/src/components/navigation/TopNavbar";
import { UserCard } from "@/src/components/cards/UserCard";
import { EmptyState } from "@/src/components/common/EmptyState";
import { NotificationDrawer } from "@/src/components/drawers/NotificationDrawer";
import { MoreMenuDrawer } from "@/src/components/drawers/MoreMenuDrawer";
import { useTheme } from "@/src/hooks/useTheme";

export default function HomeScreen() {
  const router = useRouter();
  const theme = useTheme();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [requestFilter, setRequestFilter] = useState<"all" | "sent" | "pending" | "accepted" | "rejected">("all");
  const searchQuery = useFeedStore((state) => state.searchQuery);
  const setSearchQuery = useFeedStore((state) => state.setSearchQuery);
  const refreshUsers = useFeedStore((state) => state.refreshUsers);
  const viewerGender = useProfileStore((state) => state.profile.gender);
  const requests = useRequestStore((state) => state.requests);
  const getRequestSummary = useRequestStore((state) => state.getRequestSummary);
  const requestSummary = getRequestSummary("me");

  const { data: users = [], isLoading, refetch, isFetching } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const visibleUsers = useMemo(() => {
    const base = searchUsers(getVisibleUsers(users, viewerGender), searchQuery);

    return base.filter((user) => {
      const request = requests.find((entry) => entry.fromUserId === "me" && entry.toUserId === user.id);
      if (requestFilter === "all") return true;
      if (requestFilter === "sent") return !!request;
      if (!request) return false;
      return request.status === requestFilter;
    });
  }, [users, viewerGender, searchQuery, requests, requestFilter]);

  const chipItems: { key: typeof requestFilter; label: string; count: number }[] = [
    { key: "all", label: "All", count: visibleUsers.length },
    { key: "sent", label: "Sent", count: requestSummary.sent },
    { key: "pending", label: "Pending", count: requestSummary.pending },
    { key: "accepted", label: "Accepted", count: requestSummary.accepted },
    { key: "rejected", label: "Rejected", count: requestSummary.rejected },
  ];

  return (
    <Screen scroll={false} padded={false}>
      <View style={{ flex: 1 }}>
        <TopNavbar
          onSearchChange={setSearchQuery}
          onOpenNotifications={() => setNotificationsOpen(true)}
          onOpenMenu={() => setMenuOpen(true)}
        />

        <View style={{ paddingHorizontal: 16, paddingBottom: 8 }}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 10 }}>
            {chipItems.map((item) => {
              const active = requestFilter === item.key;
              return (
                <Pressable
                  key={item.key}
                  onPress={() => setRequestFilter(item.key)}
                  style={({ pressed }) => ({
                    minWidth: 86,
                    paddingHorizontal: 14,
                    paddingVertical: 10,
                    borderRadius: 16,
                    borderWidth: 1,
                    borderColor: active ? theme.primary : theme.border,
                    backgroundColor: active ? theme.primary : theme.surface,
                    opacity: pressed ? 0.92 : 1,
                  })}
                >
                  <Text style={{ color: active ? theme.primaryButtonText : theme.text, fontWeight: "800" }}>
                    {item.label}
                  </Text>
                  <Text style={{ color: active ? theme.primaryButtonText : theme.mutedText, fontSize: 12, marginTop: 2 }}>
                    {item.count}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        <View style={{ flex: 1, paddingHorizontal: 16 }}>
          <FlashList
            data={visibleUsers}
            keyExtractor={(item) => item.id}
            refreshControl={
              <RefreshControl
                refreshing={isFetching}
                onRefresh={() => {
                  refreshUsers();
                  refetch();
                }}
                tintColor={theme.primary}
              />
            }
            ListEmptyComponent={
              isLoading ? (
                <EmptyState title="Loading people" description="We are preparing fresh profiles for you." />
              ) : (
                <EmptyState
                  title="No matching profiles"
                  description="Try a different search term or update your profile preferences."
                  action={null}
                />
              )
            }
            renderItem={({ item }) => (
              <UserCard user={item} onPress={() => router.push({ pathname: "/feed/[id]", params: { id: item.id } } as any)} />
            )}
            contentContainerStyle={{ paddingBottom: 140, paddingTop: 8 }}
          />
        </View>
      </View>

      <NotificationDrawer visible={notificationsOpen} onClose={() => setNotificationsOpen(false)} />
      <MoreMenuDrawer
        visible={menuOpen}
        onClose={() => setMenuOpen(false)}
        onOpenNotifications={() => {
          setMenuOpen(false);
          setNotificationsOpen(true);
        }}
      />
    </Screen>
  );
}
