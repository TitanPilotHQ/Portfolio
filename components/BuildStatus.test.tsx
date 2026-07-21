// @vitest-environment jsdom
import { afterEach, beforeAll, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { BuildStatus } from "./BuildStatus";
import { BUILD_STATUS } from "@/lib/content";

beforeAll(() => {
  class IntersectionObserverStub {
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return [];
    }
  }
  // @ts-expect-error test stub, not a full IntersectionObserver implementation
  global.IntersectionObserver = IntersectionObserverStub;
});

afterEach(() => {
  cleanup();
});

describe("BuildStatus", () => {
  it("renders the exact owner-approved wording, unmodified", () => {
    render(<BuildStatus />);
    expect(screen.getByText(BUILD_STATUS.title)).toBeTruthy();
    expect(screen.getByText(BUILD_STATUS.body)).toBeTruthy();
    for (const fact of BUILD_STATUS.facts) {
      expect(screen.getByText(fact)).toBeTruthy();
    }
    expect(screen.getByText(BUILD_STATUS.disclosure)).toBeTruthy();
  });

  it("does not mention internal infrastructure", () => {
    render(<BuildStatus />);
    const text = document.body.textContent ?? "";
    for (const forbidden of ["tailnet", "Tailscale", "VPN", "VPS"]) {
      expect(text).not.toContain(forbidden);
    }
  });
});
