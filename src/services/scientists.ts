import type { ScientistSummary } from '../types/Samples/sample';
import { API_URL } from './config';

export async function getScientists():Promise<ScientistSummary[]> {
  const response = await fetch(`${API_URL}/scientists`);
  if (!response.ok) {
    throw new Error('Unable to fetch scientists');
  }
  const data = await response.json();
  return data;
}
