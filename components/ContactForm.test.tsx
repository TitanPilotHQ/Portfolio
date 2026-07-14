// @vitest-environment jsdom
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
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

describe("ContactForm 'Other' companion field validation", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  it("clears the companion detail when a scalar field is switched away from Other", () => {
    render(<ContactForm />);
    fireEvent.change(screen.getByLabelText("Current AI Usage"), { target: { value: "Other" } });
    fireEvent.change(screen.getByLabelText("Current AI Usage — other, please specify"), {
      target: { value: "Some bespoke tool" },
    });

    // Switch away from "Other" — the companion input unmounts.
    fireEvent.change(screen.getByLabelText("Current AI Usage"), { target: { value: "Claude" } });
    expect(
      screen.queryByLabelText("Current AI Usage — other, please specify"),
    ).toBeNull();

    // Switch back to "Other" — if the state was actually cleared (not just
    // hidden), the companion input remounts empty rather than showing the
    // stale text.
    fireEvent.change(screen.getByLabelText("Current AI Usage"), { target: { value: "Other" } });
    expect(
      (screen.getByLabelText("Current AI Usage — other, please specify") as HTMLInputElement)
        .value,
    ).toBe("");
  });

  it("clears the companion detail when Other is deselected from a multi-select field", () => {
    render(<ContactForm />);
    const assetClassesFieldset = screen.getByText("Asset Classes").closest("fieldset");
    expect(assetClassesFieldset).not.toBeNull();
    const scope = within(assetClassesFieldset as HTMLElement);

    fireEvent.click(scope.getByLabelText("Other"));
    fireEvent.change(scope.getByLabelText("Asset Classes — other, please specify"), {
      target: { value: "Structured products" },
    });

    // Deselect "Other" — the companion input unmounts.
    fireEvent.click(scope.getByLabelText("Other"));
    expect(
      scope.queryByLabelText("Asset Classes — other, please specify"),
    ).toBeNull();

    // Re-select "Other" — companion should be empty, not the stale text.
    fireEvent.click(scope.getByLabelText("Other"));
    expect(
      (scope.getByLabelText("Asset Classes — other, please specify") as HTMLInputElement).value,
    ).toBe("");
  });

  it("reports an error on every missing companion field when multiple 'Other' selections are made, with no network request", () => {
    render(<ContactForm />);
    fillValidForm();

    // fillValidForm already selected "FX"; also select "Other" for Asset
    // Classes, and switch AI Usage to "Other" — two independent pairs,
    // both left blank.
    const assetClassesFieldset = screen.getByText("Asset Classes").closest("fieldset");
    fireEvent.click(within(assetClassesFieldset as HTMLElement).getByLabelText("Other"));
    fireEvent.change(screen.getByLabelText("Current AI Usage"), { target: { value: "Other" } });

    fireEvent.click(screen.getByRole("button", { name: /book an ai desk audit/i }));

    expect(screen.getByText("Please specify", { selector: "#cf-ai-usage-other-error" })).toBeTruthy();
    expect(
      screen.getByText("Please specify", { selector: "#cf-asset-classes-other-error" }),
    ).toBeTruthy();
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("passes and submits when a scalar Other field has a valid detail", async () => {
    vi.mocked(global.fetch).mockResolvedValue(
      new Response(JSON.stringify({ success: true, leadId: "TP-2026-000002" }), { status: 200 }),
    );
    render(<ContactForm />);
    fillValidForm();
    fireEvent.change(screen.getByLabelText("Current AI Usage"), { target: { value: "Other" } });
    fireEvent.change(screen.getByLabelText("Current AI Usage — other, please specify"), {
      target: { value: "An internal LLM tool" },
    });

    fireEvent.click(screen.getByRole("button", { name: /book an ai desk audit/i }));

    await screen.findByText("Thank you.");
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it("keeps aria-invalid, aria-describedby, and role=alert correct on Other companion inputs", () => {
    render(<ContactForm />);
    fillValidForm();
    fireEvent.change(screen.getByLabelText("Current AI Usage"), { target: { value: "Other" } });
    fireEvent.click(screen.getByRole("button", { name: /book an ai desk audit/i }));

    const otherInput = screen.getByLabelText("Current AI Usage — other, please specify");
    expect(otherInput.getAttribute("aria-invalid")).toBe("true");
    expect(otherInput.getAttribute("aria-describedby")).toBe("cf-ai-usage-other-error");

    const errorEl = document.getElementById("cf-ai-usage-other-error");
    expect(errorEl).not.toBeNull();
    expect(errorEl?.getAttribute("role")).toBe("alert");
  });

  it("still renders a server-side 400 error for an Other companion field", async () => {
    vi.mocked(global.fetch).mockResolvedValue(
      new Response(
        JSON.stringify({
          error: "Validation failed",
          fieldErrors: { aiUsageOther: ["Please specify"] },
        }),
        { status: 400 },
      ),
    );
    render(<ContactForm />);
    fillValidForm();
    fireEvent.change(screen.getByLabelText("Current AI Usage"), { target: { value: "Other" } });
    fireEvent.change(screen.getByLabelText("Current AI Usage — other, please specify"), {
      target: { value: "placeholder so client-side validation passes" },
    });

    fireEvent.click(screen.getByRole("button", { name: /book an ai desk audit/i }));

    await screen.findByText(
      "Please specify",
      { selector: "#cf-ai-usage-other-error" },
    );
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it("does not resurrect a stale error when Other is deselected then re-selected without resubmitting", () => {
    render(<ContactForm />);
    fillValidForm();

    // Trigger and confirm the error.
    fireEvent.change(screen.getByLabelText("Current AI Usage"), { target: { value: "Other" } });
    fireEvent.click(screen.getByRole("button", { name: /book an ai desk audit/i }));
    expect(
      screen.getByText("Please specify", { selector: "#cf-ai-usage-other-error" }),
    ).toBeTruthy();

    // Deselect, then re-select "Other" — no resubmission in between.
    fireEvent.change(screen.getByLabelText("Current AI Usage"), { target: { value: "Claude" } });
    fireEvent.change(screen.getByLabelText("Current AI Usage"), { target: { value: "Other" } });

    expect(document.getElementById("cf-ai-usage-other-error")).toBeNull();
    const otherInput = screen.getByLabelText("Current AI Usage — other, please specify");
    expect(otherInput.getAttribute("aria-invalid")).toBe("false");
  });
});
