import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { createSecureStorage } from "@/src/utils/storage";
import { NotificationItem } from "@/src/types/domain";
import { mockNotifications } from "@/src/mock/notifications";

interface NotificationStore {
  notifications: NotificationItem[];
  markAllRead: () => void;
  markAsRead: (id: string) => void;
  deleteNotification: (id: string) => void;
  deleteAll: () => void;
}

export const useNotificationStore = create<NotificationStore>()(
  persist(
    (set) => ({
      notifications: mockNotifications,
      markAllRead: () =>
        set((state) => ({
          notifications: state.notifications.map((item) => ({ ...item, unread: false })),
        })),
      markAsRead: (id) =>
        set((state) => ({
          notifications: state.notifications.map((item) =>
            item.id === id ? { ...item, unread: false } : item
          ),
        })),
      deleteNotification: (id) =>
        set((state) => ({
          notifications: state.notifications.filter((item) => item.id !== id),
        })),
      deleteAll: () => set({ notifications: [] }),
    }),
    {
      name: "notification-store",
      storage: createJSONStorage(() => createSecureStorage("social-app:")),
      partialize: (state) => ({ notifications: state.notifications }),
    }
  )
);
