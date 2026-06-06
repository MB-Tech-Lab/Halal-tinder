import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { createSecureStorage } from "@/src/utils/storage";
import {
  NotificationPreferences,
  PrivacySettings,
  SecuritySettings,
} from "@/src/types/domain";

interface SettingsStore {
  notifications: NotificationPreferences;
  privacy: PrivacySettings;
  security: SecuritySettings;
  setNotificationOption: (
    key: keyof NotificationPreferences,
    value: boolean
  ) => void;
  setPrivacyOption: (key: keyof PrivacySettings, value: boolean) => void;
  setSecurityOption: (key: keyof SecuritySettings, value: boolean) => void;
  resetAppData: () => void;
}

const defaultNotifications: NotificationPreferences = {
  pushNotifications: true,
  chatNotifications: true,
  requestNotifications: true,
  marketingNotifications: false,
};

const defaultPrivacy: PrivacySettings = {
  showOnlineStatus: true,
  showDistance: true,
  showProfilePublicly: true,
  readReceipts: true,
};

const defaultSecurity: SecuritySettings = {
  biometricLogin: false,
  deviceSessions: true,
  changePasswordEnabled: true,
};

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      notifications: defaultNotifications,
      privacy: defaultPrivacy,
      security: defaultSecurity,
      setNotificationOption: (key, value) =>
        set((state) => ({
          notifications: { ...state.notifications, [key]: value },
        })),
      setPrivacyOption: (key, value) =>
        set((state) => ({
          privacy: { ...state.privacy, [key]: value },
        })),
      setSecurityOption: (key, value) =>
        set((state) => ({
          security: { ...state.security, [key]: value },
        })),
      resetAppData: () =>
        set({
          notifications: defaultNotifications,
          privacy: defaultPrivacy,
          security: defaultSecurity,
        }),
    }),
    {
      name: "settings-store",
      storage: createJSONStorage(() => createSecureStorage("social-app:")),
      partialize: (state) => ({
        notifications: state.notifications,
        privacy: state.privacy,
        security: state.security,
      }),
    }
  )
);
