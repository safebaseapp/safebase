import ActivityTracker from "@/components/analytics/ActivityTracker";

// Describes the existing public calculator; no calculator or authorization changes.
export default async function RiskMatrixSchemaLayout({ children, params }: {
  children: React.ReactNode; params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const schema = {
    "@context": "https://schema.org", "@type": "WebApplication",
    name: locale === "tr" ? "SERNEM 5×5 Risk Matrisi" : "SERNEM 5×5 Risk Matrix",
    url: `https://www.sernem.com/${locale}/tools/risk-matrix`,
    inLanguage: locale, applicationCategory: "BusinessApplication",
    operatingSystem: "Any", browserRequirements: "Requires JavaScript and a web browser",
    publisher: { "@id": "https://www.sernem.com/#organization" },
  };
  return <><ActivityTracker eventName="risk_matrix_open" /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />{children}</>;
}
