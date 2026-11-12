import { useState } from "react";
import { useCurrentUserStore } from "../store/useCurrentUserStore";
import { login } from "../services/auth";
import Login from "../Views/Login/Login";
import { useLocation, Navigate } from "react-router-dom";
import type { Location } from "react-router-dom";

export default function LoginContainer() {
  const setCurrentUser = useCurrentUserStore((state) => state.setCurrentUser);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleLogin(email: string, password: string) {
    setError(null);
    setSubmitting(true);
    try {
      const user = await login(email, password);
      setCurrentUser(user);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not log in");
    } finally {
      setSubmitting(false);
    }
  }

  const user = useCurrentUserStore((state) => state.user);
  const location = useLocation();
  const from = (location.state as { from?: Location } | null)?.from?.pathname ?? "/";

  if (user) return <Navigate to={from} replace />;

  return <Login onLogin={handleLogin} error={error} submitting={submitting} />;
}
