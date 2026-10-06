import { describe, expect, it } from "vitest";
import { toSampleRows } from "./toSampleRows";
import type { SampleWithOwner } from "../types/Samples/sample";

function makeSample(overrides: Partial<SampleWithOwner>): SampleWithOwner {
  return {
    id: 1,
    name: "Sample",
    scientist_id: 1,
    lab_tech_id: null,
    sample_type: null,
    test_status: "pending",
    test_start: null,
    test_types: [],
    due_date: null,
    test_duration: null,
    out_of_spec: false,
    totalBottles: 1,
    temperature: [],
    notes: null,
    scientist: { id: 1, name: "Dr. Alice Nguyen", department: "Food Safety" },
    ...overrides,
  };
}

describe("toSampleRows", () => {
  // a group of related tests
  it("returns an empty list for no samples", () => {
    // one test, named in plain English
    expect(toSampleRows([])).toEqual([]); // the check
  });

  it("formats the status for display", () => {
    const inProgress = makeSample({ test_status: "in_progress" });

    const rows = toSampleRows([inProgress]);

    expect(rows[0].Status).toBe("In progress");
  });

  it("returns no team", () => {
    const noTeam = makeSample({
      scientist: { id: 1, name: "Dr. Alice Nguyen", department: "" },
    });
    const rows = toSampleRows([noTeam]);
    expect(rows[0].Team).toBe("-");
  });

  it("shows a dash when there is no due date", () => {
    const rows = toSampleRows([makeSample({})]);
    expect(rows[0].Due).toBe("-");
  });

  it("keeps the samples in the same order", () => {
    const samples = [
      makeSample({ name: "A" }),
      makeSample({ name: "B" }),
      makeSample({ name: "C" }),
    ];
    const rows = toSampleRows(samples);
    expect(rows.map((row) => row.Name)).toEqual(["A", "B", "C"]);
  });
});
