# Website Launch Plan

## Objective

Deliver titanpilot.app as a production-ready public website with:

- accurate product messaging
- no unsupported claims
- working lead capture
- strong security headers
- acceptable performance
- responsive behavior
- accessibility coverage
- SEO and social metadata
- monitoring and rollback readiness
- W2 Evidence Explorer integrated only after Titan provides the certified sanitized fixture

## Workstream status

- W0: complete
- W1: complete
- W2: blocked on Titan certified sanitized fixture
- W3: complete
- W4: complete
- W5: approved to begin now
- LaunchOS: maintenance mode, out of scope

## W5 approved scope

### 1. Security hardening

Implement and verify:

- Content-Security-Policy
- Permissions-Policy
- Referrer-Policy
- frame protection using CSP frame-ancestors and compatible fallback where appropriate
- X-Content-Type-Options
- Strict-Transport-Security where production deployment supports it
- secure API response headers
- Cache-Control: no-store for contact and sensitive API responses
- no secret exposure in client bundles, logs or error messages
- contact endpoint abuse controls remain active
- rate-limit and honeypot failure paths tested

Do not break required Vercel, Resend or Upstash functionality.

### 2. Performance

Resolve the known hero LCP issue caused by Framer Motion hiding primary content until hydration.

Requirements:

- primary heading and critical hero content must render immediately
- animation must progressively enhance already-visible content
- no opacity-zero or transform-gated LCP element before hydration
- reduce unnecessary client components
- avoid layout shift
- optimize images, fonts and scripts
- measure production-like Lighthouse/Web Vitals results

Set evidence-based targets, including:

- no Critical performance finding
- LCP materially improved from the current 8+ second result
- no severe CLS or interaction regression

Do not fabricate scores.

### 3. Accessibility

Audit and fix:

- keyboard navigation
- visible focus
- heading structure
- form labels and errors
- contrast
- reduced-motion behavior
- semantic landmarks
- screen-reader announcements for form status
- touch targets
- dialog/menu focus management if present

Target WCAG 2.2 AA for the launch surface.

### 4. Responsive and browser verification

Verify:

- mobile
- tablet
- laptop
- large desktop
- Safari
- Chrome
- Firefox
- Edge where practical

Test key breakpoints and real content lengths.

### 5. SEO and metadata

Implement and verify:

- unique titles and descriptions
- canonical URLs
- Open Graph metadata
- social preview metadata
- sitemap
- robots.txt
- structured data only where factually justified
- no indexing of internal or preview-only routes
- correct 404 behavior

### 6. Contact flow production certification

Test:

- successful delivery through Resend
- Upstash persistence and sequential lead ID
- validation errors
- honeypot behavior
- IP-HMAC handling
- rate limiting
- provider failure
- retry behavior
- duplicate submission behavior
- privacy-safe logging
- mobile usability

Do not send uncontrolled test spam to real recipients.

### 7. Operational readiness

Add or verify:

- production health/smoke checklist
- deployment verification
- rollback procedure
- environment-variable inventory without values
- error-monitoring expectations
- lead-delivery failure alerting or documented manual verification
- post-deploy checklist

### 8. W2 integration boundary

W5 must not invent evidence or unblock W2 artificially.

Prepare W2 only to the extent that it remains a clean data-contract integration:

- versioned fixture adapter
- loading, empty and error states
- schema validation
- no mock data in the production launch
- no unsupported claims

The real W2 launch remains blocked until Titan delivers and certifies the sanitized fixture.

### 9. Optional item

Add the WhatsApp contact entry only after all release-critical W5 work is green and only if it introduces no measurable security, accessibility, performance or schedule regression.

## Release gates

The website cannot be declared complete while any of these remain:

- unresolved Critical or High security issue
- unsupported public claim
- broken contact delivery
- mock evidence in production
- severe accessibility defect
- known critical responsive failure
- broken rollback path
- unresolved hero LCP defect
- broken links or invalid metadata on launch-critical pages

## Execution process

1. Write the plan.
2. Open a W5 implementation branch.
3. Audit the current site against every section.
4. Produce a prioritized findings register.
5. Implement in small reviewable commits.
6. Run independent adversarial review.
7. Open a PR with measured evidence.
8. Merge only when checks are green and no release blocker remains.
9. Deploy and run production smoke tests.
10. Produce `W5-CLOSURE-REPORT.md`.

Keep LaunchOS untouched.
