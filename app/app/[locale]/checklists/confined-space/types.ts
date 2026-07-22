export type Locale = "tr" | "en";

export type Answer = "yes" | "no" | "na" | null;

export type Priority = "low" | "medium" | "high" | "critical";

export type FindingStatus = "open" | "progress" | "closed";

export type CorrectiveAction = {
  action: string;
  responsible: string;
  targetDate: string;
  priority: Priority;
  status: FindingStatus;
};

export type ChecklistItem = {
  id: string;
  section: string;
  text: string;
  critical?: boolean;
};

export type Props = {
  locale: Locale;
};
