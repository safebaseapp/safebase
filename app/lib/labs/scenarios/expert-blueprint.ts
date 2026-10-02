import { buildExpertScenario } from "./expert-builder";
import type { IncidentScenario } from "./incident-simulator";

export type ExpertStage = {
  id: string;
  titleEn: string;
  titleTr: string;
  situationEn: string;
  situationTr: string;
  focusEn: string;
  focusTr: string;
};

export type ExpertBlueprint = {
  id: string;
  titleEn: string;
  titleTr: string;
  category: string;
  introEn: string;
  introTr: string;
  stages: ExpertStage[];
};

const variants = [
  {
    strongEn: (f:string) => `Hold the affected interface, jointly verify ${f}, then re-authorize the next step`,
    strongTr: (f:string) => `Etkilenen arayüzü durdur, ${f} birlikte doğrula ve sonraki adımı yeniden yetkilendir`,
    acceptableEn: (f:string) => `Pause the immediate task, add a compensating control and verify ${f} at the next hold point`,
    acceptableTr: (f:string) => `Anlık işi beklet, ek kontrol uygula ve ${f} sonraki bekleme noktasında doğrula`,
    weakEn: (f:string) => `Continue unaffected work while ${f} is checked in parallel`,
    weakTr: (f:string) => `${f} paralelde kontrol edilirken etkilenmemiş işi sürdür`,
    criticalEn: (_f:string) => `Proceed under the current permit unless a formal limit or alarm is exceeded`,
    criticalTr: (_f:string) => `Resmi limit veya alarm aşılmadıkça mevcut izinle devam et`,
  },
  {
    strongEn: (f:string) => `Stop at the decision point and obtain independent field confirmation of ${f}`,
    strongTr: (f:string) => `Karar noktasında dur ve ${f} için bağımsız saha doğrulaması al`,
    acceptableEn: (f:string) => `Maintain the hold and accept provisional control only while ${f} is being confirmed`,
    acceptableTr: (f:string) => `İşi beklet ve yalnızca ${f} doğrulanırken geçici kontrolü kabul et`,
    weakEn: (f:string) => `Rely on the responsible supervisor's assurance for ${f} and monitor closely`,
    weakTr: (f:string) => `${f} için sorumlu amirin teyidine güven ve yakından izle`,
    criticalEn: (_f:string) => `Treat the existing paperwork as sufficient and continue the irreversible step`,
    criticalTr: (_f:string) => `Mevcut evrakı yeterli kabul et ve geri dönüşsüz adıma devam et`,
  },
  {
    strongEn: (f:string) => `Reconcile the conflicting information on ${f} with all control owners before work resumes`,
    strongTr: (f:string) => `İş başlamadan ${f} hakkındaki çelişkili bilgiyi tüm kontrol sahipleriyle uzlaştır`,
    acceptableEn: (f:string) => `Use the conservative condition for now and schedule a formal verification of ${f} before exposure increases`,
    acceptableTr: (f:string) => `Şimdilik muhafazakâr koşulu uygula ve maruziyet artmadan ${f} için resmi doğrulama planla`,
    weakEn: (f:string) => `Choose the most recent source for ${f} and proceed with extra supervision`,
    weakTr: (f:string) => `${f} için en güncel kaynağı seç ve ek gözetimle devam et`,
    criticalEn: (_f:string) => `Let schedule priority decide and resolve the discrepancy after the task`,
    criticalTr: (_f:string) => `Program önceliğine göre devam et ve çelişkiyi işten sonra çöz`,
  },
  {
    strongEn: (f:string) => `Reassess ${f} at the workface and reset the control boundary before release`,
    strongTr: (f:string) => `${f} saha noktasında yeniden değerlendir ve serbest bırakmadan kontrol sınırını yeniden kur`,
    acceptableEn: (f:string) => `Keep personnel outside the exposure zone while ${f} is rechecked`,
    acceptableTr: (f:string) => `${f} yeniden kontrol edilirken personeli maruziyet bölgesi dışında tut`,
    weakEn: (f:string) => `Reduce the task scope and continue while watching ${f} for further change`,
    weakTr: (f:string) => `İş kapsamını azalt ve ${f} daha fazla değişir mi izleyerek devam et`,
    criticalEn: (_f:string) => `Continue because the condition has not yet produced an incident`,
    criticalTr: (_f:string) => `Koşul henüz olaya yol açmadığı için devam et`,
  },
];

export function buildExpertBlueprint(config: ExpertBlueprint): IncidentScenario {
  return buildExpertScenario({
    id: config.id,
    titleEn: config.titleEn,
    titleTr: config.titleTr,
    category: config.category,
    introEn: config.introEn,
    introTr: config.introTr,
    steps: config.stages.map((stage, index) => {
      const v = variants[index % variants.length];
      return {
        id: stage.id,
        titleEn: stage.titleEn,
        titleTr: stage.titleTr,
        situationEn: stage.situationEn,
        situationTr: stage.situationTr,
        strongEn: v.strongEn(stage.focusEn),
        strongTr: v.strongTr(stage.focusTr),
        acceptableEn: v.acceptableEn(stage.focusEn),
        acceptableTr: v.acceptableTr(stage.focusTr),
        weakEn: v.weakEn(stage.focusEn),
        weakTr: v.weakTr(stage.focusTr),
        criticalEn: v.criticalEn(stage.focusEn),
        criticalTr: v.criticalTr(stage.focusTr),
        lessonEn: stage.focusEn,
        lessonTr: stage.focusTr,
      };
    }),
  });
}
