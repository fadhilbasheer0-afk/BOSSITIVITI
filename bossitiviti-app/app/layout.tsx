import type { Metadata } from "next";
import { Cinzel, Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/animations/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";

const cinzel = Cinzel({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bossitiviti-perfume.vercel.app"),
  title: {
    default: "BOSSITIVITI | Haute Parfumerie",
    template: "%s | BOSSITIVITI",
  },
  description:
    "BOSSITIVITI is a haute parfumerie house crafting signatures that define confidence, elegance, and individuality. Discover the official fragrance collection.",
  keywords: [
    "BOSSITIVITI",
    "haute parfumerie",
    "perfume",
    "fragrance",
    "luxury",
    "NB THOUSAND",
    "NB MILLION",
    "NB BILLION",
    "NB TRILLION",
    "NB OCTILLION",
    "NB DECILLION",
  ],
  authors: [{ name: "BOSSITIVITI" }],
  creator: "BOSSITIVITI",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://bossitiviti-perfume.vercel.app",
    siteName: "BOSSITIVITI",
    title: "BOSSITIVITI | Haute Parfumerie",
    description:
      "Haute parfumerie crafting signatures that define confidence, elegance, and individuality.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://bossitiviti-perfume.vercel.app",
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
      className={`${cinzel.variable} ${cormorant.variable} ${montserrat.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-noir text-ivory">
        <CustomCursor />
        <ScrollProgress />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
