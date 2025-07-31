// src/store/useRoleStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Role = 'scientist' | 'labtech';

interface RoleStore {
  role: Role;
  setRole: (newRole: Role) => void;
}

export const useRoleStore = create<RoleStore>()(
  persist(
    (set) => ({
      role: 'scientist', // default
      setRole: (newRole) => set({ role: newRole }),
    }),
    {
      name: 'role-storage', // name of the item in localStorage
    }
  )
);
