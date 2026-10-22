import { describe, expect, it } from "vitest";
import type { TestResult } from "../types/Results/results";
import formatMeasured from "./formatMeasured";

function makeTestResult(overrides: Partial<TestResult>): TestResult {
  return {
    id: 1,
    result_id: 1,
    parameter_name: "pH",
    measured_value: null,
    unit: null,
    passed: null,
    test_type: "ph",
    condition: "25C",
    expected_range_min: null,
    expected_range_max: null,
    specification_limit: null,
    is_within_spec: true,
    notes: null,
    ...overrides,
  };
}

describe("formatMeasured", () => {
  it("formats a measured value with a unit", () => {
    expect(
      formatMeasured(
        makeTestResult({
          measured_value: 0.82,
          unit: "aw",
        }),
      ),
    ).toBe("0.82 aw");
  });

  it("formats a measured value without a unit", () => {
    expect(
      formatMeasured(
        makeTestResult({
          measured_value: 4.2,
        }),
      ),
    ).toBe("4.2");
  });

  it("returns Pass when passed is true", () => {
    expect(
      formatMeasured(
        makeTestResult({
          passed: true,
        }),
      ),
    ).toBe("Pass");
  });

  it("returns Fail when passed is false", () => {
    expect(
      formatMeasured(
        makeTestResult({
          passed: false,
        }),
      ),
    ).toBe("Fail");
  });

  it("returns a dash when the measured value and passed are null", () => {
    expect(formatMeasured(makeTestResult({}))).toBe("-");
  });
});
