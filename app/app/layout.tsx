import type { Metadata } from "next";
import { headers } from "next/headers";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./nav-fix.css";
import "./print-fixes.css";
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
  metadataBase: new URL("https://www.sernem.com"),
  other: { "google": "notranslate" },
  title: {
    default: "SERNEM",
    template: "%s | SERNEM",
  },
  description:
    "SERNEM is an international HSE knowledge and digital tools platform offering risk assessment, OSHA-related safety resources, toolbox talks, inspection checklists and AI-assisted learning.",
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
      translate="no"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="antialiased bg-slate-950 text-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://www.sernem.com/#organization",
                  name: "SERNEM",
                  url: "https://www.sernem.com",
                  description:
                    "SERNEM is an independent international Health, Safety and Environment (HSE) knowledge and digital tools platform for professionals worldwide.",
                },
                {
                  "@type": "WebSite",
                  "@id": "https://www.sernem.com/#website",
                  name: "SERNEM",
                  url: "https://www.sernem.com",
                  publisher: { "@id": "https://www.sernem.com/#organization" },
                  inLanguage: ["en", "tr"],
                },
              ],
            }).replace(/</g, "\\u003c"),
          }}
        />
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
