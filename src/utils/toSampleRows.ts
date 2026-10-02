import type { SampleWithOwner } from "../types/Samples/sample";
import { formatStatus } from "./formatStatus";

export function toSampleRows(samples: SampleWithOwner[]) {
  return samples.map((sample) => ({
    id: sample.id,
    Name: sample.name,
    Scientist: sample.scientist.name,
    Team: sample.scientist.department || "-",
    Status: formatStatus(sample.test_status),
    Due: sample.due_date || "-",
  }));
}
