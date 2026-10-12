import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MotionProvider from "@/components/MotionProvider";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export const metadata: Metadata = {
  title: "Md. Rakib Hossain | Data Science, Machine Learning & Full-Stack",
  description:
    "Md. Rakib Hossain — CSE student at AIUB working on data science and machine-learning systems and the applications around them, with three accepted papers, the first presented at IEEE COMPAS 2026.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased bg-bg text-ink">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
