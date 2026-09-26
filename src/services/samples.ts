import { API_URL } from './config';
import { AllSamplesResponse } from '../types/Samples/sample';

export async function getSamples(id:string) {
  const response = await fetch(`${API_URL}/scientists/${id}/samples`);
  if (!response.ok) {
    throw new Error('Unable to fetch samples');
  }
  const data = await response.json();
  return data;
}

export async function getAllSamples(filters: { status?: string; department?: string } = {}): Promise<AllSamplesResponse> {
    const params = new URLSearchParams();
  if (filters.status) params.set('status', filters.status);
  if (filters.department) params.set('department', filters.department);

  const response = await fetch(`${API_URL}/samples?${params}`);
  if (!response.ok) {
    throw new Error('Unable to fetch samples');
  }
  return response.json();
}


export async function getSampleResults(id: number) {
  const response = await fetch(`${API_URL}/samples/results/${id}`);
  if (!response.ok) {
    throw new Error('Unable to fetch sample results');
  }
  const data = await response.json();
  return data;
}

export async function createSample(sampleData: any) {
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
    const response = await fetch(
      `${API_URL}/scientists/${scientistId}/samples?status=pending`
    );
    if (!response.ok) {
      throw new Error("Unable to fetch pending samples");
    }
  
    return response.json();
}