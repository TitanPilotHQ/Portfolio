import { describe, expect, it } from "vitest";
import { contactFormSchema } from "./contactSchema";

const VALID_BASE = {
  company: "Acme Trading",
  name: "Jane Doe",
  workEmail: "jane@example.com",
  jobTitle: "Head of Trading",
  deskSize: "6–10",
  jurisdiction: "United States",
  assetClasses: ["FX"],
  aiUsage: "ChatGPT",
  governanceMethod: "Manual Review",
  primaryGoal: ["AI Governance"],
  message: "We want to evaluate Titan Pilot for our desk.",
  consent: true,
};

describe("contactFormSchema — conditional 'Other' companion validation", () => {
  const pairs: {
    label: string;
    parentKey: "aiUsage" | "governanceMethod" | "assetClasses" | "primaryGoal";
    otherKey: "aiUsageOther" | "governanceMethodOther" | "assetClassesOther" | "primaryGoalOther";
    otherSelected: unknown;
    notOtherSelected: unknown;
  }[] = [
    {
      label: "aiUsage / aiUsageOther (scalar enum)",
      parentKey: "aiUsage",
      otherKey: "aiUsageOther",
      otherSelected: "Other",
      notOtherSelected: "ChatGPT",
    },
    {
      label: "assetClasses / assetClassesOther (array enum)",
      parentKey: "assetClasses",
      otherKey: "assetClassesOther",
      otherSelected: ["Other"],
      notOtherSelected: ["FX"],
    },
  ];

  for (const { label, parentKey, otherKey, otherSelected, notOtherSelected } of pairs) {
    describe(label, () => {
      it("fails when Other is selected and the companion is empty", () => {
        const result = contactFormSchema.safeParse({
          ...VALID_BASE,
          [parentKey]: otherSelected,
          [otherKey]: "",
        });
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.flatten().fieldErrors[otherKey]).toBeTruthy();
        }
      });

      it("fails when Other is selected and the companion is whitespace-only", () => {
        const result = contactFormSchema.safeParse({
          ...VALID_BASE,
          [parentKey]: otherSelected,
          [otherKey]: "   ",
        });
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.flatten().fieldErrors[otherKey]).toBeTruthy();
        }
      });

      it("passes when Other is selected and the companion has a valid detail", () => {
        const result = contactFormSchema.safeParse({
          ...VALID_BASE,
          [parentKey]: otherSelected,
          [otherKey]: "Something specific",
        });
        expect(result.success).toBe(true);
      });

      it("passes when Other is not selected, even if the companion is empty", () => {
        const result = contactFormSchema.safeParse({
          ...VALID_BASE,
          [parentKey]: notOtherSelected,
          [otherKey]: "",
        });
        expect(result.success).toBe(true);
      });
    });
  }

  // Light sanity check for the remaining two pairs — same shared
  // requireOtherDetail() logic as above, so a full matrix here would be
  // redundant; this confirms each pair is actually wired into the schema.
  it("governanceMethod: Other selected with empty companion fails", () => {
    const result = contactFormSchema.safeParse({
      ...VALID_BASE,
      governanceMethod: "Other",
      governanceMethodOther: "",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.governanceMethodOther).toBeTruthy();
    }
  });

  it("primaryGoal: Other selected with empty companion fails", () => {
    const result = contactFormSchema.safeParse({
      ...VALID_BASE,
      primaryGoal: ["Other"],
      primaryGoalOther: "",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.primaryGoalOther).toBeTruthy();
    }
  });

  it("reports an error for every missing companion when multiple Other fields are selected at once", () => {
    const result = contactFormSchema.safeParse({
      ...VALID_BASE,
      aiUsage: "Other",
      aiUsageOther: "",
      assetClasses: ["Other"],
      assetClassesOther: "",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      expect(fieldErrors.aiUsageOther).toBeTruthy();
      expect(fieldErrors.assetClassesOther).toBeTruthy();
    }
  });

  it("leaves existing valid submissions (no 'Other' selected anywhere) unaffected", () => {
    const result = contactFormSchema.safeParse(VALID_BASE);
    expect(result.success).toBe(true);
  });
});
