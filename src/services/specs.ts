import type { ProductSpec } from "../types/Specs/specs";
import { apiFetch } from "./config";

export async function getSpecs(sampleType?: string): Promise<ProductSpec[]> {
  const params = new URLSearchParams();
  if (sampleType) params.set("sample_type", sampleType);

  const response = await apiFetch(`/specs?${params}`);
  if (!response.ok) {
    throw new Error("Unable to fetch specs");
  }
  return response.json();
}
