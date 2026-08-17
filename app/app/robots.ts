import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin/",
        "/dashboard/",
        "/forgot-password/",
        "/reset-password/",
      ],
    },
    sitemap: "https://www.sernem.com/sitemap.xml",
    host: "https://www.sernem.com",
  };
}
