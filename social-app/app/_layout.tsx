import { useEffect, useState } from "react";
import { Stack } from "expo-router";
import { ActivityIndicator, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { QueryClientProvider } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import { queryClient } from "@/src/services/query-client";
import { useTheme } from "@/src/hooks/useTheme";
import { useAuthStore } from "@/src/store/auth.store";
import { useProfileStore } from "@/src/store/profile.store";

export default function Layout() {
  const theme = useTheme();
  const [bootstrapped, setBootstrapped] = useState(false);

  useEffect(() => {
    let mounted = true;

    Promise.all([
      useAuthStore.persist.rehydrate(),
      useProfileStore.persist.rehydrate(),
    ]).finally(() => {
      if (mounted) {
        setBootstrapped(true);
      }
    });

    return () => {
      mounted = false;
    };
  }, []);

  if (!bootstrapped) {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
            backgroundColor: theme.background,
          }}
        >
          <ActivityIndicator color={theme.primary} />
          <Text style={{ color: theme.text, fontWeight: "700" }}>Loading app...</Text>
        </View>
      </GestureHandlerRootView>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <StatusBar style={theme.text === "#F8FAFC" ? "light" : "dark"} />
        <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: theme.background } }} />
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
