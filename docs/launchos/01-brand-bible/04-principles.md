# Brand Bible — 04. Principles

Titan Pilot's live copy states three overlapping-but-distinct principle sets:
Manifesto Principles (why the company exists), Product Principles (how the
product is built), and Company Principles (how the company operates). This file
reproduces all three verbatim, unified as the brand's single principle system,
since every other LaunchOS module should cite *this* file rather than re-deriving
principles independently.

## Manifesto Principles — why the company exists
*(Source: `lib/content.ts:289-314`)*

1. **Reasoning is not authority.** "AI can explain a market thesis, challenge
   assumptions, and summarize conflicting evidence. It should not be the final
   authority over capital. Execution authority belongs to deterministic
   software, explicit risk rules, and broker-verified state."
2. **Capital protection outranks opportunity.** "No signal is worth an unbounded
   loss. Hard limits, budgets, and circuit breakers sit below every decision —
   and they cannot be argued with."
3. **Every decision must be replayable.** "Every prompt, model, response, score,
   and gate result is recorded as immutable events. If a decision cannot be
   reconstructed, it should not have happened."
4. **Unknown state means stop.** "When broker truth and internal books
   disagree, or execution evidence is ambiguous, the system halts. Guessing is
   not a recovery strategy."
5. **Automation earns trust through evidence.** "Promotion from shadow mode
   toward autonomy is gated on recorded outcomes, explicit approval, and safety
   gates — never on optimism."
6. **AI should explain, challenge, and document — not override deterministic
   controls.** "The AI layer works from a versioned dossier. It never
   calculates indicators, never sees raw candles, and never bypasses risk
   controls. If AI fails, trading activity reduces to zero."

## Product Principles — how the product is built
*(Source: `lib/content.ts:319-336`)*

1. **Evidence or it didn't happen.** Model output is visibly tagged as model
   output, tied to exact dossier data; deterministic numbers are visibly tagged
   as deterministic. "The two are never allowed to look the same."
2. **The default action is nothing.** Signals not acted on expire to nothing —
   "doing nothing is usually the correct outcome — not a failure state."
3. **Two states of gravity.** Most UI is "light" (read-only, fast); approving a
   trade or kill switch is "heavy" (full-screen, deliberate, two steps, fully
   audited). "Nothing consequential ever happens from a hover or a swipe."
4. **Reconstructable past.** Every decision can answer "as of when?" — "History
   is never silently re-rendered with today's code."

Plus two product doctrines:
- **Never-Guess** — "An unrecognized event halts processing rather than being
  skipped. A reconciliation mismatch that matches no known pattern halts
  trading and pages a human. An AI output that fails a contract check is
  rejected with a closed reason code — there is no best-effort parse."
- **Fail-Closed** — "Every failure mode collapses toward no action... A 48-hour
  certification soak exercised every one of these paths in production, and
  each produced an explained, auditable outcome."

## Company Principles — how the company operates
*(Source: `lib/content.ts:488-495`)*

1. **Evidence over Claims** — "Every public statement traces to a sourced,
   dated engineering record — not marketing language."
2. **Human Accountability** — "AI reasons; a human or a deterministic rule
   approves. Every consequential action has an accountable owner."
3. **Fail Closed** — "When something is uncertain, broken, or unverifiable, the
   system stops rather than guesses."
4. **Deterministic Risk** — "Risk limits are enforced by rules the AI cannot
   loosen — not by asking the AI to behave."
5. **Replay Everything** — "Every recorded decision can be replayed and
   re-verified, not just logged and forgotten."
6. **Security by Default** — "Least-privilege access, sanitized backups, and
   blast-radius containment are structural, not optional configuration."

## What Titan Pilot will never claim
*(Source: `lib/content.ts:497-504`, `COMPANY_NEVER_CLAIMS`)*

- Guaranteed or predicted trading returns
- Licensed financial or investment advice
- A large team, institutional backing, or customers Titan Pilot doesn't have
- Regulatory approval, certification, or endorsement not received
- Peer-reviewed research or academic partnerships that don't exist
- Endorsement by any employer — Titan Pilot is independent of Emad's employment

## Research doctrine
*(Source: `lib/content.ts:523-530,547-558`)*

Principles: evidence before claims; reproducibility; replayability; public
correction of mistakes; transparent methodology; versioned publications.

Every publication standard: methodology, datasets (where legally possible),
assumptions, limitations, version history, errata, reproducibility notes.

"We prefer publishing later with evidence rather than earlier with speculation."
(`lib/content.ts:562`) — this line generalizes beyond research publications to
every LaunchOS module: a module stays unbuilt (see the master plan's "Blocked"
status) rather than being filled with speculative content.

## How the three principle sets relate

The Manifesto Principles are the founding philosophy — the "why." The Product
Principles are that philosophy applied to interface and system design — the
"how it's built." The Company Principles are that same philosophy applied to
how the business itself is run — the "how we operate." All three share the same
underlying commitments (evidence, human accountability, fail-closed behavior,
deterministic limits, full replayability) restated for a different audience.
When drafting any new principle for a future module (e.g., a Hiring OS principle
about how the company evaluates candidates), it must be traceable to one of
these three sets or explicitly justified as a genuinely new commitment — not a
restatement with different words.

## Using this file

Every LaunchOS module that makes a claim about capability, reliability, ethics,
or company conduct should cite the specific principle it's applying, e.g.
"(Company Principle 3: Fail Closed)" rather than re-explaining the reasoning
from scratch. This keeps 16 modules consistent without duplicating content.
