import type { ProductSpec } from "../types/Specs/specs";

export default function groupBySampleType(specs: ProductSpec[]): Record<string, ProductSpec[]> {
  const groups: Record<string, ProductSpec[]> = {};

  for (const spec of specs) {
    const key = spec.sample_type;
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(spec);
  }

  return groups;
}