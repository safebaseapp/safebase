export type PosterTone = "mandatory" | "warning" | "information";

export type PosterRule = {
  number: string;
  title: {
    tr: string;
    en: string;
  };
  items: {
    tr: string[];
    en: string[];
  };
  icon:
    | "ladder"
    | "harness"
    | "anchor"
    | "guardrail"
    | "fall"
    | "weather"
    | "equipment"
    | "training";
  tone: PosterTone;
};

export type PosterDefinition = {
  code: string;
  revision: string;
  title: {
    tr: string;
    en: string;
  };
  slogan: {
    tr: string;
    en: string;
  };
  rules: PosterRule[];
  never: {
    tr: string[];
    en: string[];
  };
  ppe: {
    tr: string[];
    en: string[];
  };
};
