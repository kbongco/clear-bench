import { useCurrentUserStore, type CurrentUser } from "../store/useCurrentUserStore";

export function useCurrentUser(): CurrentUser {
  const user = useCurrentUserStore((state) => state.user);
  if (!user) throw new Error("useCurrentUser() needs a logged-in user");
  return user;
}
