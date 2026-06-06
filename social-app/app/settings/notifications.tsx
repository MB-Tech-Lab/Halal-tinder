import { Screen } from "@/src/components/common/Screen";
import { SettingToggleRow } from "@/src/components/cards/SettingToggleRow";
import { useSettingsStore } from "@/src/store/settings.store";
import { View } from "react-native";
import { PageHeader } from "@/src/components/common/PageHeader";

export default function NotificationSettings() {
  const notifications = useSettingsStore((state) => state.notifications);
  const setNotificationOption = useSettingsStore((state) => state.setNotificationOption);

  return (
    <Screen>
      <View style={{ gap: 10 }}>
        <PageHeader title="Notifications" subtitle="Fine tune alerts." showBack />
        <SettingToggleRow label="Push Notifications" value={notifications.pushNotifications} onValueChange={(value) => setNotificationOption("pushNotifications", value)} />
        <SettingToggleRow label="Chat Notifications" value={notifications.chatNotifications} onValueChange={(value) => setNotificationOption("chatNotifications", value)} />
        <SettingToggleRow label="Request Notifications" value={notifications.requestNotifications} onValueChange={(value) => setNotificationOption("requestNotifications", value)} />
        <SettingToggleRow label="Marketing Notifications" value={notifications.marketingNotifications} onValueChange={(value) => setNotificationOption("marketingNotifications", value)} />
      </View>
    </Screen>
  );
}
