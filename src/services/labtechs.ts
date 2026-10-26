import type { LabTechSummary } from "../types/Results/results";
import { API_URL } from "./config";

export async function getLabTechs(): Promise<LabTechSummary[]> {
  const response = await fetch(`${API_URL}/lab-techs`);
  if (!response.ok) {
    throw new Error("Unable to fetch lab techs");
  }
  const data = await response.json();
  return data;
}
