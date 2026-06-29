// src/components/Footer.tsx
'use client';

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./footer.module.css";

const LOGO = "/images/logo.png";

type Theme = 'dark' | 'light';

export default function Footer() {
  const year = new Date().getFullYear();
  const [theme, setTheme] = useState<Theme>('dark');
  const [stats, setStats] = useState<{ count: number; lastUpdated: string | null } | null>(null);

  useEffect(() => {
    const stored = (document.documentElement.getAttribute('data-theme') as Theme | null) ?? 'dark';
    setTheme(stored === 'light' ? 'light' : 'dark');
  }, []);

  useEffect(() => {
    fetch('/api/blog-stats')
      .then((r) => r.json())
      .then(setStats)
      .catch(() => {});
  }, []);

  const toggleTheme = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    try {
      localStorage.setItem('theme', next);
    } catch {
      /* ignore */
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.shell}>
        <div className={styles.topLine} />

        <div className={styles.inner}>
          {/* LEFT: logo at top, tagline + copyright pushed to bottom */}
          <div className={styles.colLeft}>
            <Image
              src={LOGO}
              width={32}
              height={32}
              alt="Pyron logo"
              className={styles.logo}
            />
            <div className={styles.leftBottom}>
              <p className={styles.tagline}>
                A personal space for my thoughts, values, and everyday life.
              </p>
              <p className={styles.copy}>© {year} Pyron Blog. All rights reserved.</p>
            </div>
          </div>

          <div className={styles.divider} />

          {/* RIGHT: nav columns (centered) + stats below */}
          <div className={styles.navArea}>
            <div className={styles.navGrid}>
              <div className={styles.col}>
                <p className={styles.heading}>Site</p>
                <div className={styles.linksRow}>
                  <Link href="/" className={styles.link}>Home</Link>
                  <Link href="/#records" scroll={true} className={styles.link}>About</Link>
                  <Link href="/#projects" scroll={true} className={styles.link}>Project</Link>
                  <Link href="/blog" className={styles.link}>Blog</Link>
                  <Link href="/docs" className={styles.link}>Docs</Link>
                </div>
              </div>

              <div className={styles.col}>
                <p className={styles.heading}>Categories</p>
                <div className={styles.linksRow}>
                  <Link href="/blog" className={styles.link}>All</Link>
                  <Link href="/blog/insights" className={styles.link}>Insights</Link>
                  <Link href="/blog/guides" className={styles.link}>Guides</Link>
                  <Link href="/blog/projects" className={styles.link}>Projects</Link>
                  <Link href="/blog/life" className={styles.link}>Life</Link>
                </div>
              </div>

              <div className={styles.col}>
                <p className={styles.heading}>Contact</p>
                <div className={styles.social}>
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

            {stats && (
              <div className={styles.statsRow}>
                <div className={styles.statItem}>
                  <p className={styles.statLabel}>Last Posted</p>
                  <p className={styles.statValue}>{stats.lastUpdated ?? '-'}</p>
                </div>
                <div className={styles.statItem}>
                  <p className={styles.statLabel}>Posts</p>
                  <p className={styles.statValue}>{stats.count}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom row: theme toggle */}
        <div className={styles.bottomRow}>
          <button
            type="button"
            className={styles.themeToggle}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            onClick={toggleTheme}
          >
            {theme === 'dark' ? (
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
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </footer>
  );
}
