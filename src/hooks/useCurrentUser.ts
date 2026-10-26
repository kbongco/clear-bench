// src/hooks/useCurrentUser.ts
import { useCurrentUserStore, type CurrentUser } from "../store/useCurrentUserStore";

export function useCurrentUser(): CurrentUser {
  return useCurrentUserStore((state) => state.user);
}
