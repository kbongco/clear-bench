import { describe, expect, it } from "vitest";
import { summarizeHistory } from "./summarizeHistory";
import type { AuditEvent } from "../types/Results/results";

function makeEvent(overrides: Partial<AuditEvent>): AuditEvent {
  return {
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
  };
}

const submittedEvent = makeEvent({
  id: 1,
  action: "submitted",
  from_status: null,
  to_status: "pending",
});
const approvedEvent = makeEvent({
  id: 2,
  action: "approved",
  actor_role: "lab_tech",
  actor_name: "Marcus",
  from_status: "pending",
  to_status: "in_progress",
});
const resultsEvent = makeEvent({
  id: 3,
  action: "results_entered",
  actor_role: "lab_tech",
  actor_name: "Marcus",
  from_status: "in_progress",
  to_status: "completed",
});

describe("summarizeHistory", () => {
  it("returns the submitted, approved, and most recent events", () => {
    const events = [resultsEvent, approvedEvent, submittedEvent];

    const result = summarizeHistory(events);

    expect(result.submitted).toEqual(submittedEvent);
    expect(result.approved).toEqual(approvedEvent);
    expect(result.lastUpdate).toEqual(resultsEvent);
  });

  it("returns null for approved when there is only a submitted event", () => {
    const events = [submittedEvent];

    const result = summarizeHistory(events);

    expect(result.submitted).toEqual(submittedEvent);
    expect(result.approved).toBeNull();
    expect(result.lastUpdate).toEqual(submittedEvent);
  });

  it("returns null for all values when there are no events", () => {
    const events: AuditEvent[] = [];

    const result = summarizeHistory(events);

    expect(result.submitted).toBeNull();
    expect(result.approved).toBeNull();
    expect(result.lastUpdate).toBeNull();
  });

  it("returns the approved event as both approved and lastUpdate when it is newest", () => {
    const events = [approvedEvent, submittedEvent];

    const result = summarizeHistory(events);

    expect(result.submitted).toEqual(submittedEvent);
    expect(result.approved).toEqual(approvedEvent);
    expect(result.lastUpdate).toEqual(approvedEvent);
  });

  it("does not change the input array", () => {
    const events = [resultsEvent, approvedEvent, submittedEvent];
    const copy = [...events];

    summarizeHistory(events);

    expect(events).toEqual(copy);
  });
});
