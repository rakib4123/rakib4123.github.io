import type { Metadata } from "next";
import { Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import MotionProvider from "@/components/MotionProvider";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
});
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });

export const metadata: Metadata = {
  metadataBase: new URL("https://rakibhossain.dev"),
  title: {
    default: "Md. Rakib Hossain | Machine Learning Systems, Data to Deployed Apps",
    template: "%s | Md. Rakib Hossain",
  },
  description:
    "Md. Rakib Hossain — IT Intern at Live Technologies and final-year CSE student at AIUB. I build machine-learning systems end to end, from data to deployed apps, with three first-author papers presented at IEEE COMPAS and ICCA 2026.",
  keywords: [
    "Md. Rakib Hossain",
    "Data Science",
    "Machine Learning",
    "Computer Vision",
    "Full-Stack Developer",
    "Live Technologies",
    "Next.js",
    "NestJS",
    "AIUB",
    "Robotics",
    "RideGuard",
    "DhakaNight",
    "PulseStone",
    "Drikon",
    "IEEE COMPAS",
    "ICCA 2026",
  ],
  authors: [{ name: "Md. Rakib Hossain", url: "https://github.com/rakib4123" }],
  creator: "Md. Rakib Hossain",
  openGraph: {
    title: "Md. Rakib Hossain | Machine Learning Systems, Data to Deployed Apps",
    description:
      "IT Intern at Live Technologies & CSE student at AIUB. 3 first-author papers at IEEE COMPAS & ICCA 2026. End-to-end ML & production web apps.",
    url: "/",
    siteName: "Md. Rakib Hossain Portfolio",
    images: [
      {
        url: "/images/compas-backdrop.jpg",
        width: 1200,
        height: 630,
        alt: "Md. Rakib Hossain at IEEE COMPAS 2026",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Md. Rakib Hossain | Machine Learning Systems, Data to Deployed Apps",
    description:
      "IT Intern at Live Technologies & final-year CSE at AIUB. 3 First-Author Papers · Robotics Founder · Deployed ML Systems",
    images: ["/images/compas-backdrop.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Md. Rakib Hossain",
  jobTitle: "Data Science, Machine Learning & Full-Stack Engineer",
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "American International University-Bangladesh (AIUB)",
  },
  sameAs: [
    "https://github.com/rakib4123",
    "https://www.linkedin.com/in/md-rakib-hossain-519818263",
  ],
  knowsAbout: [
    "Data Science",
    "Machine Learning",
    "Computer Vision",
    "Full-Stack Development",
    "Robotics",
    "CatBoost",
    "PyTorch",
    "Next.js",
    "NestJS",
  ],
};

const themeScript = `
  (function() {
    try {
      var saved = localStorage.getItem('portfolio-theme');
      var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (saved === 'dark' || (!saved && prefersDark)) {
        document.documentElement.classList.add('dark');
      } else if (saved === 'light') {
        document.documentElement.classList.remove('dark');
      }
    } catch(e) {}
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased bg-bg text-ink selection:bg-accent/20">
        <ThemeProvider>
          <MotionProvider>{children}</MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
