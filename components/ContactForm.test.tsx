// @vitest-environment jsdom
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { ContactForm } from "./ContactForm";

vi.mock("@vercel/analytics", () => ({
  track: vi.fn(),
}));

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

  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }),
  });
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

function fillValidForm() {
  fireEvent.change(screen.getByLabelText("Company Name"), { target: { value: "Acme Trading" } });
  fireEvent.change(screen.getByLabelText("Full Name"), { target: { value: "Jane Doe" } });
  fireEvent.change(screen.getByLabelText("Work Email"), {
    target: { value: "jane@example.com" },
  });
  fireEvent.change(screen.getByLabelText("Job Title"), { target: { value: "Head of Trading" } });
  fireEvent.change(screen.getByLabelText("Desk Size"), { target: { value: "6–10" } });
  fireEvent.change(screen.getByLabelText("Jurisdiction"), {
    target: { value: "United States" },
  });
  fireEvent.mouseDown(screen.getByRole("option", { name: "United States" }));
  fireEvent.click(screen.getByLabelText("FX"));
  fireEvent.change(screen.getByLabelText("Current AI Usage"), { target: { value: "ChatGPT" } });
  fireEvent.change(screen.getByLabelText("Current Governance Method"), {
    target: { value: "Manual Review" },
  });
  fireEvent.click(screen.getByLabelText("AI Governance"));
  fireEvent.change(screen.getByLabelText("Message"), {
    target: { value: "We want to evaluate Titan Pilot for our desk." },
  });
  fireEvent.click(screen.getByRole("checkbox", { name: /I agree to be contacted/i }));
}

describe("ContactForm client-side validation", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  it("disables native browser validation via noValidate", () => {
    render(<ContactForm />);
    const form = document.querySelector("form");
    expect(form).not.toBeNull();
    expect(form?.noValidate).toBe(true);
  });

  it("renders a custom inline error for a blank required field and makes no network request", () => {
    render(<ContactForm />);
    fillValidForm();
    // Leave Job Title blank.
    fireEvent.change(screen.getByLabelText("Job Title"), { target: { value: "" } });

    fireEvent.click(screen.getByRole("button", { name: /book an ai desk audit/i }));

    expect(screen.getByText("Job title is required")).toBeTruthy();
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("populates errors for every invalid field and focuses the first one", () => {
    render(<ContactForm />);
    // Submit completely empty.
    fireEvent.click(screen.getByRole("button", { name: /book an ai desk audit/i }));

    expect(screen.getByText("Company name is required")).toBeTruthy();
    expect(screen.getByText("Full name is required")).toBeTruthy();
    expect(screen.getByText("Enter a valid work email")).toBeTruthy();
    expect(screen.getByText("Job title is required")).toBeTruthy();
    expect(global.fetch).not.toHaveBeenCalled();

    // "company" is first in FIELD_ORDER and the first field in the form.
    expect(document.activeElement?.id).toBe("cf-company");
  });

  it("submits to the API when the form is fully valid", async () => {
    vi.mocked(global.fetch).mockResolvedValue(
      new Response(JSON.stringify({ success: true, leadId: "TP-2026-000001" }), {
        status: 200,
      }),
    );
    render(<ContactForm />);
    fillValidForm();

    fireEvent.click(screen.getByRole("button", { name: /book an ai desk audit/i }));

    await screen.findByText("Thank you.");
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      "/api/contact",
      expect.objectContaining({ method: "POST" }),
    );
  });

  it("still renders server-side field errors returned as a 400", async () => {
    vi.mocked(global.fetch).mockResolvedValue(
      new Response(
        JSON.stringify({
          error: "Validation failed",
          fieldErrors: { workEmail: ["Enter a valid work email"] },
        }),
        { status: 400 },
      ),
    );
    render(<ContactForm />);
    fillValidForm();

    fireEvent.click(screen.getByRole("button", { name: /book an ai desk audit/i }));

    await screen.findByText("Enter a valid work email");
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it("keeps errors linked via aria-describedby, aria-invalid, and role=alert", () => {
    render(<ContactForm />);
    fillValidForm();
    fireEvent.change(screen.getByLabelText("Job Title"), { target: { value: "" } });
    fireEvent.click(screen.getByRole("button", { name: /book an ai desk audit/i }));

    const jobTitleInput = screen.getByLabelText("Job Title");
    expect(jobTitleInput.getAttribute("aria-invalid")).toBe("true");
    expect(jobTitleInput.getAttribute("aria-describedby")).toBe("cf-title-error");

    const errorEl = document.getElementById("cf-title-error");
    expect(errorEl).not.toBeNull();
    expect(errorEl?.getAttribute("role")).toBe("alert");
  });

  it("supports a keyboard-only flow: Tab reaches Job Title and it is typeable", () => {
    render(<ContactForm />);
    const jobTitleInput = screen.getByLabelText("Job Title") as HTMLInputElement;
    jobTitleInput.focus();
    expect(document.activeElement).toBe(jobTitleInput);
    fireEvent.change(jobTitleInput, { target: { value: "CTO" } });
    expect(jobTitleInput.value).toBe("CTO");
  });
});
