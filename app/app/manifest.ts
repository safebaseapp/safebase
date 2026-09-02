import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SERNEM | Professional HSE Platform",
    short_name: "SERNEM",
    description:
      "Professional HSE workspace for risk assessments, method statements, toolbox talks, checklists, guides and safety resources.",
    start_url: "/en",
    display: "standalone",
    background_color: "#020817",
    theme_color: "#020817",
    icons: [
      {
        src: "/brand/sernem-mark.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
