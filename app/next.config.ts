import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

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

  turbopack: {
    root: process.cwd(),
  },
};

export default withNextIntl(nextConfig);
