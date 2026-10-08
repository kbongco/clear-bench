import { describe, expect, it } from "vitest";
import { formatDateTime } from "./formatDateTime";

describe("formatDateTime", () => {
  it("formats a date and time in UTC", () => {
    expect(formatDateTime("2026-10-07T14:30:00Z", "UTC")).toBe("Oct 7, 2026, 2:30 PM");
  });

  it("converts the date and time to the specified timezone", () => {
    expect(formatDateTime("2026-10-07T14:30:00Z", "America/New_York")).toBe(
      "Oct 7, 2026, 10:30 AM",
    );
  });

  it("uses the timezone when the UTC date crosses into the next day", () => {
    expect(formatDateTime("2026-10-08T02:00:00Z", "America/New_York")).toBe(
      "Oct 7, 2026, 10:00 PM",
    );
  });

  it("returns Unknown date for an invalid date", () => {
    expect(formatDateTime("not a date")).toBe("Unknown date");
  });

  it("formats a date without an explicitly provided timezone", () => {
    const result = formatDateTime("2026-10-07T14:30:00Z");

    expect(result).toEqual(expect.any(String));
  });
});
