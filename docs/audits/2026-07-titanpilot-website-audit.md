# Titan Pilot Website Audit — 2026-07

**Date:** 2026-07-10
**Auditor pass:** static repo/content read-through (Task 1) + live
production pass (Task 2)
**Production URL:** https://www.titanpilot.app
**Repo:** TitanPilotHQ/Portfolio @ commit 9cd2024
**Driving strategy doc:** `TitanPilotHQ/Titan` repo,
`docs/strategy/PHASE_D_5_COMMERCIAL_STRATEGY.md`

Classification legend: **Keep** (no action) · **Revise** (content/behavior
wrong, structure fine) · **Remove** (delete outright) · **Add** (missing,
needs building) · **Needs owner/legal decision** (I cannot decide this one).

## Positioning and copy

| Area | Current state | Finding | Classification | Source |
| --- | --- | --- | --- | --- |
| Hero eyebrow/headline | `components/Hero.tsx` — eyebrow "AI Reasons. Software Decides.", headline "AI Trading Infrastructure That Records Every Decision Before It Risks Capital." | Engineering-led, not category-led. New strategy wants "Supervised AI Trading" as the category and "system of record for AI trading decisions" as the identity, in the first 10 seconds. | Revise | `PHASE_D_5_COMMERCIAL_STRATEGY.md` Part 0 |
| Primary/secondary CTA | `components/Hero.tsx`, `components/Header.tsx` — "Join Early Access" → `/#contact` | Generic, attracts retail signal-seekers instead of qualifying a Head of Trading. New strategy wants "Explore a real decision" / "Book an AI Desk Audit". | Revise | parent brief, Conversion section |
| `RoadmapTimeline.tsx:51` | Section title `"A Measured Path to Autonomous Market Intelligence."` | Autonomy-led framing directly contradicts "we do NOT sell autonomous trading dreams." | Revise | `PHASE_D_5_COMMERCIAL_STRATEGY.md` Part 0; parent brief Copy Policy |
| `lib/content.ts` `ENTITY_STATEMENTS[3]` | `"Titan Pilot is currently validating its AI shadow pipeline."` | Stale — Phase C.5 certified PASS 2026-07-08, shadow pipeline is running and certified, not "validating". | Revise | `PHASE_C_5_CERTIFICATION.md` |
| `lib/content.ts` `EVIDENCE_ROWS` — "Shadow AI pipeline" row | State: `"In validation"` | Same staleness as above. | Revise | `PHASE_C_5_CERTIFICATION.md` |
| `lib/content.ts` `PRODUCT_MODES[0]` | Shadow Mode status: `"In Validation"` | Same staleness. | Revise | `PHASE_C_5_CERTIFICATION.md` |
| `lib/content.ts` `ROADMAP` — "AI Shadow Mode" | status: `"in-validation"` | Same staleness. | Revise | `PHASE_C_5_CERTIFICATION.md` |
| `lib/content.ts` `FAQ_ITEMS[3]` ("Is Titan Pilot live?") | Answer states "currently in shadow-mode validation" | Same staleness; also FAQ content overall still speaks to a general trader, not the Head-of-Trading ICP. | Revise | `PHASE_D_5_COMMERCIAL_STRATEGY.md` Part I |
| `app/layout.tsx:38` | `keywords` array includes `"autonomous trading platform"` | Directly contradicts "we do NOT sell autonomous trading dreams." | Revise | `PHASE_D_5_COMMERCIAL_STRATEGY.md` Part 0 |
| `app/layout.tsx:51` | `keywords` array includes `"forex automation"` | Contradicts "we do NOT sell retail automation." | Revise | `PHASE_D_5_COMMERCIAL_STRATEGY.md` Part 0 |
| `app/layout.tsx:73` | Twitter description: `"Autonomous trading intelligence built like mission-critical infrastructure. AI reasons. Software decides."` | Same autonomy-led contradiction, plus duplicates the OG description almost verbatim (thin content). | Revise | `PHASE_D_5_COMMERCIAL_STRATEGY.md` Part 0 |
| `components/DashboardMockup.tsx` | Fictional live-looking cockpit: candlesticks, animated AI score ring, "HIGH CONVICTION THESIS", labeled "PRODUCT SIMULATION" in footer caption | Even correctly labeled, this is exactly the "decorative trading cockpit" the new visual direction explicitly wants replaced by the decision evidence chain. | Revise/Remove (replaced in W2 by real Evidence Explorer) | parent brief, Visual Direction |
| `components/EarlyAccessForm.tsx` | `mailto:` handoff (line 32), no field qualification (company/role/desk-size/jurisdiction/asset-class/current-AI-usage), no spam/rate control | Does not match the qualified-lead form spec (Head of Trading intake, AI Desk Audit path). | Revise (W4) | parent brief, Conversion section |
| `app/manifesto/page.tsx`, `app/disclaimer/page.tsx` | Principles and disclaimer language already risk-first and evidence-led; no banned words found (`guarantee`, `profitable`, `market-beating` do not appear as claims — `disclaimer/page.tsx:24-25` uses "no guaranteed returns" correctly, as a negation) | Directionally aligned with new strategy already. Minor terminology pass needed in W1 to swap "AI trading infrastructure" framing for "Supervised AI Trading" category language, but structure and legal tone are sound. | Keep, minor Revise | direct repo read |
| `lib/content.ts` `EARLY_ACCESS_DISCLAIMER`, `DISCLAIMER` | Clear, risk-first, no unsupported claims | Sound as-is. | Keep | direct repo read |
| Footer (logo size, contact email) | 56px logo, `admin@titanpilot.app` | Already fixed in commit `3feb362`, matches current state. | Keep | direct repo read |

## Metadata, structured data, crawl config

| Area | Current state | Finding | Classification | Source |
| --- | --- | --- | --- | --- |
| `components/JsonLd.tsx` `softwareApplication.offers` | `{ price: "0", priceCurrency: "USD", description: "Early access program — shadow-mode validation phase." }` | There is no actual priced offer or transactable product yet. Publishing an `Offer` schema for something that isn't a real commercial offer is a judgment call outside pure engineering — could read as an unsupported claim to a crawler/AI answer engine, or could be considered harmless ($0, clearly labeled). | Needs owner/legal decision | parent brief, Copy and Claims Policy ("No unsupported Product ratings, reviews, customers, or pricing") |
| `components/JsonLd.tsx` — Organization/WebSite/FAQPage blocks | Present, well-formed, values sourced from `lib/content.ts` | Structurally sound; will need new copy once `ENTITY_STATEMENTS`/`FAQ_ITEMS` are revised in W1. | Keep (structure), Revise (content, tracked above) | direct repo read |
| `app/sitemap.ts` | Lists `/`, `/manifesto`, `/disclaimer` only | Correct for the routes that exist today. Will need every new W1–W5 route added as it ships — not a defect now. | Keep (for now), Add (per-slice as routes ship) | direct repo read |
| `app/robots.ts` | Allow all, points to `${SITE_URL}/sitemap.xml` | Correct, no issue. | Keep | direct repo read |
| `app/layout.tsx` | `alternates.canonical: "/"` set at root; no per-route canonical override mechanism yet | Fine for current single-page-plus-two-static-pages site; will need real per-route metadata (title template already supports it) once W1–W5 routes exist. | Keep (for now) | direct repo read |

## Security, dependencies, tooling

| Area | Current state | Finding | Classification | Source |
| --- | --- | --- | --- | --- |
| `next.config.ts` | Only `reactStrictMode: true`; no `headers()` block | No security headers configured at all — no `Strict-Transport-Security`, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, or CSP. | Add (W5) | direct repo read |
| CSP | Not present anywhere in the codebase | Same gap as above — no Content-Security-Policy header. | Add (W5) | direct repo read |
| ESLint config | `package.json` has a `"lint": "next lint"` script but no `eslint.config.*` or `.eslintrc*` file exists in the repo root | Lint script will fall back to Next's interactive first-run prompt or fail non-interactively — effectively no working lint gate today. | Revise (W5) | direct repo read (`find` returned no matches) |
| Test/typecheck scripts | `package.json` `scripts` block has only `dev`, `build`, `start`, `lint` — no `test` or `typecheck` script | Parent brief requires typecheck script, test scripts, unit/component tests, Playwright critical journeys, a11y scanning, link checking. None exist. | Add (W5) | direct repo read |
| `npm outdated` | `next` 15.5.20→16.2.10, `@vercel/analytics` 1.6.1→2.0.1, `@vercel/speed-insights` 1.3.1→2.0.0, `lucide-react` 0.525.0→1.24.0, `typescript` 5.9.3→7.0.2, `@types/node` 22.20.0→22.20.1 (patch) | Several major-version upgrades available. Each needs its own compatibility review before bumping (parent brief: "latest stable dependencies after compatibility review") — not a blind bump. | Needs owner/legal decision (prioritization call, not a pure engineering one — some of these are major version jumps that may carry breaking changes) | `npm outdated` output, captured 2026-07-10 |
| `npm audit --omit=dev` | 2 moderate: PostCSS `<8.5.10` XSS via unescaped `</style>` in stringify output, pulled in transitively through `next`'s bundled `postcss`. Only fix path shown is `npm audit fix --force`, which would downgrade `next` to `9.3.3` (a major regression). | Real but low-actionability finding — the vulnerable path is a transitive dependency of `next` itself, not something this repo can patch directly without breaking the framework version. Track and re-check after any `next` upgrade (see row above); do not force-downgrade. | Needs owner/legal decision (accept residual risk vs. block on upstream fix) | `npm audit` output, captured 2026-07-10 |
| Vercel Analytics / Speed Insights | Wired in `app/layout.tsx` (`<Analytics />`, `<SpeedInsights />`) | Present and correctly placed. Actual dashboard metrics (real-user CWV, traffic) were not inspected in this audit — no Vercel dashboard access was available in this session (Vercel MCP plugin requires interactive auth not available here). | Needs owner/legal decision — Emad should pull real-user CWV from the Vercel dashboard directly; this audit could only test synthetic (Lighthouse) metrics, see Task 2. | direct repo read + tooling limitation |
| Vercel configuration | No `vercel.json` or `vercel.ts` in the repo root; deployment relies entirely on Vercel's zero-config Next.js auto-detection | No config file means the security headers this audit flags as `Add` (row above) will need to land via `next.config.ts` `headers()` or a new `vercel.ts` — worth deciding which now that `vercel.ts` is the current recommended path for headers/redirects on Vercel, so W5 doesn't build on the deprecated `vercel.json` pattern. | Add (W5) | direct repo read |
| Secret scanning | `git ls-files \| grep -iE ".env\|secret\|credential"` returns nothing; no `.env*` files are git-tracked | Clean — no committed secrets found. | Keep | direct repo read, captured 2026-07-10 |

## Live production audit (pending)

Replaced by Task 2.

## Synthesis

Replaced by Task 4.
