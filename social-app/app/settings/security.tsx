import { View } from "react-native";
import { Screen } from "@/src/components/common/Screen";
import { SettingToggleRow } from "@/src/components/cards/SettingToggleRow";
import { useSettingsStore } from "@/src/store/settings.store";
import { PageHeader } from "@/src/components/common/PageHeader";

export default function SecuritySettings() {
  const security = useSettingsStore((state) => state.security);
  const setSecurityOption = useSettingsStore((state) => state.setSecurityOption);

  return (
    <Screen>
      <View style={{ gap: 10 }}>
        <PageHeader title="Security" subtitle="Mock biometric and password settings." showBack />
        <SettingToggleRow label="Biometric Login" value={security.biometricLogin} onValueChange={(value) => setSecurityOption("biometricLogin", value)} />
        <SettingToggleRow label="Device Sessions" value={security.deviceSessions} onValueChange={(value) => setSecurityOption("deviceSessions", value)} />
        <SettingToggleRow label="Change Password" value={security.changePasswordEnabled} onValueChange={(value) => setSecurityOption("changePasswordEnabled", value)} />
      </View>
    </Screen>
  );
}
