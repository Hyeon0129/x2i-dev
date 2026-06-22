// src/components/Footer.tsx
'use client';

import Link from "next/link";
import Image from "next/image";
import styles from "./footer.module.css";

const LOGO = "/images/logo.png";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.shell}>
        <div className={styles.topLine} />

        <div className={styles.inner}>
          {/* LEFT: logo + copyright */}
          <div className={styles.colLeft}>
            <Image
              src={LOGO}
              width={32}
              height={32}
              alt="Pyron logo"
              className={styles.logo}
            />
            <p className={styles.copy}>© {year} Pyron Blog. All rights reserved.</p>
          </div>

          <div className={styles.divider} />

          {/* RIGHT: nav columns */}
          <div className={styles.navGrid}>
            <div className={styles.col}>
              <p className={styles.heading}>Site</p>
              <Link href="/" className={styles.link}>Home</Link>
              <Link href="/#records" scroll={true} className={styles.link}>About</Link>
              <Link href="/#projects" scroll={true} className={styles.link}>Project</Link>
              <Link href="/blog" className={styles.link}>Blog</Link>
              <Link href="/docs" className={styles.link}>Docs</Link>
            </div>

            <div className={styles.col}>
              <p className={styles.heading}>Categories</p>
              <Link href="/blog" className={styles.link}>All</Link>
              <Link href="/blog/insights" className={styles.link}>Insights</Link>
              <Link href="/blog/guides" className={styles.link}>Guides</Link>
              <Link href="/blog/projects" className={styles.link}>Projects</Link>
              <Link href="/blog/life" className={styles.link}>Life</Link>
            </div>

            <div className={styles.col}>
              <p className={styles.heading}>Contact</p>
              <div className={styles.social}>
                <a
                  href="https://github.com/Hyeon0129"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label="GitHub"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                </a>
                <a
                  href="https://linkedin.com/in/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label="LinkedIn"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
                <a
                  href="mailto:zhtmah6795@gmail.com"
                  className={styles.socialLink}
                  aria-label="Email"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom row: theme toggle (decorative for now) */}
        <div className={styles.bottomRow}>
          <button
            type="button"
            className={styles.themeToggle}
            aria-label="Toggle theme"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2" />
              <path d="M12 20v2" />
              <path d="m4.93 4.93 1.41 1.41" />
              <path d="m17.66 17.66 1.41 1.41" />
              <path d="M2 12h2" />
              <path d="M20 12h2" />
              <path d="m6.34 17.66-1.41 1.41" />
              <path d="m19.07 4.93-1.41 1.41" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
}
