# W4b — Qualified Contact Form + Real Backend

**Status:** approved for implementation (planning-only pending W4a merge)
**Owner:** Emad
**Repo:** TitanPilotHQ/Portfolio (this repo)
**Related program:** TITANPILOT.APP investor-grade positioning revision (W0–W5)
**Depends on:** W4a (`/contact` route, `PageShell`, `CONTACT_INTRO`,
`CONTACT_QUALIFICATION_NOTICE`, `CONTACT_WHAT_HAPPENS_NEXT`,
`CONTACT_EMAIL` — all already on `main` once W4a merges)

## Context

W4a shipped `/contact` as a real route with an intro, a qualification
notice, and a "what happens next" list — but the form itself is still the
original 4-field `EarlyAccessForm`, which hands off to `mailto:` and does
not qualify or capture leads. This slice replaces that form with a real
qualified-enterprise-lead capture flow and a production backend, per
decisions made directly with Emad across this conversation (field list,
spam/rate-limit approach, storage, lead ID format, analytics events,
design aesthetic, and abstraction requirements were all specified
explicitly, not inferred).

This spec is written and reviewed while W4a is in its own final manual
review; **no implementation happens until Emad explicitly starts
execution**, and W2 remains blocked on the sanitized evidence fixture
independent of this work.

## Scope

In scope:
1. `app/api/contact/route.ts` — new Route Handler: validation, honeypot,
   rate limiting, IP hashing, lead-ID generation, notification send, lead
   storage, partial-failure handling.
2. `lib/contactSchema.ts` — shared Zod schema (client + server).
3. `lib/server/rateLimit.ts` — `RateLimiter` interface + Upstash + in-memory
   implementations.
4. `lib/server/hashIp.ts` — HMAC-SHA256 IP hashing.
5. `lib/server/notification.ts` — `NotificationProvider` interface +
   `ResendNotificationProvider`.
6. `lib/server/leadStore.ts` — `LeadStore` interface + `UpstashLeadStore`,
   including sequential `lead_id` generation.
7. `lib/countries.ts` — jurisdiction reference list (new file, kept out of
   `lib/content.ts` since it's reference data, not page prose).
8. `lib/content.ts` — new exports: form option lists (desk size, asset
   classes, AI usage, governance methods, primary goals), confirmation
   copy, updated privacy statement.
9. `components/SearchableSelect.tsx` — new, dependency-free WAI-ARIA
   combobox (used for Jurisdiction).
10. `components/MultiSelectField.tsx` — new, checkbox-group multi-select
    with an "Other" free-text reveal (used for Asset Classes, Primary
    Goal).
11. `components/ContactForm.tsx` — new, the full qualified form,
    replacing `EarlyAccessForm`'s usage on `/contact` (homepage teaser is
    untouched — it already links to `/contact`, built in W4a).
12. `app/contact/page.tsx` — swap `EarlyAccessForm` for `ContactForm`.
13. Analytics events via the already-installed `@vercel/analytics`
    package's client `track()`.
14. New dependencies: `resend`, `@upstash/redis`, `zod`.
15. New env vars: `RESEND_API_KEY`, `IP_HASH_SALT`,
    `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`.
16. A standalone deployment checklist (Resend, Upstash, DNS, env vars,
    Vercel) — operational, not code; tracked separately so it can be
    followed independent of the implementation plan.

Explicitly out of scope:
- `EarlyAccessForm.tsx` itself is not deleted (still used nowhere after
  this ships, but deleting dead code is a one-line follow-up, not core to
  this slice — implementer may delete it as part of Task 8 if the removal
  is trivial and verified unused, but it is not a blocking requirement).
- No CRM/Postgres migration — `LeadStore`/`NotificationProvider` are
  built as swappable interfaces specifically so that migration is a
  future, independent slice.
- No CAPTCHA/Turnstile — explicitly rejected by Emad; honeypot + rate
  limiting only, with the `NotificationProvider`/`RateLimiter`-style
  abstraction making Turnstile addable later without touching the route
  handler's control flow.
- W5 (systematic accessibility/performance/SEO/AEO/GEO/security audit)
  remains a separate future slice — this slice's own accessibility work
  (Task 10) is scoped to the new form only, not a site-wide sweep.

## Field list (exact, per Emad's specification)

| Field | Type | Options | Required |
|---|---|---|---|
| Company Name | text | — | yes |
| Full Name | text | — | yes |
| Work Email | email (format-validated) | — | yes |
| Job Title | text | — | yes |
| Desk Size | single select | Solo, 2–5, 6–10, 11–20, 21–50, 51–100, 100+ | yes |
| Jurisdiction | searchable single select | country/region list (`lib/countries.ts`) | yes |
| Asset Classes | multi-select | FX, CFDs, Equities, Futures, Options, Crypto, Commodities, Fixed Income, Multi-Asset, Other (free text) | yes (≥1) |
| Current AI Usage | single select | None, ChatGPT, Claude, Gemini, Multiple General AI Tools, Internal AI, Other | yes |
| Current Governance Method | single select | None, Manual Review, Trading Journal, Risk Committee, Internal Workflow, Compliance Review, Other | yes |
| Primary Goal | multi-select | AI Governance, Explainability, Risk Controls, Audit Trail, Decision Replay, Human Approval, Compliance, Operational Visibility, Other | yes (≥1) |
| Message | textarea | — | yes |
| Consent | checkbox | — | yes (must be checked) |
| Honeypot | hidden text input, never shown to real users | — | must be empty |

"Other" selections (Asset Classes, AI Usage, Governance Method, Primary
Goal) reveal an inline free-text input when selected; that text is
appended to the stored value (e.g. `governance_method: "Other: quarterly
board review"`).

## Design direction

Per Emad's explicit framing: **not a support form — an executive-meeting
booking flow.** Concretely: generous whitespace between field groups,
larger heading/label typography than the site's default form scale, no
visual clutter (no icons-in-every-field, no dense grid-of-12-fields
layout), fields grouped into four logical sections with breathing room
between them rather than one long undifferentiated list:

1. **About You & Your Desk** — Company Name, Full Name, Work Email, Job
   Title, Desk Size, Jurisdiction.
2. **Your Trading Profile** — Asset Classes, Current AI Usage, Current
   Governance Method.
3. **What You're Looking For** — Primary Goal, Message.
4. **Consent & Submit** — the consent checkbox, submit button.

This grouping is also what "step completed" analytics events key off (see
Analytics below) — it's a real structural grouping, not just visual.

## Confirmation flow

On successful submission, the form is replaced **in place** (same page,
no route change) with a confirmation card:

- Headline: "Thank you."
- Sub-line: "Your request has been received."
- The lead ID (e.g. `TP-2026-000014`), shown once, styled as a reference
  number the visitor could quote in a follow-up email.
- "What happens next" — reuses `CONTACT_WHAT_HAPPENS_NEXT` (already
  written in W4a, no new copy needed): "Your submission is reviewed." /
  "We assess whether Titan Pilot is an appropriate fit." / "Qualified
  enquiries normally receive a response within two business days."

No separate confirmation email to the submitter in this slice (avoids
extra Resend deliverability complexity for v1) — the in-page card is the
only confirmation. This can be added later behind the same
`NotificationProvider` interface without a route-handler change.

## Backend architecture

### Request flow (`app/api/contact/route.ts`)

1. Parse JSON body, validate against the Zod schema
   (`lib/contactSchema.ts`). Invalid → `400` with field-level errors.
2. Honeypot check: if the hidden field is non-empty, log a spam-attempt
   record (timestamp, hashed IP, user agent, reason: `"honeypot"`) and
   return a **generic success response** (`200`) without sending email or
   storing a lead — never reveal to a bot that it was caught.
3. Hash the request IP (`lib/server/hashIp.ts`).
4. Rate-limit check (`lib/server/rateLimit.ts`) keyed on the hashed IP:
   max 3 submissions/hour, burst limit 2 within 5 minutes. Exceeded →
   `429` with `Retry-After` header and a friendly JSON message; log the
   attempt (reason: `"rate_limit"`) the same way as a honeypot hit.
5. Generate `lead_id` (`lib/server/leadStore.ts`'s
   `getNextLeadId()` — format `TP-{year}-{6-digit sequence}`, e.g.
   `TP-2026-000014`) and a `uuid` (internal only, never shown to the
   visitor).
6. Build the full lead record (schema below) and, in parallel via
   `Promise.allSettled`:
   - Send the notification email (`NotificationProvider.send(...)`) to
     `CONTACT_EMAIL`.
   - Save the record (`LeadStore.save(...)`).
7. Partial-failure handling (exact behavior, both directions):
   - Email succeeds, storage fails → respond `200` success to the
     visitor (they don't lose their submission experience over an
     internal storage hiccup), log the storage failure server-side with
     full record detail for manual recovery.
   - Storage succeeds, email fails → respond `200` success to the
     visitor (the lead is safely recorded), log the email failure
     server-side. A future iteration can add a retry queue; this slice
     logs clearly enough that a missed-email incident is discoverable
     from logs, not silent.
   - Both fail → respond `500` with a generic "something went wrong,
     please email us directly at admin@titanpilot.app" message (the
     `/contact` page's existing "alternative contact" line already gives
     this fallback path).
   - Both succeed → respond `200` with `{ leadId }` for the confirmation
     card.

### Lead record schema (versioned)

```
schema_version: 1
lead_id: string          // "TP-2026-000014"
uuid: string              // internal, never shown to visitor
submitted_at: string      // ISO 8601 UTC
form_version: number      // 1
source: string            // "website/contact"
company: string
name: string
work_email: string
job_title: string
desk_size: string
jurisdiction: string
asset_classes: string[]
ai_usage: string
governance_method: string
primary_goal: string[]
message: string
consent: boolean
hashed_ip: string
user_agent: string
referrer: string | null
utm: { source, medium, campaign, term, content } | null  // only populated if present in the request
```

### `LeadStore` interface

```ts
interface LeadRecord { /* schema above */ }
interface LeadStore {
  getNextLeadId(): Promise<string>;
  save(record: LeadRecord): Promise<void>;
}
```

`UpstashLeadStore` implements this using Upstash Redis: `INCR` on
`leads:counter:{year}` for the sequence number (atomic, safe under
concurrent submissions), and `SET leads:{lead_id} {json}` for the record
itself (a plain key-value store is sufficient for this volume; no index
structure needed for v1 — future CRM migration replaces the whole
implementation, not this data model).

### `NotificationProvider` interface

```ts
interface NotificationProvider {
  send(params: { to: string; subject: string; html: string; text: string }): Promise<{ success: boolean; error?: string }>;
}
```

`ResendNotificationProvider` implements this via the `resend` npm
package. Sender: `noreply@titanpilot.app` (requires domain verification
in Resend — see deployment checklist). The email body is a formatted
rendering of the full lead record (all fields, human-readable), including
the `lead_id` prominently at the top.

### `RateLimiter` interface

```ts
interface RateLimiter {
  checkAndConsume(key: string): Promise<{ allowed: boolean; retryAfterSeconds?: number }>;
}
```

`UpstashRateLimiter` implements the 3/hour + 2/5min sliding-window rule
via Upstash Redis. `MemoryRateLimiter` implements the same interface with
an in-process `Map`, automatically selected when
`UPSTASH_REDIS_REST_URL`/`UPSTASH_REDIS_REST_TOKEN` are absent (local dev
without Upstash configured — no crash, no silent no-op, just a
process-local limiter that resets on restart).

### IP hashing

`hashIp(ip: string): Promise<string>` — HMAC-SHA256 via the Web Crypto
API (`crypto.subtle`, available in the Node.js runtime Next.js Route
Handlers run in) keyed by the server-only `IP_HASH_SALT` env var. Raw IP
is never logged, stored, or passed to any provider — only the hash.

## Analytics

Client-side events via `@vercel/analytics`'s `track()` (already a
dependency, already wired via `<Analytics />` in `app/layout.tsx` — no
new setup needed, just new `track()` call sites in `ContactForm.tsx`):

| Event | Fires when |
|---|---|
| `contact_started` | First focus/change on any field (fires once per form session) |
| `contact_step_completed` | All required fields within one of the four grouped sections (above) are filled for the first time (fires once per section, up to 4 times) |
| `contact_validation_failed` | Client-side validation fails on submit attempt (property: which field(s) failed — field names only, never values) |
| `contact_submitted` | The fetch request to `/api/contact` is sent |
| `contact_success` | The API responds `200` with a lead ID |
| `contact_rate_limited` | The API responds `429` |

## Privacy

Data collected is limited to what's needed to qualify a genuine enterprise
conversation — explicitly **no trading credentials, broker access, or
account information** is ever requested (already true of the field list
above). New privacy statement, replacing `EARLY_ACCESS_DISCLAIMER`'s
usage on `/contact` (that string is currently rendered only inside the
`EarlyAccessForm` instance W4a temporarily placed there — once
`ContactForm` replaces it, `EARLY_ACCESS_DISCLAIMER`,
`EARLY_ACCESS_GETS`, and `EARLY_ACCESS_NOT_GETS` become unused entirely
if `EarlyAccessForm.tsx` is removed per Task 8 — clean up all three
exports together with the component, don't leave orphaned exports):

> "We collect only what's needed to evaluate your enquiry — your company,
> role, desk profile, and message. We never ask for trading credentials,
> broker access, or account information. Your submission is reviewed by
> Titan Pilot directly and is not sold or shared with third parties."

IP addresses are hashed before storage (never stored in plaintext), no
tracking cookies are set by this form beyond what `@vercel/analytics`
already sets site-wide, and the honeypot field is invisible and inert for
real visitors (no visual or interactive footprint).

## Environment configuration

| Var | Purpose | Required in |
|---|---|---|
| `RESEND_API_KEY` | Resend API authentication | Production + Preview (Preview can share the same key/domain or use a separate test sender — decided in deployment checklist) |
| `IP_HASH_SALT` | HMAC key for IP hashing | Production + Preview + local dev |
| `UPSTASH_REDIS_REST_URL` | Upstash Redis REST endpoint | Production + Preview (local dev falls back to `MemoryRateLimiter`/an in-memory `LeadStore` stub — see Task 3) |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash Redis REST auth token | Production + Preview |

Local dev without Upstash configured: rate limiting falls back to
`MemoryRateLimiter` automatically (per the interface design above);
`LeadStore` requires a real Upstash connection even in dev (no in-memory
fallback for lead storage — losing a real lead is a bigger problem than
losing a rate-limit counter, so dev either uses a real
Upstash free-tier database or the developer accepts that `/api/contact`
will 500 locally without it, exactly as documented in the deployment
checklist).

## Testing / validation

No test suite exists for this repo (same tracked W0 finding as every
prior slice). Validation is:
- `npm run build` succeeds, no new type/console errors.
- Manual exercise of every path: happy path (full valid submission →
  confirmation card with lead ID), validation errors (missing required
  field, invalid email — values preserved, inline errors shown),
  honeypot trip (filled hidden field → generic success, no email/lead
  actually sent — verified via logs, not via the response), rate-limit
  trip (4th submission within an hour from the same IP → 429 with
  friendly message), partial-failure simulation (temporarily break the
  Resend key or Upstash token one at a time → confirm the other path
  still completes and the user still sees success).
- Accessibility pass (Task 10): tab order through all four sections,
  screen-reader labels on every field (including the custom
  `SearchableSelect` and `MultiSelectField`), `SearchableSelect` keyboard
  behavior (type-to-filter, Arrow Up/Down, Enter to select, Escape to
  close), mobile VoiceOver spot check.
- After implementation: deploy to a Preview via the same PR-based flow
  used for W4a (branch, PR, Vercel Preview, Protection Bypass for
  Automation for review access), then a full manual UX review (desktop/
  tablet/mobile, light/dark — though this site is dark-only by design per
  W4a's audit finding, so "light" here means confirming that remains true
  and isn't accidentally broken by new form styling — keyboard-only,
  screen-reader spot check) before merge, matching the process Emad
  specified for W4a.

## Security review checklist (for the implementer / final review)

- [ ] Raw IP never logged, stored, or transmitted to any third party —
      only the HMAC hash.
- [ ] `IP_HASH_SALT`, `RESEND_API_KEY`, `UPSTASH_REDIS_REST_TOKEN` are
      server-only env vars (no `NEXT_PUBLIC_` prefix), never referenced
      in any client component.
- [ ] Honeypot response is indistinguishable from a real success
      response (same status code, same body shape) — no timing or
      content signal a bot could use to detect it was caught.
- [ ] Rate limiter fails closed on Upstash errors in production (if the
      rate-limit check itself errors, do not silently allow the request
      through — log and return a generic 500 rather than bypass the
      limit) but fails open to `MemoryRateLimiter` only when Upstash
      env vars are absent entirely (a deliberate dev-mode condition, not
      a runtime error).
- [ ] Zod schema rejects unexpected/extra fields (no silent pass-through
      of arbitrary client-supplied keys into the stored record).
- [ ] No SSRF/injection surface: all stored values are used as data
      (JSON/Redis values, email body text), never interpolated into a
      shell command, SQL query, or HTML without escaping (the Resend
      email body must escape user-supplied text if rendered as HTML, to
      prevent HTML injection in the internal notification email).
- [ ] CORS: the route handler is same-origin only (default Next.js Route
      Handler behavior — no explicit `Access-Control-Allow-Origin`
      wildcard is added).

## Out of scope / explicit non-goals

- No CAPTCHA/Turnstile (explicitly rejected).
- No CRM integration (interfaces are ready for it, not built now).
- No confirmation email to the submitter (in-page card only, this
  slice).
- No admin dashboard for viewing leads (Upstash's own dashboard or a
  future small internal tool covers this if needed — not part of the
  public site).
- No dependency-vulnerability audit beyond installing pinned, current
  versions of `resend`/`@upstash/redis`/`zod` — a full `npm audit` sweep
  is W5's job.
