# W4a — /research, /company, Homepage Teaser, Nav/Footer/Sitemap

**Status:** approved for implementation
**Owner:** Emad
**Repo:** TitanPilotHQ/Portfolio (this repo)
**Related program:** TITANPILOT.APP investor-grade positioning revision (W0–W5)
**Depends on:** W0 (`docs/audits/2026-07-titanpilot-website-audit.md`,
`docs/content/PUBLIC_CLAIMS_REGISTER.md`), W1, W3 (`PageShell` pattern)

## Context

W4 covers the program's final three IA routes (`/research`, `/company`,
`/contact`) plus a real backend for the conversion form. That combined scope
splits into two subsystems: static content pages vs. a backend system with
new external service dependencies (Resend, Upstash) and a real security
surface (rate limiting, spam handling, IP hashing). This spec — **W4a** —
covers only the content pages and the shared navigation/homepage changes
that don't depend on the backend existing yet. **W4b** (a separate spec)
covers `/contact`'s qualified form and backend.

**Sequencing decision:** the homepage's CTAs and the new teaser section
must point at `/contact`, but W4b (the fully qualified form) hasn't shipped
yet. To avoid a dead link or a regression in lead capture during the gap,
W4a creates `/contact` now as a real, working route: it gets the shared
`PageShell` treatment, its permanent intro copy and qualification notice
(written once here, kept by W4b), and — temporarily — the *existing*
`EarlyAccessForm` component (today's 4-field `mailto:` form), moved as-is
from the homepage to this new route. W4b then replaces only the form
portion with the full qualified form and backend; the surrounding page
copy this spec writes is not thrown away.

Three founder-provided content blocks (background, mission, team, current
stage) and the `/research` philosophy structure were supplied directly by
Emad in conversation on 2026-07-11 and are used verbatim/near-verbatim
below — this is real, owner-sourced content, not fabricated.

## Scope

In scope:
1. `app/company/page.tsx` — new route.
2. `app/research/page.tsx` — new route.
3. `app/contact/page.tsx` — new route (intro copy + qualification notice +
   temporary `EarlyAccessForm`, per the sequencing decision above).
4. `lib/content.ts` — new exported content for all three pages.
5. `components/ContactTeaser.tsx` — new homepage section replacing
   `EarlyAccessForm`'s homepage usage.
6. `app/page.tsx` — swap `<EarlyAccessForm />` for `<ContactTeaser />`.
7. `components/Hero.tsx` — secondary CTA `href="#contact"` →
   `href="/contact"`.
8. `components/Footer.tsx` — add `Research`/`Company`/`Contact` links.
9. `app/sitemap.ts` — add `/research`, `/company`, `/contact` entries.
10. `docs/content/PUBLIC_CLAIMS_REGISTER.md` — new rows for owner-sourced
    facts used on `/company`.
11. Accessibility/responsive pass on all three new pages (same bar as W3:
    WCAG AA contrast, keyboard nav, no mobile overflow at 390×844 /
    440×956).

Explicitly out of scope for W4a:
- The qualified form's fields, validation, Resend/Upstash backend, rate
  limiting, spam handling, analytics events, and the post-submit
  confirmation card — all W4b.
- Any change to `EarlyAccessForm.tsx`'s internals (it is moved, not
  rewritten, in this slice).
- W5 (accessibility/performance/SEO/AEO/GEO/security audit pass) —
  this slice self-checks contrast/keyboard/overflow the same way W1/W3
  did, but the systematic W5 audit is still its own future slice.

## `/company` page

Route: `app/company/page.tsx`, wrapped in `PageShell` with an `electric`
glow (`bg-electric/10`, matching the `blur-[140px]` pattern used by
`/product`'s azure glow) — `electric` (`--color-electric: #a855f7`) is
unused by any existing page, keeping every route visually distinct.

New `lib/content.ts` exports (place after `MANIFESTO_PRINCIPLES`, before
`DISCLAIMER`, matching the file's existing grouping-by-page convention):

```ts
export const COMPANY_MISSION = {
  eyebrow: "Company",
  title: "AI is already influencing trading decisions.",
  copy: "The question is no longer whether traders will use it, but whether firms can prove what it said, what evidence it used, how it was challenged, and who approved the final action. Titan Pilot exists to make that process supervised, replayable and accountable.",
};

export const COMPANY_PROBLEM =
  "Traders are increasingly using general-purpose AI tools to influence market decisions, but those decisions usually have no reliable evidence trail, no deterministic risk controls, no replay, and no accountability when the AI is wrong. Titan Pilot was not built to promise better returns or to create another black-box trading bot — it was built to close that gap.";

export const COMPANY_FOUNDER = {
  name: "Emad Khan",
  bio: "Emad Khan is a senior software and cloud architect with more than 12 years of experience building production-grade distributed systems. He founded Titan Pilot after seeing a growing gap between how quickly traders were adopting AI and how little governance existed around those decisions. Titan Pilot applies the same principles used in critical software systems — traceability, deterministic controls, failure isolation and replay — to AI-assisted trading.",
};

export const COMPANY_TEAM =
  "Titan Pilot is currently founder-led and intentionally small. Emad is the sole founder and primary product and engineering owner. The platform has been developed with extensive AI-assisted engineering, but architecture, product direction, operational decisions, security posture, testing standards, and final approvals remain human-owned.";

export const COMPANY_PRINCIPLES = [
  { title: "Evidence over Claims", body: "Every public statement traces to a sourced, dated engineering record — not marketing language." },
  { title: "Human Accountability", body: "AI reasons; a human or a deterministic rule approves. Every consequential action has an accountable owner." },
  { title: "Fail Closed", body: "When something is uncertain, broken, or unverifiable, the system stops rather than guesses." },
  { title: "Deterministic Risk", body: "Risk limits are enforced by rules the AI cannot loosen — not by asking the AI to behave." },
  { title: "Replay Everything", body: "Every recorded decision can be replayed and re-verified, not just logged and forgotten." },
  { title: "Security by Default", body: "Least-privilege access, sanitized backups, and blast-radius containment are structural, not optional configuration." },
];

export const COMPANY_NEVER_CLAIMS = [
  "Guaranteed or predicted trading returns",
  "Licensed financial or investment advice",
  "A large team, institutional backing, or customers we don't have",
  "Regulatory approval, certification, or endorsement we haven't received",
  "Peer-reviewed research or academic partnerships that don't exist",
  "Endorsement by any employer — Titan Pilot is independent of Emad's employment",
];

export const COMPANY_TIMELINE = [
  { stage: "Idea", body: "Titan Pilot began as a response to a specific gap: AI was already influencing trading decisions with no evidence trail behind them." },
  { stage: "Engineering", body: "Core infrastructure was built first — the event spine, replay verification, and deterministic risk controls — before any AI reasoning was added." },
  { stage: "Shadow Certification", body: "The AI shadow pipeline completed Phase C.5 certification: ten operational-hardening tasks, each deployed and verified in production the same day." },
  { stage: "Design Partner Phase (current)", body: "Titan Pilot is engaging qualified design partners to validate the product against real desk workflows before any broader release." },
  { stage: "Future Copilot Phase", body: "Longer-term roadmap work toward higher autonomy stages, gated the same way every prior stage was — by evidence, not by schedule." },
];

// Current-stage wording sourced to docs/content/PUBLIC_CLAIMS_REGISTER.md
// ("Phase C.5 certification passed", "Test suite health") — no unsourced
// product-release claim.
export const COMPANY_STAGE =
  "Titan Pilot is currently in a certified production shadow phase. The platform has completed its engineering certification, including replay verification, deterministic scoring, AI safety validation, and operational hardening. The system currently operates in supervised shadow mode while we engage with qualified design partners and continue validating the product with real operational evidence.";
```

Page layout (top to bottom): `SectionHeading` using `COMPANY_MISSION` →
`COMPANY_PROBLEM` as a single lead paragraph → Founder `GlassCard` (name +
`COMPANY_FOUNDER.bio`) → `COMPANY_TEAM` paragraph directly beneath (same
card or immediately following, no separate heading needed for one
paragraph) → "Our Principles" section, a 2×3 (mobile: 1-column) grid of
`GlassCard`s from `COMPANY_PRINCIPLES`, each rendering `title` bold +
`body` as `text-white/60` supporting text → "How We're Built" section
using `COMPANY_TEAM` content already covered above, so this heading is
folded into the Team paragraph, not a separate section (avoids
duplicating the same fact under two headings) → "What Titan Pilot Will
Never Claim" section, `COMPANY_NEVER_CLAIMS` rendered as an `X`-icon list
(same visual pattern as `EARLY_ACCESS_NOT_GETS` in the current
`EarlyAccessForm`: `text-amber` icon, `text-secondary` text) → "Our
Journey" timeline section from `COMPANY_TIMELINE`, rendered as a vertical
stepped list (stage name bold, body beneath, a small dot/line connector
consistent with `RoadmapTimeline.tsx`'s existing visual language — reuse
its connector styling rather than inventing a new timeline component) →
"Current Stage" section, `COMPANY_STAGE` as a single paragraph in a
`glass-strong` card, closing the page.

Metadata: `title: "Company — Titan Pilot"`, `description`: a compressed
version of `COMPANY_MISSION.copy` under 160 characters, e.g. "Titan Pilot
is founder-led infrastructure for supervised, replayable AI trading
decisions — built on evidence, not marketing claims."

## `/research` page

Route: `app/research/page.tsx`, `PageShell` with a `cyan` glow
(`bg-cyan/10`) — `cyan` is used elsewhere as an accent (buttons, trust
badges) but not yet as a page-level glow.

New `lib/content.ts` exports (same placement convention as above):

```ts
export const RESEARCH_INTRO = {
  eyebrow: "Research",
  title: "Built on evidence, not claims.",
  copy: "Titan Pilot is built on measurable engineering evidence rather than marketing claims. Our research program exists to make that evidence public, reproducible, and correctable — on our timeline, not a launch deadline.",
};

export const RESEARCH_PRINCIPLES = [
  "Evidence before claims",
  "Reproducibility",
  "Replayability",
  "Public correction of mistakes",
  "Transparent methodology",
  "Versioned publications",
];

export type ResearchStatus = "Planned" | "In Preparation" | "Under Internal Review" | "Published";

// All tracks currently launch as "Planned" — no per-track progress claim
// is made until real work on that specific track exists. Update the
// `status` field here as work actually begins; the four-state system is
// designed for that future use, not populated speculatively now.
export const RESEARCH_PIPELINE: { title: string; status: ResearchStatus }[] = [
  { title: "Whitepapers", status: "Planned" },
  { title: "Engineering Reports", status: "Planned" },
  { title: "Benchmark Studies", status: "Planned" },
  { title: "Provider Evaluations", status: "Planned" },
  { title: "AI Governance", status: "Planned" },
  { title: "Replay Architecture", status: "Planned" },
  { title: "Risk Engineering", status: "Planned" },
  { title: "Hallucination Containment", status: "Planned" },
  { title: "Decision Evidence", status: "Planned" },
  { title: "Trading AI Methodology", status: "Planned" },
];

export const RESEARCH_STANDARDS = [
  "Methodology",
  "Datasets, where legally possible",
  "Assumptions",
  "Limitations",
  "Version history",
  "Errata",
  "Reproducibility notes",
];

export const RESEARCH_CLAIMS_NOTE =
  "Every public technical claim on titanpilot.app will eventually map to supporting engineering evidence or published research.";

export const RESEARCH_STATUS = {
  delayed: "Our publications are intentionally delayed until they satisfy our internal evidence standards.",
  current: "Research is currently being prepared. Titan Pilot will publish technical papers and engineering reports only after they meet our internal evidence standards. We prefer publishing later with evidence rather than earlier with speculation.",
};
```

Page layout: `SectionHeading` from `RESEARCH_INTRO` → "Research
Principles" as a 2-column (mobile: 1-column) checklist grid from
`RESEARCH_PRINCIPLES` (reuse the `Check`-icon list pattern from
`EarlyAccessForm`'s "You may receive" card) → "Research Pipeline" section:
a table/grid of `RESEARCH_PIPELINE` rows, each showing the track title and
a status pill. Status pill styling reuses `EvidenceSection.tsx`'s
`STATE_STYLES` pattern (a mapping from status string to badge classes) —
add a sibling `RESEARCH_STATUS_STYLES` map in the research page file (not
`EvidenceSection.tsx`, which is homepage-specific) with all four states
defined even though only `"Planned"` renders today, so adding
`"Published"` later needs no style work: `Planned` → neutral/gray,
`"In Preparation"` → `azure`, `"Under Internal Review"` → `amber`,
`"Published"` → `success`. Directly beneath the pipeline grid, render
`RESEARCH_STATUS.delayed` as a small `text-white/60` caption so the
"why nothing is published yet" explanation sits right next to the table
that would otherwise look empty. → "Publication Standards" section,
`RESEARCH_STANDARDS` as a simple bullet list → "Claims Register" section,
one paragraph using `RESEARCH_CLAIMS_NOTE` → "Current Status" closing
section, `RESEARCH_STATUS.current` in a `glass-strong` card (same closing
treatment as `/company`'s Current Stage card, for visual consistency
between the two new pages).

Metadata: `title: "Research — Titan Pilot"`, `description`: "How Titan
Pilot approaches research: evidence before claims, reproducible
methodology, and publications delayed until they meet our internal
standards."

## `/contact` page (W4a portion only)

Route: `app/contact/page.tsx`, `PageShell` with an `amber` glow
(`bg-amber/10`).

New `lib/content.ts` exports:

```ts
export const CONTACT_INTRO = {
  eyebrow: "Contact",
  title: "Book an AI Desk Audit.",
  copy: "Tell us about your desk, and we'll assess whether Titan Pilot is an appropriate fit.",
};

export const CONTACT_QUALIFICATION_NOTICE =
  "We work with professional trading desks, technology partners, and qualified design partners. If you're looking for trading signals or investment advice, Titan Pilot is probably not the right fit.";

export const CONTACT_WHAT_HAPPENS_NEXT = [
  "Your submission is reviewed.",
  "We assess whether Titan Pilot is an appropriate fit.",
  "Qualified enquiries normally receive a response within two business days.",
];
```

Page layout: `SectionHeading` from `CONTACT_INTRO` → qualification notice
rendered as a distinct callout (bordered `glass` card, `text-white/60`,
positioned directly above the form so it's read before anyone starts
filling fields — matches Emad's "saves everyone time" framing) → "What
happens next" as a small numbered/bulleted list from
`CONTACT_WHAT_HAPPENS_NEXT` → the form itself. For W4a, the form is the
existing `EarlyAccessForm` component moved here unchanged (still 4 fields,
still `mailto:`) — W4b replaces this section only. Beneath the form: an
"alternative contact" line — "For enterprise enquiries, email
`CONTACT_EMAIL` directly" (mailto link) — and a privacy statement,
reusing `EARLY_ACCESS_DISCLAIMER`'s existing wording (already accurate,
no change needed).

`EarlyAccessForm.tsx` itself is not modified in this slice beyond removing
its `id="contact"` scroll anchor (no longer needed — it's a dedicated
route now, not a homepage anchor target) — this is a one-line change, not
a rewrite.

Metadata: `title: "Contact — Titan Pilot"`, `description`: "Book an AI
Desk Audit with Titan Pilot — for professional trading desks evaluating
supervised AI decision governance."

## Homepage changes

`components/ContactTeaser.tsx` (new) replaces `EarlyAccessForm`'s
homepage placement in `app/page.tsx`. Content (new `lib/content.ts`
export, placed near `CONTACT_INTRO`):

```ts
export const HOMEPAGE_CONTACT_TEASER = {
  title: "Ready to evaluate AI decision governance?",
  copy: "Book an AI Desk Audit to discuss how your trading desk currently uses AI, where governance gaps exist, and whether Titan Pilot is an appropriate fit.",
};
```

Layout: a short `section` (reuse the existing glow + `SectionHeading`
pattern from `EarlyAccessForm`, dropped down to a single centered column,
no form) with `HOMEPAGE_CONTACT_TEASER.title` as the heading,
`HOMEPAGE_CONTACT_TEASER.copy` beneath, and two buttons — primary "Book an
AI Desk Audit" and secondary "Contact Us" — both `href="/contact"`, no
anchor scroll. Button styling reuses the existing gradient
primary/outline secondary classes already defined in `Hero.tsx` (same
visual language, not a new button style).

`components/Hero.tsx`: secondary CTA `href="#contact"` → `href="/contact"`
(text "Book an AI Desk Audit" is unchanged, already correct). Primary CTA
(`href="#evidence"`) is untouched — evidence section still lives on the
homepage.

## Nav / Footer / Sitemap

`components/Footer.tsx`: the file has exactly two columns, "Platform" and
"Connect" — add three new `<li>` entries to the existing "Platform"
column, immediately after the current "Security" entry and before
"Roadmap": `Research` → `/research`, `Company` → `/company`, `Contact` →
`/contact`. Use `Link` from `next/link` (the pattern already used for
`Manifesto`/`Disclaimer` in this same column, for internal routes),
matching their exact `className="transition-colors hover:text-white"`.

`app/sitemap.ts`: add three entries following the exact existing pattern:

```ts
{ url: `${SITE_URL}/research`, changeFrequency: "monthly", priority: 0.8 },
{ url: `${SITE_URL}/company`, changeFrequency: "monthly", priority: 0.8 },
{ url: `${SITE_URL}/contact`, changeFrequency: "monthly", priority: 0.8 },
```

positioned after the `/security` entry and before `/manifesto`, matching
the file's existing ordering (routes added in slice order).

No change to `NAV_ITEMS` (top header nav) — the brief never asked for
these three in the primary nav, and the homepage teaser + footer already
provide clear paths to all three routes.

## Claims register additions

Two new rows in `docs/content/PUBLIC_CLAIMS_REGISTER.md`, sourced to Emad
directly (owner-attested facts about his own company have no separate
technical doc to cite — the owner's direct statement is the source, same
standing as any other first-party fact):

| Claim | Source doc | Evidence date | Public-safe wording | Owner | Review/expiry date |
| --- | --- | --- | --- | --- | --- |
| Founder-led, sole product/engineering owner | Emad — direct statement to site content, 2026-07-11 | 2026-07-11 | "Titan Pilot is currently founder-led and intentionally small. Emad is the sole founder and primary product and engineering owner." | Emad | 2027-01-11 |
| Founder background | Emad — direct statement to site content, 2026-07-11 | 2026-07-11 | "Emad Khan is a senior software and cloud architect with more than 12 years of experience building production-grade distributed systems." | Emad | 2027-01-11 |

`COMPANY_STAGE`, `COMPANY_TIMELINE`'s "Shadow Certification" stage, and
`COMPANY_NEVER_CLAIMS` all reuse wording already sourced in the register
(Phase C.5 certification, existing "no guarantees" language patterns from
`EARLY_ACCESS_NOT_GETS`/`EARLY_ACCESS_DISCLAIMER`) — no additional rows
needed for those.

## Testing / validation

No test suite exists for this repo (same tracked W0 finding as prior
slices). Validation is:
- `npm run build` succeeds, all pages generate, no new console/type
  errors.
- Every new string above is grep-verified present in `lib/content.ts` and
  not duplicated from an existing export.
- Footer/new-page text contrast meets the `/60` floor established in W1 —
  no new text below that opacity.
- Live/local visual check at desktop and the 390×844 / 440×956 mobile
  viewports for all three new routes plus the changed homepage section —
  no overflow or wrapping regressions.
- Keyboard navigation check: tab order through the new homepage teaser
  buttons, footer links, and each new page's content is logical
  top-to-bottom with visible focus states (reuses existing focus-ring
  classes already defined elsewhere in the codebase — no new focus
  styling invented).
- No banned marketing language introduced (same self-check as prior
  slices): no "guaranteed", "profitable", "market-beating", unqualified
  "institutional-grade", "high-conviction", and — per the program brief —
  no self-applied "Bloomberg of…" tagline.
- `EarlyAccessForm`'s `mailto:` submission still works identically at its
  new `/contact` location (manual click-through check).

## Out of scope / explicit non-goals

- No form field, validation, backend, rate limiting, or analytics work —
  all W4b.
- `EarlyAccessForm.tsx`'s internals are not rewritten, only relocated (one
  file moves usage site, one `id` attribute removed).
- No new top-level header nav items.
- No dependency installs — this slice uses only existing components,
  patterns, and libraries already in the repo.
- W5 (systematic accessibility/performance/SEO/AEO/GEO/security audit)
  remains its own future slice.
