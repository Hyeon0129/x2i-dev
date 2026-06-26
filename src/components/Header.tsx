// src/components/Header.tsx

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import SearchModal from './SearchModal';

const LOGO = '/images/logo.png';

type Theme = 'dark' | 'light';

type ActiveSection = 'home' | 'records' | 'projects';

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const [theme, setTheme] = useState<Theme>('dark');
  const [isMac, setIsMac] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<ActiveSection>('home');

  useEffect(() => {
    const stored = (document.documentElement.getAttribute('data-theme') as Theme | null) ?? 'dark';
    setTheme(stored === 'light' ? 'light' : 'dark');

    const observer = new MutationObserver(() => {
      const current = document.documentElement.getAttribute('data-theme');
      setTheme(current === 'light' ? 'light' : 'dark');
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    setIsMac(/Mac|iPhone|iPod|iPad/.test(navigator.platform ?? navigator.userAgent));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isShortcut = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k';
      if (isShortcut) {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (!pathname) return;
    setMobileMenuOpen(false);
  }, [pathname]);

  // Header stays fully transparent (no background tint at all, just the
  // blur) for as long as any part of .hero is still behind it — so the
  // home page's hero never gets a visible colored bar across it, no
  // matter how far you scroll within it. Once .hero has fully scrolled
  // past (or on pages with no .hero at all, e.g. /blog), it picks up the
  // solid tint + hairline border so non-hero content doesn't just show
  // straight through a permanently-transparent header.
  useEffect(() => {
    const handleScroll = () => {
      const hero = document.querySelector('.hero');
      if (hero) {
        const headerHeight = document.querySelector('.site-header')?.clientHeight ?? 0;
        setScrolled(hero.getBoundingClientRect().bottom <= headerHeight);
      } else {
        setScrolled(window.scrollY > 8);
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll-spy for the home page: ABOUT/PROJECT scroll-link to #records/
  // #projects rather than navigating to a new route, so route-based active
  // matching never lights them up — mark whichever section you've actually
  // scrolled past as active instead, same idea as HOME being "active" by
  // default at the top.
  useEffect(() => {
    if (pathname !== '/') return;

    const handleScroll = () => {
      const offset = 120;
      const records = document.getElementById('records');
      const projects = document.getElementById('projects');
      let next: ActiveSection = 'home';
      if (records && records.getBoundingClientRect().top <= offset) next = 'records';
      if (projects && projects.getBoundingClientRect().top <= offset) next = 'projects';
      setActiveSection(next);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

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

  const themeIcon =
    theme === 'dark' ? (
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
    );

  const isHomeActive = pathname === '/' && activeSection === 'home';
  const isAboutActive = pathname === '/' && activeSection === 'records';
  const isProjectActive = pathname === '/' && activeSection === 'projects';

  const navLinks = [
    { href: '/', label: 'Home', active: isHomeActive },
    { href: '/#records', label: 'About', scroll: true, active: isAboutActive },
    { href: '/#projects', label: 'Project', scroll: true, active: isProjectActive },
    { href: '/blog', label: 'Blog', active: isActive('/blog') },
    { href: 'https://docs.pyron.dev', label: 'Docs', target: '_blank' },
  ];

  return (
    <>
      <header className={`site-header${scrolled ? ' scrolled' : ''}`}>
        <div className="container header-inner">
          <Link href="/" className="brand">
            <Image src={LOGO} alt="Pyron" width={45} height={45} />
          </Link>

          <nav className="nav">
            <Link href="/" className={isHomeActive ? 'active' : ''}>Home</Link>
            <Link href="/#records" scroll={true} className={isAboutActive ? 'active' : ''}>About</Link>
            <Link href="/#projects" scroll={true} className={isProjectActive ? 'active' : ''}>Project</Link>
            <Link href="/blog" className={isActive('/blog') ? 'active' : ''}>Blog</Link>
            <Link href="https://docs.pyron.dev" target="_blank">Docs</Link>
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
              <kbd>{isMac ? '⌘K' : 'Ctrl K'}</kbd>
            </button>
          </div>

          <button
            type="button"
            className="mobile-search-btn"
            aria-label="search"
            onClick={() => setSearchOpen(true)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>

          <button
            type="button"
            className="mobile-menu-btn"
            aria-label="Open menu"
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(true)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="mobile-menu-overlay">
          <div className="mobile-menu-top">
            <Link href="/" className="brand" onClick={() => setMobileMenuOpen(false)}>
              <Image src={LOGO} alt="Pyron" width={40} height={40} />
            </Link>
            <button
              type="button"
              className="mobile-menu-close"
              aria-label="Close menu"
              onClick={() => setMobileMenuOpen(false)}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="18" y1="6" x2="6" y2="18" />
              </svg>
            </button>
          </div>

          <nav className="mobile-menu-nav">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                scroll={link.scroll}
                target={link.target}
                className={link.active ? 'active' : ''}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="mobile-menu-bottom">
            <button type="button" className="mobile-menu-theme-btn" onClick={toggleTheme}>
              {themeIcon}
              <span>{theme === 'dark' ? 'Switch to light' : 'Switch to dark'}</span>
            </button>
          </div>
        </div>
      )}

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}