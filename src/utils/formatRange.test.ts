import { describe, it, expect } from "vitest";
import formatRange from "./formatRange";

describe("formatRange", () => {
  it("formats a range when both minimum and maximum are provided", () => {
    expect(formatRange(6.5, 7.5)).toBe("6.5 – 7.5");
  });

  it("formats an upper limit when the minimum is null", () => {
    expect(formatRange(null, 110)).toBe("≤ 110");
  });

  it("formats a lower limit when the maximum is null", () => {
    expect(formatRange(6.5, null)).toBe("≥ 6.5");
  });

  it("returns a dash when both values are null", () => {
    expect(formatRange(null, null)).toBe("-");
  });

  it("preserves zero as a valid minimum value", () => {
    expect(formatRange(0, 10)).toBe("0 – 10");
  });
});
