import { describe, expect, it } from "vitest";
import type { ProductSpec } from "../types/Specs/specs";
import formatLimit from "./formatLimit";

function makeSpec(overrides: Partial<ProductSpec>): ProductSpec {
  return {
    id: 1,
    sample_type: "Food",
    test_type: "ph",
    parameter_name: "pH",
    kind: "numeric",
    unit: null,
    min_value: null,
    max_value: null,
    ...overrides,
  };
}

describe("formatLimit", () => {
  it("shows a range with no unit", () => {
    expect(
      formatLimit(
        makeSpec({
          min_value: 3.5,
          max_value: 4.6,
        }),
      ),
    ).toBe("3.5 – 4.6");
  });

  it("shows an upper limit with a unit", () => {
    expect(
      formatLimit(
        makeSpec({
          max_value: 0.85,
          unit: "aw",
        }),
      ),
    ).toBe("≤ 0.85 aw");
  });

  it("shows pass/fail for a pass/fail spec", () => {
    expect(
      formatLimit(
        makeSpec({
          kind: "pass_fail",
        }),
      ),
    ).toBe("Pass / fail");
  });

  it("ignores limits for a pass/fail spec", () => {
    expect(
      formatLimit(
        makeSpec({
          kind: "pass_fail",
          min_value: 3.5,
          max_value: 4.6,
          unit: "pH",
        }),
      ),
    ).toBe("Pass / fail");
  });
});
