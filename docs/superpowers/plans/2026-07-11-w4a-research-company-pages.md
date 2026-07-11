# W4a — /research, /company, Homepage Teaser, Nav/Footer/Sitemap Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship `/company`, `/research`, and a real `/contact` route (intro
copy + relocated existing form, full backend deferred to W4b), plus the
homepage/nav/footer/sitemap changes needed to point at them.

**Architecture:** Follows the exact `PageShell` + `lib/content.ts` pattern
established in W3 for `/product`, `/architecture`, `/security` — one new
route per page, content as typed data exports, layout built from existing
`GlassCard`/`Reveal`/`SectionHeading` primitives. No new dependencies, no
new reusable components beyond one homepage teaser section.

**Tech Stack:** Next.js 15 App Router, React 19, TypeScript, Tailwind v4 —
unchanged from the rest of the repo.

## Global Constraints

- Spec: `docs/superpowers/specs/2026-07-11-w4a-research-company-pages-design.md`
  — every task's exact copy and structure is defined there; this plan
  operationalizes it into files and steps.
- Text opacity floor: no supplementary text below `text-white/60` (WCAG AA
  4.5:1, established W1).
- No banned marketing language: no "guaranteed", "profitable",
  "market-beating", unqualified "institutional-grade", "high-conviction",
  no self-applied "Bloomberg of…" tagline.
- No new npm dependencies in this slice.
- No test suite exists in this repo (tracked as its own W0 finding) —
  validation is `npm run build` + grep verification + manual visual/
  keyboard checks, exactly as in W1/W3.
- Every new page uses `PageShell` from `components/PageShell.tsx` with a
  distinct glow color: `/company` → `electric` (`bg-electric/10`),
  `/research` → `cyan` (`bg-cyan/10`), `/contact` → `amber`
  (`bg-amber/10`).
- All new prose content comes from the spec verbatim — do not paraphrase
  or invent additional claims.

---

### Task 1: `lib/content.ts` new exports + claims register rows

**Files:**
- Modify: `lib/content.ts` (append at end of file, after the existing
  `SECURITY_CAPABILITIES` export which ends at line 487)
- Modify: `docs/content/PUBLIC_CLAIMS_REGISTER.md` (append two new rows)

**Interfaces:**
- Produces: `COMPANY_MISSION`, `COMPANY_PROBLEM`, `COMPANY_FOUNDER`,
  `COMPANY_TEAM`, `COMPANY_PRINCIPLES`, `COMPANY_NEVER_CLAIMS`,
  `COMPANY_TIMELINE`, `COMPANY_STAGE`, `RESEARCH_INTRO`,
  `RESEARCH_PRINCIPLES`, `ResearchStatus` (type), `RESEARCH_PIPELINE`,
  `RESEARCH_STANDARDS`, `RESEARCH_CLAIMS_NOTE`, `RESEARCH_STATUS`,
  `CONTACT_INTRO`, `CONTACT_QUALIFICATION_NOTICE`,
  `CONTACT_WHAT_HAPPENS_NEXT`, `HOMEPAGE_CONTACT_TEASER` — all consumed by
  Tasks 2–4.

- [ ] **Step 1: Append the new content exports to `lib/content.ts`**

Open `lib/content.ts`, go to the end of the file (line 487, right after
the closing `];` of `SECURITY_CAPABILITIES`), and append exactly this
block:

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

export const COMPANY_STAGE =
  "Titan Pilot is currently in a certified production shadow phase. The platform has completed its engineering certification, including replay verification, deterministic scoring, AI safety validation, and operational hardening. The system currently operates in supervised shadow mode while we engage with qualified design partners and continue validating the product with real operational evidence.";

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

export const HOMEPAGE_CONTACT_TEASER = {
  title: "Ready to evaluate AI decision governance?",
  copy: "Book an AI Desk Audit to discuss how your trading desk currently uses AI, where governance gaps exist, and whether Titan Pilot is an appropriate fit.",
};
```

- [ ] **Step 2: Append the two claims-register rows**

Open `docs/content/PUBLIC_CLAIMS_REGISTER.md`. Add these two rows as new
lines at the end of the existing table (after the "Continuous verification
cadence" row):

```
| Founder-led, sole product/engineering owner | Emad — direct statement to site content, 2026-07-11 | 2026-07-11 | "Titan Pilot is currently founder-led and intentionally small. Emad is the sole founder and primary product and engineering owner." | Emad | 2027-01-11 |
| Founder background | Emad — direct statement to site content, 2026-07-11 | 2026-07-11 | "Emad Khan is a senior software and cloud architect with more than 12 years of experience building production-grade distributed systems." | Emad | 2027-01-11 |
```

- [ ] **Step 3: Verify the file compiles and no strings are duplicated**

Run: `npx tsc --noEmit`
Expected: no new type errors.

Run: `grep -c "export const COMPANY_MISSION" lib/content.ts`
Expected: `1` (confirms no accidental duplicate paste).

- [ ] **Step 4: Commit**

```bash
git add lib/content.ts docs/content/PUBLIC_CLAIMS_REGISTER.md
git commit -m "content: add /company, /research, /contact copy + claims register rows"
```

---

### Task 2: `/company` page

**Files:**
- Create: `app/company/page.tsx`

**Interfaces:**
- Consumes: `COMPANY_MISSION`, `COMPANY_PROBLEM`, `COMPANY_FOUNDER`,
  `COMPANY_TEAM`, `COMPANY_PRINCIPLES`, `COMPANY_NEVER_CLAIMS`,
  `COMPANY_TIMELINE`, `COMPANY_STAGE` from `@/lib/content` (Task 1).
  `PageShell` from `@/components/PageShell`. `GlassCard`, `Reveal`,
  `SectionHeading` from `@/components/ui`. `Check`, `X` icons from
  `lucide-react` (same icons `EarlyAccessForm.tsx` already uses for
  got/not-got lists).

- [ ] **Step 1: Create `app/company/page.tsx`**

```tsx
import type { Metadata } from "next";
import { Check, X } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { GlassCard, Reveal, SectionHeading } from "@/components/ui";
import {
  COMPANY_FOUNDER,
  COMPANY_MISSION,
  COMPANY_NEVER_CLAIMS,
  COMPANY_PRINCIPLES,
  COMPANY_PROBLEM,
  COMPANY_STAGE,
  COMPANY_TEAM,
  COMPANY_TIMELINE,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Company",
  description:
    "Titan Pilot is founder-led infrastructure for supervised, replayable AI trading decisions — built on evidence, not marketing claims.",
  alternates: { canonical: "/company" },
};

export default function CompanyPage() {
  return (
    <PageShell
      glow={
        <div
          className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-electric/10 blur-[140px]"
          aria-hidden
        />
      }
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.35em] text-cyan">
            {COMPANY_MISSION.eyebrow}
          </p>
          <h1 className="font-display text-balance text-3xl font-bold leading-[1.15] sm:text-4xl">
            {COMPANY_MISSION.title}
          </h1>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-secondary">
            {COMPANY_MISSION.copy}
          </p>
        </Reveal>

        <Reveal className="mx-auto mt-12 max-w-3xl text-center">
          <p className="text-pretty text-base leading-relaxed text-secondary">
            {COMPANY_PROBLEM}
          </p>
        </Reveal>

        <div className="mx-auto mt-16 max-w-3xl">
          <Reveal>
            <GlassCard>
              <h3 className="mb-2 text-base font-semibold">
                {COMPANY_FOUNDER.name}
              </h3>
              <p className="text-sm leading-relaxed text-secondary">
                {COMPANY_FOUNDER.bio}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-secondary">
                {COMPANY_TEAM}
              </p>
            </GlassCard>
          </Reveal>
        </div>

        <div className="mt-16">
          <SectionHeading eyebrow="How We Operate" title="Our Principles." />
          <div className="mx-auto mt-10 grid max-w-4xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {COMPANY_PRINCIPLES.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.06}>
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
            eyebrow="Boundaries"
            title="What Titan Pilot Will Never Claim."
          />
          <Reveal className="mx-auto mt-10 max-w-2xl">
            <div className="glass rounded-2xl p-6 sm:p-8">
              <ul className="space-y-2.5">
                {COMPANY_NEVER_CLAIMS.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm text-secondary"
                  >
                    <X className="mt-0.5 size-4 shrink-0 text-amber" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <div className="mt-16">
          <SectionHeading eyebrow="Timeline" title="Our Journey." />
          <ol className="relative mx-auto mt-16 max-w-2xl">
            <div
              className="absolute bottom-4 left-[15px] top-1 w-px bg-gradient-to-b from-electric/50 via-cyan/40 to-white/10"
              aria-hidden
            />
            {COMPANY_TIMELINE.map((item, i) => (
              <Reveal key={item.stage} delay={i * 0.07}>
                <li className="relative flex items-start gap-5 pb-8 pl-0 last:pb-0">
                  <span className="relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full border border-electric/40 bg-electric/10 text-electric">
                    <Check className="size-4" aria-hidden />
                  </span>
                  <div className="glass flex-1 rounded-xl px-5 py-3.5">
                    <p className="text-sm font-semibold">{item.stage}</p>
                    <p className="mt-1 text-sm leading-relaxed text-secondary">
                      {item.body}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>

        <Reveal className="mx-auto mt-16 max-w-3xl">
          <div className="glass-strong rounded-2xl p-6 text-center sm:p-8">
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-secondary">
              Current Stage
            </p>
            <p className="text-pretty text-sm leading-relaxed text-secondary">
              {COMPANY_STAGE}
            </p>
          </div>
        </Reveal>
      </div>
    </PageShell>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: succeeds, `/company` listed among generated static routes, no
type or console errors.

- [ ] **Step 3: Visual check**

Run: `npm run dev`, open `http://localhost:3000/company` at desktop width
and at 390×844 / 440×956 mobile viewports. Confirm: no horizontal
overflow, timeline connector line renders behind the numbered circles (not
in front), all text is legible against the `electric` glow background.

- [ ] **Step 4: Commit**

```bash
git add app/company/page.tsx
git commit -m "feat: add /company page"
```

---

### Task 3: `/research` page

**Files:**
- Create: `app/research/page.tsx`

**Interfaces:**
- Consumes: `RESEARCH_INTRO`, `RESEARCH_PRINCIPLES`, `RESEARCH_PIPELINE`,
  `ResearchStatus`, `RESEARCH_STANDARDS`, `RESEARCH_CLAIMS_NOTE`,
  `RESEARCH_STATUS` from `@/lib/content` (Task 1). `PageShell`,
  `GlassCard`, `Reveal`, `SectionHeading` as in Task 2. `Check` icon from
  `lucide-react`.
- Produces: a local `RESEARCH_STATUS_STYLES` map (page-local, not
  exported) keyed by `ResearchStatus`.

- [ ] **Step 1: Create `app/research/page.tsx`**

```tsx
import type { Metadata } from "next";
import { Check } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { GlassCard, Reveal, SectionHeading } from "@/components/ui";
import {
  RESEARCH_CLAIMS_NOTE,
  RESEARCH_INTRO,
  RESEARCH_PIPELINE,
  RESEARCH_PRINCIPLES,
  RESEARCH_STANDARDS,
  RESEARCH_STATUS,
  type ResearchStatus,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Research",
  description:
    "How Titan Pilot approaches research: evidence before claims, reproducible methodology, and publications delayed until they meet our internal standards.",
  alternates: { canonical: "/research" },
};

const RESEARCH_STATUS_STYLES: Record<ResearchStatus, string> = {
  Planned: "border-white/15 bg-white/5 text-secondary",
  "In Preparation": "border-azure/25 bg-azure/10 text-azure",
  "Under Internal Review": "border-amber/25 bg-amber/10 text-amber",
  Published: "border-success/25 bg-success/10 text-success",
};

export default function ResearchPage() {
  return (
    <PageShell
      glow={
        <div
          className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-cyan/10 blur-[140px]"
          aria-hidden
        />
      }
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.35em] text-cyan">
            {RESEARCH_INTRO.eyebrow}
          </p>
          <h1 className="font-display text-balance text-3xl font-bold leading-[1.15] sm:text-4xl">
            {RESEARCH_INTRO.title}
          </h1>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-secondary">
            {RESEARCH_INTRO.copy}
          </p>
        </Reveal>

        <div className="mt-16">
          <SectionHeading eyebrow="Standards" title="Research Principles." />
          <Reveal className="mx-auto mt-10 max-w-2xl">
            <div className="glass rounded-2xl p-6 sm:p-8">
              <ul className="grid gap-2.5 sm:grid-cols-2">
                {RESEARCH_PRINCIPLES.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm text-secondary"
                  >
                    <Check className="mt-0.5 size-4 shrink-0 text-success" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <div className="mt-16">
          <SectionHeading
            eyebrow="Publication Tracks"
            title="Research Pipeline."
            copy="Planned tracks, not completed work — statuses update as real work begins on each one."
          />
          <Reveal className="mx-auto mt-10 max-w-3xl">
            <div className="glass-strong grid gap-3 rounded-2xl p-6 sm:grid-cols-2 sm:p-8">
              {RESEARCH_PIPELINE.map((track) => (
                <div
                  key={track.title}
                  className="flex items-center justify-between gap-3 rounded-xl border border-white/5 px-4 py-3"
                >
                  <span className="text-sm font-medium">{track.title}</span>
                  <span
                    className={`rounded-full border px-2.5 py-1 font-mono text-[9px] uppercase tracking-widest ${RESEARCH_STATUS_STYLES[track.status]}`}
                  >
                    {track.status}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-center text-sm text-white/60">
              {RESEARCH_STATUS.delayed}
            </p>
          </Reveal>
        </div>

        <div className="mt-16">
          <SectionHeading
            eyebrow="Publication Standards"
            title="What Every Publication Will Include."
          />
          <div className="mx-auto mt-10 grid max-w-3xl gap-5 sm:grid-cols-2">
            {RESEARCH_STANDARDS.map((item, i) => (
              <Reveal key={item} delay={i * 0.05}>
                <GlassCard className="h-full">
                  <p className="text-sm leading-relaxed text-secondary">
                    {item}
                  </p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal className="mx-auto mt-16 max-w-2xl text-center">
          <p className="text-sm leading-relaxed text-secondary">
            {RESEARCH_CLAIMS_NOTE}
          </p>
        </Reveal>

        <Reveal className="mx-auto mt-16 max-w-3xl">
          <div className="glass-strong rounded-2xl p-6 text-center sm:p-8">
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-secondary">
              Current Status
            </p>
            <p className="text-pretty text-sm leading-relaxed text-secondary">
              {RESEARCH_STATUS.current}
            </p>
          </div>
        </Reveal>
      </div>
    </PageShell>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: succeeds, `/research` listed among generated static routes.

- [ ] **Step 3: Visual check**

Run: `npm run dev`, open `http://localhost:3000/research` at desktop and
mobile viewports (390×844, 440×956). Confirm no overflow, all 10 pipeline
rows are legible in the 2-column grid on desktop and stack to 1 column on
mobile.

- [ ] **Step 4: Commit**

```bash
git add app/research/page.tsx
git commit -m "feat: add /research page"
```

---

### Task 4: `/contact` route, homepage teaser, CTA retargeting

**Files:**
- Create: `app/contact/page.tsx`
- Create: `components/ContactTeaser.tsx`
- Modify: `app/page.tsx` (swap `EarlyAccessForm` → `ContactTeaser`)
- Modify: `components/EarlyAccessForm.tsx` (remove `id="contact"` anchor)
- Modify: `components/Hero.tsx` (secondary CTA href)
- Modify: `components/Header.tsx` (desktop + mobile CTA href + text)
- Modify: `app/product/page.tsx`, `app/security/page.tsx` (CTA href)

**Interfaces:**
- Consumes: `CONTACT_INTRO`, `CONTACT_QUALIFICATION_NOTICE`,
  `CONTACT_WHAT_HAPPENS_NEXT`, `HOMEPAGE_CONTACT_TEASER`,
  `EARLY_ACCESS_DISCLAIMER`, `CONTACT_EMAIL` from `@/lib/content` (Task 1
  + existing exports). `EarlyAccessForm` from
  `@/components/EarlyAccessForm`. `PageShell`, `Reveal`, `SectionHeading`
  from existing locations.
- Produces: `ContactTeaser` component, consumed by `app/page.tsx`.

- [ ] **Step 1: Create `app/contact/page.tsx`**

```tsx
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { Reveal, SectionHeading } from "@/components/ui";
import { EarlyAccessForm } from "@/components/EarlyAccessForm";
import {
  CONTACT_EMAIL,
  CONTACT_INTRO,
  CONTACT_QUALIFICATION_NOTICE,
  CONTACT_WHAT_HAPPENS_NEXT,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book an AI Desk Audit with Titan Pilot — for professional trading desks evaluating supervised AI decision governance.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <PageShell
      glow={
        <div
          className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-amber/10 blur-[140px]"
          aria-hidden
        />
      }
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.35em] text-cyan">
            {CONTACT_INTRO.eyebrow}
          </p>
          <h1 className="font-display text-balance text-3xl font-bold leading-[1.15] sm:text-4xl">
            {CONTACT_INTRO.title}
          </h1>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-secondary">
            {CONTACT_INTRO.copy}
          </p>
        </Reveal>

        <Reveal className="mx-auto mt-10 max-w-2xl">
          <div className="glass rounded-2xl border border-amber/20 p-6 text-center sm:p-8">
            <p className="text-sm leading-relaxed text-secondary">
              {CONTACT_QUALIFICATION_NOTICE}
            </p>
          </div>
        </Reveal>

        <Reveal className="mx-auto mt-10 max-w-xl">
          <ul className="space-y-2.5">
            {CONTACT_WHAT_HAPPENS_NEXT.map((item, i) => (
              <li key={item} className="flex items-start gap-3 text-sm text-secondary">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border border-white/15 font-mono text-[10px] text-white/60">
                  {i + 1}
                </span>
                {item}
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="mt-8">
          <EarlyAccessForm />
        </div>

        <Reveal className="mx-auto mt-4 max-w-xl text-center">
          <p className="text-sm text-secondary">
            For enterprise enquiries, email{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex items-center gap-1 text-cyan transition-colors hover:text-white"
            >
              {CONTACT_EMAIL}
              <ArrowRight className="size-3.5" aria-hidden />
            </a>{" "}
            directly.
          </p>
        </Reveal>
      </div>
    </PageShell>
  );
}
```

**Note for the implementer:** `EarlyAccessForm` currently renders inside
its own `<section id="contact" className="...py-24 lg:py-32">` wrapper
with its own `SectionHeading` ("Early Access" / "Follow the Build. Join
Early Access.") and its own got/not-got cards. That heading and those
cards are intentionally left as-is in this task — W4b will replace them
when it swaps in the qualified form. Only the `id="contact"` attribute is
removed in Step 2 below, since it is now a dead anchor target (the page is
reached by URL, not by scrolling).

- [ ] **Step 2: Remove the now-dead scroll anchor from `EarlyAccessForm.tsx`**

In `components/EarlyAccessForm.tsx`, change:

```tsx
    <section id="contact" className="relative scroll-mt-20 py-24 lg:py-32">
```

to:

```tsx
    <section className="relative py-24 lg:py-32">
```

(Both `id="contact"` and the now-unused `scroll-mt-20` class are removed
— `scroll-mt-20` only mattered for anchor-scroll offset, which no longer
applies.)

- [ ] **Step 3: Create `components/ContactTeaser.tsx`**

```tsx
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { HOMEPAGE_CONTACT_TEASER } from "@/lib/content";
import { Reveal } from "./ui";

export function ContactTeaser() {
  return (
    <section className="relative py-24 lg:py-32">
      <div
        className="absolute left-1/2 top-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-azure/[0.07] blur-[140px]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="font-display text-balance text-2xl font-bold leading-[1.15] sm:text-3xl lg:text-4xl">
          {HOMEPAGE_CONTACT_TEASER.title}
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-secondary sm:text-lg">
          {HOMEPAGE_CONTACT_TEASER.copy}
        </p>
        <Reveal className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan to-azure px-6 py-3 text-sm font-semibold text-bg shadow-[0_0_24px_-8px_rgba(0,215,255,0.5)] transition-shadow hover:shadow-[0_0_44px_-6px_rgba(0,215,255,0.7)]"
          >
            Book an AI Desk Audit
            <ArrowRight
              className="size-4 transition-transform group-hover:translate-x-0.5"
              aria-hidden
            />
          </Link>
          <Link
            href="/contact"
            className="rounded-lg border border-white/15 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-cyan/40 hover:bg-cyan/5"
          >
            Contact Us
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Swap the homepage import and usage in `app/page.tsx`**

Change:

```tsx
import { EarlyAccessForm } from "@/components/EarlyAccessForm";
```

to:

```tsx
import { ContactTeaser } from "@/components/ContactTeaser";
```

and change:

```tsx
        <EarlyAccessForm />
```

to:

```tsx
        <ContactTeaser />
```

- [ ] **Step 5: Retarget `components/Hero.tsx`'s secondary CTA**

Change:

```tsx
              href="#contact"
```

(the one on the "Book an AI Desk Audit" `motion.a`, immediately below the
"Explore a real decision" primary CTA) to:

```tsx
              href="/contact"
```

- [ ] **Step 6: Retarget and relabel `components/Header.tsx`'s nav CTA (desktop + mobile)**

There are two occurrences. First, the desktop button:

```tsx
          <a
            href="/#contact"
            className="rounded-lg bg-gradient-to-r from-cyan to-azure px-4 py-2 text-sm font-medium text-bg transition-shadow hover:shadow-[0_0_28px_-4px_rgba(0,215,255,0.55)]"
          >
            Join Early Access
          </a>
```

becomes:

```tsx
          <a
            href="/contact"
            className="rounded-lg bg-gradient-to-r from-cyan to-azure px-4 py-2 text-sm font-medium text-bg transition-shadow hover:shadow-[0_0_28px_-4px_rgba(0,215,255,0.55)]"
          >
            Book an AI Desk Audit
          </a>
```

Second, the mobile menu button. Change:

```tsx
              <a
                href="/#contact"
                onClick={() => setOpen(false)}
                className="rounded-lg bg-gradient-to-r from-cyan to-azure px-4 py-2.5 text-center text-sm font-medium text-bg"
              >
                Join Early Access
              </a>
```

to:

```tsx
              <a
                href="/contact"
                onClick={() => setOpen(false)}
                className="rounded-lg bg-gradient-to-r from-cyan to-azure px-4 py-2.5 text-center text-sm font-medium text-bg"
              >
                Book an AI Desk Audit
              </a>
```

- [ ] **Step 7: Retarget the closing CTA on `app/product/page.tsx` and `app/security/page.tsx`**

In `app/product/page.tsx`, change:

```tsx
          <a
            href="/#contact"
            className="rounded-lg border border-white/15 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-cyan/40 hover:bg-cyan/5"
          >
            Book an AI Desk Audit
          </a>
```

to `href="/contact"` (text unchanged).

In `app/security/page.tsx`, change:

```tsx
          <a
            href="/#contact"
            className="group inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan to-azure px-6 py-3 text-sm font-semibold text-bg shadow-[0_0_24px_-8px_rgba(0,215,255,0.5)] transition-shadow hover:shadow-[0_0_44px_-6px_rgba(0,215,255,0.7)]"
          >
            Talk to us about your desk&apos;s security requirements
          </a>
```

to `href="/contact"` (text unchanged).

- [ ] **Step 8: Verify no `#contact` references remain**

Run: `grep -rn "#contact" app components`
Expected: no output (empty).

- [ ] **Step 9: Verify build**

Run: `npm run build`
Expected: succeeds, `/contact` listed among generated static routes, no
type or console errors.

- [ ] **Step 10: Visual + functional check**

Run: `npm run dev`. Confirm:
- Homepage's contact section now shows the teaser (title/copy/two
  buttons), not the 4-field form.
- Both teaser buttons and Hero's "Book an AI Desk Audit" navigate to
  `/contact`.
- Header's nav CTA (desktop and mobile) reads "Book an AI Desk Audit" and
  navigates to `/contact`.
- `/contact` renders the intro, qualification notice, "what happens next"
  list, and the (still 4-field, still mailto) form beneath.
- Submitting the form on `/contact` still opens a mailto draft correctly
  (same behavior as before, just at a new URL).
- No layout overflow at 390×844 / 440×956.

- [ ] **Step 11: Commit**

```bash
git add app/contact/page.tsx components/ContactTeaser.tsx app/page.tsx \
  components/EarlyAccessForm.tsx components/Hero.tsx components/Header.tsx \
  app/product/page.tsx app/security/page.tsx
git commit -m "feat: add /contact route, homepage teaser, retarget all #contact CTAs"
```

---

### Task 5: Footer links + sitemap entries

**Files:**
- Modify: `components/Footer.tsx`
- Modify: `app/sitemap.ts`

**Interfaces:**
- Consumes: `SITE_URL` from `@/lib/content` (already imported in
  `app/sitemap.ts`).

- [ ] **Step 1: Add three links to `components/Footer.tsx`'s "Platform" column**

In the `ul` under the "Platform" heading, immediately after the
`Security` `<li>` (`href="/security"`) and before the `Roadmap` `<li>`
(`href="/#roadmap"`), insert:

```tsx
                <li>
                  <Link href="/research" className="transition-colors hover:text-white">
                    Research
                  </Link>
                </li>
                <li>
                  <Link href="/company" className="transition-colors hover:text-white">
                    Company
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="transition-colors hover:text-white">
                    Contact
                  </Link>
                </li>
```

`Link` is already imported at the top of this file (`import Link from
"next/link";`) — no import changes needed.

- [ ] **Step 2: Add three entries to `app/sitemap.ts`**

Open `app/sitemap.ts`. After the `/security` entry and before the
`/manifesto` entry, insert:

```ts
    { url: `${SITE_URL}/research`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/company`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/contact`, changeFrequency: "monthly", priority: 0.8 },
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: succeeds, no type errors.

- [ ] **Step 4: Verify no dead links**

Run: `npm run dev`, click every Footer link (Product, Architecture,
Security, Research, Company, Contact, Roadmap, FAQ, Manifesto,
Disclaimer). Confirm each resolves to a real page (no 404s).

- [ ] **Step 5: Commit**

```bash
git add components/Footer.tsx app/sitemap.ts
git commit -m "feat: add Research/Company/Contact to footer nav and sitemap"
```

---

## Final Validation (after all 5 tasks)

- [ ] `npm run build` succeeds end-to-end, all 3 new routes plus the
      homepage generate with no console/type errors.
- [ ] `grep -rn "#contact" app components` returns nothing.
- [ ] `grep -rn "text-white/[1-5][0-9]\"" app/company/page.tsx
      app/research/page.tsx app/contact/page.tsx components/ContactTeaser.tsx`
      returns nothing below the `/60` floor (adjust the grep pattern to
      catch any opacity value under 60 if this doesn't catch everything —
      the intent is: no new text below the WCAG AA floor).
- [ ] Full click-through of Header nav, homepage teaser, Hero CTA, Footer
      links, and each new page's content, at desktop and the two mobile
      viewports (390×844, 440×956), confirms no dead links and no layout
      regressions.
- [ ] No banned marketing language anywhere in the new copy (re-read
      Task 1's pasted block once against the Global Constraints list).
