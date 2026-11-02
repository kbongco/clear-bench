// @vitest-environment jsdom
import { act, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import Toast from "./Toast";

describe("Toast", () => {
  // Fake timers let the test skip time instead of really waiting.
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("closes after duration even when the parent re-renders with a new onClose", () => {
    // vi.fn() creates a fake function that records every call.
    const first = vi.fn();
    const second = vi.fn();

    // Render the component with the first onClose callback.
    const { rerender } = render(
      <Toast message="Saved" type="success" duration={1000} onClose={first} />,
    );

    // Skip 600ms.
    act(() => vi.advanceTimersByTime(600));

    // Re-render with a new onClose callback.
    rerender(<Toast message="Saved" type="success" duration={1000} onClose={second} />);

    // Advance another 600ms, reaching 1200ms total.
    act(() => vi.advanceTimersByTime(600));

    expect(first).not.toHaveBeenCalled();
    expect(second).toHaveBeenCalledTimes(1);
  });

  it("closes at exactly the specified duration", () => {
    const onClose = vi.fn();

    render(<Toast message="Saved" type="success" duration={1000} onClose={onClose} />);

    // One millisecond before the duration, it should remain open.
    act(() => vi.advanceTimersByTime(999));
    expect(onClose).not.toHaveBeenCalled();

    // At exactly 1000ms, onClose should be called once.
    act(() => vi.advanceTimersByTime(1));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("uses the default duration of 8000ms when duration is omitted", () => {
    const onClose = vi.fn();

    render(<Toast message="Saved" type="success" onClose={onClose} />);

    // One millisecond before the default duration, it should remain open.
    act(() => vi.advanceTimersByTime(7999));
    expect(onClose).not.toHaveBeenCalled();

    // At exactly 8000ms, onClose should be called once.
    act(() => vi.advanceTimersByTime(1));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
