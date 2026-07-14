# W5 — Closure Report

**Date:** 2026-07-14
**Scope:** `WEBSITE-LAUNCH-PLAN.md` §W5 (launch hardening) for
`titanpilot.app`, excluding W2 (see "W2 boundary" below).
**Decision: GO** — the public website, excluding W2, is launch-ready.

---

## 1. Summary

W5 closed across four PRs on `main`, plus one manual-certification pass
against real production infrastructure (Resend, Upstash, four real
browsers, Vercel dashboards). One real defect was found and fixed during
certification itself (contact-form client-side validation was
unreachable); everything else planned for this phase is verified working
with real evidence, not just code review.

## 2. PRs and commits

| PR | Title | Merge commit | Content |
|---|---|---|---|
| #26 | W5: security headers, hero LCP fix, launch plan + operational readiness | `3dca42e` | Security headers, CSP (`middleware.ts`), Hero/DashboardMockup LCP fix, `W5-OPERATIONAL-READINESS.md` |
| #27 | W5 closure verification: JSON-LD fix, rate-limit observability, quality gates, PostCSS disposition | `2d68734` | Removed fabricated JSON-LD `Offer`; rate-limiter degraded-mode `console.warn` + `isRateLimiterDegraded()`; `eslint`/`typecheck`/`test` scripts added; PostCSS advisory assessed as unreachable |
| #28 | docs(website): W5 manual certification checklist | `dfd54b7` | 13-section manual certification checklist (docs-only) |
| #29 | fix(a11y): contact form no longer relies on native validation to surface errors | `90ae7dc` | `noValidate` + client-side Zod validation; conditional "Other"-companion-field validation (4 field pairs); stale-error-state fix |

**Production deployment SHA:** `dfd54b7` (current `main` tip), confirmed
live via GitHub commit-status API (`Vercel` context, `state: success`,
`"Deployment has completed"`, deployment
`vercel.com/emadkhanqais-projects/portfolio/3fTFptpMhf2dmxXcnrgBR7DqaiKk`).
`dfd54b7` is docs-only; the last behavior-affecting commit is `90ae7dc`,
separately confirmed deployed (`state: success`) before `dfd54b7` landed
on top of it.

**Vercel project:** the site is bound to the **`portfolio`** Vercel
project. A second, unrelated `titan-site` project (matching this repo's
now-stale local `.vercel/project.json`, gitignored) had zero Production
deployments and was shadowing DNS resolution during early certification;
Emad deleted it, which immediately resolved a `500` on `/api/contact`.

## 3. Quality gates (automated, this session)

| Gate | Result |
|---|---|
| `npm run lint` | ✅ No ESLint warnings or errors |
| `npm run typecheck` | ✅ Clean (`tsc --noEmit`) |
| `npm test` | ✅ 38/38 tests passing, 4 test files (`lib/contactSchema.test.ts`, `components/ContactForm.test.tsx`, `app/api/contact/route.test.ts`, `lib/server/rateLimit.test.ts`) |
| `npm run build` | ✅ Clean production build, all 9 public routes + `/api/contact` + `/sitemap.xml` + `/robots.txt` compile |

## 4. Final independent adversarial review

A review independent of the implementation work read the full W5 diff
(`9e1ed37..90ae7dc`), all W5 docs, the CSP/rate-limit/PII/honeypot code
paths, and the contact-form fix in full — then independently re-ran
lint/typecheck/test/build and live-exercised the conditional-validation
logic rather than only reading it.

**Verdict: no blocking defects.** Two non-blocking observations, neither
requiring a fix:
- Focus-on-first-invalid-field doesn't move focus for `jurisdiction`,
  `assetClasses`, `primaryGoal`, or `consent` — a pre-existing,
  self-documented scope limit (the error text still renders and is
  screen-reader-announced via `role="alert"` either way; this is not a
  regression from the W5 fix).
- `ContactForm.test.tsx`'s "Other"-field UI tests cover `aiUsage` and
  `assetClasses` explicitly but not `governanceMethod`/`primaryGoal` —
  the wiring was manually diffed and confirmed symmetric and correct for
  all four; this is a test-coverage gap, not a live bug (schema- and
  route-level tests do cover those two pairs independently).

All claims checked in `W5-FINDINGS-REGISTER.md` and
`W5-OPERATIONAL-READINESS.md` matched the actual code.

## 5. Contact-form production certification

Full evidence trail: `docs/website/W5-MANUAL-CERTIFICATION-CHECKLIST.md`
(all 13 sections PASS). Summary:

| Check | Result |
|---|---|
| Resend delivery | Real test email delivered to `admin@titanpilot.app` |
| Upstash persistence | Lead record confirmed in Data Browser, correct JSON shape |
| Sequential lead ID | Confirmed sequential across submissions |
| Duplicate submission behavior | Two distinct submissions → two distinct records (intended, no dedup guard) |
| Rate-limit trigger (§5b) | Third rapid submission → `429` + `Retry-After` header; confirmed **no** new Resend email and **no** new Upstash key for the blocked request |
| PII-safe logs | Zero Runtime Log matches for test name/email/message text |
| Distributed rate limiting active | Zero Runtime Log matches for `[rateLimit] Upstash credentials absent` — confirms Upstash-backed limiting in Production, not the per-instance memory fallback |

### Contact-form validation defect (found and fixed during certification)

Cross-browser certification surfaced that `ContactForm.tsx`'s `<form>`
had `required` attributes but no `noValidate`, so native browser
constraint validation intercepted submission before React's `onSubmit`
ever ran — a blank required field (e.g. Job Title) produced no usable
feedback. This is a finding about the review method as much as the code:
the original W5 accessibility pass verified markup correctness
(`role="alert"`, `aria-invalid`, `aria-describedby`) but not runtime
reachability of the error path, which only a real browser interaction
exposes.

Fixed in PR #29 (`90ae7dc`): `noValidate` + client-side
`contactFormSchema.safeParse()` before submit. The same pass found and
fixed two related gaps: the four "Other"-selected companion fields had
no validation/error UI at all, and a stale-error-state bug where a
companion field's error could resurface after being deselected then
reselected without resubmitting. All three fixes verified with new
automated tests and three independent adversarial review passes during
development (each empirically reverted the fix under test to confirm
targeted tests failed, proving they're non-vacuous).

Re-verified post-deploy: blank Job Title shows an app-owned inline
error; "Other" selected with blank companion detail shows the correct
inline error; no native validation popup intercepts submission; no
network request fires for client-invalid input; keyboard/focus behavior
remains correct.

## 6. Cross-browser verification

Full 6-step script (hero renders immediately, no horizontal overflow at
mobile width, mobile nav opens/closes, client-side nav to `/contact`,
keyboard-only field access with visible focus, inline validation on
blank Job Title + blank "Other" companion) re-run against production
post-fix:

| Browser | Result |
|---|---|
| Chrome | ✅ PASS |
| Safari | ✅ PASS |
| Firefox | ✅ PASS |
| Edge | ✅ PASS |

No unexplained console, CSP, hydration, JavaScript, Analytics, or Speed
Insights errors on any browser.

## 7. Performance

- Synthetic (Lighthouse 13.4.0, local production build, mobile
  throttling): Performance score 75 → 95, LCP 8.6s → 2.9s, CLS unchanged
  at 0. Root cause was Framer Motion `opacity:0 → 1` entrance animation
  gating the Hero/DashboardMockup above-the-fold content behind
  hydration.
- Real-user (Vercel Speed Insights, production): RES (Real Experience
  Score) 95, LCP 2.95s, confirmed receiving live visitor data (first
  recorded session: Pakistan, Desktop, Mac).
- Residual gap: Lighthouse's simulated-throttling LCP (2.9s) remains
  above the 2.5s "good" threshold; this is a smaller, lower-priority
  follow-up (font-display strategy, ~26KiB unused-JS trim), not the
  defect this phase targeted, which is resolved.

## 8. Security

- **Headers** (verified via `curl -I` against production): `X-Content-Type-Options`,
  `Referrer-Policy`, `Permissions-Policy`, `X-Frame-Options`,
  `Strict-Transport-Security`, `Content-Security-Policy` — all six
  present on every response.
- **CSP**: same-origin only, no external hosts allowlisted; a
  nonce + `strict-dynamic` variant was tried and reverted after it broke
  hydration (documented in the PR #26 commit message).
- **PII handling**: `/api/contact` failure-path logs carry only `leadId`
  + error string, never the lead record; confirmed via both automated
  tests and live Runtime Log search (zero matches for real test PII).
- **PostCSS advisory** (`GHSA-qx2v-qp2m-jg93`, moderate): formally
  assessed as not reachable in this application (Next's bundled internal
  PostCSS instance only processes this repo's own authored CSS at build
  time, never user input). Not release-blocking. Full reasoning in
  `W5-FINDINGS-REGISTER.md` §10.

## 9. SEO / structured data

- Fabricated JSON-LD `Offer` (a `$0` "early access" offer with no real
  transactable product) removed from `SoftwareApplication` schema.
  `Organization`, `WebSite`, `SoftwareApplication` (without `offers`),
  and `FAQPage` schema remain, each backed by real published content.
- All 9 public routes return `200` with unique titles; `sitemap.xml`
  lists exactly those 9 routes; `robots.txt` correct; `404` status
  confirmed correct on a nonexistent path.

## 10. Rollback verification

Cold check confirmed against the `portfolio` project: the `2d68734`
deployment (immediately prior to the current `90ae7dc`/`dfd54b7` chain)
is still listed, not expired, and its **...** menu shows **Promote to
Production**. Live drill not run — the cold check satisfies this
section's pass criteria; an unnecessary live promotion carries its own
small risk for no added certification value.

Git-level fallback (if the instant-rollback deployment ever expires):
`git revert <bad-merge-commit-sha>` on a new branch/PR — documented in
full in `W5-OPERATIONAL-READINESS.md` → "Rollback procedure".

## 11. Residual, non-blocking risks

Carried forward from `W5-FINDINGS-REGISTER.md`, none of which are
release gates for this phase:

- No CSP violation reporting (`report-uri`/`report-to`) — violations are
  enforced but silent in production.
- No custom-branded 404 page (status is correctly `404`; this is polish).
- No dedicated error-tracking service (Sentry or equivalent); errors
  surface only via Vercel function logs and Speed Insights.
- No automated alerting on repeated 500s — a real gap for a mature
  production launch, needs an owner decision on an alerting channel.
- Dependency major-version upgrades (`next`, `typescript`,
  `@vercel/analytics`, `@vercel/speed-insights`, `lucide-react`) deferred
  as deliberate compatibility-review decisions, not blind bumps. (Also
  the fix path for the PostCSS advisory above, as a side effect.)
- From the final adversarial review (§4 above): the four form fields
  without focus-on-error wiring, and the two "Other" companion pairs
  without dedicated component-level tests — both pre-existing scope
  limits, not regressions, not blocking.
- Real-user Core Web Vitals should be pulled again from the Vercel
  dashboard 24–48h post-launch and compared against the synthetic
  Lighthouse numbers above — flagged as a still-open follow-up from the
  2026-07-10 audit, carried forward again here.

## 12. W2 boundary

**W2 remains explicitly blocked** on Titan's certified sanitized
fixture, per `WEBSITE-LAUNCH-PLAN.md` §8. No W2 work was started, no W2
evidence was fabricated or implied, and nothing in this closure changes
that status. When W2 begins, W5's own scope note already establishes
the intended integration shape: a versioned fixture adapter with
loading/empty/error states and schema validation — not attempted here.

## 13. Decision

**GO** for the public website (all pages except any W2-dependent
surface, which does not exist yet and is not part of this launch). Every
release-gate item in `WEBSITE-LAUNCH-PLAN.md` §W5 is verified with real
evidence — not code-review inference — across security, performance,
accessibility, SEO, and the contact-lead pipeline (Resend delivery,
Upstash persistence, rate limiting, PII-safe logging), on real production
infrastructure and all four target browsers. The one real defect found
during certification (contact-form validation) was fixed, re-verified on
all four browsers, and reviewed three times before merge plus once more
in this closure's final independent pass. No blocking defects remain.

**Remaining blockers for a fully complete site:** W2 only (blocked on
Titan's fixture, out of scope for this decision).
