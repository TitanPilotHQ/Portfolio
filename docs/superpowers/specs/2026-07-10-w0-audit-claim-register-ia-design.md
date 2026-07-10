# W0 — Production Audit, Claim Register, Information Architecture Decision

**Status:** approved for implementation
**Owner:** Emad
**Repo:** TitanPilotHQ/Portfolio (this repo)
**Related program:** TITANPILOT.APP investor-grade positioning revision (W0–W5)

## Context

Titan's commercial strategy moved from a broad "AI trading infrastructure"
pitch to a narrow category claim: **Supervised AI Trading — the system of
record for AI trading decisions**, aimed at the Head of Trading on a 5–20
seat prop FX/CFD desk who must answer to a risk committee. The current
production site (`https://www.titanpilot.app`) predates this shift. Source
material for the new positioning lives in the sibling engine repo
(`TitanPilotHQ/Titan`, checked out locally at
`/Users/king/Projects/personal/finance-bot`):

- `docs/strategy/PHASE_D_5_COMMERCIAL_STRATEGY.md` — category, ICP, claims policy
- `docs/design/PHASE_D_PRODUCT_DESIGN.md`, `docs/PHASE_D_DESIGN.md` — product/UX architecture
- `docs/architecture/TITAN_v1_TECHNICAL_ARCHITECTURE.md` — technical architecture (handbook)
- `docs/PHASE_C_5_CERTIFICATION.md`, `docs/releases/v1.1.0-phase-c.md` — certification evidence
- `docs/adr/0001`…`0019` — architectural decision records

This repo (Portfolio) owns presentation only. No large documents are copied
in; only concise, public-safe summaries with source references, per the
content governance rule in the parent program brief.

W0 is the first of six slices (W0–W5). It ships **no visible change** to
the live site. It produces two documents and one recorded decision that
every later slice (W1–W5) will be built against.

## Scope

In scope:
1. Full audit of the current production site and repo against the new
   positioning, classified per finding.
2. A claim register seeded with real, sourced claims from the certified
   engine evidence above.
3. A recorded information-architecture decision: the final route list,
   sequencing across W1–W5, and explicit handling of the three ambiguous
   routes (`/spec`, `/changelog`, `/status`).

Out of scope (deferred to later slices):
- Any copy, layout, or visual change to the live site.
- Building any new route.
- Selecting or sanitizing the real decision fixture for `/evidence` (W2).
- Form/backend work (W4).
- Deep security/CSP/dependency remediation — audited and classified here,
  fixed in W5.

## Method

- **Static read-through**: every component in `components/`, every route in
  `app/`, and `lib/content.ts` against the D.5 strategy's "we sell / we do
  not sell" list and claims policy.
- **Live production pass** on `https://www.titanpilot.app` using browser
  tooling: Lighthouse (performance / accessibility / best practices / SEO),
  console + network error check, structured-data validation (JSON-LD
  parses, matches schema.org types declared), `sitemap.xml` / `robots.txt`
  fetch, OG image fetch, mobile viewport check (390×844 and 440×956,
  reusing the same overflow-check method from the earlier mobile-hero fix).
- **Repo/dependency check**: `npm outdated`, presence/absence of security
  headers and CSP in `next.config`, secret-scanning sanity check (no
  `.env`-shaped values committed), current ESLint/typecheck/test scripts.
- **Cross-reference**: every factual/numeric claim currently on the site
  (e.g. "Shadow Mode Active", "MT5 Bridge Built", "Replay Verified") checked
  against real engine state in the certification docs — supported claims get
  sourced and kept; unsupported or stale ones get flagged Remove or Revise.

## Deliverable 1 — `docs/audits/2026-07-titanpilot-website-audit.md`

One table per audit area from the parent brief (sections/CTAs, analytics,
Core Web Vitals, mobile layout, copy hierarchy, accessibility, metadata,
structured data, sitemap/robots/canonical, OG assets, form behavior + spam
protection, conversion path, legal copy, broken/duplicate content, stale or
fake-looking claims, security headers/CSP, dependency status, Vercel
config). Each row:

| Area | Current state | Finding | Classification | Notes / source |

Classification is exactly one of: **Keep, Revise, Remove, Add, Needs
owner/legal decision**. "Needs owner/legal decision" rows are surfaced in a
summary list at the top of the doc so nothing gets silently decided by me —
e.g. whether "institutional-grade" language anywhere needs a qualifier is a
legal-adjacent call for Emad, not an engineering one.

Known findings already identified going in (to be verified live, not
assumed):
- Hero eyebrow "AI Reasons. Software Decides." and headline are
  engineering-led, not category-led → Revise (W1).
- `NAV_ITEMS` / CTAs use "Join Early Access" → Revise to qualified paths
  (W4).
- `DashboardMockup.tsx` renders a fictional live-looking cockpit (candles,
  AI score ring, "HIGH CONVICTION THESIS") — labeled simulation in the
  footer caption already, but the brief's visual direction explicitly
  wants the decision evidence chain as centerpiece instead of a cockpit →
  Revise/Remove, replaced in W2 by the real Evidence Explorer.
- Copy referencing Shadow Mode as still validating is stale — Phase C.5
  is certified PASS as of 2026-07-08 → Remove/Revise (W1).
- `EarlyAccessForm.tsx` is a `mailto:` handoff with no field qualification
  or spam control → Revise (W4), per the new form-fields spec in the
  parent brief.
- `EVIDENCE_ROWS` in `lib/content.ts` (capability/state/proof table) is
  the closest existing thing to the new evidence-first direction — likely
  Keep-and-extend rather than Remove.

## Deliverable 2 — `docs/content/PUBLIC_CLAIMS_REGISTER.md`

A markdown table, one row per measurable public claim:

| Claim | Source doc | Evidence date | Public-safe wording | Owner | Review/expiry date |

Seeded at minimum with (all sourced from the certification docs read for
this design):
- Phase C.5 certification: **PASS**, 2026-07-08, ten hardening tasks, all
  deployed and verified same-day.
- Replay determinism: 1,635 events verified deterministic at Phase C
  close; 1,662/1,662 events, gap 0, reproduced at Phase C.5 DR drill.
- Disaster recovery: restore + 12/12 verify in 13s; PITR base+908 WAL in
  78s.
- Provider failover: 12-case transport-level fault matrix, all green,
  including a live production probe.
- Test suite: 412 passed, mypy strict clean, ruff clean, CI green.
- Security audit: 2 High findings found and fixed same-day (SSH key-only,
  backup permissions).

No claim goes on the public site without a row here first. This register
ships to the repo in W0 but is genuinely used starting W1.

## Deliverable 3 — IA decision (recorded in the audit doc's closing section)

Final route commitment for W1–W5:

| Route | Slice | Status decided now |
| --- | --- | --- |
| `/` | W1 | rewrite |
| `/product` | W3 | new |
| `/evidence` | W2 | new — real fixture selection is its own decision, not made here |
| `/security` | W3 | new |
| `/architecture` | W3 | new |
| `/spec` | W3 | new — ships as an honest "public draft in preparation" state; no Decision Evidence Specification doc exists yet in the engine repo, confirmed by direct search |
| `/research` | W4 | new — index only; no publishable soak/incident reports exist yet, so it ships empty-but-honest with a "nothing published yet" state, not fake entries |
| `/company` | W4 | new |
| `/contact` | W4 | rewrite (qualified form) |
| `/changelog` | — | **excluded from W0–W5.** Internal `CHANGELOG.md` exists in the engine repo but is not public-safe as-is (references internal ops detail); revisit only if someone does the curation work. Not built as an empty page. |
| `/status` | — | **excluded from W0–W5.** Internal `ops/status.py` exists but is an operational tool, not a public status page; no public uptime commitment exists to publish. Not built as an empty page. |

This closes the "optional only if content exists" question from the parent
brief for both routes: content exists internally but is not public-safe,
so per the brief's own instruction ("do not build empty enterprise
theater") they are excluded, not stubbed.

## Testing / validation for W0 itself

Since W0 ships no code to the live site, "testing" is validating the two
documents:
- Every claim register row traceable to a specific source doc + section I
  actually read (no paraphrased-from-memory numbers).
- Every audit finding classification has a one-line reason tied to either
  the D.5 strategy doc or a directly-observed technical fact (Lighthouse
  score, console error, etc.), not vibes.
- IA table covers all 11 routes named in the parent brief with an explicit
  decision for each (including the two exclusions).

## Out of scope / explicit non-goals

- No page on the live site changes as a result of W0.
- No claim ships to the public site yet — the register is a staging area.
- `/evidence` fixture selection is deliberately not made here (flagged as
  its own review-worthy decision for W2).
