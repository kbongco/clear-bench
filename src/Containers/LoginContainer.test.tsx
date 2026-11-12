// @vitest-environment jsdom

import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { MemoryRouter, Route, Routes, type MemoryRouterProps } from "react-router-dom";

import LoginContainer from "./LoginContainer";
import { login } from "../services/auth";
import { useCurrentUserStore } from "../store/useCurrentUserStore";
import { DEMO_LABTECH_EMAIL, DEMO_PASSWORD } from "../constants/demoAccounts";

// Mock the auth service while keeping the real store and container.
vi.mock("../services/auth", () => ({
  login: vi.fn(),
}));

const mockedLogin = vi.mocked(login);

const alice = {
  role: "scientist" as const,
  id: 1,
  name: "Alice",
};

afterEach(() => {
  cleanup();
});

beforeEach(() => {
  vi.clearAllMocks();
  useCurrentUserStore.setState({ user: null });
});

function renderLogin(initialEntries: MemoryRouterProps["initialEntries"]= ["/login"]) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <Routes>
        <Route path="/login" element={<LoginContainer />} />
        <Route path="/samples/1" element={<p>Sample page</p>} />
        <Route path="/" element={<p>Home page</p>} />
      </Routes>
    </MemoryRouter>,
  );
}

describe("LoginContainer", () => {
  // ---------------------------------------------------------
  // FAILING LOGIN
  // ---------------------------------------------------------

  // 1. Shows the server's error message.
  it("shows the server error message when login fails", async () => {
    const user = userEvent.setup();

    mockedLogin.mockRejectedValueOnce(new Error("Invalid email or password"));

    renderLogin();

    await user.click(screen.getByRole("button", { name: "Try as a scientist" }));

    const alert = await screen.findByRole("alert");
    expect(alert.textContent).toBe("Invalid email or password");
  });

  // 2. Shows a fallback when the rejection is not an Error.
  it("shows a fallback message when login rejects with a non-Error", async () => {
    const user = userEvent.setup();

    mockedLogin.mockRejectedValueOnce("boom");

    renderLogin();

    await user.click(screen.getByRole("button", { name: "Try as a scientist" }));

    const alert = await screen.findByRole("alert");
    expect(alert.textContent).toBe("Could not log in");
  });

  // 3. User stays logged out after a failed login.
  it("keeps the user logged out after login fails", async () => {
    const user = userEvent.setup();

    mockedLogin.mockRejectedValueOnce(new Error("Invalid email or password"));

    renderLogin();

    await user.click(screen.getByRole("button", { name: "Try as a scientist" }));

    await screen.findByRole("alert");

    expect(useCurrentUserStore.getState().user).toBeNull();
  });

  // 4. Buttons become enabled again after a failed login.
  it("enables the Log in button again after login fails", async () => {
    const user = userEvent.setup();

    mockedLogin.mockRejectedValueOnce(new Error("Invalid email or password"));

    renderLogin();

    await user.click(screen.getByRole("button", { name: "Try as a scientist" }));

    await screen.findByRole("alert");

    expect(screen.getByRole<HTMLButtonElement>("button", { name: "Log in" }).disabled).toBe(false);
  });

  it("stores the logged-in user after successful login", async () => {
    const user = userEvent.setup();

    mockedLogin.mockResolvedValueOnce(alice);

    renderLogin();

    await user.click(screen.getByRole("button", { name: "Try as a scientist" }));

    // Wait for the async login handler to finish.
    expect(await screen.findByText("Home page")).toBeTruthy();

    expect(useCurrentUserStore.getState().user?.name).toBe("Alice");
  });

  // 6. Calls the auth service with lab tech demo credentials.
  it("calls login with the lab tech demo credentials", async () => {
    const user = userEvent.setup();

    mockedLogin.mockResolvedValueOnce({
      role: "labtech",
      id: 1,
      name: "Sarah",
    });

    renderLogin();

    await user.click(screen.getByRole("button", { name: "Try as a lab tech" }));

    expect(mockedLogin).toHaveBeenCalledOnce();
    expect(mockedLogin).toHaveBeenCalledWith(DEMO_LABTECH_EMAIL, DEMO_PASSWORD);
  });

  // ---------------------------------------------------------
  // REDIRECT AFTER LOGIN
  // ---------------------------------------------------------

  // 7. Returns the user to the protected page they originally wanted.
  it("redirects to the original page after successful login", async () => {
    const user = userEvent.setup();

    mockedLogin.mockResolvedValueOnce(alice);

    renderLogin([
      {
        pathname: "/login",
        state: {
          from: { pathname: "/samples/1" },
        },
      },
    ]);

    await user.click(screen.getByRole("button", { name: "Try as a scientist" }));

    expect(await screen.findByText("Sample page")).toBeTruthy();
  });

  // 8. Defaults to Home when there is no previous location.
  it("redirects to Home after successful login when no previous page exists", async () => {
    const user = userEvent.setup();

    mockedLogin.mockResolvedValueOnce(alice);

    renderLogin();

    await user.click(screen.getByRole("button", { name: "Try as a scientist" }));

    expect(await screen.findByText("Home page")).toBeTruthy();
  });

  // 9. Already logged-in users are redirected away from /login.
  it("redirects logged-in users away from the login page", () => {
    useCurrentUserStore.setState({ user: alice });

    renderLogin();

    expect(screen.getByText("Home page")).toBeTruthy();
    expect(screen.queryByRole("button", { name: "Log in" })).toBeNull();
  });
});
