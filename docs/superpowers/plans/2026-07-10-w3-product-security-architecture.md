# W3 — /product, /security, /architecture Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship three new deep-dive routes (`/product`, `/security`,
`/architecture`) sourced entirely from real, cited Titan engine
documentation, on a shared page shell, with new claims registered before
they're used and every route discoverable via nav and homepage cross-links.

**Architecture:** Extract a `PageShell` component from the duplicated
Header/background/Footer wrapper already inline in `/manifesto` and
`/disclaimer`, retrofit both to use it, then build the three new pages on
top of it — each a single-file route composed from `lib/content.ts` data
and existing UI primitives (`GlassCard`, `SectionHeading`, `Reveal`). No
new component library, no diagramming/charting dependency.

**Tech Stack:** Next.js 15 App Router, TypeScript, Tailwind v4, existing
`components/ui.tsx` primitives. No test suite exists in this repo (tracked
separately) — verification is `npm run build`, targeted `grep`, and live
browser checks, same discipline as W1.

## Global Constraints

- Nothing in this plan references, previews, or simulates W2's Evidence
  Explorer fixture — W2 is blocked pending a real, sanitized decision
  record from Emad (spec, Context).
- No "Bloomberg of…" self-description as TITAN's own tagline anywhere in
  new copy — the source strategy doc marks that framing internal-only.
  The competitor-comparison table naming "Bloomberg Terminal" as a row is
  a different, approved usage (spec, Context).
- No new diagramming/charting library; no custom Evidence-Explorer-style
  preview widget (spec, Scope — explicitly out of scope).
- Every new measurable/structural claim traces to a
  `docs/content/PUBLIC_CLAIMS_REGISTER.md` row before it ships in page
  copy (spec, Claims register additions).
- No banned marketing language anywhere in new copy: guaranteed,
  profitable, market-beating, unqualified institutional-grade, AI-powered
  profits, high-conviction (carried from W0/W1's Copy and Claims Policy).
- `EarlyAccessForm.tsx` and `DashboardMockup.tsx` are not touched (spec,
  Out of scope).
- No homepage section is reordered or removed — only a single cross-link
  line is added to `WhySection.tsx`, `ArchitectureSection.tsx`, and
  `ProductModeLadder.tsx` (spec, Navigation and cross-links).

---

### Task 1: `PageShell` component + retrofit manifesto/disclaimer

**Files:**
- Create: `components/PageShell.tsx`
- Modify: `app/manifesto/page.tsx` (full rewrite)
- Modify: `app/disclaimer/page.tsx` (full rewrite)

**Interfaces:**
- Consumes: `Header`/`Footer` from `@/components/Header` and
  `@/components/Footer` (unchanged, existing components)
- Produces: `PageShell({ children, glow? }): JSX.Element`, imported as
  `import { PageShell } from "@/components/PageShell";`. Tasks 3-5 (the
  three new pages) consume this exact export.

- [ ] **Step 1: Create the PageShell component**

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

- [ ] **Step 2: Rewrite `app/manifesto/page.tsx` to use PageShell**

Replace the entire file with:

```tsx
import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/ui";
import { ENTITY_STATEMENTS, MANIFESTO_PRINCIPLES } from "@/lib/content";

export const metadata: Metadata = {
  title: "The Titan Pilot Manifesto",
  description:
    "AI should reason. Software should decide. The six principles behind Titan Pilot's risk-first, replayable approach to supervised AI trading.",
  alternates: { canonical: "/manifesto" },
};

export default function ManifestoPage() {
  return (
    <PageShell
      glow={
        <div
          className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-violet/10 blur-[140px]"
          aria-hidden
        />
      }
    >
      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.35em] text-cyan">
            The Titan Pilot Manifesto
          </p>
          <h1 className="font-display text-balance text-3xl font-bold leading-[1.15] sm:text-4xl">
            AI Should Reason.{" "}
            <span className="text-gradient">Software Should Decide.</span>
          </h1>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-secondary">
            Markets are uncertain. Software should not pretend otherwise.
            Titan Pilot is built on the belief that AI can assist market
            reasoning, but capital should only move through deterministic
            controls, explicit risk gates, broker reconciliation, and
            replayable evidence.
          </p>
        </Reveal>

        <ol className="mt-14 space-y-6">
          {MANIFESTO_PRINCIPLES.map((principle, i) => (
            <Reveal key={principle.title} delay={i * 0.06}>
              <li className="glass rounded-2xl p-7">
                <p className="mb-3 font-mono text-[11px] tracking-[0.3em] text-cyan/70">
                  PRINCIPLE {String(i + 1).padStart(2, "0")}
                </p>
                <h2 className="font-display text-lg font-bold leading-snug">
                  {principle.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-secondary">
                  {principle.body}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>

        <Reveal className="mt-14">
          <div className="glass-strong rounded-2xl p-7">
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-secondary">
              What Titan Pilot is
            </p>
            <ul className="space-y-2 text-sm leading-relaxed text-secondary">
              {ENTITY_STATEMENTS.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal className="mt-12 text-center">
          <p className="font-display text-xl font-bold text-gradient">
            You will know exactly why the system did — or did not — act.
          </p>
        </Reveal>
      </div>
    </PageShell>
  );
}
```

- [ ] **Step 3: Rewrite `app/disclaimer/page.tsx` to use PageShell**

Replace the entire file with:

```tsx
import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/ui";
import { CONTACT_EMAIL } from "@/lib/content";

export const metadata: Metadata = {
  title: "Disclaimer",
  description:
    "Titan Pilot is experimental software infrastructure. Nothing on this website is financial advice, investment advice, or a promise of trading performance.",
  alternates: { canonical: "/disclaimer" },
};

const CLARIFICATIONS = [
  {
    title: "Not financial advice",
    body: "Nothing on this website, in Titan Pilot software, documentation, or communications constitutes financial advice, investment advice, or trading advice of any kind.",
  },
  {
    title: "No performance claims",
    body: "Titan Pilot makes no claims about trading performance, profitability, win rates, or returns. Any interface visuals on this website are product simulations with non-live data, not records of real trading results.",
  },
  {
    title: "No guaranteed returns",
    body: "There are no guaranteed returns. Trading foreign exchange and other leveraged products involves substantial risk of loss and is not suitable for every investor.",
  },
  {
    title: "AI outputs may be wrong",
    body: "AI-generated market reasoning can be incomplete, outdated, or incorrect. Titan Pilot treats AI output as evidence to be scored and gated — never as authority — and you should too.",
  },
  {
    title: "Shadow mode is not proof of profitability",
    body: "Shadow-mode validation records and evaluates signals without placing orders. Recorded signals, scores, and artifacts are engineering evidence, not evidence of future or past profitability.",
  },
  {
    title: "Autonomous mode is evidence-gated",
    body: "Any autonomous operation remains outside the current public promise. Promotion toward autonomy requires objective evidence, explicit approval, and safety gates — and may never occur.",
  },
  {
    title: "You are responsible for your decisions",
    body: "Users and visitors remain solely responsible for their own trading and investment decisions, including any decision informed by Titan Pilot software or content.",
  },
  {
    title: "Jurisdiction limitations may apply",
    body: "Availability of software and services may be limited by the laws and regulations of your jurisdiction. Nothing here is an offer or solicitation in any jurisdiction where such an offer would be unlawful.",
  },
  {
    title: "Experimental software",
    body: "Titan Pilot is experimental trading infrastructure under active development. Features, timelines, and behavior may change or be discontinued without notice.",
  },
];

export default function DisclaimerPage() {
  return (
    <PageShell>
      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.35em] text-amber">
            Disclaimer
          </p>
          <h1 className="font-display text-balance text-3xl font-bold leading-[1.15] sm:text-4xl">
            Read This Before Anything Else.
          </h1>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-secondary">
            Titan Pilot is a software infrastructure project. Nothing on this
            website is financial advice, investment advice, or a promise of
            trading performance. Trading involves risk.
          </p>
        </Reveal>

        <div className="mt-12 space-y-5">
          {CLARIFICATIONS.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.04}>
              <section className="glass rounded-2xl p-6">
                <h2 className="text-base font-semibold">{item.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-secondary">
                  {item.body}
                </p>
              </section>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12">
          <p className="text-center text-sm text-secondary">
            Questions? Contact{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-cyan underline-offset-4 hover:underline"
            >
              {CONTACT_EMAIL}
            </a>
          </p>
        </Reveal>
      </div>
    </PageShell>
  );
}
```

- [ ] **Step 4: Verify structure**

Run: `grep -c "PageShell" components/PageShell.tsx app/manifesto/page.tsx app/disclaimer/page.tsx`
Expected: `components/PageShell.tsx:2` (definition + prop usage in the type doesn't count as a text match of the word "PageShell" itself — actual expected count is 1, the `export function PageShell` line; if the count differs, confirm by reading the file rather than treating this as a failure), `app/manifesto/page.tsx:3`, `app/disclaimer/page.tsx:2` (manifesto has import + opening `<PageShell` with glow prop spanning multiple lines + closing `</PageShell>` = 3 lines containing the word; disclaimer has import + opening tag on one line `<PageShell>` + closing `</PageShell>` — but the opening `<PageShell>` and nothing else on that line plus closing tag = 2 distinct matching lines, since disclaimer has no glow prop the opening tag is self-contained on one line).

Run: `grep -n "@/components/Header\"\|@/components/Footer\"" app/manifesto/page.tsx app/disclaimer/page.tsx`
Expected: no output (both pages now get Header/Footer only through PageShell).

- [ ] **Step 5: Build**

Run: `npm run build`
Expected: `✓ Compiled successfully`, 8/8 static pages generated (route
count unchanged — this task adds no new routes), no TypeScript errors.

- [ ] **Step 6: Commit**

```bash
git add components/PageShell.tsx app/manifesto/page.tsx app/disclaimer/page.tsx
git commit -m "$(cat <<'EOF'
W3: extract PageShell, retrofit manifesto/disclaimer

Both static pages duplicated the same Header/background/Footer
wrapper inline. Extracting it now since three more pages in this
slice need the identical pattern — retrofitting the first two keeps
all five static pages on one shared shell instead of a half-migration.
No visual change.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 2: Claims register — 6 new rows

**Files:**
- Modify: `docs/content/PUBLIC_CLAIMS_REGISTER.md`

**Interfaces:**
- Consumes: nothing (independent of Task 1)
- Produces: 6 new sourced claims that Tasks 3-5's page copy will cite by
  matching public-safe wording — no code interface, this is a
  documentation dependency the plan tracks manually (see Task 6's
  traceability check).

- [ ] **Step 1: Append 6 rows to the register**

Find the last line of the file (the "Security audit — findings
remediated" row) and append these 6 rows immediately after it, keeping
the same table:

```markdown
| AI cannot bypass execution | `Titan` repo, `docs/architecture/TITAN_v1_TECHNICAL_ARCHITECTURE.md` §3.3, §9.7 | 2026-07-08 | "Three independent mechanisms keep AI out of the execution path: the AI code cannot import execution code (enforced by CI, not configuration); its only output is a recorded, unconsumed event in shadow mode; and it cannot loosen the deterministic no-trade rules it's checked against." | Emad | 2027-01-08 |
| Fail-closed paths proven in production | `Titan` repo, `docs/architecture/TITAN_v1_TECHNICAL_ARCHITECTURE.md` §1.6, §19.8 | 2026-07-08 | "A 48-hour certification soak exercised every fail-closed path — no-database-at-boot, both AI providers down, budget cap reached, invalid model output, unexplained reconciliation — and each produced an explained, auditable outcome in production, not just in design." | Emad | 2027-01-08 |
| Sanitized offsite backups | `Titan` repo, `docs/architecture/TITAN_v1_TECHNICAL_ARCHITECTURE.md` §17.2, ADR-0019 | 2026-07-08 | "Offsite backups are built by allowlist, not blocklist — only the sanitized database dump and a git commit hash ever leave the server. Secrets never leave the VPS." | Emad | 2027-01-08 |
| Database least-privilege containment | `Titan` repo, `docs/architecture/TITAN_v1_TECHNICAL_ARCHITECTURE.md` §18.1, §3.3 | 2026-07-08 | "The application's database role cannot alter schema, cannot delete recorded events, and cannot delete projections — enforced by database grants and triggers, not application code." | Emad | 2027-01-08 |
| Failure isolation / blast radius | `Titan` repo, `docs/architecture/TITAN_v1_TECHNICAL_ARCHITECTURE.md` §18.4 | 2026-07-08 | "A compromised or hallucinating AI model can produce at most one recorded, validated, budget-capped document — never direct access to capital. A compromised offsite backup exposes only a sanitized data dump and a commit hash." | Emad | 2027-01-08 |
| Continuous verification cadence | `Titan` repo, `docs/architecture/TITAN_v1_TECHNICAL_ARCHITECTURE.md` §17.3, §7.3 | 2026-07-08 | "The system verifies itself daily (a 12-check integrity suite, including replay determinism) and weekly (a full restore against a throwaway copy). A backup that cannot pass verification is not counted as a backup." | Emad | 2027-01-08 |
```

- [ ] **Step 2: Verify row count**

Run: `grep -c "^|" docs/content/PUBLIC_CLAIMS_REGISTER.md`
Expected: `15` (2 header/separator + 7 original data rows + 6 new data
rows).

Run: `grep -n "TBD\|TODO\|FIXME" docs/content/PUBLIC_CLAIMS_REGISTER.md`
Expected: no output.

- [ ] **Step 3: Commit**

```bash
git add docs/content/PUBLIC_CLAIMS_REGISTER.md
git commit -m "$(cat <<'EOF'
W3: register 6 new claims for /product, /architecture, /security

Sourced from the Titan engine's technical architecture handbook and
ADR-0019. Registered before use, per this repo's own claims policy —
Tasks 3-5 cite these rows in their page copy.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 3: `/product` page

**Files:**
- Modify: `lib/content.ts` (append new exports)
- Create: `app/product/page.tsx`

**Interfaces:**
- Consumes: `PageShell` from Task 1 (`import { PageShell } from
  "@/components/PageShell";`); `GlassCard`, `Reveal`, `SectionHeading`
  from `@/components/ui` (existing, unchanged signatures — see Task 1's
  file for confirmation these aren't touched)
- Produces: `lib/content.ts` exports `PRODUCT_PRINCIPLES`,
  `PRODUCT_DOCTRINES`, `AUTONOMY_LADDER_DETAIL`, `COMPETITOR_COMPARISON`,
  `COMPETITOR_PITCH` — no other task imports these except this task's own
  page file.

- [ ] **Step 1: Append new exports to `lib/content.ts`**

Add at the end of the file (after the existing `DISCLAIMER` export):

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

- [ ] **Step 2: Create `app/product/page.tsx`**

```tsx
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { GlassCard, Reveal, SectionHeading } from "@/components/ui";
import {
  AUTONOMY_LADDER_DETAIL,
  COMPETITOR_COMPARISON,
  COMPETITOR_PITCH,
  PRODUCT_DOCTRINES,
  PRODUCT_PRINCIPLES,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Product",
  description:
    "How Titan Pilot turns AI market reasoning into evidence: the decision pipeline, the staged autonomy ladder, and what makes this different from a trading bot or a signal service.",
  alternates: { canonical: "/product" },
};

export default function ProductPage() {
  return (
    <PageShell
      glow={
        <div
          className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-azure/10 blur-[140px]"
          aria-hidden
        />
      }
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.35em] text-cyan">
            The Product
          </p>
          <h1 className="font-display text-balance text-3xl font-bold leading-[1.15] sm:text-4xl">
            What Titan Pilot Actually Does.
          </h1>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-secondary">
            Titan Pilot is the system of record for AI trading decisions —
            built so that when your desk uses AI, every thesis, objection,
            score, and refusal becomes evidence you can replay and defend.
          </p>
        </Reveal>

        <div className="mt-16">
          <SectionHeading
            eyebrow="How It Behaves"
            title="Four Principles, Enforced — Not Aspirational."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PRODUCT_PRINCIPLES.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08}>
                <GlassCard className="h-full">
                  <h3 className="mb-2 text-base font-semibold">{p.title}</h3>
                  <p className="text-sm leading-relaxed text-secondary">
                    {p.body}
                  </p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <SectionHeading
            eyebrow="When It Doesn't Know"
            title="Two Doctrines for the Moments That Matter Most."
          />
          <div className="mx-auto mt-10 grid max-w-4xl gap-5 sm:grid-cols-2">
            {PRODUCT_DOCTRINES.map((d, i) => (
              <Reveal key={d.title} delay={i * 0.1}>
                <GlassCard className="h-full">
                  <h3 className="mb-2 text-base font-semibold">{d.title}</h3>
                  <p className="text-sm leading-relaxed text-secondary">
                    {d.body}
                  </p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <SectionHeading
            eyebrow="Staged Autonomy"
            title="A Ladder Earned With Evidence."
          />
          <div className="mx-auto mt-10 grid max-w-5xl gap-5 lg:grid-cols-3">
            {AUTONOMY_LADDER_DETAIL.map((stage, i) => (
              <Reveal key={stage.stage} delay={i * 0.1}>
                <GlassCard
                  className={`h-full ${i === 0 ? "border-cyan/25" : ""}`}
                >
                  <div className="mb-4 flex items-center justify-between">
                    <span className="font-mono text-lg font-semibold text-white">
                      {stage.stage}
                    </span>
                    <span
                      className={`rounded-full border px-2.5 py-1 font-mono text-[9px] uppercase tracking-widest ${
                        i === 0
                          ? "border-cyan/30 bg-cyan/10 text-cyan"
                          : "border-white/10 bg-white/5 text-secondary"
                      }`}
                    >
                      {stage.status}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-secondary">
                    {stage.body}
                  </p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <SectionHeading
            eyebrow="Why Not Just Use..."
            title="Where Titan Pilot Wins, Product by Product."
            copy="The honest column matters — each alternative is better than Titan Pilot at something, and we don't pretend otherwise."
          />
          <Reveal className="mt-10 overflow-x-auto">
            <div className="glass-strong min-w-[720px] overflow-hidden rounded-2xl">
              <div className="hidden grid-cols-[0.9fr_1.1fr_1.6fr_1.1fr] gap-4 border-b border-white/5 px-6 py-3 sm:grid">
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-secondary">
                  vs
                </p>
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-secondary">
                  They Are
                </p>
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-secondary">
                  Titan Pilot&apos;s Difference
                </p>
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-secondary">
                  What They Do Better
                </p>
              </div>
              <ul>
                {COMPETITOR_COMPARISON.map((row) => (
                  <li
                    key={row.name}
                    className="grid gap-2 border-b border-white/[0.04] px-6 py-4 last:border-0 sm:grid-cols-[0.9fr_1.1fr_1.6fr_1.1fr] sm:gap-4"
                  >
                    <p className="text-sm font-semibold">{row.name}</p>
                    <p className="font-mono text-xs leading-relaxed text-secondary">
                      {row.theyAre}
                    </p>
                    <p className="text-sm leading-relaxed text-secondary">
                      {row.difference}
                    </p>
                    <p className="font-mono text-xs leading-relaxed text-white/60">
                      {row.concede}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal className="mt-6 text-center">
            <p className="mx-auto max-w-2xl font-display text-lg font-bold text-gradient">
              {COMPETITOR_PITCH}
            </p>
          </Reveal>
        </div>

        <Reveal className="mt-16 flex flex-wrap items-center justify-center gap-4">
          <a
            href="/#evidence"
            className="group inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan to-azure px-6 py-3 text-sm font-semibold text-bg shadow-[0_0_24px_-8px_rgba(0,215,255,0.5)] transition-shadow hover:shadow-[0_0_44px_-6px_rgba(0,215,255,0.7)]"
          >
            Explore the evidence
            <ArrowRight
              className="size-4 transition-transform group-hover:translate-x-0.5"
              aria-hidden
            />
          </a>
          <a
            href="/#contact"
            className="rounded-lg border border-white/15 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-cyan/40 hover:bg-cyan/5"
          >
            Book an AI Desk Audit
          </a>
        </Reveal>
      </div>
    </PageShell>
  );
}
```

Note: `text-white/60` is used for the "What They Do Better" column
(not a lower value) — this repo's established WCAG-AA floor for small
supplementary text, set by the W1 footer-contrast fix and reused since.

- [ ] **Step 3: Verify**

Run: `grep -c "PRODUCT_PRINCIPLES\|PRODUCT_DOCTRINES\|AUTONOMY_LADDER_DETAIL\|COMPETITOR_COMPARISON\|COMPETITOR_PITCH" lib/content.ts`
Expected: `6` (5 `export const` lines + 1 additional usage of
`COMPETITOR_COMPARISON`'s name is not repeated elsewhere in the file, so
this counts the 5 export lines; if it differs, confirm by reading the
file rather than treating a close mismatch as a failure).

Run: `grep -n "text-white/40\|text-white/30\|text-white/35" app/product/page.tsx`
Expected: no output (no low-contrast text introduced).

- [ ] **Step 4: Build**

Run: `npm run build`
Expected: `✓ Compiled successfully`, 9/9 static pages generated (8
existing + `/product`), no TypeScript errors.

- [ ] **Step 5: Commit**

```bash
git add lib/content.ts app/product/page.tsx
git commit -m "$(cat <<'EOF'
W3: add /product page

Deep-dive on the four experience principles, the Never-Guess/
Fail-Closed doctrines, the staged autonomy ladder, and an 8-row
competitor differentiation table — all sourced from the Titan engine's
Phase D product design doc. Uses category framing in the hero, not the
strategy doc's internal-only "Bloomberg of..." tagline.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 4: `/architecture` page

**Files:**
- Modify: `lib/content.ts` (append `ARCHITECTURE_DEEP_DIVE`)
- Create: `app/architecture/page.tsx`

**Interfaces:**
- Consumes: `PageShell` (Task 1); `GlassCard`, `Reveal`, `SectionHeading`
  from `@/components/ui`; `TECH_STACK` from `@/lib/content` (existing
  export, unchanged — array of strings, e.g. `["Next.js", "Python", ...]`)
- Produces: `lib/content.ts` export `ARCHITECTURE_DEEP_DIVE` — consumed
  only by this task's own page file.

- [ ] **Step 1: Append `ARCHITECTURE_DEEP_DIVE` to `lib/content.ts`**

Add at the end of the file (after `COMPETITOR_PITCH` from Task 3):

```ts

export const ARCHITECTURE_DEEP_DIVE = [
  {
    title: "AI cannot bypass execution.",
    body: "Three independent mechanisms enforce this, any one of which would be sufficient on its own. The AI code has no import path to execution code — a CI check fails the build if it ever does. The AI layer's only output is a recorded event; in shadow mode, nothing consumes it. And the deterministic no-trade rules the system checks against can only be tightened by AI output, never loosened.",
  },
  {
    title: "One database, three data classes.",
    body: "Decisions are event-sourced: an append-only log is the system of record, because the history is the product — audits, disputes, and forensics all require knowing exactly what the system believed and did, in order, forever. Market data (candles, calendar rows) is not event-sourced — it's high-volume and re-fetchable, with no accountability requirement of its own. What is recorded is every use of that data: each decision pins the exact input data it was built from, by hash.",
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

- [ ] **Step 2: Create `app/architecture/page.tsx`**

```tsx
import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { GlassCard, Reveal, SectionHeading } from "@/components/ui";
import { ARCHITECTURE_DEEP_DIVE, TECH_STACK } from "@/lib/content";

export const metadata: Metadata = {
  title: "Architecture",
  description:
    "How Titan Pilot is actually built: why AI cannot reach execution, how the event log proves what happened, and the engineering discipline behind the claims.",
  alternates: { canonical: "/architecture" },
};

export default function ArchitecturePage() {
  return (
    <PageShell
      glow={
        <div
          className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-violet/[0.07] blur-[140px]"
          aria-hidden
        />
      }
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.35em] text-cyan">
            Architecture
          </p>
          <h1 className="font-display text-balance text-3xl font-bold leading-[1.15] sm:text-4xl">
            Built Like Infrastructure, Not a Trading Bot.
          </h1>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-secondary">
            Architecture is a credibility signal here, not decoration.
            Every claim on this page traces to a mechanism you could go
            verify — not a diagram someone drew to look serious.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-5 lg:grid-cols-2">
          {ARCHITECTURE_DEEP_DIVE.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08}>
              <GlassCard className="h-full">
                <p className="mb-3 font-mono text-[10px] tracking-[0.3em] text-cyan/70">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h2 className="mb-2 text-lg font-semibold">{item.title}</h2>
                <p className="text-sm leading-relaxed text-secondary">
                  {item.body}
                </p>
              </GlassCard>
            </Reveal>
          ))}
        </div>

        <div className="mt-16">
          <SectionHeading eyebrow="Built With" title="The Stack Underneath." />
          <Reveal className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-2.5">
            {TECH_STACK.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-white/10 bg-surface/80 px-3.5 py-1.5 font-mono text-[11px] tracking-wider text-secondary"
              >
                {tech}
              </span>
            ))}
          </Reveal>
        </div>

        <Reveal className="mt-16 flex justify-center">
          <a
            href="/security"
            className="rounded-lg border border-white/15 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-cyan/40 hover:bg-cyan/5"
          >
            See the security and verification posture
          </a>
        </Reveal>
      </div>
    </PageShell>
  );
}
```

- [ ] **Step 3: Verify**

Run: `grep -c "ARCHITECTURE_DEEP_DIVE" lib/content.ts`
Expected: `1`.

Run: `grep -n "text-white/40\|text-white/30\|text-white/35" app/architecture/page.tsx`
Expected: no output.

- [ ] **Step 4: Build**

Run: `npm run build`
Expected: `✓ Compiled successfully`, 10/10 static pages generated (9 from
Task 3 + `/architecture`), no TypeScript errors.

- [ ] **Step 5: Commit**

```bash
git add lib/content.ts app/architecture/page.tsx
git commit -m "$(cat <<'EOF'
W3: add /architecture page

Deep-dive on why AI structurally cannot bypass execution, the
event-sourcing rationale, replay-as-proof mechanics, and the enforced
dependency-direction rule — sourced from the Titan v1 Technical
Architecture handbook.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 5: `/security` page

**Files:**
- Modify: `lib/content.ts` (append `SECURITY_CAPABILITIES`)
- Create: `app/security/page.tsx`

**Interfaces:**
- Consumes: `PageShell` (Task 1); `Reveal`, `SectionHeading` from
  `@/components/ui`; `DISCLAIMER` from `@/lib/content` (existing export,
  a single string, unchanged)
- Produces: `lib/content.ts` export `SECURITY_CAPABILITIES` — consumed
  only by this task's own page file.

- [ ] **Step 1: Append `SECURITY_CAPABILITIES` to `lib/content.ts`**

Add at the end of the file (after `ARCHITECTURE_DEEP_DIVE` from Task 4):

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

- [ ] **Step 2: Create `app/security/page.tsx`**

```tsx
import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { Reveal, SectionHeading } from "@/components/ui";
import { DISCLAIMER, SECURITY_CAPABILITIES } from "@/lib/content";

export const metadata: Metadata = {
  title: "Security & Operational Posture",
  description:
    "Titan Pilot's verified security and disaster-recovery posture: independent audit results, backup and replay verification, and how the system contains its own failures.",
  alternates: { canonical: "/security" },
};

export default function SecurityPage() {
  return (
    <PageShell
      glow={
        <div
          className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-success/10 blur-[140px]"
          aria-hidden
        />
      }
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.35em] text-cyan">
            Security
          </p>
          <h1 className="font-display text-balance text-3xl font-bold leading-[1.15] sm:text-4xl">
            Verified Daily, Not Just at Launch.
          </h1>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-secondary">
            This is operational proof, not a compliance checkbox. Every
            capability below is checked automatically, on a schedule, and
            has been observed passing in production.
          </p>
        </Reveal>

        <div className="mx-auto mt-16 max-w-4xl space-y-5">
          {SECURITY_CAPABILITIES.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.06}>
              <section className="glass rounded-2xl p-6">
                <h2 className="text-base font-semibold">{item.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-secondary">
                  {item.body}
                </p>
              </section>
            </Reveal>
          ))}
        </div>

        <Reveal className="mx-auto mt-10 max-w-2xl text-center">
          <p className="text-sm leading-relaxed text-secondary">
            {DISCLAIMER}
          </p>
        </Reveal>

        <Reveal className="mt-10 flex justify-center">
          <a
            href="/#contact"
            className="group inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan to-azure px-6 py-3 text-sm font-semibold text-bg shadow-[0_0_24px_-8px_rgba(0,215,255,0.5)] transition-shadow hover:shadow-[0_0_44px_-6px_rgba(0,215,255,0.7)]"
          >
            Talk to us about your desk&apos;s security requirements
          </a>
        </Reveal>
      </div>
    </PageShell>
  );
}
```

- [ ] **Step 3: Verify**

Run: `grep -c "SECURITY_CAPABILITIES" lib/content.ts`
Expected: `1`.

Run: `grep -n "text-white/40\|text-white/30\|text-white/35" app/security/page.tsx`
Expected: no output.

- [ ] **Step 4: Build**

Run: `npm run build`
Expected: `✓ Compiled successfully`, 11/11 static pages generated (10 from
Task 4 + `/security`), no TypeScript errors.

- [ ] **Step 5: Commit**

```bash
git add lib/content.ts app/security/page.tsx
git commit -m "$(cat <<'EOF'
W3: add /security page

Verified security and operational posture: the same-day-fixed audit
findings, the offsite backup allowlist design, DR numbers with a
weekly-restore-drill narrative, AI provider failover, database
least-privilege containment, and the daily verification cadence.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 6: Navigation, cross-links, sitemap

**Files:**
- Modify: `lib/content.ts` (`NAV_ITEMS`)
- Modify: `components/WhySection.tsx`
- Modify: `components/ArchitectureSection.tsx`
- Modify: `components/ProductModeLadder.tsx`
- Modify: `app/sitemap.ts`

**Interfaces:**
- Consumes: the three routes from Tasks 3-5 (`/product`, `/architecture`,
  `/security` must exist as valid routes — they do, from prior tasks)
- Produces: nothing consumed by later tasks except Task 7's link-check,
  which verifies these hrefs resolve.

- [ ] **Step 1: Update `NAV_ITEMS` in `lib/content.ts`**

Find:
```ts
export const NAV_ITEMS = [
  { label: "Product", href: "/#product" },
  { label: "Architecture", href: "/#architecture" },
  { label: "AI Model", href: "/#ai-model" },
  { label: "Safety", href: "/#safety" },
  { label: "Roadmap", href: "/#roadmap" },
  { label: "Manifesto", href: "/manifesto" },
];
```
Replace with:
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

- [ ] **Step 2: Add cross-link to `components/WhySection.tsx`**

Find:
```tsx
import { BrainCircuit, Cpu, History, ShieldCheck } from "lucide-react";
```
Replace with:
```tsx
import { ArrowRight, BrainCircuit, Cpu, History, ShieldCheck } from "lucide-react";
```

Find:
```tsx
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {WHY_CARDS.map((card, i) => {
            const Icon = ICONS[card.icon as keyof typeof ICONS];
            return (
              <Reveal key={card.title} delay={i * 0.1}>
                <GlassCard className="h-full">
                  <div className="mb-4 inline-flex rounded-xl border border-cyan/20 bg-cyan/10 p-3">
                    <Icon className="size-5 text-cyan" aria-hidden />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">{card.title}</h3>
                  <p className="text-sm leading-relaxed text-secondary">{card.body}</p>
                </GlassCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```
Replace with:
```tsx
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {WHY_CARDS.map((card, i) => {
            const Icon = ICONS[card.icon as keyof typeof ICONS];
            return (
              <Reveal key={card.title} delay={i * 0.1}>
                <GlassCard className="h-full">
                  <div className="mb-4 inline-flex rounded-xl border border-cyan/20 bg-cyan/10 p-3">
                    <Icon className="size-5 text-cyan" aria-hidden />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">{card.title}</h3>
                  <p className="text-sm leading-relaxed text-secondary">{card.body}</p>
                </GlassCard>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-10 text-center">
          <a
            href="/product"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-cyan hover:underline"
          >
            Read the full product deep dive
            <ArrowRight className="size-3.5" aria-hidden />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Add cross-link to `components/ArchitectureSection.tsx`**

Find:
```tsx
import { ChevronRight } from "lucide-react";
```
Replace with:
```tsx
import { ArrowRight, ChevronRight } from "lucide-react";
```

Find:
```tsx
        {/* Layer explanations */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ARCHITECTURE_LAYERS.map((layer, i) => (
            <Reveal key={layer.title} delay={i * 0.08}>
              <GlassCard className="h-full">
                <p className="mb-3 font-mono text-[10px] tracking-[0.3em] text-cyan/70">
                  LAYER {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mb-2 text-base font-semibold">{layer.title}</h3>
                <p className="text-sm leading-relaxed text-secondary">{layer.body}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
```
Replace with:
```tsx
        {/* Layer explanations */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ARCHITECTURE_LAYERS.map((layer, i) => (
            <Reveal key={layer.title} delay={i * 0.08}>
              <GlassCard className="h-full">
                <p className="mb-3 font-mono text-[10px] tracking-[0.3em] text-cyan/70">
                  LAYER {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mb-2 text-base font-semibold">{layer.title}</h3>
                <p className="text-sm leading-relaxed text-secondary">{layer.body}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 text-center">
          <a
            href="/architecture"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-cyan hover:underline"
          >
            See the full architecture
            <ArrowRight className="size-3.5" aria-hidden />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Add cross-link to `components/ProductModeLadder.tsx` and fix its low-contrast caption**

This file has a `text-white/35` caption — the same class of WCAG-AA
contrast failure already fixed in `Footer.tsx` (W1) and
`EvidenceSection.tsx` (W1 final review) at this repo's established
`text-white/60` floor. Since this task already touches this exact
paragraph to add the cross-link below it, fix the contrast in the same
edit rather than leave a third instance of the same known bug.

Find:
```tsx
import { PRODUCT_MODES } from "@/lib/content";
import { GlassCard, Reveal, SectionHeading } from "./ui";
```
Replace with:
```tsx
import { ArrowRight } from "lucide-react";
import { PRODUCT_MODES } from "@/lib/content";
import { GlassCard, Reveal, SectionHeading } from "./ui";
```

Find:
```tsx
        <Reveal className="mt-8 text-center">
          <p className="mx-auto max-w-2xl font-mono text-[11px] leading-relaxed tracking-wide text-white/35">
            Live-money autonomy is outside the current public promise and must
            remain evidence-gated.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
```
Replace with:
```tsx
        <Reveal className="mt-8 text-center">
          <p className="mx-auto max-w-2xl font-mono text-[11px] leading-relaxed tracking-wide text-white/60">
            Live-money autonomy is outside the current public promise and must
            remain evidence-gated.
          </p>
        </Reveal>

        <Reveal className="mt-6 text-center">
          <a
            href="/product"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-cyan hover:underline"
          >
            Read more about the autonomy ladder
            <ArrowRight className="size-3.5" aria-hidden />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Update `app/sitemap.ts`**

Replace the entire file with:

```ts
import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/product`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/architecture`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/security`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/manifesto`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/disclaimer`,
      changeFrequency: "yearly",
      priority: 0.4,
    },
  ];
}
```

- [ ] **Step 6: Verify**

Run: `grep -n '"/#product"\|"/#architecture"' lib/content.ts`
Expected: no output (both replaced by dedicated routes).

Run: `grep -c '"/product"\|"/architecture"\|"/security"' lib/content.ts app/sitemap.ts components/WhySection.tsx components/ArchitectureSection.tsx components/ProductModeLadder.tsx`
Expected: non-zero count in every listed file (each file references at
least one of the three new routes).

Run: `grep -n "text-white/35" components/ProductModeLadder.tsx`
Expected: no output.

- [ ] **Step 7: Build**

Run: `npm run build`
Expected: `✓ Compiled successfully`, 11/11 static pages generated, no
TypeScript errors.

- [ ] **Step 8: Commit**

```bash
git add lib/content.ts components/WhySection.tsx components/ArchitectureSection.tsx components/ProductModeLadder.tsx app/sitemap.ts
git commit -m "$(cat <<'EOF'
W3: wire nav, cross-links, and sitemap to the three new routes

NAV_ITEMS Product/Architecture now point at dedicated routes instead
of homepage anchors; Security is a new nav item. Each of WhySection,
ArchitectureSection, and ProductModeLadder gets one cross-link to its
deep-dive page. Also fixes ProductModeLadder's text-white/35 caption
to this repo's established text-white/60 contrast floor, found while
editing the same paragraph for the cross-link.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 7: Integration verification

**Files:**
- Modify: none expected (verification-only; see conditional step 4 for
  the one scenario where a fix is needed)

**Interfaces:**
- Consumes: the final committed state of Tasks 1-6
- Produces: nothing — this is a verification gate.

- [ ] **Step 1: Full build**

Run: `npm run build`
Expected: `✓ Compiled successfully`, 11/11 static pages generated
(`/`, `/_not-found`, `/architecture`, `/disclaimer`, `/manifesto`,
`/product`, `/robots.txt`, `/security`, `/sitemap.xml`, plus the two
route-group entries Next.js reports separately — confirm the count
matches by reading the actual build output rather than treating a small
mismatch as a failure), zero TypeScript errors.

- [ ] **Step 2: Claims traceability check**

Run:
```bash
grep -c "no import path to execution code\|48-hour certification soak\|allowlist, not blocklist\|cannot alter schema\|budget-capped document\|12-check integrity suite" lib/content.ts
```
Expected: `6` — one for each of Task 2's new register rows, confirming
every new structural/measurable claim registered in Task 2 is actually
the claim used in the shipped page copy (not a different, unregistered
wording).

- [ ] **Step 3: Banned-language sweep**

Run:
```bash
grep -rniE "guaranteed|profitable|market-beating|institutional-grade|AI-powered profits|high-conviction" app/product/page.tsx app/architecture/page.tsx app/security/page.tsx lib/content.ts
```
Expected: no output, OR only the same two pre-existing disclaimer
negations W1's integration check already found and classified as
non-violations (`EARLY_ACCESS_NOT_GETS`'s "Guaranteed signals" list item,
`EARLY_ACCESS_DISCLAIMER`'s "does not provide ... guaranteed returns") —
if any other match appears, treat it as a real finding, not a repeat of
the known-safe two.

- [ ] **Step 4: Live checks on all three new routes**

Start a local server in the background: `npx next start -p 3458`

For each of `/product`, `/architecture`, `/security` at
`http://localhost:3458`, using a chrome-devtools or Playwright MCP
browser tool:
- Run a Lighthouse audit (performance, accessibility, best practices,
  SEO). Expected: no color-contrast violations reported (this is the
  strongest signal Task 3/4/5's `text-white/60` discipline actually
  worked, and that the new 4-column competitor table doesn't introduce
  an accessibility regression).
- Resize to 390×844 and evaluate `{ scrollWidth:
  document.documentElement.scrollWidth, clientWidth:
  document.documentElement.clientWidth }`. Expected: equal. Repeat at
  440×956.

**If any route shows `scrollWidth > clientWidth`:** the most likely
cause is `/product`'s competitor table (`min-w-[720px]` inside
`overflow-x-auto` — this is designed to scroll horizontally within its
own container, not push the page wide; if it's pushing the page instead
of scrolling internally, the `overflow-x-auto` wrapper `div` needs
`min-w-0` added to its className, matching the fix pattern used for the
earlier hero dashboard mobile-overflow bug). Apply that fix, rebuild,
recheck. If the overflow source is a different element or page, stop and
report BLOCKED with a screenshot rather than guessing further.

**If any route shows a color-contrast violation:** identify the exact
element via the Lighthouse report; if it's a `text-white/NN` value below
`/60`, raise it to `/60` (or higher if `/60` still fails, per the same
iterate-and-recheck method used in W1's footer fix), rebuild, recheck.

Stop the background server when done.

- [ ] **Step 5: Internal link check**

From each new page's rendered HTML (or accessibility snapshot), confirm
every link resolves: `/#evidence` and `/#contact` (existing homepage
anchors), `/security` (from `/architecture`), and the three cross-links
added in Task 6 (`/product` from `WhySection` and `ProductModeLadder`,
`/architecture` from `ArchitectureSection`). All six should point at
routes or anchors that exist after Tasks 1-6.

- [ ] **Step 6: Commit (only if Step 4's conditional fix was applied)**

If no fix was needed, report the task complete and skip this step.

If a fix was applied:
```bash
git add <changed files>
git commit -m "$(cat <<'EOF'
W3: fix mobile overflow/contrast found in integration check

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```
