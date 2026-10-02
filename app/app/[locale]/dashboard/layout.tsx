import PendingIncidentImport from "./labs/PendingIncidentImport";
import DashboardLabsIntegration from "./DashboardLabsIntegration";

type Props = { children: React.ReactNode; params: Promise<{ locale: string }> };

export default async function DashboardLayout({ children, params }: Props) {
  const { locale } = await params;

  return (
    <>
      <PendingIncidentImport />
      <DashboardLabsIntegration locale={locale} />
      {children}
    </>
  );
}
