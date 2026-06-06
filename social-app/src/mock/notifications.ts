import { NotificationItem } from "@/src/types/domain";

export const mockNotifications: NotificationItem[] = [
  {
    id: "n1",
    title: "New profile request",
    description: "Meera accepted your profile request.",
    createdAt: new Date().toISOString(),
    unread: true,
  },
  {
    id: "n2",
    title: "New chat unlocked",
    description: "A chat was unlocked after a request was accepted.",
    createdAt: new Date(Date.now() - 1000 * 60 * 40).toISOString(),
    unread: true,
  },
  {
    id: "n3",
    title: "Theme saved",
    description: "Your selected theme has been synced securely.",
    createdAt: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
    unread: false,
  },
];
