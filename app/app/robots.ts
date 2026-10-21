import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: ["*", "OAI-SearchBot"],
        allow: "/",
        disallow: [
        "/api",
        "/auth",
        "/tr/auth",
        "/en/auth",
        "/register",
        "/tr/register",
        "/en/register",

        "/admin",
        "/tr/admin",
        "/en/admin",

        "/dashboard",
        "/tr/dashboard",
        "/en/dashboard",

        "/account",
        "/tr/account",
        "/en/account",

        "/login",
        "/tr/login",
        "/en/login",

        "/forgot-password",
        "/tr/forgot-password",
        "/en/forgot-password",

        "/reset-password",
        "/tr/reset-password",
        "/en/reset-password",

        "/tr/hse-performance",
        "/en/hse-performance",
        ],
      },
    ],
    sitemap: "https://www.sernem.com/sitemap.xml",
    host: "https://www.sernem.com",
  };
}
