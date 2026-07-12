import { z } from "zod";

export const DESK_SIZE_VALUES = [
  "Solo", "2–5", "6–10", "11–20", "21–50", "51–100", "100+",
] as const;

export const ASSET_CLASS_VALUES = [
  "FX", "CFDs", "Equities", "Futures", "Options", "Crypto",
  "Commodities", "Fixed Income", "Multi-Asset", "Other",
] as const;

export const AI_USAGE_VALUES = [
  "None", "ChatGPT", "Claude", "Gemini", "Multiple General AI Tools",
  "Internal AI", "Other",
] as const;

export const GOVERNANCE_METHOD_VALUES = [
  "None", "Manual Review", "Trading Journal", "Risk Committee",
  "Internal Workflow", "Compliance Review", "Other",
] as const;

export const PRIMARY_GOAL_VALUES = [
  "AI Governance", "Explainability", "Risk Controls", "Audit Trail",
  "Decision Replay", "Human Approval", "Compliance",
  "Operational Visibility", "Other",
] as const;

const utmSchema = z
  .object({
    source: z.string().max(200).optional(),
    medium: z.string().max(200).optional(),
    campaign: z.string().max(200).optional(),
    term: z.string().max(200).optional(),
    content: z.string().max(200).optional(),
  })
  .nullable()
  .optional();

export const contactFormSchema = z.object({
  company: z.string().trim().min(1, "Company name is required").max(200),
  name: z.string().trim().min(1, "Full name is required").max(200),
  workEmail: z.string().trim().email("Enter a valid work email").max(320),
  jobTitle: z.string().trim().min(1, "Job title is required").max(200),
  deskSize: z.enum(DESK_SIZE_VALUES, {
    errorMap: () => ({ message: "Select a desk size" }),
  }),
  jurisdiction: z.string().trim().min(1, "Select a jurisdiction").max(120),
  assetClasses: z
    .array(z.enum(ASSET_CLASS_VALUES))
    .min(1, "Select at least one asset class"),
  assetClassesOther: z.string().trim().max(200).optional(),
  aiUsage: z.enum(AI_USAGE_VALUES, {
    errorMap: () => ({ message: "Select your current AI usage" }),
  }),
  aiUsageOther: z.string().trim().max(200).optional(),
  governanceMethod: z.enum(GOVERNANCE_METHOD_VALUES, {
    errorMap: () => ({ message: "Select a governance method" }),
  }),
  governanceMethodOther: z.string().trim().max(200).optional(),
  primaryGoal: z
    .array(z.enum(PRIMARY_GOAL_VALUES))
    .min(1, "Select at least one goal"),
  primaryGoalOther: z.string().trim().max(200).optional(),
  message: z.string().trim().min(1, "Message is required").max(4000),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Consent is required" }),
  }),
  honeypot: z.string().optional(),
  utm: utmSchema,
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
