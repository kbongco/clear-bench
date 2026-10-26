
import { describe, expect, it } from "vitest";
import parsePersonValue from "./parsePerson";

describe("parsePersonValue", () => {
  it("parses a scientist value", () => {
    expect(parsePersonValue("scientist:1")).toEqual({
      role: "scientist",
      id: 1,
    });
  });

  it("parses a labtech value", () => {
    expect(parsePersonValue("labtech:2")).toEqual({
      role: "labtech",
      id: 2,
    });
  });

  it("returns null for an unknown role", () => {
    expect(parsePersonValue("manager:1")).toBeNull();
  });

  it.each(["labtech", "labtech:"])(
    "returns null when the id is missing: %s",
    (value) => {
      expect(parsePersonValue(value)).toBeNull();
    }
  );

  it("returns null for a non-numeric id", () => {
    expect(parsePersonValue("labtech:abc")).toBeNull();
  });

  it("returns null for an empty string", () => {
    expect(parsePersonValue("")).toBeNull();
  });
});
