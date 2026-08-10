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
              <tr>
                <td>
                  {isTurkish
                    ? "Yüksekten düşme"
                    : "Fall from height"}
                </td>
                <td>
                  {isTurkish
                    ? "Uygun çalışma platformu, korkuluk sistemi veya risk değerlendirmesine göre onaylı kişisel düşüş koruma sistemi hazır olmalıdır."
                    : "Suitable work platform, guardrail system or approved personal fall-protection system shall be available as required by the risk assessment."}
                </td>
                <td>
                  {isTurkish
                    ? "Süpervizör saha kontrolü"
                    : "Supervisor field verification"}
                </td>
              </tr>

              <tr>
                <td>
                  {isTurkish
                    ? "Düşen cisim"
                    : "Dropped objects"}
                </td>
                <td>
                  {isTurkish
                    ? "Alt alan gerektiğinde bariyerlenmeli, gevşek malzemeler emniyete alınmalı ve uygun durumlarda tool lanyard kullanılmalıdır."
                    : "The area below shall be barricaded where required, loose materials secured and tool lanyards used where appropriate."}
                </td>
                <td>
                  {isTurkish
                    ? "Dışlama alanı / housekeeping kontrolü"
                    : "Exclusion-zone / housekeeping check"}
                </td>
              </tr>

              <tr>
                <td>
                  {isTurkish
                    ? "Uygunsuz erişim veya platform"
                    : "Unsafe access or platform"}
                </td>
                <td>
                  {isTurkish
                    ? "İskele, platform, MEWP veya kullanılan diğer erişim sistemi işe başlamadan önce uygunluk açısından kontrol edilmelidir."
                    : "Scaffold, platform, MEWP or other access system used for the task shall be checked for suitability before work starts."}
                </td>
                <td>
                  {isTurkish
                    ? "Yetkin kişi / ekipman kontrolü"
                    : "Competent-person / equipment check"}
                </td>
              </tr>

              <tr>
                <td>
                  {isTurkish
                    ? "Olumsuz hava koşulları"
                    : "Adverse weather"}
                </td>
                <td>
                  {isTurkish
                    ? "Rüzgar, yağış, görüş ve yüzey koşullarının güvenli çalışmaya uygun olduğu doğrulanmalıdır."
                    : "Wind, precipitation, visibility and surface conditions shall be confirmed suitable for safe work."}
                </td>
                <td>
                  {isTurkish
                    ? "Çalışma öncesi saha değerlendirmesi"
                    : "Pre-work site assessment"}
                </td>
              </tr>

              <tr>
                <td>
                  {isTurkish
                    ? "Kurtarma ihtiyacı"
                    : "Rescue requirement"}
                </td>
                <td>
                  {isTurkish
                    ? "Düşme sonrası askıda kalma ihtimali varsa uygun kurtarma yöntemi, ekipmanı ve görevli personel önceden belirlenmelidir."
                    : "Where suspension following a fall is possible, a suitable rescue method, equipment and responsible personnel shall be identified in advance."}
                </td>
                <td>
                  {isTurkish
                    ? "Kurtarma planı hazır"
                    : "Rescue plan available"}
                </td>
              </tr>
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
            page-break-before: page;
            break-before: page;
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
