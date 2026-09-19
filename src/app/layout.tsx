import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Rajdhani } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const rajdhani = Rajdhani({
  subsets: ["latin"],
  variable: "--font-rajdhani",
  weight: ["500", "600", "700"],
});
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Md. Rakib Hossain | Data Science, Machine Learning & Full-Stack",
  description:
    "Md. Rakib Hossain — CSE student at AIUB working on data science and machine-learning systems and the applications around them, with three papers accepted, including IEEE COMPAS 2026.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${rajdhani.variable} ${jetbrains.variable} scroll-smooth`}>
      <body
        className={`font-sans antialiased bg-bg-main text-ink`}
      >
        <ScrollProgress />
        <CustomCursor />
        <div className="hud-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
