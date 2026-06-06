import { Alert, View } from "react-native";
import { Screen } from "@/src/components/common/Screen";
import { Button } from "@/src/components/ui/Button";
import { useAuthStore } from "@/src/store/auth.store";
import { PageHeader } from "@/src/components/common/PageHeader";

export default function AccountSettings() {
  const logout = useAuthStore((state) => state.logout);

  return (
    <Screen>
      <View style={{ gap: 12 }}>
        <PageHeader title="Account" subtitle="Logout or clear sessions from this device." showBack />
        <Button title="Logout" onPress={() => logout()} />
        <Button title="Logout All Devices" variant="secondary" onPress={() => Alert.alert("Logout all devices", "Mock action only.")} />
        <Button title="Delete Account" variant="secondary" onPress={() => Alert.alert("Delete account", "Mock action only.")} />
      </View>
    </Screen>
  );
}
