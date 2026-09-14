import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",

        "/admin/",
        "/tr/admin/",
        "/en/admin/",

        "/dashboard/",
        "/tr/dashboard/",
        "/en/dashboard/",

        "/account/",
        "/tr/account/",
        "/en/account/",

        "/login/",
        "/tr/login/",
        "/en/login/",

        "/forgot-password/",
        "/tr/forgot-password/",
        "/en/forgot-password/",

        "/reset-password/",
        "/tr/reset-password/",
        "/en/reset-password/",

        "/tr/hse-performance/",
        "/en/hse-performance/",
      ],
    },
    sitemap: "https://www.sernem.com/sitemap.xml",
    host: "https://www.sernem.com",
  };
}
