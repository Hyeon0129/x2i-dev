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
      {/* 배경 글로우 */}
      <div className={styles.gradient} />

      <div className={styles.inner}>
        {/* LEFT: 로고 + 브랜드 설명 */}
        <div className={styles.colLeft}>
          <Image
            src={LOGO}
            width={40}
            height={40}
            alt="x2i.dev logo"
            className={styles.logo}
          />
          <p className={styles.brand}>x2i.dev</p>
          <p className={styles.tagline}>
            Infra, automation & AI experiments by a server engineer who can’t
            leave things half-done.
          </p>
          <p className={styles.copy}>
            © {year} X2I. All rights reserved.
          </p>
        </div>

        {/* COL 2: 사이트 내 주요 섹션 */}
        <div className={styles.col}>
          <p className={styles.heading}>Site</p>
          <Link href="/" className={styles.link}>
            Home
          </Link>
          <Link href="/about" className={styles.link}>
            About
          </Link>
          <Link href="/blog" className={styles.link}>
            Blog
          </Link>
        </div>

        {/* COL 3: 포커스 / 카테고리 느낌 (텍스트만) */}
        <div className={styles.col}>
          <p className={styles.heading}>Focus</p>
          <p className={styles.metaItem}>QC automation & infra</p>
          <p className={styles.metaItem}>LLM / NPU benchmarking</p>
          <p className={styles.metaItem}>Side projects & notes</p>
        </div>

        {/* COL 4: 연락처 + 소셜 + 현재 상태 */}
        <div className={styles.colRight}>
          <p className={styles.heading}>Connect</p>
          <Link href="mailto:contact@x2i.dev" className={styles.link}>
            contact@x2i.dev
          </Link>

          <div className={styles.social}>
            <Link href="https://x.com/yourhandle" className={styles.socialLink}>
              X
            </Link>
            <Link href="https://github.com/yourrepo" className={styles.socialLink}>
              GitHub
            </Link>
          </div>

          <p className={styles.caption}>
            Based in Seoul · Building infra-driven automation & AI products.
          </p>
        </div>
      </div>

      {/* 하단 1px 라인 */}
      <div className={styles.bottomLine} />
    </footer>
  );
}