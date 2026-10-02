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
        { id: "continue", labelEn: "Continue until the monitor alarms", labelTr: "Cihaz alarm verene kadar devam et", consequenceEn: "Work starts while conditions are deteriorating. The decision relies on an alarm threshold instead of maintaining verified safe conditions.", consequenceTr: "Koşullar kötüleşirken çalışma başlar. Karar, güvenli koşulların sürdürüldüğünü doğrulamak yerine alarm sınırına dayanır.", impact: { safety: -25, judgment: -22, response: -16 }, next: "alarm", critical: true },
        { id: "pause", labelEn: "Pause, investigate the trend and retest", labelTr: "Durdur, artışın nedenini araştır ve tekrar ölç", consequenceEn: "The job is held before ignition sources are introduced. The team checks the area and verifies whether conditions remain suitable.", consequenceTr: "Ateşleme kaynağı devreye girmeden iş bekletilir. Ekip alanı kontrol eder ve koşulların uygunluğunu yeniden doğrular.", impact: { safety: 4, judgment: 4, response: 3 }, next: "source-check" },
        { id: "move-monitor", labelEn: "Move the monitor farther away and proceed", labelTr: "Cihazı daha uzağa taşı ve devam et", consequenceEn: "The indication falls only because the detector is moved away from the developing hazard.", consequenceTr: "Değer yalnızca dedektör gelişen tehlikeden uzaklaştırıldığı için düşer.", impact: { safety: -35, judgment: -30, response: -18 }, next: "alarm", critical: true },
      ],
    },
    {
      id: "source-check",
      titleEn: "The source is upstream",
      titleTr: "Kaynak üst tarafta",
      situationEn: "The crew identifies intermittent vapor release from nearby process equipment. Operations says it should stop shortly and asks whether hot work can begin while they monitor it.",
      situationTr: "Ekip yakındaki proses ekipmanından aralıklı buhar çıkışı tespit ediyor. Operasyon bunun kısa sürede kesileceğini söylüyor ve izleyerek sıcak çalışmaya başlanıp başlanamayacağını soruyor.",
      choices: [
        { id: "hold-source", labelEn: "Keep the job suspended and require source control", labelTr: "İşi askıda tut ve kaynağın kontrol edilmesini iste", consequenceEn: "The changing condition is treated as a permit-control change and the source is addressed before work can continue.", consequenceTr: "Değişen koşul izin kontrolünde değişiklik olarak ele alınır ve çalışma devam etmeden önce kaynak kontrol edilir.", impact: { safety: 4, judgment: 4, response: 4 }, next: "operations-pressure" },
        { id: "extra-watch", labelEn: "Start with an extra fire watch", labelTr: "Ek yangın gözcüsü ile başla", consequenceEn: "A fire watch does not eliminate the atmospheric hazard and work proceeds outside the original permit assumptions.", consequenceTr: "Yangın gözcüsü atmosferik tehlikeyi ortadan kaldırmaz ve çalışma ilk iznin varsayımlarının dışında ilerler.", impact: { safety: -22, judgment: -20, response: -12 }, next: "alarm", critical: true },
      ],
    },
    {
      id: "operations-pressure",
      titleEn: "Operations asks for a quick exception",
      titleTr: "Operasyon hızlı bir istisna istiyor",
      situationEn: "Production is behind schedule. The area operator proposes a ten-minute window to finish the cut before the process upset is fully corrected.",
      situationTr: "Üretim programı geride. Alan operatörü proses sapması tamamen giderilmeden kesimi bitirmek için on dakikalık bir pencere öneriyor.",
      choices: [
        { id: "no-exception", labelEn: "Reject the exception and maintain stop-work", labelTr: "İstisnayı reddet ve işi durdurma kararını koru", consequenceEn: "Schedule pressure does not override the changed atmospheric condition or permit basis.", consequenceTr: "Program baskısı değişen atmosferik koşulu veya iznin temelini geçersiz kılmaz.", impact: { safety: 3, judgment: 5, response: 3 }, next: "isolation-plan" },
        { id: "ten-minute", labelEn: "Allow a ten-minute controlled window", labelTr: "On dakikalık kontrollü çalışma izni ver", consequenceEn: "A time limit does not control the vapor source; ignition exposure is knowingly accepted.", consequenceTr: "Süre sınırı buhar kaynağını kontrol etmez; ateşleme maruziyeti bilinçli olarak kabul edilir.", impact: { safety: -28, judgment: -28, response: -15 }, next: "alarm", critical: true },
      ],
    },
    {
      id: "isolation-plan",
      titleEn: "The source must be isolated",
      titleTr: "Kaynak izole edilmeli",
      situationEn: "Operations can isolate the suspected equipment, but doing so changes the process configuration and requires confirmation of the isolation boundary.",
      situationTr: "Operasyon şüpheli ekipmanı izole edebilir; ancak bu proses konfigürasyonunu değiştiriyor ve izolasyon sınırının doğrulanmasını gerektiriyor.",
      choices: [
        { id: "verify-isolation", labelEn: "Verify the isolation boundary before accepting it", labelTr: "İzolasyonu kabul etmeden önce sınırı doğrula", consequenceEn: "The team confirms the correct valves and energy sources before relying on the isolation.", consequenceTr: "Ekip izolasyona güvenmeden önce doğru vanaları ve enerji kaynaklarını doğrular.", impact: { safety: 4, judgment: 4, response: 3 }, next: "ventilation" },
        { id: "verbal-ok", labelEn: "Accept verbal confirmation from Operations", labelTr: "Operasyonun sözlü teyidini yeterli kabul et", consequenceEn: "The work team relies on an unverified isolation for a hazard that already changed once.", consequenceTr: "Çalışma ekibi daha önce değişmiş bir tehlike için doğrulanmamış izolasyona güvenir.", impact: { safety: -18, judgment: -18, response: -10 }, next: "alarm", critical: true },
      ],
    },
    {
      id: "ventilation",
      titleEn: "The area still holds residual vapor",
      titleTr: "Alanda kalıntı buhar var",
      situationEn: "The source is isolated, but a low residual reading remains around a nearby low point. The crew asks whether natural dilution is enough.",
      situationTr: "Kaynak izole edildi ancak yakındaki alçak noktada düşük seviyede kalıntı ölçüm devam ediyor. Ekip doğal dağılmanın yeterli olup olmadığını soruyor.",
      choices: [
        { id: "ventilate", labelEn: "Ventilate and continue monitoring until stable", labelTr: "Havalandır ve değer stabil olana kadar izlemeye devam et", consequenceEn: "Residual vapor is actively removed and the atmosphere is trended rather than judged from a single reading.", consequenceTr: "Kalıntı buhar aktif olarak uzaklaştırılır ve atmosfer tek ölçüm yerine trend üzerinden değerlendirilir.", impact: { safety: 4, judgment: 3, response: 4 }, next: "retest" },
        { id: "wait-only", labelEn: "Wait five minutes and take one reading", labelTr: "Beş dakika bekle ve tek ölçüm al", consequenceEn: "A single point-in-time reading may miss continued migration or accumulation.", consequenceTr: "Tek seferlik ölçüm devam eden yayılımı veya birikmeyi kaçırabilir.", impact: { safety: -8, judgment: -10, response: -5 }, next: "retest" },
      ],
    },
    {
      id: "retest",
      titleEn: "Retest shows acceptable values",
      titleTr: "Tekrar ölçüm uygun değerleri gösteriyor",
      situationEn: "Several readings are now within the accepted range. The original permit, however, was issued before the process condition changed.",
      situationTr: "Birden fazla ölçüm artık kabul edilen aralıkta. Ancak ilk çalışma izni proses koşulu değişmeden önce düzenlenmişti.",
      choices: [
        { id: "revalidate", labelEn: "Revalidate the permit before restart", labelTr: "Yeniden başlamadan önce izni tekrar doğrula", consequenceEn: "The permit is brought back in line with the actual conditions and revised controls.", consequenceTr: "İzin gerçek koşullar ve güncellenen kontrollerle yeniden uyumlu hale getirilir.", impact: { safety: 3, judgment: 5, response: 3 }, next: "permit-revalidation" },
        { id: "permit-still-valid", labelEn: "Use the original permit because it has not expired", labelTr: "Süresi dolmadığı için mevcut izinle devam et", consequenceEn: "Validity by time is treated as more important than validity of the underlying conditions.", consequenceTr: "Süre geçerliliği, iznin dayandığı koşulların geçerliliğinden daha önemli kabul edilir.", impact: { safety: -16, judgment: -22, response: -9 }, next: "alarm", critical: true },
      ],
    },
    {
      id: "permit-revalidation",
      titleEn: "Controls have changed",
      titleTr: "Kontroller değişti",
      situationEn: "During permit revalidation, the team adds continuous gas monitoring and a tighter exclusion zone. The contractor supervisor wants to brief only the welder to save time.",
      situationTr: "İzin yeniden doğrulanırken sürekli gaz ölçümü ve daha sıkı yasak bölge ekleniyor. Yüklenici amiri zaman kazanmak için yalnızca kaynakçıya bilgi vermek istiyor.",
      choices: [
        { id: "brief-all", labelEn: "Brief everyone affected before restart", labelTr: "Yeniden başlamadan önce etkilenen tüm ekibi bilgilendir", consequenceEn: "All affected workers understand the changed controls, stop-work triggers and communication route.", consequenceTr: "Etkilenen tüm çalışanlar değişen kontrolleri, işi durdurma tetiklerini ve iletişim yolunu anlar.", impact: { safety: 3, judgment: 3, response: 4 }, next: "crew-brief" },
        { id: "welder-only", labelEn: "Brief only the welder", labelTr: "Sadece kaynakçıyı bilgilendir", consequenceEn: "Other workers remain exposed to a changed work boundary they were not briefed on.", consequenceTr: "Diğer çalışanlar bilgilendirilmedikleri değişmiş çalışma sınırına maruz kalır.", impact: { safety: -10, judgment: -10, response: -10 }, next: "crew-brief" },
      ],
    },
    {
      id: "crew-brief",
      titleEn: "A nearby crew enters the boundary",
      titleTr: "Yakındaki ekip çalışma sınırına giriyor",
      situationEn: "Before restart, another contractor begins moving materials through the revised exclusion zone and says they were not told about the change.",
      situationTr: "Yeniden başlamadan önce başka bir yüklenici güncellenen yasak bölgeden malzeme taşımaya başlıyor ve değişiklikten haberleri olmadığını söylüyor.",
      choices: [
        { id: "control-boundary", labelEn: "Stop the restart and re-establish the exclusion zone", labelTr: "Yeniden başlatmayı durdur ve yasak bölgeyi tekrar kur", consequenceEn: "The interface risk is controlled before ignition sources return to service.", consequenceTr: "Ateşleme kaynakları tekrar devreye girmeden arayüz riski kontrol edilir.", impact: { safety: 4, judgment: 3, response: 5 }, next: "restart-check" },
        { id: "warn-and-go", labelEn: "Warn them verbally and restart", labelTr: "Sözlü uyar ve çalışmayı yeniden başlat", consequenceEn: "The boundary remains vulnerable to another entry because the interface control is not restored.", consequenceTr: "Arayüz kontrolü yeniden kurulmadığı için sınır tekrar ihlal edilmeye açık kalır.", impact: { safety: -12, judgment: -8, response: -12 }, next: "restart-check" },
      ],
    },
    {
      id: "restart-check",
      titleEn: "Everything looks ready to restart",
      titleTr: "Her şey yeniden başlamak için hazır görünüyor",
      situationEn: "Isolation is confirmed, atmosphere is stable, permit controls are updated and the exclusion zone is restored. The crew asks for your final release.",
      situationTr: "İzolasyon doğrulandı, atmosfer stabil, izin kontrolleri güncellendi ve yasak bölge tekrar kuruldu. Ekip son onayı bekliyor.",
      choices: [
        { id: "final-verification", labelEn: "Complete a final field verification before release", labelTr: "Onay vermeden önce son saha doğrulamasını yap", consequenceEn: "The restart decision is based on the actual field condition, not only paperwork completion.", consequenceTr: "Yeniden başlatma kararı yalnızca evrak tamamlanmasına değil gerçek saha koşuluna dayanır.", impact: { safety: 3, judgment: 4, response: 3 }, next: "post-restart-monitor" },
        { id: "paperwork-enough", labelEn: "Release the job based on the completed permit", labelTr: "Tamamlanan izne dayanarak çalışmayı serbest bırak", consequenceEn: "The last opportunity to confirm field conditions is skipped.", consequenceTr: "Saha koşullarını son kez doğrulama fırsatı atlanır.", impact: { safety: -7, judgment: -9, response: -5 }, next: "post-restart-monitor" },
      ],
    },
    {
      id: "post-restart-monitor",
      titleEn: "The first minutes after restart",
      titleTr: "Yeniden başlatmadan sonraki ilk dakikalar",
      situationEn: "Hot work restarts. Gas readings remain acceptable, but the process area is still recovering from the earlier upset. How do you close the decision chain?",
      situationTr: "Sıcak çalışma yeniden başlıyor. Gaz ölçümleri uygun ancak proses alanı önceki sapmadan hâlâ toparlanıyor. Karar zincirini nasıl tamamlarsın?",
      choices: [
        { id: "enhanced-monitoring", labelEn: "Maintain enhanced monitoring through the vulnerable period", labelTr: "Hassas dönem boyunca artırılmış izlemeyi sürdür", consequenceEn: "The team keeps the strengthened controls until conditions demonstrate sustained stability.", consequenceTr: "Ekip koşullar sürekli stabil olduğunu gösterene kadar güçlendirilmiş kontrolleri sürdürür.", impact: { safety: 4, judgment: 4, response: 4 }, next: "finish-safe" },
        { id: "normal-routine", labelEn: "Return immediately to normal monitoring", labelTr: "Hemen normal izleme düzenine dön", consequenceEn: "The job resumes safely, but the extra margin created for the recovering process condition is removed too early.", consequenceTr: "Çalışma güvenli şekilde devam eder ancak toparlanan proses koşulu için oluşturulan ek güvenlik marjı erken kaldırılır.", impact: { safety: -5, judgment: -6, response: -6 }, next: "finish-safe" },
      ],
    },
    {
      id: "alarm",
      titleEn: "The detector alarms",
      titleTr: "Dedektör alarm veriyor",
      situationEn: "The flammable-gas alarm activates. Hot work equipment is energized and the crew looks to you for direction.",
      situationTr: "Yanıcı gaz alarmı devreye giriyor. Sıcak çalışma ekipmanı enerjili ve ekip senden talimat bekliyor.",
      choices: [
        { id: "stop-isolate", labelEn: "Stop work, remove ignition sources, withdraw and escalate", labelTr: "İşi durdur, ateşleme kaynaklarını kaldır, alanı boşalt ve bildir", consequenceEn: "Exposure is reduced and the event is escalated for process control and permit revalidation.", consequenceTr: "Maruziyet azaltılır ve proses kontrolü ile izin yeniden doğrulaması için olay üst seviyeye bildirilir.", impact: { safety: 8, judgment: 6, response: 10 }, next: "finish-recovered" },
        { id: "finish-cut", labelEn: "Finish the current cut before stopping", labelTr: "Durdurmadan önce mevcut kesimi bitir", consequenceEn: "The crew remains exposed during an active flammable-gas alarm for production convenience.", consequenceTr: "Ekip, işi tamamlama amacıyla aktif yanıcı gaz alarmı sırasında maruziyette kalır.", impact: { safety: -45, judgment: -38, response: -38 }, next: "finish-critical", critical: true },
      ],
    },
    { id: "finish-safe", titleEn: "Controlled outcome", titleTr: "Kontrollü sonuç", situationEn: "The source is isolated, the permit is revalidated, the work interface is controlled and enhanced monitoring is maintained through restart.", situationTr: "Kaynak izole edilir, izin yeniden doğrulanır, çalışma arayüzü kontrol edilir ve yeniden başlatma boyunca artırılmış izleme sürdürülür.", choices: [] },
    { id: "finish-recovered", titleEn: "Recovered after escalation", titleTr: "Eskalasyon sonrası kontrol", situationEn: "The job is stopped without injury. The near miss is reviewed because earlier decisions allowed deteriorating conditions to progress.", situationTr: "İş yaralanma olmadan durdurulur. Önceki kararlar kötüleşen koşulların ilerlemesine izin verdiği için ramak kala olay incelenir.", choices: [] },
    { id: "finish-critical", titleEn: "Critical failure", titleTr: "Kritik başarısızlık", situationEn: "The scenario ends with uncontrolled exposure to a credible ignition hazard. The decision chain failed to stop work when conditions changed.", situationTr: "Senaryo, gerçekçi bir ateşleme tehlikesine kontrolsüz maruziyetle sona erer. Karar zinciri koşullar değiştiğinde işi durdurmayı başaramadı.", choices: [] },
  ],
};

export const incidentScenarios: Record<string, IncidentScenario> = {
  [hotWorkIncident.id]: hotWorkIncident,
};
