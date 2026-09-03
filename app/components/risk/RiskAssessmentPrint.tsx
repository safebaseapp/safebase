import type { RiskLibraryActivity } from "@/lib/risk-library/pack-01";

type Locale = "tr" | "en";

type Props = {
  activity: RiskLibraryActivity;
  locale: Locale;
};

function getSuggestedScore(entry: {
  hazard: { tr: string; en: string };
  consequence: { tr: string; en: string };
}) {
  const text =
    `${entry.hazard.tr} ${entry.hazard.en} ${entry.consequence.tr} ${entry.consequence.en}`.toLowerCase();

  let severity = 3;

  if (/ölüm|fatality|death|kalıcı sakatlık|permanent disability/.test(text)) {
    severity = 5;
  } else if (
    /ciddi yaralanma|serious injury|ezilme|crushing|elektrik çarpması|electric shock|kimyasal yanık|chemical burn|işitme kaybı|hearing loss/.test(
      text
    )
  ) {
    severity = 4;
  }

  let likelihood = 2;

  if (
    /yüksekten düş|fall from height|patlama|explosion|yangın|fire|elektrik|electric|basınçlı|pressurized|pressure release|kontrolsüz|uncontrolled|devril|overturn|collapse|çökme|sıkışma|entrapment|crushing|dropped object|düşen cisim/.test(
      text
    )
  ) {
    likelihood = 3;
  }

  return { likelihood, severity };
}

function getRiskLabel(score: number, isTr: boolean) {
  if (score >= 20) return isTr ? "Kritik" : "Critical";
  if (score >= 10) return isTr ? "Yüksek" : "High";
  if (score >= 5) return isTr ? "Orta" : "Medium";
  return isTr ? "Düşük" : "Low";
}

function riskClass(score: number) {
  if (score >= 20) return "risk-print-critical";
  if (score >= 10) return "risk-print-high";
  if (score >= 5) return "risk-print-medium";
  return "risk-print-low";
}

export default function RiskAssessmentPrint({
  activity,
  locale,
}: Props) {
  const isTr = locale === "tr";
  const activityName = activity.activity[locale];
  const categoryName = activity.category[locale];

  return (
    <>
      <style>{`
        @media screen {
          #safebase-risk-print {
            display: none !important;
          }
        }

        @media print {
          @page {
            size: A4 landscape;
            margin: 8mm;
          }

          html,
          body {
            width: 100% !important;
            height: auto !important;
            min-height: 0 !important;
            overflow: visible !important;
            background: white !important;
          }

          body * {
            visibility: hidden !important;
          }

          main > *:not(#safebase-risk-print) {
            display: none !important;
          }

          header,
          nav,
          aside,
          footer {
            display: none !important;
          }

          #safebase-risk-print,
          #safebase-risk-print * {
            visibility: visible !important;
          }

          #safebase-risk-print {
            display: block !important;
            position: relative !important;
            left: auto !important;
            top: auto !important;
            width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            color: #0f172a !important;
            background: white !important;
            font-family: Arial, Helvetica, sans-serif !important;
          }

          .risk-print-table {
            width: 100%;
            border-collapse: collapse;
            table-layout: fixed;
          }

          .risk-print-table th,
          .risk-print-table td {
            border: 1px solid #cbd5e1;
            padding: 5px;
            vertical-align: top;
            font-size: 8px;
            line-height: 1.3;
          }

          .risk-print-table th {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          .risk-print-item {
            break-inside: avoid;
            page-break-inside: avoid;
          }

          .risk-print-low {
            background: #dcfce7 !important;
            color: #166534 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          .risk-print-medium {
            background: #fef9c3 !important;
            color: #854d0e !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          .risk-print-high {
            background: #ffedd5 !important;
            color: #9a3412 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          .risk-print-critical {
            background: #fee2e2 !important;
            color: #991b1b !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
      `}</style>

      <section id="safebase-risk-print">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.25fr 2.5fr 1.25fr",
            border: "1px solid #94a3b8",
            marginBottom: "8px",
          }}
        >
          <div
            style={{
              padding: "8px",
              background: "#0f172a",
              color: "white",
              fontWeight: 900,
              fontSize: "14px",
              display: "flex",
              alignItems: "center",
            }}
          >
            SERNEM
          </div>

          <div
            style={{
              padding: "8px",
              textAlign: "center",
              fontWeight: 900,
              fontSize: "15px",
            }}
          >
            {activityName}{" "}
            {isTr ? "RİSK DEĞERLENDİRMESİ" : "RISK ASSESSMENT"}
          </div>

          <div
            style={{
              padding: "8px",
              textAlign: "right",
              fontSize: "8px",
            }}
          >
            <strong>SRN-HIRARC</strong>
            <br />
            {isTr ? "Revizyon" : "Revision"}: 1.0
          </div>
        </div>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginBottom: "8px",
            fontSize: "8px",
          }}
        >
          <tbody>
            <tr>
              <td
                style={{
                  width: "12%",
                  border: "1px solid #94a3b8",
                  padding: "5px",
                  fontWeight: 800,
                  background: "#e2e8f0",
                }}
              >
                {isTr ? "FAALİYET" : "ACTIVITY"}
              </td>

              <td
                style={{
                  width: "38%",
                  border: "1px solid #94a3b8",
                  padding: "5px",
                }}
              >
                {activityName}
              </td>

              <td
                style={{
                  width: "12%",
                  border: "1px solid #94a3b8",
                  padding: "5px",
                  fontWeight: 800,
                  background: "#e2e8f0",
                }}
              >
                {isTr ? "KATEGORİ" : "CATEGORY"}
              </td>

              <td
                style={{
                  width: "38%",
                  border: "1px solid #94a3b8",
                  padding: "5px",
                }}
              >
                {categoryName}
              </td>
            </tr>
          </tbody>
        </table>

        <table className="risk-print-table">
          <thead>
            <tr>
              <th style={{ width: "3%", background: "#0f172a", color: "#fff" }}>
                #
              </th>

              <th style={{ width: "9%", background: "#0f172a", color: "#fff" }}>
                {isTr ? "Faaliyet" : "Activity"}
              </th>

              <th style={{ width: "9%", background: "#0f172a", color: "#fff" }}>
                {isTr ? "Tehlike" : "Hazard"}
              </th>

              <th style={{ width: "9%", background: "#0f172a", color: "#fff" }}>
                {isTr ? "Olası Sonuç" : "Consequence"}
              </th>

              <th style={{ width: "8%", background: "#0f172a", color: "#fff" }}>
                {isTr ? "Risk Altındaki Kişiler" : "Persons at Risk"}
              </th>

              <th style={{ width: "11%", background: "#0f172a", color: "#fff" }}>
                {isTr ? "Mevcut Kontroller" : "Existing Risk Control"}
              </th>

              <th style={{ width: "3%", background: "#0f172a", color: "#fff" }}>
                L
              </th>

              <th style={{ width: "3%", background: "#0f172a", color: "#fff" }}>
                S
              </th>

              <th style={{ width: "5%", background: "#0f172a", color: "#fff" }}>
                Risk
              </th>

              <th style={{ width: "14%", background: "#0f172a", color: "#fff" }}>
                {isTr
                  ? "Yapılacak Aksiyon / İlave Kontrol"
                  : "Action Required / Additional Controls"}
              </th>

              <th style={{ width: "7%", background: "#0f172a", color: "#fff" }}>
                {isTr ? "Sorumlu" : "Person in Charge"}
              </th>

              <th style={{ width: "7%", background: "#0f172a", color: "#fff" }}>
                {isTr ? "Termin" : "Due Date"}
              </th>

              <th style={{ width: "3%", background: "#0f172a", color: "#fff" }}>
                RL
              </th>

              <th style={{ width: "3%", background: "#0f172a", color: "#fff" }}>
                RS
              </th>

              <th style={{ width: "5%", background: "#0f172a", color: "#fff" }}>
                {isTr ? "Kalan Risk" : "Residual Risk"}
              </th>
            </tr>
          </thead>

          <tbody>
            {activity.items.map((item, index) => {
              const suggested = getSuggestedScore(item);

              const initialScore =
                suggested.likelihood * suggested.severity;

              const residualLikelihood =
                initialScore >= 10 ? 2 : 1;

              const residualSeverity =
                initialScore >= 10
                  ? 2
                  : initialScore >= 5
                    ? 2
                    : 1;

              const residualScore =
                residualLikelihood * residualSeverity;

              return (
                <tr
                  key={`${activity.id}-print-${index}`}
                  className="risk-print-item"
                >
                  <td style={{ textAlign: "center", fontWeight: 900 }}>
                    {String(index + 1).padStart(2, "0")}
                  </td>

                  <td>{activityName}</td>
                  <td>{item.hazard[locale]}</td>
                  <td>{item.consequence[locale]}</td>
                  <td>{item.personsAtRisk[locale]}</td>
                  <td>{item.existingControls[locale]}</td>

                  <td style={{ textAlign: "center" }}>
                    {suggested.likelihood}
                  </td>

                  <td style={{ textAlign: "center" }}>
                    {suggested.severity}
                  </td>

                  <td
                    className={riskClass(initialScore)}
                    style={{
                      textAlign: "center",
                      fontWeight: 900,
                    }}
                  >
                    {initialScore}
                    <br />
                    {getRiskLabel(initialScore, isTr)}
                  </td>

                  <td>{item.additionalControls[locale]}</td>

                  <td>-</td>
                  <td>-</td>

                  <td style={{ textAlign: "center" }}>
                    {residualLikelihood}
                  </td>

                  <td style={{ textAlign: "center" }}>
                    {residualSeverity}
                  </td>

                  <td
                    className={riskClass(residualScore)}
                    style={{
                      textAlign: "center",
                      fontWeight: 900,
                    }}
                  >
                    {residualScore}
                    <br />
                    {getRiskLabel(residualScore, isTr)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "10px",
            marginTop: "14px",
          }}
        >
          {[
            isTr ? "Hazırlayan" : "Prepared By",
            isTr ? "Kontrol Eden" : "Reviewed By",
            isTr ? "Onaylayan" : "Approved By",
          ].map((title) => (
            <div
              key={title}
              style={{
                minHeight: "65px",
                border: "1px solid #94a3b8",
                padding: "7px",
                fontSize: "9px",
              }}
            >
              <strong>{title}</strong>

              <div
                style={{
                  marginTop: "40px",
                  borderTop: "1px solid #cbd5e1",
                  paddingTop: "4px",
                  color: "#64748b",
                }}
              >
                {isTr ? "Ad / İmza / Tarih" : "Name / Signature / Date"}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "1px solid #cbd5e1",
            marginTop: "12px",
            paddingTop: "5px",
            fontSize: "7px",
            color: "#64748b",
          }}
        >
          <span>SERNEM • Professional Risk Assessment</span>

          <span>
            {isTr
              ? "Kontrol önlemleri uygulanmadan işe başlanmamalıdır."
              : "Work should not begin until required controls are implemented."}
          </span>
        </div>
      </section>
    </>
  );
}
