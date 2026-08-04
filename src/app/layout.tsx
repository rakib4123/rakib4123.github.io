import type { Metadata } from "next";
import { Inter, Roboto_Slab } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  variable: "--font-roboto-slab",
});

export const metadata: Metadata = {
  title: "Md. Rakib Hossain | AI, ML, Computer Vision & Data Science",
  description:
    "Md. Rakib Hossain — final-year CSE student at AIUB, exploring AI, machine learning, computer vision, and data science, plus software and robotics.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${robotoSlab.variable} font-sans antialiased bg-bg-main text-slate-800`}
      >
        <ScrollProgress />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
