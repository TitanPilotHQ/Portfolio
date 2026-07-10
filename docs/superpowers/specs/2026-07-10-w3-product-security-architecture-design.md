# W3 — /product, /security, /architecture

**Status:** approved for implementation
**Owner:** Emad
**Repo:** TitanPilotHQ/Portfolio (this repo)
**Related program:** TITANPILOT.APP investor-grade positioning revision (W0–W5)
**Depends on:** W0 (audit + claims register), W1 (hero/metadata rewrite)
**Blocked, not part of this slice:** W2 (real Evidence Explorer) — waiting
on Emad to export and sanitize one certified decision record from the
Titan production event log. Nothing in this slice references, previews,
or simulates that fixture.

## Context

W0's IA decision committed `/product`, `/security`, and `/architecture` to
W3. All three go deeper than their homepage counterparts (`WhySection`,
`ArchitectureSection`, `ProductModeLadder`) without replacing them — the
homepage keeps its existing summary sections; the new pages are the deep
dive a technical or risk-committee reader lands on next.

Source material for all three pages was pulled directly from the Titan
engine repo (`TitanPilotHQ/Titan`, checked out at
`/Users/king/Projects/personal/finance-bot`):
`docs/design/PHASE_D_PRODUCT_DESIGN.md`,
`docs/architecture/TITAN_v1_TECHNICAL_ARCHITECTURE.md`, ADR-0019, and the
Phase C.5 certification/report docs already used in W0. Every factual claim
below cites its exact source section. Nothing is invented.

**One constraint caught during research, not from the original brief:**
the commercial strategy doc explicitly states positioning language must
avoid "Bloomberg of…" as TITAN's own self-description *externally* — it's
explicitly marked "kept internal." (`PHASE_D_5_COMMERCIAL_STRATEGY.md`,
the "Bloomberg." objection-handling entry: *"positioning language avoids
'Bloomberg of…' externally (kept internal); the public category name is
Supervised AI Trading."*) This spec does not use that framing as a
tagline. The competitor-comparison table still names Bloomberg Terminal as
a comparison row — that's a different, already-approved usage (comparing
against a named competitor, not self-applying their brand).

## Scope

In scope:
1. Three new routes: `/product`, `/security`, `/architecture`.
2. A shared `PageShell` component, extracted from the duplicated
   Header/background/Footer wrapper currently inline in `/manifesto` and
   `/disclaimer` — both retrofitted to use it, so all five static pages
   share one pattern.
3. New content in `lib/content.ts` for all three pages, following the
   established single-source-of-content convention.
4. 6 new rows in `docs/content/PUBLIC_CLAIMS_REGISTER.md` for genuinely
   new measurable/structural claims surfaced by this slice's research.
5. `NAV_ITEMS` update: `Product`/`Architecture` point at the new routes
   instead of homepage anchors; `Security` added as a new nav item.
6. One "Read the full deep dive →" link added to each of `WhySection`,
   `ArchitectureSection`, and `ProductModeLadder`, pointing at the
   corresponding new page.
7. `app/sitemap.ts` gets the three new routes.
8. Per-page metadata (title/description/canonical), matching the
   `/manifesto`/`/disclaimer` pattern.
9. Responsive, accessible, performant by the same bar as prior slices —
   verified live, not assumed.

Explicitly out of scope:
- W2's real Evidence Explorer, or any preview/simulation of it.
- Custom diagrams, charts, or a new visualization/diagramming library —
  all three pages use existing primitives (`GlassCard`, `SectionHeading`,
  `Reveal`, table-style grids already used by `EvidenceSection`).
- Breadcrumb schema / full JSON-LD expansion — W5.
- Any change to `EarlyAccessForm.tsx` or `DashboardMockup.tsx`.
- Homepage section reordering or removal.

## Shared component: `components/PageShell.tsx`

```tsx
import type { ReactNode } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export function PageShell({
  children,
  glow,
}: {
  children: ReactNode;
  glow?: ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="relative overflow-hidden pt-32 pb-24 lg:pt-40">
        <div className="grid-lines absolute inset-0" aria-hidden />
        {glow}
        {children}
      </main>
      <Footer />
    </>
  );
}
```

`/manifesto` and `/disclaimer` are retrofitted to render `<PageShell>`
(manifesto passes its existing violet glow div via the `glow` prop;
disclaimer passes none) wrapping their existing `max-w-3xl` content div —
no visual change, pure structural dedup. The three new pages use
`PageShell` with a `max-w-7xl` content div (they carry cards/tables, not
just prose).

## Claims register additions

Append to `docs/content/PUBLIC_CLAIMS_REGISTER.md` (same table, 6 new
rows):

| Claim | Source doc | Evidence date | Public-safe wording | Owner | Review/expiry date |
| --- | --- | --- | --- | --- | --- |
| AI cannot bypass execution | `Titan` repo, `docs/architecture/TITAN_v1_TECHNICAL_ARCHITECTURE.md` §3.3, §9.7 | 2026-07-08 | "Three independent mechanisms keep AI out of the execution path: the AI code cannot import execution code (enforced by CI, not configuration); its only output is a recorded, unconsumed event in shadow mode; and it cannot loosen the deterministic no-trade rules it's checked against." | Emad | 2027-01-08 |
| Fail-closed paths proven in production | `Titan` repo, `docs/architecture/TITAN_v1_TECHNICAL_ARCHITECTURE.md` §1.6, §19.8 | 2026-07-08 | "A 48-hour certification soak exercised every fail-closed path — no-database-at-boot, both AI providers down, budget cap reached, invalid model output, unexplained reconciliation — and each produced an explained, auditable outcome in production, not just in design." | Emad | 2027-01-08 |
| Sanitized offsite backups | `Titan` repo, `docs/architecture/TITAN_v1_TECHNICAL_ARCHITECTURE.md` §17.2, ADR-0019 | 2026-07-08 | "Offsite backups are built by allowlist, not blocklist — only the sanitized database dump and a git commit hash ever leave the server. Secrets never leave the VPS." | Emad | 2027-01-08 |
| Database least-privilege containment | `Titan` repo, `docs/architecture/TITAN_v1_TECHNICAL_ARCHITECTURE.md` §18.1, §3.3 | 2026-07-08 | "The application's database role cannot alter schema, cannot delete recorded events, and cannot delete projections — enforced by database grants and triggers, not application code." | Emad | 2027-01-08 |
| Failure isolation / blast radius | `Titan` repo, `docs/architecture/TITAN_v1_TECHNICAL_ARCHITECTURE.md` §18.4 | 2026-07-08 | "A compromised or hallucinating AI model can produce at most one recorded, validated, budget-capped document — never direct access to capital. A compromised offsite backup exposes only a sanitized data dump and a commit hash." | Emad | 2027-01-08 |
| Continuous verification cadence | `Titan` repo, `docs/architecture/TITAN_v1_TECHNICAL_ARCHITECTURE.md` §17.3, §7.3 | 2026-07-08 | "The system verifies itself daily (a 12-check integrity suite, including replay determinism) and weekly (a full restore against a throwaway copy). A backup that cannot pass verification is not counted as a backup." | Emad | 2027-01-08 |

## Page content

### `/product` (`app/product/page.tsx`)

**Metadata:** title `"Product"` (renders "Product — Titan Pilot"),
description: `"How Titan Pilot turns AI market reasoning into evidence: the decision pipeline, the staged autonomy ladder, and what makes this different from a trading bot or a signal service."`,
canonical `/product`.

**New `lib/content.ts` exports:**

```ts
export const PRODUCT_PRINCIPLES = [
  {
    title: "Evidence or it didn't happen.",
    body: "Every claim rendered from an AI model is visibly tagged as model output and linked to the exact dossier data it was reasoned from. Every number that comes from code — a score, a risk calculation, a price — is visibly tagged as deterministic. The two are never allowed to look the same.",
  },
  {
    title: "The default action is nothing.",
    body: "Signals that aren't acted on expire to nothing. Titan Pilot is built to make inaction feel competent, because in a risk-first pipeline, doing nothing is usually the correct outcome — not a failure state.",
  },
  {
    title: "Two states of gravity.",
    body: "Most of what the system shows is light: read-only evidence, fast to browse, safe to click around in. The small remainder — approving a trade, pulling the kill switch — is heavy: full-screen, deliberate, two steps, and fully audited. Nothing consequential ever happens from a hover or a swipe.",
  },
  {
    title: "Reconstructable past.",
    body: "Every decision can answer “as of when?” — pinned to exactly what was known at the time: the stored dossier, the model version, the scoring configuration. History is never silently re-rendered with today's code.",
  },
];

export const PRODUCT_DOCTRINES = [
  {
    title: "Never-Guess",
    body: "When the system encounters something it can't classify, it doesn't guess. An unrecognized event halts processing rather than being skipped. A reconciliation mismatch that matches no known pattern halts trading and pages a human. An AI output that fails a contract check is rejected with a closed reason code — there is no best-effort parse.",
  },
  {
    title: "Fail-Closed",
    body: "Every failure mode collapses toward no action. Can't reach the database at boot: the engine exits before trading starts. Both AI providers down: no signal, never a degraded guess. Budget cap would be exceeded: the call is refused before any money is spent. A 48-hour certification soak exercised every one of these paths in production, and each produced an explained, auditable outcome.",
  },
];

export const AUTONOMY_LADDER_DETAIL = [
  {
    stage: "Shadow",
    status: "Certified — current",
    body: "The full pipeline runs on real market data with real AI calls. Every signal is recorded with its dossier, score, and hash artifacts. Nothing is executed.",
  },
  {
    stage: "Copilot",
    status: "Designed — next",
    body: "A proposed signal reaches the desk lead with its reason codes attached. Approve or reject, with a hard expiry at the next candle close. An approved signal then walks the exact same risk gates as any other signal — there is no separate “trusted” execution path.",
  },
  {
    stage: "Autonomous Demo",
    status: "Evidence-gated — future",
    body: "Requires at least 100 recorded signals, at least 8 weeks of evidence, and objective thresholds on expectancy, calibration, and veto quality. Promotion is always a deliberate, recorded decision — never an automatic transition.",
  },
];

export const COMPETITOR_COMPARISON = [
  {
    name: "TradingView",
    theyAre: "The world's charting + social ideas platform",
    difference: "Titan Pilot's unit is the decision, not the chart. Charts here visualize the exact dossier the AI reasoned from — no social layer, and every signal comes with machine-checked citations, not likes.",
    concede: "Charting depth, asset coverage, community, price",
  },
  {
    name: "TrendSpider",
    theyAre: "Automated technical analysis tooling",
    difference: "TrendSpider automates finding patterns; Titan Pilot automates arguing about them — analyst, adversary, and deterministic score — then records the argument immutably.",
    concede: "Breadth of TA automation, backtesting UX, multi-asset scanning",
  },
  {
    name: "MetaTrader 5",
    theyAre: "The retail execution standard",
    difference: "Titan Pilot treats MT5 as a dumb execution limb. Everything MT5 lacks — provenance, approvals, replay, budget control, audit — is the product.",
    concede: "Raw execution features, broker ubiquity, indicator ecosystem",
  },
  {
    name: "Capitalise.ai",
    theyAre: "Natural-language strategy automation",
    difference: "Capitalise turns English into rules and hides the rest. Titan Pilot turns market state into an evidenced argument and shows all of it: a cited thesis, its rebuttal, and its score.",
    concede: "Onboarding simplicity, no-ops setup, multi-broker reach",
  },
  {
    name: "Tickeron",
    theyAre: "AI signal marketplace with confidence %",
    difference: "Tickeron's confidence score is opaque; Titan Pilot's is a hash-pinned deterministic function of visible components with the counter-argument attached.",
    concede: "Asset breadth, pattern variety, consumer price point",
  },
  {
    name: "Composer",
    theyAre: "No-code quant strategy builder / backtester",
    difference: "Composer sells hypotheticals — backtest curves. Titan Pilot sells reconstructables — hash-verified replay of what actually happened, including every no-trade.",
    concede: "Strategy composition UX, portfolio breadth, backtesting speed",
  },
  {
    name: "LuxAlgo",
    theyAre: "Premium indicator overlays",
    difference: "LuxAlgo decorates charts with proprietary signals. Every claim in Titan Pilot decomposes to dossier facts or code output — there's no proprietary mystique to defend, only evidence to show.",
    concede: "Visual polish on charts, community, low cost",
  },
  {
    name: "Bloomberg Terminal",
    theyAre: "The institutional data monopoly",
    difference: "Titan Pilot doesn't compete on data — it competes on decision accountability. Bloomberg tells you everything about the market and nothing about why your own system traded.",
    concede: "Data universe, news, chat network effects, multi-asset analytics — essentially everything except this one thing",
  },
];

export const COMPETITOR_PITCH =
  "They show you the market or a signal. Titan Pilot shows you a decision you can cross-examine.";
```

**Page structure** (`PageShell` with `max-w-7xl` content):
1. Hero block: eyebrow `"THE PRODUCT"`, `h1` "What Titan Pilot Actually Does.", supporting paragraph: `"Titan Pilot is the system of record for AI trading decisions — built so that when your desk uses AI, every thesis, objection, score, and refusal becomes evidence you can replay and defend."` (category framing, not the internal-only "Bloomberg of…" tagline).
2. `PRODUCT_PRINCIPLES` as a 4-card `GlassCard` grid (same visual pattern as `WhySection`).
3. `PRODUCT_DOCTRINES` as 2 wider cards (Never-Guess / Fail-Closed).
4. `AUTONOMY_LADDER_DETAIL` as a 3-column card row (richer version of `ProductModeLadder`, reusing its stage/status visual language).
5. Competitor comparison: a 4-column table (Name / They Are / Titan Pilot's Difference / What They Do Better) using the same header-row-plus-`sm:grid` pattern `EvidenceSection` establishes, extended to 4 columns instead of 3 — collapses to stacked cards below `sm:`, same as `EvidenceSection`'s own mobile behavior. `COMPETITOR_COMPARISON`'s 8 rows, closing with `COMPETITOR_PITCH` centered beneath.
6. CTA row: "Explore the evidence" → `/#evidence`, "Book an AI Desk Audit" → `/#contact`.

### `/architecture` (`app/architecture/page.tsx`)

**Metadata:** title `"Architecture"`, description:
`"How Titan Pilot is actually built: why AI cannot reach execution, how the event log proves what happened, and the engineering discipline behind the claims."`,
canonical `/architecture`.

**New `lib/content.ts` exports:**

```ts
export const ARCHITECTURE_DEEP_DIVE = [
  {
    title: "AI cannot bypass execution.",
    body: "Three independent mechanisms enforce this, any one of which would be sufficient on its own. The AI code has no import path to execution code — a CI check fails the build if it ever does. The AI layer's only output is a recorded event; in shadow mode, nothing consumes it. And the deterministic no-trade rules the system checks against can only be tightened by AI output, never loosened.",
  },
  {
    title: "One database, three data classes.",
    body: "Decisions are event-sourced: an append-only log is the system of record, with the reasoning being that the history is the product — audits, disputes, and forensics all require knowing exactly what the system believed and did, in order, forever. Market data (candles, calendar rows) is not event-sourced — it's high-volume and re-fetchable, with no accountability requirement of its own. What is recorded is every use of that data: each decision pins the exact input data it was built from, by hash.",
  },
  {
    title: "Replay is a proof, not a re-implementation.",
    body: "Replay doesn't re-implement the system's logic to check its own answer — it pushes the same events through the exact same production code into a scratch copy of the database, then compares every row. Rebuilding twice and hashing both results must match, or the run fails. This check runs daily, on every code change, and against every restored backup.",
  },
  {
    title: "Dependencies point one way.",
    body: "The AI and market-data code can never import execution code — mechanically enforced, not just a convention. Only one code path is allowed to write the system's official state, and the database itself backs this up: the application's role cannot delete a recorded event or bypass that single writer.",
  },
];
```

**Page structure:**
1. Hero: eyebrow `"ARCHITECTURE"`, `h1` "Built Like Infrastructure, Not a Trading Bot.", supporting paragraph on architecture as a credibility signal, not decoration.
2. `ARCHITECTURE_DEEP_DIVE` as 4 wide `GlassCard`s (one per numbered point, richer than the homepage's 6 short `ARCHITECTURE_LAYERS` cards — this page assumes the reader already saw the homepage summary).
3. Reuse existing `TECH_STACK` marquee-style list (import from `lib/content.ts`, render as a simple wrapped tag list here — no new marquee component, just static tags) with a one-line caption.
4. CTA / cross-link: "See the security and verification posture" → `/security`.

### `/security` (`app/security/page.tsx`)

**Metadata:** title `"Security & Operational Posture"`, description:
`"Titan Pilot's verified security and disaster-recovery posture: independent audit results, backup and replay verification, and how the system contains its own failures."`,
canonical `/security`.

**New `lib/content.ts` exports:**

```ts
export const SECURITY_CAPABILITIES = [
  {
    title: "Independently audited, fixed same-day",
    body: "A security audit found issues in SSH access and backup file permissions. Both were fixed and verified the same day — SSH restricted to key-only authentication, backup files restricted to owner-only access.",
  },
  {
    title: "Secrets never leave the server",
    body: "Offsite backups are built by allowlist, not blocklist — only a sanitized database dump and a git commit hash are ever copied off the server. A blocklist approach fails open the moment a new secret is introduced; an allowlist can't.",
  },
  {
    title: "Backups are proven, not assumed",
    body: "A full restore with complete integrity verification completes in 13 seconds. Point-in-time recovery from a base backup completes in 78 seconds with zero event gap. Every week, the newest backup is restored into a throwaway copy and fully re-verified — a backup that can't pass verification isn't counted as one.",
  },
  {
    title: "AI provider failure never increases risk",
    body: "A 12-case fault-injection matrix — connection failures, DNS failures, timeouts, server errors — confirms automatic failover to a backup AI provider. If both providers are down, the system produces no signal. It never guesses.",
  },
  {
    title: "The application can't touch its own history",
    body: "The database role the application runs as cannot alter schema, and cannot delete a recorded event or a derived record — enforced by database grants and triggers, not application code that could have a bug.",
  },
  {
    title: "Failure is contained by design",
    body: "A compromised or hallucinating AI model can produce at most one recorded, validated, budget-capped document — never direct access to capital. A compromised AI provider account is capped in dollars. A stolen offsite backup exposes only a sanitized data dump and a commit hash.",
  },
  {
    title: "Verified daily, not just at launch",
    body: "A 12-check integrity suite — including replay determinism — runs automatically every day. It also runs on every code change and against every restored backup. This isn't a one-time launch audit; it's a standing, automated check.",
  },
];
```

**Page structure:**
1. Hero: eyebrow `"SECURITY"`, `h1` "Verified Daily, Not Just at Launch.", supporting paragraph framing this as operational proof, not a compliance checkbox.
2. `SECURITY_CAPABILITIES` as a 7-item list — reuse `EvidenceSection`'s label/description row pattern (no artificial "state" badge column here, since these are narrative capability statements, not a capability/state/proof table like the homepage's evidence table).
3. Closing disclaimer line (reuse existing `DISCLAIMER` constant, already imported elsewhere) so this page doesn't read as a compliance certification it hasn't earned.
4. CTA: "Talk to us about your desk's security requirements" → `/#contact`.

## Navigation and cross-links

**`lib/content.ts` `NAV_ITEMS`:**

```ts
export const NAV_ITEMS = [
  { label: "Product", href: "/product" },
  { label: "Architecture", href: "/architecture" },
  { label: "Security", href: "/security" },
  { label: "AI Model", href: "/#ai-model" },
  { label: "Safety", href: "/#safety" },
  { label: "Roadmap", href: "/#roadmap" },
  { label: "Manifesto", href: "/manifesto" },
];
```

**Cross-links** (one line each, added to existing homepage sections —
no structural change to those components beyond this one addition):
- `WhySection.tsx`: after the card grid, a centered link "Read the full product deep dive →" → `/product`.
- `ArchitectureSection.tsx`: after the layer cards, "See the full architecture →" → `/architecture`.
- `ProductModeLadder.tsx`: near its existing closing caption, "Read more about the autonomy ladder →" → `/product`.

## `app/sitemap.ts`

Add three entries (same `changeFrequency`/`priority` tier as `/manifesto`):

```ts
{ url: `${SITE_URL}/product`, changeFrequency: "monthly", priority: 0.8 },
{ url: `${SITE_URL}/security`, changeFrequency: "monthly", priority: 0.8 },
{ url: `${SITE_URL}/architecture`, changeFrequency: "monthly", priority: 0.8 },
```

## Testing / validation

- `npm run build` succeeds, 11/11 static pages generate (8 existing + 3
  new), no TypeScript errors.
- Every new claim traces to a `PUBLIC_CLAIMS_REGISTER.md` row or an
  already-registered W0 row — grep-verifiable: no new number or
  pass/fail claim appears in `lib/content.ts` or the three new page files
  without a matching register entry.
- No banned marketing language (guaranteed, profitable, market-beating,
  unqualified institutional-grade, AI-powered profits, high-conviction)
  anywhere in the new content.
- No literal infrastructure detail leaks: grep the new content for
  patterns that would indicate a real IP address, hostname, or credential
  reference slipped through paraphrasing (sanity check, expected to be
  clean given the sourcing discipline above).
- Live checks on all three new routes: Lighthouse (performance/
  accessibility/best-practices/SEO), mobile viewport overflow at 390×844
  and 440×956, no console/network errors — same bar as prior slices.
- Internal link check: every new nav href, cross-link, and CTA resolves
  (three new routes exist; `/#evidence` and `/#contact` anchors already
  verified to exist in W0).

## Out of scope / explicit non-goals

- W2's real Evidence Explorer fixture, or any preview/simulation of it.
- Any new diagramming/charting library or custom visual asset.
- Full breadcrumb/JSON-LD schema expansion (W5).
- `EarlyAccessForm.tsx`, `DashboardMockup.tsx` — untouched.
- Homepage section reordering, removal, or restructuring beyond the three
  single-line cross-links described above.
