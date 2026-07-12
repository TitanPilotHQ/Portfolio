# Brand Bible — 05. Usage Playbook

Practical tools for anyone producing Titan Pilot copy, decks, or code-adjacent
UI text. Everything here operationalizes `02-voice-and-tone.md` and
`04-principles.md` into things you can actually run against a draft.

## Pre-publish checklist

Run every piece of new external-facing copy (site copy, deck slide, social post,
sales email, investor update) through this list before it ships:

- [ ] **Sourced** — every factual or quantitative claim traces to the claims
      register, a cited principle, or a direct, dated statement from Emad. If
      you can't point to the source, cut the claim or route it through the
      claims-register process first (see `06-governance.md`).
- [ ] **No banned language** — checked against the table in
      `02-voice-and-tone.md`. Specifically scan for: "guaranteed," "profitable,"
      "returns," "performance," "win rate," any implied regulatory approval, any
      implied team size or customer count not in the claims register.
- [ ] **Tense discipline** — present-tense claims describe only what's certified
      /shipped today; future capability is explicitly marked as roadmap
      ("designed — next," "evidence-gated — future," not implied as available
      now).
- [ ] **Concession present in any comparison** — if the copy compares Titan
      Pilot to an alternative, it names something the alternative does better.
- [ ] **Disclaimer present where required** — any content describing product
      capability near trading/financial outcomes carries (or links to) the
      standard disclaimer: "Titan Pilot is a software infrastructure project.
      Nothing on this website is financial advice, investment advice, or a
      promise of trading performance. Trading involves risk."
      (`lib/content.ts:316-317`)
- [ ] **Mechanism, not adjective** — every capability claim names the mechanism
      or number behind it (see Voice Pillar 1 and 5 in `02-voice-and-tone.md`).
- [ ] **Visual system respected** — if the piece has a visual component, it
      uses the tokens in `03-visual-identity.md`, not ad hoc colors/fonts.

## Claim decision tree

Use this when unsure whether a new statement can ship:

```
Is this a factual claim about capability, reliability, results, or company
status?
│
├─ NO (it's a principle, opinion, or category positioning)
│   → Check it against 04-principles.md for consistency, ship if aligned.
│
└─ YES
    │
    ├─ Does it match a row already in docs/content/PUBLIC_CLAIMS_REGISTER.md?
    │   ├─ YES → Use the register's exact public-safe wording. Do not
    │   │         embellish or generalize it further.
    │   └─ NO  → Continue.
    │
    ├─ Is it about trading performance, returns, or profitability?
    │   └─ YES → STOP. This is a hard-banned claim category. Do not ship in
    │             any form, regardless of hedging language ("may," "could").
    │
    ├─ Is there a real, dated, sourced engineering record for it (a doc,
    │   test result, or audit finding — even if not yet in the register)?
    │   ├─ YES → Add a row to the claims register first (owner: Emad), then
    │   │         ship using the register's wording convention.
    │   └─ NO  → Do not ship. This is fabrication. If the fact doesn't exist
    │             yet, the claim doesn't exist yet either.
    │
    └─ Is it a statement about company stage, team, or customers?
        └─ Cross-check against 01-identity.md ("Company stage") and the
           never-claims list. If it overstates scale, cut it back to the
           literal, current truth.
```

## Copy templates

Fill-in-the-blank structures that already match the house voice — use these as
starting scaffolds, not verbatim text (every `[bracket]` must be replaced with a
real, sourced fact or removed if none exists).

**Capability statement (mechanism-first):**
> [Condition/trigger] → [deterministic response], not [implied but false
> alternative]. (Source: [claims register row # or file:line])
>
> Example (real): "Unknown broker state → Halt. Ambiguous execution evidence →
> Halt. AI provider failure → No signal." (`lib/content.ts:140-148`)

**Competitive comparison row:**
> [Alternative] is better at [real, specific thing]. Titan Pilot is built for
> [specific different use case], with [named mechanism] instead.
>
> Example (real): "They show you the market or a signal. Titan Pilot shows you
> a decision you can cross-examine." (`lib/content.ts:418-419`)

**Stage/status statement:**
> [Capability] — [status word from: Certified / Built / Live / Running /
> Designed — next / Evidence-gated — future] — [one sentence describing what
> that status concretely means].
>
> **Guard: "Live," "Certified," "Built," and "Running" are only for
> infrastructure/data-pipeline capabilities (MT5 bridge, event spine, replay
> verification). Never attach any of these words to a trading- or
> execution-related capability — those always use the three-stage Autonomy
> Ladder language ("Certified — current" / "Designed — next" /
> "Evidence-gated — future") instead of a bare status word, per Voice Pillar 3
> in `02-voice-and-tone.md`.**
>
> Example (real, infrastructure): "Shadow AI pipeline — Certified — Phase C.5
> certified; signals recorded with dossier, score, and hash artifacts."
> (`lib/content.ts:151-182`)
>
> Example (real, trading/execution — note the different pattern): "Shadow —
> Certified — current — The full pipeline runs on real market data with real
> AI calls... Nothing is executed." (`lib/content.ts:349-353`)

**Principle-title pattern (for any new internal doctrine, e.g. in a future
module):**
> [Short declarative clause, 3-6 words]. [One sentence explaining the rule and,
> where relevant, what happens on violation.]
>
> Example (real): "Unknown state means stop. When broker truth and internal
> books disagree, or execution evidence is ambiguous, the system halts.
> Guessing is not a recovery strategy." (`lib/content.ts:303-304`)

## Common mistakes (from patterns this playbook exists to prevent)

- Writing "our AI trades for you" style copy because it's punchier — banned,
  contradicts Manifesto Principle 1 and the entire disclaimer framework.
- Describing Copilot Mode or Autonomous Demo as available now because the
  roadmap page lists it — always check current status word, not roadmap
  presence.
- Rounding "1,662 of 1,662" to "100%" or "perfect" — the exact figure is the
  point; a rounded superlative loses the evidentiary weight and starts to read
  like a marketing claim rather than a measurement.
- Adding a customer logo, testimonial, or "trusted by" strip without a real,
  consented customer — explicitly banned by the never-claims list ("customers
  we don't have").

## Maintenance

Add a new template here only once a real piece of copy has used the pattern
successfully — templates should generalize from shipped copy, not anticipate
copy that hasn't been written yet.
