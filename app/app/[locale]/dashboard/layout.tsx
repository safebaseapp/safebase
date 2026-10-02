import Link from "next/link";
import PendingIncidentImport from "./labs/PendingIncidentImport";

type Props = { children: React.ReactNode; params: Promise<{ locale: string }> };

export default async function DashboardLayout({ children, params }: Props) {
  const { locale } = await params;
  const isTr = locale === "tr";

  return (
    <>
      <PendingIncidentImport />
      {children}
      <Link
        href={`/${locale}/dashboard/labs`}
        className="fixed bottom-5 right-5 z-[80] rounded-2xl border border-emerald-300/25 bg-[#071713]/95 px-4 py-3 text-sm font-bold text-emerald-200 shadow-2xl backdrop-blur hover:border-emerald-300/50"
      >
        {isTr ? "Labs Sonuçlarım" : "Labs Results"}
      </Link>
    </>
  );
}
