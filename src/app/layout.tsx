import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["500", "600", "700", "800"],
  style: ["normal", "italic"],
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
    <html lang="en" className={`${inter.variable} ${playfair.variable} scroll-smooth`}>
      <body
        className={`font-sans antialiased bg-bg-main text-ink`}
      >
        <ScrollProgress />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
