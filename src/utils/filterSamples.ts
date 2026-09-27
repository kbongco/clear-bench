import type { SampleWithOwner } from "../types/Samples/sample";

export function filterSamples(samples: SampleWithOwner[], search: string): SampleWithOwner[] {
  const query = search.trim().toLowerCase();
  if (!query) return samples;
  return samples.filter((sample) => 
   sample.name.toLowerCase().includes(query) ||
sample.scientist.name.toLowerCase().includes(query) || sample?.scientist?.department?.toLowerCase().includes(query) || sample.sample_type?.toLowerCase().includes(query)
  )
}