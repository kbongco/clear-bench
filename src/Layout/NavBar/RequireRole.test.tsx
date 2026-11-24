// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { afterEach, describe, expect, it } from "vitest";
import RequireRole from "./RequireRole";
import { useCurrentUserStore } from "../../store/useCurrentUserStore";

afterEach(cleanup);

function renderAt(path: string) {
  render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/" element={<p>home page</p>} />
        <Route element={<RequireRole role="scientist" />}>
          <Route path="/submit-samples" element={<p>submit page</p>} />
        </Route>
        <Route element={<RequireRole role="labtech" />}>
          <Route path="/approve-samples" element={<p>approve page</p>} />
        </Route>
      </Routes>
    </MemoryRouter>,
  );
}

function logInAs(role: "scientist" | "labtech") {
  useCurrentUserStore.setState({ user: { id: 1, name: "Test User", role } });
}

describe("RequireRole", () => {
  it("shows a scientist page to a scientist", () => {
    logInAs("scientist");
    renderAt("/submit-samples");

    expect(screen.getByText("submit page")).toBeTruthy();
    expect(screen.queryByText("home page")).toBeNull();
  });

  it("sends a lab tech away from a scientist page", () => {
    logInAs("labtech");
    renderAt("/submit-samples");

    expect(screen.getByText("home page")).toBeTruthy();
    expect(screen.queryByText("submit page")).toBeNull();
  });

  it("sends a scientist away from a lab tech page", () => {
    logInAs("scientist");
    renderAt("/approve-samples");

    expect(screen.getByText("home page")).toBeTruthy();
    expect(screen.queryByText("approve page")).toBeNull();
  });
});
