import type { ScientistSummary } from "../types/Samples/sample";
import { apiFetch } from "./config";

export async function getScientists(): Promise<ScientistSummary[]> {
  const response = await apiFetch(`/scientists`);
  if (!response.ok) {
    throw new Error("Unable to apiFetch scientists");
  }
  const data = await response.json();
  return data;
}
