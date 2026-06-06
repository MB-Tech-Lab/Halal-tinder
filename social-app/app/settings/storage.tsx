import { Alert, View } from "react-native";
import { Screen } from "@/src/components/common/Screen";
import { Button } from "@/src/components/ui/Button";
import { PageHeader } from "@/src/components/common/PageHeader";

export default function StorageSettings() {
  return (
    <Screen>
      <View style={{ gap: 12 }}>
        <PageHeader title="Storage" subtitle="Clear cache or reset app data." showBack />
        <Button title="Clear Cache" onPress={() => Alert.alert("Clear cache", "Mock action only.")} />
        <Button title="Clear Images" variant="secondary" onPress={() => Alert.alert("Clear images", "Mock action only.")} />
        <Button title="Reset App Data" variant="secondary" onPress={() => Alert.alert("Reset data", "Mock action only.")} />
      </View>
    </Screen>
  );
}
