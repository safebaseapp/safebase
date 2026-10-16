import Link from "next/link";
import IndustrialScene from "./IndustrialScene";
import { notFound } from "next/navigation";

export default async function Sim5Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale !== "en" && locale !== "tr") notFound();
  const isTr = locale === "tr";
  return (
    <main style={{ minHeight: "100vh", background: "#071622", color: "#eaf4fa", padding: "24px", fontFamily: "system-ui" }}>
      <nav style={{ marginBottom: 24 }}><Link href={`/${locale}/labs/incident-simulator`} style={{ color: "#9ddfff" }}>{isTr ? "← Incident Simulator'a dön" : "← Back to Incident Simulator"}</Link></nav>
      <h1>SERNEM SIM 5.0 — {isTr ? "3D Endüstriyel Saha" : "3D Industrial Site"}</h1>
      <IndustrialScene tr={isTr} />
    </main>
  );
}
