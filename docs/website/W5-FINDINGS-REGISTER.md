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
| `npm audit`: 2 moderate PostCSS XSS advisories, transitive via `next`'s bundled PostCSS | **Assessed, not reachable in production — disposition documented below (§10)**. Not fixed with `npm audit fix --force` (that path is a semver-major `next` downgrade, explicitly out of scope) |
| No CSP violation reporting (`report-uri`/`report-to`) | **Deferred** — CSP is enforced but violations are silent in production; noted in `W5-OPERATIONAL-READINESS.md` as a reasonable future improvement |
| `eslint` script has no config file; no `typecheck`/`test` scripts | **Fixed** — `eslint.config.mjs` added (`next/core-web-vitals` + `next/typescript`, matched to the installed `next@15.5.20`/`eslint-config-next@15.5.20`), `npm run typecheck` (`tsc --noEmit`) and `npm run test` (Vitest) added. Two real pre-existing lint errors surfaced and fixed as part of turning the gate on: two internal `<a href="/#...">` links in `Footer.tsx` and one in `app/product/page.tsx` now use `next/link`, consistent with the other nav links in the same lists |
| Rate limiter silently degrades to per-instance memory limiting when Upstash credentials are absent, with no signal that distributed protection isn't active | **Fixed** — `getRateLimiter()` now logs one privacy-safe `console.warn` on first degraded-mode use (no IPs, hashes, emails, names, or message content) and exposes `isRateLimiterDegraded()` for server-side diagnostics. Covered by `lib/server/rateLimit.test.ts` |
| Contact route (`app/api/contact/route.ts`) had zero automated test coverage | **Fixed** — `app/api/contact/route.test.ts` (9 tests): validation errors, honeypot short-circuit, rate-limit 429 + `Retry-After`, email-provider failure (PII-safe log verified), storage failure (PII-safe log verified), combined failure → 500 (PII-safe log verified), no-idempotency/retry behavior (documents that resubmission is not deduplicated — real behavior, not asserted as a defect), and `Cache-Control: no-store` on every response path |

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
| JSON-LD `Offer` schema publishing a `$0` "early access" offer with no real transactable product | **Fixed** — the `offers` block removed from `SoftwareApplication` in `components/JsonLd.tsx`. There is no self-serve price, plan, or availability on this site (engagement happens through the design-partner contact flow, per `lib/content.ts`'s `CONTACT_INTRO`/`CONTACT_QUALIFICATION_NOTICE`); an `Offer` node was fabricated pricing/availability data, not a factually justified claim. `Organization`, `WebSite`, `SoftwareApplication` (without `offers`), and `FAQPage` schema remain, each backed by real, published site content |

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

## 10. PostCSS advisory disposition

[GHSA-qx2v-qp2m-jg93](https://github.com/advisories/GHSA-qx2v-qp2m-jg93) — "PostCSS has XSS via Unescaped `</style>` in its CSS Stringify Output," moderate (CVSS 6.1), affects `postcss < 8.5.10`.

- **Where it lives:** `next@15.5.20` bundles its own internal `postcss@8.4.31` (`node_modules/next/node_modules/postcss`), used by Next.js's own build-time CSS pipeline. It is a different, unrelated installation from this project's own `postcss@8.5.16` (pulled in by `@tailwindcss/postcss`), which is already patched — confirmed via `npm ls postcss`.
- **Reachability:** the advisory requires PostCSS to *stringify* attacker-controlled CSS content back out (the XSS is in unescaped output, not input parsing). Next's internal PostCSS instance only ever processes this repository's own authored CSS (`app/globals.css` and Tailwind's generated output) at build time — no request body, query parameter, or other end-user input is ever passed through it at runtime. There is no code path in this app where CSS content originates from user input and reaches PostCSS's stringifier. Disposition: **not reachable in the deployed application**.
- **Compensating control:** none needed beyond the reachability finding above, but for defense-in-depth the CSP (`middleware.ts`) already blocks inline `<style>` injection outside `'unsafe-inline'`'s existing same-origin scope, and `style-src` has no external host allowlisted.
- **Fix path:** `npm audit fix --force` would downgrade `next` to `9.3.3` (semver-major regression, breaking this app entirely) — not run, per explicit instruction. No compatible non-major version of `next` resolves this; it is fixed upstream in a version series this app has not adopted.
- **Tracked, not silently dropped:** no dedicated issue tracker exists in this repo (GitHub Issues is not in use for this project); this finding is the tracked record. Re-evaluate on the next deliberate `next` major-version upgrade (see the pre-existing "dependency major-version upgrades" deferred item in §2), since that upgrade would resolve this advisory as a side effect.
- **Release-blocking?** No — moderate severity, and the reachability analysis above shows no exploitable path in this application. This does not meet the "unresolved reachable High/Critical risk" release-blocking bar.

## Summary

**Fixed this pass (original W5 pass):** hero/dashboard LCP defect (8.6s → 2.9s), full security header set, CSP, contact-API `Cache-Control: no-store`, PII removed from failure logs.

**Fixed this pass (closure-verification pass):** fabricated JSON-LD `Offer` removed; rate-limiter degraded-mode observability added with tests; lint config turned on (and its two real pre-existing findings fixed); `typecheck` script added; Vitest added with 11 tests covering the contact route and rate-limit degradation; PostCSS advisory formally assessed as not reachable in production.

**Verified already good (no code change needed):** footer contrast, form a11y (errors + success focus management), mobile nav pattern, global focus ring, reduced-motion support, SEO metadata/sitemap/robots/canonicals, 404 status code, footer LinkedIn link (already removed).

**Deferred, with reasons documented above:** dependency major-version upgrades (would also clear the PostCSS advisory as a side effect), CSP violation reporting, custom-branded 404, cross-browser (Safari/Firefox/Edge) testing, live Resend/Upstash production certification, W2 data-contract adapter, WhatsApp button.

None of the deferred items are on the plan's release-gate list except, arguably, "known critical responsive failure" (not found — responsive is clean) and the hero LCP defect (fixed). The deferred items are real, but none of them are the specific defects the release gates name. Live Resend/Upstash certification and cross-browser testing are the two deferred items that gate the plan's own Execution-process step 9 (production smoke test) — see `WEBSITE-LAUNCH-PLAN.md` Release gates.
