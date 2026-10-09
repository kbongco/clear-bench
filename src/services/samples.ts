import { API_URL } from "./config";
import type {
  AllSamplesResponse,
  NewSample,
  Sample,
  SampleCreateResponse,
} from "../types/Samples/sample";
import type { SampleDetail } from "../types/Results/results";

export async function getSamples(id: string) {
  const response = await fetch(`${API_URL}/scientists/${id}/samples`);
  if (!response.ok) {
    throw new Error("Unable to fetch samples");
  }
  const data = await response.json();
  return data;
}

export async function getAllSamples(
  filters: { status?: string; department?: string } = {},
): Promise<AllSamplesResponse> {
  const params = new URLSearchParams();
  if (filters.status) params.set("status", filters.status);
  if (filters.department) params.set("department", filters.department);

  const response = await fetch(`${API_URL}/samples?${params}`);
  if (!response.ok) {
    throw new Error("Unable to fetch samples");
  }
  return response.json();
}

export async function getSample(id: number): Promise<SampleDetail | null> {
  const response = await fetch(`${API_URL}/samples/${id}`);
  if (response.status === 404) return null;
  if (!response.ok) {
    throw new Error("Unable to fetch sample results");
  }
  return response.json();
}

export async function createSample(sampleData: NewSample): Promise<SampleCreateResponse> {
  try {
    const response = await fetch(`${API_URL}/samples`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sampleData),
    });

    if (!response.ok) {
      throw new Error("Failed to create sample");
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function getPendingSamples(scientistId: number) {
  const response = await fetch(`${API_URL}/scientists/${scientistId}/samples?status=pending`);
  if (!response.ok) {
    throw new Error("Unable to fetch pending samples");
  }

  return response.json();
}

export async function approveSample(id: number, labTechId: number): Promise<Sample> {
  const response = await fetch(`${API_URL}/samples/${id}/approve`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ lab_tech_id: labTechId }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(typeof error?.detail === "string" ? error.detail : "Could not approve sample");
  }

  return response.json();
}

export async function rejectSample(id: number, labTechId: number, reason: string): Promise<Sample> {
  const response = await fetch(`${API_URL}/samples/${id}/reject`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ lab_tech_id: labTechId, reason }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(typeof error?.detail === "string" ? error.detail : "Could not reject sample");
  }

  return response.json();
}
