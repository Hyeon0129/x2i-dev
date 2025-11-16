// src/components/Footer.tsx
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">

        <div className="footer-left">
          <span className="footer-logo">x2i.dev</span>
        </div>

        <div className="footer-center">
          <Link href="/" className="footer-link">
            Home
          </Link>
          <Link href="/about" className="footer-link">
            About
          </Link>
          <Link href="/project" className="footer-link">
            Project
          </Link>
          <Link href="/blog" className="footer-link">
            Blog
          </Link>
          <Link href="/docs" className="footer-link">
            Docs
          </Link>
        </div>

        <div className="footer-right">
          <span>© {new Date().getFullYear()} x2i.dev</span>
        </div>

      </div>
    </footer>
  );
}