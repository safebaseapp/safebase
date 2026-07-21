export type Locale = "tr" | "en";
export type Answer = "yes" | "no" | "na" | null;

export type CorrectiveAction = {
  action: string;
  responsible: string;
  targetDate: string;
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
