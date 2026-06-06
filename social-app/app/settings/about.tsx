import { Text, View } from "react-native";
import { Screen } from "@/src/components/common/Screen";
import { useTheme } from "@/src/hooks/useTheme";
import { PageHeader } from "@/src/components/common/PageHeader";

export default function AboutSettings() {
  const theme = useTheme();
  return (
    <Screen>
      <View style={{ gap: 12 }}>
        <PageHeader title="About" subtitle="Build info and app stack." showBack />
        <Text style={{ color: theme.mutedText, lineHeight: 22 }}>
          This is a mock social and dating application built with Expo Router, Zustand, React Hook Form, Zod, React Query, and FlashList.
        </Text>
      </View>
    </Screen>
  );
}
