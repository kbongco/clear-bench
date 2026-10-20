import { describe, expect, it } from "vitest";
import type { ProductSpec } from "../types/Specs/specs";
import groupBySampleType from "./groupBySampleType";

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

describe("groupBySampleType", () => {
  it("puts each spec under its sample type", () => {
    const specs = [
      makeSpec({ id: 1, sample_type: "Food" }),
      makeSpec({ id: 2, sample_type: "Cosmetics" }),
      makeSpec({ id: 3, sample_type: "Food" }),
    ];

    const groups = groupBySampleType(specs);

    expect(Object.keys(groups)).toEqual(["Food", "Cosmetics"]);
    expect(groups.Food.map((s) => s.id)).toEqual([1, 3]);
    expect(groups.Cosmetics.map((s) => s.id)).toEqual([2]);
  });

  it("returns an empty object for no specs", () => {
    const groups = groupBySampleType([]);

    expect(groups).toEqual({});
  });
});
