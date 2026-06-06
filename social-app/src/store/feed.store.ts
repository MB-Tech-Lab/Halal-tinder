import { create } from "zustand";
import { mockUsers } from "@/src/mock/users";
import { Gender, User } from "@/src/types/domain";
import { getVisibleUsers, searchUsers } from "@/src/features/feed/selectors";
import { useProfileStore } from "@/src/store/profile.store";

interface FeedStore {
  users: User[];
  searchQuery: string;
  isRefreshing: boolean;
  setSearchQuery: (query: string) => void;
  refreshUsers: () => void;
}

export const useFeedStore = create<FeedStore>((set) => ({
  users: mockUsers,
  searchQuery: "",
  isRefreshing: false,
  setSearchQuery: (query) => set({ searchQuery: query }),
  refreshUsers: () => {
    set({ isRefreshing: true });
    setTimeout(() => set({ isRefreshing: false, users: mockUsers }), 500);
  },
}));

export const useVisibleFeedUsers = () => {
  const users = useFeedStore((state) => state.users);
  const searchQuery = useFeedStore((state) => state.searchQuery);
  const viewerGender = useProfileStore((state) => state.profile.gender as Gender);

  const visible = getVisibleUsers(users, viewerGender);
  return searchUsers(visible, searchQuery);
};
