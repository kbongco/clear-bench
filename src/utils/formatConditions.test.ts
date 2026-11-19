import { describe, expect, it } from "vitest";
import formatConditions from "./formatConditions";
import { storageConditions } from "../constants/formOptions";

describe("formatConditions", () => {
  it("formats a temperature condition", () => {
    expect(formatConditions("25C")).toBe("25°C");
  });

  it.each([
    ["20C", "20°C"],
    ["35C", "35°C"],
    ["40C", "40°C"],
  ])("formats %s as %s", (value, expected) => {
    expect(formatConditions(value)).toBe(expected);
  });

  it("leaves Frozen unchanged", () => {
    expect(formatConditions("Frozen")).toBe("Frozen");
  });

  it("returns unknown values unchanged", () => {
    expect(formatConditions("30C")).toBe("30C");
  });

  it("handles an empty string", () => {
    expect(formatConditions("")).toBe("");
  });

  it("does not format lowercase temperature values", () => {
    expect(formatConditions("25c")).toBe("25c");
  });

  it("returns the correct label for every storage condition option", () => {
    storageConditions.forEach((option) => {
      expect(formatConditions(option.value)).toBe(option.label);
    });
  });
});
