import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { createSecureStorage } from "@/src/utils/storage";
import { Chat, ChatMessage } from "@/src/types/domain";
import { mockChats, mockMessages } from "@/src/mock/chats";

interface ChatStore {
  chats: Chat[];
  messages: Record<string, ChatMessage[]>;
  sendMessage: (chatId: string, text: string) => void;
  setTyping: (chatId: string, typing: boolean) => void;
  markRead: (chatId: string) => void;
  setChatAllowed: (chatId: string, allowed: boolean) => void;
}

export const useChatStore = create<ChatStore>()(
  persist(
    (set) => ({
      chats: mockChats,
      messages: mockMessages,
      sendMessage: (chatId, text) =>
        set((state) => {
          const nextMessage: ChatMessage = {
            id: `${chatId}-${Date.now()}`,
            chatId,
            senderId: "me",
            text,
            createdAt: new Date().toISOString(),
          };

          const nextMessages = {
            ...state.messages,
            [chatId]: [...(state.messages[chatId] ?? []), nextMessage],
          };

          const nextChats = state.chats.map((chat) =>
            chat.id === chatId
              ? {
                  ...chat,
                  lastMessage: text,
                  lastMessageAt: nextMessage.createdAt,
                  unreadCount: 0,
                }
              : chat
          );

          return {
            messages: nextMessages,
            chats: nextChats,
          };
        }),
      setTyping: (chatId, typing) =>
        set((state) => ({
          chats: state.chats.map((chat) =>
            chat.id === chatId ? { ...chat, typing } : chat
          ),
        })),
      markRead: (chatId) =>
        set((state) => ({
          chats: state.chats.map((chat) =>
            chat.id === chatId ? { ...chat, unreadCount: 0 } : chat
          ),
        })),
      setChatAllowed: (chatId, allowed) =>
        set((state) => ({
          chats: state.chats.map((chat) =>
            chat.id === chatId ? { ...chat, allowed } : chat
          ),
        })),
    }),
    {
      name: "chat-store",
      storage: createJSONStorage(() => createSecureStorage("social-app:")),
      partialize: (state) => ({
        chats: state.chats,
        messages: state.messages,
      }),
    }
  )
);
