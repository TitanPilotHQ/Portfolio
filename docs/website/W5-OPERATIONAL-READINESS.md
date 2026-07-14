# W5 — Operational Readiness

Site-wide production readiness: health checks, deployment verification,
rollback, and monitoring expectations. For Resend/Upstash-specific setup
and env var values, see `docs/deployment/w4b-deployment-checklist.md` —
this document doesn't restate that one, it covers the rest of the site.

## Environment-variable inventory (names only, no values)

| Variable | Required for | Behavior if missing |
|---|---|---|
| `RESEND_API_KEY` | Contact-form email delivery (`lib/server/notification.ts`) | `getNotificationProvider()` throws at first use — contact submissions fail closed with a 500, user is told to email directly |
| `IP_HASH_SALT` | Rate-limit key hashing (`lib/server/hashIp.ts`) | `hashIp()` throws — contact submissions fail closed with a 500 |
| `UPSTASH_REDIS_REST_URL` | Lead storage + persistent rate limiting (`lib/server/leadStore.ts`, `lib/server/rateLimit.ts`) | `getLeadStore()` throws (lead storage fails closed); `getRateLimiter()` degrades gracefully to an **in-memory** limiter — see "Known limitation" below |
| `UPSTASH_REDIS_REST_TOKEN` | Same as above (paired with the URL) | Same as above |

No other environment variables are read anywhere in the codebase
(`grep -r "process.env\." --include="*.ts" --include="*.tsx"`, verified
2026-07-14).

**Known limitation, not fixed in this pass:** if Upstash env vars are
absent, rate limiting silently falls back to `MemoryRateLimiter`
(`lib/server/rateLimit.ts`) — an in-process counter that resets on every
serverless cold start. On Vercel's default (non-Fluid, or Fluid without
warm reuse) this means rate limiting could be materially weaker than
intended without any error or log line indicating degraded mode. This is
acceptable given Upstash is a hard-required, already-documented
prerequisite for lead storage (missing it breaks the form entirely, which
would be caught immediately) — but worth knowing this specific
degradation exists rather than assuming rate limiting is Upstash-backed
by default.

## Production health / smoke checklist

Run after every production deploy, before considering it verified:

1. `curl -I https://www.titanpilot.app/` → `200`, and confirm all six
   security headers are present (`X-Content-Type-Options`,
   `Referrer-Policy`, `Permissions-Policy`, `X-Frame-Options`,
   `Strict-Transport-Security`, `Content-Security-Policy`).
2. Load the homepage in a real browser, open DevTools console — zero
   errors (the `/_vercel/insights` and `/_vercel/speed-insights` 404s
   seen in local `next start` testing are a local-only artifact; on real
   Vercel infrastructure these routes exist and must return `200`, not
   `404` — if they 404 in production, Analytics/Speed Insights are
   silently not collecting data).
3. Load each of the 8 public routes (`/`, `/product`, `/architecture`,
   `/security`, `/research`, `/company`, `/contact`, `/manifesto`,
   `/disclaimer` — 9 total) and confirm each returns `200` with a unique
   `<title>`.
4. `curl -I https://www.titanpilot.app/does-not-exist` → `404`.
5. `curl https://www.titanpilot.app/sitemap.xml` and
   `curl https://www.titanpilot.app/robots.txt` → both `200`, sitemap
   lists exactly the 9 routes above.
6. Submit one real contact-form submission (see
   `w4b-deployment-checklist.md` §7 — already documents this) and confirm
   the email arrives and a lead record appears in Upstash.
7. Confirm `<Analytics />` and `<SpeedInsights />` are receiving real
   data in the Vercel dashboard within a few minutes of the smoke test
   (this is the one signal that can't be verified via `curl`/local
   testing — see the audit's synthetic-vs-real-user-CWV note below).

## Deployment verification

- Vercel's own preview-deployment status checks (`Vercel – portfolio`,
  `Vercel – titan-site`) must be green on the PR before merge — this repo
  has no GitHub Actions CI; Vercel's build+preview check is the only
  automated gate.
- After merge, confirm the production deployment in the Vercel dashboard
  shows **Ready**, not **Error** or **Canceled**, before running the
  smoke checklist above.
- `npm run build` must succeed locally with zero errors before opening
  any PR (matches what Vercel's build step will run) — `npx tsc --noEmit`
  first is faster feedback for type errors specifically.

## Rollback procedure

1. **Fastest path — Vercel instant rollback:** Vercel dashboard →
   Deployments → find the last known-good production deployment → **...**
   → **Promote to Production**. This does not require a git revert or new
   build; it repoints production traffic to an already-built deployment
   in seconds.
2. **Git-level rollback** (if the bad deploy also needs to stop being the
   tip of `main`, e.g. before more work lands on top of it):
   `git revert <bad-merge-commit-sha>` on a new branch, PR, merge — do
   not force-push over `main` history.
3. After either rollback path, re-run the production health/smoke
   checklist above against the now-live deployment to confirm the
   rollback actually resolved the issue.

## Error-monitoring expectations

- No dedicated error-tracking service (Sentry or equivalent) is wired
  into this project — errors surface through two channels only: Vercel's
  own function logs (`console.error` calls in `app/api/contact/route.ts`
  are visible there) and `<SpeedInsights />`/`<Analytics />`'s Web Vitals
  data.
- **Lead-delivery failure:** if both Resend and Upstash fail for a given
  submission, the user sees a message asking them to email the team
  directly — but per this pass's fix, the failure log no longer includes
  the full lead record (PII), only the `leadId` and error. This means a
  double-failure is **not recoverable from logs alone**. Documented
  manual-verification path: periodically check Vercel function logs for
  `[contact] lead storage failed` / `[contact] notification send failed`
  entries; a `leadId` appearing in the storage-failure log with no
  matching entry in Resend's dashboard confirms email also failed for
  that submission, and the visitor would have been shown the "email us
  directly" fallback message.
- No automated alerting (e.g., a Slack/email webhook on repeated 500s)
  exists. This is a real gap for a production launch, not something this
  pass builds — flagged in the findings register as deferred, needing an
  owner decision on what alerting channel to wire up.

## Post-deploy checklist

- [ ] Run the production health/smoke checklist above.
- [ ] Confirm Vercel Analytics/Speed Insights are receiving real data
      (not just that the scripts loaded).
- [ ] Pull real-user Core Web Vitals from the Vercel dashboard 24-48h
      after deploy and compare against this pass's synthetic Lighthouse
      numbers (`W5-FINDINGS-REGISTER.md` — Performance section) — the
      2026-07-10 audit flagged this same follow-up and it was never
      completed; still open.
- [ ] Confirm no CSP violations appear in real-user browser reports (this
      CSP has no `report-uri`/`report-to` configured, so violations are
      currently silent in production — visible only via manual DevTools
      inspection of a real session, not proactively reported. Adding CSP
      reporting is a reasonable future improvement, not done in this
      pass).
