import { describe, expect, it } from "vitest";
import type { AuditEvent } from "../types/Results/results";
import { describeEvent } from "./describeEvent";

const makeEvent = (overrides: Partial<AuditEvent> = {}): AuditEvent => ({
  id: 1,
  action: "submitted",
  actor_role: "scientist",
  actor_id: 1,
  actor_name: "Alice",
  from_status: null,
  to_status: "pending",
  note: null,
  created_at: "2026-10-07T14:30:00Z",
  ...overrides,
});

describe("describeEvent", () => {
  it("describes a normal event", () => {
    const event = makeEvent({
      actor_name: "Marcus Lee",
    });

    expect(describeEvent(event, "UTC")).toBe("Marcus Lee · Oct 7, 2026, 2:30 PM");
  });

  it("returns fallback text when there is no event", () => {
    expect(describeEvent(null)).toBe("No information");
  });

  it("converts the event time to the specified timezone", () => {
    const event = makeEvent();

    expect(describeEvent(event, "America/New_York")).toContain("10:30 AM");
  });
});
