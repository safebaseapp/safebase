/**
 * Package 3 – site-specific HSE judgment.
 * The correct response is based on the fictional visible condition, not a
 * substitute for a real risk assessment, site PTW or competent-person review.
 * No Supabase writes and no Labs XP awards occur in this prototype.
 */
export type Assessment = {
  correct: 0 | 1 | 2;
  priority: "high" | "critical";
  tr: readonly [string, string, string];
  en: readonly [string, string, string];
};

export const assessments: Record<string, Assessment> = {
  "exit-blocked": {
    correct: 1, priority: "critical",
    tr: ["Malzemeleri vardiya sonunda kaldırmak üzere kayıt aç.", "Kaçış yolunu derhal açtır ve yeniden engellenmesini önle.", "Malzemelerin yanına ilave çıkış yönlendirme levhası koy."],
    en: ["Log the materials for removal at the end of the shift.", "Clear the escape route immediately and prevent it being obstructed again.", "Add another exit direction sign beside the stored materials."],
  },
  "trailing-cable": {
    correct: 2, priority: "high",
    tr: ["Geçişe bir uyarı levhası as ve çalışmaya devam et.", "Yayalara kabloyu aşarak geçmelerini söyle.", "Kabloyu geçişten kaldır veya uygun korumaya al; sonra yolu aç."],
    en: ["Put up a caution sign and allow work to continue.", "Tell pedestrians to step over the cable.", "Remove the cable from the route or protect it appropriately before reopening passage."],
  },
  "open-excavation": {
    correct: 0, priority: "critical",
    tr: ["Yaklaşımı durdur, kazıyı uygun bariyerle çevrele ve erişimi kontrol et.", "Açık tarafta sadece bir gözcü bulundur.", "Kazı kenarını bantla işaretleyip yaklaşmaya izin ver."],
    en: ["Stop approach, install suitable excavation barriers and control access.", "Post only a spotter at the unguarded side.", "Mark the edge with tape and allow people to approach."],
  },
  "scaffold-guardrail": {
    correct: 1, priority: "critical",
    tr: ["Emniyet kemeri varsa platformu kullanılabilir kabul et.", "Erişimi durdur; korkuluğu yetkin ekibe tamamlattır ve kontrol ettir.", "Personeli kenara yaklaşmaması konusunda sözlü uyar."],
    en: ["Treat the platform as usable if workers wear harnesses.", "Stop access until a competent team restores and inspects the guardrail.", "Verbally remind workers to stay away from the edge."],
  },
  "scaffold-loose-tools": {
    correct: 2, priority: "high",
    tr: ["Sadece aşağıdaki ekibe baret kullanmasını hatırlat.", "İskele altına düşen cisim uyarı levhası as.", "Malzemeyi sabitle, uygun tutucu önlemleri sağla ve alt bölgeyi koru."],
    en: ["Remind the team below to wear hard hats.", "Post a falling-object sign underneath the scaffold.", "Secure materials, provide appropriate containment and protect the area below."],
  },
  "cylinder-unsecured": {
    correct: 0, priority: "high",
    tr: ["Tüpü uygun düzenekle dik sabitle ve vana korumasını doğrula.", "Yalnızca tüp vanasına koruyucu kapak tak.", "Tüpü duvar kenarına sürükle ve orada bırak."],
    en: ["Secure the upright cylinder with a suitable restraint and verify valve protection.", "Fit only a protective valve cap.", "Drag the cylinder next to a wall and leave it there."],
  },
  "hot-work-combustible": {
    correct: 1, priority: "critical",
    tr: ["Ek bir yangın gözcüsü atayıp kesime devam et.", "Sıcak işi durdur; yanıcıları uzaklaştır veya koru, izin ve yangın önlemlerini doğrula.", "Yanıcıların üzerine biraz su serp ve çalışmaya devam et."],
    en: ["Add another fire watcher and continue cutting.", "Stop hot work; remove or protect combustibles and verify the permit and fire precautions.", "Sprinkle water onto the combustibles and continue work."],
  },
  "suspended-load": {
    correct: 2, priority: "critical",
    tr: ["Yayalardan yükün bir metre uzağında durmalarını iste.", "Operatöre telsizle dikkatli kaldırmasını söyle.", "Kaldırmayı durdur, yük yolunu boşalt ve etkin yasaklı bölge oluştur."],
    en: ["Tell pedestrians to stand one metre away from the suspended load.", "Radio the operator to lift carefully.", "Stop the lift, clear the load path and enforce an effective exclusion zone."],
  },
  "vehicle-interface": {
    correct: 0, priority: "high",
    tr: ["Yaya ve araç güzergâhlarını uygun plan ve fiziksel ayırmayla düzenle.", "İş makinesine sürekli korna çaldır.", "Yayalara sadece reflektif yelek giydir."],
    en: ["Separate vehicle and pedestrian routes using a traffic plan and physical controls.", "Require the machine to sound its horn continuously.", "Only require high-visibility vests for pedestrians."],
  },
  "electrical-panel": {
    correct: 2, priority: "critical",
    tr: ["Yakındaki herhangi bir işçiye panonun kapağını kapattır.", "Açık panonun üzerine plastik örtü ser.", "Erişimi kısıtla; yetkili elektrik personeline panoyu emniyete aldır ve kontrol ettir."],
    en: ["Ask any nearby worker to close the panel.", "Put a plastic sheet over the open enclosure.", "Restrict access and have authorized electrical staff secure and inspect the enclosure."],
  },
  "oil-spill": {
    correct: 1, priority: "high",
    tr: ["Yalnızca kaygan zemin tabelası koy.", "Kaynağı izole et, döküntüyü kontrol altına al ve uygun yöntemle temizlet.", "Döküntüyü suyla yakındaki drenaja doğru süpür."],
    en: ["Only place a slippery-floor sign.", "Isolate the source, contain the spill and have it cleaned using a suitable method.", "Wash the spill toward the nearby drain."],
  },
  "improper-materials": {
    correct: 0, priority: "high",
    tr: ["Boruları uygun depolamaya taşı ve yuvarlanmaya karşı takozla.", "İstifin etrafına yalnızca uyarı bandı çek.", "İnsanlardan boruların üzerinden geçmelerini iste."],
    en: ["Move pipes to proper storage and chock them against rolling.", "Only place warning tape around the stack.", "Ask workers to step over the pipes."],
  },
};

export const POINTS_PER_FINDING = 20;
export const MAX_MISSION_SCORE = Object.keys(assessments).length * POINTS_PER_FINDING;
export const pointsForDecision = (wrongAttempts: number): number =>
  wrongAttempts === 0 ? 20 : wrongAttempts === 1 ? 10 : 0;
