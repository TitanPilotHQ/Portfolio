# W5 Findings Register

Audit against `WEBSITE-LAUNCH-PLAN.md`'s 9-section W5 scope, run
2026-07-14 against a local production build (`next build && next start`)
plus a fresh read of every file the plan's checklist touches. Findings are
grouped by section; each is marked **Fixed** (this pass), **Verified
already good** (no action needed), or **Deferred** (real gap, not closed
in this pass, with why).

## 1. Security hardening

| Finding | Status |
|---|---|
| No security headers configured at all (`next.config.ts` had only `reactStrictMode`) | **Fixed** — `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `X-Frame-Options`, `Strict-Transport-Security` added via `next.config.ts` `headers()` |
| No Content-Security-Policy anywhere | **Fixed** — `middleware.ts` (new), same-origin-only CSP on every document response. A nonce + `'strict-dynamic'` variant was tried first and reverted after it broke hydration entirely (verified: 24 CSP violations, 0 JS executed) — see the commit message for the full account |
| `/api/contact` responses had no `Cache-Control` header | **Fixed** — all 6 response sites now set `Cache-Control: no-store` |
| Lead-storage-failure log wrote the full lead record (name, work email, message) to application logs | **Fixed** — log now carries only `leadId` and the error |
| `npm audit`: 2 moderate PostCSS XSS advisories, transitive via `next`'s bundled PostCSS | **Deferred** — same finding as the 2026-07-10 audit; only fix path (`npm audit fix --force`) downgrades `next` to a major-version regression. Owner decision needed on accepting residual risk vs. blocking on an upstream fix |
| No CSP violation reporting (`report-uri`/`report-to`) | **Deferred** — CSP is enforced but violations are silent in production; noted in `W5-OPERATIONAL-READINESS.md` as a reasonable future improvement |
| `eslint` script has no config file; no `typecheck`/`test` scripts | **Deferred** — same finding as 2026-07-10 audit, unchanged. Real gap (no lint gate, no test suite) but out of scope for a header/perf/a11y-focused pass; flagging so it isn't silently dropped again |

## 2. Performance

| Finding | Status |
|---|---|
| Hero (`Hero.tsx`) and dashboard mockup (`DashboardMockup.tsx`) both gated all above-the-fold content behind Framer Motion `opacity:0 → 1` entrance animation, blocking LCP until hydration | **Fixed** — measured LCP 8.6s → 2.9s, Performance score 75 → 95 (Lighthouse 13.4.0, default mobile throttling, local production build). CLS stayed at 0, no regression |
| Residual LCP (2.9s) is above Google's 2.5s "good" threshold | **Deferred** — this is Lighthouse's simulated mobile throttling profile applied even to `localhost`; the specific *defect* the plan named (opacity-gated LCP element) is resolved. Further gains (font-display strategy, JS bundle splitting — `unused-javascript` audit shows ~26KiB potential savings) are real but smaller, lower-priority follow-ups, not blockers |
| `npm outdated`: `next`, `typescript`, `@vercel/analytics`, `@vercel/speed-insights`, `lucide-react` all have major-version upgrades available | **Deferred** — same finding as 2026-07-10 audit. Each is a compatibility-review decision, not a blind bump; not attempted in this pass |

## 3. Accessibility

| Finding | Status |
|---|---|
| Footer disclaimer contrast failure (`text-white/40`, 3.76:1) — flagged in the 2026-07-10 audit | **Verified already fixed** — current code uses `text-white/60` (≈7.2:1 computed against `#070a11`), likely fixed in an earlier commit between that audit and now. Lighthouse accessibility: 100/100 on `/` and `/contact` |
| Form error announcements | **Verified already good** — every field error uses `role="alert"`; submission success moves focus to a `tabIndex={-1}` confirmation heading (correct screen-reader-announcement pattern) |
| Mobile nav (`Header.tsx`) keyboard/focus behavior | **Verified already good** — correct WAI-ARIA "disclosure" pattern: `aria-expanded`, `aria-label`, Escape closes it. Does not require a focus trap (not a modal overlay) |
| Global visible focus ring | **Verified already good** — `:focus-visible` rule in `globals.css` applies everywhere |
| `prefers-reduced-motion` handling | **Verified already good** — present in `globals.css` |
| No custom-branded 404 page (Next.js default `_not-found` is used) | **Deferred, minor** — HTTP status is correctly `404` (verified via `curl`); the plan's requirement is "correct 404 behavior," which this satisfies. A branded 404 page is a polish item, not a defect |

## 4. Responsive and browser verification

| Finding | Status |
|---|---|
| Mobile (390×844) homepage, post-Hero-fix | **Verified** — no horizontal overflow (`scrollWidth === clientWidth`), screenshot-confirmed clean render |
| Desktop (1440×900) homepage, post-Hero-fix | **Verified** — screenshot-confirmed, dashboard mockup renders fully immediately, no layout regression |
| Safari/Firefox/Edge cross-browser testing | **Deferred** — this environment only has a Chromium-based browser available (Playwright/chrome-devtools MCP); the plan's "Safari, Chrome, Firefox, Edge where practical" cross-browser pass needs a real multi-browser environment (e.g., BrowserStack, or Emad's own machines) to complete honestly rather than claim untested coverage |

## 5. SEO and metadata

| Finding | Status |
|---|---|
| Unique titles/descriptions per route | **Verified already good** — all 8 secondary routes (`/product`, `/architecture`, `/security`, `/research`, `/company`, `/contact`, `/manifesto`, `/disclaimer`) have distinct `metadata.title`/`description` |
| Canonical URLs per route | **Verified already good** — each route sets `alternates: { canonical: "/..." }` |
| `sitemap.xml` / `robots.txt` | **Verified already good** — sitemap lists exactly the 9 real public routes, no internal/preview routes; robots.txt allows all, correct sitemap reference |
| 404 status code correctness | **Verified already good** — `curl` confirms real `404` status |
| Footer "LinkedIn" broken link (`href="#"`) — flagged in 2026-07-10 audit | **Verified already fixed** — no LinkedIn link exists in current `Footer.tsx` at all |
| JSON-LD `Offer` schema publishing a `$0` "early access" offer with no real transactable product | **Deferred, needs owner decision** — same open item as the 2026-07-10 audit, unchanged; not re-litigated in this pass |

## 6. Contact flow production certification

| Finding | Status |
|---|---|
| Validation-error path (`400`) | **Verified** — tested via `curl`, correct status + `Cache-Control: no-store` |
| Honeypot path | **Verified** — tested via `curl`, returns fake success without touching Resend/Upstash (confirmed by code read: honeypot check happens before `getRateLimiter()`/`getLeadStore()`/`getNotificationProvider()` are ever called) |
| Rate limiting, IP-HMAC, retry/duplicate behavior | **Verified in code**, not load-tested — `MemoryRateLimiter`/`UpstashRateLimiter` logic read and confirmed correct (burst limit 2/5min, hourly limit 3); a real multi-request timing test against a live Upstash instance was not run, since that requires real credentials this session doesn't have and risks counting against real rate-limit state |
| Successful delivery through Resend, Upstash persistence + sequential lead ID | **Not tested this pass** — deliberately: the plan explicitly says "do not send uncontrolled test spam to real recipients," and this session has no isolated test Resend/Upstash credentials. `docs/deployment/w4b-deployment-checklist.md` §7 already documents the correct one-time manual verification procedure (submit one real test lead against a Preview deployment) — this remains the right way to certify this specific item, not something to fake or skip |
| Privacy-safe logging | **Fixed** (see Security section above) |

## 7. Operational readiness

New document: `docs/website/W5-OPERATIONAL-READINESS.md` — health/smoke checklist, deployment verification, rollback procedure, env-var inventory (names only), error-monitoring expectations, post-deploy checklist. One real gap surfaced and documented rather than silently accepted: rate limiting degrades to a per-instance in-memory counter if Upstash env vars are absent, with no error/log signal that it's in degraded mode.

## 8. W2 integration boundary

Not started in this pass. `docs/website/WEBSITE-LAUNCH-PLAN.md` correctly states W2 remains blocked on Titan's certified sanitized fixture. Per the plan's own §8, W5 should prepare W2 only as "a clean data-contract integration" (versioned fixture adapter, loading/empty/error states, schema validation) once that work begins — not attempted here since it wasn't flagged as independent-of-W2 work in this session's instruction, and inventing a fixture adapter without a real schema to build against would risk exactly the "invent evidence" failure mode §8 warns against.

## 9. Optional item (WhatsApp)

Not started — plan explicitly gates this on "all release-critical W5 work is green" first.

## Summary

**Fixed this pass:** hero/dashboard LCP defect (8.6s → 2.9s), full security header set, CSP, contact-API `Cache-Control: no-store`, PII removed from failure logs.

**Verified already good (no code change needed):** footer contrast, form a11y (errors + success focus management), mobile nav pattern, global focus ring, reduced-motion support, SEO metadata/sitemap/robots/canonicals, 404 status code, footer LinkedIn link (already removed).

**Deferred, with reasons documented above:** `npm audit` transitive PostCSS advisory, dependency major-version upgrades, missing lint/test tooling, CSP violation reporting, custom-branded 404, cross-browser (Safari/Firefox/Edge) testing, live Resend/Upstash production certification, JSON-LD `$0` offer decision, W2 data-contract adapter, WhatsApp button.

None of the deferred items are on the plan's release-gate list except, arguably, "known critical responsive failure" (not found — responsive is clean) and the hero LCP defect (fixed). The deferred items are real, but none of them are the specific defects the release gates name.
