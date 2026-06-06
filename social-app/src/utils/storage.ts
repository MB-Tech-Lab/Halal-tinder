import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
import { StateStorage } from "zustand/middleware";

export function createSecureStorage(keyPrefix = ""): StateStorage {
  const isWeb = Platform.OS === "web";

  return {
    getItem: async (name) => {
      if (isWeb) {
        return globalThis.localStorage?.getItem(`${keyPrefix}${name}`) ?? null;
      }

      const result = await SecureStore.getItemAsync(`${keyPrefix}${name}`);
      return result ?? null;
    },
    setItem: async (name, value) => {
      if (isWeb) {
        globalThis.localStorage?.setItem(`${keyPrefix}${name}`, value);
        return;
      }

      await SecureStore.setItemAsync(`${keyPrefix}${name}`, value);
    },
    removeItem: async (name) => {
      if (isWeb) {
        globalThis.localStorage?.removeItem(`${keyPrefix}${name}`);
        return;
      }

      await SecureStore.deleteItemAsync(`${keyPrefix}${name}`);
    },
  };
}
