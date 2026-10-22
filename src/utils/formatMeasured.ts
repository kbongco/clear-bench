import type { TestResult } from "../types/Results/results";

export default function formatMeasured(t: TestResult): string {
  if (t.passed !== null) {
    return t.passed ? "Pass" : "Fail";
  }

  if (t.measured_value === null) {
    return "-";
  }

  return t.unit ? `${t.measured_value} ${t.unit}` : `${t.measured_value}`;
}
