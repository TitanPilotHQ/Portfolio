// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { EntryControls } from "./EntryControls";

afterEach(() => cleanup());

describe("EntryControls", () => {
  it("awaiting_entry variant shows Enter Titan and a sound toggle, no skip button", () => {
    const onEnter = vi.fn();
    const onSkip = vi.fn();
    render(
      <EntryControls variant="awaiting_entry" onEnter={onEnter} onSkip={onSkip} />
    );
    expect(screen.getByText("Enter Titan")).toBeTruthy();
    expect(screen.queryByText("Skip intro")).toBeFalsy();
  });

  it("defaults to sound on, and Enter Titan passes 'on'", () => {
    const onEnter = vi.fn();
    render(
      <EntryControls variant="awaiting_entry" onEnter={onEnter} onSkip={vi.fn()} />
    );
    fireEvent.click(screen.getByText("Enter Titan"));
    expect(onEnter).toHaveBeenCalledWith("on");
  });

  it("toggling the sound control switches the label and the value Enter Titan passes", () => {
    const onEnter = vi.fn();
    render(
      <EntryControls variant="awaiting_entry" onEnter={onEnter} onSkip={vi.fn()} />
    );
    fireEvent.click(screen.getByLabelText("Turn sound off"));
    expect(screen.getByLabelText("Turn sound on")).toBeTruthy();
    fireEvent.click(screen.getByText("Enter Titan"));
    expect(onEnter).toHaveBeenCalledWith("muted");
  });

  it("ignores a second rapid Enter Titan click (double-click guard)", () => {
    const onEnter = vi.fn();
    render(
      <EntryControls variant="awaiting_entry" onEnter={onEnter} onSkip={vi.fn()} />
    );
    const button = screen.getByText("Enter Titan");
    fireEvent.click(button);
    fireEvent.click(button);
    expect(onEnter).toHaveBeenCalledTimes(1);
  });

  it("in_progress variant shows only Skip intro, and Escape triggers it", () => {
    const onSkip = vi.fn();
    render(
      <EntryControls variant="in_progress" onEnter={vi.fn()} onSkip={onSkip} />
    );
    expect(screen.queryByText("Enter Titan")).toBeFalsy();
    fireEvent.click(screen.getByText("Skip intro"));
    expect(onSkip).toHaveBeenCalledTimes(1);
  });

  it("in_progress variant triggers skip on Escape keydown", () => {
    const onSkip = vi.fn();
    render(
      <EntryControls variant="in_progress" onEnter={vi.fn()} onSkip={onSkip} />
    );
    fireEvent.keyDown(window, { key: "Escape" });
    expect(onSkip).toHaveBeenCalledTimes(1);
  });
});
