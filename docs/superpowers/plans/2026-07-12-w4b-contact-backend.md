# W4b — Qualified Contact Form + Real Backend Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace `/contact`'s temporary `EarlyAccessForm` with a real
qualified-lead form backed by a production API route: Zod validation,
honeypot + rate-limited spam protection, Resend email notification, and
Upstash-backed lead storage with a human-readable sequential lead ID —
all behind swappable `NotificationProvider`/`LeadStore`/`RateLimiter`
interfaces.

**Architecture:** One Next.js Route Handler (`app/api/contact/route.ts`)
orchestrates validation → honeypot → rate limit → lead-ID generation →
parallel email+storage writes → partial-failure-safe response. Two new
small, dependency-free client components (`SearchableSelect`,
`MultiSelectField`) support the form's structured fields. The form itself
(`ContactForm`) replaces `EarlyAccessForm` on `/contact` only — the
homepage teaser (built in W4a) already links to `/contact` and needs no
change.

**Tech Stack:** Next.js 15 App Router (Route Handlers), React 19,
TypeScript, Tailwind v4, `zod` (new), `resend` (new), `@upstash/redis`
(new), `@vercel/analytics` (already installed, `track()` now used for the
first time in this repo).

## Global Constraints

- Spec: `docs/superpowers/specs/2026-07-12-w4b-contact-backend-design.md`
  — every task's exact requirements are defined there.
- **Do not start this plan's execution until Emad explicitly says so** —
  it is written and ready while W4a is in its own separate final review;
  the two are independent branches.
- No CAPTCHA/Turnstile — honeypot + rate limiting only (explicitly
  decided).
- No plaintext IP storage anywhere — always the HMAC hash.
- Server-only env vars (`RESEND_API_KEY`, `IP_HASH_SALT`,
  `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`) must never be
  referenced from a client component and must never carry a
  `NEXT_PUBLIC_` prefix.
- Text opacity floor: no supplementary text below `text-white/60` (WCAG
  AA 4.5:1, established W1). Error/validation text uses `text-amber`
  (`--color-amber: #f59e0b`, already an existing token used for warnings
  elsewhere in this repo) — do not introduce a new color token for this;
  the repo's existing palette (cyan/azure/violet/electric/success/amber)
  has no dedicated "error red," and amber already carries a caution
  connotation site-wide (see `EARLY_ACCESS_NOT_GETS` styling).
- No new npm dependencies beyond `resend`, `@upstash/redis`, `zod` — no
  UI/form library, no CAPTCHA library, no date library.
- Follow this repo's established input styling exactly (the `inputClass`
  string used throughout `EarlyAccessForm.tsx` and repeated below) —
  don't invent new form-control visual language.
- No test suite exists for this repo (tracked as its own W0 finding) —
  validation is `npm run build` + manual exercise of every path,
  matching every prior slice's pattern.

---

### Task 1: Dependencies + shared schema + IP hashing + rate limiter

**Files:**
- Modify: `package.json` (add `resend`, `@upstash/redis`, `zod`)
- Create: `lib/contactSchema.ts`
- Create: `lib/server/hashIp.ts`
- Create: `lib/server/rateLimit.ts`

**Interfaces:**
- Produces: `contactFormSchema` (Zod schema), `ContactFormValues` (type),
  `DESK_SIZE_VALUES`, `ASSET_CLASS_VALUES`, `AI_USAGE_VALUES`,
  `GOVERNANCE_METHOD_VALUES`, `PRIMARY_GOAL_VALUES` (all `as const`
  string-tuple arrays — these are the canonical source of truth for form
  option values, consumed by both `ContactForm.tsx` for rendering and by
  the schema itself for validation; `lib/content.ts` does NOT duplicate
  these). `hashIp(ip: string): Promise<string>`. `RateLimiter` interface,
  `RateLimitResult` type, `getRateLimiter(): RateLimiter`.

- [ ] **Step 1: Install dependencies**

Run: `npm install resend @upstash/redis zod`
Expected: `package.json`'s `dependencies` gains all three; `package-lock.json` updates.

- [ ] **Step 2: Create `lib/contactSchema.ts`**

```ts
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
```

- [ ] **Step 3: Create `lib/server/hashIp.ts`**

```ts
export async function hashIp(ip: string): Promise<string> {
  const salt = process.env.IP_HASH_SALT;
  if (!salt) {
    throw new Error("IP_HASH_SALT is not configured");
  }
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(salt),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(ip),
  );
  return Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
```

- [ ] **Step 4: Create `lib/server/rateLimit.ts`**

```ts
import { Redis } from "@upstash/redis";

export interface RateLimitResult {
  allowed: boolean;
  retryAfterSeconds?: number;
}

export interface RateLimiter {
  checkAndConsume(key: string): Promise<RateLimitResult>;
}

const HOUR_MS = 60 * 60 * 1000;
const BURST_WINDOW_MS = 5 * 60 * 1000;
const HOUR_LIMIT = 3;
const BURST_LIMIT = 2;

class MemoryRateLimiter implements RateLimiter {
  private hits = new Map<string, number[]>();

  async checkAndConsume(key: string): Promise<RateLimitResult> {
    const now = Date.now();
    const timestamps = (this.hits.get(key) ?? []).filter(
      (t) => now - t < HOUR_MS,
    );

    const burstCount = timestamps.filter((t) => now - t < BURST_WINDOW_MS).length;
    if (burstCount >= BURST_LIMIT) {
      return { allowed: false, retryAfterSeconds: Math.ceil(BURST_WINDOW_MS / 1000) };
    }
    if (timestamps.length >= HOUR_LIMIT) {
      const oldest = Math.min(...timestamps);
      return {
        allowed: false,
        retryAfterSeconds: Math.ceil((oldest + HOUR_MS - now) / 1000),
      };
    }

    timestamps.push(now);
    this.hits.set(key, timestamps);
    return { allowed: true };
  }
}

class UpstashRateLimiter implements RateLimiter {
  constructor(private redis: Redis) {}

  async checkAndConsume(key: string): Promise<RateLimitResult> {
    const now = Date.now();
    const redisKey = `ratelimit:contact:${key}`;

    await this.redis.zremrangebyscore(redisKey, 0, now - HOUR_MS);

    const burstCount = await this.redis.zcount(
      redisKey,
      now - BURST_WINDOW_MS,
      now,
    );
    if (burstCount >= BURST_LIMIT) {
      return { allowed: false, retryAfterSeconds: Math.ceil(BURST_WINDOW_MS / 1000) };
    }

    const hourCount = await this.redis.zcard(redisKey);
    if (hourCount >= HOUR_LIMIT) {
      const oldest = await this.redis.zrange(redisKey, 0, 0, { withScores: true });
      const oldestScore = oldest.length > 0 ? Number(oldest[1]) : now;
      return {
        allowed: false,
        retryAfterSeconds: Math.ceil((oldestScore + HOUR_MS - now) / 1000),
      };
    }

    await this.redis.zadd(redisKey, { score: now, member: `${now}:${Math.random()}` });
    await this.redis.expire(redisKey, Math.ceil(HOUR_MS / 1000));
    return { allowed: true };
  }
}

let cachedLimiter: RateLimiter | null = null;

export function getRateLimiter(): RateLimiter {
  if (cachedLimiter) return cachedLimiter;
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  cachedLimiter =
    url && token
      ? new UpstashRateLimiter(new Redis({ url, token }))
      : new MemoryRateLimiter();
  return cachedLimiter;
}
```

- [ ] **Step 5: Verify**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json lib/contactSchema.ts lib/server/hashIp.ts lib/server/rateLimit.ts
git commit -m "feat: add contact form schema, IP hashing, and rate limiter"
```

---

### Task 2: `NotificationProvider` + Resend implementation

**Files:**
- Create: `lib/server/notification.ts`

**Interfaces:**
- Consumes: nothing from prior tasks.
- Produces: `NotificationProvider` interface, `NotificationParams`,
  `NotificationResult` types, `getNotificationProvider(): NotificationProvider`
  — consumed by Task 4's route handler.

- [ ] **Step 1: Create `lib/server/notification.ts`**

```ts
import { Resend } from "resend";

export interface NotificationParams {
  to: string;
  subject: string;
  html: string;
  text: string;
}

export interface NotificationResult {
  success: boolean;
  error?: string;
}

export interface NotificationProvider {
  send(params: NotificationParams): Promise<NotificationResult>;
}

const FROM_ADDRESS = "Titan Pilot <noreply@titanpilot.app>";

class ResendNotificationProvider implements NotificationProvider {
  private client: Resend;

  constructor(apiKey: string) {
    this.client = new Resend(apiKey);
  }

  async send(params: NotificationParams): Promise<NotificationResult> {
    try {
      const { error } = await this.client.emails.send({
        from: FROM_ADDRESS,
        to: params.to,
        subject: params.subject,
        html: params.html,
        text: params.text,
      });
      if (error) return { success: false, error: error.message };
      return { success: true };
    } catch (err) {
      return {
        success: false,
        error: err instanceof Error ? err.message : "Unknown error",
      };
    }
  }
}

let cachedProvider: NotificationProvider | null = null;

export function getNotificationProvider(): NotificationProvider {
  if (cachedProvider) return cachedProvider;
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY is not configured");
  cachedProvider = new ResendNotificationProvider(apiKey);
  return cachedProvider;
}
```

- [ ] **Step 2: Verify**

Run: `npx tsc --noEmit`
Expected: no errors (the `resend` package's types resolve correctly from Task 1's install).

- [ ] **Step 3: Commit**

```bash
git add lib/server/notification.ts
git commit -m "feat: add NotificationProvider interface + Resend implementation"
```

---

### Task 3: `LeadStore` + Upstash implementation + lead ID generation

**Files:**
- Create: `lib/server/leadStore.ts`

**Interfaces:**
- Consumes: `ContactFormValues` type shape is mirrored (not imported) —
  `LeadRecord` is its own storage-schema type, deliberately decoupled
  from the form-input type so the storage schema can evolve
  independently (adding `schema_version` bumps for future changes without
  touching the form's validation schema).
- Produces: `LeadRecord` type, `LeadStore` interface,
  `getLeadStore(): LeadStore` — consumed by Task 4.

- [ ] **Step 1: Create `lib/server/leadStore.ts`**

```ts
import { Redis } from "@upstash/redis";

export interface LeadRecord {
  schema_version: 1;
  lead_id: string;
  uuid: string;
  submitted_at: string;
  form_version: number;
  source: string;
  company: string;
  name: string;
  work_email: string;
  job_title: string;
  desk_size: string;
  jurisdiction: string;
  asset_classes: string[];
  ai_usage: string;
  governance_method: string;
  primary_goal: string[];
  message: string;
  consent: boolean;
  hashed_ip: string;
  user_agent: string;
  referrer: string | null;
  utm: {
    source?: string;
    medium?: string;
    campaign?: string;
    term?: string;
    content?: string;
  } | null;
}

export interface LeadStore {
  getNextLeadId(): Promise<string>;
  save(record: LeadRecord): Promise<void>;
}

class UpstashLeadStore implements LeadStore {
  constructor(private redis: Redis) {}

  async getNextLeadId(): Promise<string> {
    const year = new Date().getUTCFullYear();
    const sequence = await this.redis.incr(`leads:counter:${year}`);
    return `TP-${year}-${String(sequence).padStart(6, "0")}`;
  }

  async save(record: LeadRecord): Promise<void> {
    await this.redis.set(`leads:${record.lead_id}`, JSON.stringify(record));
  }
}

let cachedStore: LeadStore | null = null;

export function getLeadStore(): LeadStore {
  if (cachedStore) return cachedStore;
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) {
    throw new Error(
      "UPSTASH_REDIS_REST_URL/UPSTASH_REDIS_REST_TOKEN are not configured — LeadStore requires a real Upstash connection (see deployment checklist).",
    );
  }
  cachedStore = new UpstashLeadStore(new Redis({ url, token }));
  return cachedStore;
}
```

**Note for the implementer:** unlike `RateLimiter`, there is no in-memory
fallback here — losing a rate-limit counter on restart is harmless;
silently losing a real lead is not. Local dev without real Upstash
credentials configured will throw when this is called, by design (see
spec's Environment Configuration section).

- [ ] **Step 2: Verify**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add lib/server/leadStore.ts
git commit -m "feat: add LeadStore interface + Upstash implementation with sequential lead IDs"
```

---

### Task 4: Route handler (`app/api/contact/route.ts`)

**Files:**
- Create: `app/api/contact/route.ts`

**Interfaces:**
- Consumes: `contactFormSchema` from `@/lib/contactSchema` (Task 1),
  `hashIp` from `@/lib/server/hashIp` (Task 1), `getRateLimiter` from
  `@/lib/server/rateLimit` (Task 1), `getNotificationProvider` from
  `@/lib/server/notification` (Task 2), `getLeadStore`/`LeadRecord` from
  `@/lib/server/leadStore` (Task 3), `CONTACT_EMAIL` from
  `@/lib/content` (already exists).
- Produces: the `POST /api/contact` HTTP endpoint — consumed by Task 8's
  `ContactForm` client component via `fetch`.

- [ ] **Step 1: Create `app/api/contact/route.ts`**

```ts
import { NextRequest, NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/contactSchema";
import { hashIp } from "@/lib/server/hashIp";
import { getRateLimiter } from "@/lib/server/rateLimit";
import { getNotificationProvider } from "@/lib/server/notification";
import { getLeadStore, type LeadRecord } from "@/lib/server/leadStore";
import { CONTACT_EMAIL } from "@/lib/content";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildEmailBody(record: LeadRecord): { html: string; text: string } {
  const rows: [string, string][] = [
    ["Lead ID", record.lead_id],
    ["Company", record.company],
    ["Name", record.name],
    ["Work Email", record.work_email],
    ["Job Title", record.job_title],
    ["Desk Size", record.desk_size],
    ["Jurisdiction", record.jurisdiction],
    ["Asset Classes", record.asset_classes.join(", ")],
    ["Current AI Usage", record.ai_usage],
    ["Current Governance Method", record.governance_method],
    ["Primary Goal", record.primary_goal.join(", ")],
    ["Message", record.message],
    ["Submitted At (UTC)", record.submitted_at],
  ];

  const html = `<table>${rows
    .map(
      ([label, value]) =>
        `<tr><td><b>${escapeHtml(label)}</b></td><td>${escapeHtml(value).replace(/\n/g, "<br/>")}</td></tr>`,
    )
    .join("")}</table>`;
  const text = rows.map(([label, value]) => `${label}: ${value}`).join("\n");

  return { html, text };
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const honeypotValue =
    typeof body === "object" && body !== null && "honeypot" in body
      ? (body as { honeypot?: unknown }).honeypot
      : undefined;
  if (typeof honeypotValue === "string" && honeypotValue.length > 0) {
    console.warn("[contact] spam attempt caught by honeypot", {
      timestamp: new Date().toISOString(),
      userAgent: req.headers.get("user-agent") ?? "unknown",
    });
    return NextResponse.json({ success: true, leadId: null }, { status: 200 });
  }

  const parsed = contactFormSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", fieldErrors: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }
  const values = parsed.data;

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const hashedIp = await hashIp(ip);

  const rateLimiter = getRateLimiter();
  const rateLimitResult = await rateLimiter.checkAndConsume(hashedIp);
  if (!rateLimitResult.allowed) {
    console.warn("[contact] rate limit exceeded", {
      hashedIp,
      timestamp: new Date().toISOString(),
    });
    return NextResponse.json(
      { error: "Too many submissions. Please try again later." },
      {
        status: 429,
        headers: { "Retry-After": String(rateLimitResult.retryAfterSeconds ?? 3600) },
      },
    );
  }

  const leadStore = getLeadStore();
  const leadId = await leadStore.getNextLeadId();

  const record: LeadRecord = {
    schema_version: 1,
    lead_id: leadId,
    uuid: crypto.randomUUID(),
    submitted_at: new Date().toISOString(),
    form_version: 1,
    source: "website/contact",
    company: values.company,
    name: values.name,
    work_email: values.workEmail,
    job_title: values.jobTitle,
    desk_size: values.deskSize,
    jurisdiction: values.jurisdiction,
    asset_classes: values.assetClassesOther
      ? [
          ...values.assetClasses.filter((v) => v !== "Other"),
          `Other: ${values.assetClassesOther}`,
        ]
      : values.assetClasses,
    ai_usage: values.aiUsageOther ? `Other: ${values.aiUsageOther}` : values.aiUsage,
    governance_method: values.governanceMethodOther
      ? `Other: ${values.governanceMethodOther}`
      : values.governanceMethod,
    primary_goal: values.primaryGoalOther
      ? [
          ...values.primaryGoal.filter((v) => v !== "Other"),
          `Other: ${values.primaryGoalOther}`,
        ]
      : values.primaryGoal,
    message: values.message,
    consent: values.consent,
    hashed_ip: hashedIp,
    user_agent: req.headers.get("user-agent") ?? "unknown",
    referrer: req.headers.get("referer"),
    utm: values.utm ?? null,
  };

  const { html, text } = buildEmailBody(record);

  const [emailResult, storageResult] = await Promise.allSettled([
    getNotificationProvider().send({
      to: CONTACT_EMAIL,
      subject: `New AI Desk Audit request — ${record.company} (${record.lead_id})`,
      html,
      text,
    }),
    leadStore.save(record),
  ]);

  const emailOk = emailResult.status === "fulfilled" && emailResult.value.success;
  const storageOk = storageResult.status === "fulfilled";

  if (!emailOk) {
    console.error("[contact] notification send failed", {
      leadId: record.lead_id,
      error:
        emailResult.status === "rejected" ? emailResult.reason : emailResult.value.error,
    });
  }
  if (!storageOk) {
    console.error("[contact] lead storage failed", {
      leadId: record.lead_id,
      error: storageResult.status === "rejected" ? storageResult.reason : undefined,
      record,
    });
  }

  if (!emailOk && !storageOk) {
    return NextResponse.json(
      { error: `Something went wrong. Please email us directly at ${CONTACT_EMAIL}.` },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true, leadId: record.lead_id }, { status: 200 });
}
```

- [ ] **Step 2: Verify build**

Run: `npx tsc --noEmit`
Expected: no errors.

Run: `npm run build`
Expected: succeeds, `/api/contact` listed as a dynamic route (not
statically prerendered — it's a POST handler).

- [ ] **Step 3: Manual smoke test (requires real or dev-mode env vars)**

With `.env.local` populated per the deployment checklist (or with
`UPSTASH_REDIS_REST_URL`/`TOKEN` unset to exercise the `MemoryRateLimiter`
fallback — note `RESEND_API_KEY` and Upstash `LeadStore` credentials are
still required for this route to succeed end-to-end, since `LeadStore`
has no fallback), run `npm run dev` and:

```bash
curl -s -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"company":"Test Co","name":"Jane Auditor","workEmail":"jane@example.com","jobTitle":"Head of Trading","deskSize":"6–10","jurisdiction":"United Kingdom","assetClasses":["FX"],"aiUsage":"ChatGPT","governanceMethod":"Manual Review","primaryGoal":["AI Governance"],"message":"Test enquiry","consent":true,"honeypot":""}'
```

Expected: `{"success":true,"leadId":"TP-2026-000001"}` (or the next
sequence number), a real email arrives at `admin@titanpilot.app`, and a
`leads:TP-2026-000001` key exists in the Upstash database (verify via the
Upstash dashboard's Data Browser).

Also test the honeypot path (`"honeypot":"i-am-a-bot"` in the payload) —
expect `{"success":true,"leadId":null}` with no email sent and no lead
stored (check logs for the `[contact] spam attempt caught by honeypot`
line instead).

- [ ] **Step 4: Commit**

```bash
git add app/api/contact/route.ts
git commit -m "feat: add /api/contact route handler with honeypot, rate limiting, and partial-failure handling"
```

---

### Task 5: Content additions (`lib/content.ts`) + jurisdiction list

**Files:**
- Modify: `lib/content.ts` (append new exports)
- Create: `lib/countries.ts`

**Interfaces:**
- Produces: `CONTACT_FORM_SECTIONS`, `CONTACT_PRIVACY_STATEMENT`,
  `CONTACT_CONFIRMATION` (all in `lib/content.ts`); `COUNTRIES` (in
  `lib/countries.ts`) — all consumed by Task 8's `ContactForm`.

- [ ] **Step 1: Append to `lib/content.ts`**

Append at the end of the file, after the `HOMEPAGE_CONTACT_TEASER` export:

```ts

export const CONTACT_FORM_SECTIONS = {
  aboutYou: "About You & Your Desk",
  tradingProfile: "Your Trading Profile",
  lookingFor: "What You're Looking For",
};

export const CONTACT_PRIVACY_STATEMENT =
  "We collect only what's needed to evaluate your enquiry — your company, role, desk profile, and message. We never ask for trading credentials, broker access, or account information. Your submission is reviewed by Titan Pilot directly and is not sold or shared with third parties.";

export const CONTACT_CONFIRMATION = {
  title: "Thank you.",
  subtitle: "Your request has been received.",
};
```

- [ ] **Step 2: Create `lib/countries.ts`**

```ts
export const COUNTRIES = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola",
  "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria",
  "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus",
  "Belgium", "Belize", "Benin", "Bhutan", "Bolivia",
  "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria",
  "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon",
  "Canada", "Central African Republic", "Chad", "Chile", "China",
  "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba",
  "Cyprus", "Czechia", "Democratic Republic of the Congo", "Denmark",
  "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt",
  "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini",
  "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia",
  "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea",
  "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary",
  "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel",
  "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya",
  "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon",
  "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania",
  "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali",
  "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico",
  "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco",
  "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands",
  "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea",
  "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Palestine",
  "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines",
  "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda",
  "Saint Kitts and Nevis", "Saint Lucia",
  "Saint Vincent and the Grenadines", "Samoa", "San Marino",
  "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia",
  "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia",
  "Solomon Islands", "Somalia", "South Africa", "South Korea",
  "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden",
  "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand",
  "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia",
  "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine",
  "United Arab Emirates", "United Kingdom", "United States", "Uruguay",
  "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam",
  "Yemen", "Zambia", "Zimbabwe",
] as const;
```

- [ ] **Step 3: Verify**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add lib/content.ts lib/countries.ts
git commit -m "content: add contact form section labels, privacy statement, and jurisdiction list"
```

---

### Task 6: `SearchableSelect` component

**Files:**
- Create: `components/SearchableSelect.tsx`

**Interfaces:**
- Consumes: nothing from prior tasks (generic, reusable).
- Produces: `SearchableSelect` component — consumed by Task 8 for the
  Jurisdiction field, with `options={COUNTRIES}` (Task 5).

- [ ] **Step 1: Create `components/SearchableSelect.tsx`**

```tsx
"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";

export function SearchableSelect({
  label,
  options,
  value,
  onChange,
  placeholder = "Search…",
  required = false,
}: {
  label: string;
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
}) {
  const [query, setQuery] = useState(value);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const listboxId = useId();
  const inputId = useId();

  const filtered = query.trim()
    ? options.filter((o) => o.toLowerCase().includes(query.trim().toLowerCase()))
    : options;

  useEffect(() => {
    setQuery(value);
  }, [value]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery(value);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [value]);

  function selectOption(option: string) {
    onChange(option);
    setQuery(option);
    setOpen(false);
    setActiveIndex(-1);
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (open && activeIndex >= 0 && filtered[activeIndex]) {
        selectOption(filtered[activeIndex]);
      }
    } else if (e.key === "Escape") {
      setOpen(false);
      setQuery(value);
      setActiveIndex(-1);
    }
  }

  const inputClass =
    "w-full rounded-lg border border-white/10 bg-surface/80 px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-cyan/50 focus:ring-1 focus:ring-cyan/30";

  return (
    <div ref={containerRef} className="relative">
      <label htmlFor={inputId} className="mb-1.5 block text-xs font-medium text-secondary">
        {label}
      </label>
      <input
        id={inputId}
        role="combobox"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-activedescendant={
          activeIndex >= 0 ? `${listboxId}-option-${activeIndex}` : undefined
        }
        aria-autocomplete="list"
        autoComplete="off"
        required={required}
        value={query}
        placeholder={placeholder}
        className={inputClass}
        onFocus={() => setOpen(true)}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
          setActiveIndex(-1);
        }}
        onKeyDown={handleKeyDown}
      />
      {open && filtered.length > 0 ? (
        <ul
          id={listboxId}
          role="listbox"
          className="absolute z-20 mt-1.5 max-h-56 w-full overflow-y-auto rounded-lg border border-white/10 bg-surface shadow-xl"
        >
          {filtered.map((option, i) => (
            <li
              key={option}
              id={`${listboxId}-option-${i}`}
              role="option"
              aria-selected={option === value}
              className={`cursor-pointer px-4 py-2.5 text-sm ${
                i === activeIndex
                  ? "bg-cyan/10 text-white"
                  : "text-secondary hover:bg-white/5 hover:text-white"
              }`}
              onMouseDown={(e) => {
                e.preventDefault();
                selectOption(option);
              }}
              onMouseEnter={() => setActiveIndex(i)}
            >
              {option}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
```

- [ ] **Step 2: Verify**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/SearchableSelect.tsx
git commit -m "feat: add dependency-free SearchableSelect combobox component"
```

---

### Task 7: `MultiSelectField` component

**Files:**
- Create: `components/MultiSelectField.tsx`

**Interfaces:**
- Consumes: nothing from prior tasks (generic, reusable).
- Produces: `MultiSelectField` component — consumed by Task 8 for Asset
  Classes and Primary Goal fields.

- [ ] **Step 1: Create `components/MultiSelectField.tsx`**

```tsx
"use client";

import { useId } from "react";

export function MultiSelectField({
  label,
  options,
  value,
  onChange,
  otherValue,
  onOtherChange,
}: {
  label: string;
  options: readonly string[];
  value: string[];
  onChange: (value: string[]) => void;
  otherValue: string;
  onOtherChange: (value: string) => void;
}) {
  const groupId = useId();
  const showOther = value.includes("Other");

  function toggle(option: string) {
    if (value.includes(option)) {
      onChange(value.filter((v) => v !== option));
    } else {
      onChange([...value, option]);
    }
  }

  const inputClass =
    "w-full rounded-lg border border-white/10 bg-surface/80 px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-cyan/50 focus:ring-1 focus:ring-cyan/30";

  return (
    <fieldset>
      <legend id={groupId} className="mb-2 text-xs font-medium text-secondary">
        {label}
      </legend>
      <div className="grid gap-2 sm:grid-cols-2" role="group" aria-labelledby={groupId}>
        {options.map((option) => {
          const id = `${groupId}-${option}`;
          return (
            <label
              key={option}
              htmlFor={id}
              className="flex cursor-pointer items-center gap-2.5 rounded-lg border border-white/10 bg-surface/60 px-3.5 py-2.5 text-sm text-secondary transition-colors hover:border-white/20 has-[:checked]:border-cyan/40 has-[:checked]:bg-cyan/5 has-[:checked]:text-white"
            >
              <input
                id={id}
                type="checkbox"
                checked={value.includes(option)}
                onChange={() => toggle(option)}
                className="size-4 rounded border-white/20 bg-transparent text-cyan focus:ring-1 focus:ring-cyan/40"
              />
              {option}
            </label>
          );
        })}
      </div>
      {showOther ? (
        <input
          type="text"
          value={otherValue}
          onChange={(e) => onOtherChange(e.target.value)}
          placeholder="Please specify…"
          aria-label={`${label} — other, please specify`}
          className={`${inputClass} mt-2.5`}
        />
      ) : null}
    </fieldset>
  );
}
```

- [ ] **Step 2: Verify**

Run: `npx tsc --noEmit`
Expected: no errors. Confirm Tailwind's `has-[:checked]` variant renders
correctly (visual check in Step 3 of Task 8, once this is wired into the
real form).

- [ ] **Step 3: Commit**

```bash
git add components/MultiSelectField.tsx
git commit -m "feat: add dependency-free MultiSelectField checkbox-group component"
```

---

### Task 8: `ContactForm` component + wire into `/contact` + remove `EarlyAccessForm`

**Files:**
- Create: `components/ContactForm.tsx`
- Modify: `app/contact/page.tsx` (swap `EarlyAccessForm` → `ContactForm`)
- Delete: `components/EarlyAccessForm.tsx` (fully unused after this task
  — homepage already dropped it in W4a, `/contact` drops it here)
- Modify: `lib/content.ts` (remove now-dead `EARLY_ACCESS_GETS`,
  `EARLY_ACCESS_NOT_GETS`, `EARLY_ACCESS_DISCLAIMER` exports)

**Interfaces:**
- Consumes: `COUNTRIES` (Task 5), `DESK_SIZE_VALUES`/`ASSET_CLASS_VALUES`/
  `AI_USAGE_VALUES`/`GOVERNANCE_METHOD_VALUES`/`PRIMARY_GOAL_VALUES`
  (Task 1), `CONTACT_CONFIRMATION`/`CONTACT_FORM_SECTIONS`/
  `CONTACT_PRIVACY_STATEMENT`/`CONTACT_WHAT_HAPPENS_NEXT` (Task 5 +
  existing W4a export), `SearchableSelect` (Task 6), `MultiSelectField`
  (Task 7), `Reveal` (existing `components/ui.tsx`), `POST /api/contact`
  (Task 4).
- Produces: `ContactForm` component, consumed by `app/contact/page.tsx`.

**Before starting this task**, confirm no other file references
`EarlyAccessForm`, `EARLY_ACCESS_GETS`, `EARLY_ACCESS_NOT_GETS`, or
`EARLY_ACCESS_DISCLAIMER` besides `app/contact/page.tsx` (which this task
itself updates) — run `grep -rn "EarlyAccessForm\|EARLY_ACCESS" app components lib`
before deleting anything, and stop to ask if any unexpected reference
turns up.

- [ ] **Step 1: Create `components/ContactForm.tsx`**

```tsx
"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { track } from "@vercel/analytics";
import { ArrowRight } from "lucide-react";
import { COUNTRIES } from "@/lib/countries";
import {
  AI_USAGE_VALUES,
  ASSET_CLASS_VALUES,
  DESK_SIZE_VALUES,
  GOVERNANCE_METHOD_VALUES,
  PRIMARY_GOAL_VALUES,
} from "@/lib/contactSchema";
import {
  CONTACT_CONFIRMATION,
  CONTACT_FORM_SECTIONS,
  CONTACT_PRIVACY_STATEMENT,
  CONTACT_WHAT_HAPPENS_NEXT,
} from "@/lib/content";
import { Reveal } from "./ui";
import { SearchableSelect } from "./SearchableSelect";
import { MultiSelectField } from "./MultiSelectField";

interface FormState {
  company: string;
  name: string;
  workEmail: string;
  jobTitle: string;
  deskSize: string;
  jurisdiction: string;
  assetClasses: string[];
  assetClassesOther: string;
  aiUsage: string;
  aiUsageOther: string;
  governanceMethod: string;
  governanceMethodOther: string;
  primaryGoal: string[];
  primaryGoalOther: string;
  message: string;
  consent: boolean;
}

const EMPTY_STATE: FormState = {
  company: "",
  name: "",
  workEmail: "",
  jobTitle: "",
  deskSize: "",
  jurisdiction: "",
  assetClasses: [],
  assetClassesOther: "",
  aiUsage: "",
  aiUsageOther: "",
  governanceMethod: "",
  governanceMethodOther: "",
  primaryGoal: [],
  primaryGoalOther: "",
  message: "",
  consent: false,
};

const SECTION_FIELDS: Record<string, (keyof FormState)[]> = {
  aboutYou: ["company", "name", "workEmail", "jobTitle", "deskSize", "jurisdiction"],
  tradingProfile: ["assetClasses", "aiUsage", "governanceMethod"],
  lookingFor: ["primaryGoal", "message"],
  consent: ["consent"],
};

function isSectionComplete(state: FormState, fields: (keyof FormState)[]): boolean {
  return fields.every((field) => {
    const v = state[field];
    if (Array.isArray(v)) return v.length > 0;
    if (typeof v === "boolean") return v;
    return v.trim().length > 0;
  });
}

export function ContactForm() {
  const [values, setValues] = useState<FormState>(EMPTY_STATE);
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [leadId, setLeadId] = useState<string | null>(null);
  const [utm, setUtm] = useState<Record<string, string> | null>(null);

  const startedRef = useRef(false);
  const completedSectionsRef = useRef(new Set<string>());

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const entries = ["source", "medium", "campaign", "term", "content"]
      .map((key) => [key, params.get(`utm_${key}`)] as const)
      .filter((entry): entry is [string, string] => Boolean(entry[1]));
    if (entries.length > 0) setUtm(Object.fromEntries(entries));
  }, []);

  function markStarted() {
    if (!startedRef.current) {
      startedRef.current = true;
      track("contact_started");
    }
  }

  function checkSectionCompletion(nextValues: FormState) {
    for (const [section, fields] of Object.entries(SECTION_FIELDS)) {
      if (!completedSectionsRef.current.has(section) && isSectionComplete(nextValues, fields)) {
        completedSectionsRef.current.add(section);
        track("contact_step_completed", { section });
      }
    }
  }

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    markStarted();
    setValues((prev) => {
      const next = { ...prev, [key]: value };
      checkSectionCompletion(next);
      return next;
    });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setServerError(null);
    setErrors({});
    setSubmitting(true);
    track("contact_submitted");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, honeypot, utm }),
      });

      if (response.status === 429) {
        track("contact_rate_limited");
        const errBody = await response.json().catch(() => null);
        setServerError(errBody?.error ?? "Too many submissions. Please try again later.");
        return;
      }

      if (response.status === 400) {
        const errBody = await response.json().catch(() => null);
        const fieldErrors = errBody?.fieldErrors ?? {};
        track("contact_validation_failed", { fields: Object.keys(fieldErrors).join(",") });
        setErrors(
          Object.fromEntries(
            Object.entries(fieldErrors).map(([k, v]) => [
              k,
              Array.isArray(v) ? String(v[0]) : String(v),
            ]),
          ),
        );
        return;
      }

      if (!response.ok) {
        const errBody = await response.json().catch(() => null);
        setServerError(errBody?.error ?? "Something went wrong. Please try again.");
        return;
      }

      const okBody = await response.json();
      track("contact_success");
      setLeadId(okBody.leadId ?? null);
      setSubmitted(true);
    } catch {
      setServerError("Network error — please try again or email us directly.");
    } finally {
      setSubmitting(false);
    }
  }

  const inputClass =
    "w-full rounded-lg border border-white/10 bg-surface/80 px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-cyan/50 focus:ring-1 focus:ring-cyan/30";
  const labelClass = "mb-1.5 block text-xs font-medium text-secondary";
  const errorClass = "mt-1.5 text-xs text-amber";

  if (submitted) {
    return (
      <Reveal className="mx-auto max-w-xl">
        <div className="glass-strong rounded-2xl p-10 text-center sm:p-14">
          <h2 className="font-display text-2xl font-bold sm:text-3xl">
            {CONTACT_CONFIRMATION.title}
          </h2>
          <p className="mt-3 text-base text-secondary">{CONTACT_CONFIRMATION.subtitle}</p>
          {leadId ? (
            <p className="mt-6 font-mono text-xs uppercase tracking-[0.25em] text-cyan">
              Reference {leadId}
            </p>
          ) : null}
          <ul className="mx-auto mt-8 max-w-sm space-y-3 text-left">
            {CONTACT_WHAT_HAPPENS_NEXT.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-secondary">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-cyan" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    );
  }

  return (
    <Reveal className="mx-auto max-w-2xl">
      <form onSubmit={handleSubmit} className="glass-strong space-y-12 rounded-2xl p-8 sm:p-12">
        <input
          type="text"
          name="hp-field"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          className="absolute -left-[9999px] size-px opacity-0"
          aria-hidden="true"
        />

        <div className="space-y-6">
          <h3 className="font-display text-lg font-semibold">
            {CONTACT_FORM_SECTIONS.aboutYou}
          </h3>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="cf-company" className={labelClass}>Company Name</label>
              <input
                id="cf-company"
                required
                className={inputClass}
                value={values.company}
                onChange={(e) => update("company", e.target.value)}
              />
              {errors.company ? <p className={errorClass}>{errors.company}</p> : null}
            </div>
            <div>
              <label htmlFor="cf-name" className={labelClass}>Full Name</label>
              <input
                id="cf-name"
                required
                className={inputClass}
                value={values.name}
                onChange={(e) => update("name", e.target.value)}
              />
              {errors.name ? <p className={errorClass}>{errors.name}</p> : null}
            </div>
            <div>
              <label htmlFor="cf-email" className={labelClass}>Work Email</label>
              <input
                id="cf-email"
                type="email"
                required
                className={inputClass}
                value={values.workEmail}
                onChange={(e) => update("workEmail", e.target.value)}
              />
              {errors.workEmail ? <p className={errorClass}>{errors.workEmail}</p> : null}
            </div>
            <div>
              <label htmlFor="cf-title" className={labelClass}>Job Title</label>
              <input
                id="cf-title"
                required
                className={inputClass}
                value={values.jobTitle}
                onChange={(e) => update("jobTitle", e.target.value)}
              />
              {errors.jobTitle ? <p className={errorClass}>{errors.jobTitle}</p> : null}
            </div>
            <div>
              <label htmlFor="cf-desk-size" className={labelClass}>Desk Size</label>
              <select
                id="cf-desk-size"
                required
                className={inputClass}
                value={values.deskSize}
                onChange={(e) => update("deskSize", e.target.value)}
              >
                <option value="" disabled>Select…</option>
                {DESK_SIZE_VALUES.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
              {errors.deskSize ? <p className={errorClass}>{errors.deskSize}</p> : null}
            </div>
            <div>
              <SearchableSelect
                label="Jurisdiction"
                options={COUNTRIES}
                value={values.jurisdiction}
                onChange={(v) => update("jurisdiction", v)}
                required
              />
              {errors.jurisdiction ? <p className={errorClass}>{errors.jurisdiction}</p> : null}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="font-display text-lg font-semibold">
            {CONTACT_FORM_SECTIONS.tradingProfile}
          </h3>
          <div>
            <MultiSelectField
              label="Asset Classes"
              options={ASSET_CLASS_VALUES}
              value={values.assetClasses}
              onChange={(v) => update("assetClasses", v)}
              otherValue={values.assetClassesOther}
              onOtherChange={(v) => update("assetClassesOther", v)}
            />
            {errors.assetClasses ? <p className={errorClass}>{errors.assetClasses}</p> : null}
          </div>
          <div>
            <label htmlFor="cf-ai-usage" className={labelClass}>Current AI Usage</label>
            <select
              id="cf-ai-usage"
              required
              className={inputClass}
              value={values.aiUsage}
              onChange={(e) => update("aiUsage", e.target.value)}
            >
              <option value="" disabled>Select…</option>
              {AI_USAGE_VALUES.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
            {values.aiUsage === "Other" ? (
              <input
                className={`${inputClass} mt-2.5`}
                placeholder="Please specify…"
                value={values.aiUsageOther}
                onChange={(e) => update("aiUsageOther", e.target.value)}
              />
            ) : null}
          </div>
          <div>
            <label htmlFor="cf-governance" className={labelClass}>
              Current Governance Method
            </label>
            <select
              id="cf-governance"
              required
              className={inputClass}
              value={values.governanceMethod}
              onChange={(e) => update("governanceMethod", e.target.value)}
            >
              <option value="" disabled>Select…</option>
              {GOVERNANCE_METHOD_VALUES.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
            {values.governanceMethod === "Other" ? (
              <input
                className={`${inputClass} mt-2.5`}
                placeholder="Please specify…"
                value={values.governanceMethodOther}
                onChange={(e) => update("governanceMethodOther", e.target.value)}
              />
            ) : null}
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="font-display text-lg font-semibold">
            {CONTACT_FORM_SECTIONS.lookingFor}
          </h3>
          <div>
            <MultiSelectField
              label="Primary Goal"
              options={PRIMARY_GOAL_VALUES}
              value={values.primaryGoal}
              onChange={(v) => update("primaryGoal", v)}
              otherValue={values.primaryGoalOther}
              onOtherChange={(v) => update("primaryGoalOther", v)}
            />
            {errors.primaryGoal ? <p className={errorClass}>{errors.primaryGoal}</p> : null}
          </div>
          <div>
            <label htmlFor="cf-message" className={labelClass}>Message</label>
            <textarea
              id="cf-message"
              required
              rows={5}
              className={inputClass}
              value={values.message}
              onChange={(e) => update("message", e.target.value)}
            />
            {errors.message ? <p className={errorClass}>{errors.message}</p> : null}
          </div>
        </div>

        <div className="space-y-5 border-t border-white/10 pt-8">
          <label className="flex items-start gap-3 text-sm text-secondary">
            <input
              type="checkbox"
              required
              checked={values.consent}
              onChange={(e) => update("consent", e.target.checked)}
              className="mt-0.5 size-4 rounded border-white/20 bg-transparent text-cyan focus:ring-1 focus:ring-cyan/40"
            />
            <span>
              I agree to be contacted about this enquiry. {CONTACT_PRIVACY_STATEMENT}
            </span>
          </label>
          {errors.consent ? <p className={errorClass}>{errors.consent}</p> : null}

          <button
            type="submit"
            disabled={submitting}
            className="group flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-cyan to-azure px-6 py-3.5 text-sm font-semibold text-bg transition-shadow hover:shadow-[0_0_36px_-6px_rgba(0,215,255,0.6)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Sending…" : "Book an AI Desk Audit"}
            <ArrowRight
              className="size-4 transition-transform group-hover:translate-x-0.5"
              aria-hidden
            />
          </button>
          {serverError ? (
            <p className="text-center text-sm text-amber">{serverError}</p>
          ) : null}
        </div>
      </form>
    </Reveal>
  );
}
```

- [ ] **Step 2: Wire into `app/contact/page.tsx`**

Change:

```tsx
import { EarlyAccessForm } from "@/components/EarlyAccessForm";
```

to:

```tsx
import { ContactForm } from "@/components/ContactForm";
```

and change:

```tsx
        <div className="mt-8">
          <EarlyAccessForm />
        </div>
```

to:

```tsx
        <div className="mt-8">
          <ContactForm />
        </div>
```

- [ ] **Step 3: Delete `components/EarlyAccessForm.tsx`**

Run: `rm components/EarlyAccessForm.tsx`

- [ ] **Step 4: Remove dead exports from `lib/content.ts`**

Delete the `EARLY_ACCESS_GETS`, `EARLY_ACCESS_NOT_GETS`, and
`EARLY_ACCESS_DISCLAIMER` export blocks entirely (three separate `export
const` statements, currently located between `FAQ_ITEMS` and
`MANIFESTO_PRINCIPLES`).

- [ ] **Step 5: Verify no dangling references**

Run: `grep -rn "EarlyAccessForm\|EARLY_ACCESS" app components lib`
Expected: no output (empty).

Run: `npm run build`
Expected: succeeds, `/contact` still generates, no type/console errors.

- [ ] **Step 6: Manual visual + functional check**

Run `npm run dev`, open `/contact`:
- All three sections render with the enterprise-aesthetic spacing
  described in the spec (generous whitespace, larger section headings,
  no dense clutter).
- Fill the form completely and submit — confirm the confirmation card
  replaces the form in place, shows the lead ID, and lists the "what
  happens next" bullets.
- Try submitting with a required field empty — confirm an inline error
  appears next to that field and entered values in OTHER fields are
  preserved (not cleared).
- Select "Other" in Asset Classes / AI Usage / Governance Method /
  Primary Goal — confirm the free-text field appears immediately.
- Test the Jurisdiction `SearchableSelect`: type to filter, use Arrow
  keys to navigate, Enter to select, Escape to close without selecting.
- Check at 390×844 and 440×956 mobile viewports — no overflow, fields
  stack to one column, `MultiSelectField`'s checkbox grid collapses to
  one column.

- [ ] **Step 7: Commit**

```bash
git add components/ContactForm.tsx app/contact/page.tsx lib/content.ts
git rm components/EarlyAccessForm.tsx
git commit -m "feat: add qualified ContactForm, wire into /contact, remove EarlyAccessForm"
```

---

### Task 9: Accessibility, responsive, and design verification pass

**Files:** none (verification only — no code changes expected; if a real
gap is found, fix it as part of this task and note the fix in the commit
message, following the same pattern as prior slices' verification tasks).

**Interfaces:** N/A.

- [ ] **Step 1: Keyboard-only pass**

Tab through the entire form from the first field to the submit button.
Confirm: logical order matches the visual section order, every field has
a visible focus ring, the `SearchableSelect` combobox and
`MultiSelectField` checkboxes are all reachable and operable without a
mouse, and pressing Enter inside the message `<textarea>` does not
submit the form prematurely (textareas don't submit on Enter by default
— confirm this is still true here).

- [ ] **Step 2: Screen reader spot check**

Using VoiceOver (macOS) or a similar tool, confirm: every field
announces its label, the `SearchableSelect` announces as a combobox with
its current value and expanded/collapsed state, `MultiSelectField`
announces as a labeled group of checkboxes, and the honeypot field is
never announced (it's `aria-hidden` and off-screen).

- [ ] **Step 3: Mobile VoiceOver spot check**

On an iOS simulator or device, swipe through `/contact`'s form fields and
confirm the same labeling/behavior holds on mobile VoiceOver specifically
(touch-based navigation can expose gaps that desktop screen readers
don't).

- [ ] **Step 4: Contrast check**

Verify `text-amber` error messages meet WCAG AA against the form's
background (`bg-surface/80` field backgrounds and the `glass-strong` card
background) — `--color-amber: #f59e0b` should be checked at the actual
rendered opacity/background combination, not assumed.

- [ ] **Step 5: Re-confirm no banned marketing language**

Grep the new content in `lib/content.ts` (`CONTACT_PRIVACY_STATEMENT`,
`CONTACT_CONFIRMATION`, `CONTACT_FORM_SECTIONS`) and `ContactForm.tsx`'s
inline strings for "guaranteed", "profitable", "market-beating",
unqualified "institutional-grade", "high-conviction" — expect none.

- [ ] **Step 6: Record findings**

If Steps 1–5 are all clean, commit nothing further (verification-only,
same as prior slices' pattern) — just note completion in the progress
ledger. If any step finds a real, fixable gap, fix it directly, verify
the fix, and commit with a message describing the specific finding
fixed.

---

## Final Validation (after all 9 tasks)

- [ ] `npm run build` succeeds end-to-end, no console/type errors.
- [ ] `grep -rn "EarlyAccessForm\|EARLY_ACCESS" app components lib`
      returns nothing.
- [ ] Full manual exercise of `/api/contact`: happy path, validation
      errors, honeypot trip, rate-limit trip (4 rapid submissions),
      partial-failure simulation (temporarily invalidate the Resend key
      or Upstash token one at a time and confirm the other path still
      completes and the user still sees success).
- [ ] Full click-through of the new form at desktop and the two mobile
      viewports, confirming no layout regressions introduced anywhere
      else on `/contact` (the intro, qualification notice, and "what
      happens next" list built in W4a are untouched by this slice).
- [ ] No banned marketing language anywhere in the new copy.
- [ ] Deploy to a Preview via the same PR-based flow used for W4a
      (dedicated branch, PR, Vercel Preview, Protection Bypass for
      Automation for review access if Deployment Protection is still
      enabled) and run the full manual UX review Emad specified for W4a
      (desktop/tablet/mobile, keyboard-only, screen-reader spot check)
      before merge.
