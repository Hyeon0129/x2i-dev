// src/components/Header.tsx

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import SearchModal from './SearchModal';

const LOGO = '/images/logo.png';

type Theme = 'dark' | 'light';

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    const stored = (document.documentElement.getAttribute('data-theme') as Theme | null) ?? 'dark';
    setTheme(stored === 'light' ? 'light' : 'dark');

    const observer = new MutationObserver(() => {
      const current = document.documentElement.getAttribute('data-theme');
      setTheme(current === 'light' ? 'light' : 'dark');
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
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

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname?.startsWith(href);
  };

  return (
    <>
      <header className="site-header">
        <div className="container header-inner">
          <Link href="/" className="brand">
            <Image src={LOGO} alt="Pyron" width={45} height={45} />
          </Link>

          <nav className="nav">
            <Link href="/" className={isActive('/') && pathname === '/' ? 'active' : ''}>HOME</Link>
            <Link href="/#records" scroll={true}>ABOUT</Link>
            <Link href="/#projects" scroll={true}>PROJECT</Link>
            <Link href="/blog" className={isActive('/blog') ? 'active' : ''}>BLOG</Link>
            <Link href="https://docs.pyron.dev" target="_blank">DOCS</Link>
          </nav>

          <div className="nav-right">
            <button
              type="button"
              className="theme-toggle-btn"
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

            <button
              type="button"
              className="search-btn"
              aria-label="search"
              onClick={() => setSearchOpen(true)}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <span>Search</span>
              <kbd>⌘K</kbd>
            </button>
          </div>
        </div>
      </header>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}