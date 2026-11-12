import { create } from "zustand";
import { getMe } from "../services/auth";

export type Role = "scientist" | "labtech";

export interface CurrentUser {
  role: Role;
  id: number;
  name: string;
}

interface CurrentUserStore {
  user: CurrentUser | null;
  status: "loading" | "ready";
  setCurrentUser: (user: CurrentUser | null) => void;
  loadCurrentUser: () => Promise<void>;
}

export const useCurrentUserStore = create<CurrentUserStore>()((set) => ({
  user: null,
  status: "loading",
  setCurrentUser: (user) => set({ user }),
  loadCurrentUser: async () => {
    try {
      const user = await getMe();
      set({ user, status: "ready" });
    } catch {
      set({ user: null, status: "ready" });
    }
  },
}));
