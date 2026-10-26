import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Role = "scientist" | "labtech";

export interface CurrentUser {
  role: Role;
  id: number;
  name: string;
}

interface CurrentUserStore {
  user: CurrentUser;
  setCurrentUser: (user: CurrentUser) => void;
}

export const useCurrentUserStore = create<CurrentUserStore>()(
  persist(
    (set) => ({
      user: { role: "scientist", id: 1, name: "Dr. Alice Nguyen" }, // the default
      setCurrentUser: (user) => set({ user }),
    }),
    { name: "current-user" },
  ),
);
