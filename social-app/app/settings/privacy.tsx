import { Screen } from "@/src/components/common/Screen";
import { SettingToggleRow } from "@/src/components/cards/SettingToggleRow";
import { useSettingsStore } from "@/src/store/settings.store";
import { View } from "react-native";
import { PageHeader } from "@/src/components/common/PageHeader";

export default function PrivacySettings() {
  const privacy = useSettingsStore((state) => state.privacy);
  const setPrivacyOption = useSettingsStore((state) => state.setPrivacyOption);

  return (
    <Screen>
      <View style={{ gap: 10 }}>
        <PageHeader title="Privacy" subtitle="Control visibility and read receipts." showBack />
        <SettingToggleRow label="Show Online Status" value={privacy.showOnlineStatus} onValueChange={(value) => setPrivacyOption("showOnlineStatus", value)} />
        <SettingToggleRow label="Show Distance" value={privacy.showDistance} onValueChange={(value) => setPrivacyOption("showDistance", value)} />
        <SettingToggleRow label="Show Profile Publicly" value={privacy.showProfilePublicly} onValueChange={(value) => setPrivacyOption("showProfilePublicly", value)} />
        <SettingToggleRow label="Read Receipts" value={privacy.readReceipts} onValueChange={(value) => setPrivacyOption("readReceipts", value)} />
      </View>
    </Screen>
  );
}
