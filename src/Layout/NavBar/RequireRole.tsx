import { Navigate, Outlet } from "react-router-dom";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import type { Role } from "../../store/useCurrentUserStore";

export default function RequireRole({ role }: { role: Role }) {
  const user = useCurrentUser();

  if (user.role !== role) return <Navigate to="/" replace />;
  return <Outlet />;
}
