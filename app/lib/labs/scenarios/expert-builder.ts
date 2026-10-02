import type { IncidentScenario } from "./incident-simulator";

export type ExpertStep = {
  id: string;
  titleEn: string;
  titleTr: string;
  situationEn: string;
  situationTr: string;
  strongEn: string;
  strongTr: string;
  acceptableEn: string;
  acceptableTr: string;
  weakEn: string;
  weakTr: string;
  criticalEn: string;
  criticalTr: string;
  lessonEn: string;
  lessonTr: string;
};

export type ExpertScenarioConfig = {
  id: string;
  titleEn: string;
  titleTr: string;
  category: string;
  introEn: string;
  introTr: string;
  steps: ExpertStep[];
};

const strongImpact = { safety: 4, judgment: 5, response: 4 };
const acceptableImpact = { safety: -2, judgment: -4, response: -2 };
const weakImpact = { safety: -8, judgment: -11, response: -7 };
const criticalImpact = { safety: -22, judgment: -25, response: -18 };

export function buildExpertScenario(config: ExpertScenarioConfig): IncidentScenario {
  if (config.steps.length < 8 || config.steps.length > 10) {
    throw new Error(`Expert scenario ${config.id} must contain 8–10 decision steps.`);
  }

  const nodes = config.steps.map((step, index) => {
    const next = index === config.steps.length - 1 ? "finish-safe" : config.steps[index + 1].id;
    return {
      id: step.id,
      titleEn: step.titleEn,
      titleTr: step.titleTr,
      situationEn: step.situationEn,
      situationTr: step.situationTr,
      choices: [
        {
          id: `${step.id}-strong`,
          labelEn: step.strongEn,
          labelTr: step.strongTr,
          consequenceEn: `The decision fully addresses ${step.lessonEn} before exposure continues.`,
          consequenceTr: `Karar, maruziyet devam etmeden önce ${step.lessonTr} tamamen ele alır.`,
          impact: strongImpact,
          next,
        },
        {
          id: `${step.id}-acceptable`,
          labelEn: step.acceptableEn,
          labelTr: step.acceptableTr,
          consequenceEn: `Immediate exposure is reduced, but ${step.lessonEn} is only partly verified.`,
          consequenceTr: `Anlık maruziyet azalır ancak ${step.lessonTr} yalnızca kısmen doğrulanır.`,
          impact: acceptableImpact,
          next,
        },
        {
          id: `${step.id}-weak`,
          labelEn: step.weakEn,
          labelTr: step.weakTr,
          consequenceEn: `The work continues while ${step.lessonEn} remains unresolved, creating a meaningful control gap.`,
          consequenceTr: `Çalışma, ${step.lessonTr} çözülmeden devam eder ve belirgin bir kontrol boşluğu oluşur.`,
          impact: weakImpact,
          next,
        },
        {
          id: `${step.id}-critical`,
          labelEn: step.criticalEn,
          labelTr: step.criticalTr,
          consequenceEn: `The choice bypasses ${step.lessonEn} and creates an immediate escalation that requires stop-work and recovery.`,
          consequenceTr: `Seçim, ${step.lessonTr} devre dışı bırakır ve işi durdurup toparlanmayı gerektiren doğrudan bir eskalasyon yaratır.`,
          impact: criticalImpact,
          next: "finish-recovered",
          critical: true,
        },
      ],
    };
  });

  return {
    id: config.id,
    titleEn: config.titleEn,
    titleTr: config.titleTr,
    category: config.category,
    difficulty: "expert",
    introEn: config.introEn,
    introTr: config.introTr,
    start: config.steps[0].id,
    nodes: [
      ...nodes,
      {
        id: "finish-safe",
        titleEn: "Controlled expert outcome",
        titleTr: "Kontrollü expert sonuç",
        situationEn: "The changing conditions are managed through verified controls, disciplined escalation and a defensible restart decision.",
        situationTr: "Değişen koşullar doğrulanmış kontroller, disiplinli eskalasyon ve savunulabilir bir yeniden başlatma kararıyla yönetilir.",
        choices: [],
      },
      {
        id: "finish-recovered",
        titleEn: "Recovered after a critical decision",
        titleTr: "Kritik karar sonrası toparlanma",
        situationEn: "The scenario is stopped before a serious outcome, but a critical judgment gap entered the decision chain and must be reviewed.",
        situationTr: "Senaryo ciddi bir sonuç oluşmadan durdurulur; ancak karar zincirine kritik bir muhakeme boşluğu girmiştir ve incelenmelidir.",
        choices: [],
      },
    ],
  };
}
