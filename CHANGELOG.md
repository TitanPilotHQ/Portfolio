# Changelog

All notable changes to the Titan Pilot marketing site are documented here,
grouped by the internal slice program (W0–W5). Format loosely follows
[Keep a Changelog](https://keepachangelog.com/).

## W4b — Qualified Contact Form + Real Backend (2026-07-12)

The temporary `EarlyAccessForm` mailto-link form is gone. `/contact` is now
backed by a real production API route.

### Added
- `POST /api/contact` — Zod validation, honeypot spam trap, hashed-IP rate
  limiting (2/5min burst, 3/hour, Upstash-backed with in-memory dev
  fallback), sequential human-readable lead IDs (`TP-YYYY-NNNNNN`),
  Resend email notification, Upstash lead storage, partial-failure-safe
  response (a user only sees an error if *both* email and storage fail).
- `ContactForm` — a 4-section qualified-lead form (About You & Your Desk,
  Trading Profile, Looking For, Consent) with a dependency-free
  `SearchableSelect` (WAI-ARIA combobox, 195-country jurisdiction list) and
  `MultiSelectField` (checkbox group with "Other, please specify").
- Analytics instrumentation: `contact_started`, `contact_step_completed`,
  `contact_submitted`, `contact_success`, `contact_rate_limited`,
  `contact_validation_failed`.
- Swappable `NotificationProvider`/`LeadStore`/`RateLimiter` interfaces —
  concrete Resend/Upstash implementations can be swapped later without
  touching call sites.

### Fixed
- Heading-order regression on `/contact` (form sections skipped from h1 to
  h3 with no h2 in between) — caught by Lighthouse, fixed pre-merge.
- Missing `aria-invalid`/`aria-describedby`/`aria-live` wiring across the
  entire form — no error was ever programmatically associated with its
  field, and neither the error banner nor the success transition was
  announced to screen readers.
- `errors.aiUsage`/`errors.governanceMethod` were computed but never
  rendered — a real functional bug found while fixing the accessibility
  gap above.
- `zod` migrated to v4 native syntax rather than pinning to v3, since it
  was a brand-new dependency in this repo.

### Removed
- `components/EarlyAccessForm.tsx` and its three now-dead content exports.

### Verified
- End-to-end against real Resend + Upstash credentials (Preview, then
  production): 3 real leads created, real emails sent, real Redis writes,
  full validation matrix, honeypot masking, live burst-rate-limit trip.
- Lighthouse ×4 pages: Accessibility 100/100, Best Practices 100/100 (all
  pages). Performance (73–75) and SEO (61, Preview-only artifact) findings
  are real but pre-existing/site-wide, not introduced by this slice.
- No secret or PII leakage in any response body.

## W4a — Company, Research, Contact Pages (2026-07-11 – 2026-07-12)

- Added `/company` (founder, mission, principles, "what Titan Pilot will
  never claim", timeline), `/research` (philosophy, pipeline status,
  publication standards), and `/contact` (temporarily using
  `EarlyAccessForm`, retired in W4b).
- Homepage contact teaser section; all `#contact`/`/#contact` CTAs across
  the site retargeted to `/contact`.
- Independent audit (visual/responsive, deep accessibility, functional,
  SEO/metadata, real Lighthouse) — zero Critical/High findings after
  fixing: invalid `<ol>` child, missing `<h1>` on `/company`, heading-order
  skip, low-contrast disclaimer text, mobile menu missing Escape-to-close.

## W3 — Product, Security, Architecture Pages (2026-07-10 – 2026-07-11)

- Added `/product`, `/security`, `/architecture`. Extracted a shared
  `PageShell` layout, retrofitted `/manifesto` and `/disclaimer` onto it.
- Registered 6 new claims in the public claims register.

## W1 — Messaging, Metadata, Homepage Rewrite (2026-07-10)

- Repositioned around "Supervised AI Trading" category language, rewrote
  the hero, fixed site/manifesto metadata, corrected the roadmap heading
  to be autonomy-led, fixed WCAG AA contrast issues in the footer and
  evidence section.

## W0 — Audit, Claim Register, Information Architecture (2026-07-10)

- Static repo/content audit (positioning, metadata, security, dependencies)
  and live production audit (Lighthouse, console, mobile, structured data).
- Seeded the public claims register from certification evidence.
- Synthesized the W1–W5 slice roadmap.

## Initial Build

- Titan Pilot marketing site scaffolded on Next.js 15, Tailwind v4, Framer
  Motion. Interactive homepage (3D tilt, parallax, marquee, go-to-top).

---

## Status

| Slice | Scope | Status |
|---|---|---|
| W0 | Audit, claims register, IA | ✅ Complete |
| W1 | Messaging, metadata, homepage | ✅ Complete |
| W2 | Real Evidence Explorer | 🔒 Blocked — waiting on a sanitized decision-record fixture from Titan's production event log |
| W3 | /product, /security, /architecture | ✅ Complete |
| W4a | /company, /research, /contact (pages) | ✅ Complete |
| W4b | Contact form real backend | ✅ Complete — production-verified 2026-07-12 |
| W5 | Accessibility/performance/SEO/AEO/GEO/security polish | Not started |
