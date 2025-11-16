// src/app/layout.tsx
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "x2i.dev",
  description: "Personal portfolio and engineering blog",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />

        <main>
          {children}
        </main>

        <Footer /> {/* ← 모든 페이지에서 공통으로 표시됨 */}
      </body>
    </html>
  );
}