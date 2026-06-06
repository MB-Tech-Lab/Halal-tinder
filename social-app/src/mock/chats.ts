import { Chat, ChatMessage } from "@/src/types/domain";
import { mockUsers } from "./users";

const now = Date.now();

export const mockChats: Chat[] = mockUsers.slice(0, 12).map((user, index) => ({
  id: `chat-${user.id}`,
  userId: user.id,
  name: user.name,
  avatar: user.photos[0],
  online: user.online,
  lastSeen: user.lastSeen,
  unreadCount: index % 3,
  lastMessage: index % 2 === 0 ? "Sounds good, let's do it." : "See you there!",
  lastMessageAt: new Date(now - index * 1000 * 60 * 18).toISOString(),
  typing: index % 5 === 0,
  allowed: index % 2 === 0,
}));

export const mockMessages: Record<string, ChatMessage[]> = Object.fromEntries(
  mockChats.map((chat, index) => [
    chat.id,
    [
      {
        id: `${chat.id}-m1`,
        chatId: chat.id,
        senderId: chat.userId,
        text: index % 2 === 0 ? "Hey, I liked your profile." : "Thanks for the request!",
        createdAt: new Date(now - 1000 * 60 * (12 + index)).toISOString(),
      },
      {
        id: `${chat.id}-m2`,
        chatId: chat.id,
        senderId: "me",
        text: "Would love to continue the conversation here.",
        createdAt: new Date(now - 1000 * 60 * (8 + index)).toISOString(),
      },
      {
        id: `${chat.id}-m3`,
        chatId: chat.id,
        senderId: chat.userId,
        text: chat.typing ? "Typing..." : "Sounds good, let's do it.",
        createdAt: new Date(now - 1000 * 60 * (2 + index)).toISOString(),
        isSystem: chat.typing,
      },
    ],
  ])
) as Record<string, ChatMessage[]>;
