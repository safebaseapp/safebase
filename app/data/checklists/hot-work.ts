export interface ChecklistItem {
  id: string;
  requirement: string;
  critical: boolean;
  guidance: string;
  corrective: string;
  references: string[];
  riskLevel: "Low" | "Medium" | "High" | "Critical";
  relatedGuide?: string;
  relatedToolboxTalk?: string;
  relatedTemplate?: string;
}

export interface ChecklistSection {
  id: string;
  title: string;
  items: ChecklistItem[];
}

export interface ChecklistDocument {
  id: string;
  title: string;
  version: string;
  standards: string[];
  sections: ChecklistSection[];
}

export const hotWorkChecklist: ChecklistDocument = {
  id: "SB-CHK-HW-001",

  title: "Hot Work Inspection Checklist",

  version: "1.0",

  standards: [
    "OSHA 1910.252",
    "NFPA 51B",
    "ISO 45001"
  ],

  sections: [
    {
      id: "permit",

      title: "Permit Verification",

      items: [
        {
          id: "permit-valid",

          requirement: "Valid Hot Work Permit available",

          critical: true,

          riskLevel: "Critical",

          guidance:
            "Verify that a valid Hot Work Permit has been issued before work begins.",

          corrective:
            "Obtain an approved Hot Work Permit before starting work.",

          references: [
            "OSHA 1910.252",
            "NFPA 51B"
          ],

          relatedGuide: "/guides/hot-work",

          relatedToolboxTalk: "/toolbox-talks/hot-work",

          relatedTemplate: "/templates/hot-work-permit"
        }
      ]
    }
  ]
};