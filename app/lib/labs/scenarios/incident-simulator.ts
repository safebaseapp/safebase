export type DecisionImpact = { safety: number; judgment: number; response: number };

export type IncidentChoice = {
  id: string;
  labelEn: string;
  labelTr: string;
  consequenceEn: string;
  consequenceTr: string;
  impact: DecisionImpact;
  next: string | null;
  critical?: boolean;
};

export type IncidentNode = {
  id: string;
  titleEn: string;
  titleTr: string;
  situationEn: string;
  situationTr: string;
  choices: IncidentChoice[];
};

export type IncidentScenario = {
  id: string;
  titleEn: string;
  titleTr: string;
  category: string;
  difficulty: "hard" | "expert";
  introEn: string;
  introTr: string;
  start: string;
  nodes: IncidentNode[];
};

export const hotWorkIncident: IncidentScenario = {
  id: "hot-work-gas-drift",
  titleEn: "Hot Work: The Reading Changes",
  titleTr: "Sıcak Çalışma: Ölçüm Değişiyor",
  category: "Hot Work / Gas Testing",
  difficulty: "expert",
  introEn: "You are the HSE supervisor for hot work near a process area. The permit is valid, controls are in place and work is about to start. Conditions begin to change. Your decisions alter what happens next.",
  introTr: "Proses alanı yakınındaki sıcak çalışmanın HSE sorumlususun. İzin geçerli, kontroller uygulanmış ve iş başlamak üzere. Ancak koşullar değişmeye başlıyor. Vereceğin kararlar sonraki olayı değiştirecek.",
  start: "gas-shift",
  nodes: [
    {
      id: "gas-shift",
      titleEn: "A reading starts to drift",
      titleTr: "Gaz ölçümü değişmeye başlıyor",
      situationEn: "The pre-work gas test was acceptable. Minutes later, the continuous monitor shows a rising flammable-gas trend. It has not yet reached the alarm setpoint. The crew is ready and the permit is signed.",
      situationTr: "Çalışma öncesi gaz ölçümü uygundu. Dakikalar sonra sürekli ölçüm cihazında yanıcı gaz değerinin yükseldiği görülüyor. Alarm seviyesine henüz ulaşmadı. Ekip hazır ve izin imzalı.",
      choices: [
        { id: "continue", labelEn: "Continue until the monitor alarms", labelTr: "Cihaz alarm verene kadar devam et", consequenceEn: "Work starts while conditions are deteriorating. The decision relies on an alarm threshold instead of maintaining verified safe conditions.", consequenceTr: "Koşullar kötüleşirken çalışma başlar. Karar, güvenli koşulların sürdürüldüğünü doğrulamak yerine alarm sınırına dayanır.", impact: { safety: -35, judgment: -30, response: -20 }, next: "alarm", critical: true },
        { id: "pause", labelEn: "Pause, investigate the trend and retest", labelTr: "Durdur, artışın nedenini araştır ve tekrar ölç", consequenceEn: "The job is held before ignition sources are introduced. The team checks the area and verifies whether conditions remain suitable.", consequenceTr: "Ateşleme kaynağı devreye girmeden iş bekletilir. Ekip alanı kontrol eder ve koşulların uygunluğunu yeniden doğrular.", impact: { safety: 25, judgment: 25, response: 20 }, next: "source" },
        { id: "move-monitor", labelEn: "Move the monitor farther away and proceed", labelTr: "Cihazı daha uzağa taşı ve devam et", consequenceEn: "The indication falls, but only because the detector was moved away from the developing hazard.", consequenceTr: "Değer düşer; ancak bunun nedeni dedektörün gelişen tehlikeden uzaklaştırılmasıdır.", impact: { safety: -45, judgment: -40, response: -25 }, next: "alarm", critical: true },
      ],
    },
    {
      id: "source",
      titleEn: "The source is upstream",
      titleTr: "Kaynak üst tarafta",
      situationEn: "The crew finds intermittent vapor release from nearby process equipment. Operations says it should stop shortly and asks whether the hot work can begin while they monitor it.",
      situationTr: "Ekip yakındaki proses ekipmanından aralıklı buhar çıkışı tespit ediyor. Operasyon bunun kısa sürede kesileceğini söylüyor ve izleyerek sıcak çalışmaya başlanıp başlanamayacağını soruyor.",
      choices: [
        { id: "wait-verify", labelEn: "Keep the job suspended; control the source and revalidate the permit", labelTr: "İşi askıda tut; kaynağı kontrol et ve izni yeniden doğrula", consequenceEn: "The changing condition is treated as a permit-control change. Work remains stopped until the source is controlled and safe conditions are re-established.", consequenceTr: "Değişen koşul izin kontrolünde değişiklik olarak ele alınır. Kaynak kontrol edilip güvenli koşullar yeniden sağlanana kadar iş durur.", impact: { safety: 35, judgment: 30, response: 30 }, next: "finish-safe" },
        { id: "watch", labelEn: "Start with an extra fire watch", labelTr: "Ek yangın gözcüsü ile başla", consequenceEn: "A fire watch does not remove the atmospheric hazard. The crew is exposed to a condition outside the assumptions of the original permit.", consequenceTr: "Yangın gözcüsü atmosferik tehlikeyi ortadan kaldırmaz. Ekip, ilk iznin varsayımlarının dışındaki bir koşula maruz kalır.", impact: { safety: -30, judgment: -25, response: -15 }, next: "alarm", critical: true },
      ],
    },
    {
      id: "alarm",
      titleEn: "The detector alarms",
      titleTr: "Dedektör alarm veriyor",
      situationEn: "The flammable-gas alarm activates. Hot work equipment is energized and the crew looks to you for direction.",
      situationTr: "Yanıcı gaz alarmı devreye giriyor. Sıcak çalışma ekipmanı enerjili ve ekip senden talimat bekliyor.",
      choices: [
        { id: "stop-isolate", labelEn: "Stop work, remove ignition sources, withdraw and escalate", labelTr: "İşi durdur, ateşleme kaynaklarını kaldır, alanı boşalt ve bildir", consequenceEn: "Exposure is reduced and the event is escalated for process control and permit revalidation.", consequenceTr: "Maruziyet azaltılır ve proses kontrolü ile izin yeniden doğrulaması için olay üst seviyeye bildirilir.", impact: { safety: 25, judgment: 20, response: 35 }, next: "finish-recovered" },
        { id: "finish-cut", labelEn: "Finish the current cut before stopping", labelTr: "Durdurmadan önce mevcut kesimi bitir", consequenceEn: "The crew remains exposed during an active flammable-gas alarm for production convenience.", consequenceTr: "Ekip, işi tamamlama amacıyla aktif yanıcı gaz alarmı sırasında maruziyette kalır.", impact: { safety: -50, judgment: -40, response: -40 }, next: "finish-critical", critical: true },
      ],
    },
    { id: "finish-safe", titleEn: "Controlled outcome", titleTr: "Kontrollü sonuç", situationEn: "The vapor source is isolated, the area is ventilated, gas testing is repeated and the permit is revalidated before work resumes.", situationTr: "Buhar kaynağı izole edilir, alan havalandırılır, gaz ölçümü tekrarlanır ve çalışma yeniden başlamadan önce izin tekrar doğrulanır.", choices: [] },
    { id: "finish-recovered", titleEn: "Recovered after escalation", titleTr: "Eskalasyon sonrası kontrol", situationEn: "The job is stopped without injury. The near miss is reviewed because earlier decisions allowed deteriorating conditions to progress.", situationTr: "İş yaralanma olmadan durdurulur. Önceki kararlar kötüleşen koşulların ilerlemesine izin verdiği için ramak kala olay incelenir.", choices: [] },
    { id: "finish-critical", titleEn: "Critical failure", titleTr: "Kritik başarısızlık", situationEn: "The scenario ends with uncontrolled exposure to a credible ignition hazard. The decision chain failed to stop work when conditions changed.", situationTr: "Senaryo, gerçekçi bir ateşleme tehlikesine kontrolsüz maruziyetle sona erer. Karar zinciri koşullar değiştiğinde işi durdurmayı başaramadı.", choices: [] },
  ],
};
