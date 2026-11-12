// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { afterEach, describe, expect, it } from "vitest";
import RequireAuth from "./RequireAuth";
import { useCurrentUserStore } from "../../store/useCurrentUserStore";

afterEach(cleanup);

function renderAt(path: string) {
  render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/login" element={<p>login page</p>} />
        <Route element={<RequireAuth />}>
          <Route path="/samples/1" element={<p>secret page</p>} />
        </Route>
      </Routes>
    </MemoryRouter>,
  );
}

it("sends logged-out users to /login", () => {
  useCurrentUserStore.setState({ user: null });
  renderAt("/samples/1");

  expect(screen.getByText("login page")).toBeTruthy();
  expect(screen.queryByText("secret page")).toBeNull();
});

it("shows the protected page to logged-in users", () => {
  useCurrentUserStore.setState({
    user: {
      id: 1,
      name: "Alice",
      role: "scientist",
    },
  });

  renderAt("/samples/1");

  expect(screen.getByText("secret page")).toBeTruthy();
  expect(screen.queryByText("login page")).toBeNull();
});
