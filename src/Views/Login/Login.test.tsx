// @vitest-environment jsdom

import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import Login from "./Login";
import {
  DEMO_LABTECH_EMAIL,
  DEMO_PASSWORD,
  DEMO_SCIENTIST_EMAIL,
} from "../../constants/demoAccounts";

afterEach(cleanup);

describe("Login", () => {
  // 1. Typing an email and password and clicking Log in
  // calls onLogin with the entered values.
  it("calls onLogin with the entered email and password", async () => {
    const user = userEvent.setup();
    const onLogin = vi.fn().mockResolvedValue(undefined);

    render(<Login onLogin={onLogin} error={null} submitting={false} />);

    await user.type(screen.getByLabelText(/email/i), "alice@test.com");
    await user.type(screen.getByLabelText(/password/i), "mypassword");
    await user.click(screen.getByRole("button", { name: "Log in" }));

    expect(onLogin).toHaveBeenCalledOnce();
    expect(onLogin).toHaveBeenCalledWith("alice@test.com", "mypassword");
  });

  // 2. Scientist demo button uses the scientist demo credentials.
  it("logs in with scientist demo credentials", async () => {
    const user = userEvent.setup();
    const onLogin = vi.fn().mockResolvedValue(undefined);

    render(<Login onLogin={onLogin} error={null} submitting={false} />);

    await user.click(screen.getByRole("button", { name: "Try as a scientist" }));

    expect(onLogin).toHaveBeenCalledWith(DEMO_SCIENTIST_EMAIL, DEMO_PASSWORD);
  });

  // 3. Lab tech demo button uses the lab tech demo credentials.
  it("logs in with lab tech demo credentials", async () => {
    const user = userEvent.setup();
    const onLogin = vi.fn().mockResolvedValue(undefined);

    render(<Login onLogin={onLogin} error={null} submitting={false} />);

    await user.click(screen.getByRole("button", { name: "Try as a lab tech" }));

    expect(onLogin).toHaveBeenCalledWith(DEMO_LABTECH_EMAIL, DEMO_PASSWORD);
  });

  // 4. Demo buttons must not also submit the form.
  it("calls onLogin exactly once when the scientist demo button is clicked", async () => {
    const user = userEvent.setup();
    const onLogin = vi.fn().mockResolvedValue(undefined);

    render(<Login onLogin={onLogin} error={null} submitting={false} />);

    await user.click(screen.getByRole("button", { name: "Try as a scientist" }));

    expect(onLogin).toHaveBeenCalledTimes(1);
  });

  it("calls onLogin exactly once when the lab tech demo button is clicked", async () => {
    const user = userEvent.setup();
    const onLogin = vi.fn().mockResolvedValue(undefined);

    render(<Login onLogin={onLogin} error={null} submitting={false} />);

    await user.click(screen.getByRole("button", { name: "Try as a lab tech" }));

    expect(onLogin).toHaveBeenCalledTimes(1);
  });

  // 5. Error message is accessible through role="alert".
  it("displays the error message as an alert", () => {
    const onLogin = vi.fn().mockResolvedValue(undefined);

    render(<Login onLogin={onLogin} error="Invalid email or password" submitting={false} />);

    expect(screen.getByRole("alert").textContent).toBe("Invalid email or password");
  });

  // 6. All three buttons are disabled while submitting.
  it("disables all three buttons while submitting", () => {
    const onLogin = vi.fn().mockResolvedValue(undefined);

    render(<Login onLogin={onLogin} error={null} submitting={true} />);

    expect(screen.getByRole<HTMLButtonElement>("button", { name: /logging in/i }).disabled).toBe(
      true,
    );
    expect(
      screen.getByRole<HTMLButtonElement>("button", { name: "Try as a scientist" }).disabled,
    ).toBe(true);
    expect(
      screen.getByRole<HTMLButtonElement>("button", { name: "Try as a lab tech" }).disabled,
    ).toBe(true);
  });
});
