// @vitest-environment jsdom
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { EvidenceExplorerNote } from "./EvidenceExplorerNote";
import { EVIDENCE_EXPLORER_NOTE } from "@/lib/content";

describe("EvidenceExplorerNote", () => {
  it("renders the exact owner-approved wording, unmodified", () => {
    render(<EvidenceExplorerNote />);
    expect(screen.getByText(EVIDENCE_EXPLORER_NOTE)).toBeTruthy();
  });

  it("does not claim evidence is already publicly available", () => {
    render(<EvidenceExplorerNote />);
    const text = document.body.textContent ?? "";
    expect(text).not.toMatch(/available now|live evidence|view evidence/i);
  });
});
