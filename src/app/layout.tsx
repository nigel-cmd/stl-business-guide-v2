import type { Metadata } from "next";
import { Montserrat, Lato } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700", "800"],
});

const lato = Lato({
  subsets: ["latin"],
  variable: "--font-lato",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "STL Business Guide - Local Business Directory & Deals",
  description: "Your top community resource for local businesses in St. Louis. Find the best deals, coupons, and services. Shop Local - Buy Local - Support Local.",
  keywords: "St Louis business, local business directory, STL deals, local coupons, St Louis marketing, business advertising",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${lato.variable}`}>
      <body className="antialiased bg-gray-50">
        {children}
      </body>
    </html>
  );
}
