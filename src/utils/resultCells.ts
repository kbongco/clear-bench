import type { ProductSpec, ResultValue } from "../types/Specs/specs";

export type CellValues = Record<string, string>;

export function cellKey(testType: string, condition: string): string {
  return `${testType}|${condition}`;
}

export function isComplete(cells: CellValues, testTypes: string[], conditions: string[]): boolean {
  for (const testType of testTypes) {
    for (const condition of conditions) {
      const value = cells[cellKey(testType, condition)];
      if (!value || value.trim() === "") {
        return false;
      }
    }
  }
  return true;
}

export function buildResultValues(
  cells: CellValues,
  testTypes: string[],
  conditions: string[],
  specs: ProductSpec[],
): ResultValue[] {
  const kindByTest: Record<string, ProductSpec["kind"]> = {};
  for (const spec of specs) {
    kindByTest[spec.test_type] = spec.kind;
  }

  const values: ResultValue[] = [];
  for (const testType of testTypes) {
    for (const condition of conditions) {
      const text = cells[cellKey(testType, condition)]?.trim() ?? "";

      if (kindByTest[testType] === testType) {
        values.push({ test_type: testType, condition, passed: text === "passed" });
      } else {
        values.push({ test_type: testType, condition, measured_value: Number(text) });
      }
    }
  }
  return values;
}
