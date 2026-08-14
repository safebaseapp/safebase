import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
    default: "Sernem",
    template: "%s | Sernem",
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
    "Sernem",
  ],
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="antialiased bg-slate-950 text-white">
        {children}
      </body>
    </html>
  );
}