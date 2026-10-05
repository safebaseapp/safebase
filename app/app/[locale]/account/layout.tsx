import AccountLifecyclePanel from "./AccountLifecyclePanel";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function AccountLayout({ children, params }: Props) {
  const { locale } = await params;
  const safeLocale = locale === "tr" ? "tr" : "en";

  return (
    <>
      {children}
      <AccountLifecyclePanel locale={safeLocale} />
    </>
  );
}
