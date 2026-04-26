/// <reference types="react" />
/// <reference types="react-dom" />

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
  title: "SuperWeld Sources Pvt Ltd | Leading Industrial Products Distributor",
  description: "Leading distributor of industrial welding products and equipment. Serving construction, automotive, and manufacturing industries since 1999.",
  keywords: ["welding", "industrial products", "distributor", "industrial distribution", "construction", "equipment supplier"],
  icons: {
    icon: [
      { url: "/images/logo/superweld-sources-pvt-ltd-logo.png", type: "image/png" },
    ],
    shortcut: "/images/logo/superweld-sources-pvt-ltd-logo.png",
    apple: "/images/logo/superweld-sources-pvt-ltd-logo.png",
  },
  openGraph: {
    title: "SuperWeld Sources Pvt Ltd | Leading Industrial Products Distributor",
    description: "Leading distributor of industrial welding products and equipment since 1999.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-superweld-bg text-superweld-text`}
      >
        {children}
      </body>
    </html>
  );
}




