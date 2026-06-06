import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { createSecureStorage } from "@/src/utils/storage";
import { Profile } from "@/src/types/domain";

export interface ProfileState extends Profile {
  fullName: string;
  age: string;
  image: string;
  completed: boolean;
}

interface ProfileStore {
  profile: ProfileState;
  hasHydrated: boolean;
  updateProfile: (patch: Partial<ProfileState>) => void;
  updatePhotos: (photos: string[]) => void;
  setCompleted: (value: boolean) => void;
  setHasHydrated: (value: boolean) => void;
}

const initialProfile: ProfileState = {
  fullName: "Alex Mercer",
  age: "28",
  image: "",
  bio: "A product-minded creative who likes long conversations, bold ideas, and weekend trips.",
  education: "University of Delhi",
  profession: "Product Designer",
  business: "Mercer Studio",
  location: "Mumbai",
  gender: "male",
  lookingFor: "female",
  interests: ["Design", "Travel", "Coffee"],
  languages: ["English", "Hindi"],
  socialLinks: {
    instagram: "instagram.com/alex",
    linkedin: "linkedin.com/in/alex",
  },
  photos: [],
  completed: false,
};

export const useProfileStore = create<ProfileStore>()(
  persist(
    (set) => ({
      profile: initialProfile,
      hasHydrated: false,
      updateProfile: (patch) =>
        set((state) => ({
          profile: { ...state.profile, ...patch },
        })),
      updatePhotos: (photos) =>
        set((state) => ({
          profile: { ...state.profile, photos },
        })),
      setCompleted: (value) =>
        set((state) => ({
          profile: { ...state.profile, completed: value },
        })),
      setHasHydrated: (value) => set({ hasHydrated: value }),
    }),
    {
      name: "profile-store",
      storage: createJSONStorage(() => createSecureStorage("social-app:")),
      partialize: (state) => ({ profile: state.profile }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
