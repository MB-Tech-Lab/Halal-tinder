import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { createSecureStorage } from "@/src/utils/storage";
import { ProfileRequest } from "@/src/types/domain";

interface RequestStore {
  requests: ProfileRequest[];
  sendRequest: (fromUserId: string, toUserId: string) => void;
  acceptRequest: (requestId: string) => void;
  rejectRequest: (requestId: string) => void;
  getRequestStatus: (fromUserId: string, toUserId: string) => ProfileRequest | undefined;
  getRequestForUser: (fromUserId: string, toUserId: string) => ProfileRequest | undefined;
  getRequestSummary: (fromUserId: string) => {
    sent: number;
    pending: number;
    accepted: number;
    rejected: number;
  };
}

export const useRequestStore = create<RequestStore>()(
  persist(
    (set, get) => ({
      requests: [
        {
          id: "req-1",
          fromUserId: "me",
          toUserId: "user-2",
          status: "accepted",
          createdAt: new Date().toISOString(),
        },
        {
          id: "req-2",
          fromUserId: "me",
          toUserId: "user-4",
          status: "pending",
          createdAt: new Date().toISOString(),
        },
      ],
      sendRequest: (fromUserId, toUserId) =>
        set((state) => {
          const exists = state.requests.find(
            (request) => request.fromUserId === fromUserId && request.toUserId === toUserId
          );
          if (exists) return state;

          return {
            requests: [
              ...state.requests,
              {
                id: `req-${Date.now()}`,
                fromUserId,
                toUserId,
                status: "pending",
                createdAt: new Date().toISOString(),
              },
            ],
          };
        }),
      acceptRequest: (requestId) =>
        set((state) => ({
          requests: state.requests.map((request) =>
            request.id === requestId ? { ...request, status: "accepted" } : request
          ),
        })),
      rejectRequest: (requestId) =>
        set((state) => ({
          requests: state.requests.map((request) =>
            request.id === requestId ? { ...request, status: "rejected" } : request
          ),
        })),
      getRequestStatus: (fromUserId, toUserId) =>
        get().requests.find(
          (request) => request.fromUserId === fromUserId && request.toUserId === toUserId
        ),
      getRequestForUser: (fromUserId, toUserId) =>
        get().requests.find(
          (request) => request.fromUserId === fromUserId && request.toUserId === toUserId
        ),
      getRequestSummary: (fromUserId) => {
        const records = get().requests.filter((request) => request.fromUserId === fromUserId);
        return {
          sent: records.length,
          pending: records.filter((item) => item.status === "pending").length,
          accepted: records.filter((item) => item.status === "accepted").length,
          rejected: records.filter((item) => item.status === "rejected").length,
        };
      },
    }),
    {
      name: "request-store",
      storage: createJSONStorage(() => createSecureStorage("social-app:")),
      partialize: (state) => ({ requests: state.requests }),
    }
  )
);
