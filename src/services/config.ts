export const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";
export function apiFetch(path: string, options: RequestInit = {}): Promise<Response> {
  return fetch(`${API_URL}${path}`, { ...options, credentials: "include" });
}
