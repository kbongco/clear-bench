import type { SampleAPI } from "../types/Samples/sample";

const STATUSES = ["pending", "in_progress", "completed", "rejected"] as const;
type Status = (typeof STATUSES)[number];

export type SampleSummary = Record<Status, number> & { out_of_spec: number };

function isStatus(value: string | null): value is Status {
  return value !== null && (STATUSES as readonly string[]).includes(value);
}

export default function summarizeSamples(samples: SampleAPI[]): SampleSummary {
  const counts: SampleSummary = {
    pending: 0,
    in_progress: 0,
    completed: 0,
    rejected: 0,
    out_of_spec: 0,
  };

  for (const sample of samples) {
    if (isStatus(sample.test_status)) counts[sample.test_status] += 1;
    if (sample.out_of_spec === true) counts.out_of_spec += 1;
  }

  return counts;
}
