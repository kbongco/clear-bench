import { describe, expect, it } from "vitest";
import formatTestType from "./formatTestType";
import { foodTestDropdownOptions } from "../constants/formOptions";

describe("formatTestType", () => {
  it('formats camelCase: "waterActivity" → "Water Activity (aw)"', () => {
    expect(formatTestType("waterActivity")).toBe("Water Activity (aw)");
  });

  it('keeps special casing: "ph" → "pH Testing"', () => {
    expect(formatTestType("ph")).toBe("pH Testing");
  });

  it.each(foodTestDropdownOptions)('maps "$value" to its label "$label"', ({ value, label }) => {
    expect(formatTestType(value)).toBe(label);
  });

  it("returns an unknown value unchanged", () => {
    expect(formatTestType("stability")).toBe("stability");
  });

  it("returns an empty string unchanged", () => {
    expect(formatTestType("")).toBe("");
  });

  it('is case-sensitive: "WaterActivity" remains unchanged', () => {
    expect(formatTestType("WaterActivity")).toBe("WaterActivity");
  });

  it("works when used with .map", () => {
    const result = ["ph", "visual"].map(formatTestType).join(", ");

    expect(result).toBe("pH Testing, Visual Inspection");
  });
});
