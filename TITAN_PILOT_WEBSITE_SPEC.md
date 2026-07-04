# Titan Pilot Website Build Specification

## Objective
Build a premium, state-of-the-art marketing website for **Titan Pilot** at `titanpilot.app`, hosted on Vercel. This is the public brand website, not the trading application. The future application/dashboard will live at `bot.titanpilot.app`.

The website must position Titan Pilot as an **enterprise-grade AI trading infrastructure platform**, not as a generic retail trading bot. It should feel like a mix of **OpenAI, Apple, Linear, Stripe, Vercel, and NVIDIA AI**: premium, technical, trustworthy, cinematic, and polished.

---

## Brand Structure

### Company / Brand
**Titan Pilot**

### Flagship Platform
**TITAN**

### Public Website
`titanpilot.app`

### Future App / Dashboard
`bot.titanpilot.app`

### GitHub Organization
`TitanPilotHQ`

---

## Core Positioning
Titan Pilot is building autonomous trading intelligence on top of deterministic, replayable, audit-ready financial infrastructure.

The platform combines:

- AI-assisted market reasoning
- deterministic execution
- immutable event logs
- replay verification
- broker reconciliation
- risk-first controls
- operational hardening
- continuous verification
- fail-closed safety

### Key Philosophy
Use these statements throughout the site:

- **AI reasons. Software decides.**
- **LLMs never compute what deterministic software can prove.**
- **Every decision should be replayable.**
- **Unknown means halt. Ambiguous means halt.**
- **Capital protection comes before signal availability.**

---

## Tone and Copy Style

Write like a serious AI infrastructure company.

Do:
- sound premium
- sound technical
- sound trustworthy
- emphasize engineering rigor
- explain the safety model clearly
- use short, strong sentences
- keep copy crawlable for SEO and AI search

Do not:
- sound like a crypto project
- sound like a get-rich-quick forex bot
- promise profit
- show fake returns
- use exaggerated hype
- use gambling language
- claim live autonomous trading if not stated

---

## Visual Design Direction

### Theme
Dark futuristic AI infrastructure.

### Color Palette
Use a premium dark-neon system:

- Background: `#05070A`
- Surface: `#0B1020`
- Surface elevated: `#111827`
- Primary cyan: `#00D7FF`
- Azure blue: `#0078FF`
- Violet: `#7C3AED`
- Electric purple: `#A855F7`
- Success green: `#22C55E`
- Warning amber: `#F59E0B`
- Text primary: `#FFFFFF`
- Text secondary: `#A7B0C0`
- Border/glow: rgba cyan/blue/violet

### Typography
Use a modern technical font stack:

- Headings: Inter, Geist, Satoshi, or similar
- Body: Inter or Geist Sans
- Code/metrics: JetBrains Mono or Geist Mono

### Design Language
- cinematic hero
- glassmorphism, but restrained
- subtle neon glows
- animated dashboard mockups
- AI nodes / data topology lines
- premium card layouts
- soft grid background
- motion on scroll
- no clutter
- no cheap stock imagery

---

## Required Tech Stack

Use:

- Next.js 15+
- React 19+
- TypeScript
- Tailwind CSS
- Framer Motion
- shadcn/ui if helpful
- Lucide React icons
- Vercel deployment
- Vercel Analytics
- Vercel Speed Insights

Avoid unnecessary heavy dependencies. Use Three.js / React Three Fiber only if it is genuinely useful and does not hurt performance.

---

## Performance Requirements

Target:

- Lighthouse Performance: 90+
- SEO: 95+
- Accessibility: 90+
- Best Practices: 95+
- Mobile responsive
- Fast first load
- No autoplay heavy videos
- Prefer SVG, CSS, and lightweight animation
- All important SEO copy must be crawlable HTML

---

## Site Structure

Create a modern single-page marketing website with section anchors. It may later evolve into multiple pages, but v1 can be a high-end landing page.

Recommended route:

- `/` homepage

Optional future routes, but not required immediately:

- `/architecture`
- `/docs`
- `/roadmap`
- `/contact`

---

## Header / Navigation

Sticky translucent header with blur.

Left:
- Titan Pilot logo
- Text: Titan Pilot

Nav items:
- Product
- Architecture
- AI Model
- Safety
- Roadmap
- Contact

CTA button:
- `Join Early Access`

Secondary CTA:
- `View GitHub` linking to `https://github.com/TitanPilotHQ/Titan`

---

## Hero Section

This must be the strongest section.

### Layout
Left: copy and CTAs  
Right: futuristic animated dashboard / AI trading cockpit visual

### Main Headline
Use one of these, preferably the first:

**Autonomous Trading Intelligence, Built Like Mission-Critical Infrastructure.**

Alternatives:

- **AI Trading Infrastructure Engineered for Markets.**
- **Where AI Reasoning Meets Deterministic Execution.**
- **Replayable. Auditable. AI-Assisted Trading Infrastructure.**

### Subheadline
Titan Pilot combines deterministic software engineering, AI-assisted market reasoning, replayable decision trails, and risk-first automation into an enterprise-grade trading platform.

### CTA Buttons
Primary:
- `Explore the Architecture`

Secondary:
- `Join Early Access`

### Trust Bar / Micro Claims
Use 3–5 short badges:

- Replay Verified
- Risk First
- Event Sourced
- Broker Reconciled
- AI Shadow Mode

### Right Visual
Create a fictional but realistic dashboard mockup showing:

- EURUSD chart
- AI Analysis Score
- Risk Status: Low
- Capital Protection: Active
- AI Agents Consensus
- Recent Signal: Shadow Mode
- Replay / Audit panel

Make it clear this is a product visualization, not a profit claim.

---

## Section 1 — Why Titan Pilot

Headline:
**Built for Traders Who Care About What Happens After the Signal.**

Copy:
Most trading systems focus on entries. Titan Pilot focuses on the entire lifecycle: analysis, validation, execution, reconciliation, recovery, replay, and auditability.

Cards:

### Deterministic by Design
Every computable signal is generated by software, not guessed by a model.

### AI-Powered Insight
LLMs reason over structured market dossiers instead of raw candle noise.

### Risk First, Always
Capital protection, hard limits, and fail-closed behavior sit below every AI decision.

### Replayable Decisions
Each trade can be reconstructed from immutable events and verified after the fact.

---

## Section 2 — Core Architecture

Headline:
**A Trading Platform Built Like Infrastructure.**

Create an animated architecture diagram:

```
Market Data
  → Dossier Builder
  → AI Analyst
  → Devil's Advocate
  → Deterministic Scorer
  → Trading Gate
  → Risk Gate
  → MT5 Execution
  → Broker Reconciliation
  → Event Log
  → Replay / Verify
```

Explain each layer briefly:

### Market Dossier
Structured multi-timeframe data computed by deterministic modules.

### AI Reasoning
Agents reason, challenge, and explain. They do not execute.

### Deterministic Scoring
Pure code combines evidence, objections, macro risk, and cost constraints.

### Risk Gate
Final deterministic risk authority before any execution path.

### Broker Reconciliation
Broker truth is compared against TITAN books. Unknown or ambiguous state halts.

### Replay Verification
State is rebuilt from immutable events to prove the system has not drifted.

---

## Section 3 — Inside Every Decision

Headline:
**Every Signal Leaves Evidence.**

Create a horizontal timeline:

1. H1 candle closes
2. Pre-gate checks market conditions
3. Dossier is built and hashed
4. Technical Analyst produces thesis
5. Devil's Advocate challenges it
6. Deterministic scorer calculates result
7. Signal is recorded in shadow mode
8. Risk engine remains final authority
9. Replay can reconstruct the full story

Short copy:
Titan Pilot does not treat AI output as magic. Every prompt, model, response, score, and decision is recorded as structured evidence.

---

## Section 4 — AI Philosophy

Headline:
**AI Reasons. Software Decides.**

Large quote block:
**LLMs never compute what deterministic software can prove.**

Supporting copy:
The AI layer works from a versioned market dossier. It never calculates indicators, never sees raw candles, and never bypasses deterministic risk controls. If AI fails, trading activity reduces to zero. It never increases risk.

Cards:

### Dossier First
AI receives structured, validated context.

### Adversarial Review
Every thesis is challenged before scoring.

### No Guessing
Malformed, ambiguous, or unsupported outputs are rejected.

### Shadow Before Autonomy
The system earns promotion through evidence, not optimism.

---

## Section 5 — Safety and Capital Protection

Headline:
**The System Is Designed to Stop Before It Guesses.**

Explain safety behavior:

- Unknown broker state → halt
- Ambiguous execution evidence → halt
- AI provider failure → no signal
- Budget exhausted → no signal
- Calendar/news stale → widen no-trade window
- Database unavailable → no trading
- Replay drift → alert and investigate

Use a premium warning/safety visual: shield, circuit breaker, audit trail.

---

## Section 6 — Infrastructure Milestones

Headline:
**Production Infrastructure Before Intelligence.**

Use metric cards. Do not invent numbers beyond the known architecture unless you phrase them generally.

Suggested cards:

- Infrastructure v1.0.0 Certified
- Real MT5 Bridge Validated
- PostgreSQL Event Spine
- Replay Verification
- PITR + Offsite Backups
- Continuous Health Checks
- Telegram Critical Alerts
- Shadow AI Pipeline

Short copy:
Titan Pilot’s foundation was built before the AI layer: deployment, broker bridge, event sourcing, reconciliation, crash recovery, replay, backup verification, and operational health.

---

## Section 7 — Technology Stack

Headline:
**Built on Proven Engineering Primitives.**

Show tech badges:

- Next.js
- Python
- PostgreSQL
- TimescaleDB
- MT5
- MetaTrader 5
- Docker
- Vercel
- Anthropic
- OpenAI
- Telegram Alerts
- GitHub Actions

Do not make the site look like a random logo wall. Make it clean and premium.

---

## Section 8 — Product Modes

Headline:
**A Ladder from Observation to Autonomy.**

Show 3-stage ladder:

### Shadow Mode
AI runs, records decisions, and learns from market outcomes. No orders.

### Copilot Mode
AI proposes. Human approves or rejects. Rejections become evaluation data.

### Autonomous Demo
Only after objective evidence, explicit approval, and safety gates.

Add note:
Live-money autonomy is outside the current public promise and must remain evidence-gated.

---

## Section 9 — Roadmap

Headline:
**A Measured Path to Autonomous Market Intelligence.**

Timeline:

1. Infrastructure Core — completed
2. Data Spine — completed
3. Replay and Verification — completed
4. Operational Hardening — completed
5. AI Architecture — completed
6. AI Shadow Mode — in validation
7. Copilot Mode — upcoming
8. Autonomous Demo — evidence-gated
9. Institutional Platform — future

Make roadmap visually beautiful.

---

## Section 10 — Early Access / Contact

Headline:
**Follow the Build. Join Early Access.**

Copy:
Titan Pilot is currently validating its AI shadow pipeline on production infrastructure. If you are interested in AI trading infrastructure, autonomous systems, or technical collaboration, join early access.

Fields:
- Name
- Email
- Role
- Message

CTA:
- `Request Early Access`

For now, form can be static or integrate with simple server action. If no backend is desired yet, use mailto or placeholder with clear TODO.

---

## Footer

Include:

- Titan Pilot
- AI Trading Infrastructure
- GitHub link
- LinkedIn link placeholder
- Website: titanpilot.app
- Disclaimer

Disclaimer:
Titan Pilot is a software infrastructure project. Nothing on this website is financial advice, investment advice, or a promise of trading performance. Trading involves risk.

---

## SEO Requirements

### Metadata Title
Titan Pilot — AI Trading Infrastructure Built for Replayable, Risk-First Automation

### Metadata Description
Titan Pilot is an AI trading infrastructure platform combining deterministic execution, replayable decisions, broker reconciliation, risk controls, and AI-assisted market reasoning.

### Keywords to Use Naturally
- AI trading infrastructure
- autonomous trading platform
- algorithmic trading
- AI trading agents
- deterministic execution
- trading automation
- broker reconciliation
- MetaTrader 5 automation
- MT5 trading infrastructure
- replayable trading decisions
- financial AI
- risk-first trading automation
- event-sourced trading platform
- AI market analysis
- forex automation

### AEO / GEO Content Requirements
Include sections answering these questions in crawlable text:

1. What is Titan Pilot?
2. How does Titan Pilot use AI?
3. Does AI execute trades directly?
4. How does Titan Pilot manage risk?
5. What makes Titan Pilot different from a typical trading bot?
6. What is replayable trading infrastructure?
7. Why does Titan Pilot use shadow mode before autonomy?
8. What technologies power Titan Pilot?

These can be in an FAQ section near the bottom.

---

## FAQ Section

Add a polished FAQ accordion.

### What is Titan Pilot?
Titan Pilot is an AI trading infrastructure platform designed around deterministic execution, AI-assisted reasoning, replayable decisions, and risk-first automation.

### Is Titan Pilot a trading bot?
Titan Pilot is more than a trading bot. It is an infrastructure platform that combines market analysis, AI reasoning, risk gates, broker reconciliation, event sourcing, and replay verification.

### Does AI place trades directly?
No. AI may propose signals, but deterministic software gates, scores, validates, and controls execution.

### What is shadow mode?
Shadow mode runs the full AI pipeline without placing orders. It records signals and outcomes so the system can be evaluated before promotion.

### How does Titan Pilot reduce risk?
Titan Pilot uses deterministic pre-gates, risk gates, broker reconciliation, circuit breakers, replay verification, budget limits, and fail-closed behavior.

### What markets does Titan Pilot support?
The current validation focus is EURUSD on MetaTrader 5 infrastructure. Broader market support is future roadmap work.

### Is this financial advice?
No. Titan Pilot is software infrastructure. Nothing on the website is financial or investment advice.

---

## Animation Requirements

Use Framer Motion for:

- hero entrance
- dashboard floating motion
- card reveal on scroll
- timeline reveal
- architecture diagram pulse
- metrics count-up
- FAQ expand/collapse
- CTA hover effects

Keep animations smooth and premium, not excessive.

---

## Component Suggestions

Create reusable components:

- `Header`
- `HeroSection`
- `GlassCard`
- `ArchitectureDiagram`
- `DecisionTimeline`
- `MetricCard`
- `SafetyGrid`
- `ProductModeLadder`
- `RoadmapTimeline`
- `TechStack`
- `FAQ`
- `EarlyAccessForm`
- `Footer`
- `AnimatedGridBackground`
- `DashboardMockup`

---

## Copy Snippets to Use

### Hero eyebrow
AI Trading Infrastructure

### Hero headline
Autonomous Trading Intelligence, Built Like Mission-Critical Infrastructure.

### Hero subheadline
Titan Pilot combines deterministic engineering, AI-assisted market reasoning, replayable decision trails, and risk-first automation into a platform designed for serious market systems.

### Safety quote
When the system cannot prove what happened, it stops.

### AI quote
AI reasons. Software decides.

### Infrastructure quote
Every decision should be replayable.

### CTA text
Explore the Architecture
Join Early Access

---

## Implementation Instructions for Codex

1. Create a fresh Next.js app if none exists.
2. Use TypeScript and Tailwind CSS.
3. Build a polished single-page site first.
4. Keep content in structured arrays where possible.
5. Make it easy to update copy and sections later.
6. Use semantic HTML for SEO.
7. Add metadata in `app/layout.tsx`.
8. Add Open Graph and Twitter metadata.
9. Ensure mobile, tablet, and desktop layouts are excellent.
10. Add Vercel-ready configuration.
11. Ensure `npm run build` passes.
12. Keep code clean, modular, and production-ready.

---

## Domain Deployment Plan

- Deploy marketing website to Vercel.
- Map root domain: `titanpilot.app`.
- Future product app will live at: `bot.titanpilot.app`.
- Do not put the real trading dashboard on the marketing root domain.

---

## Final Acceptance Criteria

The website is complete when:

- It looks premium and futuristic.
- It is responsive across mobile, tablet, and desktop.
- It clearly explains Titan Pilot.
- It avoids fake profit claims.
- It differentiates Titan Pilot from generic trading bots.
- It has strong SEO/AEO/GEO structure.
- It has a beautiful architecture section.
- It has a clear early access CTA.
- Lighthouse SEO is strong.
- `npm run build` passes.
- It is ready for Vercel deployment.
