// @vitest-environment jsdom
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { ReplayIntroButton } from "./ReplayIntroButton";

afterEach(() => cleanup());

describe("ReplayIntroButton", () => {
  it("clears the titan_intro_last_seen localStorage key when clicked", () => {
    window.localStorage.setItem("titan_intro_last_seen", "1");
    render(<ReplayIntroButton />);
    fireEvent.click(screen.getByText("Replay intro"));
    expect(window.localStorage.getItem("titan_intro_last_seen")).toBeNull();
  });
});
