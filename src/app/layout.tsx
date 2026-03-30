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
  title: "CARBON-X — Track. Reduce. Save the Planet.",
  description:
    "Your personal carbon footprint companion. Log eco-friendly actions, visualize your impact, earn rewards — and help heal the planet, one bit at a time.",
  keywords: ["carbon footprint", "sustainability", "climate", "eco tracker", "carbon-x"],
  openGraph: {
    title: "CARBON-X — Track. Reduce. Save the Planet.",
    description:
      "Your personal carbon footprint companion. Log eco-friendly actions, visualize your impact, earn rewards.",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
