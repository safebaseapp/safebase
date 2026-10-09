import PendingIncidentImport from "./labs/PendingIncidentImport";

type Props = { children: React.ReactNode; params: Promise<{ locale: string }> };

export default async function DashboardLayout({ children, params }: Props) {
  const { locale } = await params;

  return (
    <>
      <PendingIncidentImport />
      {children}
    </>
  );
}
