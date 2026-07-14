# W5 — Manual Certification Checklist

Everything in this document requires Emad's hands — real credentials, a
real inbox, real browsers, and production access that this session does
not have. For each step: the exact URL/dashboard area, the exact action,
the expected result, the evidence to capture, the pass/fail line, and
what to do if it fails.

Do this in order — later steps assume earlier ones passed. Report back
per item (pass/fail + the evidence).

**All 13 sections are now PASS.** See `W5-CLOSURE-REPORT.md` for the
consolidated GO/NO-GO.

**Project note:** the `titan-site` Vercel project referenced throughout
the original version of this checklist was deleted by Emad during
certification (it had zero Production deployments and was shadowing the
real project). The live site is bound to the **`portfolio`** Vercel
project — every dashboard URL below has been corrected to
`vercel.com/emadkhanqais-projects/portfolio/...`. If you have a local
`vercel` CLI link, re-run `vercel link` in this repo to repoint it
(`.vercel/project.json` is gitignored, so this is a one-time local fix,
not a code change).

## Status as of 2026-07-14

| # | Section | Status | Evidence |
|---|---|---|---|
| 1 | Preview/domain binding | **PASS** | Vercel dashboard screenshots confirmed `portfolio` project bound to `www.titanpilot.app`/`titanpilot.app`; production curl succeeded after `titan-site` project deletion |
| 2 | Resend delivery | **PASS** | Email received at `admin@titanpilot.app`, screenshot provided |
| 3 | Upstash persistence | **PASS** | Data Browser screenshot + full JSON record provided |
| 4 | Sequential lead ID | **PASS** | Covered by the same submission evidence as 2–3 |
| 5 | Duplicate submission behavior | **PASS** | Covered by the same submission evidence as 2–3; automated coverage in `app/api/contact/route.test.ts` |
| 6 | PII-safe logs | **PASS** | Zero matches searching Vercel Runtime Logs for name, work email, and message text in the test-submission time window |
| 5b | Rate-limit trigger (429) | **PASS** | `429` + `Retry-After` confirmed on the blocked resubmission; confirmed no new Resend email and no new Upstash key were created for it |
| 7–10 | Cross-browser (Chrome/Safari/Firefox/Edge) | **PASS** | Full 6-step script re-run post-fix on all four browsers against production; job-title and "Other" companion-field inline errors both confirmed working, no console/CSP errors |
| 11 | Production deployment | **PASS** | Commit `90ae7dc` (PR #29) confirmed deployed via GitHub commit-status API (`state: success`) |
| 12 | Production smoke test | **PASS** | Routes/titles/headers/sitemap/robots/404 all PASS; Analytics + Speed Insights real-data screenshots provided (RES 95, LCP 2.95s); zero Runtime Log matches for `[rateLimit] Upstash credentials absent` confirms Upstash-backed distributed rate limiting is active in Production (not the memory fallback) |
| 13 | Rollback verification | **PASS** | Cold check confirmed against the `portfolio` project: the `2d68734` deployment is still listed and its **...** menu shows **Promote to Production** |

**Post-certification fix:** cross-browser certification (§7–10) surfaced
that the contact form's client-side validation was unreachable — see the
new §14 below for the defect, fix, and re-verification evidence.

**Test-data convention, used throughout:** every test submission uses a
payload that is unambiguously a test, so it's never confused with a real
lead in Resend/Upstash/your inbox:

```
Company:        ZZZ-TEST-DO-NOT-CONTACT
Name:            W5 Certification Test
Work email:      <an inbox you control and can check right now>
Job title:       QA
Desk size:       Solo
Jurisdiction:    United States
Asset classes:   FX
AI usage:        None
Governance:      None
Primary goal:    AI Governance
Message:         MANUAL CERTIFICATION TEST — W5 closure verification,
                 submission <N>. Please disregard and delete.
Consent:         checked
```

Change only the bracketed `<N>` / timestamp between submissions so each
one is individually identifiable in Resend/Upstash.

---

## 1. Preview deployment

Merging PR #27 pushed this code straight to `main`. Depending on how the
`titan-site` Vercel project is configured, `main` may auto-deploy directly
to **Production** — meaning there may be no separate Preview build of
this exact code to test in isolation. Confirm which is true before
proceeding, so you certify against the right URL.

- **Where:** `https://vercel.com/emadkhanqais-projects/portfolio/deployments`
- **Action:** Find the deployment for commit `2d68734` (the PR #27 merge
  commit). Check its environment badge.
  - If it says **Production** — there is no isolated Preview build. Skip
    straight to creating one (next bullet) rather than certifying live
    against Production.
  - To get an isolated Preview build of the exact same code without
    touching Production, run locally:
    ```bash
    git checkout main --quiet && git pull --quiet
    git checkout -b w5-preview-cert
    git commit --allow-empty -m "chore: trigger preview build for W5 manual certification"
    git push -u origin w5-preview-cert
    ```
    Vercel will build this branch as a **Preview** deployment (identical
    code to `main`, isolated URL, isolated from Production traffic).
- **Expected result:** A deployment shows **Ready** with environment
  **Preview**, on a URL like
  `https://portfolio-git-w5-preview-cert-emadkhanqais-projects.vercel.app`
  (exact hostname shown on the deployment's detail page — copy it, you'll
  reuse it through Section 10).
- **Evidence to capture:** Screenshot of the deployment detail page
  showing status **Ready**, environment **Preview**, and the commit SHA
  matching `2d68734`.
- **Pass/fail:** Pass if the deployment reaches **Ready** with no build
  errors. Fail if the build errors or stays queued more than ~5 minutes.
- **If it fails:** Open the deployment's **Build Logs** tab, copy the
  first error, and stop — do not proceed to Sections 2–10 against a
  broken Preview. Send me the error and I'll diagnose it before you
  continue.

If Deployment Protection blocks you from opening the Preview URL in your
browser (a Vercel SSO login prompt), sign in with your Vercel account —
protection blocks unauthenticated `curl`/bots, not your own logged-in
session.

---

## 2. Resend delivery

- **Where:** the Preview URL from Section 1 → `/contact`, plus
  `https://resend.com/emails` (Resend dashboard, sent-email log).
- **Action:** Fill out and submit the contact form on the Preview site
  using the test payload above (submission 1). Then check the Resend
  dashboard's **Emails** list.
- **Expected result:** A new outbound email appears in Resend's log,
  `From: Titan Pilot <noreply@titanpilot.app>`, `To: admin@titanpilot.app`,
  subject `New AI Desk Audit request — ZZZ-TEST-DO-NOT-CONTACT (TP-2026-NNNNNN)`,
  status **Delivered**. The email itself should also physically arrive at
  the `admin@titanpilot.app` inbox.
- **Evidence to capture:** Screenshot of the Resend dashboard row showing
  **Delivered** status, and a screenshot/forward of the actual received
  email.
- **Pass/fail:** Pass if status reaches **Delivered** within a couple of
  minutes and the email is readable with correct field values. Fail if
  status shows **Bounced**/**Failed**, or nothing arrives within 10
  minutes.
- **If it fails:** Check `https://resend.com/domains` — if
  `titanpilot.app` isn't **Verified**, that's the cause (see
  `docs/deployment/w4b-deployment-checklist.md` §2 for the DNS fix). If
  the domain is verified but delivery still fails, copy the error from
  Resend's dashboard log entry and send it to me.

---

## 3. Upstash persistence

- **Where:** `https://console.upstash.com/` → your Redis database →
  **Data Browser** tab.
- **Action:** Right after submission 1 (Section 2), search the Data
  Browser for key `leads:TP-2026-*` (or scan for the most recent key).
- **Expected result:** A key `leads:TP-2026-NNNNNN` exists whose value is
  a JSON blob containing `"company":"ZZZ-TEST-DO-NOT-CONTACT"` and the
  rest of the test payload's fields.
- **Evidence to capture:** Screenshot of the Data Browser showing the key
  and its JSON value.
- **Pass/fail:** Pass if the key exists with correct field values within
  a few seconds of submission. Fail if no key appears, or the value is
  malformed/incomplete.
- **If it fails:** Check `UPSTASH_REDIS_REST_URL`/`UPSTASH_REDIS_REST_TOKEN`
  are set correctly for the **Preview** environment specifically in
  `https://vercel.com/emadkhanqais-projects/portfolio/settings/environment-variables`
  (a Production-only-scoped credential would make Preview requests throw
  a 500 — check Section 2's contact-form submission actually returned
  success in the browser, not an error).

---

## 4. Sequential lead ID

- **Where:** same Preview `/contact` page.
- **Action:** Submit the test payload a second time (submission 2 —
  bump the `<N>` marker in the message field), immediately after
  submission 1.
- **Expected result:** Submission 2's confirmation screen shows a lead ID
  exactly one greater than submission 1's (e.g. submission 1 =
  `TP-2026-000042`, submission 2 = `TP-2026-000043` — the exact numbers
  depend on how many real leads already exist in Production's counter;
  what matters is they're sequential and non-repeating).
- **Evidence to capture:** Both confirmation-screen lead IDs (screenshot
  or copy the text), and confirm both corresponding keys exist in
  Upstash's Data Browser (Section 3).
- **Pass/fail:** Pass if the second ID is exactly first-ID + 1. Fail if
  they're equal, out of order, or a duplicate.
- **If it fails:** Send me both observed IDs — this would point to a bug
  in `UpstashLeadStore.getNextLeadId()`'s Redis `INCR` usage.

---

## 5. Duplicate submission behavior

**Status: PASS** — submissions 1–2 each produced a distinct email + Upstash
key (no accidental duplicate). Submission 3 ("5b") was rejected with `429`
and a `Retry-After` header; confirmed no new Resend email and no new
Upstash key were created for the blocked submission.

This uses the same two submissions from Section 4 — no new action
needed, just a different read of the same evidence, plus one more
submission to confirm rate limiting engages.

- **Where:** same Preview `/contact` page, plus the Resend/Upstash
  dashboards from Sections 2–3.
- **Action:** Immediately after submission 2, submit the form a **third**
  time (submission 3) with the same test payload (bump `<N>` again).
- **Expected result:**
  - Submissions 1 and 2 (Section 4) each create their **own** lead record
    and their **own** email — the app has no idempotency/dedup guard by
    design, so two distinct form submissions are two distinct leads, not
    silently merged. (This is documented, intended behavior — confirmed
    by `app/api/contact/route.test.ts`'s automated test — not something
    to "fix.")
  - Submission 3, made within the same ~5 minutes as 1 and 2, should be
    **rejected**: the contact form shows a rate-limit error message
    ("Too many submissions..."), and no new email or Upstash key is
    created for it.
- **Evidence to capture:** Confirmation that submissions 1 and 2 each
  produced a distinct email + distinct Upstash key (no accidental
  duplicate record from a single click); screenshot of submission 3's
  rate-limit error message in the browser.
- **Pass/fail:** Pass if 1 and 2 each cleanly produced exactly one email
  + one record, and 3 was blocked with a clear rate-limit message. Fail
  if a single submission ever produces two emails/records (a real bug),
  or if submission 3 is *not* blocked (rate limiting not working in this
  environment).
- **If it fails:** If 3 wasn't blocked, first confirm `UPSTASH_REDIS_REST_URL`/`TOKEN`
  are set for Preview (an unset pair silently falls back to a per-instance
  memory limiter, which still would have blocked submission 3 within the
  same serverless instance — so this specific failure mode more likely
  means the credentials point to a different/unexpected database, or the
  three requests landed on different serverless instances with the
  memory fallback. Check Section 6 for the degraded-mode log line to
  tell which). Send me what you observe.

---

## 6. PII-safe logs

- **Where:** `https://vercel.com/emadkhanqais-projects/portfolio/logs`
  (Runtime Logs), filtered to the Preview deployment and the time window
  of Sections 2–5's test submissions.
- **Action:** Search/filter the logs for the literal test values you
  used: the work email address you entered, the string
  `ZZZ-TEST-DO-NOT-CONTACT`, and the message text.
- **Expected result:** Zero log lines contain any of those strings. You
  should instead see lines like `[contact] rate limit exceeded` (for
  submission 3) with only a `hashedIp` value — never the raw IP, name,
  email, or message. If submission 2 or 3 happened to also trigger a
  storage/email failure for any reason, those lines should show only
  `leadId` + an error string, never the record.
- **Evidence to capture:** Screenshot of the log search showing zero
  matches for the PII strings, plus a screenshot of the actual
  `[contact] ...` log lines that did appear (to confirm they're
  PII-safe, not just absent).
- **Pass/fail:** Pass if no PII string appears anywhere in the logs for
  this time window. Fail if the work email, name, or message text
  appears in any log line.
- **If it fails:** This would be a real regression in the PII-safe
  logging fixed earlier in W5 — send me the exact log line (redact
  nothing, I need to see precisely what leaked) and I'll patch it before
  anything goes to Production.

---

## 7–10. Cross-browser verification (Safari, Firefox, Edge, Chrome)

Run this same short script in **all four** browsers, against the Preview
URL from Section 1. If you don't have all four browsers available
locally, use a browser-testing service (e.g. BrowserStack) rather than
skipping — do not report a browser as checked if it wasn't actually
opened.

- **Where:** the Preview URL, specifically `/` and `/contact`.
- **Action, per browser:**
  1. Load `/`. Open DevTools/Web Inspector's console.
  2. Confirm the hero heading and content are visible immediately (no
     blank/flash-of-invisible-content).
  3. Resize the window to a narrow mobile width (~390px) and back to
     full desktop width — confirm no horizontal scrollbar appears at
     either size, and the mobile nav toggle opens/closes correctly at
     narrow width.
  4. Navigate to `/contact` by clicking the nav link (not typing the
     URL) — confirms client-side routing/hydration works.
  5. Tab through the contact form using only the keyboard (no mouse) —
     confirm every field is reachable in a sensible order and has a
     visible focus outline.
  6. Submit the form once with the **Job title** field left empty —
     confirm an inline error appears under that field (red text, not a
     browser-native validation popup only).
  7. Check the console for errors. A `CSP` violation line, or a red
     script error, is a real finding — a 404 for
     `/_vercel/insights/script.js` or `/_vercel/speed-insights/script.js`
     is expected on a Preview deployment and not a finding (per
     `W5-OPERATIONAL-READINESS.md`, these routes only exist in
     Production).
- **Expected result:** All six checks above pass with no console errors
  besides the known Analytics-script exception.
- **Evidence to capture, per browser:** one screenshot of `/` at desktop
  width, one screenshot of `/` at mobile width with the nav open, one
  screenshot of the `/contact` inline validation error, and a screenshot
  or copy of the console output.
- **Pass/fail, per browser:** Pass if all six checks succeed with no
  unexplained console errors. Fail otherwise — note exactly which of the
  six steps failed.
- **If it fails:** Note which browser and which specific step. Layout
  bugs (horizontal scroll, broken nav) and console/CSP errors are the
  most likely real findings — send me the browser, the step, and a
  screenshot, and I'll reproduce and fix before Production.

---

## 11. Production deployment

Only proceed here once Sections 1–10 all pass.

- **Where:** `https://vercel.com/emadkhanqais-projects/portfolio/deployments`
  (if you built a throwaway `w5-preview-cert` branch in Section 1) or
  confirm the existing `main`/`2d68734` deployment already shown as
  **Production** (if `main` auto-deploys to Production and there was
  never a separate Preview build).
- **Action:**
  - If you used a throwaway Preview branch: open that deployment's
    **...** menu → **Promote to Production**. Then delete the throwaway
    branch (`git push origin --delete w5-preview-cert` and
    `git branch -D w5-preview-cert` locally) — it was only scaffolding
    for this certification.
  - If `main` already auto-deployed `2d68734` to Production: no action
    needed here, just confirm its status is **Ready**, not **Error**.
- **Expected result:** The deployment for commit `2d68734` (exact same
  code you certified in Sections 1–10, no last-minute changes) is live
  as **Production**, status **Ready**.
- **Evidence to capture:** Screenshot of the deployment detail page:
  environment **Production**, status **Ready**, commit `2d68734`.
- **Pass/fail:** Pass if the promotion (or existing auto-deploy)
  completes with status **Ready**. Fail on any build/promotion error.
- **If it fails:** Copy the error from the deployment's **Build Logs**
  or **Function Logs** tab and send it to me before attempting anything
  else.

---

## 12. Production smoke test

**Status: PASS, all 7 items.** Routes/titles (all 9 return `200` with
unique titles), security headers, sitemap/robots, and `404` behavior are
all confirmed. Analytics and Speed Insights are confirmed receiving real
data (RES 95, LCP 2.95s, real visitor recorded). Item 8, the log grep for
`[rateLimit] Upstash credentials absent`, returned zero matches — confirms
distributed (Upstash-backed) rate limiting is active in Production, not
the per-instance memory fallback.

Run the full checklist already written in
`docs/website/W5-OPERATIONAL-READINESS.md` → **"Production health / smoke
checklist"** (8 items) against `https://www.titanpilot.app`. Do **not**
resubmit the contact form for real here — Sections 2–6 already certified
that flow on Preview with identical code; re-running it on Production
would create another test lead unnecessarily. Skip that one sub-item
(item 6 in that checklist) and run the other 7.

- **Where:** `https://www.titanpilot.app` (all checks) plus
  `https://vercel.com/emadkhanqais-projects/portfolio/logs`
  (item 8's log grep) and
  `https://vercel.com/emadkhanqais-projects/portfolio/analytics` /
  `.../speed-insights` (item 7).
- **Action:** Follow that document's 8-item list exactly, skipping item 6
  as noted above.
- **Expected result:** All 7 remaining items pass as described in that
  document — `200`s with all six security headers present, zero console
  errors besides the expected Analytics 404 caveat (which should now
  actually be a 200 in Production), all 9 public routes returning `200`
  with unique titles, `404` on a nonexistent path, sitemap/robots
  correct, Analytics/Speed Insights receiving real data, and no
  `[rateLimit] Upstash credentials absent` line in the logs (its absence
  confirms distributed rate limiting is active in Production, not the
  memory fallback).
- **Evidence to capture:** Per-item, as specified in that checklist
  document (mostly `curl -I` output and screenshots).
- **Pass/fail:** Pass if all 7 items pass. Fail on any single item —
  note which.
- **If it fails:** Send me which item and its output/screenshot; severity
  depends on which one (a missing security header is more urgent than a
  cosmetic Analytics delay).

---

## 13. Rollback verification

**Status: PASS (cold check)** — confirmed against the `portfolio` project:
the `2d68734` deployment is still listed (not deleted/expired) and its
**...** menu shows **Promote to Production**. The live drill was not run
(not required — the cold check satisfies this section's pass criteria,
and an unnecessary live promotion carries its own small risk for no
added certification value).

Current production tip is commit `90ae7dc` (PR #29, the contact-form
validation fix). The deployment immediately before it is `2d68734` (PR
#27). This confirms the rollback path works **without** actually
disrupting live traffic, unless you choose the optional live drill below.

- **Where:** `https://vercel.com/emadkhanqais-projects/portfolio/deployments`
- **Action (required — cold check):** Find the deployment for commit
  `2d68734` (immediately before current production). Confirm it is still
  listed (not deleted/expired) and that its **...** menu shows a
  **Promote to Production** option.
- **Action (optional — live drill, do only if you want the higher-
  confidence version):**
  1. Click **Promote to Production** on the `2d68734` deployment.
  2. Wait ~30 seconds, then load `https://www.titanpilot.app/contact` in
     a browser, view source, and confirm the `<form>` tag no longer has
     `novalidate` (confirms traffic actually moved to the pre-fix build —
     the six security headers are unchanged between `2d68734` and
     `90ae7dc`, so header-diffing won't distinguish them; the
     `noValidate` attribute is the actual code difference between these
     two deployments).
  3. Promote `90ae7dc` back to Production.
  4. Re-run the same check and confirm `novalidate` is back.
- **Expected result:** The **Promote to Production** option is present
  and (if you ran the live drill) actually switches which code serves
  real traffic within under a minute, with no error page shown to users
  during the switch.
- **Evidence to capture:** Screenshot of the **...** menu showing
  **Promote to Production** on the `2d68734` deployment (cold check); if
  you ran the live drill, the two view-source snapshots showing
  `novalidate` present/absent before/after.
- **Pass/fail:** Pass if the option is present and clickable (cold), or
  if the live drill completes both promotions cleanly with no downtime
  (hot). Fail if the old deployment has been deleted/expired, or a live
  drill promotion errors or serves a broken page.
- **If it fails:** If the old deployment has expired (Vercel prunes old
  deployments after a retention window on some plans), the fallback
  rollback path is `git revert 90ae7dc` (or `git revert 2d68734`,
  whichever commit needs undoing) on a new branch/PR — slower (needs a
  full rebuild) but always available as long as `main`'s git history is
  intact. This is documented in full in
  `docs/website/W5-OPERATIONAL-READINESS.md` → "Rollback procedure". Tell
  me if you hit this and I'll prepare the revert PR.

---

## 14. Post-certification defect: native validation masked custom errors

**Status: PASS (fixed, deployed, re-verified).**

The first pass through Sections 7–10 (cross-browser) surfaced a real
defect that the earlier code-level accessibility review had missed:
`components/ContactForm.tsx`'s `<form>` had `required` attributes on
every field but no `noValidate`, so the browser's native constraint
validation intercepted submission *before* React's `onSubmit` handler
ever ran. Leaving **Job Title** blank and submitting gave the user zero
feedback — no native popup (inconsistently suppressed by the surrounding
layout in the browser tested) and no custom inline error either, because
the custom validation code was unreachable.

This is a genuine finding about the review method, not just the code:
the original W5 accessibility pass (`W5-FINDINGS-REGISTER.md` §3)
verified the *markup* — `role="alert"`, `aria-invalid`,
`aria-describedby` were all correctly wired — but markup correctness
alone doesn't prove the error path is *reachable*. Static review missed
a runtime interaction between native and custom validation that only
surfaced under real browser testing.

**Fix (PR #29, commit `90ae7dc`):**
- `<form>` now has `noValidate`; a client-side `contactFormSchema.safeParse()`
  runs in `handleSubmit` before any network request, setting the same
  `errors` state and focusing the first invalid field.
- The same review pass surfaced a second, related gap: the four
  "Other"-selected companion fields (Asset Classes, AI Usage, Governance
  Method, Primary Goal) had no validation or error UI at all if their
  parent was "Other" and the detail box was left blank. Fixed via a
  shared `superRefine` in `lib/contactSchema.ts` (`requireOtherDetail`),
  reused client- and server-side, plus UI wiring in `ContactForm.tsx`
  and `MultiSelectField.tsx`.
- A stale-error bug found during the fix's own adversarial review (a
  companion field's error persisted in state after its parent was
  deselected from "Other", then reappeared if "Other" was re-selected
  without resubmitting) was fixed in the same PR (`clearOtherError`).
- All three defects verified with new automated tests (schema-level,
  API-route-level, and component-level) and three independent
  adversarial review passes, each of which empirically reverted the fix
  under test and confirmed specific tests failed (proving the tests are
  non-vacuous, not just present).

**Re-verification evidence:** Sections 7–10 above were re-run in full
against production post-deploy, confirming: blank Job Title now shows an
app-owned inline error; selecting "Other" with a blank companion detail
shows the correct inline error; no native-browser validation popup
intercepts submission; no network request fires for client-invalid
input; keyboard/focus behavior (tab order, focus-first-invalid-field)
remains correct.

---

## When you're done

All 13 sections are PASS. See `docs/website/W5-CLOSURE-REPORT.md` for the
consolidated evidence summary and GO/NO-GO decision.
