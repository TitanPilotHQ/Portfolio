# Titan Pilot — Marketing Site

The public marketing site for Titan Pilot, an AI-trading-infrastructure
company. Built on Next.js 15 (App Router), React 19, TypeScript, and
Tailwind v4. Deployed on Vercel, live at
[titanpilot.app](https://titanpilot.app).

## Status

**W4 complete** (2026-07-12) — the site has a working, production-verified
lead-generation flow: a qualified-lead contact form backed by a real API
route, real email notification (Resend), and real lead storage (Upstash).
See [`CHANGELOG.md`](./CHANGELOG.md) for the full slice-by-slice history
and current status of every phase (W0–W5).

**W2 (real Evidence Explorer) is blocked** on a sanitized, certified
decision-record fixture from Titan's production event log — no other work
is pending on it.

**W5** (accessibility/performance/SEO/AEO/GEO/security polish) has not
started. See the `Production Hardening` backlog item for known,
non-blocking gaps to close before public launch.

## Routes

| Route | Purpose |
|---|---|
| `/` | Homepage |
| `/product` | Product overview |
| `/architecture` | System architecture |
| `/security` | Security posture |
| `/research` | Research philosophy, pipeline, standards |
| `/company` | Founder, mission, principles, timeline |
| `/contact` | Qualified-lead contact form |
| `/manifesto` | Manifesto |
| `/disclaimer` | Disclaimer |
| `POST /api/contact` | Contact form submission endpoint |

## Local development

```bash
npm install
npm run dev
```

The contact form's backend requires environment variables — see
[`docs/deployment/w4b-deployment-checklist.md`](./docs/deployment/w4b-deployment-checklist.md)
for the full Resend/Upstash/Vercel setup, and add the required values to a
local `.env.local` (gitignored):

```
RESEND_API_KEY=...
IP_HASH_SALT=...        # self-generated: openssl rand -hex 32
UPSTASH_REDIS_REST_URL=...
UPSTASH_REDIS_REST_TOKEN=...
```

Without `UPSTASH_REDIS_REST_URL`/`TOKEN`, rate limiting falls back to an
in-memory implementation (fine for local dev). `LeadStore` has no such
fallback — it throws without real Upstash credentials, by design, since
silently losing a real lead is unacceptable.

```bash
npm run build   # production build + typecheck
npm run lint    # eslint
```

There is no automated test suite for this repo yet (tracked as a known W0
finding) — validation is `npm run build` plus manual exercise of every
path, consistent across every slice so far.

## Working conventions

This repo follows a spec → plan → subagent-driven-implementation → review
workflow (see `docs/superpowers/specs/` and `docs/superpowers/plans/` for
every slice's design history). Standing practice: every change ships on
its own branch, through a PR, reviewed against a Vercel Preview deployment
before merging to `main` — including low-risk changes.

Claims made in site copy are tracked in
[`docs/content/PUBLIC_CLAIMS_REGISTER.md`](./docs/content/PUBLIC_CLAIMS_REGISTER.md)
— no public claim ships without a sourced row there.

## Tech stack

- **Framework**: Next.js 15 (App Router), React 19, TypeScript
- **Styling**: Tailwind v4, Framer Motion
- **Contact backend**: Zod validation, Resend (email), Upstash Redis (lead
  storage + rate limiting)
- **Analytics**: Vercel Analytics + Speed Insights
- **Hosting**: Vercel
