export type Recommendation = {
  title: string;
  href: string;
  type: "knowledge" | "checklist" | "toolbox" | "template";
};

const database: Record<string, Recommendation[]> = {
  "hot work": [
    {
      title: "Hot Work Guide",
      href: "/knowledge/hot-work",
      type: "knowledge",
    },
    {
      title: "Hot Work Checklist",
      href: "/checklists/hot-work",
      type: "checklist",
    },
    {
      title: "Hot Work Toolbox",
      href: "/toolbox/hot-work",
      type: "toolbox",
    },
    {
      title: "Hot Work Permit",
      href: "/templates/hot-work-permit",
      type: "template",
    },
  ],

  loto: [
    {
      title: "LOTO Guide",
      href: "/knowledge/loto",
      type: "knowledge",
    },
    {
      title: "LOTO Checklist",
      href: "/checklists/loto",
      type: "checklist",
    },
  ],

  scaffold: [
    {
      title: "Scaffold Guide",
      href: "/knowledge/scaffold",
      type: "knowledge",
    },
    {
      title: "Scaffold Inspection",
      href: "/checklists/scaffold",
      type: "checklist",
    },
  ],
};

export function getRecommendations(question: string) {
  const text = question.toLowerCase();

  for (const keyword of Object.keys(database)) {
    if (text.includes(keyword)) {
      return database[keyword];
    }
  }

  return [];
}
