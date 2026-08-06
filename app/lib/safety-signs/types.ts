export type SignLocale = "tr" | "en";

export type SignCategory =
  | "mandatory"
  | "prohibition"
  | "warning"
  | "emergency"
  | "fire"
  | "information";

export type SignIcon = string;

export type SafetySign = {
  slug: string;
  code: string;
  category: SignCategory;
  icon: SignIcon;
  title: {
    tr: string;
    en: string;
  };
  description: {
    tr: string;
    en: string;
  };
};
