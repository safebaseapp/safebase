import Link from "next/link";
import { notFound } from "next/navigation";

export default async function Sim5Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale !== "en" && locale !== "tr") notFound();
  const isTr = locale === "tr";
  return (
    <main style={{ minHeight: "100vh", background: "#071622", color: "#eaf4fa", padding: "24px", fontFamily: "system-ui" }}>
      <nav style={{ marginBottom: 24 }}><Link href={`/${locale}/labs/incident-simulator`} style={{ color: "#9ddfff" }}>{isTr ? "← Incident Simulator'a dön" : "← Back to Incident Simulator"}</Link></nav>
      <h1>SERNEM SIM 5.0 — {isTr ? "3D Endüstriyel Saha" : "3D Industrial Site"}</h1>
      <p style={{ maxWidth: 780, lineHeight: 1.6 }}>{isTr
        ? "Bu ayrı geliştirme rotasıdır. Factory ve Oil Tank modellerinin dağıtım dosyaları henüz bu sürüme aktarılmadığından 3D sahne kullanıma açılmadı. SIM 3.0 ve mevcut Incident Simulator değişmedi."
        : "This is an isolated development route. The Factory and Oil Tank model files have not yet been uploaded to this build, so the 3D scene is not available. SIM 3.0 and the existing Incident Simulator are unchanged."}</p>
      <p style={{ color: "#eabf7c" }}>{isTr ? "Durum: Varlık dosyaları bekleniyor — test sürümü" : "Status: Asset files pending — test build"}</p>
    </main>
  );
}
