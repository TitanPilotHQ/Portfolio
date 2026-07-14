import type { NextConfig } from "next";

const securityHeaders = [
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: [
      "camera=()",
      "microphone=()",
      "geolocation=()",
      "payment=()",
      "usb=()",
      "interest-cohort=()",
    ].join(", "),
  },
  // Legacy fallback for browsers that don't yet honor CSP frame-ancestors
  // (set below, per-request, in middleware.ts).
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  // HSTS is only meaningful over HTTPS; Vercel terminates TLS for every
  // production and preview deployment, so this is safe to set unconditionally.
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        // Applies to every route. The Content-Security-Policy header is set
        // separately in middleware.ts, since it requires a per-request nonce.
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
