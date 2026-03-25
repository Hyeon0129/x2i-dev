// src/app/layout.tsx
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://pyron.dev"),
  title: "Welcome | Pyron",
  description: "Personal portfolio and engineering blog",
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />

        <main>
          {children}
        </main>

        <Footer /> {/*   */}
      </body>
    </html>
  );
}