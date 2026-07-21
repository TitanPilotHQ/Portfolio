// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { ReducedMotionReveal } from "./ReducedMotionReveal";

afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

describe("ReducedMotionReveal", () => {
  it("renders the Titan mark image", () => {
    render(<ReducedMotionReveal onComplete={vi.fn()} />);
    expect(screen.getByAltText("Titan Pilot")).toBeTruthy();
  });

  it("calls onComplete once after the dissolve sequence finishes", () => {
    vi.useFakeTimers();
    const onComplete = vi.fn();
    render(<ReducedMotionReveal onComplete={onComplete} />);
    vi.advanceTimersByTime(1300);
    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  it("does not call onComplete before the sequence finishes", () => {
    vi.useFakeTimers();
    const onComplete = vi.fn();
    render(<ReducedMotionReveal onComplete={onComplete} />);
    vi.advanceTimersByTime(200);
    expect(onComplete).not.toHaveBeenCalled();
  });
});
