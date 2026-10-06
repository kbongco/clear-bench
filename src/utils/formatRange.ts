export default function formatRange(
  expected_range_min: number | null,
  expected_range_max: number | null,
): string {
  if (expected_range_min === null && expected_range_max === null) {
    return "-";
  }

  if (expected_range_min === null) {
    return `≤ ${expected_range_max}`;
  }

  if (expected_range_max === null) {
    return `≥ ${expected_range_min}`;
  }

  return `${expected_range_min} – ${expected_range_max}`;
}
