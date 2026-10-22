import { describe, expect, it } from "vitest";
import { buildResultValues, cellKey, isComplete, type CellValues } from "./resultCells";
import type { ProductSpec } from "../types/Specs/specs";

describe("cellKey", () => {
  it("joins test type and condition with a pipe", () => {
    expect(cellKey("ph", "25C")).toBe("ph|25C");
  });

  it("gives different keys for the same test at different conditions", () => {
    expect(cellKey("ph", "25C")).not.toBe(cellKey("ph", "40C"));
  });
});

describe("isComplete", () => {
  const testTypes = ["ph", "visual"];
  const conditions = ["25C", "40C"];

  const allFilled: CellValues = {
    "ph|25C": "4.2",
    "ph|40C": "4.9",
    "visual|25C": "pass",
    "visual|40C": "fail",
  };

  it("is true when every cell has a value", () => {
    expect(isComplete(allFilled, testTypes, conditions)).toBe(true);
  });

  it("is false when a cell is missing", () => {
    const cells = { ...allFilled };
    delete cells["visual|40C"];
    expect(isComplete(cells, testTypes, conditions)).toBe(false);
  });

  it("is false when a cell is only spaces", () => {
    expect(isComplete({ ...allFilled, "ph|25C": "   " }, testTypes, conditions)).toBe(false);
  });

  it("counts 0 as a real value", () => {
    expect(isComplete({ ...allFilled, "ph|25C": "0" }, testTypes, conditions)).toBe(true);
  });

  it("is false for an empty form", () => {
    expect(isComplete({}, testTypes, conditions)).toBe(false);
  });

  const specs = [
    {
      id: 1,
      sample_type: "Food",
      test_type: "ph",
      parameter_name: "pH",
      kind: "numeric",
      unit: null,
      min_value: 3.5,
      max_value: 4.6,
    },
    {
      id: 2,
      sample_type: "Food",
      test_type: "visual",
      parameter_name: "Appearance",
      kind: "pass_fail",
      unit: null,
      min_value: null,
      max_value: null,
    },
  ] satisfies ProductSpec[];

  it("builds numeric and pass/fail values in grid order", () => {
    expect(buildResultValues(allFilled, testTypes, conditions, specs)).toEqual([
      { test_type: "ph", condition: "25C", measured_value: 4.2 },
      { test_type: "ph", condition: "40C", measured_value: 4.9 },
      { test_type: "visual", condition: "25C", passed: true },
      { test_type: "visual", condition: "40C", passed: false },
    ]);
  });
});
