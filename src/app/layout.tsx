import type { Metadata } from "next";
import { Inter, Roboto_Slab } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  variable: "--font-roboto-slab",
});

export const metadata: Metadata = {
  title: "Md. Rakib Hossain | Data, Machine Learning & Software",
  description:
    "Md. Rakib Hossain — final-year CSE student at AIUB. Data analytics, machine learning, full-stack & embedded software, and award-winning robotics.",
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
        {children}
      </body>
    </html>
  );
}
