import type { CurrentUser } from "../store/useCurrentUserStore";
import { apiFetch } from "./config";

export async function login(email: string, password: string): Promise<CurrentUser> {
  const response = await apiFetch("/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: email, password: password }),
  });
  if (response.status === 401) throw new Error("Invalid email or password");
  if (!response.ok) throw new Error("Could not log in. Please try again.");
  return response.json();
}

export async function logout(): Promise<void> {
  await apiFetch("/auth/logout", { method: "POST" });
}

export async function getMe(): Promise<CurrentUser | null> {
  const response = await apiFetch("/auth/me");
  if (response.status === 401) return null;
  if (!response.ok) throw new Error("Could not check your login");
  return response.json();
}
