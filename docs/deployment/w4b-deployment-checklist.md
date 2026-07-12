# W4b Deployment Checklist — Resend + Upstash + Vercel

This is an operational checklist, not code — most steps are dashboard
actions Emad performs directly. Follow in order; later steps depend on
values captured in earlier ones. Nothing here should be committed to the
repo (no `.env` files, no raw keys in commit messages).

## 1. Resend setup

- [ ] Create a Resend account (or sign in) at resend.com, using the
      email you want tied to billing/ownership for this project.
- [ ] Create a new API key: **Resend dashboard → API Keys → Create API
      Key**. Name it something identifiable (e.g. `titanpilot-contact-
      prod`). Scope: "Sending access" is sufficient — no need for full
      account access.
- [ ] Copy the key immediately (Resend shows it once). This is
      `RESEND_API_KEY` — goes into Vercel env vars in Section 5, never
      into the repo.
- [ ] Consider creating a **second** API key scoped for Preview
      deployments (e.g. `titanpilot-contact-preview`) if you want to
      keep preview-triggered test emails auditable separately from
      production sends — optional, a single key reused for both is also
      fine at this volume.

## 2. Domain verification (required before sending)

Resend requires the sending domain to be verified before it will deliver
mail from that domain — this is what makes `noreply@titanpilot.app` a
legitimate sender rather than getting flagged as spoofed.

- [ ] **Resend dashboard → Domains → Add Domain** → enter `titanpilot.app`.
- [ ] Resend will show a set of DNS records to add (typically: one or
      more `TXT` records for domain verification, `DKIM` `CNAME`/`TXT`
      records for signing, and optionally an `MX`/`TXT` pair if you want
      to also receive mail — not needed here since this domain only
      *sends* the contact-form notification, it doesn't need to receive
      anything new).
- [ ] Add each record Resend shows you to your DNS provider for
      `titanpilot.app` (wherever that domain's DNS is currently managed
      — check the existing `www.titanpilot.app` CNAME/A record's
      provider if unsure).
- [ ] Return to the Resend dashboard and click **Verify** (or wait — DNS
      propagation can take anywhere from a few minutes to a few hours).
      Domain status must show **Verified** before moving on.
- [ ] Confirm the sender address `noreply@titanpilot.app` (used in
      `lib/server/notification.ts`'s `FROM_ADDRESS` constant) is valid
      once the domain is verified — Resend allows any local-part
      (`noreply@`, `hello@`, etc.) on a verified domain, no separate
      per-address setup needed.

## 3. DNS changes (summary — exact records come from Resend's dashboard in Section 2)

- [ ] No change needed to the existing `www.titanpilot.app` A/CNAME
      record (Vercel's existing production pointer) — this is purely
      additive DNS for Resend's sending verification, not a change to
      how the site itself resolves.
- [ ] If DNS is managed somewhere with change-approval friction
      (registrar UI, a shared account, etc.), get these records queued
      up as early as possible — verification can't proceed until they
      propagate, and this is usually the slowest step in this whole
      checklist.

## 4. Upstash provisioning

- [ ] Create an Upstash account (or sign in) at upstash.com.
- [ ] **Create Database** → Redis → choose a region close to Vercel's
      primary deployment region for this project (check Vercel project
      settings for the configured region; pick the nearest Upstash
      region to minimize latency on every `/api/contact` call).
- [ ] Free tier is sufficient for this volume (low-traffic B2B contact
      form) — no need to provision a paid tier at launch.
- [ ] From the database's dashboard page, copy:
      - **UPSTASH_REDIS_REST_URL** (the REST API endpoint URL)
      - **UPSTASH_REDIS_REST_TOKEN** (the REST API token)
      Both go into Vercel env vars in Section 5.
- [ ] Optional but recommended: create a **second, separate** Upstash
      database for Preview deployments, so preview-triggered rate-limit
      counters and test leads don't mix with production data. If you'd
      rather keep it simple, one database for both is acceptable —
      preview test submissions will just show up as real-looking (but
      clearly test) entries in the same `leads:*` keyspace.

## 5. Environment variables (Vercel)

Set these in **Vercel dashboard → titan-site project → Settings →
Environment Variables**. Scope each to the right environment(s) — do not
blanket-apply a Preview-only test key to Production or vice versa.

| Variable | Value | Environments |
|---|---|---|
| `RESEND_API_KEY` | from Section 1 | Production (+ Preview if using a shared key) |
| `IP_HASH_SALT` | a long random string you generate yourself — e.g. run `openssl rand -hex 32` locally and paste the output; this is NOT a Resend/Upstash-issued value, just a secret you invent | Production, Preview, and your local `.env.local` |
| `UPSTASH_REDIS_REST_URL` | from Section 4 | Production (+ Preview if using a separate preview database, use that database's URL instead) |
| `UPSTASH_REDIS_REST_TOKEN` | from Section 4 | Production (+ Preview, matching the URL above) |

- [ ] Also add all four to a local `.env.local` file (gitignored by
      default in this Next.js project — confirm `.env.local` is listed
      in `.gitignore` before adding secrets there) for local development
      and the Task 4 manual smoke test in the implementation plan.
- [ ] After adding/changing Vercel env vars, a **new deployment** is
      required for them to take effect (env var changes don't apply
      retroactively to already-built deployments) — the next push to the
      W4b branch will pick them up automatically once a PR is open.

## 6. Vercel configuration

- [ ] No `vercel.json`/`vercel.ts` changes are required for this slice —
      `app/api/contact/route.ts` is a standard Next.js Route Handler,
      picked up automatically by the existing Next.js framework preset.
- [ ] Function region: no explicit configuration needed unless you want
      to pin the function closer to the Upstash region chosen in Section
      4 for lower latency — optional tuning, not required for
      correctness.
- [ ] Confirm the Route Handler's default timeout (300s per current
      Vercel Functions defaults) is more than sufficient for this
      workload (a Resend send + an Upstash write both complete in low
      hundreds of milliseconds typically) — no timeout override needed.
- [ ] If you kept Deployment Protection's "Protection Bypass for
      Automation" secret active from the W4a review, it's still valid
      for W4b's Preview review too (same project) — no need to
      regenerate unless you already revoked it after W4a.

## 7. Post-deployment verification

- [ ] Once env vars are set and a Preview build with W4b's code is live,
      run the Task 4 manual smoke test from the implementation plan
      (`curl -X POST .../api/contact ...`) against the Preview URL.
- [ ] Confirm a real email arrives at `admin@titanpilot.app` and a
      `leads:TP-2026-0000NN` key appears in the Upstash dashboard's Data
      Browser.
- [ ] Confirm the honeypot path returns success without sending an email
      or creating a lead record (check server logs for the
      `[contact] spam attempt caught by honeypot` line).
- [ ] Test the rate limit by submitting 4 times rapidly from the same
      IP — the 4th should return `429`.

## 8. Rollback / cleanup notes

- If Resend domain verification is still pending when you want to merge
  W4b, the route handler will still function for storage
  (`LeadStore.save`) but every email send will fail — per the spec's
  partial-failure design, the user still sees success and the lead is
  still safely recorded, so this is not a hard blocker to merging, just
  something to finish before relying on email notifications operationally.
- If you ever need to rotate `IP_HASH_SALT`, note that it invalidates
  the ability to correlate a *new* IP hash with any *previously stored*
  hash for the same real IP — this is a feature, not a bug (old rate-limit
  history doesn't carry over), but don't rotate it reflexively without
  reason.
