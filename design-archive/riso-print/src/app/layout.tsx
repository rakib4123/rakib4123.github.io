import type { Metadata } from "next";
import { Archivo_Black, Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";
import ScrollProgress from "@/components/ScrollProgress";

const archivo = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-archivo",
});
const grotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-grotesk",
});
const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
});

export const metadata: Metadata = {
  title: "Md. Rakib Hossain | Data Science and Machine Learning · Full-Stack Developer",
  description:
    "Md. Rakib Hossain — CSE student in Dhaka who takes machine-learning systems end to end and ships the applications around them. Two papers accepted at ICCA 2026.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`scroll-smooth ${archivo.variable} ${grotesk.variable} ${spaceMono.variable}`}
    >
      <body className="font-sans antialiased bg-paper text-ink">
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
