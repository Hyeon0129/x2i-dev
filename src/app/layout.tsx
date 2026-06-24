// src/app/layout.tsx
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://pyron.dev"),
  title: {
    default: "Pyron – Server Engineer & Builder",
    template: "%s | Pyron",
  },
  description:
    "Personal portfolio and engineering blog by KIM TAE HYEON. Server infrastructure, automation systems, NPU/GPU benchmarks, and life as a self-taught engineer.",
  keywords: [
    "server engineer",
    "infrastructure automation",
    "NPU",
    "Tenstorrent",
    "FastAPI",
    "IPMI",
    "Redfish",
    "blog",
    "portfolio",
  ],
  authors: [{ name: "KIM TAE HYEON", url: "https://pyron.dev" }],
  creator: "KIM TAE HYEON",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://pyron.dev",
    siteName: "Pyron",
    title: "Pyron – Server Engineer & Builder",
    description:
      "Personal portfolio and engineering blog by KIM TAE HYEON. Server infrastructure, automation systems, NPU/GPU benchmarks, and life as a self-taught engineer.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pyron – Server Engineer & Builder",
    description:
      "Personal portfolio and engineering blog by KIM TAE HYEON.",
    creator: "@pyron",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Pyron",
  url: "https://pyron.dev",
  description:
    "Personal portfolio and engineering blog by KIM TAE HYEON.",
  author: {
    "@type": "Person",
    name: "KIM TAE HYEON",
    url: "https://pyron.dev",
    jobTitle: "Server Engineer",
  },
};

// Runs before React hydration so the right theme is applied on first paint
// (avoids flash-of-wrong-theme). Default: dark.
const themeInitScript = `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark')t='dark';document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
