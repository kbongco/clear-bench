import { describe, expect, it } from "vitest";
import { cellKey, isComplete, type CellValues } from "./resultCells";

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
});
