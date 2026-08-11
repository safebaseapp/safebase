type MethodStep = {
  id: string;
  step: string;
  hazards: string;
  controls: string;
  responsible: string;
};

type Props = {
  isTurkish: boolean;
  projectName: string;
  companyName: string;
  location: string;
  activity: string;
  documentNo: string;
  revision: string;
  date: string;

  scope: string;
  responsibilities: string;
  competency: string;
  ppe: string;
  toolsEquipment: string;
  permits: string;
  preWorkRequirements: string;

  methodSteps: MethodStep[];

  emergencyArrangements: string;
  environmentalControls: string;
  references: string;

  preparedBy: string;
  reviewedBy: string;
  approvedBy: string;
};

function TextBlock({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  if (!value.trim()) return null;

  return (
    <section className="ms-print-block">
      <h2>{title}</h2>
      <div className="ms-print-text">{value}</div>
    </section>
  );
}

export default function MethodStatementPrint({
  isTurkish,
  projectName,
  companyName,
  location,
  activity,
  documentNo,
  revision,
  date,
  scope,
  responsibilities,
  competency,
  ppe,
  toolsEquipment,
  permits,
  preWorkRequirements,
  methodSteps,
  emergencyArrangements,
  environmentalControls,
  references,
  preparedBy,
  reviewedBy,
  approvedBy,
}: Props) {
  return (
    <>
      <div id="method-statement-print">
        {/* DOCUMENT HEADER */}
        <header className="ms-document-header">
          <div className="ms-brand">
            <div className="ms-logo-text">
              <strong>
                <span>Safe</span>Base
              </strong>
              <small>HEALTH &amp; SAFETY RESOURCES</small>
            </div>
          </div>

          <div className="ms-title-area">
            <div className="ms-document-type">
              {isTurkish ? "ÇALIŞMA YÖNTEMİ" : "METHOD STATEMENT"}
            </div>

            <h1>
              {activity ||
                (isTurkish
                  ? "Profesyonel Method Statement"
                  : "Professional Method Statement")}
            </h1>
          </div>

          <div className="ms-doc-control">
            <div>
              <span>{isTurkish ? "Doküman No" : "Document No"}</span>
              <strong>{documentNo || "-"}</strong>
            </div>

            <div>
              <span>{isTurishFix(isTurkish, "Revizyon", "Revision")}</span>
              <strong>{revision || "-"}</strong>
            </div>

            <div>
              <span>{isTurishFix(isTurkish, "Tarih", "Date")}</span>
              <strong>{date || "-"}</strong>
            </div>
          </div>
        </header>

        {/* PROJECT INFORMATION */}
        <table className="ms-info-table">
          <tbody>
            <tr>
              <th>{isTurkish ? "PROJE" : "PROJECT"}</th>
              <td>{projectName || "-"}</td>

              <th>{isTurkish ? "ŞİRKET" : "COMPANY"}</th>
              <td>{companyName || "-"}</td>
            </tr>

            <tr>
              <th>{isTurkish ? "LOKASYON" : "LOCATION"}</th>
              <td>{location || "-"}</td>

              <th>{isTurkish ? "FAALİYET" : "ACTIVITY"}</th>
              <td>{activity || "-"}</td>
            </tr>
          </tbody>
        </table>

        <TextBlock
          title={isTurkish ? "1. İŞİN KAPSAMI" : "1. SCOPE OF WORK"}
          value={scope}
        />

        <TextBlock
          title={isTurkish ? "2. GÖREV VE SORUMLULUKLAR" : "2. RESPONSIBILITIES"}
          value={responsibilities}
        />

        <TextBlock
          title={isTurkish ? "3. YETKİNLİK VE EĞİTİM" : "3. COMPETENCY & TRAINING"}
          value={competency}
        />

        <div className="ms-two-column">
          <TextBlock title="4. PPE" value={ppe} />

          <TextBlock
            title={isTurkish ? "5. ARAÇ VE EKİPMANLAR" : "5. TOOLS & EQUIPMENT"}
            value={toolsEquipment}
          />
        </div>

        <div className="ms-two-column">
          <TextBlock
            title={isTurkish ? "6. İZİNLER / PTW" : "6. PERMITS / PTW"}
            value={permits}
          />

          <TextBlock
            title={
              isTurkish
                ? "7. İŞE BAŞLAMADAN ÖNCE"
                : "7. PRE-WORK REQUIREMENTS"
            }
            value={preWorkRequirements}
          />
        </div>

        {/* PRE-TASK RISK CONTROLS */}
        <section className="ms-pretask-section">
          <h2>
            {isTurkish
              ? "8. İŞE BAŞLAMADAN ÖNCE RİSK KONTROLLERİ"
              : "8. PRE-TASK RISK CONTROLS"}
          </h2>

          <table className="ms-pretask-table">
            <thead>
              <tr>
                <th>{isTurkish ? "Kritik Tehlike" : "Critical Hazard"}</th>
                <th>{isTurkish ? "Gerekli Kontrol" : "Required Control"}</th>
                <th>{isTurkish ? "Doğrulama" : "Verification"}</th>
              </tr>
            </thead>

            <tbody>
              {(activity === "LOTO / Enerji İzolasyonu" || activity === "LOTO / Energy Isolation"
                ? [
                    [
                      isTurkish
                        ? "Tanımlanmamış enerji kaynağı"
                        : "Unidentified energy source",
                      isTurkish
                        ? "Elektrik, mekanik, hidrolik, pnömatik, termal, yerçekimi ve proses enerjileri dahil tüm tehlikeli enerji kaynakları işe başlamadan önce belirlenmelidir."
                        : "All hazardous energy sources, including electrical, mechanical, hydraulic, pneumatic, thermal, gravitational and process energy, shall be identified before work begins.",
                      isTurkish
                        ? "Enerji kaynağı listesi"
                        : "Energy-source verification",
                    ],
                    [
                      isTurkish
                        ? "Eksik / yanlış izolasyon"
                        : "Incomplete / incorrect isolation",
                      isTurkish
                        ? "Doğru izolasyon noktaları ekipman ve proses bilgilerine göre belirlenmeli, tüm ilgili kaynaklar güvenli şekilde izole edilmelidir."
                        : "Correct isolation points shall be identified from equipment and process information and all relevant sources safely isolated.",
                      isTurkish
                        ? "İzolasyon noktası kontrolü"
                        : "Isolation-point check",
                    ],
                    [
                      isTurkish
                        ? "Yetkisiz yeniden enerjilendirme"
                        : "Unauthorized re-energization",
                      isTurkish
                        ? "Yetkili personel prosedüre uygun kişisel kilit ve etiket uygulamalı; başkasına ait kilit/etiket yetkisiz şekilde kaldırılmamalıdır."
                        : "Authorized personnel shall apply personal locks and tags in accordance with the procedure; another person's lock/tag shall not be removed without authorization.",
                      isTurkish
                        ? "Kilit / etiket kontrolü"
                        : "Lock / tag verification",
                    ],
                    [
                      isTurkish
                        ? "Depolanmış / artık enerji"
                        : "Stored / residual energy",
                      isTurkish
                        ? "Basınç, yay, yerçekimi, kondansatör, sıcaklık ve diğer depolanmış enerjiler boşaltılmalı, bloke edilmeli veya güvenli hale getirilmelidir."
                        : "Pressure, springs, gravity, capacitors, thermal energy and other stored energy shall be released, blocked or otherwise made safe.",
                      isTurkish
                        ? "Artık enerji kontrolü"
                        : "Stored-energy check",
                    ],
                    [
                      isTurkish
                        ? "Sıfır enerji doğrulanmaması"
                        : "Failure to verify zero energy",
                      isTurkish
                        ? "İzolasyon sonrası uygun test veya try-out yöntemiyle sıfır enerji durumu doğrulanmalı; elektrik için uygun gerilim yokluğu testi yapılmalıdır."
                        : "After isolation, zero-energy condition shall be verified using a suitable test or try-out method; electrical systems shall be tested for absence of voltage.",
                      isTurkish
                        ? "Zero-energy / test sonucu"
                        : "Zero-energy / test result",
                    ],
                    [
                      isTurkish
                        ? "Çalışma sırasında izolasyon değişikliği"
                        : "Isolation change during work",
                      isTurkish
                        ? "İzolasyon noktaları ve LOTO sınırları çalışma boyunca korunmalı; herhangi bir değişiklikte iş durdurulmalı ve izolasyon yeniden doğrulanmalıdır."
                        : "Isolation points and LOTO boundaries shall be maintained throughout the work; work shall stop and isolation be reverified if any change occurs.",
                      isTurkish
                        ? "LOTO sınırı kontrolü"
                        : "LOTO-boundary verification",
                    ],
                    [
                      isTurkish
                        ? "Kontrolsüz yeniden devreye alma"
                        : "Uncontrolled recommissioning",
                      isTurkish
                        ? "Tüm personel ve ekipmanın güvenli konumda olduğu doğrulanmalı, kişisel kilitler yetkili kişilerce kaldırılmalı ve enerji kontrollü şekilde geri verilmelidir."
                        : "Confirm personnel and equipment are in a safe condition, personal locks are removed by authorized persons and energy is restored in a controlled manner.",
                      isTurkish
                        ? "Yeniden devreye alma kontrolü"
                        : "Recommissioning verification",
                    ],
                  ]
                : activity === "Kapalı Alana Giriş" || activity === "Confined Space Entry"
                ? [
                    [
                      isTurkish
                        ? "Oksijen yetersizliği / zenginliği"
                        : "Oxygen deficiency / enrichment",
                      isTurkish
                        ? "Giriş öncesinde ve gerekli olduğu sürece çalışma sırasında kalibre edilmiş uygun gaz ölçüm cihazıyla oksijen seviyesi kontrol edilmeli ve kabul kriterleri sağlanmalıdır."
                        : "Oxygen concentration shall be checked before entry and, where required, continuously during the work using suitable calibrated gas-detection equipment, and acceptance criteria shall be maintained.",
                      isTurkish
                        ? "O₂ ölçümü / kayıt"
                        : "O₂ test / record",
                    ],
                    [
                      isTurkish
                        ? "Yanıcı atmosfer"
                        : "Flammable atmosphere",
                      isTurkish
                        ? "LEL seviyesi uygun gaz ölçüm cihazıyla kontrol edilmeli, kabul sınırları aşılırsa giriş yapılmamalı veya çalışma derhal durdurulmalıdır."
                        : "LEL shall be monitored using suitable gas-detection equipment. Entry shall not proceed, or work shall stop immediately, if acceptable limits are exceeded.",
                      isTurkish
                        ? "LEL ölçümü"
                        : "LEL verification",
                    ],
                    [
                      isTurkish
                        ? "Toksik gaz / buhar"
                        : "Toxic gases / vapours",
                      isTurkish
                        ? "H₂S, CO ve prosese bağlı diğer potansiyel toksik maddeler risk değerlendirmesine göre ölçülmeli ve kabul limitleri doğrulanmalıdır."
                        : "H₂S, CO and other process-specific toxic contaminants shall be tested as required by the risk assessment and verified against acceptable limits.",
                      isTurkish
                        ? "Gaz testi sonucu"
                        : "Gas-test result",
                    ],
                    [
                      isTurkish
                        ? "Beklenmeyen enerji / proses girişi"
                        : "Unexpected energy / process ingress",
                      isTurkish
                        ? "Elektrik, mekanik, hidrolik, pnömatik ve proses kaynakları LOTO ve gerekli pozitif izolasyon yöntemleriyle güvenli şekilde izole edilmeli ve giriş öncesi doğrulanmalıdır."
                        : "Electrical, mechanical, hydraulic, pneumatic and process sources shall be safely isolated using LOTO and required positive-isolation methods and verified before entry.",
                      isTurkish
                        ? "LOTO / izolasyon doğrulama"
                        : "LOTO / isolation verification",
                    ],
                    [
                      isTurkish
                        ? "Havalandırma yetersizliği"
                        : "Inadequate ventilation",
                      isTurkish
                        ? "Gerektiğinde mekanik havalandırma kurulmalı, temiz hava kaynağı kullanılmalı ve havalandırmanın etkinliği atmosfer ölçümleriyle doğrulanmalıdır."
                        : "Mechanical ventilation shall be provided where required, using a clean air source, and its effectiveness shall be verified by atmospheric testing.",
                      isTurkish
                        ? "Havalandırma kontrolü"
                        : "Ventilation verification",
                    ],
                    [
                      isTurkish
                        ? "İletişim / gözetim kaybı"
                        : "Loss of communication / monitoring",
                      isTurkish
                        ? "Gözcü giriş noktasında sürekli görev yapmalı, içerideki personeli takip etmeli ve uygun iletişim sistemi çalışma süresince aktif tutulmalıdır."
                        : "The attendant shall remain at the entry point, continuously track entrants and maintain an effective communication system throughout the entry.",
                      isTurkish
                        ? "Gözcü / iletişim kontrolü"
                        : "Attendant / communication check",
                    ],
                    [
                      isTurkish
                        ? "Kurtarma ihtiyacı"
                        : "Rescue requirement",
                      isTurkish
                        ? "Giriş başlamadan önce göreve uygun kurtarma planı, ekipmanı ve gerekli kurtarma personeli hazır olmalıdır. Uygulanabilir olduğunda giriş yapmadan kurtarma yöntemi tercih edilmelidir."
                        : "A task-appropriate rescue plan, equipment and required rescue personnel shall be ready before entry. Non-entry rescue shall be preferred where feasible.",
                      isTurkish
                        ? "Kurtarma planı hazır"
                        : "Rescue plan confirmed",
                    ],
                  ]
                : activity === "Sıcak Çalışma" || activity === "Hot Work"
                ? [
                    [
                      isTurkish ? "Yangın / tutuşma" : "Fire / ignition",
                      isTurkish
                        ? "Yanıcı ve parlayıcı malzemeler çalışma alanından uzaklaştırılmalı veya uygun yanmaz malzeme ile korunmalıdır."
                        : "Combustible and flammable materials shall be removed from the work area or protected using suitable fire-resistant materials.",
                      isTurkish
                        ? "Alan ve yangın yükü kontrolü"
                        : "Area / fire-load inspection",
                    ],
                    [
                      isTurkish
                        ? "Kıvılcım ve sıcak metal"
                        : "Sparks and hot metal",
                      isTurkish
                        ? "Kıvılcımın alt seviyelere, açıklıklara ve bitişik alanlara ulaşması önlenmeli; gerektiğinde kaynak perdesi ve yanmaz örtü kullanılmalıdır."
                        : "Sparks shall be prevented from reaching lower levels, openings and adjacent areas; welding screens and fire-resistant blankets shall be used where required.",
                      isTurkish
                        ? "Kıvılcım yayılım kontrolü"
                        : "Spark-spread verification",
                    ],
                    [
                      isTurkish
                        ? "Yanıcı / tehlikeli atmosfer"
                        : "Flammable / hazardous atmosphere",
                      isTurkish
                        ? "Risk değerlendirmesi veya saha prosedürü gerektiriyorsa sıcak çalışma öncesinde ve gerektiğinde çalışma sırasında uygun atmosfer ölçümü yapılmalıdır."
                        : "Where required by the risk assessment or site procedure, suitable atmospheric testing shall be completed before and, where necessary, during hot work.",
                      isTurkish
                        ? "Gaz ölçümü / PTW kontrolü"
                        : "Gas test / PTW verification",
                    ],
                    [
                      isTurkish
                        ? "Gaz tüpleri ve ekipmanı"
                        : "Gas cylinders and equipment",
                      isTurkish
                        ? "Gaz tüpleri dik ve sabit tutulmalı; hortumlar, regülatörler, bağlantılar ve gerekli geri tepme emniyet tertibatları kullanım öncesi kontrol edilmelidir."
                        : "Gas cylinders shall be upright and secured; hoses, regulators, connections and required flashback protection shall be inspected before use.",
                      isTurkish
                        ? "Ekipman kontrolü"
                        : "Equipment inspection",
                    ],
                    [
                      isTurkish
                        ? "Elektrik tehlikesi"
                        : "Electrical hazard",
                      isTurkish
                        ? "Kaynak ve taşlama ekipmanının kabloları, fişleri, bağlantıları ve genel durumu kontrol edilmeli; hasarlı ekipman kullanılmamalıdır."
                        : "Cables, plugs, connections and the general condition of welding and grinding equipment shall be checked; defective equipment shall not be used.",
                      isTurkish
                        ? "Kullanım öncesi kontrol"
                        : "Pre-use inspection",
                    ],
                    [
                      isTurkish
                        ? "Kaynak dumanı / maruziyet"
                        : "Welding fumes / exposure",
                      isTurkish
                        ? "Çalışma alanında yeterli havalandırma sağlanmalı; risk değerlendirmesine göre lokal emiş veya uygun solunum koruması kullanılmalıdır."
                        : "Adequate ventilation shall be provided; local extraction or suitable respiratory protection shall be used where required by the risk assessment.",
                      isTurkish
                        ? "Havalandırma kontrolü"
                        : "Ventilation verification",
                    ],
                    [
                      isTurkish
                        ? "Yangın gözetimi"
                        : "Fire watch",
                      isTurkish
                        ? "Uygun yangın söndürme ekipmanı hazır bulundurulmalı ve yetkilendirilmiş yangın gözcüsü çalışma sırasında ve gerekli çalışma sonrası süre boyunca alanı izlemelidir."
                        : "Suitable firefighting equipment shall be immediately available and an assigned fire watch shall monitor the area during the work and for the required post-work period.",
                      isTurkish
                        ? "Yangın gözcüsü hazır"
                        : "Fire watch confirmed",
                    ],
                  ]
                : [
                    [
                      isTurkish ? "Yüksekten düşme" : "Fall from height",
                      isTurkish
                        ? "Uygun çalışma platformu, korkuluk sistemi veya risk değerlendirmesine göre onaylı kişisel düşüş koruma sistemi hazır olmalıdır."
                        : "Suitable work platform, guardrail system or approved personal fall-protection system shall be available as required by the risk assessment.",
                      isTurkish
                        ? "Süpervizör saha kontrolü"
                        : "Supervisor field verification",
                    ],
                    [
                      isTurkish ? "Düşen cisim" : "Dropped objects",
                      isTurkish
                        ? "Alt alan gerektiğinde bariyerlenmeli, gevşek malzemeler emniyete alınmalı ve uygun durumlarda tool lanyard kullanılmalıdır."
                        : "The area below shall be barricaded where required, loose materials secured and tool lanyards used where appropriate.",
                      isTurkish
                        ? "Dışlama alanı / housekeeping kontrolü"
                        : "Exclusion-zone / housekeeping check",
                    ],
                    [
                      isTurkish
                        ? "Uygunsuz erişim veya platform"
                        : "Unsafe access or platform",
                      isTurkish
                        ? "İskele, platform, MEWP veya kullanılan diğer erişim sistemi işe başlamadan önce uygunluk açısından kontrol edilmelidir."
                        : "Scaffold, platform, MEWP or other access system used for the task shall be checked for suitability before work starts.",
                      isTurkish
                        ? "Yetkin kişi / ekipman kontrolü"
                        : "Competent-person / equipment check",
                    ],
                    [
                      isTurkish
                        ? "Olumsuz hava koşulları"
                        : "Adverse weather",
                      isTurkish
                        ? "Rüzgar, yağış, görüş ve yüzey koşullarının güvenli çalışmaya uygun olduğu doğrulanmalıdır."
                        : "Wind, precipitation, visibility and surface conditions shall be confirmed suitable for safe work.",
                      isTurkish
                        ? "Çalışma öncesi saha değerlendirmesi"
                        : "Pre-work site assessment",
                    ],
                    [
                      isTurkish
                        ? "Kurtarma ihtiyacı"
                        : "Rescue requirement",
                      isTurkish
                        ? "Düşme sonrası askıda kalma ihtimali varsa uygun kurtarma yöntemi, ekipmanı ve görevli personel önceden belirlenmelidir."
                        : "Where suspension following a fall is possible, a suitable rescue method, equipment and responsible personnel shall be identified in advance.",
                      isTurkish
                        ? "Kurtarma planı hazır"
                        : "Rescue plan available",
                    ],
                  ]
              ).map(([hazard, control, verification]) => (
                <tr key={hazard}>
                  <td>{hazard}</td>
                  <td>{control}</td>
                  <td>{verification}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* METHOD / SEQUENCE */}
        <section className="ms-sequence-section">
          <h2>
            {isTurkish
              ? "9. ÇALIŞMA METODU / İŞ SIRASI"
              : "9. METHOD / SEQUENCE OF WORK"}
          </h2>

          <table className="ms-method-table">
            <thead>
              <tr>
                <th className="ms-number">No</th>
                <th>{isTurkish ? "İş Adımı" : "Work Sequence"}</th>
                <th>{isTurkish ? "Tehlikeler" : "Hazards"}</th>
                <th>{isTurkish ? "Kontrol Önlemleri" : "Control Measures"}</th>
                <th className="ms-responsible">
                  {isTurkish ? "Sorumlu" : "Responsible"}
                </th>
              </tr>
            </thead>

            <tbody>
              {methodSteps.map((item, index) => (
                <tr key={item.id}>
                  <td className="ms-number">{String(index + 1).padStart(2, "0")}</td>

                  <td>{item.step || "-"}</td>
                  <td>{item.hazards || "-"}</td>
                  <td>{item.controls || "-"}</td>
                  <td>{item.responsible || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <TextBlock
          title={
            isTurkish
              ? "10. ACİL DURUM DÜZENLEMELERİ"
              : "10. EMERGENCY ARRANGEMENTS"
          }
          value={emergencyArrangements}
        />

        <TextBlock
          title={
            isTurkish
              ? "11. ÇEVRESEL KONTROLLER"
              : "11. ENVIRONMENTAL CONTROLS"
          }
          value={environmentalControls}
        />

        <TextBlock
          title={isTurkish ? "12. REFERANSLAR" : "12. REFERENCES"}
          value={references}
        />

        {/* APPROVAL */}
        <section className="ms-approval">
          <h2>{isTurkish ? "13. ONAY" : "13. APPROVAL"}</h2>

          <table>
            <thead>
              <tr>
                <th>{isTurkish ? "Hazırlayan" : "Prepared By"}</th>
                <th>{isTurkish ? "Kontrol Eden" : "Reviewed By"}</th>
                <th>{isTurkish ? "Onaylayan" : "Approved By"}</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>
                  <strong>{preparedBy || "-"}</strong>
                  <div className="ms-signature-space" />
                  <small>
                    {isTurkish ? "İmza / Tarih" : "Signature / Date"}
                  </small>
                </td>

                <td>
                  <strong>{reviewedBy || "-"}</strong>
                  <div className="ms-signature-space" />
                  <small>
                    {isTurkish ? "İmza / Tarih" : "Signature / Date"}
                  </small>
                </td>

                <td>
                  <strong>{approvedBy || "-"}</strong>
                  <div className="ms-signature-space" />
                  <small>
                    {isTurkish ? "İmza / Tarih" : "Signature / Date"}
                  </small>
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        <footer className="ms-footer">
          <span>SafeBase • Professional HSE Document</span>

          <span>
            {documentNo || "SB-MS"} • Rev. {revision || "-"}
          </span>
        </footer>
      </div>

      <style jsx global>{`
        #method-statement-print {
          display: none;
        }

        @media print {
          @page {
            size: A4 portrait;
            margin: 7mm;
          }

          /*
           * IMPORTANT:
           * The editor must be removed from print layout completely.
           * visibility:hidden alone still reserves its height and creates
           * blank PDF pages.
           */
          main {
            min-height: 0 !important;
            margin: 0 !important;
            padding: 0 !important;
            background: white !important;
          }

          main > div:not(#method-statement-print) {
            display: none !important;
          }

          main > section:not(#method-statement-print) {
            display: none !important;
          }

          #method-statement-print {
            position: static !important;
            inset: auto !important;
            margin: 0 !important;
            padding: 0 !important;
            width: 100% !important;
            min-height: 0 !important;
          }

          html,
          body {
            background: white !important;
          }

          body * {
            visibility: hidden !important;
          }

          #method-statement-print,
          #method-statement-print * {
            visibility: visible !important;
          }

          #method-statement-print {
            display: block !important;
            position: absolute;
            inset: 0 auto auto 0;
            width: 100%;
            background: white;
            color: #0f172a;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 8.6pt;
            line-height: 1.32;
          }

          .ms-document-header {
            display: grid;
            grid-template-columns: 1.1fr 2fr 1.15fr;
            border: 1.4px solid #334155;
            margin-bottom: 8px;
            page-break-inside: avoid;
          }

          .ms-brand,
          .ms-title-area,
          .ms-doc-control {
            padding: 7px;
          }

          .ms-brand {
            display: flex;
            align-items: center;
            border-right: 1px solid #94a3b8;
          }

          .ms-logo-text strong {
            display: block;
            font-size: 16pt;
            line-height: 1;
            color: #0f172a;
          }

          .ms-logo-text strong span {
            color: #10b981;
          }

          .ms-logo-text small {
            display: block;
            margin-top: 3px;
            font-size: 5.6pt;
            font-weight: 700;
            letter-spacing: 1.1px;
            color: #64748b;
          }

          .ms-title-area {
            display: flex;
            flex-direction: column;
            justify-content: center;
            border-right: 1px solid #94a3b8;
          }

          .ms-document-type {
            font-size: 7pt;
            font-weight: 800;
            letter-spacing: 1.4px;
            color: #059669;
          }

          .ms-title-area h1 {
            margin: 4px 0 0;
            font-size: 12.5pt;
            line-height: 1.1;
            text-transform: uppercase;
          }

          .ms-doc-control {
            padding: 0;
          }

          .ms-doc-control > div {
            display: grid;
            grid-template-columns: 1fr 1fr;
            min-height: 24px;
            border-bottom: 1px solid #cbd5e1;
          }

          .ms-doc-control > div:last-child {
            border-bottom: 0;
          }

          .ms-doc-control span,
          .ms-doc-control strong {
            padding: 4px 5px;
            font-size: 6.6pt;
          }

          .ms-doc-control span {
            font-weight: 700;
            background: #f1f5f9;
          }

          .ms-info-table,
          .ms-method-table,
          .ms-approval table {
            width: 100%;
            border-collapse: collapse;
          }

          .ms-info-table {
            margin-bottom: 6px;
            page-break-inside: avoid;
          }

          .ms-info-table th,
          .ms-info-table td {
            border: 1px solid #94a3b8;
            padding: 4px 6px;
          }

          .ms-info-table th {
            width: 14%;
            background: #e2e8f0;
            font-size: 7pt;
            text-align: left;
          }

          .ms-info-table td {
            width: 36%;
            font-weight: 600;
          }

          .ms-print-block {
            margin: 0 0 5px;
            page-break-inside: avoid;
          }

          .ms-print-block h2,
          .ms-sequence-section > h2,
          .ms-approval > h2 {
            margin: 0;
            padding: 4px 6px;
            background: #0f172a;
            color: white;
            font-size: 7.4pt;
            letter-spacing: 0.35px;
          }

          .ms-print-text {
            white-space: pre-wrap;
            border: 1px solid #cbd5e1;
            border-top: 0;
            padding: 5px 6px;
          }

          .ms-two-column {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 5px;
            align-items: start;
          }

          .ms-sequence-section {
            margin-top: 2px;
          }

          .ms-method-table {
            table-layout: fixed;
            font-size: 6.7pt;
          }

          .ms-method-table thead {
            display: table-header-group;
          }

          .ms-method-table tr {
            page-break-inside: avoid;
            break-inside: avoid;
          }

          .ms-method-table th,
          .ms-method-table td {
            border: 1px solid #94a3b8;
            padding: 4px 5px;
            vertical-align: top;
            white-space: pre-wrap;
            word-break: normal;
            overflow-wrap: anywhere;
          }

          .ms-method-table th {
            background: #dbeafe;
            color: #0f172a;
            text-align: left;
            font-size: 7pt;
          }

          .ms-method-table .ms-number {
            width: 5%;
            text-align: center;
            font-weight: 800;
          }

          .ms-method-table th:nth-child(2) {
            width: 22%;
          }

          .ms-method-table th:nth-child(3) {
            width: 20%;
          }

          .ms-method-table th:nth-child(4) {
            width: 38%;
          }

          .ms-method-table .ms-responsible {
            width: 15%;
          }

          .ms-approval {
            margin-top: 6px;
            page-break-inside: avoid;
          }

          .ms-approval th,
          .ms-approval td {
            border: 1px solid #94a3b8;
            width: 33.333%;
            padding: 5px;
            text-align: left;
          }

          .ms-approval th {
            background: #e2e8f0;
            font-size: 7pt;
          }

          .ms-approval td {
            height: 46px;
            vertical-align: top;
          }

          .ms-signature-space {
            height: 18px;
          }

          .ms-approval small {
            color: #64748b;
            font-size: 6.5pt;
          }


          .ms-pretask-section {
            margin-top: 4px;
            page-break-inside: auto;
            break-inside: auto;
          }

          .ms-pretask-section > h2 {
            margin: 0;
            padding: 4px 6px;
            background: #0f172a;
            color: white;
            font-size: 7.4pt;
            letter-spacing: 0.35px;
          }

          .ms-pretask-table {
            width: 100%;
            border-collapse: collapse;
            table-layout: fixed;
            font-size: 6.1pt;
            line-height: 1.2;
          }

          .ms-pretask-table th,
          .ms-pretask-table td {
            border: 1px solid #94a3b8;
            padding: 2px 4px;
            vertical-align: top;
          }

          .ms-pretask-table th {
            background: #dbeafe;
            color: #0f172a;
            text-align: left;
            font-size: 6.4pt;
          }

          .ms-pretask-table th:nth-child(1) {
            width: 22%;
          }

          .ms-pretask-table th:nth-child(2) {
            width: 55%;
          }

          .ms-pretask-table th:nth-child(3) {
            width: 23%;
          }

          .ms-sequence-section {
            page-break-before: auto;
            break-before: auto;
          }

          .ms-approval {
            break-inside: avoid;
            page-break-inside: avoid;
          }

          .ms-footer {
            break-inside: avoid;
          }

          .ms-footer {
            display: flex;
            justify-content: space-between;
            margin-top: 5px;
            border-top: 1px solid #94a3b8;
            padding-top: 4px;
            font-size: 6.5pt;
            color: #64748b;
          }
        }
      `}</style>
    </>
  );
}

function isTurishFix(
  isTurkish: boolean,
  tr: string,
  en: string
) {
  return isTurkish ? tr : en;
}
