# W0 — Production Audit, Claim Register, IA Decision Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Produce two committed markdown documents — a full production audit
classified Keep/Revise/Remove/Add/Needs-owner-decision, and a sourced public
claims register — plus a recorded route decision for W1–W5. No site code,
copy, or layout changes ship in this plan.

**Architecture:** Two new markdown files (`docs/audits/2026-07-titanpilot-website-audit.md`,
`docs/content/PUBLIC_CLAIMS_REGISTER.md`) built in four passes: static
repo/content audit, live production audit, claim register, then a closing
synthesis (owner-decision summary + IA table) appended to the audit doc.

**Tech Stack:** Markdown docs only. Live-audit tooling: chrome-devtools MCP
(`navigate_page`, `lighthouse_audit`, `list_console_messages`,
`list_network_requests`, `resize_page`, `take_screenshot`), `curl`, `npm
outdated`, `npm audit`.

## Global Constraints

- No claim ships to `PUBLIC_CLAIMS_REGISTER.md` without a source doc + date
  (spec, Deliverable 2).
- No page on the live site changes as part of this plan (spec, Out of
  scope).
- `/evidence` real fixture selection is explicitly NOT made in this plan
  (spec, Out of scope — deferred to W2).
- Classification values in the audit doc must be one of `Keep`, `Revise`,
  `Remove`, `Add`, `Needs owner/legal decision`, or a compound of two of
  those five joined by `/` or `, ` when a row genuinely means two things at
  once (e.g. structure vs. content, now vs. later) — a compound value is
  only valid when it carries a one-clause reason distinguishing the two
  halves, not as a way to avoid picking one (spec, Deliverable 1; amended
  2026-07-10 per Task 1 review finding and Emad's decision to keep the
  compound rows already written).
- IA table must cover all 11 routes named in the parent brief, including
  explicit exclusion reasoning for `/changelog` and `/status` (spec,
  Deliverable 3).

---

### Task 1: Static repo and content audit

**Files:**
- Create: `docs/audits/2026-07-titanpilot-website-audit.md`

**Interfaces:**
- Consumes: nothing (first task)
- Produces: `docs/audits/2026-07-titanpilot-website-audit.md` with a
  `## Live production audit (pending)` placeholder section that Task 2
  replaces, and a `## Synthesis` placeholder section that Task 4 replaces.
  Every other section is final after this task.

- [ ] **Step 1: Create the audit doc with header and static findings**

Write the full file. This step's content is authoritative — copy verbatim:

```markdown
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
```

- [ ] **Step 2: Verify the file was written correctly**

Run: `grep -c "^|" docs/audits/2026-07-titanpilot-website-audit.md`
Expected: a number greater than 20 (confirms the tables have rows, not
just headers).

Run: `grep -n "TBD\|TODO\|FIXME\|placeholder" docs/audits/2026-07-titanpilot-website-audit.md`
Expected: no output (no leftover placeholders).

- [ ] **Step 3: Commit**

```bash
git add docs/audits/2026-07-titanpilot-website-audit.md
git commit -m "$(cat <<'EOF'
W0: static repo/content audit (positioning, metadata, security, deps)

Classifies every statically-verifiable finding against the Phase D.5
commercial strategy. Live-production and synthesis sections are
filled in by the next two tasks.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 2: Live production audit

**Files:**
- Modify: `docs/audits/2026-07-titanpilot-website-audit.md` (replace the
  `## Live production audit (pending)` section from Task 1)

**Interfaces:**
- Consumes: `docs/audits/2026-07-titanpilot-website-audit.md` from Task 1
  (must exist with the exact section header `## Live production audit
  (pending)`)
- Produces: the same file with that section replaced by real, observed
  results. `## Synthesis` section is untouched (Task 4 handles it).

- [ ] **Step 1: Run a Lighthouse audit against production**

Use the chrome-devtools MCP tool `lighthouse_audit` (or navigate first with
`navigate_page` to `https://www.titanpilot.app`, then run it) with all four
categories (performance, accessibility, best-practices, SEO). Record the
four numeric scores.

- [ ] **Step 2: Check console and network errors**

Navigate to `https://www.titanpilot.app` with `navigate_page`, then run
`list_console_messages` and `list_network_requests`. Record any error-level
console messages and any non-2xx/3xx network responses (excluding expected
304s).

- [ ] **Step 3: Mobile viewport check**

Use `resize_page` to set the viewport to 390×844, then 440×956 (the same
two sizes used for the earlier mobile-hero-blowout fix). At each size, take
a screenshot with `take_screenshot` and run this in the page via the
browser tool's evaluate capability:

```js
({
  scrollWidth: document.documentElement.scrollWidth,
  clientWidth: document.documentElement.clientWidth,
})
```

Expected: `scrollWidth === clientWidth` at both sizes (no horizontal
overflow). Record the actual numbers either way.

- [ ] **Step 4: Fetch and validate sitemap, robots, OG image, JSON-LD**

Run:

```bash
/usr/bin/curl -s https://www.titanpilot.app/sitemap.xml
/usr/bin/curl -s https://www.titanpilot.app/robots.txt
/usr/bin/curl -sI https://www.titanpilot.app/banner.png
```

Expected: sitemap XML lists exactly `/`, `/manifesto`, `/disclaimer`;
robots.txt allows `/` and points to the sitemap; the banner request returns
`200` with a `content-type: image/png` (or similar) header. Then, from the
already-navigated page, extract and `JSON.parse` each
`script[type="application/ld+json"]` block's `textContent` to confirm all
four blocks (`Organization`, `WebSite`, `SoftwareApplication`, `FAQPage`)
parse without error.

- [ ] **Step 5: Broken link and duplicate content spot-check**

From the page snapshot (`take_snapshot` or accessibility tree), collect
every `href` on the homepage. For each internal link (starts with `/` or
matches `SITE_URL`), confirm it resolves to a real in-page anchor or a real
route (`/`, `/manifesto`, `/disclaimer`, or a hash landing on an existing
section id). Record any that don't resolve.

- [ ] **Step 6: Replace the pending section with real results**

Edit `docs/audits/2026-07-titanpilot-website-audit.md`, replacing:

```markdown
## Live production audit (pending)

Replaced by Task 2.
```

with a section shaped like this (fill in the bracketed values with the
actual results from Steps 1–5 — do not leave any bracket unresolved):

```markdown
## Live production audit

Captured 2026-07-10 against `https://www.titanpilot.app`.

| Area | Result | Classification | Notes |
| --- | --- | --- | --- |
| Lighthouse — Performance | [score]/100 | [Keep if ≥95, else Revise] | [any top opportunity Lighthouse flagged] |
| Lighthouse — Accessibility | [score]/100 | [Keep if ≥98, else Revise] | [any flagged issue] |
| Lighthouse — Best Practices | [score]/100 | [Keep if ≥95, else Revise] | [any flagged issue] |
| Lighthouse — SEO | [score]/100 | [Keep if 100, else Revise] | [any flagged issue] |
| Console errors | [count] error-level messages | [Keep if 0, else Revise] | [list them or "none"] |
| Network errors | [count] non-2xx/3xx requests | [Keep if 0, else Revise] | [list them or "none"] |
| Mobile overflow — 390×844 | scrollWidth [x] vs clientWidth [y] | [Keep if equal, else Revise] | [screenshot filename/description] |
| Mobile overflow — 440×956 | scrollWidth [x] vs clientWidth [y] | [Keep if equal, else Revise] | [screenshot filename/description] |
| `sitemap.xml` | [routes listed] | Keep | matches `app/sitemap.ts` source |
| `robots.txt` | [content summary] | Keep | matches `app/robots.ts` source |
| OG image (`/banner.png`) | HTTP [status], content-type [type] | [Keep if 200, else Revise] | |
| JSON-LD parse check | [4/4 blocks parsed / N blocks failed] | [Keep if 4/4, else Revise] | |
| Broken/unresolved links | [count found] | [Keep if 0, else Revise] | [list them or "none"] |
```

- [ ] **Step 7: Verify no unresolved brackets remain**

Run: `grep -n '\[.*\]' docs/audits/2026-07-titanpilot-website-audit.md | grep -v '^\s*\[ \]'`

Expected: no output. (This checks the *content* you just wrote doesn't
still contain template brackets — checklist `- [ ]` step markers from other
sections are excluded by the second grep.)

- [ ] **Step 8: Commit**

```bash
git add docs/audits/2026-07-titanpilot-website-audit.md
git commit -m "$(cat <<'EOF'
W0: live production audit (Lighthouse, console, mobile, structured data)

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 3: Public claims register

**Files:**
- Create: `docs/content/PUBLIC_CLAIMS_REGISTER.md`

**Interfaces:**
- Consumes: nothing (independent of Tasks 1–2; may run in parallel with
  either)
- Produces: `docs/content/PUBLIC_CLAIMS_REGISTER.md`, which every future
  slice (W1 onward) must cite before publishing a numeric/measurable claim.

- [ ] **Step 1: Write the claims register**

```markdown
# Public Claims Register

Every measurable public claim on titanpilot.app must have a row here
before it ships. No claim goes live without a source.

| Claim | Source doc | Evidence date | Public-safe wording | Owner | Review/expiry date |
| --- | --- | --- | --- | --- | --- |
| Phase C.5 certification passed | `Titan` repo, `docs/PHASE_C_5_CERTIFICATION.md` | 2026-07-08 | "Phase C.5 certified — ten operational-hardening tasks, each deployed and verified in production the same day." | Emad | 2027-01-08 (recertify at next major phase) |
| Replay determinism verified | `Titan` repo, `docs/PHASE_C_5_CERTIFICATION.md` (DR drill), `docs/releases/v1.1.0-phase-c.md` (Phase C close) | 2026-07-08 | "Replay verification reproduces 1,662 of 1,662 recorded events with zero drift." | Emad | 2027-01-08 |
| Disaster recovery — restore speed | `Titan` repo, `docs/PHASE_C_5_CERTIFICATION.md`, `docs/reports/2026-07-08-dr-drill.md` | 2026-07-08 | "Full restore and 12/12 integrity verification completes in 13 seconds." | Emad | 2027-01-08 |
| Disaster recovery — point-in-time recovery | `Titan` repo, `docs/PHASE_C_5_CERTIFICATION.md`, `docs/reports/2026-07-08-dr-drill.md` | 2026-07-08 | "Point-in-time recovery from base backup plus 908 WAL segments completes in 78 seconds with zero event gap." | Emad | 2027-01-08 |
| AI provider failover proof | `Titan` repo, `docs/PHASE_C_5_CERTIFICATION.md` | 2026-07-08 | "A 12-case transport-level fault matrix (connection refusal, DNS failure, TLS failure, timeouts, HTTP 429/5xx) confirms automatic failover to a backup AI provider, verified against production traffic." | Emad | 2027-01-08 |
| Test suite health | `Titan` repo, `docs/PHASE_C_5_CERTIFICATION.md` | 2026-07-08 | "412 automated tests passing; strict type-checking and linting clean in CI." | Emad | 2027-01-08 |
| Security audit — findings remediated | `Titan` repo, `docs/PHASE_C_5_CERTIFICATION.md`, `docs/reports/2026-07-08-security-audit.md` | 2026-07-08 | "An independent security audit found two high-severity issues; both were fixed and verified the same day (SSH restricted to key-only authentication; backup files restricted to owner-only permissions)." | Emad | 2027-01-08 |
```

- [ ] **Step 2: Verify every row is fully sourced**

Run: `awk -F'|' 'NR>4 && NF>1 {if ($3=="" || $3==" ") print}' docs/content/PUBLIC_CLAIMS_REGISTER.md`
Expected: no output (every data row has a non-empty source-doc column —
column 3 counting the leading empty split before the first `|`).

Run: `grep -n "TBD\|TODO\|FIXME" docs/content/PUBLIC_CLAIMS_REGISTER.md`
Expected: no output.

- [ ] **Step 3: Commit**

```bash
git add docs/content/PUBLIC_CLAIMS_REGISTER.md
git commit -m "$(cat <<'EOF'
W0: seed public claims register from Phase C.5 certification evidence

Every row traces to a specific source document in the Titan engine
repo. No claim ships to the public site without a row here first.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 4: Synthesis — owner-decision summary and IA table

**Files:**
- Modify: `docs/audits/2026-07-titanpilot-website-audit.md` (replace the
  `## Synthesis` section from Task 1)

**Interfaces:**
- Consumes: the completed audit doc from Tasks 1–2 (all classifications
  must already be filled in)
- Produces: the finished audit doc — this is the last task in the plan.

- [ ] **Step 1: Collect every "Needs owner/legal decision" row**

Run: `grep -B3 "Needs owner/legal decision" docs/audits/2026-07-titanpilot-website-audit.md | grep "^|"`

Use the output to build the summary list in Step 2 — every row this
command returns must appear there. As of Task 1, this is expected to
include: the JSON-LD `Offer` schema question, the dependency-upgrade
prioritization call, the `npm audit` transitive-vulnerability call, and the
Vercel Analytics real-user-CWV follow-up. Task 2 may add more (e.g. if
Lighthouse scores miss target and the cause isn't a clear-cut fix).

- [ ] **Step 2: Replace the Synthesis section**

Edit `docs/audits/2026-07-titanpilot-website-audit.md`, replacing:

```markdown
## Synthesis

Replaced by Task 4.
```

with:

```markdown
## Synthesis

### Needs owner/legal decision — full list

These are surfaced here so nothing gets silently decided by an
implementation pass. [Restate each row collected in Step 1 as a short
bullet: what it is, and the two options being weighed. Use the actual
rows found — do not invent items beyond what Step 1's grep returned.]

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
```

- [ ] **Step 3: Final self-review of the whole audit document**

Run: `grep -n "TBD\|TODO\|FIXME\|\[score\]\|\[count\]\|\[status\]" docs/audits/2026-07-titanpilot-website-audit.md`
Expected: no output — confirms Task 2's template brackets were actually
filled in, not left as literal text.

Run: `grep -oE '\| (Keep|Revise|Remove|Add|Needs owner/legal decision)( |,|$)' docs/audits/2026-07-titanpilot-website-audit.md | sort -u`
Expected: every distinct value printed is one of the five allowed
classifications — no typos or stray values.

- [ ] **Step 4: Commit**

```bash
git add docs/audits/2026-07-titanpilot-website-audit.md
git commit -m "$(cat <<'EOF'
W0: synthesize audit — owner-decision summary and W1-W5 IA decision

Closes out W0. Every route named in the parent brief now has an
explicit status; /changelog and /status are excluded with reasoning
rather than shipped as empty pages.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

- [ ] **Step 5: Report the owner-decision items to Emad**

This plan does not resolve "Needs owner/legal decision" rows — that's by
design (spec, Deliverable 1). After Task 4's commit, summarize those rows
back to Emad in chat so W1 doesn't stall waiting on them silently.
