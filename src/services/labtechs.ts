import type { LabTechSummary } from "../types/Results/results";
import { apiFetch } from "./config";

export async function getLabTechs(): Promise<LabTechSummary[]> {
  const response = await apiFetch(`/lab-techs`);
  if (!response.ok) {
    throw new Error("Unable to apiFetch lab techs");
  }
  const data = await response.json();
  return data;
}
