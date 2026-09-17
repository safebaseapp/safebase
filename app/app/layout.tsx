import type { Metadata } from "next";
import { headers } from "next/headers";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "SERNEM",
    template: "%s | SERNEM",
  },
  description:
    "Global HSE platform with safety calculators, AI assistant, OSHA knowledge, templates and inspection checklists.",
  keywords: [
    "HSE",
    "Safety",
    "OSHA",
    "Risk Matrix",
    "TRIR",
    "LTIFR",
    "PPE",
    "Confined Space",
    "Hot Work",
    "LOTO",
    "SERNEM",
  ],
  icons: {
    icon: "/icon.svg",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const requestHeaders = await headers();
  const locale =
    requestHeaders.get("x-sernem-locale") === "tr" ? "tr" : "en";

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="antialiased bg-slate-950 text-white">
        {children}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-B4TTF1KM9J"
          strategy="afterInteractive"
        />
        <Script id="sernem-ga4" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-B4TTF1KM9J');
          `}
        </Script>
      </body>
    </html>
  );
}