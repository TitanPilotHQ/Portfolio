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

## Live production audit

Captured 2026-07-10 against `https://www.titanpilot.app`.

Methodology note: the installed `chrome-devtools` MCP `lighthouse_audit` tool
(Lighthouse 13.3.0, this environment's build) only returns
accessibility/best-practices/SEO/agentic-browsing — it excludes the
performance category entirely (tool description: "This excludes
performance. For performance audits, run performance_start_trace"). To get
a real numeric Performance score rather than inventing one, a direct
`npx lighthouse@13.4.0` CLI run (headless Chrome, `--preset=desktop`, same
four categories) was used instead. Accessibility/Best Practices/SEO scores
from the CLI run (96/100/100) matched the MCP tool's desktop run exactly,
confirming both measured the same live page consistently. Separately, the
MCP `resize_page` tool floored the effective viewport width at 500px
(requests for 390 and 440 both yielded `innerWidth: 500`) — the `emulate`
tool's `viewport` parameter was used instead and correctly produced
`innerWidth: 390` and `440` respectively.

| Area | Result | Classification | Notes |
| --- | --- | --- | --- |
| Lighthouse — Performance | 95, 100, 100 (median 100) /100 | Keep (≥95) | `npx lighthouse` desktop run; original single-sample score (95) sat exactly on the Keep/Revise boundary, so two additional runs were captured and the classification is based on the 3-run median (100) rather than one sample. First run's top opportunity was Largest Contentful Paint (audit score 0.81, 25% weight, LCP = 1.5s / 1464ms); re-runs did not reproduce that regression. |
| Lighthouse — Accessibility | 96/100 | Revise (<98) | `color-contrast` audit failed (score 0): footer disclaimer paragraph (`text-white/40` on `bg-bg`/`#070a11`) measures 3.76:1, below the required 4.5:1 |
| Lighthouse — Best Practices | 100/100 | Keep (≥95) | no issues flagged |
| Lighthouse — SEO | 100/100 | Keep (=100) | no issues flagged |
| Console errors | 0 error-level messages | Keep (=0) | 1 warn-level message noted (not an error): "The resource https://www.titanpilot.app/_next/image?url=%2Flogo.png&w=96&q=75 was preloaded using link preload but not used within a few seconds from the window's load event" |
| Network errors | 0 non-2xx/3xx requests | Keep (=0) | all 23 requests observed on initial load + `/manifesto` + `/disclaimer` navigation returned `200` |
| Mobile overflow — 390×844 | scrollWidth 390 vs clientWidth 390 | Keep (equal) | screenshot `mobile-390x844.png` (hero, badge row, cockpit widget) — no visible horizontal clipping |
| Mobile overflow — 440×956 | scrollWidth 440 vs clientWidth 440 | Keep (equal) | screenshot `mobile-440x956.png` (hero, badge row, cockpit widget with market data) — no visible horizontal clipping |
| `sitemap.xml` | Lists exactly 3 routes: `https://www.titanpilot.app` (weekly, priority 1), `/manifesto` (monthly, priority 0.8), `/disclaimer` (yearly, priority 0.4) | Keep | matches `app/sitemap.ts` source |
| `robots.txt` | `User-Agent: *` / `Allow: /` plus `Sitemap: https://www.titanpilot.app/sitemap.xml` | Keep | matches `app/robots.ts` source |
| OG image (`/banner.png`) | HTTP 200, content-type `image/png` (`content-length: 1640453`, served via Vercel with `x-vercel-cache: HIT`) | Keep | |
| JSON-LD parse check | 4/4 blocks parsed (`Organization`, `WebSite`, `SoftwareApplication`, `FAQPage`, in that order) | Keep | all four `application/ld+json` script blocks `JSON.parse` without error |
| Broken/unresolved links | 1 found | Revise | footer social icon labelled "LinkedIn" has `href="#"` (no real destination) — every other internal link resolves: `/`, `/manifesto`, `/disclaimer`, and hash links `#product`/`#architecture`/`#ai-model`/`#safety`/`#roadmap`/`#contact`/`#faq` all land on an existing `id` on the homepage; `https://www.titanpilot.app` and `mailto:admin@titanpilot.app` are also valid |

## Synthesis

### Needs owner/legal decision — full list

These are surfaced here so nothing gets silently decided by an
implementation pass.

- **JSON-LD `Offer` schema** (`components/JsonLd.tsx`
  `softwareApplication.offers`): currently publishes a `$0` "Early access
  program" offer. There is no real priced/transactable product yet.
  Weighing: keep publishing it as-is (clearly labeled `$0`, arguably
  harmless) vs. remove or revise it (risk of a crawler/AI answer engine
  reading it as an unsupported commercial claim).
- **Dependency-upgrade prioritization** (`npm outdated`): several
  major-version upgrades are available (`next` 15.5.20→16.2.10,
  `typescript` 5.9.3→7.0.2, `@vercel/analytics` 1.6.1→2.0.1,
  `@vercel/speed-insights` 1.3.1→2.0.0, `lucide-react` 0.525.0→1.24.0).
  Weighing: which of these to prioritize and sequence, and when — each is
  a major-version jump needing its own compatibility review, not a blind
  bump.
- **`npm audit` transitive vulnerability** (`npm audit --omit=dev`): 2
  moderate PostCSS `<8.5.10` XSS advisories, pulled in transitively
  through `next`'s bundled `postcss`. The only fix path shown
  (`npm audit fix --force`) would downgrade `next` to `9.3.3`, a major
  regression. Weighing: accept the residual risk and track it until the
  next `next` upgrade vs. block on an upstream fix.
- **Vercel Analytics real-user CWV follow-up**: `<Analytics />` and
  `<SpeedInsights />` are wired correctly in `app/layout.tsx`, but this
  audit could only test synthetic (Lighthouse) metrics — no Vercel
  dashboard access was available in this session. Weighing: this isn't a
  two-option call so much as an open action — Emad needs to pull
  real-user CWV/traffic numbers from the Vercel dashboard directly to
  confirm the synthetic results hold in production.

### Information architecture decision

Final route commitment for W1–W5:

| Route | Slice | Status decided now |
| --- | --- | --- |
| `/` | W1 | rewrite |
| `/product` | W3 | new |
| `/evidence` | W2 | new — real fixture selection is its own decision, not made in W0 |
| `/security` | W3 | new |
| `/architecture` | W3 | new |
| `/spec` | W3 | new — ships as an honest "public draft in preparation" state; no Decision Evidence Specification document exists yet in the `Titan` engine repo (confirmed by direct search, 2026-07-10) |
| `/research` | W4 | new — index only; no publishable soak/incident reports exist yet, ships with a "nothing published yet" state, not fabricated entries |
| `/company` | W4 | new |
| `/contact` | W4 | rewrite — qualified AI Desk Audit / Design Partner form |
| `/changelog` | — | excluded from W0–W5. Internal `CHANGELOG.md` exists in the `Titan` engine repo but is not public-safe as written (references internal ops detail); revisit only after someone does the curation work. |
| `/status` | — | excluded from W0–W5. Internal `src/titan/ops/status.py` exists but is an operational tool, not a public status page; no public uptime commitment exists to publish. |

### What ships next

W1 begins with the items above classified `Revise` under "Positioning and
copy" — the hero, CTAs, stale validation-status copy, and metadata keyword
list. Items classified `Add` under "Security, dependencies, tooling" are
deferred to W5 by design (per parent brief slice ordering) and should not
block W1–W4 content work.
