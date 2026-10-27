import { describe, expect, it } from "vitest";
import type { SampleAPI } from "../types/Samples/sample";
import needsAttention from "./needsAttention";

function makeSample(overrides: Partial<SampleAPI> = {}): SampleAPI {
  return {
    id: 1,
    test_status: "pending",
    out_of_spec: false,
    due_date: null,
    ...overrides,
  } as SampleAPI;
}

describe("needsAttention", () => {
  it("returns an empty list for no samples", () => {
    expect(needsAttention([])).toEqual([]);
  });

  it("puts out-of-spec completed samples before in-progress samples", () => {
    const inProgress = makeSample({
      id: 1,
      test_status: "in_progress",
      out_of_spec: false,
      due_date: "2026-10-20",
    });

    const outOfSpec = makeSample({
      id: 2,
      test_status: "completed",
      out_of_spec: true,
    });

    const result = needsAttention([inProgress, outOfSpec]);

    expect(result.map((sample) => sample.id)).toEqual([2, 1]);
  });

  it("sorts in-progress samples by earliest due date first", () => {
    const later = makeSample({
      id: 1,
      test_status: "in_progress",
      due_date: "2026-11-15",
    });

    const earlier = makeSample({
      id: 2,
      test_status: "in_progress",
      due_date: "2026-11-01",
    });

    expect(needsAttention([later, earlier]).map((s) => s.id)).toEqual([2, 1]);
  });

  it("excludes pending, rejected, and completed in-spec samples", () => {
    const samples = [
      makeSample({ id: 1, test_status: "pending" }),
      makeSample({ id: 2, test_status: "rejected" }),
      makeSample({
        id: 3,
        test_status: "completed",
        out_of_spec: false,
      }),
    ];

    expect(needsAttention(samples)).toEqual([]);
  });

  it("returns only the first five qualifying samples by default", () => {
    const samples = Array.from({ length: 7 }, (_, index) =>
      makeSample({
        id: index + 1,
        test_status: "in_progress",
        out_of_spec: false,
        due_date: `2026-11-${String(index + 1).padStart(2, "0")}`,
      }),
    );

    const result = needsAttention(samples);

    expect(result).toHaveLength(5);
    expect(result.map((sample) => sample.id)).toEqual([1, 2, 3, 4, 5]);
  });

  it("puts in-progress samples with null due dates after dated samples", () => {
    const noDueDate = makeSample({
      id: 1,
      test_status: "in_progress",
      due_date: null,
    });

    const withDueDate = makeSample({
      id: 2,
      test_status: "in_progress",
      due_date: "2026-11-01",
    });

    expect(needsAttention([noDueDate, withDueDate]).map((s) => s.id)).toEqual([2, 1]);
  });

  it("does not mutate the original array", () => {
    const samples = [
      makeSample({
        id: 1,
        test_status: "in_progress",
        due_date: "2026-11-15",
      }),
      makeSample({
        id: 2,
        test_status: "in_progress",
        due_date: "2026-11-01",
      }),
      makeSample({
        id: 3,
        test_status: "completed",
        out_of_spec: true,
      }),
    ];

    const original = [...samples];

    needsAttention(samples);

    expect(samples).toEqual(original);
  });
});
