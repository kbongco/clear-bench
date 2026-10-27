import { describe, expect, it } from "vitest";
import type { SampleAPI } from "../types/Samples/sample";
import summarizeSamples from "./summarizeSamples";

function makeSample(overrides: Partial<SampleAPI> = {}): SampleAPI {
  return {
    id: 1,
    test_status: "pending",
    out_of_spec: false,
    ...overrides,
  } as SampleAPI;
}

describe("summarizeSamples", () => {
  it("returns zero counts for an empty list", () => {
    expect(summarizeSamples([])).toEqual({
      pending: 0,
      in_progress: 0,
      completed: 0,
      rejected: 0,
      out_of_spec: 0,
    });
  });

  it("counts one sample of each status", () => {
    const samples = [
      makeSample({ id: 1, test_status: "pending" }),
      makeSample({ id: 2, test_status: "in_progress" }),
      makeSample({ id: 3, test_status: "completed" }),
      makeSample({ id: 4, test_status: "rejected" }),
    ];

    expect(summarizeSamples(samples)).toEqual({
      pending: 1,
      in_progress: 1,
      completed: 1,
      rejected: 1,
      out_of_spec: 0,
    });
  });

  it("counts several samples with the same status", () => {
    const samples = [
      makeSample({ id: 1, test_status: "pending" }),
      makeSample({ id: 2, test_status: "pending" }),
      makeSample({ id: 3, test_status: "pending" }),
    ];

    expect(summarizeSamples(samples)).toEqual({
      pending: 3,
      in_progress: 0,
      completed: 0,
      rejected: 0,
      out_of_spec: 0,
    });
  });

  it("counts an out-of-spec sample alongside its status", () => {
    const samples = [
      makeSample({
        id: 1,
        test_status: "completed",
        out_of_spec: true,
      }),
    ];

    expect(summarizeSamples(samples)).toEqual({
      pending: 0,
      in_progress: 0,
      completed: 1,
      rejected: 0,
      out_of_spec: 1,
    });
  });

  it("does not count null out_of_spec values", () => {
    const samples = [
      makeSample({
        id: 1,
        test_status: "completed",
        out_of_spec: null,
      }),
      makeSample({
        id: 2,
        test_status: "pending",
        out_of_spec: true,
      }),
    ];

    expect(summarizeSamples(samples)).toEqual({
      pending: 1,
      in_progress: 0,
      completed: 1,
      rejected: 0,
      out_of_spec: 1,
    });
  });

  it("ignores unknown and null statuses", () => {
    const samples = [
      makeSample({ id: 1, test_status: null }),
      makeSample({ id: 2, test_status: "archived" }),
      makeSample({
        id: 3,
        test_status: "completed",
        out_of_spec: true,
      }),
    ];

    expect(summarizeSamples(samples)).toEqual({
      pending: 0,
      in_progress: 0,
      completed: 1,
      rejected: 0,
      out_of_spec: 1,
    });
  });
});
