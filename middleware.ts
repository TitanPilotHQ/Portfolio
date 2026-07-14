import { NextRequest, NextResponse } from "next/server";

// A strict nonce + 'strict-dynamic' CSP was tried first and reverted: Next.js
// 15.5's App Router does not reliably propagate the middleware-issued nonce
// to its own framework bootstrap/chunk <script> tags, which broke hydration
// entirely (verified locally — every chunk was blocked, 0 JS executed).
// This CSP keeps script-src scoped to same-origin only (no external script
// host can ever be allowlisted), which blocks the primary XSS vector for a
// static-content site with no user-generated content rendered into the DOM
// and no dangerouslySetInnerHTML of untrusted input. 'unsafe-inline' is
// accepted here as a deliberate, documented tradeoff, not an oversight.
export function middleware(_request: NextRequest) {
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-inline';
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data:;
    font-src 'self';
    connect-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
  `;
  const contentSecurityPolicy = cspHeader.replace(/\s{2,}/g, " ").trim();

  const response = NextResponse.next();
  response.headers.set("Content-Security-Policy", contentSecurityPolicy);

  return response;
}

export const config = {
  matcher: [
    // Skip Next.js internals and static assets — CSP is a document-level
    // (navigation response) header; applying it to every static file
    // request adds no security value.
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
