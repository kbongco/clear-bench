import { describe, expect, it } from "vitest";
import { applyAllOption } from "./applyAll";

const ALL_VALUES = ["Frozen", "20C", "25C", "35C", "40C"];

describe("applyAllOption", () => {
  it("checking all selects everything", () => {
    const prev: string[] = [];
    const next = ["all"];

    const result = applyAllOption(prev, next, ALL_VALUES);

    expect(result).toEqual(["all", "Frozen", "20C", "25C", "35C", "40C"]);
  });

  it("unchecking all clears everything", () => {
    const prev = ["all", ...ALL_VALUES];
    const next = [...ALL_VALUES];

    const result = applyAllOption(prev, next, ALL_VALUES);

    expect(result).toEqual([]);
  });

  it("checking one box adds just that box", () => {
    const prev: string[] = [];
    const next = ["Frozen"];

    const result = applyAllOption(prev, next, ALL_VALUES);

    expect(result).toEqual(["Frozen"]);
  });

  it("checking the last missing box adds all", () => {
    const prev = ["Frozen", "20C", "25C", "35C"];
    const next = ["Frozen", "20C", "25C", "35C", "40C"];

    const result = applyAllOption(prev, next, ALL_VALUES);

    expect(result).toEqual(["all", "Frozen", "20C", "25C", "35C", "40C"]);
  });

  it("unchecking one box while everything is selected removes all", () => {
    const prev = ["all", ...ALL_VALUES];
    const next = ["all", "Frozen", "20C", "25C", "35C"];

    const result = applyAllOption(prev, next, ALL_VALUES);

    expect(result).toEqual(["Frozen", "20C", "25C", "35C"]);
  });
});
