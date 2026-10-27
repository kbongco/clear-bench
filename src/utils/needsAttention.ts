import type { SampleAPI } from "../types/Samples/sample";

export default function needsAttention(samples: SampleAPI[], limit = 5): SampleAPI[] {
  const outOfSpec = samples.filter((s) => s.out_of_spec === true);

  const inProgress = samples
    .filter((s) => s.test_status === "in_progress" && s.out_of_spec !== true)
    .sort(byDueDate);

  return [...outOfSpec, ...inProgress].slice(0, limit);
}

export function byDueDate(a: SampleAPI, b: SampleAPI): number {
  if (a.due_date === b.due_date) return 0;
  if (a.due_date === null) return 1; // a has no date → a goes after b
  if (b.due_date === null) return -1; // b has no date → a goes before b
  return a.due_date < b.due_date ? -1 : 1;
}
