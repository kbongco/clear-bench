import { useCurrentUserStore } from "../store/useCurrentUserStore";
export const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

export async function apiFetch(path: string, options: RequestInit = {}): Promise<Response> {
  const response = await fetch(`${API_URL}${path}`, { ...options, credentials: "include" });
  if (response.status === 401) {
    useCurrentUserStore.getState().setCurrentUser(null);
  }
  return response;
}
