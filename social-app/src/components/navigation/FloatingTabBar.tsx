import { Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useTheme } from "@/src/hooks/useTheme";

export function FloatingTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const theme = useTheme();

  return (
    <View style={{ position: "absolute", left: 16, right: 16, bottom: 16 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: theme.tabBar,
          borderColor: theme.border,
          borderWidth: 1,
          borderRadius: 28,
          paddingHorizontal: 10,
          paddingVertical: 10,
        }}
      >
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label = options.tabBarLabel ?? options.title ?? route.name;
          const focused = state.index === index;
          const icon =
            route.name === "home"
              ? focused
                ? "home"
                : "home-outline"
              : route.name === "chats"
              ? focused
                ? "chatbubbles"
                : "chatbubbles-outline"
              : focused
              ? "person"
              : "person-outline";

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={focused ? { selected: true } : {}}
              onPress={() => navigation.navigate(route.name)}
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                paddingVertical: 8,
                gap: 4,
                borderRadius: 20,
                backgroundColor: focused ? theme.primary : "transparent",
              }}
            >
              <Ionicons name={icon as keyof typeof Ionicons.glyphMap} size={20} color={focused ? "#FFF" : theme.text} />
              <Text style={{ color: focused ? "#FFF" : theme.text, fontSize: 12, fontWeight: "700" }}>
                {String(label)}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
