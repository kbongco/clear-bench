import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useCurrentUserStore } from "../store/useCurrentUserStore";

export default function RequireAuth() {
  const user = useCurrentUserStore((state) => state.user);
  const location = useLocation();

  if (!user) return <Navigate to="/login" replace state={{ from: location }} />;
  return <Outlet />;
}
