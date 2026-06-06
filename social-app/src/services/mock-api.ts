import { mockChats, mockMessages } from "@/src/mock/chats";
import { mockNotifications } from "@/src/mock/notifications";
import { mockUsers } from "@/src/mock/users";

const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchUsers() {
  await delay();
  return mockUsers;
}

export async function fetchChats() {
  await delay();
  return mockChats;
}

export async function fetchMessages(chatId: string) {
  await delay();
  return mockMessages[chatId] ?? [];
}

export async function fetchNotifications() {
  await delay();
  return mockNotifications;
}
