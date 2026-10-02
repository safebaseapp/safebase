import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

// Security baseline for SERNEM. The CSP deliberately allows HTTPS/WSS
// integrations used by analytics, authentication, payments and API services
// while blocking plugins, cross-origin framing and unsafe base-URI changes.
const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'self'",
  "form-action 'self' https:",
  "script-src 'self' 'unsafe-inline' https:",
  "style-src 'self' 'unsafe-inline' https:",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data: https:",
  "connect-src 'self' https: wss:",
  "frame-src 'self' https:",
  "media-src 'self' blob: https:",
  "worker-src 'self' blob:",
  "manifest-src 'self'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: contentSecurityPolicy,
  },
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
    value:
      "camera=(), microphone=(), geolocation=(), browsing-topics=(), payment=(self)",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "Cross-Origin-Opener-Policy",
    value: "same-origin-allow-popups",
  },
];

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/*": [
      "./public/fonts/DejaVuSans.ttf",
      "./public/fonts/DejaVuSans-Bold.ttf",
    ],
  },

  experimental: {
    serverActions: {
      allowedOrigins: [
        "probable-palm-tree-966r5rr774gwcp944-3000.app.github.dev",
        "*.app.github.dev",
        "localhost:3000",
        "127.0.0.1:3000",
      ],
    },
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },

  async redirects() {
    return [
      {
        source: "/:locale(tr|en)/checklists/working-at-height",
        destination: "/:locale/checklists/work-at-height",
        permanent: true,
      },
      {
        source: "/:locale(tr|en)/checklists/scaffolding",
        destination: "/:locale/checklists/scaffold",
        permanent: true,
      },
    ];
  },

  turbopack: {
    root: process.cwd(),
  },
};

export default withNextIntl(nextConfig);
