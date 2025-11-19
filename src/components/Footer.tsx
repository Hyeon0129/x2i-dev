// src/components/Footer.tsx
'use client';

import Link from "next/link";
import Image from "next/image";
import styles from "./footer.module.css";

const LOGO =
  "https://x2i.dev/wp-content/uploads/2025/10/cropped-cropped-cropped-cropped-logo-Photoroom-1.png";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      {/* 상단 4컬럼 */}
      <div className={styles.inner}>
        {/* LEFT: 로고 + 카피 */}
        <div className={styles.colLeft}>
          <Image
            src={LOGO}
            width={40}
            height={40}
            alt="x2i.dev logo"
            className={styles.logo}
          />
          <p className={styles.copy}>© {year} X2I Blog. All rights reserved.</p>
        </div>

        
        {/* COL 2: Site */}
        <div className={styles.col}>
          <p className={styles.heading}>Site</p>
          <Link href="/" className={styles.link}>Home</Link>
          <Link href="/about" className={styles.link}>About</Link>
          <Link href="/project" className={styles.link}>Projects</Link>
          <Link href="/blog" className={styles.link}>Blog</Link>
          <Link href="/docs" className={styles.link}>Docs</Link>
        </div>

        {/* COL 3: Categories */}
        <div className={styles.col}>
          <p className={styles.heading}>Categories</p>
          <Link href="/blog" className={styles.link}>All</Link>
          <Link href="/blog/insights" className={styles.link}>Insights</Link>
          <Link href="/blog/guides" className={styles.link}>Guides</Link>
          <Link href="/blog/projects" className={styles.link}>Projects</Link>
          <Link href="/blog/life" className={styles.link}>Life</Link>
        </div>

        {/* COL 4: Connect */}
        <div className={styles.colRight}>
          <p className={styles.heading}>Contact</p>
          
          <div className={styles.social}>
            <a 
              href="https://github.com/yourusername" 
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
              href="mailto:contact@x2i.dev" 
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

      {/* 상단 그리드 아래 얇은 라인 */}
      <div className={styles.bottomLine} />

      {/* 맨 아래 © 라인 */}

    </footer>
  );
}