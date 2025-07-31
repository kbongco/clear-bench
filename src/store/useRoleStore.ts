// src/stores/useRoleStore.ts
import { create } from 'zustand';

type Role = 'scientist' | 'labtech';

interface RoleStore {
  role: Role;
  setRole: (newRole: Role) => void;
}

export const useRoleStore = create<RoleStore>((set) => ({
  role: 'scientist', // default
  setRole: (newRole) => set({ role: newRole }),
}));
