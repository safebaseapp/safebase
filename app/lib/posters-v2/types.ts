export type PosterTone = "mandatory" | "warning" | "information";

export type RuleApplication =
  | {kind:"conditional-control";when:{tr:string;en:string}}
  | {kind:"required-control"|"hazard-warning"|"guidance";when?:never};

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
    | "training"
    // Existing topic-specific icon families rendered by PosterIcon.
    // Keep the finite core keys compatible with archived core-icon dictionaries.
    | `hsk-${string}`
    | `exc-${string}`
    | `chm-${string}`
    | `flt-${string}`
    | `mh-${string}`
    | `do-${string}`
    | `ladder-${string}`
    | `hw-${string}`
    | `wah-${string}`
    | `scf-${string}`;
  tone: PosterTone;
  application?: RuleApplication;
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
